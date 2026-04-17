import getTopProductSells from "@/actions/admin/topProductSells";
import { TopProductSellsClient } from "./TopProductSells.client";

type TopProductRow = {
  id: string;
  name: string | null;
  image_url: string | null;
  revenue: number | null;
  total_units_sold: number | null;
};

export async function TopProductSells() {
  const data = (await getTopProductSells()) as TopProductRow[] | null;
  const chartData = (data ?? []).map((item) => ({
    id: String(item.id),
    name: item.name ?? "Unknown",
    imageUrl: item.image_url ?? null,
    revenue: Number(item.revenue ?? 0),
    totalUnitsSold: Number(item.total_units_sold ?? 0),
  }));

  return <TopProductSellsClient data={chartData} />;
}
