import AllProduct from "@/components/layout/AllProduct";
import { ITEM_LIMIT } from "../(dashboard)/admin/users/overview/page";

export default async function page({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const search = await searchParams;
  const parsePage = Number(search?.page ?? "1");
  const currentPage =
    Number.isFinite(parsePage) && parsePage > 0 ? Math.floor(parsePage) : 1;
  const from = (currentPage - 1) * ITEM_LIMIT;
  const to = from + ITEM_LIMIT - 1;
  return (
    <div className="text-center mt-8">
      <h2 className="text-accent font-bold ">All Products</h2>
      <p className="text-text font-normal">View all products in one place.</p>

      <AllProduct
        from={from}
        to={to}
        currentPage={currentPage}
        itemLimit={ITEM_LIMIT}
      />
    </div>
  );
}
