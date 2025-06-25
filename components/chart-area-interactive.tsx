"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

// Function to generate smoother chart data fluctuating between 1600 and 2000
const generateSmoothChartData = () => {
  const startDate = new Date("2024-04-01");
  const endDate = new Date("2024-06-30");
  const data = [];
  let baseSales = 1800; // Starting midpoint value between 1600 and 2000

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const variation = Math.floor(Math.random() * 81) - 40; // Random between -40 and +40
    baseSales += variation; // Apply variation
    // Keep sales within 1600-2000 range
    baseSales = Math.max(1600, Math.min(2000, baseSales));

    data.push({
      date: d.toISOString().split("T")[0], // Format as "YYYY-MM-DD"
      sales: baseSales,
    });
  }

  return data;
};

const chartData = generateSmoothChartData();

const chartConfig = {
  sales: {
    label: "Sales",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("30d");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 30;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
      <Card className="@container/card">
        <CardHeader>
          <CardTitle>Sales</CardTitle>
          <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total Sales for the last {timeRange === "30d" ? "30 days" : "7 days"}
          </span>
            <span className="@[540px]/card:hidden">
            Last {timeRange === "30d" ? "30 days" : "7 days"}
          </span>
          </CardDescription>
          <CardAction>
            <ToggleGroup
                type="single"
                value={timeRange}
                onValueChange={setTimeRange}
                variant="outline"
                className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
            >
              <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
              <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
            </ToggleGroup>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger
                  className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
                  size="sm"
                  aria-label="Select a value"
              >
                <SelectValue placeholder="Last 30 days" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="30d" className="rounded-lg">
                  Last 30 days
                </SelectItem>
                <SelectItem value="7d" className="rounded-lg">
                  Last 7 days
                </SelectItem>
              </SelectContent>
            </Select>
          </CardAction>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-sales)" stopOpacity={1.0} />
                  <stop offset="95%" stopColor="var(--color-sales)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
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
              <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  domain={[1500, 2100]} // Adjusted Y-axis range to show 1600-2000 nicely
                  tickFormatter={(value) => value.toLocaleString()}
              />
              <ChartTooltip
                  cursor={false}
                  defaultIndex={isMobile ? -1 : 10}
                  content={
                    <ChartTooltipContent
                        labelFormatter={(value) => {
                          return new Date(value).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          });
                        }}
                        indicator="dot"
                    />
                  }
              />
              <Area
                  dataKey="sales"
                  type="natural"
                  fill="url(#fillSales)"
                  stroke="var(--color-sales)"
                  stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
  );
}