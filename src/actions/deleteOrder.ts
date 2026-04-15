import createClient from "@/lib/supabase/server";

export default async function deleteOrder(orderId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .delete()
    .eq("id", orderId)
    .single();

  if (error) {
    console.error("Error deleting order:", error);
    throw new Error("Failed to delete order");
  }

  return data;
}
