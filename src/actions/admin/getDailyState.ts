import createClient from "@/lib/supabase/server";

export default async function getDailyState() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("daily_revenue_stats")
    .select("*")
    .gte("date", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
    .order("date", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }
  return data;
}
