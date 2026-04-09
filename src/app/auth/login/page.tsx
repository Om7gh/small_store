"use client";

import { useState } from "react";
import createClient from "@/lib/supabase/client";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        console.error("Sign in error:", error);
        alert("Failed to sign in");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 font-medium hover:bg-gray-50 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>
      </div>
    </div>
  );
}
