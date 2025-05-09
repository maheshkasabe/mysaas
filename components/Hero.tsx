"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="gradient-bg-hero pt-28 pb-20 md:pt-36 md:pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 ease-out transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
              Transform Your Business with{" "}
              <span className="gradient-text">Intelligent Insights</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover patterns, predict trends, and make smarter decisions with our
              advanced analytics platform built for the modern enterprise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="gradient"
                size="xl"
                className="rounded-full font-medium animate-float"
              >
                Get Started Free
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="rounded-full font-medium"
              >
                Book a Demo
              </Button>
            </div>

            <div
              className={`mt-16 relative transition-all duration-1500 ease-out delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <div className="w-full max-w-5xl mx-auto h-[300px] md:h-[420px] bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Placeholder for dashboard preview */}
                  <div className="text-lg text-gray-500 dark:text-gray-400">
                    Interactive Dashboard Preview
                  </div>
                </div>
                {/* Gradient overlay on top */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 