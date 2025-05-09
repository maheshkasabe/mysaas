"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function ProductDemo() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const demoSection = document.querySelector("#demo-section");
    if (demoSection) {
      observer.observe(demoSection);
    }

    return () => {
      if (demoSection) {
        observer.unobserve(demoSection);
      }
    };
  }, []);

  return (
    <section
      id="demo"
      className="py-20 bg-white dark:bg-gray-950"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            id="demo-section"
            className={`transition-all duration-1000 transform ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              See How <span className="gradient-text">DiligentInsight</span> Works
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Our intuitive platform makes complex data analysis simple. Watch
              how you can transform your business intelligence with just a few
              clicks.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600 mr-2 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">
                  Import data from any source in seconds
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600 mr-2 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">
                  Create beautiful visualizations with our drag-and-drop interface
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600 mr-2 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">
                  Share insights with your team in real-time
                </span>
              </li>
            </ul>
            <Button
              variant="gradient"
              size="lg"
              className="rounded-full font-medium"
            >
              Schedule a Live Demo
            </Button>
          </div>

          <div
            className={`relative rounded-xl overflow-hidden shadow-xl transition-all duration-1000 delay-300 transform ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            {/* Video placeholder with gradient overlay */}
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-indigo-100/30 dark:from-blue-900/30 dark:to-indigo-900/30"></div>
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/90 dark:bg-gray-900/90 flex items-center justify-center shadow-lg cursor-pointer transition-transform hover:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-blue-600 dark:text-blue-400 ml-1"
                    fill="none" 
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              
              {/* Video thumbnail or placeholder text */}
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-400 dark:text-gray-500 text-lg">
                  Demo Video Thumbnail
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 