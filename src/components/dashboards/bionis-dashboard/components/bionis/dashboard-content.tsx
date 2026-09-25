import { useMemo, useState, type ComponentType, type SVGProps } from 'react'
import {
  AlertDiamondIcon,
  AlertTriangleIcon,
  BedIcon,
  BlingFilledIcon,
  CalendarIcon,
  CheckCircleRegularIcon,
  DropIcon,
  HeartbeatFilledIcon,
  HighKneesIcon,
  Sparkles3FilledIcon,
  VoiceIcon,
} from './icons'
import {
  ScoreDonut,
  SleepBreakdownChart,
  ActivityTrendChart,
  KeyMetricCard,
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
  bodyVitals,
  currentUser,
  getActivityTrend,
  getSleepBreakdown,
  healthPredictions,
  keyMetricsByTimeline,
  recommendedActions,
  timelineOptions,
  wellnessByTimeline,
  type BodyVitalTone,
  type HealthPredictionTone,
  type RecommendedAction,
  type TimelineOptionValue,
} from '../../data'
import { cn } from '@/lib/utils'

function useGreeting(fullName: string) {
  return useMemo(() => {
    const hour = new Date().getHours()
    const firstName = fullName.split(' ')[0] ?? fullName

    if (hour < 12) return `Good Morning ${firstName}`
    if (hour < 18) return `Good Afternoon ${firstName}`
    return `Good Evening ${firstName}`
  }, [fullName])
}


const predictionToneIcon: Record<
  HealthPredictionTone,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  warning: AlertTriangleIcon,
  success: CheckCircleRegularIcon,
  danger: AlertDiamondIcon,
}

const predictionToneClass: Record<HealthPredictionTone, string> = {
  warning: 'text-(--prediction-warn)',
  success: 'text-(--vital-good)',
  danger: 'text-(--prediction-danger)',
}

const vitalToneClass: Record<BodyVitalTone, string> = {
  good: 'text-(--vital-good)',
  neutral: 'text-foreground',
  warn: 'text-(--chart-warn)',
}

const actionIcons: Record<
  RecommendedAction['icon'],
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  bed: BedIcon,
  drop: DropIcon,
  highKnees: HighKneesIcon,
  voice: VoiceIcon,
}

function InsightBadge({ children }: { children: string }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-xl bg-background px-2.5 py-2 text-xs font-medium tracking-tight text-(--chart-period)">
      {children}
    </span>
  )
}

export function DashboardContent() {
  const greeting = useGreeting(currentUser.name)
  const [timeline, setTimeline] = useState<TimelineOptionValue>('7d')
  const selectedLabel =
    timelineOptions.find((option) => option.value === timeline)?.label ??
    'Last 7 days'
  const wellness = wellnessByTimeline[timeline]
  const keyMetrics = keyMetricsByTimeline[timeline]
  const sleepBreakdown = getSleepBreakdown(timeline)
  const activityTrend = getActivityTrend(timeline)

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-3">
        <h1 className="min-w-0 truncate text-xl font-medium md:text-2xl">
          {greeting}
        </h1>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className="h-10 shrink-0 gap-1 rounded-lg px-3.5 text-sm font-normal tracking-tight shadow-[0_2px_4px_rgba(0,0,0,0.05)]"
            >
              <CalendarIcon />
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

      <section className="flex items-center gap-6">
        <div className="flex min-h-28.5 flex-col justify-between gap-4">
          <h2 className="text-lg font-medium">Overall Wellness</h2>
          <div className="flex flex-col gap-2">
            <span className="inline-flex w-fit rounded-xl bg-(--live)/10 px-3 py-1 text-sm font-medium text-(--live)">
              {wellness.condition}
            </span>
            <p className="max-w-md text-sm leading-[1.4] text-muted-foreground">
              {wellness.summary.before}
              <span className="font-medium text-foreground">
                {wellness.summary.highlight}
              </span>
              {wellness.summary.after}
            </p>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <ScoreDonut value={wellness.score} />
        </div>
      </section>

      <section className="flex flex-col gap-3.5">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-medium">Key metrics</h2>
          <p className="text-sm text-muted-foreground">
            Today&apos;s snapshot vs your weekly average
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {keyMetrics.map((metric) => (
            <KeyMetricCard key={metric.id} metric={metric} />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <SleepBreakdownChart
          key={`sleep-${timeline}`}
          data={sleepBreakdown.points}
          flaggedNights={sleepBreakdown.flaggedNights}
        />
        <ActivityTrendChart
          key={`activity-${timeline}`}
          data={activityTrend}
          periodLabel={selectedLabel}
        />
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <article className="flex min-h-85.5 flex-col gap-6 rounded-2xl border bg-[linear-gradient(180deg,rgb(99_102_241/0.08)_0%,transparent_42%)] p-4">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
            <div className="flex items-center gap-2">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-(--insight-prediction) text-white">
                <Sparkles3FilledIcon className="size-4" />
              </span>
              <h3 className="font-medium">Health Prediction</h3>
            </div>
            <InsightBadge>7 days outlook</InsightBadge>
          </div>

          <div className="flex flex-1 flex-col gap-2">
            {healthPredictions.map((item) => {
              const Icon = predictionToneIcon[item.tone]
              return (
                <div
                  key={item.id}
                  className="flex flex-1 items-center gap-3 rounded-xl bg-muted px-3 py-2"
                >
                  <Icon
                    className={cn('size-5 shrink-0', predictionToneClass[item.tone])}
                  />
                  <div className="flex min-w-0 flex-col gap-1.5">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </article>

        <article className="flex min-h-85.5 flex-col gap-6 rounded-2xl border bg-[linear-gradient(180deg,rgb(247_46_46/0.08)_0%,transparent_42%)] p-4">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
            <div className="flex items-center gap-2">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-(--insight-vitals) text-white">
                <HeartbeatFilledIcon className="size-4" />
              </span>
              <h3 className="font-medium">Body Vitals</h3>
            </div>
            <InsightBadge>All Stable</InsightBadge>
          </div>

          <div className="flex flex-1 flex-col justify-between rounded-xl bg-background p-3">
            {bodyVitals.map((vital) => (
              <div
                key={vital.id}
                className="flex items-center justify-between gap-3 py-1.5"
              >
                <p className="text-muted-foreground">
                  {vital.label}
                </p>
                <p
                  className={cn(
                    'shrink-0 font-semibold',
                    vitalToneClass[vital.tone],
                  )}
                >
                  {vital.value}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="flex min-h-85.5 flex-col gap-6 rounded-2xl border bg-[linear-gradient(180deg,rgb(20_184_166/0.08)_0%,transparent_42%)] p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-(--insight-actions) text-white">
              <BlingFilledIcon className="size-4" />
            </span>
            <h3 className="font-medium">Recommended actions</h3>
          </div>

          <div className="flex flex-1 flex-col justify-between gap-2">
            {recommendedActions.map((action) => {
              const Icon = actionIcons[action.icon]
              return (
                <div
                  key={action.id}
                  className="flex items-start gap-3 rounded-xl bg-muted px-3 py-2"
                >
                  <Icon className="size-5 shrink-0 text-foreground" />
                  <div className="flex min-w-0 flex-col gap-1.5">
                    <p className="text-sm font-medium">{action.title}</p>
                    <p className="text-xs text-muted-foreground/80">
                      {action.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </article>
      </section>
    </div>
  )
}
