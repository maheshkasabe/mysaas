import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Diligent Insight | Modern Solutions for Your Business",
  description: "Experience the next generation of intelligent solutions. Diligent Insight delivers cutting-edge technology with a beautiful, intuitive experience.",
  keywords: ["AI", "business intelligence", "data analytics", "modern solutions"],
  authors: [{ name: "Diligent Insight Team" }],
  openGraph: {
    title: "Diligent Insight | Modern Solutions for Your Business",
    description: "Experience the next generation of intelligent solutions.",
    url: "https://diligent-insight.com",
    siteName: "Diligent Insight",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diligent Insight | Modern Solutions for Your Business",
    description: "Experience the next generation of intelligent solutions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
