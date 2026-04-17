"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

type DailyChartPoint = {
  date: string;
  amount: number;
  orderCount: number;
};

const chartConfig = {
  amount: {
    label: "Revenue",
    color: "var(--chart-2)",
  },
  orderCount: {
    label: "Orders",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartBarInteractiveClient({
  data,
}: {
  data: DailyChartPoint[];
}) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("amount");

  const total = React.useMemo(
    () => ({
      amount: data.reduce((acc, curr) => acc + curr.amount, 0),
      orderCount: data.reduce((acc, curr) => acc + curr.orderCount, 0),
    }),
    [data],
  );

  return (
    <Card className="py-0  shadow-2xl shadow-primary/10 rounded-3xl  bg-slate-950/20 ">
      <CardHeader className="flex flex-col items-stretch  p-0! sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-0!">
          <CardTitle>Daily Revenue</CardTitle>
          <CardDescription>Last 7 days overview</CardDescription>
        </div>
        <div className="flex bg-accent">
          {(["amount", "orderCount"] as const).map((key) => {
            return (
              <button
                key={key}
                data-active={activeChart === key}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1  px-6 py-4 text-left  data-[active=true]:bg-muted/50  sm:px-8 sm:py-6"
                onClick={() => setActiveChart(key)}
              >
                <span className="text-xs text-text/80 uppercase tracking-wide font-black">
                  {chartConfig[key].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {total[key].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-44 w-full [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-transparent"
        >
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-37"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-primary)`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
