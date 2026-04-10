"use client";
import useStore from "@/store";
import { ProductType } from "@/type/ProductType";

export default function AddProductToCart({
  product,
}: {
  product: ProductType;
}) {
  const { setProduct } = useStore();
  return (
    <button
      type="button"
      className="inline-flex items-center border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
      onClick={() => setProduct(product)}
    >
      Add to Cart
    </button>
  );
}
