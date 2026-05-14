"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipProps,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface SalesDataPoint {
  day: string;
  food: number;
  drink: number;
  grocery: number;
  shopping: number;
}

export interface SalesChannel {
  key: keyof Omit<SalesDataPoint, "day">;
  label: string;
  color: string;
}

export interface SalesBreakdownWidgetProps {
  title?: string;
  subtitle?: string;
  actionLabel?: string;
  data?: SalesDataPoint[];
  channels?: SalesChannel[];
  onActionClick?: () => void;
}

const defaultData: SalesDataPoint[] = [
  { day: "01", food: 32, drink: 18, grocery: 14, shopping: 22 },
  { day: "02", food: 20, drink: 12, grocery: 10, shopping: 8 },
  { day: "03", food: 54, drink: 24, grocery: 18, shopping: 16 },
  { day: "04", food: 26, drink: 18, grocery: 14, shopping: 12 },
  { day: "05", food: 18, drink: 10, grocery: 8, shopping: 10 },
  { day: "06", food: 32, drink: 16, grocery: 12, shopping: 22 },
  { day: "07", food: 30, drink: 14, grocery: 12, shopping: 16 },
];

const defaultChannels: SalesChannel[] = [
  {
    key: "food",
    label: "Food",
    color: "#38bdf8",
  },
  {
    key: "drink",
    label: "Drink",
    color: "#a3e635",
  },
  {
    key: "grocery",
    label: "Grocery",
    color: "#ef4444",
  },
  {
    key: "shopping",
    label: "Shopping",
    color: "#f0529c",
  },
];

interface CustomTooltipPayload {
  name: string;
  value: number;
  fill: string;
}

function CustomTooltip({
  active,
  payload,
  label,
}: TooltipProps<number, string> & { payload?: CustomTooltipPayload[] }) {
  if (!active || !payload?.length) return null;

  const total = payload.reduce((sum, item) => sum + (item.value ?? 0), 0);

  return (
    <div className="bg-background/80 text-foreground shadow-border/50 min-w-[130px] rounded-none p-3 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)] ring-0 backdrop-blur-sm dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1),0px_1px_2px_-1px_rgba(255,255,255,0.1),0px_2px_4px_0px_rgba(255,255,255,0.08)]">
      <p className="text-muted-foreground mb-2 text-sm font-medium tracking-widest">
        {label}
      </p>
      <div className="flex flex-col gap-1.5">
        {[...payload].reverse().map((entry) => (
          <div
            key={entry.name}
            className="flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-1.5">
              <span
                className="h-2 w-2 shrink-0 rounded-none"
                style={{ background: entry.fill }}
              />
              <span className="text-muted-foreground text-xs font-medium">
                {entry.name}
              </span>
            </div>
            <span className="text-foreground text-xs font-medium tabular-nums">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
      <div className="border-border/50 mt-2 flex justify-between border-t pt-2">
        <span className="text-muted-foreground text-xs font-semibold">
          Total
        </span>
        <span className="text-foreground text-xs font-semibold">{total}</span>
      </div>
    </div>
  );
}

export function SalesBreakdownWidget({
  title = "Daily Expense",
  subtitle = "Data from 1-12 Apr, 2024",
  actionLabel = "View Report",
  data = defaultData,
  channels = defaultChannels,
  onActionClick,
}: SalesBreakdownWidgetProps) {
  return (
    <Card className="w-full max-w-sm rounded-none shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)] ring-0 dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1),0px_1px_2px_-1px_rgba(255,255,255,0.1),0px_2px_4px_0px_rgba(255,255,255,0.08)]">
      <CardHeader className="">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col">
            <h3 className="text-foreground text-base leading-snug font-medium tracking-tight">
              {title}
            </h3>
            <p className="text-muted-foreground text-xs font-medium">
              {subtitle}
            </p>
          </div>
          <Button
            variant="default"
            size="sm"
            onClick={onActionClick}
            className="h-8 shrink-0 rounded-none px-3 text-sm font-medium shadow-[0px_0px_4px_1px_rgba(0,0,0,0.05),inset_0_0px_4px_1px_rgba(255,255,255,0.45),inset_0_1px_0px_0px_rgba(255,255,255,0.35)]"
          >
            {actionLabel}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-0">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barSize={24} barCategoryGap="0%">
              <CartesianGrid
                vertical={false}
                stroke="var(--border)"
                strokeDasharray="2 4"
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "var(--muted-foreground)",
                  fontSize: 12,
                  fontWeight: 400,
                }}
              />
              <YAxis hide axisLine={false} tickLine={false} />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  fill: "var(--accent)",
                  opacity: 0,
                  radius: 8,
                }}
              />
              {channels.map((channel) => (
                <Bar
                  key={channel.key}
                  dataKey={channel.key}
                  name={channel.label}
                  stackId="expense"
                  fill={channel.color}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          {channels.map((channel) => (
            <div key={channel.key} className="flex items-center gap-1.5">
              <div
                className="h-2 w-2 rounded-none"
                style={{ backgroundColor: channel.color }}
              />
              <span className="text-muted-foreground text-[11px] font-semibold">
                {channel.label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default SalesBreakdownWidget;
