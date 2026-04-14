import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/Header";
import AuthProvider from "@/providers/userContext";
import { Toaster } from "sonner";
import { getUserProfile } from "@/actions/getProfileData";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "store -- plateform",
  description: "A platform to sell your products online",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getUserProfile();
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
      <AuthProvider>
        <body className="min-h-full flex flex-col bg-background text-text overflow-x-hidden tracking-widest">
          <Header role={data?.role || null} />
          {children}
          <Toaster position="bottom-right" theme="dark" richColors />
        </body>
      </AuthProvider>
    </html>
  );
}
