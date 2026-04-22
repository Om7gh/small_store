import UserList from "@/components/layout/admin/UserList";

export const ITEM_LIMIT = 10;

export type UsersOverviewPageProps = {
  searchParams?: Promise<{ page?: string }>;
};

export default async function UsersOverviewPage({
  searchParams,
}: UsersOverviewPageProps) {
  const params = await searchParams;
  const parsedPage = Number(params?.page ?? "1");
  const currentPage =
    Number.isFinite(parsedPage) && parsedPage > 0 ? Math.floor(parsedPage) : 1;

  const from = (currentPage - 1) * ITEM_LIMIT;
  const to = from + ITEM_LIMIT - 1;

  return (
    <main className="mx-auto w-full px-4 py-10 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold">Manage Users</h2>
      <p className="mt-2 text-text/80">
        View user accounts and permissions in one place.
      </p>
      <UserList
        from={from}
        to={to}
        currentPage={currentPage}
        itemLimit={ITEM_LIMIT}
      />
    </main>
  );
}
