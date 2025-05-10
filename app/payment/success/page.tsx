"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subscriptionId = searchParams.get("subscription_id");
  const status = searchParams.get("status");

  useEffect(() => {
    const handleSuccess = async () => {
      try {
        // Get current user session
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.push('/auth/signin');
          return;
        }

        // If subscription is active, redirect to dashboard
        if (status === "active") {
          router.push('/dashboard');
        } else {
          // If there's an issue with the subscription, redirect to pricing
          router.push('/pricing');
        }
      } catch (error) {
        console.error("Error handling payment success:", error);
        router.push('/pricing');
      }
    };

    if (subscriptionId && status) {
      handleSuccess();
    } else {
      router.push('/pricing');
    }
  }, [subscriptionId, status, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Processing Payment
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Please wait while we confirm your subscription...
          </p>
        </div>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
} 