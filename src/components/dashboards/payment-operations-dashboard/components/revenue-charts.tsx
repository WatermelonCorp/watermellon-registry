"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ArrowUpRight, DollarSign } from "lucide-react";
import {
  Card,
  CardContent,

  CardHeader,

} from "./ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "./ui/chart";
import { Badge } from "./ui/badge";

const chartData = [
  { date: "Jan 01", net: 45000, gross: 52000 },
  { date: "Jan 03", net: 52000, gross: 60000 },
  { date: "Jan 05", net: 48000, gross: 55000 },
  { date: "Jan 07", net: 61000, gross: 70000 },
  { date: "Jan 09", net: 55000, gross: 65000 },
  { date: "Jan 11", net: 67000, gross: 78000 },
  { date: "Jan 13", net: 72000, gross: 85000 },
  { date: "Jan 15", net: 68000, gross: 80000 },
  { date: "Jan 17", net: 85000, gross: 98000 },
  { date: "Jan 19", net: 79000, gross: 92000 },
  { date: "Today", net: 92000, gross: 105000 },
];

const chartConfig = {
  net: {
    label: "Net Revenue",
    color: "hsl(var(--muted-foreground))",
  },
  gross: {
    label: "Gross Revenue",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function RevenueChart() {
  return (
    <Card className="w-full rounded-none shadow-sm p-0.5 bg-zinc-100 dark:bg-zinc-800 gap-0 border-none transition-all duration-300 hover:shadow-md hover:-translate-y-1 group/card">
      <CardHeader className="w-full px-2 mt-1">
        <div className="flex items-center gap-2 text-muted-foreground group-hover/card:translate-x-1 transition-transform duration-300">
          <DollarSign className="w-4 h-4 group-hover/card:text-primary transition-colors duration-300" />
          <span className="text-lg font-medium  text-foreground">
            Net revenue
          </span>
        </div>
      </CardHeader>
      <CardContent className="px-2 py-4 sm:px-4  bg-white dark:bg-zinc-900">
        <div className="flex items-baseline gap-2">
          <h2 className="text-2xl font-medium tracking-tight tabular-nums">
            ₹18,46,720
          </h2>
          <Badge className="bg-green-500/20 text-green-600 hover:bg-green-500/30 active:scale-95 transition-all duration-200 border-none px-1.5 py-0.5 flex gap-0.5 items-center font-medium cursor-pointer">
            <ArrowUpRight className="size-5 stroke-2" /> 5.7%
          </Badge>
        </div>
        <ChartContainer
          config={chartConfig}
          className="aspect-[auto] h-[200px] "
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 10, right: 10, top: 10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="fillNet" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--net)" stopOpacity={0.45} />
                <stop
                  offset="100%"
                  stopColor="var(--color-net)"
                  stopOpacity={0.01}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              className="stroke-muted/50"
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={{
                stroke: "var(--foreground)",
                strokeWidth: 1,
                opacity: 0.2,
              }}
              tickMargin={12}
              interval={0}
              ticks={[chartData[0].date, chartData[chartData.length - 1].date]}
              padding={{ left: 10, right: 10 }}
              className="text-xs text-foreground uppercase"
            />
            <YAxis hide domain={["dataMin - 10000", "dataMax + 10000"]} />
            <ChartTooltip
              cursor={{
                stroke: "hsl(var(--foreground))",
                strokeWidth: 1,
              }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="w-auto bg-zinc-100 border border-slate-200 dark:bg-zinc-800 dark:border-zinc-700 shadow-xl p-2 rounded-sm">
                      <p className="text-sm font-medium text-foreground mb-2 uppercase tracking-tight">
                        {label}
                      </p>

                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center text-xs gap-12">
                          <span className="text-muted-foreground font-medium">
                            Gross Revenue:
                          </span>
                          <span className="font-medium tabular-nums">
                            ₹{payload[0].payload.gross.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs gap-16">
                          <span className="text-muted-foreground font-medium">
                            Net Revenue:
                          </span>
                          <span className="font-medium tabular-nums text-foreground">
                            ₹{payload[0].payload.net.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              dataKey="net"
              type="monotone"
              fill="url(#fillNet)"
              fillOpacity={1}
              stroke="var(--color-net)"
              strokeWidth={2}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
