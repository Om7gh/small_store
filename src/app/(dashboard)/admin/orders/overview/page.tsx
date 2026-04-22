import CreateOrdersTable from "@/components/layout/admin/OrdersTable";

const ITEM_LIMIT = 10;

type OrdersOverviewPageProps = {
  searchParams?: Promise<{ page?: string }>;
};

export default async function OrdersOverviewPage({
  searchParams,
}: OrdersOverviewPageProps) {
  const params = await searchParams;
  const parsedPage = Number(params?.page ?? "1");
  const currentPage =
    Number.isFinite(parsedPage) && parsedPage > 0 ? Math.floor(parsedPage) : 1;
  const from = (currentPage - 1) * ITEM_LIMIT;
  const to = from + ITEM_LIMIT - 1;

  return (
    <main className="mx-auto w-full px-4 py-10 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold">Orders</h2>
      <p className="mt-2 text-text/80">
        Track payment activity and order transactions here.
      </p>
      <CreateOrdersTable
        from={from}
        to={to}
        currentPage={currentPage}
        itemLimit={ITEM_LIMIT}
      />
    </main>
  );
}
