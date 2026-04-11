"use client";

import { useState } from "react";

type LoginProps = {
  title?: string;
  subtitle?: string;
  actionUrl?: string;
  errorMessage?: string;
};

export default function Login({
  subtitle = "Sign in with Google to continue",
  actionUrl = "/auth/signin-google",
  errorMessage,
}: LoginProps) {
  const [loading, setLoading] = useState(false);

  const onGoogleLogin = () => {
    setLoading(true);
    window.location.href = actionUrl;
  };

  return (
    <section className="w-full max-w-md  p-6 shadow-sm backdrop-blur-sm">
      <header className="mb-6 text-center">
        <p className="mt-2 text-text/80">{subtitle}</p>
        {errorMessage ? (
          <p className="mt-2 text-sm text-red-500 wrap-break-word">
            {errorMessage}
          </p>
        ) : null}
      </header>

      <button
        onClick={onGoogleLogin}
        disabled={loading}
        className="w-full rounded-lg bg-accent/20 px-4 py-3 font-medium transition hover:bg-primary/40 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Redirecting..." : "Continue with Google"}
      </button>
    </section>
  );
}
