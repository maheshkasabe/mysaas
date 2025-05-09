"use client";

import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How easy is it to get started with DiligentInsight?",
    answer:
      "Getting started is very simple. Sign up for a free trial, connect your data sources using our intuitive interface, and you'll have your first dashboard ready within minutes. Our onboarding specialists are also available to help you every step of the way.",
  },
  {
    question: "Can DiligentInsight integrate with my existing tools?",
    answer:
      "Yes, DiligentInsight offers robust integration capabilities with most popular business tools and data sources. We support native integrations with Salesforce, HubSpot, Google Analytics, SQL databases, and many more. Our API also allows for custom integrations with any proprietary systems.",
  },
  {
    question: "Is my data secure with DiligentInsight?",
    answer:
      "Absolutely. Security is our top priority. We use industry-standard encryption for all data, both in transit and at rest. Our platform is SOC 2 Type II and GDPR compliant, with regular security audits and penetration testing to ensure your data remains protected.",
  },
  {
    question: "What kind of support does DiligentInsight provide?",
    answer:
      "We offer 24/7 technical support through multiple channels including email, chat, and phone. Enterprise customers also receive a dedicated customer success manager. Our knowledge base and training resources are comprehensive and constantly updated.",
  },
  {
    question: "How does pricing work for DiligentInsight?",
    answer:
      "We offer flexible, tiered pricing based on your organization's needs. Our plans start with a free tier for small teams, and scale up to enterprise solutions. Pricing is based on factors such as number of users, data volume, and required features. Contact our sales team for a customized quote.",
  },
];

export default function Faq() {
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

    const faqSection = document.querySelector("#faq-section");
    if (faqSection) {
      observer.observe(faqSection);
    }

    return () => {
      if (faqSection) {
        observer.unobserve(faqSection);
      }
    };
  }, []);

  return (
    <section
      id="faq"
      className="py-20 bg-white dark:bg-gray-950"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          id="faq-section"
          className={`max-w-3xl mx-auto transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Everything you need to know about DiligentInsight and how it can
              transform your business.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                <AccordionTrigger className="text-left text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 py-5 text-base sm:text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 dark:text-gray-300 text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Still have questions? We're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Contact Support
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Schedule a Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 