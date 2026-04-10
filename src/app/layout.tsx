import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/Header";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

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
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        playfairDisplay.variable,
      )}
    >
      <body className="min-h-full flex flex-col bg-background text-text overflow-x-hidden tracking-widest">
        <Header />
        {children}
      </body>
    </html>
  );
}
