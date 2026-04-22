"use server";

import createClient from "@/lib/supabase/server";

export type OrderRow = {
  id: number;
  created_at: string;
  status: string;
};

export default async function getOrdersByRange(from: number, to: number) {
  const supabase = await createClient();

  const { data: orders, error } = await supabase
    .from("orders")
    .select("id, created_at, status")
    .range(from, to)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    return { orders: [] as OrderRow[], totalOrders: 0 };
  }

  const { count: totalOrders, error: totalOrdersError } = await supabase
    .from("orders")
    .select("id", { count: "exact", head: true });

  if (totalOrdersError) {
    console.error("Error fetching total orders:", totalOrdersError);
    return { orders: orders ?? [], totalOrders: (orders ?? []).length };
  }

  return { orders: orders ?? [], totalOrders: totalOrders ?? 0 };
}
