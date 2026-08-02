'use client';

import { Calendar } from 'lucide-react';
import { useId, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ReferenceLine,
  XAxis,
} from 'recharts';

import { buttonVariants } from '@/components/ui/button';
import { ArrowDown01Icon } from './icons';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from '@/components/ui/chart';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { circulationData } from '../../data';
import { cn } from '@/lib/utils';

type CirculationTimeframe = 'weekly' | 'monthly' | 'yearly';

type CirculationDataPoint = {
  timestamp: number;
  checkouts: number;
  returns: number;
};

const circulationChartConfig = {
  checkouts: {
    label: 'Checkouts',
    color: 'var(--primary)',
  },
  returns: {
    label: 'Returns',
    color: 'color-mix(in oklch, var(--primary) 55%, black)',
  },
} satisfies ChartConfig;

const chartTicks: Record<CirculationTimeframe, number[]> = {
  weekly: circulationData.weekly.map((point) => point.timestamp),
  monthly: [0, 7, 14, 21].map(
    (dayIndex) => circulationData.monthly[dayIndex].timestamp,
  ),
  yearly: circulationData.yearly
    .filter((_, month) => month % 2 === 0)
    .map((point) => point.timestamp),
};

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
};

const chartMidpoints: Record<CirculationTimeframe, number[]> = {
  weekly: getMidpoints(chartTicks.weekly, chartDomains.weekly[1]),
  monthly: getMidpoints(chartTicks.monthly, chartDomains.monthly[1]),
  yearly: getMidpoints(chartTicks.yearly, chartDomains.yearly[1]),
};

function getMidpoints(ticks: number[], domainEnd: number) {
  const points = ticks.at(-1) === domainEnd ? ticks : [...ticks, domainEnd];

  return points.slice(0, -1).map((tick, index) => {
    return tick + (points[index + 1] - tick) / 2;
  });
}

const shortWeekdayFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  timeZone: 'UTC',
});
const shortDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});
const shortMonthFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  timeZone: 'UTC',
});

const chartFormatters: Record<CirculationTimeframe, (value: number) => string> =
  {
    weekly: (value) => shortWeekdayFormatter.format(value),
    monthly: (value) => shortDateFormatter.format(value),
    yearly: (value) => shortMonthFormatter.format(value),
  };

const weeklyTooltipFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});
const datedTooltipFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});
const monthlyTooltipFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

function formatTooltipDate(timeframe: CirculationTimeframe, value: number) {
  if (timeframe === 'weekly') return weeklyTooltipFormatter.format(value);
  if (timeframe === 'monthly') return datedTooltipFormatter.format(value);
  return monthlyTooltipFormatter.format(value);
}

export function CirculationChart() {
  const [timeframe, setTimeframe] = useState<CirculationTimeframe>('weekly');
  const [activeLabel, setActiveLabel] = useState<number | null>(null);
  const gradientId = useId().replace(/:/g, '');

  return (
    <div className="flex h-full flex-col">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-lg font-medium">Collection Circulation</h2>
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'lg' }),
              'text-accent-foreground capitalize',
            )}
          >
            {timeframe}
            <ArrowDown01Icon className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32 p-1.5 shadow-lg">
            <DropdownMenuGroup>
              {(['weekly', 'monthly', 'yearly'] as const).map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => setTimeframe(option)}
                  className={cn(
                    'rounded-lg capitalize',
                    timeframe === option && 'text-primary font-medium',
                  )}
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ChartContainer
        config={circulationChartConfig}
        className="mt-5 aspect-auto h-72 w-full grow [&_.recharts-surface]:overflow-visible"
        onMouseDown={(event) => event.preventDefault()}
      >
        <AreaChart
          data={circulationData[timeframe]}
          accessibilityLayer={false}
          margin={{ left: 4, right: 4, top: 12, bottom: 4 }}
          style={{ overflow: 'visible' }}
          onMouseMove={(state) => {
            const label = state?.activeLabel;
            setActiveLabel(
              typeof label === 'number'
                ? label
                : label != null
                  ? Number(label)
                  : null,
            );
          }}
          onMouseLeave={() => setActiveLabel(null)}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.18} />
              <stop
                offset="95%"
                stopColor="var(--primary)"
                stopOpacity={0.02}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            vertical
            horizontal={false}
            stroke="var(--border)"
            strokeDasharray="0"
          />
          {chartMidpoints[timeframe].map((midpoint) => (
            <ReferenceLine
              key={midpoint}
              x={midpoint}
              stroke="var(--border)"
              strokeDasharray="6 6"
            />
          ))}
          <XAxis
            dataKey="timestamp"
            type="number"
            domain={chartDomains[timeframe]}
            stroke="var(--muted-foreground)"
            fontSize={14}
            tickLine={false}
            axisLine={false}
            ticks={chartTicks[timeframe]}
            minTickGap={0}
            interval={0}
            padding={{ left: 0, right: 0 }}
            tick={({ x, y, payload }) => {
              const isActive = activeLabel === payload.value;
              return (
                <text
                  x={x}
                  y={y}
                  dy={14}
                  fill={
                    isActive
                      ? 'var(--secondary-foreground)'
                      : 'var(--muted-foreground)'
                  }
                  fontSize={14}
                  textAnchor="middle"
                  className="font-medium"
                >
                  {chartFormatters[timeframe](payload.value)}
                </text>
              );
            }}
          />
          <ChartTooltip
            cursor={{
              stroke: 'var(--primary)',
              strokeWidth: 1.5,
            }}
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;

              const point = payload[0].payload as CirculationDataPoint;

              return (
                <div className="bg-foreground text-background z-50 flex min-w-40 flex-col rounded-[6px] shadow-[0px_6px_14px_rgba(24,39,75,0.12),0px_10px_32px_rgba(24,39,75,0.1)]">
                  <div className="flex items-center gap-1 px-2.5 py-1.5">
                    <Calendar className="size-3 opacity-80" />
                    <span className="text-[9px] tracking-tight opacity-90">
                      {formatTooltipDate(timeframe, point.timestamp)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 px-2 pb-2">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-1">
                        <span className="bg-primary size-1.5 shrink-0 rounded-[1px]" />
                        <span className="text-[10px] leading-[1.2] opacity-80">
                          Checkouts
                        </span>
                      </div>
                      <span className="text-[10px] leading-[1.2] font-medium">
                        {point.checkouts.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-1">
                        <span className="bg-primary/60 size-1.5 shrink-0 rounded-[1px]" />
                        <span className="text-[10px] leading-[1.2] opacity-80">
                          Returns
                        </span>
                      </div>
                      <span className="text-[10px] leading-[1.2] font-medium">
                        {point.returns.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }}
          />
          <Area
            type="linear"
            dataKey="checkouts"
            stroke="var(--primary)"
            strokeWidth={1.75}
            fillOpacity={1}
            fill={`url(#${gradientId})`}
            dot={false}
            activeDot={{
              r: 4,
              stroke: 'var(--primary)',
              strokeWidth: 2,
              fill: 'var(--card)',
            }}
          />
          <Line
            type="linear"
            dataKey="returns"
            stroke="color-mix(in oklch, var(--primary) 55%, black)"
            strokeWidth={1.5}
            dot={false}
            activeDot={{
              r: 4,
              stroke: 'color-mix(in oklch, var(--primary) 55%, black)',
              strokeWidth: 2,
              fill: 'var(--card)',
            }}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
