import { NextResponse } from "next/server";
import createClient from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const oauthError = searchParams.get("error");
  const oauthErrorDescription = searchParams.get("error_description");
  const code = searchParams.get("code");
  let next = searchParams.get("next") ?? "/";
  if (!next.startsWith("/")) {
    next = "/";
  }

  if (oauthError) {
    const message = encodeURIComponent(
      oauthErrorDescription ??
        oauthError ??
        "OAuth provider returned an error.",
    );
    return NextResponse.redirect(`${origin}/auth/login?error=${message}`);
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }

    const message = encodeURIComponent(error.message);
    return NextResponse.redirect(`${origin}/auth/login?error=${message}`);
  }

  return NextResponse.redirect(
    `${origin}/auth/login?error=${encodeURIComponent("Missing authorization code.")}`,
  );
}
