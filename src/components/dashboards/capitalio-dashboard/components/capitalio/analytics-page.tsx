import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { analyticsDataByPeriod, type PeriodValue } from '../../data'
import { Button } from '@/components/ui/button'
import {
  ChartMarker,
  DashboardCard,
  DashboardChartTooltip,
  DetailHeader,
  DetailTag,
  useDashboardPeriod,
} from './shared'

type AnalyticsByPeriod = typeof analyticsDataByPeriod
type AnalyticsData = AnalyticsByPeriod[PeriodValue]
type AnalyticsPerformance = AnalyticsData['performance']
type AnalyticsMetric = AnalyticsData['metrics'][number]
type AnalyticsSeries = AnalyticsData['returns']['series'][number]
type ChartDataRow = {
  label: string
  [key: string]: number | string
}

function axisLabelsFrom(data: readonly { label: string; axisLabel?: string }[]) {
  return data
    .filter((point) => point.axisLabel)
    .map((point) => point.axisLabel)
}

function seriesNames(series: readonly { dataKey: string; label: string }[]) {
  return Object.fromEntries(series.map((item) => [item.dataKey, item.label]))
}

function seriesColors(series: readonly { dataKey: string; color: string }[]) {
  return Object.fromEntries(series.map((item) => [item.dataKey, item.color]))
}

function hoverFill(color: string) {
  return `color-mix(in oklab, ${color} 78%, var(--foreground))`
}

function valuesFor(data: readonly ChartDataRow[], series: readonly { dataKey: string }[]) {
  return data.flatMap((row) => series.map((item) => Number(row[item.dataKey]) || 0))
}

function roundedDomain(values: readonly number[]) {
  const min = Math.min(...values)
  const max = Math.max(...values)
  const lower = Math.min(0, Math.floor(min / 2) * 2)
  const upper = Math.max(2, Math.ceil(max / 2) * 2)

  return [lower, upper] as const
}

function AnalyticsLegend({ series }: { series: readonly { label: string; color: string }[] }) {
  return (
    <div className="flex min-w-0 flex-wrap items-center justify-center gap-5">
      {series.map((item) => (
        <div key={item.label} className="flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
          <ChartMarker color={item.color} className="size-2.5" />
          <span className="truncate">{item.label}</span>
        </div>
      ))}
    </div>
  )
}

function AnalyticsPerformanceChart({ performance }: { performance: AnalyticsPerformance }) {
  const chartData = performance.data.map((point) => ({
    label: point.label,
    portfolio: point.portfolio,
    benchmark: point.benchmark,
    balanced: point.balanced,
  }))
  const axisLabels = axisLabelsFrom(performance.data)

  return (
    <DashboardCard className="flex flex-col gap-5">
      <DetailHeader title={performance.title} subtitle={performance.subtitle}>
        <DetailTag color="var(--chart-4)">{performance.trend}</DetailTag>
        <Button type="button" variant="secondary" size="sm">
          {performance.compareLabel}
        </Button>
      </DetailHeader>

      <div className="dashboard-dot-grid h-80 min-w-0 overflow-hidden rounded-md md:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="analytics-performance-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-4)" stopOpacity="0.42" />
                <stop offset="100%" stopColor="var(--chart-4)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <XAxis
              allowDuplicatedCategory
              axisLine={false}
              dataKey="label"
              tick={false}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
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
                  colors={seriesColors(performance.legend)}
                  names={seriesNames(performance.legend)}
                  valueFormatter={(value) => `${value}K`}
                />
              }
            />
            <Area
              dataKey="portfolio"
              dot={false}
              fill="url(#analytics-performance-fill)"
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
            <Area
              dataKey="balanced"
              dot={false}
              fill="transparent"
              isAnimationActive
              stroke="var(--chart-2)"
              strokeDasharray="4 6"
              strokeWidth={2}
              type="monotone"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid min-w-0 grid-cols-4 pl-12 text-center text-xs text-muted-foreground">
        {axisLabels.map((label) => (
          <span key={label} className="truncate">{label}</span>
        ))}
      </div>

      <AnalyticsLegend series={performance.legend} />
    </DashboardCard>
  )
}

