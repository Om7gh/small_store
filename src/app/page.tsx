import Home from "@/components/layout/Home";
import Product from "@/components/layout/product/Product";
import createClient from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createClient();

  const { data: lastThreeProducts } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3);

  const { data: allProducts } = await supabase
    .from("products")
    .select("*")
    .gt("stock", 0)
    .limit(6);

  return (
    <main className="mx-auto my-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8 ">
      <Home products={lastThreeProducts || []} />
      <Product products={allProducts || []} title="Our Latest Products" />
    </main>
  );
}
