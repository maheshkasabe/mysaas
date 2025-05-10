import { Webhook } from "standardwebhooks";
import { headers } from "next/headers";
import { dodopayments } from "@/lib/dodopayments";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with service role key for admin access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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
  };
  subscription_id: string;
  product_id: string;
  status: string;
  end_date: number;
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
            : rawSubscription.customer.customer_id || ''
        },
        subscription_id: rawSubscription.subscription_id,
        product_id: rawSubscription.product_id,
        status: rawSubscription.status,
        end_date: rawSubscription.end_date || rawSubscription.period_end || rawSubscription.current_period_end || 0
      };

      if (!subscription.end_date) {
        console.error('No end date found in subscription:', rawSubscription);
        return Response.json({ error: 'Invalid subscription data' }, { status: 400 });
      }

      // Find user by Dodo customer ID
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('dodo_customer_id', subscription.customer.customer_id)
        .single();

      if (userError) {
        console.error('Error finding user:', userError);
        return Response.json({ error: 'User not found' }, { status: 404 });
      }

      // Map subscription data to our schema
      const subscriptionData = {
        user_id: userData.id,
        dodo_customer_id: subscription.customer.customer_id,
        dodo_subscription_id: subscription.subscription_id,
        plan_id: subscription.product_id,
        status: subscription.status,
        current_period_end: new Date(subscription.end_date * 1000).toISOString(),
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
      const payment = await dodopayments.payments.retrieve(payload.data.payment_id);
      console.log("-------PAYMENT DATA START ---------");
      console.log(payment);
      console.log("-------PAYMENT DATA END ---------");

      switch (payload.type) {
        case "payment.succeeded":
          console.log("Payment succeeded:", payment);
          break;
        case "payment.failed":
          console.log("Payment failed:", payment);
          break;
        default:
          console.log("Unhandled payment event type:", payload.type);
          break;
      }
    }

    return Response.json(
      { message: "Webhook processed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(" ----- webhook verification failed -----");
    console.log(error);
    return Response.json(
      { message: "Webhook processed successfully" },
      { status: 200 }
    );
  }
}