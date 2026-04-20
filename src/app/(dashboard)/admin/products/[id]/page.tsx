import UpdateProductForm from "@/components/layout/admin/UpdateProductForm";
import createClient from "@/lib/supabase/server";
import { toast } from "sonner";

export default async function ProductDetailPage(params: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params.params;
  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    toast.error("Failed to load product details.");
    return <div className="text-red-500">Error loading product details.</div>;
  }
  return (
    <main className="mx-auto w-full px-4 py-10 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-accent">Product Detail</h2>
      <UpdateProductForm productId={id} product={product} />
    </main>
  );
}
