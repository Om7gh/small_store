import createClient from "@/lib/supabase/server";
import { ProductType } from "@/type/ProductType";
import Image from "next/image";
import { notFound } from "next/navigation";
import QuantityController from "@/components/layout/product/QuantityController";
import AddProductToCart from "@/components/layout/product/AddToCart";
import BackBtn from "@/components/shared/BackBtn";
import Product from "@/components/layout/product/Product";

type ProductDetails = ProductType & {
  stock: number;
  category: string;
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from("products")
    .select("id,name,description,price,image_url,stock, category")
    .eq("id", id)
    .single<ProductDetails>();

  if (error || !product) {
    notFound();
  }
  const { data: relatedProducts } = await supabase
    .from("products")
    .select("*")
    .neq("id", product.id)
    .eq("category", product.category)
    .limit(4);
  console.log(product);
  console.log(relatedProducts);

  const displayPrice = Number(product.price).toFixed(2);
  const inStock = product.stock > 0;
  return (
    <section className="mx-auto my-12 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <BackBtn />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="relative overflow-hidden border border-accent/20 bg-accent/10">
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-accent/10 via-transparent to-primary/10" />
          <div className="relative aspect-4/5 w-full">
            <Image
              src={product.image_url}
              alt={product.name}
              loading="eager"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        <div className=" border border-accent/20 bg-background/70 p-6 shadow-lg shadow-black/20 sm:p-8">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
            Dictionary Collection
          </p>

          <p className="mt-3 text-xs font-normal text-text px-3 py-1 w-fit shadow bg-primary ">
            {product.category}
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-text sm:text-4xl">
            {product.name}
          </h2>

          <p className="mt-3 text-base leading-7 text-text/80">
            {product.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <p className="text-3xl font-extrabold text-accent">
              {displayPrice} MAD
            </p>
            <span
              className={` border px-3 py-1 text-sm font-medium ${
                inStock
                  ? "border-teal-400/50 bg-teal-400/10 text-teal-300"
                  : "border-primary/60 bg-primary/15 text-primary"
              }`}
            >
              {inStock ? `${product.stock} pieces left` : "Out of stock"}
            </span>
          </div>

          <div className="mt-8 space-y-3">
            <label htmlFor="qty" className="text-sm font-medium text-text/80">
              Quantity
            </label>
            <div className="flex items-center gap-3">
              <QuantityController
                product={product}
                productId={product.id}
                stock={product.stock}
              />
              <AddProductToCart product={product} stock={product.stock} />
            </div>
          </div>

          <p className="mt-6 text-sm text-text/60">Free delivery</p>
        </div>
      </div>

      <Product products={relatedProducts || []} title="You might also like" />
    </section>
  );
}
