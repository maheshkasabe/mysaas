"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function ForgotPassword() {
  const { resetPassword, isLoading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    
    await resetPassword(email);
    
    // If there's no error, show success message
    setSuccessMessage("If an account exists with that email, we've sent password reset instructions.");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gradient-bg-hero p-4">
      <div className="w-full max-w-md">
        {/* Logo and branding */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              DiligentInsight
            </span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
            Reset your password
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            We&apos;ll send you instructions to reset your password
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8 w-full border border-gray-200 dark:border-gray-800">
          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Success message */}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900 rounded-md text-sm">
              {successMessage}
            </div>
          )}

          {/* Email Form */}
          <form className="mt-2 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-800 dark:text-white"
                placeholder="you@example.com"
              />
            </div>

            <Button
              variant="gradient"
              className="w-full h-12 text-white"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send reset instructions"}
            </Button>
          </form>
        </div>

        {/* Back to Sign in link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Remember your password?{" "}
            <Link href="/auth/signin" className="font-medium text-primary hover:text-primary/80">
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 