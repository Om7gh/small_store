"use server";

import createClient from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

type CreateOrderInput = {
  items: {
    productId: number;
    quantity: number;
    priceAtTime: number;
  }[];
  paymentMethod?: string;
};

export async function storeUserAddress(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be signed in to store an address.");
  }

  const addressData = {
    user_id: user.id,
    state: formData.get("state") as string,
    city: formData.get("city") as string,
    street: formData.get("street") as string,
    postal_code: Number(formData.get("postalCode")),
    phone: Number(formData.get("phone")),
  };

  const { error } = await supabase.from("address").insert(addressData);
  if (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error inserting address:", error);
    }
    throw new Error("Failed to store user address.");
  }

  revalidatePath("/checkout");
}

export async function createOrder({
  items,
  paymentMethod = "cod",
}: CreateOrderInput) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be signed in to confirm an order.");
  }

  if (!items.length) {
    throw new Error("Your cart is empty.");
  }

  const { data: address, error: addressError } = await supabase
    .from("address")
    .select("id")
    .eq("user_id", user.id)
    .order("id", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (addressError) {
    throw new Error("Failed to fetch your address.");
  }

  if (!address?.id) {
    throw new Error("Please save your address before confirming order.");
  }

  const totalAmount = items.reduce(
    (sum, item) => sum + item.priceAtTime * item.quantity,
    0,
  );

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      address_id: address.id,
      status: "pending",
      total_amount: totalAmount,
      payment_method: paymentMethod,
      is_paid: false,
    })
    .select("id")
    .single();

  if (orderError || !order?.id) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error creating order:", orderError);
    }
    throw new Error("Failed to create order.");
  }

  const orderItemsPayload = items.map((item) => ({
    order_id: order.id,
    product_id: item.productId,
    quantity: item.quantity,
    price_at_time: item.priceAtTime,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItemsPayload);

  if (itemsError) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error creating order items:", itemsError);
    }
    await supabase.from("orders").delete().eq("id", order.id);
    throw new Error("Failed to save order items.");
  }

  revalidatePath("/checkout");
  revalidatePath("/dashboard");

  return { orderId: order.id };
}
