import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  const { supabaseResponse, supabase } = await updateSession(request);
  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;
  const pathname = request.nextUrl.pathname;
  let userRole = "customer";

  if (user) {
    if (user.user_role) {
      userRole = user.user_role as string;
    } else {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.sub)
        .single();
      if (profile?.role) userRole = profile.role;
    }
  }

  const isAdminRoute = pathname.startsWith("/admin");
  const isCustomerRoute =
    pathname.startsWith("/customer") || pathname.startsWith("/checkout"); // or /dashboard
  const isGuestRoute = ["/auth/login", "/auth/signin-google"].some((r) =>
    pathname.startsWith(r),
  );

  const redirect = (path: string) => {
    const url = request.nextUrl.clone();
    url.pathname = path;
    url.search = "";

    const response = NextResponse.redirect(url);
    supabaseResponse.cookies.getAll().forEach((c) => response.cookies.set(c));
    return response;
  };

  if (isAdminRoute && userRole !== "admin") {
    return redirect("/");
  }

  if (isCustomerRoute && !user) {
    return redirect("/auth/login");
  }

  if (isCustomerRoute && userRole === "admin") {
    return redirect("/");
  }

  if (user && isGuestRoute) {
    return redirect("/");
  }

  return supabaseResponse;
}
