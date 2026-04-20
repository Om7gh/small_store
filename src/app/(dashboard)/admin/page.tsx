import { ChartBarInteractive } from "@/components/layout/admin/Chart_bar_daily_data";
import { ConversionChart } from "@/components/layout/admin/ConversionChart";
import { TopProductSells } from "@/components/layout/admin/TopProductSells";
import createClient from "@/lib/supabase/server";

export default function AdminPage() {
  return (
    <main className="mx-auto w-full px-4 py-10 sm:px-6 lg:px-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
      <ActiveOrders />
      <TotalVisitors />
      <TotalRevenue />
      <ConversionRate />
      <TotalProductsSells />
    </main>
  );
}

function TotalRevenue() {
  return <ChartBarInteractive />;
}

function ConversionRate() {
  return <ConversionChart />;
}

async function ActiveOrders() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("orders")
    .select("*")
    .eq("status", "pending");
  return (
    <div className="rounded-lg p-6 shadow border-l-4 border-primary">
      <h2 className="text-lg font-medium ">Active Orders</h2>
      <p className="mt-4 text-3xl font-semibold ">{data?.length || 0}</p>
    </div>
  );
}

async function TotalVisitors() {
  const supabase = await createClient();

  const { data } = await supabase.from("profiles").select("*");
  return (
    <div className="rounded-lg p-6 shadow border-l-4 border-accent">
      <h2 className="text-lg font-medium ">Total Customers</h2>
      <p className="mt-4 text-3xl font-semibold ">{data?.length || 0}</p>
    </div>
  );
}

function TotalProductsSells() {
  return <TopProductSells />;
}
