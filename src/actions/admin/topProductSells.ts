import createClient from "@/lib/supabase/server";

export default async function ConversionChart() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("top_products_overview")
    .select("*")
    .order("total_units_sold", { ascending: false })
    .limit(5);

  if (error) {
    throw new Error(`Failed to fetch Top Products : ${error.message}`);
  }

  return data;
}
