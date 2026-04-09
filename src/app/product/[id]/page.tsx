import createClient from "@/lib/supabase/server";

export default async function ProductItem({
  param,
}: {
  param: { id: string };
}) {
  console.log(param);
  const { id } = param;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  return <div>{product.name}</div>;
}
