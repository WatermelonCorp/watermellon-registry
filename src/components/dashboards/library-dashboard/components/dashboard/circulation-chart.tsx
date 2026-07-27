"use client"

import { Calendar } from "lucide-react"
import { useId, useState } from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ReferenceLine,
  XAxis,
} from "recharts"

import { Button } from "@/components/ui/button"
import { ArrowDown01Icon } from "../../assets/icons"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { circulationData } from "../../data"
import { cn } from "../../lib/utils"

type CirculationTimeframe = "weekly" | "monthly" | "yearly"

type CirculationDataPoint = {
  timestamp: number
  checkouts: number
  returns: number
}

const circulationChartConfig = {
  checkouts: {
    label: "Checkouts",
    color: "var(--primary)",
  },
  returns: {
    label: "Returns",
    color: "var(--muted-foreground)",
  },
} satisfies ChartConfig

const chartTicks: Record<CirculationTimeframe, number[]> = {
  weekly: circulationData.weekly.map((point) => point.timestamp),
  monthly: [0, 7, 14, 21].map(
    (dayIndex) => circulationData.monthly[dayIndex].timestamp
  ),
  yearly: circulationData.yearly
    .filter((_, month) => month % 2 === 0)
    .map((point) => point.timestamp),
}

const chartDomains: Record<CirculationTimeframe, [number, number]> = {
  weekly: [
    circulationData.weekly[0].timestamp,
    circulationData.weekly[circulationData.weekly.length - 1].timestamp,
  ],
  monthly: [
    circulationData.monthly[0].timestamp,
    circulationData.monthly[circulationData.monthly.length - 1].timestamp,
  ],
  yearly: [
    circulationData.yearly[0].timestamp,
    circulationData.yearly[circulationData.yearly.length - 1].timestamp,
  ],
}

const chartMidpoints: Record<CirculationTimeframe, number[]> = {
  weekly: getMidpoints(chartTicks.weekly, chartDomains.weekly[1]),
  monthly: getMidpoints(chartTicks.monthly, chartDomains.monthly[1]),
  yearly: getMidpoints(chartTicks.yearly, chartDomains.yearly[1]),
}

function getMidpoints(ticks: number[], domainEnd: number) {
  const points = ticks.at(-1) === domainEnd ? ticks : [...ticks, domainEnd]

  return points.slice(0, -1).map((tick, index) => {
    return tick + (points[index + 1] - tick) / 2
  })
}

const shortWeekdayFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  timeZone: "UTC",
})
const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
})
const shortMonthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  timeZone: "UTC",
})

const chartFormatters: Record<CirculationTimeframe, (value: number) => string> =
  {
    weekly: (value) => shortWeekdayFormatter.format(value),
    monthly: (value) => shortDateFormatter.format(value),
    yearly: (value) => shortMonthFormatter.format(value),
  }

const weeklyTooltipFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
})
const datedTooltipFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
})
const monthlyTooltipFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
})

function formatTooltipDate(timeframe: CirculationTimeframe, value: number) {
  if (timeframe === "weekly") return weeklyTooltipFormatter.format(value)
  if (timeframe === "monthly") return datedTooltipFormatter.format(value)
  return monthlyTooltipFormatter.format(value)
}

export function CirculationChart() {
  const [timeframe, setTimeframe] = useState<CirculationTimeframe>("weekly")
  const gradientId = useId().replace(/:/g, "")

  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <h2 className="text-lg font-semibold">Collection Circulation</h2>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="sm" className="capitalize">
                {timeframe}
                <ArrowDown01Icon className="text-muted-foreground size-4" />
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuGroup>
              {(["weekly", "monthly", "yearly"] as const).map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => setTimeframe(option)}
                  className={cn(
                    timeframe === option && "text-primary font-semibold"
                  )}
                >
                  {option[0].toUpperCase() + option.slice(1)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ChartContainer
        config={circulationChartConfig}
        className="bg-card mt-5 h-84 w-full [&_.recharts-surface]:overflow-visible"
        onMouseDown={(event) => event.preventDefault()}
      >
        <AreaChart
          data={circulationData[timeframe]}
          accessibilityLayer={false}
          margin={{ left: 0, right: 0, top: 16, bottom: 24 }}
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.15} />
              <stop
                offset="95%"
                stopColor="var(--primary)"
                stopOpacity={0.01}
              />
            </linearGradient>
          </defs>
          <CartesianGrid vertical horizontal={false} stroke="var(--border)" />
          {chartMidpoints[timeframe].map((midpoint) => (
            <ReferenceLine
              key={midpoint}
              x={midpoint}
              stroke="var(--border)"
              strokeDasharray="8 8"
            />
          ))}
          <XAxis
            dataKey="timestamp"
            type="number"
            domain={chartDomains[timeframe]}
            stroke="var(--muted-foreground)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            ticks={chartTicks[timeframe]}
            minTickGap={0}
            interval={0}
            padding={{ left: 0, right: 0 }}
            tick={({ x, y, payload }) => (
              <text
                x={x}
                y={y}
                dy={16}
                fill="var(--muted-foreground)"
                fontSize={12}
                textAnchor="middle"
                className="font-medium"
              >
                {chartFormatters[timeframe](payload.value)}
              </text>
            )}
          />
          <ChartTooltip
            cursor={{
              stroke: "var(--primary)",
              strokeWidth: 1,
              className: "!stroke-primary",
            }}
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null

              const point = payload[0].payload as CirculationDataPoint

              return (
                <div className="bg-foreground text-background border-foreground/10 z-50 flex w-52 flex-col gap-2 rounded-lg border p-3 text-xs shadow-md">
                  <div className="border-background/20 flex items-center gap-2 border-b pb-2">
                    <Calendar className="text-background/80 size-4" />
                    <span className="text-background font-semibold">
                      {formatTooltipDate(timeframe, point.timestamp)}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="bg-primary size-2 shrink-0 rounded-xs" />
                        <span className="text-background/80">Checkouts</span>
                      </div>
                      <span className="text-background font-semibold">
                        {point.checkouts.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="bg-muted-foreground size-2 shrink-0 rounded-xs" />
                        <span className="text-background/80">Returns</span>
                      </div>
                      <span className="text-background font-semibold">
                        {point.returns.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )
            }}
          />
          <Area
            type="monotone"
            dataKey="checkouts"
            stroke="var(--primary)"
            strokeWidth={1.5}
            fillOpacity={1}
            fill={`url(#${gradientId})`}
            dot={false}
            activeDot={{
              r: 4,
              stroke: "var(--primary)",
              strokeWidth: 2,
              fill: "var(--card)",
            }}
          />
          <Line
            type="monotone"
            dataKey="returns"
            stroke="var(--muted-foreground)"
            strokeWidth={1.5}
            dot={false}
            activeDot={{
              r: 4,
              stroke: "var(--muted-foreground)",
              strokeWidth: 2,
              fill: "var(--card)",
            }}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}
