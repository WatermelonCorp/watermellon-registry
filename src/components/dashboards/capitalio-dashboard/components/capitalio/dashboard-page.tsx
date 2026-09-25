import {
  Area,
  AreaChart as RechartsAreaChart,
  Bar,
  BarChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  dashboardBottomByPeriod,
  dashboardDetailByPeriod,
  dashboardSummaryCardsByPeriod,
  type PeriodValue,
} from '../../data'
import {
  DashboardAnalyticsUpIcon,
  Dashboard3dScaleIcon,
  DashboardArrowUpIcon,
  DashboardArrowUpRightIcon,
  DashboardMoneyBagIcon,
  DashboardPieChartIcon,
  DashboardReloadHorizontalIcon,
  DashboardShieldIcon,
  DashboardTaxesIcon,
} from './icons'
import { Button } from '@/components/ui/button'
import {
  ChartMarker,
  DashboardCard,
  DashboardChartTooltip,
  DetailHeader,
  DetailTag,
  toneColor,
  useDashboardPeriod,
} from './shared'
import { cn } from '@/lib/utils'

const cardIcons = {
  wallet: DashboardMoneyBagIcon,
  trend: DashboardAnalyticsUpIcon,
  pie: DashboardPieChartIcon,
  shield: DashboardShieldIcon,
} as const

const insightIcons = {
  scale: Dashboard3dScaleIcon,
  taxes: DashboardTaxesIcon,
  reload: DashboardReloadHorizontalIcon,
} as const

type SummaryCardsByPeriod = typeof dashboardSummaryCardsByPeriod
type SummaryCard = SummaryCardsByPeriod[PeriodValue][number]
type DetailByPeriod = typeof dashboardDetailByPeriod
type DashboardDetail = DetailByPeriod[PeriodValue]
type BottomByPeriod = typeof dashboardBottomByPeriod
type DashboardBottom = BottomByPeriod[PeriodValue]
type HoldingRow = DashboardBottom['holdings']['rows'][number]
type InsightItem = DashboardBottom['insights']['items'][number]
type ChartPoint = {
  label: string
  x: number
  y: number
}
type ReturnBarShapeProps = {
  x?: number
  y?: number
  width?: number
  height?: number
  payload?: {
    isActive?: boolean
  }
}
function createChartData(points: readonly ChartPoint[], baseline: number) {
  return points.map((point) => ({
    name: point.label,
    x: point.x,
    value: baseline - point.y,
  }))
}

function getEveryOtherLabels(points: readonly { label: string }[]) {
  return points
    .filter((_, index) => index % 2 === 0)
    .map((point) => point.label)
}

function IconBadge({ card }: { card: SummaryCard }) {
  const Icon = cardIcons[card.icon]

  return (
    <div className="dashboard-icon-badge flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg p-2 text-white shadow-none">
      <Icon className="size-5 shrink-0" />
    </div>
  )
}

function AxisLabels({ labels }: { labels: readonly string[] }) {
  return (
    <div className="grid grid-cols-3 text-xs leading-none text-muted-foreground">
      {labels.map((label, index) => (
        <span
          key={label}
          className={cn(index === 1 && 'text-center', index === 2 && 'text-right')}
        >
          {label}
        </span>
      ))}
    </div>
  )
}

