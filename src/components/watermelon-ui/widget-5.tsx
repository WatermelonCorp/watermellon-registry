"use client";

import * as React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  type TooltipProps,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FaArrowTrendUp,
  FaArrowTrendDown,
  FaArrowRight,
  FaChartLine,
  FaSackDollar,
} from "react-icons/fa6";

export type TimeRange = "7d" | "14d" | "30d";

export interface RevenueDataPoint {
  label: string;
  value: number;
}

export interface RevenueStat {
  id: string;
  icon: React.ReactNode;
  label: string;
  value: string;
}

export interface RevenueOverviewWidgetProps {
  title?: string;
  timeRanges?: TimeRange[];
  defaultRange?: TimeRange;
  datasets?: Record<TimeRange, RevenueDataPoint[]>;
  stats?: Record<TimeRange, RevenueStat[]>;
  metricLabel?: string;
  metricValues?: Record<TimeRange, string>;
  metricChanges?: Record<TimeRange, { value: string; positive: boolean }>;
  ctaLabel?: string;
  onCtaClick?: () => void;
}

const defaultDatasets: Record<TimeRange, RevenueDataPoint[]> = {
  "7d": [
    { label: "Mon", value: 3100 },
    { label: "Tue", value: 7200 },
    { label: "Wed", value: 4400 },
    { label: "Thu", value: 8600 },
    { label: "Fri", value: 5100 },
    { label: "Sat", value: 9300 },
    { label: "Sun", value: 6800 },
  ],
  "14d": [
    { label: "Apr 25", value: 3200 },
    { label: "Apr 26", value: 7800 },
    { label: "Apr 27", value: 4100 },
    { label: "Apr 28", value: 8500 },
    { label: "Apr 29", value: 5300 },
    { label: "Apr 30", value: 9100 },
    { label: "May 1", value: 4600 },
    { label: "May 2", value: 7400 },
    { label: "May 3", value: 5000 },
    { label: "May 4", value: 9600 },
    { label: "May 5", value: 6200 },
    { label: "May 6", value: 8800 },
    { label: "May 7", value: 5700 },
    { label: "May 8", value: 10200 },
  ],
  "30d": [
    { label: "Apr 9", value: 2800 },
    { label: "Apr 11", value: 6500 },
    { label: "Apr 13", value: 3400 },
    { label: "Apr 15", value: 7900 },
    { label: "Apr 17", value: 4200 },
    { label: "Apr 19", value: 8700 },
    { label: "Apr 21", value: 3800 },
    { label: "Apr 23", value: 9200 },
    { label: "Apr 25", value: 5100 },
    { label: "Apr 27", value: 10400 },
    { label: "Apr 29", value: 6000 },
    { label: "May 1", value: 8100 },
    { label: "May 3", value: 4700 },
    { label: "May 5", value: 9800 },
    { label: "May 7", value: 6500 },
    { label: "May 8", value: 11200 },
  ],
};

const defaultStats: Record<TimeRange, RevenueStat[]> = {
  "7d": [
    {
      id: "avg",
      icon: <FaChartLine className="size-3.5" />,
      label: "Avg. daily revenue",
      value: "$6,214",
    },
    {
      id: "top",
      icon: <FaSackDollar className="size-3.5" />,
      label: "Top earning day",
      value: "$8,100",
    },
  ],
  "14d": [
    {
      id: "avg",
      icon: <FaChartLine className="size-3.5" />,
      label: "Avg. daily revenue",
      value: "$5,943",
    },
    {
      id: "top",
      icon: <FaSackDollar className="size-3.5" />,
      label: "Top earning day",
      value: "$8,400",
    },
  ],
  "30d": [
    {
      id: "avg",
      icon: <FaChartLine className="size-3.5" />,
      label: "Avg. daily revenue",
      value: "$5,581",
    },
    {
      id: "top",
      icon: <FaSackDollar className="size-3.5" />,
      label: "Top earning day",
      value: "$8,400",
    },
  ],
};

const defaultMetricValues: Record<TimeRange, string> = {
  "7d": "$43,500",
  "14d": "$84,200",
  "30d": "$172,600",
};

