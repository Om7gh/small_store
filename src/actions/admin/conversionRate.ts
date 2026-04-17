import createClient from "@/lib/supabase/server";

export default async function ConversionRate() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("order_conversion_rate")
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
