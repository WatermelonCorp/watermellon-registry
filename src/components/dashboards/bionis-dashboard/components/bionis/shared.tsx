import {
  useEffect,
  useId,
  useMemo,
  useState,
  type ComponentType,
  type HTMLAttributes,
  type ReactNode,
  type SVGProps,
} from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  AlertDiamondIcon,
  AlertTriangleIcon,
  BatteryChargingIcon,
  BedIcon,
  BlingFilledIcon,
  CalendarIcon,
  HeartbeatFilledIcon,
  HeartbeatIcon,
  MoonStarsIcon,
  MoreVerticalIcon,
  NurseFilledIcon,
  TrendUpIcon,
  WalkIcon,
  WarningFilledIcon,
} from './icons'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  heatmapDateLabels,
  recoveryFactors,
  recoveryHeatmapData,
  type ActivityTrendPoint,
  type HeatmapColumn,
  type HeatmapTile,
  type KeyMetric,
  type KeyMetricIcon,
  type RecoveryFactor,
  type SleepBreakdownPoint,
  type SleepRecoveryTrendPoint,
} from '../../data'
import { cn } from '@/lib/utils'

export const CHART_THEME_COLORS = {
  recovery: 'var(--chart-steps)',
  sleep: 'var(--chart-sleep)',
  prediction: 'var(--insight-prediction)',
  actions: 'var(--insight-actions)',
  improving: 'var(--live)',
  outlook: 'var(--chart-period)',
  tooltipBg: 'var(--chart-tooltip-bg)',
  heatmap: {
    low: 'var(--heatmap-low)',
    med: 'var(--heatmap-med)',
    high: 'var(--heatmap-high)',
  },
} as const

const metricIcons: Record<
  KeyMetricIcon,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  heart: HeartbeatIcon,
  walk: WalkIcon,
  moon: MoonStarsIcon,
  battery: BatteryChargingIcon,
  heartbeat: HeartbeatFilledIcon,
  nurse: NurseFilledIcon,
}

const metricIconBgMap: Record<KeyMetricIcon, string> = {
  heart: 'var(--metric-heart)',
  walk: 'var(--metric-steps)',
  moon: 'var(--metric-sleep)',
  battery: 'var(--metric-recovery)',
  heartbeat: 'var(--bionis-blue)',
  nurse: 'var(--metric-recovery)',
}