function AnalyticsMetricChart({ metric }: { metric: AnalyticsMetric }) {
  if (metric.type === 'bars') {
    const chartData = metric.data.map((point) => ({
      label: point.label,
      value: point.value,
    }))

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <XAxis dataKey="label" hide />
          <YAxis hide domain={[0, 28]} />
          <RechartsTooltip
            cursor={false}
            content={
              <DashboardChartTooltip
                colors={{ value: metric.color }}
                names={{ value: metric.title }}
                valueFormatter={(value) => `${value}%`}
              />
            }
          />
          <Bar
            activeBar={{ fill: hoverFill(metric.color) }}
            dataKey="value"
            fill={metric.color}
            isAnimationActive
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  const chartData = metric.data.map((point) => ({
    label: point.label,
    x: point.x,
    value: 44 - point.y,
  }))
  const xDomain = [chartData[0]?.x ?? 0, chartData[chartData.length - 1]?.x ?? 0]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={`analytics-${metric.id}-fill`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={metric.color} stopOpacity="0.42" />
            <stop offset="100%" stopColor={metric.color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <XAxis dataKey="x" type="number" hide domain={xDomain} />
        <YAxis hide domain={[0, 44]} />
        <RechartsTooltip
          cursor={false}
          content={
            <DashboardChartTooltip
              colors={{ value: metric.color }}
              names={{ value: metric.title }}
            />
          }
        />
        <Area
          dataKey="value"
          dot={false}
          fill={`url(#analytics-${metric.id}-fill)`}
          isAnimationActive
          stroke={metric.color}
          strokeWidth={2}
          type="monotone"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function AnalyticsMetricCard({ metric }: { metric: AnalyticsMetric }) {
  return (
    <DashboardCard className="flex min-h-40 flex-col gap-5">
      <div>
        <h2 className="truncate text-base font-medium leading-6">{metric.title}</h2>
        <div className="mt-4 text-3xl font-semibold leading-none">{metric.value}</div>
        <div className="mt-1 truncate text-xs text-muted-foreground">{metric.description}</div>
      </div>
      <div className="min-h-16 flex-1">
        <AnalyticsMetricChart metric={metric} />
      </div>
    </DashboardCard>
  )
}

function ReturnsChart({
  data,
  series,
}: {
  data: AnalyticsData['returns']['data']
  series: readonly AnalyticsSeries[]
}) {
  const chartData = data.map((row) => ({ ...row }))
  const [yMin, yMax] = roundedDomain(valuesFor(chartData, series))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 8, right: 0, bottom: 0, left: 0 }}>
        <CartesianGrid
          stroke="var(--border)"
          strokeDasharray="3 3"
          vertical={false}
        />
        <XAxis
          axisLine={false}
          dataKey="label"
          tick={{ fill: 'var(--muted-foreground)', fontSize: '0.75rem' }}
          tickLine={false}
        />
        <YAxis
          axisLine={false}
          domain={[yMin, yMax]}
          tick={{ fill: 'var(--muted-foreground)', fontSize: '0.75rem' }}
          tickFormatter={(value) => `${value}%`}
          tickLine={false}
          width={40}
        />
        <RechartsTooltip
          cursor={false}
          content={
            <DashboardChartTooltip
              colors={seriesColors(series)}
              names={seriesNames(series)}
              valueFormatter={(value) => `${value}%`}
            />
          }
        />
        {series.map((item) => (
          <Bar
            activeBar={{ fill: hoverFill(item.color) }}
            key={item.dataKey}
            dataKey={item.dataKey}
            fill={item.color}
            isAnimationActive
            radius={[4, 4, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}

function IncomeChart({ income }: { income: AnalyticsData['income'] }) {
  const chartData = income.data.map((row) => ({ ...row }))
  const stacks = chartData.map((row) =>
    income.series.reduce((total, item) => total + (Number(row[item.dataKey]) || 0), 0),
  )
  const yMax = Math.max(5, Math.ceil(Math.max(...stacks)))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 8, right: 0, bottom: 0, left: 0 }}>
        <CartesianGrid
          stroke="var(--border)"
          strokeDasharray="3 3"
          vertical={false}
        />
        <XAxis
          axisLine={false}
          dataKey="label"
          tick={{ fill: 'var(--muted-foreground)', fontSize: '0.75rem' }}
          tickLine={false}
        />
        <YAxis
          axisLine={false}
          domain={[0, yMax]}
          tick={{ fill: 'var(--muted-foreground)', fontSize: '0.75rem' }}
          tickFormatter={(value) => `${value}.0K`}
          tickLine={false}
          width={48}
        />
        <RechartsTooltip
          cursor={false}
          content={
            <DashboardChartTooltip
              colors={seriesColors(income.series)}
              names={seriesNames(income.series)}
              valueFormatter={(value) => `$${value}K`}
            />
          }
        />
        {income.series.map((item, index) => (
          <Bar
            activeBar={{ fill: hoverFill(item.color) }}
            key={item.dataKey}
            dataKey={item.dataKey}
            fill={item.color}
            isAnimationActive
            radius={index === income.series.length - 1 ? [6, 6, 0, 0] : [0, 0, 6, 6]}
            stackId="income"
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}

function AnalyticsPanel({
  title,
  subtitle,
  status,
  series,
  children,
}: {
  title: string
  subtitle: string
  status: string
  series: readonly { label: string; color: string }[]
  children: React.ReactNode
}) {
  return (
    <DashboardCard className="flex min-h-80 flex-col gap-5">
      <DetailHeader title={title} subtitle={subtitle}>
        <DetailTag color="var(--chart-4)">{status}</DetailTag>
      </DetailHeader>
      <AnalyticsLegend series={series} />
      <div className="min-h-56 flex-1">{children}</div>
    </DashboardCard>
  )
}

export function AnalyticsPage() {
  const period = useDashboardPeriod()
  const analytics = analyticsDataByPeriod[period]

  return (
    <section className="flex min-h-full flex-col gap-4 p-4 pb-8 md:p-8">
      <AnalyticsPerformanceChart performance={analytics.performance} />

      <div className="grid min-w-0 gap-3 lg:grid-cols-3">
        {analytics.metrics.map((metric) => (
          <AnalyticsMetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="grid min-w-0 gap-3 xl:grid-cols-2">
        <AnalyticsPanel
          title={analytics.returns.title}
          subtitle={analytics.returns.subtitle}
          status={analytics.returns.status}
          series={analytics.returns.series}
        >
          <ReturnsChart data={analytics.returns.data} series={analytics.returns.series} />
        </AnalyticsPanel>

        <AnalyticsPanel
          title={analytics.income.title}
          subtitle={analytics.income.subtitle}
          status={analytics.income.status}
          series={analytics.income.series}
        >
          <IncomeChart income={analytics.income} />
        </AnalyticsPanel>
      </div>
    </section>
  )
}