function LineChart({ card }: { card: Extract<SummaryCard, { id: 'net-worth' }> }) {
  const chartData = createChartData(card.chart.points, 58)
  const axisLabels = getEveryOtherLabels(card.chart.points)
  const xDomain = [chartData[0]?.x ?? 0, chartData[chartData.length - 1]?.x ?? 0]

  return (
    <div className="space-y-2">
      <div
        role="img"
        aria-label={`${card.title} trend`}
        className="h-16 w-full"
        style={{ color: card.color }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RechartsAreaChart data={chartData} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id={`${card.id}-fill`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.32" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            <XAxis dataKey="x" type="number" hide domain={xDomain} />
            <YAxis hide domain={[0, 58]} />
            <RechartsTooltip
              cursor={false}
              content={
                <DashboardChartTooltip
                  colors={{ value: card.color }}
                  names={{ value: card.title }}
                />
              }
            />
            <Area
              dataKey="value"
              dot={false}
              fill={`url(#${card.id}-fill)`}
              isAnimationActive
              stroke="currentColor"
              strokeWidth={2}
              type="monotone"
            />
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>
      <AxisLabels labels={axisLabels} />
    </div>
  )
}

function AreaChart({ card }: { card: Extract<SummaryCard, { id: 'risk-score' }> }) {
  const chartData = createChartData(card.chart.points, 48)
  const axisLabels = getEveryOtherLabels(card.chart.points)
  const xDomain = [chartData[0]?.x ?? 0, chartData[chartData.length - 1]?.x ?? 0]

  return (
    <div className="space-y-2">
      <div
        role="img"
        aria-label={`${card.title} history`}
        className="h-12 w-full"
        style={{ color: card.color }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RechartsAreaChart data={chartData} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id={`${card.id}-risk-fill`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.36" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            <XAxis dataKey="x" type="number" hide domain={xDomain} />
            <YAxis hide domain={[0, 48]} />
            <RechartsTooltip
              cursor={false}
              content={
                <DashboardChartTooltip
                  colors={{ value: card.color }}
                  names={{ value: card.title }}
                />
              }
            />
            <Area
              dataKey="value"
              dot={false}
              fill={`url(#${card.id}-risk-fill)`}
              isAnimationActive
              stroke="currentColor"
              strokeWidth={2}
              type="monotone"
            />
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>
      <AxisLabels labels={axisLabels} />
    </div>
  )
}

function ReturnChart({ card }: { card: Extract<SummaryCard, { id: 'portfolio-return' }> }) {
  const chartData = card.bars.map((bar, index) => ({
    name: bar.label,
    value: bar.value,
    isActive: index === card.bars.length - 1,
  }))
  const axisLabels = card.bars
    .filter((_, index) => index % 2 === 0)
    .map((bar) => bar.label)

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <div
          className="h-2 overflow-hidden rounded-sm"
          style={{
            backgroundColor: 'color-mix(in oklab, var(--foreground) 7%, transparent)',
          }}
        >
          <div
            key={card.target.progress}
            className="dashboard-progress-fill h-full rounded-sm bg-primary"
            style={{ width: `${card.target.progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs leading-none">
          <span className="font-medium text-foreground">{card.target.gained}</span>
          <span className="text-muted-foreground">{card.target.goal}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div role="img" aria-label={`${card.title} bars`} className="h-8 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <XAxis dataKey="name" hide />
              <YAxis hide domain={[0, 32]} />
              <RechartsTooltip
                cursor={false}
                content={
                  <DashboardChartTooltip
                    colors={{ value: 'var(--chart-1)' }}
                    names={{ value: card.title }}
                  />
                }
              />
              <Bar
                activeBar={(props: ReturnBarShapeProps) => (
                  <rect
                    x={props.x}
                    y={props.y}
                    width={props.width}
                    height={props.height}
                    rx="0.25rem"
                    fill={
                      props.payload?.isActive
                        ? 'var(--chart-1)'
                        : 'color-mix(in oklab, var(--chart-1) 65%, transparent)'
                    }
                  />
                )}
                dataKey="value"
                fill="var(--chart-1)"
                isAnimationActive
                shape={(props: ReturnBarShapeProps) => (
                  <rect
                    x={props.x}
                    y={props.y}
                    width={props.width}
                    height={props.height}
                    rx="0.25rem"
                    fill={
                      props.payload?.isActive
                        ? 'var(--chart-1)'
                        : 'color-mix(in oklab, var(--chart-1) 35%, transparent)'
                    }
                  />
                )}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <AxisLabels labels={axisLabels} />
      </div>
    </div>
  )
}

function AllocationChart({ card }: { card: Extract<SummaryCard, { id: 'asset-classes' }> }) {
  const chartData = [
    Object.fromEntries(card.allocations.map((allocation) => [allocation.label, allocation.share])),
  ]
  const patternIds = card.allocations.map((allocation, index) => (
    `${card.id}-${index}-${allocation.label.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}-pattern`
  ))

  return (
    <div className="flex flex-1 flex-col justify-between gap-6">
      <div role="img" aria-label={`${card.title} allocation`} className="h-5 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <XAxis type="number" hide domain={[0, 100]} />
            <YAxis type="category" hide />
            <defs>
              {card.allocations.map((allocation, index) => (
                <pattern
                  key={allocation.label}
                  id={patternIds[index]}
                  width="24"
                  height="24"
                  patternTransform="rotate(45)"
                  patternUnits="userSpaceOnUse"
                >
                  <rect width="24" height="24" fill={allocation.color} />
                  <rect
                    width="10"
                    height="24"
                    fill={`color-mix(in oklab, ${allocation.color} 89%, black)`}
                  />
                </pattern>
              ))}
            </defs>
            {card.allocations.map((allocation, index) => (
              <Bar
                key={allocation.label}
                dataKey={allocation.label}
                fill={`url(#${patternIds[index]})`}
                isAnimationActive
                radius={
                  index === 0
                    ? [6, 0, 0, 6]
                    : [0, 6, 6, 0]
                }
                stackId="allocation"
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4">
        {card.allocations.map((allocation) => (
          <div key={allocation.label} className="flex items-center gap-3">
            <ChartMarker color={allocation.color} className="size-3.5" />
            <span className="min-w-0 flex-1 truncate text-sm text-foreground/80">
              {allocation.label}
            </span>
            <span className="text-sm font-semibold text-foreground">
              {allocation.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SummaryVisualization({ card }: { card: SummaryCard }) {
  if (card.id === 'asset-classes') {
    return <AllocationChart card={card} />
  }

  if (card.id === 'portfolio-return') {
    return <ReturnChart card={card} />
  }

  if (card.id === 'risk-score') {
    return <AreaChart card={card} />
  }

  return <LineChart card={card} />
}

function SummaryCard({ card }: { card: SummaryCard }) {
  return (
    <DashboardCard className="flex min-h-48 flex-col gap-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="truncate text-base font-normal leading-6">{card.title}</h2>
        <IconBadge card={card} />
      </div>

      <div className="flex items-end gap-2">
        <div className="text-3xl font-bold leading-none tracking-normal">
          {card.value}
          {'suffix' in card ? (
            <span className="ml-1 text-base font-semibold text-foreground/70">
              {card.suffix}
            </span>
          ) : null}
        </div>

        {'change' in card ? (
          <div className="flex min-w-0 items-center gap-1 pb-0.5 text-xs leading-tight text-muted-foreground">
            {card.change.tone === 'positive' ? (
              <DashboardArrowUpIcon className="h-2.5 w-1.5 shrink-0" />
            ) : null}
            <span
              className={cn(
                'shrink-0 font-medium',
                card.change.tone !== 'positive' && 'text-foreground',
              )}
              style={card.change.tone === 'positive' ? { color: 'var(--chart-4)' } : undefined}
            >
              {card.change.value}
            </span>
            <span className="truncate">{card.change.label}</span>
          </div>
        ) : null}

        {'target' in card ? (
          <div className="min-w-0 pb-0.5 text-xs leading-tight text-muted-foreground">
            <span className="font-medium text-foreground">{card.target.current}</span>{' '}
            <span>{card.target.label}</span>
          </div>
        ) : null}
      </div>

      <SummaryVisualization card={card} />
    </DashboardCard>
  )
}

function PerformanceChart({ performance }: { performance: DashboardDetail['performance'] }) {
  const chartData = performance.data.map((point) => ({
    name: point.label,
    portfolio: point.portfolio,
    benchmark: point.benchmark,
  }))
  const axisLabels = performance.data
    .filter((point) => 'axisLabel' in point)
    .map((point) => point.axisLabel)

  return (
    <div className="flex min-h-80 min-w-0 flex-col gap-3">
      <div className="dashboard-dot-grid min-h-72 min-w-0 flex-1 overflow-hidden rounded-md">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsAreaChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="portfolio-performance-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-4)" stopOpacity="0.42" />
                <stop offset="100%" stopColor="var(--chart-4)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <XAxis
              axisLine={false}
              dataKey="name"
              tick={false}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              dataKey="portfolio"
              domain={[200, 700]}
              ticks={[200, 300, 400, 500, 600, 700]}
              tick={{ fill: 'var(--muted-foreground)', fontSize: '0.75rem' }}
              tickFormatter={(value) => `${value}K`}
              tickLine={false}
              width={48}
            />
            <RechartsTooltip
              cursor={false}
              content={
                <DashboardChartTooltip
                  colors={{
                    portfolio: 'var(--chart-4)',
                    benchmark: 'var(--chart-1)',
                  }}
                  names={{
                    portfolio: 'Your Portfolio',
                    benchmark: 'S&P 500',
                  }}
                  valueFormatter={(value) => `${value}K`}
                />
              }
            />
            <Area
              dataKey="portfolio"
              dot={false}
              fill="url(#portfolio-performance-fill)"
              isAnimationActive
              stroke="var(--chart-4)"
              strokeWidth={3}
              type="monotone"
            />
            <Area
              dataKey="benchmark"
              dot={false}
              fill="transparent"
              isAnimationActive
              stroke="var(--chart-1)"
              strokeDasharray="8 8"
              strokeWidth={2}
              type="monotone"
            />
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid min-w-0 grid-cols-4 pl-12 text-center text-xs text-muted-foreground">
        {axisLabels.map((label) => (
          <span key={label} className="truncate">{label}</span>
        ))}
      </div>
    </div>
  )
}

function PerformancePanel({ performance }: { performance: DashboardDetail['performance'] }) {
  return (
    <DashboardCard className="flex flex-col gap-6 xl:col-span-2">
      <DetailHeader title={performance.title}>
        <DetailTag color="var(--chart-4)">{performance.trend}</DetailTag>
        <Button
          type="button"
          variant="secondary"
          size="sm"
        >
          <span className="truncate">{performance.actionLabel}</span>
          <DashboardArrowUpRightIcon className="size-4 shrink-0" />
        </Button>
      </DetailHeader>

      <PerformanceChart performance={performance} />

      <div className="flex flex-wrap items-center justify-end gap-4">
        {performance.legend.map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-sm text-foreground/80">
            <ChartMarker color={item.color} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-5 xl:grid-cols-4">
        {performance.metrics.map((metric) => (
          <div key={metric.label} className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground">{metric.label}</div>
            <div className="text-2xl font-medium leading-none">{metric.value}</div>
            <div
              className="flex items-center gap-1 text-xs font-medium"
              style={{
                color: metric.tone === 'positive' ? 'var(--chart-4)' : 'var(--destructive)',
              }}
            >
              <DashboardArrowUpIcon className={cn('h-3 w-2', metric.tone === 'negative' && 'rotate-180')} />
              <span>{metric.change}</span>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  )
}

function AllocationDonut({ allocation }: { allocation: DashboardDetail['allocation'] }) {
  const chartData = allocation.items.map((item) => ({
    name: item.label,
    value: item.percent,
    fill: item.color,
  }))

  return (
    <div className="relative mx-auto aspect-square w-full max-w-56">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            cornerRadius={4}
            data={chartData}
            dataKey="value"
            endAngle={-270}
            innerRadius="68%"
            isAnimationActive
            outerRadius="88%"
            paddingAngle={6}
            startAngle={90}
            stroke="none"
          />
          <RechartsTooltip
            wrapperStyle={{ zIndex: 20 }}
            cursor={false}
            content={
              <DashboardChartTooltip
                valueFormatter={(value) => `${value}%`}
              />
            }
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center">
        <div className="text-3xl font-semibold leading-none">{allocation.centerValue}</div>
        <div className="mt-2 text-base text-muted-foreground">{allocation.centerLabel}</div>
      </div>
    </div>
  )
}

function AllocationPanel({ allocation }: { allocation: DashboardDetail['allocation'] }) {
  return (
    <DashboardCard className="flex flex-col gap-6">
      <DetailHeader title={allocation.title}>
        <DetailTag>{allocation.status}</DetailTag>
      </DetailHeader>

      <div className="flex flex-1 flex-col justify-between gap-6">
        <AllocationDonut allocation={allocation} />

        <div className="space-y-5">
          {allocation.items.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <ChartMarker color={item.color} className="size-4" />
                <span className="truncate text-base font-medium text-foreground/80">{item.label}</span>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <span className="text-base font-medium text-foreground/80">{item.value}</span>
                <span className="min-w-10 text-right text-base text-muted-foreground">{item.percent}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardCard>
  )
}

function DashboardDetailSection({ detail }: { detail: DashboardDetail }) {
  return (
    <div className="grid min-w-0 gap-3 xl:grid-cols-3">
      <PerformancePanel performance={detail.performance} />
      <AllocationPanel allocation={detail.allocation} />
    </div>
  )
}

function HoldingAsset({ row }: { row: HoldingRow }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg">
        <img src={row.logo} alt="" className="size-full object-cover" />
      </span>
      <div className="min-w-0">
        <div className="truncate text-sm font-medium leading-none">{row.asset}</div>
        <div className="mt-1 text-xs leading-none text-muted-foreground">{row.type}</div>
      </div>
    </div>
  )
}

function HoldingsTable({ holdings }: { holdings: DashboardBottom['holdings'] }) {
  return (
    <DashboardCard className="flex flex-col gap-4 lg:col-span-2">
      <DetailHeader title={holdings.title}>
        <Button
          type="button"
          variant="secondary"
          size="sm"
        >
          <span className="truncate">{holdings.actionLabel}</span>
          <DashboardArrowUpRightIcon className="size-4 shrink-0" />
        </Button>
      </DetailHeader>

      <div className="hidden min-w-0 md:block">
        <div className="grid grid-cols-12 items-center rounded-lg border border-border bg-foreground/5 px-4 py-3 text-sm font-medium text-foreground/80">
          <div className="col-span-1">{holdings.columns[0]}</div>
          <div className="col-span-4">{holdings.columns[1]}</div>
          <div className="col-span-2">{holdings.columns[2]}</div>
          <div className="col-span-2">{holdings.columns[3]}</div>
          <div className="col-span-2">{holdings.columns[4]}</div>
          <div className="col-span-1">{holdings.columns[5]}</div>
        </div>

        <div>
          {holdings.rows.map((row) => (
            <div
              key={row.no}
              className="grid grid-cols-12 items-center border-b border-border px-4 py-3 last:border-b-0"
            >
              <div className="col-span-1 text-sm text-muted-foreground">{row.no}</div>
              <div className="col-span-4 min-w-0">
                <HoldingAsset row={row} />
              </div>
              <div className="col-span-2 text-sm">{row.value}</div>
              <div className="col-span-2 text-sm">{row.allocation}</div>
              <div className="col-span-2 text-sm" style={{ color: toneColor(row.tone) }}>
                {row.return}
              </div>
              <div className="col-span-1 text-sm" style={{ color: toneColor(row.dayTone) }}>
                {row.day}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-3 md:hidden">
        {holdings.rows.map((row) => (
          <div key={row.no} className="rounded-lg border border-border p-3">
            <div className="flex items-center justify-between gap-3">
              <HoldingAsset row={row} />
              <span className="text-sm text-muted-foreground">{row.no}</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Value</div>
                <div>{row.value}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Allocation</div>
                <div>{row.allocation}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Return</div>
                <div style={{ color: toneColor(row.tone) }}>{row.return}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">24H</div>
                <div style={{ color: toneColor(row.dayTone) }}>{row.day}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  )
}

function InsightIcon({ item }: { item: InsightItem }) {
  const Icon = insightIcons[item.icon]

  return (
    <div className="dashboard-icon-badge flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg p-1.5 text-white">
      <Icon className="size-5 text-white" />
    </div>
  )
}

function SmartInsightsPanel({ insights }: { insights: DashboardBottom['insights'] }) {
  return (
    <DashboardCard className="flex flex-col gap-6">
      <DetailHeader title={insights.title}>
        <DetailTag>{insights.status}</DetailTag>
      </DetailHeader>

      <div className="flex flex-col gap-6">
        {insights.items.map((item, index) => (
          <div
            key={item.title}
            className={cn('flex gap-3', index > 0 && 'border-t border-border pt-6')}
          >
            <InsightIcon item={item} />
            <div className="min-w-0 flex-1">
              <div className="font-medium leading-tight">{item.title}</div>
              <div className="mt-2 text-sm leading-snug text-muted-foreground">
                {item.description}
              </div>
              <div className="mt-3 flex justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                >
                  <span className="truncate">{item.action}</span>
                  <DashboardArrowUpRightIcon className="size-4 shrink-0" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  )
}

function DashboardBottomSection({ bottom }: { bottom: DashboardBottom }) {
  return (
    <div className="grid min-w-0 gap-3 lg:grid-cols-3">
      <HoldingsTable holdings={bottom.holdings} />
      <SmartInsightsPanel insights={bottom.insights} />
    </div>
  )
}

export function DashboardPage() {
  const period = useDashboardPeriod()
  const dashboardSummaryCards = dashboardSummaryCardsByPeriod[period]
  const dashboardDetail = dashboardDetailByPeriod[period]
  const dashboardBottom = dashboardBottomByPeriod[period]

  return (
    <section className="flex min-h-full flex-col gap-4 p-4 pb-8 md:p-8">
      <div className="grid min-w-0 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {dashboardSummaryCards.map((card) => (
          <SummaryCard key={card.id} card={card} />
        ))}
      </div>
      <DashboardDetailSection detail={dashboardDetail} />
      <DashboardBottomSection bottom={dashboardBottom} />
    </section>
  )
}
