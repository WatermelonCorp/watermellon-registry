"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { apyData } from "../../data";

export function PortfolioChart({ data }: { data: object[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="portfolioFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.55} />
            <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="var(--border)" strokeOpacity={0.25} vertical />
        <XAxis
          dataKey="time"
          axisLine={false}
          tickLine={false}
          interval="preserveStartEnd"
          tick={{ fill: "var(--muted-foreground)", fontSize: 13 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          width={54}
          ticks={[0, 50000, 100000, 150000, 200000, 250000, 300000]}
          tickFormatter={(value) => `${Number(value) / 1000}K`}
          tick={{ fill: "var(--muted-foreground)", fontSize: 13 }}
        />
        <Area
          type="linear"
          dataKey="value"
          stroke="var(--chart-1)"
          strokeWidth={4}
          fill="url(#portfolioFill)"
          activeDot={false}
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function ApySparkline() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={apyData}
        margin={{ top: 8, right: 0, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="apyFill" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="var(--color-emerald-400)"
              stopOpacity={0.45}
            />
            <stop
              offset="100%"
              stopColor="var(--color-emerald-400)"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <XAxis dataKey="month" hide />
        <Area
          type="monotone"
          dataKey="value"
          stroke="var(--color-emerald-400)"
          strokeWidth={2}
          fill="url(#apyFill)"
          dot={false}
          activeDot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
