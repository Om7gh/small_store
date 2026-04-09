import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "store -- plateform",
  description: "A platform to sell your products online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col bg-background text-text overflow-x-hidden">
        <Header />
        {children}
      </body>
    </html>
  );
}