export function KeyMetricCard({
  metric,
  className,
}: {
  metric: KeyMetric
  className?: string
}) {
  const Icon = metricIcons[metric.icon]
  const isUp = metric.trend.direction === 'up'

  return (
    <article
      className={cn(
        'flex min-h-37.5 min-w-0 flex-col justify-between rounded-2xl border p-4',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className="flex size-7 shrink-0 items-center justify-center rounded-md text-white"
            style={{ backgroundColor: metricIconBgMap[metric.icon] }}
          >
            <Icon className="size-3.5" />
          </span>
          <p className="truncate text-sm font-medium tracking-tight">
            {metric.label}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              className="shrink-0 border-border/50"
              aria-label={`More about ${metric.label}`}
            >
              <MoreVerticalIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bionis-dashboard min-w-max"
          >
            <DropdownMenuItem>
              View details
            </DropdownMenuItem>
            <DropdownMenuItem>
              View trend
            </DropdownMenuItem>
            <DropdownMenuItem>
              Compare periods
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col gap-3">
        <p className="leading-none">
          <span className="text-2.5xl font-medium">{metric.value}</span>{' '}
          <span className="font-normal">{metric.unit}</span>
        </p>
        <div className="flex items-center gap-2">
          <TrendUpIcon
            className={cn(
              isUp ? 'text-(--trend)' : 'rotate-180 text-destructive',
            )}
          />
          <p className="text-xs">
            <span className="font-medium">{metric.trend.emphasis}</span>{' '}
            <span className="text-muted-foreground">{metric.trend.label}</span>
          </p>
        </div>
      </div>
    </article>
  )
}

type ScoreDonutProps = HTMLAttributes<HTMLDivElement> & {
  value: number
  max?: number
  label?: string
}

const CHART_ANIMATION_MS = 900
const AXIS_TICK = {
  fill: 'var(--muted-foreground)',
  fontSize: 10,
  fontFamily: 'Geist, sans-serif',
} as const

export function ScoreDonut({
  value,
  max = 100,
  label = 'Score',
  className,
  style,
  ...props
}: ScoreDonutProps) {
  const chartColor = 'var(--score)'
  const progress = Math.min(Math.max(value / max, 0), 1)

  const pieData = [
    { name: 'Score', value: progress },
    { name: 'Remaining', value: Math.max(1 - progress, 0) },
  ]

  return (
    <div
      className={cn('relative size-28.5 shrink-0', className)}
      style={style}
      {...props}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Pie
            data={[{ value: 1 }]}
            cx="50%"
            cy="50%"
            innerRadius="90%"
            outerRadius="100%"
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            stroke="none"
            isAnimationActive={false}
          >
            <Cell fill={chartColor} fillOpacity={0.05} />
          </Pie>
          <Pie
            data={[{ value: 1 }]}
            cx="50%"
            cy="50%"
            innerRadius="82%"
            outerRadius="90%"
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            stroke="none"
            isAnimationActive={false}
          >
            <Cell fill={chartColor} fillOpacity={0.1} />
          </Pie>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius="82%"
            outerRadius="90%"
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            stroke="none"
            cornerRadius={10}
            isAnimationActive
            animationDuration={CHART_ANIMATION_MS}
            animationEasing="ease-out"
          >
            <Cell key="score" fill={chartColor} />
            <Cell key="remaining" fill="transparent" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xs leading-[1.4] text-muted-foreground">
          {label}
        </span>
        <span className="text-2.5xl font-medium leading-[1.4] tabular-nums">
          {value}
        </span>
      </div>
    </div>
  )
}

type ChartTooltipItemProps = {
  label: string
  value: ReactNode
  color?: string
}

function ChartTooltipItem({
  label,
  value,
  color = 'var(--foreground)',
}: ChartTooltipItemProps) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-border/40 bg-background px-2 py-1.5">
      <div className="flex items-center gap-1.5 min-w-0">
        <span
          className="size-1.5 rounded-xs shrink-0"
          style={{ backgroundColor: color }}
        />
        <span className="truncate text-xxs font-medium text-foreground">
          {label}
        </span>
      </div>
      <span className="text-xxs font-medium text-foreground shrink-0">
        {value}
      </span>
    </div>
  )
}

type ChartTooltipFrameProps = {
  title?: ReactNode
  icon?: ComponentType<SVGProps<SVGSVGElement>>
  children: ReactNode
}

function ChartTooltipFrame({
  title,
  icon: Icon,
  children,
}: ChartTooltipFrameProps) {
  return (
    <div className="bionis-dashboard flex min-w-36 flex-col gap-1 rounded-lg border bg-(--chart-tooltip-bg)! p-1.5 text-xs shadow-md">
      {title ? (
        <div className="flex items-center gap-1.5 px-2 py-1 text-muted-foreground">
          {Icon ? (
            <Icon className="size-3 text-muted-foreground shrink-0" />
          ) : null}
          <span className="text-xxs font-normal text-muted-foreground">
            {title}
          </span>
        </div>
      ) : null}
      {children}
    </div>
  )
}

export type ChartTooltipItemConfig = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  label: string | ((point?: any) => string)
  dataKey: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formatValue?: (value: any, point?: any) => ReactNode
  color?: string
}

export type ChartTooltipProps = {
  active?: boolean
  payload?: Array<{
    name?: string
    dataKey?: string | number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value?: any
    color?: string
    fill?: string
    stroke?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: Record<string, any>
  }>
  label?: ReactNode
  icon?: ComponentType<SVGProps<SVGSVGElement>>
  items?: ChartTooltipItemConfig[]
}

