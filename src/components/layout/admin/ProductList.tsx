"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function ProductInventoryTable({ product }: { product: any }) {
  const router = useRouter();
  return (
    <div className="flex justify-between">
      <li className=" shadow-lg p-4 flex items-center gap-4">
        <div className="h-52 w-52 overflow-hidden border-2 border-accent/40 p-1 hover:p-0 transition-all group">
          <Image
            src={product.image_url}
            alt={product.name}
            width={400}
            height={400}
            className="h-full w-full object-cover group-hover:scale-110 transition-transform"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <h3 className="text-md font-normal text-accent">name</h3>
            <p className="text-sm text-text">{product.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <h3 className="text-md font-normal text-accent">description</h3>
            <p className="text-sm text-text">{product.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <h3 className="text-md font-normal text-accent">stock</h3>
            <p className="text-sm text-text">{product.stock}</p>
          </div>
          <div className="flex items-center gap-4">
            <h3 className="text-md font-normal text-accent">price</h3>
            <p className="text-sm text-text">${product.price.toFixed(2)}</p>
          </div>
          <div className="flex items-center gap-4">
            <h3 className="text-md font-normal text-accent">category</h3>
            <p className="text-sm text-text">{product.category}</p>
          </div>
          <div className="space-x-2">
            <Button
              onClick={() => {
                router.push(`/admin/product/${product.id}`);
              }}
              variant="outline"
              size="sm"
              className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer"
            >
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-rose-500/15 text-rose-500/80 hover:bg-rose-500/20 cursor-pointer"
            >
              Delete
            </Button>
          </div>
        </div>
      </li>
    </div>
  );
}
