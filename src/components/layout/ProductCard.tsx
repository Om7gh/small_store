import { ProductType } from "@/type/ProductType";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

export default function ProductCard({ product }: { product: ProductType }) {
  return (
    <Link
      href={`product/${product.id}`}
      key={product.id}
      className=" p-4 rounded-lg  shadow  text-left space-y-2 flex flex-col border border-accent/10  hover:shadow-md transition-shadow duration-150 group"
    >
      <div className="h-full w-full">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-48  object-cover rounded-md"
        />
      </div>
      <h3 className="text-xl font-semibold">{product.name}</h3>
      <p>
        {product.description.length > 40
          ? product.description.substring(0, 40) + "..."
          : product.description}
      </p>
      <div className="flex justify-between items-end  h-full gap-6">
        <p className="text-lg font-bold text-accent self-end">
          {product.price.toFixed(2)} MAD
        </p>
        <button className="mt-auto px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors duration-150 group text-sm capitalize">
          shop{" "}
          <FaArrowRightLong className="inline-block ml-2 group-hover:translate-x-2 duration-150" />
        </button>
      </div>
    </Link>
  );
}
