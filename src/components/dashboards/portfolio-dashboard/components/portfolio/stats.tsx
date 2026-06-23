import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  File,
  RefreshCcw,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const stats = [
  {
    icon: ShieldCheck,
    label: "Active policies",
    value: "147,392",
    delta: "23",
    period: "this month",
    trend: "up",
    bars: [8, 10, 9, 13, 12, 15, 18, 22, 28, 35],
  },
  {
    icon: WalletCards,
    label: "Premiums Collected",
    value: "$94.2K",
    delta: "8.4%",
    period: "vs last month",
    trend: "up",
    bars: [9, 14, 18, 17, 14, 16, 22, 21, 28, 35],
  },
  {
    icon: File,
    label: "Open Claims",
    value: "17",
    delta: "4",
    period: "this week",
    trend: "down",
    bars: [14, 11, 9, 12, 10, 15,28, 13, 20, 18],
  },
  {
    icon: RefreshCcw,
    label: "Retention Rate",
    value: "91%",
    delta: "Stable",
    period: "",
    trend: "stable",
    bars: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
  },
] as const;

const trendStyles = {
  up: {
    text: "text-green-500",
    bar: "bg-green-400/30 last:bg-green-500",
    icon: ArrowUpRight,
  },
  down: {
    text: "text-red-500",
    bar: "bg-red-400/30 last:bg-red-500",
    icon: ArrowDownRight,
  },
  stable: {
    text: "text-blue-400",
    bar: "bg-blue-400/30 last:bg-blue-500",
    icon: ArrowRight,
  },
} as const;

export function StatsGrid() {
  return (
    <Card className="grid gap-0 overflow-hidden rounded-2xl p-0 shadow-border md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => {
        const styles = trendStyles[stat.trend];
        const TrendIcon = styles.icon;

        return (
          <div
            key={stat.label}
            className={`p-4 md:p-5 ${
              index ? "border-t md:border-l border-border/50 " : "md:border-0"
            }`}
          >
            <div className="flex items-center gap-2 text-sm">
              <stat.icon className="size-4" />
              {stat.label}
            </div>

            <div className="mt-8 flex items-end justify-between">
              <div>
                <div className="text-3xl font-light tracking-tight tabular-nums">
                  {stat.value}
                </div>

                <div
                  className={`mt-2 flex items-center gap-1 text-xs ${styles.text}`}
                >
                  <TrendIcon className="size-4" />

                  <span>{stat.delta}</span>

                  {stat.period && (
                    <span className="text-muted-foreground">{stat.period}</span>
                  )}
                </div>
              </div>

              <div className="flex items-end gap-1">
                {stat.bars.map((height, i) => (
                  <span
                    key={i}
                    className={`w-1.5 rounded-full ${styles.bar}`}
                    style={{ height }}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </Card>
  );
}
