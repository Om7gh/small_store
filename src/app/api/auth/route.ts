import { NextResponse } from "next/server";
import createClient from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(
      new URL("/auth/login", process.env.NEXT_PUBLIC_SUPABASE_URL),
    );
  }

  return NextResponse.json({ user });
}

export async function POST() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  return NextResponse.redirect(
    new URL("/auth/login", process.env.NEXT_PUBLIC_SUPABASE_URL),
  );
}
