import { Webhook } from "standardwebhooks";
import { headers } from "next/headers";
import { dodopayments } from "@/lib/dodopayments";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with service role key for admin access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

const webhook = new Webhook(process.env.DODO_WEBHOOK_KEY!);

// Define the subscription interface based on the API response
interface DodoSubscription {
  customer: {
    customer_id: string;
    email?: string;
    name?: string;
  };
  subscription_id: string;
  product_id: string;
  status: string;
  next_billing_date: string;
  previous_billing_date?: string;
  currency?: string;
  recurring_pre_tax_amount?: number;
}

// Define the raw subscription interface from the API
interface RawSubscription {
  customer: {
    customer_id?: string;
  } | string;
  subscription_id: string;
  product_id: string;
  status: string;
  end_date?: number;
  period_end?: number;
  current_period_end?: number;
  next_billing_date?: string;
}

export async function POST(request: Request) {
  const headersList = await headers();

  try {
    const rawBody = await request.text();
    const webhookHeaders = {
      "webhook-id": headersList.get("webhook-id") || "",
      "webhook-signature": headersList.get("webhook-signature") || "",
      "webhook-timestamp": headersList.get("webhook-timestamp") || "",
    };

    // Log webhook verification details
    console.log("Webhook verification details:", {
      event_id: webhookHeaders["webhook-id"],
      hasWebhookKey: !!process.env.DODO_WEBHOOK_KEY,
      hasSignature: !!webhookHeaders["webhook-signature"],
      timestamp: webhookHeaders["webhook-timestamp"],
      bodyLength: rawBody.length,
      payload_type: JSON.parse(rawBody).data.payload_type,
      event_type: JSON.parse(rawBody).type
    });

    // Verify webhook signature
    await webhook.verify(rawBody, webhookHeaders);
    const payload = JSON.parse(rawBody);

    if (payload.data.payload_type === "Subscription") {
      const rawSubscription = await dodopayments.subscriptions.retrieve(payload.data.subscription_id) as RawSubscription;
      console.log("-------SUBSCRIPTION DATA START ---------");
      console.log("Full subscription object:", JSON.stringify(rawSubscription, null, 2));
      console.log("Subscription keys:", Object.keys(rawSubscription));
      console.log("-------SUBSCRIPTION DATA END ---------");

      // Convert the raw subscription to our expected format
      const subscription: DodoSubscription = {
        customer: {
          customer_id: typeof rawSubscription.customer === 'string' 
            ? rawSubscription.customer 
            : rawSubscription.customer.customer_id || '',
          email: payload.data.customer?.email,
          name: payload.data.customer?.name
        },
        subscription_id: rawSubscription.subscription_id,
        product_id: rawSubscription.product_id,
        status: rawSubscription.status,
        next_billing_date: rawSubscription.next_billing_date || payload.data.next_billing_date,
        previous_billing_date: payload.data.previous_billing_date,
        currency: payload.data.currency,
        recurring_pre_tax_amount: payload.data.recurring_pre_tax_amount
      };

      if (!rawSubscription.next_billing_date) {
        console.error('No next billing date found in subscription:', {
          event_id: webhookHeaders["webhook-id"],
          subscription_id: rawSubscription.subscription_id,
          customer_id: subscription.customer.customer_id,
          available_fields: Object.keys(rawSubscription)
        });
        return Response.json({ message: "Webhook succeeded" }, { status: 200 });
      }

      // Find user by Dodo customer ID
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('dodo_customer_id', subscription.customer.customer_id)
        .single();

      if (userError) {
        console.error('Error finding user:', {
          event_id: webhookHeaders["webhook-id"],
          customer_id: subscription.customer.customer_id,
          error: userError
        });
        return Response.json({ message: "Webhook succeeded" }, { status: 200 });
      }

      // Map subscription data to our schema
      const subscriptionData = {
        user_id: userData.id,
        dodo_customer_id: subscription.customer.customer_id,
        dodo_subscription_id: subscription.subscription_id,
        plan_id: subscription.product_id,
        status: subscription.status,
        current_period_end: subscription.next_billing_date,
        previous_period_start: subscription.previous_billing_date,
        currency: subscription.currency,
        amount: subscription.recurring_pre_tax_amount,
        updated_at: new Date().toISOString()
      };

      // Update or insert subscription
      const { error: subscriptionError } = await supabase
        .from('subscriptions')
        .upsert(subscriptionData, {
          onConflict: 'dodo_subscription_id'
        });

      if (subscriptionError) {
        console.error('Error updating subscription:', subscriptionError);
        return Response.json({ error: 'Failed to update subscription' }, { status: 500 });
      }

      switch (payload.type) {
        case "subscription.active":
          console.log("Subscription activated:", subscription);
          break;
        case "subscription.failed":
          console.log("Subscription failed:", subscription);
          break;
        case "subscription.cancelled":
          console.log("Subscription cancelled:", subscription);
          break;
        case "subscription.renewed":
          console.log("Subscription renewed:", subscription);
          break;
        case "subscription.on_hold":
          console.log("Subscription on hold:", subscription);
          break;
        default:
          console.log("Unhandled subscription event type:", payload.type);
          break;
      }
    } else if (payload.data.payload_type === "Payment") {
      console.log("-------PAYMENT WEBHOOK DATA START ---------");
      console.log(JSON.stringify(payload.data, null, 2));
      console.log("-------PAYMENT WEBHOOK DATA END ---------");

      // Define payment data structure
      const paymentData = {
        user_id: null, // Will be set after user lookup
        dodo_payment_id: payload.data.payment_id,
        dodo_customer_id: payload.data.customer.customer_id,
        dodo_subscription_id: payload.data.subscription_id,
        status: payload.data.status,
        amount: payload.data.total_amount,
        currency: payload.data.currency,
        payment_method: payload.data.payment_method,
        card_last_four: payload.data.card_last_four,
        card_network: payload.data.card_network,
        card_type: payload.data.card_type,
        card_country: payload.data.card_issuing_country,
        error_code: payload.data.error_code,
        error_message: payload.data.error_message,
        created_at: payload.data.created_at,
        updated_at: new Date().toISOString()
      };

      // Find user by Dodo customer ID
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('dodo_customer_id', payload.data.customer.customer_id)
        .single();

      if (userError) {
        console.error('Error finding user for payment:', userError);
        return Response.json({ error: 'User not found' }, { status: 404 });
      }

      // Add user_id to payment data
      paymentData.user_id = userData.id;

      // Insert payment record
      const { error: paymentError } = await supabase
        .from('payments')
        .upsert(paymentData, {
          onConflict: 'dodo_payment_id'
        });

      if (paymentError) {
        console.error('Error recording payment:', paymentError);
        return Response.json({ error: 'Failed to record payment' }, { status: 500 });
      }

      switch (payload.type) {
        case "payment.succeeded":
          console.log("Payment succeeded:", {
            payment_id: paymentData.dodo_payment_id,
            amount: paymentData.amount,
            currency: paymentData.currency,
            customer_id: paymentData.dodo_customer_id
          });
          break;
        case "payment.failed":
          console.log("Payment failed:", {
            payment_id: paymentData.dodo_payment_id,
            error_code: paymentData.error_code,
            error_message: paymentData.error_message
          });
          break;
        default:
          console.log("Unhandled payment event type:", payload.type);
          break;
      }
    }

    return Response.json({ message: "Webhook succeeded" }, { status: 200 });
  } catch (error: unknown) {
    console.log(" ----- webhook verification failed -----");
    
    if (error instanceof Error) {
      console.log("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      
      // Return 401 for verification failures
      if (error.name === 'WebhookVerificationError') {
        return Response.json(
          { error: "Webhook verification failed", details: error.message },
          { status: 401 }
        );
      }
    }

    // Return 200 for other errors to prevent webhook retries
    return Response.json({ message: "Webhook succeeded" }, { status: 200 });
  }
}