"use server";

import createClient from "@/lib/supabase/server";

export default async function getUserData(from: number, to: number) {
  const supabase = await createClient();

  const { data: users, error } = await supabase
    .from("profiles")
    .select("*")
    .range(from, to)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching users:", error);
    return { users: [], phoneNumbers: [], totalUsers: 0 };
  }

  const { count: totalUsers, error: countError } = await supabase
    .from("profiles")
    .select("id", { count: "exact", head: true });

  if (countError) {
    console.error("Error fetching users count:", countError);
  }

  const userIds = (users ?? []).map((user) => user.id);

  if (userIds.length === 0) {
    return { users: [], phoneNumbers: [], totalUsers: totalUsers ?? 0 };
  }

  const { data: phoneNumbers, error: phoneError } = await supabase
    .from("address")
    .select("user_id, phone, created_at")
    .in("user_id", userIds)
    .order("created_at", { ascending: false });

  if (phoneError) {
    console.error("Error fetching phone numbers:", phoneError);
    return {
      users,
      phoneNumbers: [],
      totalUsers: totalUsers ?? users.length,
    };
  }

  return {
    users,
    phoneNumbers,
    totalUsers: totalUsers ?? users.length,
  };
}
