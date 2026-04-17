import getDailyState from "@/actions/admin/getDailyState";
import { ChartBarInteractiveClient } from "./Chart_bar_daily_data.client";

type DailyStatRow = {
  date: string;
  amount: number | null;
  order_count: number | null;
};

export async function ChartBarInteractive() {
  const data = (await getDailyState()) as DailyStatRow[] | null;
  const chartData = (data ?? []).map((item) => ({
    date: item.date,
    amount: Number(item.amount ?? 0),
    orderCount: Number(item.order_count ?? 0),
  }));

  return <ChartBarInteractiveClient data={chartData} />;
}
