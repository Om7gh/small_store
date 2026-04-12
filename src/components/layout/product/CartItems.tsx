import { ProductItem } from "@/store";
import Image from "next/image";
import { LucideTrash } from "lucide-react";
export default function CartItem({
  product,
  removeProduct,
}: {
  product: ProductItem;
  removeProduct: (productId: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3  bg-background/60 p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-4">
      <div className="relative h-36 w-full overflow-hidden sm:h-20 sm:w-20 sm:shrink-0">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h3 className="line-clamp-2 text-sm font-medium sm:text-base">
          {product.name}
        </h3>
        <h4 className="text-sm font-semibold text-primary sm:text-base">
          {Number(product.price * product.quantity).toFixed(2)} MAD
        </h4>
        <p className="text-xs text-text/80 sm:text-sm">
          Quantity: {product.quantity}
        </p>
      </div>

      <div className="flex justify-end sm:self-end">
        <button
          type="button"
          className="grid size-9 place-items-center text-text transition-colors hover:bg-primary/10"
          onClick={() => removeProduct(product.id)}
          aria-label={`Remove ${product.name} from cart`}
        >
          <LucideTrash className="size-5" />
        </button>
      </div>
    </div>
  );
}
