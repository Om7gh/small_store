"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

type ConversionSlice = {
  status: "successful" | "rejected" | "pending";
  count: number;
  fill: string;
};

type ConversionChartClientProps = {
  data: ConversionSlice[];
  totalAttempts: number;
  conversionRatePercentage: number | null;
};

const chartConfig = {
  successful: {
    label: "Successful",
    color: "var(--color-accent)",
  },
  rejected: {
    label: "Rejected",
    color: "var(--color-primary)",
  },
  pending: {
    label: "Pending",
    color: "var(--color-muted)",
  },
} satisfies ChartConfig;

export function ConversionChartClient({
  data,
  totalAttempts,
  conversionRatePercentage,
}: ConversionChartClientProps) {
  const rateLabel =
    conversionRatePercentage === null || Number.isNaN(conversionRatePercentage)
      ? "Conversion rate: N/A"
      : `Conversion rate: ${conversionRatePercentage.toFixed(2)}%`;

  return (
    <Card className="flex flex-col bg-slate-950/20 ">
      <CardHeader className="items-center pb-0">
        <CardTitle>Order Conversion</CardTitle>
        <CardDescription>
          {rateLabel} · Attempts: {totalAttempts.toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-92"
        >
          <PieChart>
            <Pie data={data} dataKey="count" nameKey="status" />
            <ChartLegend
              content={<ChartLegendContent nameKey="status" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
