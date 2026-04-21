"use server";

import createClient from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export default async function createProduct(data: FormData) {
  const supabase = await createClient();

  const productData = {
    name: data.get("name") as string,
    description: data.get("description") as string,
    price: parseFloat(data.get("price") as string),
    stock: parseInt(data.get("stock") as string, 10),
    category: data.get("category") as string,
    image_url: data.get("image_url") as string,
  };

  const { data: product, error } = await supabase
    .from("products")
    .insert(productData)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/products");
  revalidatePath("/admin");
  revalidatePath("/products");
  return product;
}
