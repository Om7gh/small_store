"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function ProductInventoryTable({ product }: { product: any }) {
  const router = useRouter();
  return (
    <div className="flex w-full flex-col gap-4 rounded-lg  p-3 sm:p-4 lg:flex-row lg:items-center lg:justify-between">
      <li className="flex w-full list-none flex-col gap-4 sm:flex-row sm:items-start">
        <div className="group h-40 w-full overflow-hidden border-2 border-accent/40 p-1 transition-all hover:p-0 sm:h-44 sm:w-54 md:h-52 md:w-72">
          <Image
            src={product.image_url}
            alt={product.name}
            width={400}
            height={400}
            className="h-full w-full object-cover transition-transform group-hover:scale-110"
          />
        </div>
        <div className="w-full space-y-2 overflow-hidden">
          <div className="flex flex-wrap items-start gap-x-3 gap-y-1">
            <h3 className="text-md font-normal text-accent">name</h3>
            <p className="max-w-full wrap-break-words text-sm text-text">
              {product.name}
            </p>
          </div>
          <div className="flex flex-wrap items-start gap-x-3 gap-y-1">
            <h3 className="text-md font-normal text-accent">description</h3>
            <p className="max-w-full wrap-break-words text-sm text-text">
              {product.description}
            </p>
          </div>
          <div className="flex flex-wrap items-start gap-x-3 gap-y-1">
            <h3 className="text-md font-normal text-accent">stock</h3>
            <p className="text-sm text-text">{product.stock}</p>
          </div>
          <div className="flex flex-wrap items-start gap-x-3 gap-y-1">
            <h3 className="text-md font-normal text-accent">price</h3>
            <p className="text-sm text-text">${product.price.toFixed(2)}</p>
          </div>
          <div className="flex flex-wrap items-start gap-x-3 gap-y-1">
            <h3 className="text-md font-normal text-accent">category</h3>
            <p className="max-w-full wrap-break-words text-sm text-text">
              {product.category}
            </p>
          </div>
        </div>
      </li>
      <div className="flex w-full gap-2 sm:w-auto sm:justify-end lg:self-end">
        <Button
          onClick={() => {
            router.push(`/admin/products/${product.id}`);
          }}
          variant="outline"
          size="sm"
          className="h-9 flex-1 cursor-pointer bg-primary/10 text-primary hover:bg-primary/20 sm:flex-none"
        >
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-9 flex-1 cursor-pointer bg-rose-500/15 text-rose-500/80 hover:bg-rose-500/20 sm:flex-none"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
