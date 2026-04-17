import { ChartBarInteractive } from "@/components/layout/admin/Chart_bar_daily_data";
import { ConversionChart } from "@/components/layout/admin/ConversionChart";
import { TopProductSells } from "@/components/layout/admin/TopProductSells";

export default function AdminPage() {
  return (
    <main className="mx-auto w-full px-4 py-10 sm:px-6 lg:px-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
      <TotalRevenue />
      <ConversionRate />
      <ActiveOrders />
      <TotalVisitors />
      <TotalProducsSells />
    </main>
  );
}

function TotalRevenue() {
  return <ChartBarInteractive />;
}

function ConversionRate() {
  return <ConversionChart />;
}

function ActiveOrders() {
  return (
    <div className="rounded-lg p-6 shadow">
      <h2 className="text-lg font-medium ">Active Orders</h2>
      <p className="mt-4 text-3xl font-semibold ">123</p>
    </div>
  );
}

function TotalVisitors() {
  return (
    <div className=" shadow">
      <h2 className="text-lg font-medium ">Total Visiteur</h2>
      <p className="mt-4 text-3xl font-semibold ">456</p>
    </div>
  );
}

function TotalProducsSells() {
  return <TopProductSells />;
}
