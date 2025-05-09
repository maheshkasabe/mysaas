"use client";

import { useEffect, useState } from "react";

const testimonials = [
  {
    quote:
      "DiligentInsight has transformed how we analyze customer behavior. The predictive analytics features have helped us increase conversions by 37% in just three months.",
    author: "Sarah Johnson",
    role: "CMO at TechDrive",
    image: "/avatars/avatar-1.jpg",
  },
  {
    quote:
      "Implementing DiligentInsight was the best decision we made last year. Our team now has real-time visibility into our operations, helping us optimize processes and reduce costs.",
    author: "Michael Chen",
    role: "Operations Director at GlobalLogic",
    image: "/avatars/avatar-2.jpg",
  },
  {
    quote:
      "The customizable dashboards have been a game-changer for our executive team. We can now make data-driven decisions quickly with confidence in the insights provided.",
    author: "Alexis Rivera",
    role: "CEO at Innovate Solutions",
    image: "/avatars/avatar-3.jpg",
  },
];

export default function Testimonials() {
  const [visibleItems, setVisibleItems] = useState<boolean[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleItems((prev) => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".testimonial-card");
    elements.forEach((el) => observer.observe(el));

    // Initialize with all false
    setVisibleItems(Array(testimonials.length).fill(false));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section
      id="testimonials"
      className="py-20 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by <span className="gradient-text">Industry Leaders</span>
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            See how DiligentInsight is helping organizations transform their
            approach to data analytics and business intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              data-index={index}
              className={`testimonial-card bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md transition-all duration-700 ease-out transform ${
                visibleItems[index]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-16"
              }`}
            >
              {/* Quote icon */}
              <div className="mb-6 text-blue-600 dark:text-blue-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8 opacity-50"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-4">
                  {/* Placeholder for avatar */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">
                    {testimonial.author}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 