export function ChartTooltip({
  active,
  payload,
  label,
  icon,
  items,
}: ChartTooltipProps) {
  if (!active || !payload?.length) return null
  const point = payload[0]?.payload
  const titleText = point?.fullDate ?? point?.label ?? label ?? '—'

  if (items && items.length > 0) {
    return (
      <ChartTooltipFrame title={titleText} icon={icon}>
        {items.map((item) => {
          const val =
            point?.[item.dataKey] ??
            payload.find((p) => p.dataKey === item.dataKey)?.value
          const displayLabel =
            typeof item.label === 'function' ? item.label(point) : item.label
          const displayVal = item.formatValue
            ? item.formatValue(val, point)
            : (val ?? '—')

          return (
            <ChartTooltipItem
              key={item.dataKey}
              label={displayLabel}
              value={displayVal}
              color={item.color}
            />
          )
        })}
      </ChartTooltipFrame>
    )
  }

  return (
    <ChartTooltipFrame title={titleText} icon={icon}>
      {payload.map((p, idx) => (
        <ChartTooltipItem
          key={String(p.dataKey ?? idx)}
          label={String(p.name ?? p.dataKey ?? '')}
          value={String(p.value ?? '—')}
          color={p.color ?? p.fill ?? p.stroke}
        />
      ))}
    </ChartTooltipFrame>
  )
}

type SleepBarShapeProps = {
  x?: number
  y?: number
  width?: number
  height?: number
  active?: boolean
}

function SleepBarShape({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  active = false,
}: SleepBarShapeProps) {
  if (height <= 0) return null
  const cap = 3
  const bodyHeight = Math.max(height - cap, 0)

  return (
    <g>
      {active ? (
        <rect
          x={x - 1}
          y={y - 1}
          width={width + 2}
          height={height + 1}
          rx={2}
          fill="var(--chart-sleep)"
          opacity={0.12}
        />
      ) : null}
      <rect
        x={x}
        y={y + cap}
        width={width}
        height={bodyHeight}
        fill={active ? 'var(--chart-sleep)' : 'var(--chart-sleep-fill)'}
        opacity={active ? 0.28 : 1}
      />
      <rect
        x={x}
        y={y}
        width={width}
        height={cap}
        fill="var(--chart-sleep)"
      />
    </g>
  )
}

function SleepAxisTick({
  x,
  y,
  index,
  data,
}: {
  x?: number | string
  y?: number | string
  index?: number
  data: SleepBreakdownPoint[]
}) {
  const point = typeof index === 'number' ? data[index] : undefined
  if (!point || x == null || y == null) return null

  const tickX = typeof x === 'number' ? x : Number(x)
  const tickY = typeof y === 'number' ? y : Number(y)
  if (Number.isNaN(tickX) || Number.isNaN(tickY)) return null

  const lines = point.labelLines
  const lineHeight = 12

  return (
    <text
      x={tickX}
      y={tickY + 8}
      textAnchor="middle"
      fill="var(--muted-foreground)"
      fontSize={10}
      fontFamily="Geist, sans-serif"
    >
      {lines.map((line, lineIndex) => (
        <tspan
          key={`${point.label}-${lineIndex}`}
          x={tickX}
          dy={lineIndex === 0 ? 0 : lineHeight}
        >
          {line}
        </tspan>
      ))}
    </text>
  )
}

