import { ProductInventoryTable } from "@/components/layout/admin/ProductList";
import createClient from "@/lib/supabase/server";

export default async function ProductsOverviewPage() {
  const supabase = await createClient();
  const { data: products } = await supabase.from("products").select("*");
  return (
    <main className="mx-auto w-full px-4 py-10 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-accent">All Products</h2>
      <ul className="mt-6 divide-y divide-accent/20">
        {products?.map((product) => (
          <ProductInventoryTable key={product.id} product={product} />
        ))}
      </ul>
    </main>
  );
}
