import createClient from "@/lib/supabase/server";

export async function isAdmin({ id }: { id: string }) {
  const supabase = await createClient();

  const { data: user } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", id)
    .single();

  if (!user) {
    throw new Error("User not authenticated");
  }

  return profile?.role === "admin";
}
