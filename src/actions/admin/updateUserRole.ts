"use server";

import createClient from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export default async function updateUserRole(userId: string, newRole: string) {
  const supabase = await createClient();

  const { data: user } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  const { error } = await supabase
    .from("profiles")
    .update({ role: newRole })
    .eq("id", userId);

  if (error) {
    console.error("Error updating user role:", error);
    throw new Error("Failed to update user role");
  }
  revalidatePath("/admin/users");
}
