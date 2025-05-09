"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { user, signOut, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/signin");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome to your Dashboard
              </h1>
              <Button variant="outline" onClick={signOut}>
                Sign Out
              </Button>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2">
                Account Information
              </h2>
              <div className="space-y-2 text-sm">
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Email:</span> {user.email}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">User ID:</span> {user.id}
                </p>
                {user.user_metadata?.first_name && (
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Name:</span>{" "}
                    {user.user_metadata.first_name} {user.user_metadata.last_name}
                  </p>
                )}
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Provider:</span>{" "}
                  {user.app_metadata?.provider || "email"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Getting Started
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Welcome to DiligentInsight! You&apos;re now ready to explore our features.
                </p>
                <Button variant="gradient" className="w-full">
                  Explore Features
                </Button>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Your Profile
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Complete your profile to get the most out of our platform.
                </p>
                <Button variant="outline" className="w-full">
                  Complete Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 