const defaultMetricChanges: Record<
  TimeRange,
  { value: string; positive: boolean }
> = {
  "7d": { value: "+8.4%", positive: true },
  "14d": { value: "+14.2%", positive: true },
  "30d": { value: "-3.1%", positive: false },
};

function RevenueTooltip({
  active,
  payload,
  label,
}: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-background/50 border-border/50 rounded-lg border px-2 py-2 shadow-sm backdrop-blur-2xl">
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className="text-foreground text-sm font-medium tabular-nums">
        ${payload[0].value?.toLocaleString()}
      </p>
    </div>
  );
}

export function RevenueOverviewWidget({
  timeRanges = ["7d", "14d", "30d"],
  defaultRange = "14d",
  datasets = defaultDatasets,
  stats = defaultStats,
  metricLabel = "Total Revenue",
  metricValues = defaultMetricValues,
  metricChanges = defaultMetricChanges,
  ctaLabel = "Full Report",
  onCtaClick,
}: RevenueOverviewWidgetProps) {
  const [activeRange, setActiveRange] = React.useState<TimeRange>(defaultRange);

  const chartData = datasets[activeRange] ?? [];
  const metricValue = metricValues[activeRange] ?? "—";
  const metricChange = metricChanges[activeRange];
  const activeStats = stats[activeRange] ?? [];

  return (
    <div className="bg-muted w-full max-w-sm rounded-[30px] p-2">
      <Card className="w-full rounded-3xl shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)] ring-0">
        <CardContent className="flex flex-col gap-0">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-md font-medium">
              {metricLabel}
            </p>

            <div className="bg-muted flex items-center gap-0.5 rounded-full p-0.5">
              {timeRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => setActiveRange(range)}
                  className={[
                    "rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200",
                    activeRange === range
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  ].join(" ")}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-2 flex items-end gap-3">
            <span className="text-foreground text-4xl leading-none font-bold tracking-tight tabular-nums">
              {metricValue}
            </span>
            {metricChange && (
              <span
                className={[
                  "mb-0.5 flex items-center gap-1 text-sm font-semibold",
                  metricChange.positive
                    ? "text-emerald-500"
                    : "text-destructive",
                ].join(" ")}
              >
                {metricChange.positive ? (
                  <FaArrowTrendUp className="size-3.5" />
                ) : (
                  <FaArrowTrendDown className="size-3.5" />
                )}
                {metricChange.value}
              </span>
            )}
          </div>

          <div
            className="mx-auto mt-3 h-36 w-full"
            style={{ width: "calc(100% )" }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 4, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="var(--primary)"
                      stopOpacity={0.25}
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--primary)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "var(--muted-foreground)",
                    fontSize: 10,
                    fontWeight: 400,
                  }}
                  interval="preserveStartEnd"
                  padding={{ left: 4, right: 4 }}
                />
                <YAxis hide />
                <Tooltip
                  content={<RevenueTooltip />}
                  cursor={{
                    stroke: "var(--border)",
                    strokeWidth: 1,
                    strokeDasharray: "3 3",
                  }}
                />
                <Area
                  type="linear"
                  dataKey="value"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  fill="url(#revenueGrad)"
                  dot={false}
                  activeDot={{
                    r: 4,
                    fill: "var(--primary)",
                    strokeWidth: 2,
                    stroke: "var(--background)",
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-1 flex flex-col gap-2">
            {activeStats.map((stat) => (
              <div key={stat.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">{stat.icon}</span>
                  <span className="text-muted-foreground text-sm font-medium">
                    {stat.label}
                  </span>
                </div>
                <span className="text-foreground text-sm font-semibold tabular-nums">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          <Button
            variant="default"
            className="group mt-4 w-full gap-2 rounded-full font-semibold shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.7),inset_0_-2px_4px_0_rgba(0,0,0,0.2),0px_4px_24px_0px_rgba(0,0,0,0.1),0px_2px_12px_0px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_-2px_4px_0_rgba(0,0,0,0.2),inset_0_2px_4px_0_rgba(255,255,255,0.5)]"
            onClick={onCtaClick}
          >
            {ctaLabel}
            <FaArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default RevenueOverviewWidget;
