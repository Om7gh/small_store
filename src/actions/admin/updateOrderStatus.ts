"use server";

import { ORDER_STATUS_OPTIONS } from "@/components/layout/admin/OrdersTable";
import createClient from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type OrderStatus = (typeof ORDER_STATUS_OPTIONS)[number];

export default async function updateOrderStatus({
  orderId,
  newStatus,
}: {
  orderId: number;
  newStatus: OrderStatus;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .update({ status: newStatus })
    .eq("id", orderId)
    .select("*")
    .single();

  if (error) {
    throw new Error("Failed to update order status.");
  }
  revalidatePath("/admin/orders/overview");
  revalidatePath(`/admin/`);
  return data;
}
