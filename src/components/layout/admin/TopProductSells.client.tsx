"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

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
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import Image from "next/image";

type TopProductDatum = {
  id: string;
  name: string;
  imageUrl: string | null;
  revenue: number;
  totalUnitsSold: number;
};

type TopProductSellsClientProps = {
  data: TopProductDatum[];
};

type TopProductTooltipProps = {
  active?: boolean;
  payload?: Array<{ payload: TopProductDatum }>;
};

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--color-primary)",
  },
  totalUnitsSold: {
    label: "Units Sold",
    color: "var(--color-accent)",
  },
} satisfies ChartConfig;

export function TopProductSellsClient({ data }: TopProductSellsClientProps) {
  return (
    <Card className="bg-slate-950/20 rounded-2xl">
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
        <CardDescription>Top 5 by units sold</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{ left: 0 }}
          >
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={120}
            />
            <XAxis type="number" hide />
            <ChartTooltip cursor={false} content={<TopProductTooltip />} />
            <Bar dataKey="revenue" radius={5} fill="var(--color-revenue)" />
            <Bar
              dataKey="totalUnitsSold"
              radius={5}
              fill="var(--color-totalUnitsSold)"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function TopProductTooltip({ active, payload }: TopProductTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const item = payload[0]?.payload as TopProductDatum | undefined;

  if (!item) {
    return null;
  }

  return (
    <div className="grid min-w-52 gap-2 rounded-lg border border-border/50 bg-background px-3 py-2 text-xs shadow-xl">
      <div className="flex items-center gap-3">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            className="h-9 w-9 rounded object-cover"
            width={36}
            height={36}
            loading="eager"
          />
        ) : (
          <div className="h-9 w-9 rounded bg-muted" />
        )}
        <div className="grid">
          <span className="text-sm font-medium text-foreground">
            {item.name}
          </span>
          <span className="text-muted-foreground">Product</span>
        </div>
      </div>
      <div className="grid gap-1">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Revenue</span>
          <span className="font-mono font-medium text-foreground tabular-nums">
            {item.revenue.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Units Sold</span>
          <span className="font-mono font-medium text-foreground tabular-nums">
            {item.totalUnitsSold.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
