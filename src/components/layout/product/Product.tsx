import { ProductType } from "@/type/ProductType";
import ProductCard from "./ProductCard";

export default function Product({
  products,
  title,
}: {
  products: ProductType[];
  title: string;
}) {
  return (
    <div className=" my-24">
      <h2 className="text-xl md:text-3xl text-center my-4 capitalize font-bold text-accent bg-accent/10 inline-flex items-center gap-2 px-6 py-3  w-max mx-auto">
        {title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
