import createClient from "@/lib/supabase/server";
import Link from "next/link";

export default async function CustomerPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user?.id);

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-normal sm:text-4xl">
          Welcome{" "}
          <span className="text-accent font-bold capitalize">
            {user?.user_metadata?.full_name}
          </span>
        </h2>
        <p className="text-text/60 text-lg">
          All your orders will appear here.
        </p>
      </div>

      <div className="">
        {orders && orders.length > 0 ? (
          <ul className="mt-10 space-y-4">
            {orders.map((order) => (
              <Link
                href={`/customer/orders/${order.id}`}
                key={order.id}
                className="flex flex-col gap-3 p-4 shadow-lg transition-shadow hover:shadow-lg sm:flex-row sm:items-center sm:justify-between"
              >
                <p className="break-all">Order ID: {order.id}</p>
                <p className="sm:text-right">
                  Status:{" "}
                  <span className="font-bold text-orange-500">
                    {order.status}
                  </span>
                </p>
                <button className="mt-1 self-start border border-primary/80 px-4 py-2 text-text hover:border-primary/60 sm:mt-0 sm:self-auto">
                  View Details
                </button>
              </Link>
            ))}
          </ul>
        ) : (
          <div className="shadow-lg p-6 border-t-2 border-accent my-8">
            <p className="mt-6 text-center text-text/60">
              You have no orders yet.
              <Link href="/product" className="block text-center">
                <button className="mt-4 rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/60">
                  Browse our Products
                </button>
              </Link>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
