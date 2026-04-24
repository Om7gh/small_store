"use client";

import { ProductType } from "@/type/ProductType";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaArrowRightLong } from "react-icons/fa6";

export default function ProductCard({ product }: { product: ProductType }) {
  const pathname = usePathname();
  const redirectUrl =
    pathname === "/" || pathname === "/product"
      ? `product/${product.id}`
      : pathname === "/product"
        ? `./${product.id}`
        : "";
  return (
    <Link
      href={redirectUrl}
      key={product.id}
      className="shadow  text-left flex flex-col  hover:shadow-md transition-shadow duration-150 group bg-accent/10 hover:bg-primary/10"
    >
      <div className="min-h-92 h-92 w-full overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full  object-cover  group-hover:scale-[1.2] duration-150"
        />
      </div>
      <h3 className="text-xl font-semibold p-4">{product.name}</h3>
      <p className="text-text/60 font-normal p-4">
        {product.description.length > 40
          ? product.description.substring(0, 40) + "..."
          : product.description}
      </p>
      <div className="flex justify-between items-end   gap-6 p-4">
        <p className="text-lg font-bold text-accent self-end">
          {product.price.toFixed(2)} MAD
        </p>
        <button className="mt-auto px-4 py-2 bg-accent text-white  hover:bg-accent/90 transition-colors duration-150 group text-sm capitalize">
          shop{" "}
          <FaArrowRightLong className="inline-block ml-2 group-hover:translate-x-2 duration-150" />
        </button>
      </div>
    </Link>
  );
}
