import { Webhook } from "standardwebhooks";
import { headers } from "next/headers";
import { dodopayments } from "@/lib/dodopayments";

const webhook = new Webhook(process.env.NEXT_PUBLIC_DODO_WEBHOOK_KEY!);

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

    console.log("Webhook received:", {
      type: payload.type,
      payloadType: payload.data.payload_type,
      data: payload.data
    });

    if (payload.data.payload_type === "Subscription") {
      const subscription = await dodopayments.subscriptions.retrieve(payload.data.subscription_id);
      console.log("Subscription details:", subscription);

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
      console.log("Payment details:", payment);

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
    console.error("Webhook processing error:", error);
    // Still return 200 to acknowledge receipt of the webhook
    return Response.json(
      { message: "Webhook processed successfully" },
      { status: 200 }
    );
  }
}