import { ProductType } from "@/type/ProductType";
import ProductCard from "./ProductCard";

export default function Product({ products }: { products: ProductType[] }) {
  return (
    <div className=" my-24">
      <h2 className="text-xl md:text-3xl text-center my-4 capitalize font-bold text-accent bg-accent/10 inline-flex items-center gap-2 px-3 py-1 rounded-xl w-max mx-auto">
        Our Product
      </h2>

      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
