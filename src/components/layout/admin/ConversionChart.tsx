import getConversionRate from "@/actions/admin/conversionRate";
import { ConversionChartClient } from "./ConversionChart.client";

type ConversionRateRow = {
  total_attempts: number | null;
  successful_orders: number | null;
  rejected_orders: number | null;
  conversion_rate_percentage: number | null;
};

type ConversionSlice = {
  status: "successful" | "rejected" | "pending";
  count: number;
  fill: string;
};

export async function ConversionChart() {
  const data = (await getConversionRate()) as ConversionRateRow[] | null;
  const row = data && data.length > 0 ? data[0] : null;

  const totalAttempts = Number(row?.total_attempts ?? 0);
  const successfulOrders = Number(row?.successful_orders ?? 0);
  const rejectedOrders = Number(row?.rejected_orders ?? 0);
  const pendingOrders = Math.max(
    totalAttempts - successfulOrders - rejectedOrders,
    0,
  );

  const chartData: ConversionSlice[] = [
    {
      status: "successful" as const,
      count: successfulOrders,
      fill: "var(--color-accent)",
    },
    {
      status: "rejected" as const,
      count: rejectedOrders,
      fill: "var(--color-primary)",
    },
  ];

  if (pendingOrders > 0) {
    chartData.push({
      status: "pending" as const,
      count: pendingOrders,
      fill: "var(--color-muted)",
    });
  }

  return (
    <ConversionChartClient
      data={chartData}
      totalAttempts={totalAttempts}
      conversionRatePercentage={row?.conversion_rate_percentage ?? null}
    />
  );
}
