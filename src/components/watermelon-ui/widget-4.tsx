import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export interface RevenueSource {
  id: string;
  label: string;
  value: string;
  numericValue: number;
  colorClass: string;
  fill?: string;
  opacity?: number;
}

export interface RevenueWidgetProps {
  title?: string;
  data?: RevenueSource[];
}

const defaultData: RevenueSource[] = [
  {
    id: "subscriptions",
    label: "Subscriptions",
    value: "12,450",
    numericValue: 12450,
    colorClass: "text-primary",
    fill: "var(--primary)",
    opacity: 1,
  },
  {
    id: "one-time",
    label: "One-time Sales",
    value: "8,320",
    numericValue: 8320,
    colorClass: "text-primary/70",
    fill: "var(--primary)",
    opacity: 0.7,
  },
  {
    id: "services",
    label: "Services",
    value: "4,110",
    numericValue: 4110,
    colorClass: "text-primary/40",
    fill: "var(--primary)",
    opacity: 0.4,
  },
];

export function RevenueWidget({
  title = "Revenue Sources",
  data = defaultData,
}: RevenueWidgetProps) {
  const chartData = React.useMemo(() => {
    const defaultFills = [
      "var(--primary)",
      "var(--primary)",
      "var(--primary)",
      "var(--primary)",
    ];
    const defaultOpacities = [1, 0.7, 0.4, 0.2];
    return data.map((item, index) => ({
      ...item,
      fill: item.fill || defaultFills[index % defaultFills.length],
      opacity:
        item.opacity ?? defaultOpacities[index % defaultOpacities.length],
    }));
  }, [data]);

  return (
    <div className="bg-muted w-full max-w-sm rounded-[30px] p-2">
      <Card className="text-card-foreground w-full rounded-3xl px-2 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)] ring-0">
        <CardContent className="flex flex-col gap-2">
          <div className="">
            <h3 className="text-foreground text-center text-lg font-semibold sm:text-start">
              {title}
            </h3>
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="relative h-28 w-28 flex-shrink-0 sm:h-32 sm:w-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius="70%"
                    outerRadius="100%"
                    paddingAngle={5}
                    dataKey="numericValue"
                    stroke="none"
                    cornerRadius={4}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${entry.id || index}`}
                        fill={entry.fill}
                        fillOpacity={entry.opacity}
                        className="cursor-pointer transition-all duration-300 outline-none hover:opacity-80"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    cursor={false}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="border-border/50 bg-background/20 flex flex-col gap-1 rounded-lg border p-2 shadow-sm backdrop-blur-xl">
                            <span className="text-muted-foreground text-[0.70rem] font-semibold">
                              {payload[0].payload.label}
                            </span>
                            <span className="text-foreground text-sm font-medium">
                              {payload[0].payload.value}
                            </span>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex w-full flex-col gap-1">
              {chartData.map((item) => (
                <div
                  key={item.id}
                  className="flex w-full cursor-default items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`size-3`}
                      style={{ backgroundColor: item.fill }}
                    />
                    <span className="text-muted-foreground group-hover/item:text-foreground text-sm font-medium transition-colors duration-300">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-foreground text-md font-semibold tabular-nums">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
