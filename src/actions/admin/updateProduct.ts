"use server";

import createClient from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export default async function updateProduct(data: FormData) {
  const supabase = await createClient();

  const formData = {
    name: data.get("name") as string,
    description: data.get("description") as string,
    price: parseFloat(data.get("price") as string),
    category: data.get("category") as string,
    image_url: data.get("image_url") as string,
    stock: data.get("stock") ? parseInt(data.get("stock") as string) : 0,
  };

  const { error } = await supabase
    .from("products")
    .update(formData)
    .eq("id", data.get("id") as string);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/products/overview");
  revalidatePath("/admin/products/[id]");
  return { success: true };
}
