import { dashboardPeriods, defaultDashboardPeriod } from '../../data'
import { cn } from '@/lib/utils'
import { useDashboardNavigation } from './navigation'

type DashboardTooltipPayload = {
  name?: string
  value?: number | string
  color?: string
  dataKey?: string | number
  payload?: {
    name?: string
    fill?: string
  }
}

type DashboardChartTooltipProps = {
  active?: boolean
  label?: string | number
  payload?: readonly DashboardTooltipPayload[]
  names?: Record<string, string>
  colors?: Record<string, string>
  valueFormatter?: (value: number | string, dataKey: string) => React.ReactNode
}

export function useDashboardPeriod() {
  const { period } = useDashboardNavigation()

  return dashboardPeriods.some((periodOption) => periodOption.value === period)
    ? period
    : defaultDashboardPeriod
}

export function toneColor(tone: 'positive' | 'negative' | 'neutral') {
  if (tone === 'positive') {
    return 'var(--chart-4)'
  }

  if (tone === 'negative') {
    return 'var(--destructive)'
  }

  return 'var(--foreground)'
}

export function DashboardCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <article
      className={cn(
        'shadow-custom min-w-0 rounded-lg border border-border bg-card p-4 text-card-foreground',
        className,
      )}
    >
      {children}
    </article>
  )
}

export function DetailHeader({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children?: React.ReactNode
}) {
  return (
    <div className="flex min-w-0 flex-wrap items-start justify-between gap-3">
      <div className="min-w-0 flex-1">
        <h2 className="truncate text-lg font-medium leading-6">{title}</h2>
        {subtitle ? (
          <div className="mt-1 truncate text-sm leading-none text-muted-foreground">{subtitle}</div>
        ) : null}
      </div>
      {children ? <div className="flex min-w-0 flex-wrap items-center justify-end gap-2">{children}</div> : null}
    </div>
  )
}

export function DetailTag({
  children,
  color = 'var(--chart-1)',
}: {
  children: React.ReactNode
  color?: string
}) {
  return (
    <span
      className="rounded-lg px-3 py-1 text-sm leading-5"
      style={{
        color,
        backgroundColor: `color-mix(in oklab, ${color} 10%, transparent)`,
      }}
    >
      {children}
    </span>
  )
}

export function DashboardChartTooltip({
  active,
  label,
  payload,
  names,
  colors,
  valueFormatter,
}: DashboardChartTooltipProps) {
  const items = payload?.filter((item) => item.value !== undefined && item.value !== null) ?? []

  if (!active || items.length === 0) {
    return null
  }

  const header = items[0]?.payload?.name ?? label

  return (
    <div className="rounded-lg border border-border bg-popover p-3 text-xs text-popover-foreground shadow-custom">
      <div className="mb-2 text-xs font-medium text-muted-foreground">{header}</div>
      <div className="space-y-2">
        {items.map((item) => {
          const dataKey = String(item.dataKey ?? item.name ?? '')
          const color = colors?.[dataKey] ?? item.color ?? item.payload?.fill ?? 'var(--foreground)'
          const name = names?.[dataKey] ?? item.name ?? dataKey
          const value = valueFormatter ? valueFormatter(item.value ?? '', dataKey) : item.value

          return (
            <div key={dataKey} className="grid grid-cols-[1fr_auto] items-center gap-4 leading-none">
              <div className="flex min-w-0 items-center gap-2">
                <span className="size-3 shrink-0 rounded-xs" style={{ backgroundColor: color }} />
                <span className="truncate text-xs">{name}</span>
              </div>
              <span className="text-right font-medium text-xs">{value}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function ChartMarker({ color, className }: { color: string; className?: string }) {
  return (
    <span
      className={cn('size-3 shrink-0 rounded-xs', className)}
      style={{ backgroundColor: color }}
    />
  )
}
