"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

// Plan feature type
type PlanFeature = {
  text: string;
  included: boolean;
};

// Plan type
type Plan = {
  name: string;
  description: string;
  price: {
    monthly: string;
    yearly: string;
  };
  features: PlanFeature[];
  buttonText: string;
  productId: {
    monthly: string;
    yearly: string;
  };
  popular?: boolean;
};

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const router = useRouter();

  const handleSubscribe = async (plan: Plan) => {
    try {
      setIsLoading(plan.name);
      
      // Get current user session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/auth/signup');
        return;
      }

      // Get user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      // Create checkout session
      const response = await fetch('/api/dodopayments/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: plan.productId[billingPeriod],
          email: session.user.email,
          name: profile?.full_name || session.user.email?.split('@')[0],
          city: profile?.city || '',
          country: profile?.country || 'US', // Default to US if not set
          state: profile?.state || '',
          street: profile?.street || '',
          zipcode: profile?.zipcode || '',
          billingPeriod,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create checkout session');
      }

      const data = await response.json();
      
      // Redirect to payment link
      if (data.payment_link) {
        window.location.href = data.payment_link;
      } else {
        throw new Error('No payment link received');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert(error instanceof Error ? error.message : 'Failed to create payment link. Please try again.');
    } finally {
      setIsLoading(null);
    }
  };

  // Pricing plans data
  const plans: Plan[] = [
    {
      name: "Starter",
      description: "For individuals and small teams just getting started.",
      price: {
        monthly: "$19",
        yearly: "$15",
      },
      features: [
        { text: "Basic analytics dashboard", included: true },
        { text: "Up to 5 projects", included: true },
        { text: "100MB storage", included: true },
        { text: "Basic reporting", included: true },
      ],
      buttonText: "Get Started",
      productId: {
        monthly: process.env.NEXT_PUBLIC_STARTER_MONTHLY_PRODUCT_ID || "pdt_JwTxUqvoYssFivYnN4Phm",
        yearly: process.env.NEXT_PUBLIC_STARTER_YEARLY_PRODUCT_ID || "pdt_JwTxUqvoYssFivYnN4Phm",
      },
    },
    {
      name: "Professional",
      description: "Perfect for growing businesses and teams.",
      price: {
        monthly: "$49",
        yearly: "$39",
      },
      features: [
        { text: "Advanced analytics dashboard", included: true },
        { text: "Unlimited projects", included: true },
        { text: "1GB storage", included: true },
        { text: "Advanced reporting", included: true },
      ],
      buttonText: "Start Free Trial",
      productId: {
        monthly: process.env.NEXT_PUBLIC_PRO_MONTHLY_PRODUCT_ID || "pdt_JwTxUqvoYssFivYnN4Phm",
        yearly: process.env.NEXT_PUBLIC_PRO_YEARLY_PRODUCT_ID || "pdt_JwTxUqvoYssFivYnN4Phm",
      },
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For organizations requiring advanced features and support.",
      price: {
        monthly: "$99",
        yearly: "$79",
      },
      features: [
        { text: "Complete analytics suite", included: true },
        { text: "Unlimited projects", included: true },
        { text: "10GB storage", included: true },
        { text: "Custom reporting", included: true },
      ],
      buttonText: "Contact Sales",
      productId: {
        monthly: process.env.NEXT_PUBLIC_ENTERPRISE_MONTHLY_PRODUCT_ID || "pdt_JwTxUqvoYssFivYnN4Phm",
        yearly: process.env.NEXT_PUBLIC_ENTERPRISE_YEARLY_PRODUCT_ID || "pdt_JwTxUqvoYssFivYnN4Phm",
      },
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            No hidden fees, no surprises.
          </p>
          
          {/* Billing toggle */}
          <div className="flex items-center justify-center mt-8">
            <div className="relative inline-flex rounded-full p-1 bg-gray-100 dark:bg-gray-800">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                  billingPeriod === "monthly"
                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod("yearly")}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                  billingPeriod === "yearly"
                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                Yearly
                <span className="absolute -top-2 -right-2 bg-blue-500 text-xs text-white px-2 py-0.5 rounded-full">
                  20% off
                </span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border transition-all duration-300",
                plan.popular 
                  ? "border-blue-500 dark:border-blue-400 md:scale-105 z-10" 
                  : "border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700"
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-3 py-1 transform translate-x-6 -translate-y-0 rotate-45">
                  Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400 h-12">{plan.description}</p>
                <div className="mt-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {billingPeriod === "monthly" ? plan.price.monthly : plan.price.yearly}
                    </span>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">
                      /month
                    </span>
                  </div>
                  {billingPeriod === "yearly" && (
                    <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                      Billed annually (20% discount)
                    </p>
                  )}
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className="flex-shrink-0 text-blue-600 dark:text-blue-400 mr-2">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button
                    variant={plan.popular ? "gradient" : "outline"}
                    size="lg"
                    className="w-full rounded-full font-medium"
                    onClick={() => handleSubscribe(plan)}
                    disabled={isLoading === plan.name}
                  >
                    {isLoading === plan.name ? "Processing..." : plan.buttonText}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 