export function SleepBreakdownChart({
  data,
  flaggedNights,
  className,
}: {
  data: SleepBreakdownPoint[]
  flaggedNights: number
  className?: string
}) {
  return (
    <article
      className={cn(
        'flex min-h-106.5 flex-col gap-8 rounded-2xl border bg-background p-4',
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <div className="flex items-center gap-3">
          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-lg text-white"
            style={{ backgroundColor: CHART_THEME_COLORS.prediction }}
          >
            <MoonStarsIcon className="size-4.5" />
          </span>
          <h3 className="text-lg font-medium">Sleep breakdown</h3>
        </div>
        {flaggedNights > 0 ? (
          <span className="h-8 inline-flex shrink-0 items-center gap-2 rounded-xl bg-(--chart-warn-bg) py-1 pr-4 pl-3 text-sm font-medium text-(--chart-warn)">
            <WarningFilledIcon className="size-5" />
            {flaggedNights} {flaggedNights === 1 ? 'night' : 'nights'} flagged
          </span>
        ) : null}
      </div>

      <div className="h-82.5 w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 8, right: 8, left: 0, bottom: 18 }}
            barCategoryGap="18%"
          >
            <CartesianGrid
              vertical={false}
              stroke="var(--chart-grid)"
              strokeDasharray="4 4"
            />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              interval={0}
              tick={(props) => <SleepAxisTick {...props} data={data} />}
              height={36}
            />
            <YAxis
              domain={[0, 10]}
              ticks={[0, 2, 4, 6, 8, 10]}
              tickFormatter={(value: number) => `${value}h`}
              axisLine={false}
              tickLine={false}
              tick={AXIS_TICK}
              width={36}
            />
            <Tooltip
              cursor={false}
              content={
                <ChartTooltip
                  items={[
                    {
                      label: (point) =>
                        typeof point?.label === 'string' && point.label.includes('–')
                          ? 'Avg sleep'
                          : 'Sleep',
                      dataKey: 'hours',
                      formatValue: (v) => (typeof v === 'number' ? `${v}h` : '—'),
                      color: CHART_THEME_COLORS.sleep,
                    },
                  ]}
                />
              }
            />
            <Bar
              dataKey="hours"
              shape={<SleepBarShape />}
              activeBar={<SleepBarShape active />}
              isAnimationActive
              animationDuration={CHART_ANIMATION_MS}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  )
}

function ActivityAxisTick({
  x,
  y,
  index,
  data,
}: {
  x?: number | string
  y?: number | string
  index?: number
  data: ActivityTrendPoint[]
}) {
  const point = typeof index === 'number' ? data[index] : undefined
  if (!point?.showTick || x == null || y == null) return null

  const tickX = typeof x === 'number' ? x : Number(x)
  const tickY = typeof y === 'number' ? y : Number(y)
  if (Number.isNaN(tickX) || Number.isNaN(tickY)) return null

  return (
    <text
      x={tickX}
      y={tickY + 10}
      textAnchor="middle"
      fill="var(--muted-foreground)"
      fontSize={10}
      fontFamily="Geist, sans-serif"
    >
      {point.label}
    </text>
  )
}

export function ActivityTrendChart({
  data,
  periodLabel,
  className,
}: {
  data: ActivityTrendPoint[]
  periodLabel: string
  className?: string
}) {
  const reactId = useId().replace(/:/g, '')
  const stepsGradientId = `steps-fill-${reactId}`
  const recoveryGradientId = `recovery-fill-${reactId}`

  return (
    <article
      className={cn(
        'flex min-h-106.5 flex-col gap-4 rounded-2xl border bg-background p-4',
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <div className="flex items-center gap-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-(--chart-sleep) text-white">
            <HeartbeatIcon className="size-4.5" />
          </span>
          <h3 className="text-lg font-medium">Activity & HRV trend</h3>
        </div>
        <span className="h-8 inline-flex shrink-0 items-center rounded-xl bg-(--chart-period-bg) px-3 py-1 text-sm font-medium text-(--chart-period)">
          {periodLabel}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3.5 sm:justify-end">
        <div className="flex items-center gap-2 text-sm font-medium text-(--chart-axis)">
          <span className="size-2 rounded-full bg-(--chart-steps)" />
          Steps (÷1000)
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-(--chart-axis)">
          <span className="size-2 rounded-full bg-(--chart-recovery)" />
          Recovery score (÷10)
        </div>
      </div>

      <div className="h-75 w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={stepsGradientId} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--chart-steps)"
                  stopOpacity={0.88}
                />
                <stop
                  offset="50%"
                  stopColor="var(--chart-steps)"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient
                id={recoveryGradientId}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="var(--chart-recovery)"
                  stopOpacity={0.88}
                />
                <stop
                  offset="50%"
                  stopColor="var(--chart-recovery)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="var(--chart-grid)"
              strokeDasharray="4 4"
            />
            <XAxis
              dataKey="dateKey"
              axisLine={false}
              tickLine={false}
              interval={0}
              minTickGap={0}
              tick={(props) => <ActivityAxisTick {...props} data={data} />}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              axisLine={false}
              tickLine={false}
              tick={AXIS_TICK}
              width={36}
            />
            <Tooltip
              cursor={{
                stroke: 'var(--foreground)',
                strokeWidth: 1,
                strokeDasharray: '4 4',
                strokeOpacity: 0.35,
              }}
              content={
                <ChartTooltip
                  icon={CalendarIcon}
                  items={[
                    {
                      label: 'Steps',
                      dataKey: 'steps',
                      formatValue: (v) =>
                        typeof v === 'number'
                          ? `${(Math.round(v * 10) / 10).toFixed(1)}k`
                          : '—',
                      color: CHART_THEME_COLORS.recovery,
                    },
                    {
                      label: 'Recovery',
                      dataKey: 'recovery',
                      formatValue: (v) =>
                        typeof v === 'number' ? Math.round(v * 10) : '—',
                      color: CHART_THEME_COLORS.sleep,
                    },
                  ]}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="steps"
              stroke="var(--chart-steps)"
              strokeWidth={2}
              fill={`url(#${stepsGradientId})`}
              isAnimationActive
              animationDuration={CHART_ANIMATION_MS}
              animationEasing="ease-out"
              dot={false}
              activeDot={{ r: 4 }}
            />
            <Area
              type="monotone"
              dataKey="recovery"
              stroke="var(--chart-recovery)"
              strokeWidth={2}
              fill={`url(#${recoveryGradientId})`}
              isAnimationActive
              animationDuration={CHART_ANIMATION_MS}
              animationEasing="ease-out"
              dot={false}
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </article>
  )
}

function SleepRecoveryAxisTick({
  x,
  y,
  index,
  data,
}: {
  x?: number | string
  y?: number | string
  index?: number
  data: SleepRecoveryTrendPoint[]
}) {
  const point = typeof index === 'number' ? data[index] : undefined
  if (!point?.showTick || x == null || y == null) return null

  const tickX = typeof x === 'number' ? x : Number(x)
  const tickY = typeof y === 'number' ? y : Number(y)
  if (Number.isNaN(tickX) || Number.isNaN(tickY)) return null

  return (
    <text
      x={tickX}
      y={tickY + 10}
      textAnchor="middle"
      fill="var(--muted-foreground)"
      fontSize={10}
      fontFamily="Geist, sans-serif"
    >
      {point.formattedDate}
    </text>
  )
}

export function SleepRecoveryTrendChart({
  data,
  className,
}: {
  data: SleepRecoveryTrendPoint[]
  className?: string
}) {
  const reactId = useId().replace(/:/g, '')
  const sleepGradientId = `sleep-trend-fill-${reactId}`

  return (
    <article
      className={cn(
        'flex min-h-110 flex-col gap-5 rounded-2xl border bg-background p-4 md:p-6',
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <div className="flex items-center gap-3">
          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-lg text-white"
            style={{ backgroundColor: CHART_THEME_COLORS.prediction }}
          >
            <MoonStarsIcon className="size-4.5" />
          </span>
          <h3 className="text-lg font-medium tracking-tight">
            Sleep & recovery over time
          </h3>
        </div>
        <span className="h-8 inline-flex shrink-0 items-center rounded-xl bg-(--live)/10 px-3 py-1 text-sm font-medium text-(--live)">
          Improving
        </span>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Nightly hours and recovery score for the last 30 days
        </p>
        <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground">
          <div className="flex items-center gap-2">
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: CHART_THEME_COLORS.recovery }}
            />
            <span>Sleep (hrs)</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: CHART_THEME_COLORS.sleep }}
            />
            <span>Recovery score</span>
          </div>
        </div>
      </div>

      <div className="h-80 w-full min-w-0 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={sleepGradientId} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={CHART_THEME_COLORS.recovery}
                  stopOpacity={0.35}
                />
                <stop
                  offset="100%"
                  stopColor={CHART_THEME_COLORS.recovery}
                  stopOpacity={0.0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="var(--chart-grid)"
              strokeDasharray="4 4"
            />
            <XAxis
              dataKey="dateKey"
              axisLine={false}
              tickLine={false}
              interval={0}
              minTickGap={0}
              tick={(props) => <SleepRecoveryAxisTick {...props} data={data} />}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              axisLine={false}
              tickLine={false}
              tick={AXIS_TICK}
              width={36}
            />
            <Tooltip
              cursor={{
                stroke: 'var(--foreground)',
                strokeWidth: 1,
                strokeDasharray: '4 4',
                strokeOpacity: 0.35,
              }}
              content={
                <ChartTooltip
                  icon={CalendarIcon}
                  items={[
                    {
                      label: 'Sleep',
                      dataKey: 'sleepHrs',
                      formatValue: (v) => (typeof v === 'number' ? `${v}h` : '—'),
                      color: CHART_THEME_COLORS.recovery,
                    },
                    {
                      label: 'Recovery',
                      dataKey: 'recoveryScore',
                      formatValue: (v) => (typeof v === 'number' ? `${v}%` : '—'),
                      color: CHART_THEME_COLORS.sleep,
                    },
                  ]}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="sleepPlot"
              stroke={CHART_THEME_COLORS.recovery}
              strokeWidth={2.5}
              fill={`url(#${sleepGradientId})`}
              isAnimationActive
              animationDuration={CHART_ANIMATION_MS}
              animationEasing="ease-out"
              dot={false}
              activeDot={{
                r: 4,
                fill: CHART_THEME_COLORS.recovery,
                stroke: 'var(--background)',
                strokeWidth: 2,
              }}
            />
            <Area
              type="monotone"
              dataKey="recoveryPlot"
              stroke={CHART_THEME_COLORS.sleep}
              strokeWidth={1.5}
              strokeDasharray="14 10"
              fill="none"
              isAnimationActive
              animationDuration={CHART_ANIMATION_MS}
              animationEasing="ease-out"
              dot={false}
              activeDot={{
                r: 4,
                fill: CHART_THEME_COLORS.sleep,
                stroke: 'var(--background)',
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </article>
  )
}

const factorIcons: Record<
  'moon' | 'walk' | 'warning' | 'alert' | 'bed',
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  moon: MoonStarsIcon,
  walk: WalkIcon,
  warning: AlertTriangleIcon,
  alert: AlertDiamondIcon,
  bed: BedIcon,
}

const factorColorMap: Record<string, string> = {
  sleep: 'var(--metric-vital)',
  steps: 'var(--bionis-blue)',
  stress: 'var(--prediction-warn)',
  screen: 'var(--prediction-danger)',
  bedtime: 'var(--vital-good)',
}

export function RecoveryFactorsCard({
  factors = recoveryFactors,
  className,
}: {
  factors?: RecoveryFactor[]
  className?: string
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <article
      className={cn(
        'flex min-h-90 flex-1 flex-col justify-between rounded-2xl border p-4 md:p-5',
        className,
      )}
      style={{
        background: `linear-gradient(180deg, color-mix(in srgb, ${CHART_THEME_COLORS.actions} 12%, transparent) 0%, transparent 42%)`,
      }}
    >
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span
            className="flex size-7 items-center justify-center rounded-lg text-white shadow-2xs"
            style={{ backgroundColor: CHART_THEME_COLORS.actions }}
          >
            <BlingFilledIcon className="size-4" />
          </span>
          <h3 className="font-medium tracking-tight">
            Recovery factors
          </h3>
        </div>
        <span
          className="inline-flex shrink-0 items-center rounded-xl bg-background px-2.5 py-2 text-xs font-medium dark:bg-card"
          style={{ color: CHART_THEME_COLORS.outlook }}
        >
          7 days outlook
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {factors.map((factor, idx) => {
          const Icon = factorIcons[factor.icon]
          const factorColor = factorColorMap[factor.id] || 'var(--bionis-blue)'
          return (
            <div
              key={factor.id}
              className="flex items-center justify-between gap-3 rounded-xl bg-muted/50 p-3"
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <Icon
                  className="size-5 shrink-0"
                  style={{ color: factorColor }}
                />
                <span className="truncate font-medium tracking-tight">
                  {factor.label}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0 w-48 sm:w-52 justify-end">
                <div className="relative h-4 w-32 sm:w-36 rounded-lg bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-lg transition-all duration-700 ease-out"
                    style={{
                      width: mounted ? `${factor.fillPercentage}%` : '0%',
                      transitionDelay: `${idx * 100}ms`,
                      backgroundColor: factorColor,
                    }}
                  />
                </div>
                <span className="w-11 text-right font-medium tracking-tight">
                  {factor.value}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </article>
  )
}

const tileDotColorMap: Record<HeatmapTile, string> = {
  low: CHART_THEME_COLORS.heatmap.low,
  med: CHART_THEME_COLORS.heatmap.med,
  high: CHART_THEME_COLORS.heatmap.high,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function HeatmapScatterTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const tile = payload[0]?.payload
  if (!tile) return null

  return (
    <ChartTooltipFrame title={tile.date} icon={CalendarIcon}>
      <ChartTooltipItem
        label={tile.status}
        value={`${tile.score}%`}
        color={tileDotColorMap[tile.level as HeatmapTile]}
      />
    </ChartTooltipFrame>
  )
}

export function RecoveryHeatmapCard({
  data = recoveryHeatmapData,
  dateLabels = heatmapDateLabels,
  className,
}: {
  data?: HeatmapColumn[]
  dateLabels?: string[]
  className?: string
}) {
  const scatterData = useMemo(() => {
    const points: Array<{
      x: number
      y: number
      id: string
      level: HeatmapTile
      score: number
      date: string
      status: string
    }> = []

    data.forEach((col, colIdx) => {
      col.tiles.forEach((tile, rowIdx) => {
        points.push({
          x: colIdx,
          y: 4 - rowIdx,
          id: tile.id,
          level: tile.level,
          score: tile.score,
          date: tile.date,
          status: tile.status,
        })
      })
    })
    return points
  }, [data])

  return (
    <article
      className={cn(
        'flex min-h-90 flex-1 flex-col justify-between rounded-2xl border p-4 md:p-5',
        className,
      )}
      style={{
        background: `linear-gradient(180deg, color-mix(in srgb, ${CHART_THEME_COLORS.heatmap.med} 12%, transparent) 0%, transparent 42%)`,
      }}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span
            className="flex size-7 items-center justify-center rounded-lg text-white shadow-2xs"
            style={{ backgroundColor: CHART_THEME_COLORS.heatmap.med }}
          >
            <BatteryChargingIcon className="size-4" />
          </span>
          <h3 className="font-medium tracking-tight">
            Recovery heatmap
          </h3>
        </div>

        <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
          <span>Low</span>
          <div className="flex items-center gap-0.5">
            <span
              className="size-3 rounded-xs"
              style={{ backgroundColor: CHART_THEME_COLORS.heatmap.low }}
            />
            <span
              className="size-3 rounded-xs"
              style={{ backgroundColor: CHART_THEME_COLORS.heatmap.med }}
            />
            <span
              className="size-3 rounded-xs"
              style={{ backgroundColor: CHART_THEME_COLORS.heatmap.high }}
            />
          </div>
          <span>High</span>
        </div>
      </div>

      <div className="h-64 w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 8, right: 8, left: 8, bottom: 12 }}>
            <XAxis
              type="number"
              dataKey="x"
              domain={[-0.5, 6.5]}
              ticks={[0, 2, 4, 6]}
              tickFormatter={(val: number) =>
                dateLabels[Math.round(val / 2)] || ''
              }
              axisLine={false}
              tickLine={false}
              tick={AXIS_TICK}
            />
            <YAxis
              type="number"
              dataKey="y"
              domain={[-0.5, 4.5]}
              hide
            />
            <Tooltip cursor={false} content={<HeatmapScatterTooltip />} />
            <Scatter
              data={scatterData}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              shape={(props: any) => {
                const { xAxis, yAxis, cx, cy, payload } = props
                if (typeof cx !== 'number' || typeof cy !== 'number') return <g />
                const colW = (xAxis?.width ?? 0) / 7
                const rowH = (yAxis?.height ?? 0) / 5
                const w = Math.max(colW - 6, 8)
                const h = Math.max(rowH - 4, 8)

                return (
                  <rect
                    x={cx - w / 2}
                    y={cy - h / 2}
                    width={w}
                    height={h}
                    rx={6}
                    className="transition-opacity duration-200 hover:opacity-75 cursor-pointer"
                    fill={tileDotColorMap[payload.level as HeatmapTile]}
                  />
                )
              }}
              isAnimationActive
              animationDuration={CHART_ANIMATION_MS}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </article>
  )
}