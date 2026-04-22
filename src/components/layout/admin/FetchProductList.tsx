"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductInventoryTable } from "./ProductList";
import { Fragment, useEffect, useState } from "react";
import getProductsByRange from "@/actions/admin/getProductsByRange";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname } from "next/navigation";

export default function FetchProductList({
  from,
  to,
  currentPage,
  itemLimit,
}: {
  from: number;
  to: number;
  currentPage: number;
  itemLimit: number;
}) {
  const pathname = usePathname();
  const [products, setProducts] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  const totalPages = Math.max(1, Math.ceil(total / itemLimit));

  const createPageHref = (page: number) => `${pathname}?page=${page}`;

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pages = new Set<number>([1, totalPages, currentPage]);
    if (currentPage > 1) pages.add(currentPage - 1);
    if (currentPage < totalPages) pages.add(currentPage + 1);

    return Array.from(pages).sort((a, b) => a - b);
  };

  async function fetchProducts() {
    try {
      const { products, totalProducts } = await getProductsByRange(from, to);
      setProducts(products ?? []);
      setTotal(totalProducts || 0);
    } catch (error) {
      toast.error("Failed to fetch products. Please try again later.");
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [from, to]);

  return (
    <div className="mt-6">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="px-3 py-2 text-accent font-bold">
              Image
            </TableHead>
            <TableHead className="px-3 py-2 text-accent font-bold">
              Name
            </TableHead>
            <TableHead className="px-3 py-2 text-accent font-bold">
              Description
            </TableHead>
            <TableHead className="px-3 py-2 text-accent font-bold">
              Stock
            </TableHead>
            <TableHead className="px-3 py-2 text-accent font-bold">
              Price
            </TableHead>
            <TableHead className="px-3 py-2 text-accent font-bold">
              Category
            </TableHead>
            <TableHead className="px-3 py-2 text-accent font-bold">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product) => (
            <ProductInventoryTable key={product.id} product={product} />
          ))}
        </TableBody>
      </Table>

      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={createPageHref(Math.max(1, currentPage - 1))}
              className={
                currentPage <= 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {getPageNumbers().map((page, index, pages) => {
            const previousPage = pages[index - 1];
            const showEllipsis = previousPage && page - previousPage > 1;

            return (
              <Fragment key={page}>
                {showEllipsis ? (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : null}

                <PaginationItem>
                  <PaginationLink
                    href={createPageHref(page)}
                    isActive={page === currentPage}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              </Fragment>
            );
          })}

          <PaginationItem>
            <PaginationNext
              href={createPageHref(Math.min(totalPages, currentPage + 1))}
              className={
                currentPage >= totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
