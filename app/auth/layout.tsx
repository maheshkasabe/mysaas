import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | DiligentInsight",
  description: "Sign in to your DiligentInsight account and access all your tools and data.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
} 