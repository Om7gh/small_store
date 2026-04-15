import createClient from "@/lib/supabase/server";
import { Eye, Trash } from "lucide-react";
import Link from "next/link";

export default async function page() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("orders")
    .select("*")
    .eq("status", "pending");

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <h2 className="mb-4 text-xl font-bold sm:text-2xl">Pending Orders</h2>
        <ul className="space-y-4">
          {data?.map((order) => (
            <Link
              href={`/customer/orders/${order.id}`}
              key={order.id}
              className="flex flex-col gap-2 rounded-md bg-secondary p-4 shadow-sm transition-colors hover:bg-secondary/80 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between"
            >
              <p className="break-all">
                <strong>Order ID:</strong> {order.id}
              </p>
              <p>
                <strong>Customer Name:</strong> {order.customer_name}
              </p>
              <p>
                <strong>Total Amount:</strong> ${order.total_amount}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>

              <button className="group mt-1 self-start bg-primary/10 px-4 py-2 text-text transition-colors hover:bg-primary/20 sm:mt-0 sm:self-auto">
                <Eye className="group-hover:text-primary" />
              </button>
            </Link>
          ))}
        </ul>
      </div>
    </main>
  );
}
