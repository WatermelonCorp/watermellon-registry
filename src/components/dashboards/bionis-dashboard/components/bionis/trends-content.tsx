import { useState } from 'react'
import { CalendarIcon } from './icons'
import {
  KeyMetricCard,
  RecoveryFactorsCard,
  RecoveryHeatmapCard,
  SleepRecoveryTrendChart,
} from './shared'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  getRecoveryHeatmap,
  getSleepRecoveryTrend,
  recoveryFactorsByTimeline,
  timelineOptions,
  trendsMetricsByTimeline,
  type TimelineOptionValue,
} from '../../data'

export function TrendsContent() {
  const [timeline, setTimeline] = useState<TimelineOptionValue>('7d')
  const selectedLabel =
    timelineOptions.find((option) => option.value === timeline)?.label ??
    'Last 7 days'
  const metrics = trendsMetricsByTimeline[timeline]
  const trendData = getSleepRecoveryTrend(timeline)
  const factors = recoveryFactorsByTimeline[timeline]
  const heatmap = getRecoveryHeatmap(timeline)

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-1 min-w-0">
          <h1 className="truncate text-xl font-medium tracking-tight md:text-2xl">
            Trends
          </h1>
          <p className="text-sm text-muted-foreground md:text-base">
            How your key metrics have moved over time
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className="h-10 shrink-0 gap-1.5 rounded-lg px-3.5 text-sm font-normal tracking-tight shadow-[0_2px_4px_rgba(0,0,0,0.05)]"
            >
              <CalendarIcon className="size-4" />
              <span>{selectedLabel}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bionis-dashboard min-w-40">
            <DropdownMenuRadioGroup
              value={timeline}
              onValueChange={(value) =>
                setTimeline(value as TimelineOptionValue)
              }
            >
              {timelineOptions.map((option) => (
                <DropdownMenuRadioItem
                  key={option.value}
                  value={option.value}
                  className="font-normal text-muted-foreground data-[state=checked]:font-medium data-[state=checked]:text-foreground"
                >
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <KeyMetricCard key={metric.id} metric={metric} />
        ))}
      </section>

      <section>
        <SleepRecoveryTrendChart key={`trend-${timeline}`} data={trendData} />
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <RecoveryFactorsCard key={`factors-${timeline}`} factors={factors} />
        <RecoveryHeatmapCard
          key={`heatmap-${timeline}`}
          data={heatmap.columns}
          dateLabels={heatmap.dateLabels}
        />
      </section>
    </div>
  )
}
