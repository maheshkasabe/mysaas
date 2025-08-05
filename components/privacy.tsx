"use client";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Welcome to DiligentInsight. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                2. Information We Collect
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-4">
                <li>Account information (name, email, password)</li>
                <li>Profile information</li>
                <li>Payment information</li>
                <li>Usage data and analytics</li>
                <li>Communication preferences</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We use the collected information for:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-4">
                <li>Providing and maintaining our service</li>
                <li>Processing your payments</li>
                <li>Sending you updates and notifications</li>
                <li>Improving our service</li>
                <li>Responding to your requests</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                4. Data Security
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                5. Cookies and Tracking
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                6. Third-Party Services
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Our service may contain links to third-party websites. We are not responsible for the privacy practices of these websites. We encourage you to read their privacy policies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                7. Changes to This Policy
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &ldquo;Last updated&rdquo; date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                8. Contact Us
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400">
                <li>Email: support@diligentinsight.com</li>
                <li>Through our contact form on the website</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
