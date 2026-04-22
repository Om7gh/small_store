"use client";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function ProductInventoryTable({ product }: { product: any }) {
  const router = useRouter();
  return (
    <TableRow>
      <TableCell className="min-w-44 p-3">
        <div className="group h-24 w-32 overflow-hidden rounded border border-accent/40">
          <Image
            src={product.image_url}
            alt={product.name}
            width={400}
            height={400}
            className="h-full w-full object-cover transition-transform group-hover:scale-110"
          />
        </div>
      </TableCell>
      <TableCell className="max-w-[220px] whitespace-normal break-words p-3 text-sm">
        {product.name}
      </TableCell>
      <TableCell className="max-w-[320px] whitespace-normal break-words p-3 text-sm text-text/85">
        {product.description}
      </TableCell>
      <TableCell className="p-3 text-sm">{product.stock}</TableCell>
      <TableCell className="p-3 text-sm">${product.price.toFixed(2)}</TableCell>
      <TableCell className="max-w-[180px] whitespace-normal break-words p-3 text-sm">
        {product.category}
      </TableCell>
      <TableCell className="p-3">
        <div className="flex gap-2">
          <Button
            onClick={() => {
              router.push(`/admin/products/${product.id}`);
            }}
            variant="outline"
            size="sm"
            className="h-9 cursor-pointer bg-primary/10 text-primary hover:bg-primary/20"
          >
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-9 cursor-pointer bg-rose-500/15 text-rose-500/80 hover:bg-rose-500/20"
          >
            Delete
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
