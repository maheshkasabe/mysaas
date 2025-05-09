"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function VerifyEmail() {
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
            Check your email
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            We've sent you a verification link to confirm your email address
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8 w-full border border-gray-200 dark:border-gray-800">
          <div className="text-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-16 w-16 mx-auto text-blue-600 dark:text-blue-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2v-4.5" />
              <path d="m22 10.5-8.9 3c-.8.3-1.6.3-2.3 0L2 10.5" />
            </svg>
            
            <p className="mt-4 text-base text-gray-700 dark:text-gray-300">
              Please check your email inbox and click on the verification link to complete your registration.
            </p>
            
            <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
              If you don't see the email in your inbox, check your spam folder.
            </p>
            
            <div className="mt-8">
              <Link href="/auth/signin">
                <Button variant="gradient" className="w-full h-12 text-white">
                  Return to Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 