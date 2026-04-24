"use client";
import getProductsByRange from "@/actions/admin/getProductsByRange";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ProductType } from "@/type/ProductType";
import { Fragment, useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Product from "./product/Product";
import ProductCard from "./product/ProductCard";

export default function AllProduct({
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
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<ProductType[]>([]);
  const [totalProduct, setTotalProduct] = useState<number>(0);

  const totalPages = Math.max(1, Math.ceil(totalProduct / itemLimit));

  const createPageHref = useMemo(
    () => (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      return `${pathname}?${params.toString()}`;
    },
    [pathname, searchParams],
  );

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pages = new Set<number>([1, totalPages, currentPage]);
    if (currentPage > 1) pages.add(currentPage - 1);
    if (currentPage < totalPages) pages.add(currentPage + 1);

    return Array.from(pages).sort((a, b) => a - b);
  };

  async function getProducts() {
    try {
      const { products, totalProducts } = await getProductsByRange(from, to);
      setProduct(products);
      setTotalProduct(totalProducts || 0);
    } catch (e) {
      setProduct([]);
      setTotalProduct(0);
    }
  }

  useEffect(() => {
    getProducts();
  }, [from, to]);

  return (
    <div className="m-24">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {product.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <Pagination className="mt-12">
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
