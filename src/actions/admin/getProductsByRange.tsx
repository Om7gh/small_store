"use server";

import createClient from "@/lib/supabase/server";

export default async function getProductsByRange(from: number, to: number) {
  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .range(from, to)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return { products: [], totalProducts: 0 };
  }

  const { count: totalProducts, error: totalProductsError } = await supabase
    .from("products")
    .select("id", { count: "exact", head: true });

  if (totalProductsError) {
    console.error("Error fetching total products:", totalProductsError);
    return { products, totalProducts: products.length };
  }

  return { products, totalProducts };
}
