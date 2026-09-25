import type { ComponentType, SVGProps } from 'react'
import {
  ActivityIcon,
  BellIcon,
  CheckCircleIcon,
  FadersHorizontalIcon,
  GearIcon,
  HomeIcon,
  PredictionIcon,
  RecoveryIcon,
  ReportsIcon,
  SleepIcon,
  SpinnerGapIcon,
  StatusWarningIcon,
  TrendsIcon,
} from './components/bionis/icons'

export type NavIcon = ComponentType<SVGProps<SVGSVGElement>>

export type NavigationItem = {
  name: string
  href: string
  icon: NavIcon
  badge?: string
}

export type NavigationGroup = {
  label: string
  items: NavigationItem[]
}

export const navigationGroups: NavigationGroup[] = [
  {
    label: 'Overview',
    items: [
      { name: 'Dashboard', href: '/', icon: HomeIcon },
      { name: 'Sleep', href: '/sleep', icon: SleepIcon },
      {
        name: 'Activity',
        href: '/activity',
        icon: ActivityIcon,
        badge: '3,154',
      },
      {
        name: 'Recovery',
        href: '/recovery',
        icon: RecoveryIcon,
      },
    ],
  },
  {
    label: 'Insights',
    items: [
      { name: 'Trends', href: '/trends', icon: TrendsIcon },
      { name: 'Prediction', href: '/prediction', icon: PredictionIcon },
      { name: 'Reports', href: '/reports', icon: ReportsIcon },
    ],
  },
  {
    label: 'System',
    items: [
      { name: 'Notifications', href: '/notifications', icon: BellIcon },
      { name: 'Settings', href: '/settings', icon: GearIcon },
    ],
  },
]

const currentUserName = 'Vansh Patel'

export const currentUser = {
  name: currentUserName,
  email: 'vansh@bionis.com',
  initials: 'VP',
  age: 34,
  planStatus: 'Active plan' as const,
  avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(currentUserName)}`,
}

export const timelineOptions = [
  { value: '7d', label: 'Last 7 days' },
  { value: '14d', label: 'Last 14 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
] as const

export type TimelineOptionValue = (typeof timelineOptions)[number]['value']

export const wellnessByTimeline = {
  '7d': {
    condition: 'Great Condition',
    score: 78,
    summary: {
      before: 'Recovery is strong today. Sleep debt detected, ',
      highlight: '2',
      after: ' nights below target this week.',
    },
  },
  '14d': {
    condition: 'Good Condition',
    score: 72,
    summary: {
      before: 'Solid two-week trend. Sleep dipped on ',
      highlight: '3',
      after: ' nights versus your target.',
    },
  },
  '30d': {
    condition: 'Fair Condition',
    score: 64,
    summary: {
      before: 'Mixed month overall. Recovery lagged after ',
      highlight: '5',
      after: ' low-sleep nights.',
    },
  },
  '90d': {
    condition: 'Steady Progress',
    score: 69,
    summary: {
      before: 'Quarterly trend is improving. Watch the ',
      highlight: '8',
      after: ' nights that fell short of target.',
    },
  },
} as const

export const profileHealthSummary = {
  condition: wellnessByTimeline['7d'].condition,
  wellnessScore: wellnessByTimeline['7d'].score,
  summary: wellnessByTimeline['7d'].summary,
  vitals: [
    { label: 'SpO₂', value: '98%', tone: 'good' as const },
    { label: 'HRV', value: '62 ms', tone: 'good' as const },
    { label: 'Hydration', value: 'Low', tone: 'warn' as const },
  ],
}

export type KeyMetricIcon =
  | 'heart'
  | 'walk'
  | 'moon'
  | 'battery'
  | 'heartbeat'
  | 'nurse'

export type KeyMetric = {
  id: string
  label: string
  value: string
  unit: string
  icon: KeyMetricIcon
  trend: {
    direction: 'up' | 'down'
    emphasis: string
    label: string
  }
}

export const keyMetricsByTimeline: Record<TimelineOptionValue, KeyMetric[]> = {
  '7d': [
    {
      id: 'rhr',
      label: 'Resting heart rate',
      value: '58',
      unit: 'bpm',
      icon: 'heart',

      trend: {
        direction: 'up',
        emphasis: '2 bpm',
        label: 'better than last week',
      },
    },
    {
      id: 'steps',
      label: 'Steps today',
      value: '8,241',
      unit: 'steps',
      icon: 'walk',

      trend: {
        direction: 'up',
        emphasis: '82%',
        label: 'of 10,000 goal',
      },
    },
    {
      id: 'sleep',
      label: 'Sleep last night',
      value: '6.2',
      unit: 'hrs',
      icon: 'moon',

      trend: {
        direction: 'down',
        emphasis: '78%',
        label: 'of 8h goal',
      },
    },
    {
      id: 'recovery',
      label: 'Recovery score',
      value: '84',
      unit: '/100',
      icon: 'battery',

      trend: {
        direction: 'down',
        emphasis: 'High -',
        label: 'good to train today',
      },
    },
  ],
  '14d': [
    {
      id: 'rhr',
      label: 'Resting heart rate',
      value: '60',
      unit: 'bpm',
      icon: 'heart',

      trend: {
        direction: 'up',
        emphasis: '1 bpm',
        label: 'better than prior 2 weeks',
      },
    },
    {
      id: 'steps',
      label: 'Steps today',
      value: '7,640',
      unit: 'steps',
      icon: 'walk',

      trend: {
        direction: 'up',
        emphasis: '76%',
        label: 'of 10,000 goal',
      },
    },
    {
      id: 'sleep',
      label: 'Sleep last night',
      value: '6.5',
      unit: 'hrs',
      icon: 'moon',

      trend: {
        direction: 'down',
        emphasis: '81%',
        label: 'of 8h goal',
      },
    },
    {
      id: 'recovery',
      label: 'Recovery score',
      value: '79',
      unit: '/100',
      icon: 'battery',

      trend: {
        direction: 'up',
        emphasis: 'Steady -',
        label: 'ok to train lightly',
      },
    },
  ],
  '30d': [
    {
      id: 'rhr',
      label: 'Resting heart rate',
      value: '62',
      unit: 'bpm',
      icon: 'heart',

      trend: {
        direction: 'down',
        emphasis: '3 bpm',
        label: 'higher than last month',
      },
    },
    {
      id: 'steps',
      label: 'Steps today',
      value: '6,980',
      unit: 'steps',
      icon: 'walk',

      trend: {
        direction: 'down',
        emphasis: '70%',
        label: 'of 10,000 goal',
      },
    },
    {
      id: 'sleep',
      label: 'Sleep last night',
      value: '5.9',
      unit: 'hrs',
      icon: 'moon',

      trend: {
        direction: 'down',
        emphasis: '74%',
        label: 'of 8h goal',
      },
    },
    {
      id: 'recovery',
      label: 'Recovery score',
      value: '71',
      unit: '/100',
      icon: 'battery',

      trend: {
        direction: 'down',
        emphasis: 'Moderate -',
        label: 'prioritize recovery',
      },
    },
  ],
  '90d': [
    {
      id: 'rhr',
      label: 'Resting heart rate',
      value: '59',
      unit: 'bpm',
      icon: 'heart',

      trend: {
        direction: 'up',
        emphasis: '4 bpm',
        label: 'better than last quarter',
      },
    },
    {
      id: 'steps',
      label: 'Steps today',
      value: '8,050',
      unit: 'steps',
      icon: 'walk',

      trend: {
        direction: 'up',
        emphasis: '81%',
        label: 'of 10,000 goal',
      },
    },
    {
      id: 'sleep',
      label: 'Sleep last night',
      value: '6.8',
      unit: 'hrs',
      icon: 'moon',

      trend: {
        direction: 'up',
        emphasis: '85%',
        label: 'of 8h goal',
      },
    },
    {
      id: 'recovery',
      label: 'Recovery score',
      value: '76',
      unit: '/100',
      icon: 'battery',

      trend: {
        direction: 'up',
        emphasis: 'Improving -',
        label: 'good training window',
      },
    },
  ],
}

export type SleepBreakdownPoint = {
  label: string
  labelLines: string[]
  hours: number
}

export type ActivityTrendPoint = {
  dateKey: string
  label: string
  fullDate?: string
  showTick: boolean
  steps: number
  recovery: number
}

const timelineDayCount: Record<TimelineOptionValue, number> = {
  '7d': 7,
  '14d': 14,
  '30d': 30,
  '90d': 90,
}

const sleepDaysPerBucket: Record<TimelineOptionValue, number> = {
  '7d': 1,
  '14d': 2,
  '30d': 5,
  '90d': 15,
}

const timelineSeed: Record<TimelineOptionValue, number> = {
  '7d': 701,
  '14d': 1402,
  '30d': 3005,
  '90d': 9015,
}

const MONTH_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const

const WEEKDAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const

function createRng(seed: number) {
  let state = seed >>> 0
  return () => {
    state = (Math.imul(state ^ (state >>> 15), state | 1) +
      Math.imul(state ^ (state >>> 7), state | 61)) >>>
      0
    return (state ^ (state >>> 14)) / 4294967296
  }
}

function round1(value: number) {
  return Math.round(value * 10) / 10
}

function startOfLocalDay(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function getDateRangeEndingToday(days: number): Date[] {
  const end = startOfLocalDay()
  return Array.from({ length: days }, (_, index) => {
    const date = new Date(end)
    date.setDate(end.getDate() - (days - 1 - index))
    return date
  })
}

function getHourlyDatesEndingToday(days: number): Date[] {
  const end = startOfLocalDay()
  end.setHours(23, 0, 0, 0)
  const totalHours = days * 24
  return Array.from({ length: totalHours }, (_, index) => {
    const date = new Date(end)
    date.setHours(end.getHours() - (totalHours - 1 - index))
    return date
  })
}

function formatTime12h(date: Date) {
  const hours = date.getHours()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const h12 = hours % 12 || 12
  return `${h12}:00 ${ampm}`
}

function generateSmoothSeries({
  count,
  baseVal,
  amplitude,
  seed,
  minVal,
  maxVal,
}: {
  count: number
  baseVal: number
  amplitude: number
  seed: number
  minVal: number
  maxVal: number
}): number[] {
  const raw: number[] = []
  const w1 = (2 * Math.PI) / (count * 0.85)
  const w2 = (2 * Math.PI) / (count * 0.38)
  const w3 = (2 * Math.PI) / (count * 0.19)

  const p1 = (seed % 37) * 0.2
  const p2 = ((seed * 13) % 41) * 0.2
  const p3 = ((seed * 29) % 43) * 0.2

  for (let i = 0; i < count; i++) {
    const v =
      baseVal +
      amplitude * 0.55 * Math.sin(w1 * i + p1) +
      amplitude * 0.32 * Math.sin(w2 * i + p2) +
      amplitude * 0.13 * Math.cos(w3 * i + p3)
    raw.push(v)
  }

  let smoothed = [...raw]
  for (let pass = 0; pass < 3; pass++) {
    const nextPass: number[] = []
    for (let i = 0; i < count; i++) {
      const prev = smoothed[Math.max(0, i - 1)]!
      const curr = smoothed[i]!
      const next = smoothed[Math.min(count - 1, i + 1)]!
      const avg = prev * 0.25 + curr * 0.5 + next * 0.25
      nextPass.push(avg)
    }
    smoothed = nextPass
  }

  return smoothed.map((v) => Math.min(maxVal, Math.max(minVal, v)))
}

function formatDayMonth(date: Date) {
  return `${date.getDate()} ${MONTH_SHORT[date.getMonth()]}`
}

function toDateKey(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

function monthKey(date: Date) {
  return date.getFullYear() * 12 + date.getMonth()
}

function formatSleepBucketLabel(start: Date, end: Date): {
  label: string
  labelLines: string[]
} {
  const startMonth = MONTH_SHORT[start.getMonth()]
  const endMonth = MONTH_SHORT[end.getMonth()]
  const crossesMonth = monthKey(start) !== monthKey(end)

  if (crossesMonth) {
    return {
      label: `${start.getDate()} ${startMonth} – ${end.getDate()} ${endMonth}`,
      labelLines: [
        `${start.getDate()} ${startMonth} –`,
        `${end.getDate()} ${endMonth}`,
      ],
    }
  }

  return {
    label: `${start.getDate()} – ${end.getDate()} ${endMonth}`,
    labelLines: [`${start.getDate()} – ${end.getDate()}`, endMonth],
  }
}

function pickEvenTickIndices(count: number, maxTicks: number): Set<number> {
  if (count <= maxTicks) {
    return new Set(Array.from({ length: count }, (_, index) => index))
  }

  const indices = new Set<number>([0, count - 1])
  const gaps = maxTicks - 1
  for (let step = 1; step < gaps; step += 1) {
    indices.add(Math.round((step * (count - 1)) / gaps))
  }
  return indices
}

function activityTickBudget(days: number) {
  if (days <= 7) return days
  if (days <= 14) return 5
  if (days <= 30) return 6
  return 7
}

const curatedSleep7d = [8, 5.2, 7.1, 6.1, 9.1, 5.7, 2.6] as const

export function getSleepBreakdown(timeline: TimelineOptionValue): {
  flaggedNights: number
  points: SleepBreakdownPoint[]
} {
  const days = timelineDayCount[timeline]
  const daysPerBucket = sleepDaysPerBucket[timeline]
  const dates = getDateRangeEndingToday(days)
  const rand = createRng(timelineSeed[timeline])
  const sleepBase =
    timeline === '7d' ? 6.5 : timeline === '14d' ? 6.2 : timeline === '30d' ? 5.8 : 6.6

  const daily = dates.map((date, index) => {
    const hours =
      timeline === '7d'
        ? curatedSleep7d[index]!
        : round1(
            Math.min(9.8, Math.max(2.4, sleepBase + (rand() - 0.45) * 4.8)),
          )
    return { date, hours }
  })

  if (timeline === '7d') {
    return {
      flaggedNights: daily.filter((point) => point.hours < 6).length,
      points: daily.map((point) => {
        const label = WEEKDAY_SHORT[point.date.getDay()]!.toUpperCase()
        return {
          label,
          labelLines: [label],
          hours: point.hours,
        }
      }),
    }
  }

  const points: SleepBreakdownPoint[] = []

  for (let offset = 0; offset < daily.length; offset += daysPerBucket) {
    const bucket = daily.slice(offset, offset + daysPerBucket)
    const start = bucket[0]!.date
    const end = bucket[bucket.length - 1]!.date
    const hours = round1(
      bucket.reduce((sum, point) => sum + point.hours, 0) / bucket.length,
    )
    const { label, labelLines } = formatSleepBucketLabel(start, end)

    points.push({
      label,
      labelLines,
      hours,
    })
  }

  return {
    flaggedNights: daily.filter((point) => point.hours < 6).length,
    points,
  }
}

export function getActivityTrend(
  timeline: TimelineOptionValue,
): ActivityTrendPoint[] {
  const days = timelineDayCount[timeline]
  const isHourly = timeline === '7d' || timeline === '14d'
  const dates = isHourly ? getHourlyDatesEndingToday(days) : getDateRangeEndingToday(days)
  const count = dates.length

  const stepsSeries = generateSmoothSeries({
    count,
    baseVal: timeline === '7d' ? 52 : timeline === '14d' ? 48 : timeline === '30d' ? 44 : 55,
    amplitude: 36,
    seed: timelineSeed[timeline] + 99,
    minVal: 18,
    maxVal: 92,
  })

  const recoverySeries = generateSmoothSeries({
    count,
    baseVal: timeline === '7d' ? 32 : timeline === '14d' ? 30 : timeline === '30d' ? 27 : 30,
    amplitude: 18,
    seed: timelineSeed[timeline] + 199,
    minVal: 16,
    maxVal: 48,
  })

  const dayTickIndices = pickEvenTickIndices(days, activityTickBudget(days))
  const tickGap = isHourly ? (timeline === '7d' ? 24 : 48) : 1

  return dates.map((date, index) => {
    const label = formatDayMonth(date)
    const dayOfWeek = WEEKDAY_SHORT[date.getDay()]
    const isDayStart = isHourly ? index % tickGap === 0 : dayTickIndices.has(index)

    const dateKey = isHourly
      ? `${toDateKey(date)}-${String(date.getHours()).padStart(2, '0')}`
      : toDateKey(date)

    const fullDate = isHourly
      ? `${dayOfWeek}, ${MONTH_SHORT[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} • ${formatTime12h(date)}`
      : `${dayOfWeek}, ${MONTH_SHORT[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`

    return {
      dateKey,
      label,
      fullDate,
      showTick: isDayStart,
      steps: stepsSeries[index]!,
      recovery: recoverySeries[index]!,
    }
  })
}

export type HealthPredictionTone = 'warning' | 'success' | 'danger'

export type HealthPrediction = {
  id: string
  title: string
  description: string
  tone: HealthPredictionTone
}

export type BodyVitalTone = 'good' | 'neutral' | 'warn'

export type BodyVital = {
  id: string
  label: string
  value: string
  tone: BodyVitalTone
}

export type RecommendedAction = {
  id: string
  title: string
  description: string
  icon: 'bed' | 'drop' | 'highKnees' | 'voice'
}

export const healthPredictions: HealthPrediction[] = [
  {
    id: 'sleep-debt',
    title: 'Sleep debt risk',
    description:
      'Accumulated 1.8 hrs deficit. Fatigue likely by Wed if trend continues.',
    tone: 'warning',
  },
  {
    id: 'cardio-trend',
    title: 'Cardiovascular trend',
    description:
      'HRV improving. Aerobic fitness on track for your April goal.',
    tone: 'success',
  },
  {
    id: 'stress-signal',
    title: 'Stress signal detected',
    description:
      'HRV dipped Thu–Fri, correlating with low sleep. Monitor closely.',
    tone: 'danger',
  },
]

export const bodyVitals: BodyVital[] = [
  { id: 'spo2', label: 'Blood oxygen (SpO2)', value: '98%', tone: 'good' },
  {
    id: 'skin-temp',
    label: 'Skin temperature',
    value: '36.7°C',
    tone: 'neutral',
  },
  {
    id: 'respiratory',
    label: 'Respiratory rate',
    value: '14 br/min',
    tone: 'neutral',
  },
  {
    id: 'hydration',
    label: 'Hydration index',
    value: 'Low',
    tone: 'warn',
  },
  {
    id: 'hrv',
    label: 'HRV (overnight)',
    value: '62 ms',
    tone: 'good',
  },
]

export const recommendedActions: RecommendedAction[] = [
  {
    id: 'sleep',
    title: 'Prioritize sleep tonight',
    description: 'Aim for 8+ hrs to clear sleep debt',
    icon: 'bed',
  },
  {
    id: 'water',
    title: 'Log water intake',
    description: 'Hydration flagged as low today',
    icon: 'drop',
  },
  {
    id: 'training',
    title: 'High-intensity session',
    description: 'Recovery score supports training today',
    icon: 'highKnees',
  },
  {
    id: 'breathing',
    title: 'HRV stress alert',
    description: 'Add a breathing session this evening',
    icon: 'voice',
  },
]

export type NotificationTone = 'warning' | 'success' | 'info' | 'danger'

export type NotificationIcon =
  | 'moon'
  | 'check'
  | 'heart'
  | 'alert'
  | 'activity'
  | 'battery'

export type AppNotification = {
  id: string
  title: string
  description: string
  time: string
  tone: NotificationTone
  icon: NotificationIcon
  unread?: boolean
}

export const notifications: AppNotification[] = [
  {
    id: 'sleep-debt',
    title: 'Sleep debt building',
    description: 'You are 1.8 hrs below target this week.',
    time: '2 min ago',
    tone: 'warning',
    icon: 'moon',
    unread: true,
  },
  {
    id: 'recovery-ready',
    title: 'Recovery looks strong',
    description: 'Score hit 84 — good window for training today.',
    time: '28 min ago',
    tone: 'success',
    icon: 'battery',
    unread: true,
  },
  {
    id: 'hrv-dip',
    title: 'HRV dipped overnight',
    description: 'Overnight HRV fell to 48 ms vs your 62 ms avg.',
    time: '1 hour ago',
    tone: 'danger',
    icon: 'heart',
    unread: true,
  },
  {
    id: 'steps-goal',
    title: 'Steps goal nearly met',
    description: '8,241 steps — 82% of your 10,000 goal.',
    time: 'Yesterday',
    tone: 'info',
    icon: 'activity',
  },
]

export type SourceKind = 'oracle' | 'sharepoint' | 'concur' | 'email'

export type BatchStatus = 'processing' | 'completed' | 'exception'

export const metrics = [
  {
    id: 'total-processed',
    label: 'Total processed',
    value: '147,392',
    icon: 'clock' as const,
    trend: { value: '+2.4%', label: 'vs last run', tone: 'up' as const },
  },
  {
    id: 'matched',
    label: 'Matched',
    value: '12,847',
    icon: 'seal' as const,
    trend: { value: '+97.86%', label: 'match rate' },
  },
  {
    id: 'exceptions',
    label: 'Exceptions',
    value: '12,847',
    icon: 'warning' as const,
    trend: { value: '2.14%', label: 'exception rate' },
  },
  {
    id: 'processing',
    label: 'Processing',
    value: '12,847',
    icon: 'arrows' as const,
    trend: { value: 'Live', label: 'in queue', tone: 'live' as const },
  },
] as const

export const batchTransactions = [
  {
    id: '1',
    status: 'processing' as BatchStatus,
    transactionId: 'TXN-84921',
    po: 'PO-6952',
    vendor: 'Accenture LTD',
    amount: '$42,200.00',
    sources: ['oracle', 'sharepoint'] as SourceKind[],
    confidence: 72,
  },
  {
    id: '2',
    status: 'processing' as BatchStatus,
    transactionId: 'TXN-84921',
    po: 'PO-6952',
    vendor: 'Accenture LTD',
    amount: '$42,200.00',
    sources: ['oracle', 'concur'] as SourceKind[],
    confidence: 58,
  },
  {
    id: '3',
    status: 'completed' as BatchStatus,
    transactionId: 'TXN-84921',
    po: 'PO-6952',
    vendor: 'Accenture LTD',
    amount: '$42,200.00',
    sources: ['oracle', 'concur', 'email'] as SourceKind[],
    confidence: 99,
  },
  {
    id: '4',
    status: 'processing' as BatchStatus,
    transactionId: 'TXN-84921',
    po: 'PO-6952',
    vendor: 'Accenture LTD',
    amount: '$42,200.00',
    sources: ['oracle', 'concur'] as SourceKind[],
    confidence: 58,
  },
  {
    id: '5',
    status: 'processing' as BatchStatus,
    transactionId: 'TXN-84921',
    po: 'PO-6952',
    vendor: 'Accenture LTD',
    amount: '$42,200.00',
    sources: ['oracle', 'concur'] as SourceKind[],
    confidence: 58,
  },
  {
    id: '6',
    status: 'exception' as BatchStatus,
    transactionId: 'TXN-84921',
    po: 'PO-6952',
    vendor: 'Accenture LTD',
    amount: '$42,200.00',
    sources: ['oracle', 'email', 'concur'] as SourceKind[],
    confidence: 34,
    confidenceNote: 'Amount Variance',
  },
  {
    id: '7',
    status: 'completed' as BatchStatus,
    transactionId: 'TXN-84921',
    po: 'PO-6952',
    vendor: 'Accenture LTD',
    amount: '$42,200.00',
    sources: ['oracle', 'concur'] as SourceKind[],
    confidence: 97,
  },
] as const

export const sourceLabels: Record<SourceKind, string> = {
  oracle: 'Oracle ERP',
  sharepoint: 'Sharepoint',
  concur: 'Concur',
  email: 'Email',
}

export const batchStatusFilters = [
  { value: 'all', label: 'All statuses', icon: FadersHorizontalIcon },
  { value: 'processing', label: 'Processing', icon: SpinnerGapIcon },
  { value: 'completed', label: 'Completed', icon: CheckCircleIcon },
  { value: 'exception', label: 'Exception', icon: StatusWarningIcon },
] as const

export type BatchTransaction = (typeof batchTransactions)[number]

export type MatchLineStatus = 'matched' | 'mismatched' | 'partial'

export type TransactionDetails = {
  customer: string
  batchId: string
  date: string
  flagged: boolean
  purchaseOrder: {
    status: MatchLineStatus
    amount: string
    reference: string
    source: string
  }
  invoice: {
    status: MatchLineStatus
    amount: string
    reference: string
    deltaVsPo: string
  }
  goodsReceipt: {
    status: MatchLineStatus
    amount: string
    reference: string
    fulfillment: string
  }
  timeline: { title: string; parts: string[] }[]
}

export function getTransactionDetails(
  row: BatchTransaction,
): TransactionDetails {
  const isException = row.status === 'exception'
  const isComplete = row.status === 'completed'

  return {
    customer: 'Consulting Corp',
    batchId: 'BAT-2026-0407',
    date: 'Apr 7, 2026',
    flagged: isException,
    purchaseOrder: {
      status: 'matched',
      amount: isException ? '$417,301.00' : row.amount,
      reference: row.po.startsWith('PO')
        ? `PO-2026-${row.po.replace(/\D/g, '')}`
        : row.po,
      source: sourceLabels[row.sources[0] ?? 'oracle'],
    },
    invoice: {
      status: isException ? 'mismatched' : isComplete ? 'matched' : 'partial',
      amount: row.amount,
      reference: `INV-CC-${row.id.padStart(4, '0')}`,
      deltaVsPo: isException ? '+$12,450' : isComplete ? '$0.00' : '+$420.00',
    },
    goodsReceipt: {
      status: isException ? 'partial' : isComplete ? 'matched' : 'partial',
      amount: isException ? '$394,100.00' : row.amount,
      reference: `GR-0407-${row.id.padStart(3, '0')}`,
      fulfillment: isException ? '91.7%' : isComplete ? '100%' : '86.4%',
    },
    timeline: [
      ...(isException
        ? [
            {
              title: 'Flagged as exception',
              parts: [
                'Audit AI',
                'Audit AI',
                `Confidence dropped to ${row.confidence}%`,
              ],
            },
          ]
        : []),
      {
        title: 'Viewed by J. Hartwell',
        parts: ['Manual review', 'Today 11:38 AM'],
      },
      {
        title: 'Three-way match processed',
        parts: ['Manual review', 'Today 11:38 AM'],
      },
      {
        title: isException ? 'Flagged as exception' : 'Match checks completed',
        parts: ['Automated', 'Today 11:34 AM', 'PO, Invoice, GR ingested'],
      },
      {
        title: 'Transaction Submitted',
        parts: ['Oracle ERP sync', 'Today 11:30 AM', 'BAT-2026-0407'],
      },
    ],
  }
}

export type BatchStatusFilter = (typeof batchStatusFilters)[number]['value']

export const auditControls = {
  defaultLive: true,
} as const

export function filterBatchTransactions(
  transactions: typeof batchTransactions,
  statusFilter: BatchStatusFilter,
) {
  if (statusFilter === 'all') return [...transactions]
  return transactions.filter((row) => row.status === statusFilter)
}

export function buildBatchExportCsv(
  transactions: ReturnType<typeof filterBatchTransactions>,
) {
  const header = [
    'Status',
    'Transaction ID',
    'PO',
    'Vendor',
    'Amount',
    'Sources',
    'Confidence',
    'Note',
  ]

  const rows = transactions.map((row) => [
    row.status,
    row.transactionId,
    row.po,
    row.vendor,
    row.amount,
    row.sources.map((source) => sourceLabels[source]).join(' | '),
    `${row.confidence}%`,
    'confidenceNote' in row && row.confidenceNote ? row.confidenceNote : '',
  ])

  return [header, ...rows]
    .map((cells) =>
      cells.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(','),
    )
    .join('\n')
}

export type TrendsMetricIcon = KeyMetricIcon
export type TrendsMetric = KeyMetric

export const trendsMetricsByTimeline: Record<TimelineOptionValue, TrendsMetric[]> = {
  '7d': [
    {
      id: 'avg-sleep',
      label: 'Avg. Sleep',
      value: '7.1',
      unit: 'hrs',
      icon: 'moon',

      trend: {
        direction: 'up',
        emphasis: '0.4hrs',
        label: 'vs prior period',
      },
    },
    {
      id: 'avg-steps',
      label: 'Avg daily steps',
      value: '8,540',
      unit: '',
      icon: 'walk',

      trend: {
        direction: 'up',
        emphasis: '+320',
        label: 'vs prior period',
      },
    },
    {
      id: 'avg-hrv',
      label: 'Avg HRV',
      value: '54',
      unit: 'ms',
      icon: 'heartbeat',

      trend: {
        direction: 'down',
        emphasis: '-3ms',
        label: 'vs prior period',
      },
    },
    {
      id: 'wellness-score',
      label: 'Wellness score',
      value: '76',
      unit: '/100',
      icon: 'nurse',

      trend: {
        direction: 'up',
        emphasis: '+4pts',
        label: 'vs prior period',
      },
    },
  ],
  '14d': [
    {
      id: 'avg-sleep',
      label: 'Avg. Sleep',
      value: '6.9',
      unit: 'hrs',
      icon: 'moon',

      trend: {
        direction: 'up',
        emphasis: '0.2hrs',
        label: 'vs prior period',
      },
    },
    {
      id: 'avg-steps',
      label: 'Avg daily steps',
      value: '8,210',
      unit: '',
      icon: 'walk',

      trend: {
        direction: 'up',
        emphasis: '+180',
        label: 'vs prior period',
      },
    },
    {
      id: 'avg-hrv',
      label: 'Avg HRV',
      value: '52',
      unit: 'ms',
      icon: 'heartbeat',

      trend: {
        direction: 'down',
        emphasis: '-1ms',
        label: 'vs prior period',
      },
    },
    {
      id: 'wellness-score',
      label: 'Wellness score',
      value: '74',
      unit: '/100',
      icon: 'nurse',

      trend: {
        direction: 'up',
        emphasis: '+2pts',
        label: 'vs prior period',
      },
    },
  ],
  '30d': [
    {
      id: 'avg-sleep',
      label: 'Avg. Sleep',
      value: '6.8',
      unit: 'hrs',
      icon: 'moon',

      trend: {
        direction: 'down',
        emphasis: '0.1hrs',
        label: 'vs prior period',
      },
    },
    {
      id: 'avg-steps',
      label: 'Avg daily steps',
      value: '7,950',
      unit: '',
      icon: 'walk',

      trend: {
        direction: 'up',
        emphasis: '+410',
        label: 'vs prior period',
      },
    },
    {
      id: 'avg-hrv',
      label: 'Avg HRV',
      value: '50',
      unit: 'ms',
      icon: 'heartbeat',

      trend: {
        direction: 'down',
        emphasis: '-4ms',
        label: 'vs prior period',
      },
    },
    {
      id: 'wellness-score',
      label: 'Wellness score',
      value: '71',
      unit: '/100',
      icon: 'nurse',

      trend: {
        direction: 'up',
        emphasis: '+1pt',
        label: 'vs prior period',
      },
    },
  ],
  '90d': [
    {
      id: 'avg-sleep',
      label: 'Avg. Sleep',
      value: '7.2',
      unit: 'hrs',
      icon: 'moon',

      trend: {
        direction: 'up',
        emphasis: '0.5hrs',
        label: 'vs prior period',
      },
    },
    {
      id: 'avg-steps',
      label: 'Avg daily steps',
      value: '8,620',
      unit: '',
      icon: 'walk',

      trend: {
        direction: 'up',
        emphasis: '+530',
        label: 'vs prior period',
      },
    },
    {
      id: 'avg-hrv',
      label: 'Avg HRV',
      value: '56',
      unit: 'ms',
      icon: 'heartbeat',

      trend: {
        direction: 'up',
        emphasis: '+2ms',
        label: 'vs prior period',
      },
    },
    {
      id: 'wellness-score',
      label: 'Wellness score',
      value: '78',
      unit: '/100',
      icon: 'nurse',

      trend: {
        direction: 'up',
        emphasis: '+5pts',
        label: 'vs prior period',
      },
    },
  ],
}

export type SleepRecoveryTrendPoint = {
  dateKey: string
  formattedDate: string
  fullDate: string
  showTick: boolean
  sleepHrs: number
  recoveryScore: number
  sleepPlot: number
  recoveryPlot: number
}

export function getSleepRecoveryTrend(
  timeline: TimelineOptionValue,
): SleepRecoveryTrendPoint[] {
  const days = timelineDayCount[timeline]
  const isHourly = timeline === '7d' || timeline === '14d'
  const dates = isHourly ? getHourlyDatesEndingToday(days) : getDateRangeEndingToday(days)
  const count = dates.length

  const sleepSeries = generateSmoothSeries({
    count,
    baseVal: timeline === '7d' ? 48 : timeline === '14d' ? 46 : timeline === '30d' ? 45 : 50,
    amplitude: 32,
    seed: timelineSeed[timeline] + 301,
    minVal: 15,
    maxVal: 85,
  })

  const recoverySeries = generateSmoothSeries({
    count,
    baseVal: timeline === '7d' ? 54 : timeline === '14d' ? 52 : timeline === '30d' ? 52 : 56,
    amplitude: 32,
    seed: timelineSeed[timeline] + 401,
    minVal: 20,
    maxVal: 90,
  })

  const dayTickIndices = pickEvenTickIndices(days, activityTickBudget(days))
  const tickGap = isHourly ? (timeline === '7d' ? 24 : 48) : 1

  return dates.map((date, index) => {
    const formattedDate = formatDayMonth(date)
    const dayOfWeek = WEEKDAY_SHORT[date.getDay()]
    const isDayStart = isHourly ? index % tickGap === 0 : dayTickIndices.has(index)

    const dateKey = isHourly
      ? `${toDateKey(date)}-${String(date.getHours()).padStart(2, '0')}`
      : toDateKey(date)

    const fullDate = isHourly
      ? `${dayOfWeek}, ${MONTH_SHORT[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} • ${formatTime12h(date)}`
      : `${dayOfWeek}, ${MONTH_SHORT[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`

    const sleepPlot = sleepSeries[index]!
    const recoveryPlot = recoverySeries[index]!

    return {
      dateKey,
      formattedDate,
      fullDate,
      showTick: isDayStart,
      sleepHrs: round1(sleepPlot / 10),
      recoveryScore: round1(recoveryPlot / 10),
      sleepPlot,
      recoveryPlot,
    }
  })
}

export type RecoveryFactor = {
  id: string
  label: string
  value: string
  fillPercentage: number
  icon: 'moon' | 'walk' | 'warning' | 'alert' | 'bed'
}

export const recoveryFactorsByTimeline: Record<TimelineOptionValue, RecoveryFactor[]> = {
  '7d': [
    { id: 'sleep', label: 'Sleep duration', value: '0.88', fillPercentage: 88, icon: 'moon' },
    { id: 'steps', label: 'Daily steps', value: '+0.62', fillPercentage: 62, icon: 'walk' },
    { id: 'stress', label: 'Stress events', value: '-0.54', fillPercentage: 54, icon: 'warning' },
    { id: 'screen', label: 'Late screen time', value: '-0.41', fillPercentage: 41, icon: 'alert' },
    { id: 'bedtime', label: 'Consistent bedtime', value: '+0.74', fillPercentage: 74, icon: 'bed' },
  ],
  '14d': [
    { id: 'sleep', label: 'Sleep duration', value: '0.81', fillPercentage: 81, icon: 'moon' },
    { id: 'steps', label: 'Daily steps', value: '+0.70', fillPercentage: 70, icon: 'walk' },
    { id: 'stress', label: 'Stress events', value: '-0.48', fillPercentage: 48, icon: 'warning' },
    { id: 'screen', label: 'Late screen time', value: '-0.35', fillPercentage: 35, icon: 'alert' },
    { id: 'bedtime', label: 'Consistent bedtime', value: '+0.80', fillPercentage: 80, icon: 'bed' },
  ],
  '30d': [
    { id: 'sleep', label: 'Sleep duration', value: '0.76', fillPercentage: 76, icon: 'moon' },
    { id: 'steps', label: 'Daily steps', value: '+0.58', fillPercentage: 58, icon: 'walk' },
    { id: 'stress', label: 'Stress events', value: '-0.62', fillPercentage: 62, icon: 'warning' },
    { id: 'screen', label: 'Late screen time', value: '-0.50', fillPercentage: 50, icon: 'alert' },
    { id: 'bedtime', label: 'Consistent bedtime', value: '+0.68', fillPercentage: 68, icon: 'bed' },
  ],
  '90d': [
    { id: 'sleep', label: 'Sleep duration', value: '0.85', fillPercentage: 85, icon: 'moon' },
    { id: 'steps', label: 'Daily steps', value: '+0.75', fillPercentage: 75, icon: 'walk' },
    { id: 'stress', label: 'Stress events', value: '-0.38', fillPercentage: 38, icon: 'warning' },
    { id: 'screen', label: 'Late screen time', value: '-0.29', fillPercentage: 29, icon: 'alert' },
    { id: 'bedtime', label: 'Consistent bedtime', value: '+0.84', fillPercentage: 84, icon: 'bed' },
  ],
}

export const recoveryFactors = recoveryFactorsByTimeline['7d']

export type HeatmapTile = 'low' | 'med' | 'high'

export type HeatmapTileData = {
  id: string
  level: HeatmapTile
  score: number
  date: string
  status: string
}

export type HeatmapColumn = {
  id: string
  tiles: HeatmapTileData[]
}

export type HeatmapData = {
  columns: HeatmapColumn[]
  dateLabels: string[]
}

const heatmapLevelsByTimeline: Record<TimelineOptionValue, HeatmapTile[][]> = {
  '7d': [
    ['low', 'med', 'high', 'high', 'high'],
    ['med', 'med', 'high', 'high', 'high'],
    ['low', 'med', 'med', 'high', 'high'],
    ['high', 'high', 'high', 'high', 'high'],
    ['med', 'med', 'high', 'high', 'high'],
    ['high', 'high', 'high', 'high', 'high'],
    ['med', 'high', 'high', 'high', 'high'],
  ],
  '14d': [
    ['low', 'low', 'med', 'med', 'high'],
    ['med', 'med', 'high', 'high', 'high'],
    ['low', 'low', 'med', 'high', 'high'],
    ['high', 'high', 'high', 'high', 'high'],
    ['low', 'med', 'med', 'med', 'high'],
    ['med', 'low', 'med', 'med', 'high'],
    ['low', 'med', 'high', 'high', 'low'],
  ],
  '30d': [
    ['low', 'med', 'med', 'low', 'med'],
    ['med', 'high', 'med', 'high', 'high'],
    ['low', 'low', 'med', 'med', 'high'],
    ['high', 'med', 'high', 'high', 'med'],
    ['low', 'med', 'low', 'med', 'high'],
    ['med', 'high', 'high', 'med', 'high'],
    ['high', 'high', 'med', 'high', 'high'],
  ],
  '90d': [
    ['med', 'med', 'high', 'high', 'high'],
    ['high', 'high', 'high', 'med', 'high'],
    ['med', 'low', 'med', 'high', 'high'],
    ['high', 'high', 'high', 'high', 'high'],
    ['low', 'med', 'med', 'high', 'high'],
    ['high', 'high', 'high', 'high', 'high'],
    ['med', 'high', 'high', 'high', 'high'],
  ],
}

const heatmapDatesByTimeline: Record<TimelineOptionValue, { dates: string[][]; labels: string[] }> = {
  '7d': {
    dates: [
      ['Apr 16', 'Apr 16', 'Apr 16', 'Apr 16', 'Apr 16'],
      ['Apr 17', 'Apr 17', 'Apr 17', 'Apr 17', 'Apr 17'],
      ['Apr 18', 'Apr 18', 'Apr 18', 'Apr 18', 'Apr 18'],
      ['Apr 19', 'Apr 19', 'Apr 19', 'Apr 19', 'Apr 19'],
      ['Apr 20', 'Apr 20', 'Apr 20', 'Apr 20', 'Apr 20'],
      ['Apr 21', 'Apr 21', 'Apr 21', 'Apr 21', 'Apr 21'],
      ['Apr 22', 'Apr 22', 'Apr 22', 'Apr 22', 'Apr 22'],
    ],
    labels: ['Apr 16', 'Apr 18', 'Apr 20', 'Apr 22'],
  },
  '14d': {
    dates: [
      ['Apr 9', 'Apr 9', 'Apr 10', 'Apr 10', 'Apr 10'],
      ['Apr 11', 'Apr 11', 'Apr 12', 'Apr 12', 'Apr 12'],
      ['Apr 13', 'Apr 13', 'Apr 14', 'Apr 14', 'Apr 14'],
      ['Apr 15', 'Apr 15', 'Apr 16', 'Apr 16', 'Apr 16'],
      ['Apr 17', 'Apr 17', 'Apr 18', 'Apr 18', 'Apr 18'],
      ['Apr 19', 'Apr 19', 'Apr 20', 'Apr 20', 'Apr 20'],
      ['Apr 21', 'Apr 21', 'Apr 22', 'Apr 22', 'Apr 22'],
    ],
    labels: ['Apr 9', 'Apr 13', 'Apr 17', 'Apr 22'],
  },
  '30d': {
    dates: [
      ['Mar 23', 'Mar 24', 'Mar 25', 'Mar 26', 'Mar 27'],
      ['Mar 28', 'Mar 29', 'Mar 30', 'Mar 31', 'Apr 1'],
      ['Apr 2', 'Apr 3', 'Apr 4', 'Apr 5', 'Apr 6'],
      ['Apr 7', 'Apr 8', 'Apr 9', 'Apr 10', 'Apr 11'],
      ['Apr 12', 'Apr 13', 'Apr 14', 'Apr 15', 'Apr 16'],
      ['Apr 17', 'Apr 18', 'Apr 19', 'Apr 20', 'Apr 21'],
      ['Apr 22', 'Apr 23', 'Apr 24', 'Apr 25', 'Apr 26'],
    ],
    labels: ['Mar 23', 'Apr 2', 'Apr 12', 'Apr 22'],
  },
  '90d': {
    dates: [
      ['Jan 22', 'Jan 28', 'Feb 3', 'Feb 9', 'Feb 15'],
      ['Feb 16', 'Feb 20', 'Feb 24', 'Feb 28', 'Mar 4'],
      ['Mar 5', 'Mar 9', 'Mar 13', 'Mar 17', 'Mar 21'],
      ['Mar 22', 'Mar 26', 'Mar 30', 'Apr 3', 'Apr 7'],
      ['Apr 8', 'Apr 11', 'Apr 14', 'Apr 17', 'Apr 20'],
      ['Apr 21', 'Apr 22', 'Apr 22', 'Apr 22', 'Apr 22'],
      ['Apr 22', 'Apr 22', 'Apr 22', 'Apr 22', 'Apr 22'],
    ],
    labels: ['Jan 22', 'Feb 20', 'Mar 21', 'Apr 22'],
  },
}

export function getRecoveryHeatmap(timeline: TimelineOptionValue): HeatmapData {
  const levels = heatmapLevelsByTimeline[timeline]
  const config = heatmapDatesByTimeline[timeline]

  const columns: HeatmapColumn[] = levels.map((colLevels, colIdx) => ({
    id: `col-${colIdx + 1}`,
    tiles: colLevels.map((level, tileIdx) => {
      const dateStr = config.dates[colIdx]?.[tileIdx] ?? `Day ${colIdx * 5 + tileIdx + 1}`
      const score =
        level === 'low'
          ? 25 + ((colIdx * 7 + tileIdx * 3) % 20)
          : level === 'med'
            ? 55 + ((colIdx * 5 + tileIdx * 4) % 20)
            : 82 + ((colIdx * 3 + tileIdx * 2) % 15)
      const status =
        level === 'low'
          ? 'Low Recovery'
          : level === 'med'
            ? 'Moderate Recovery'
            : 'Optimal Recovery'

      return {
        id: `tile-${colIdx}-${tileIdx}`,
        level,
        score,
        date: `${dateStr}, 2026`,
        status,
      }
    }),
  }))

  return {
    columns,
    dateLabels: config.labels,
  }
}

export const recoveryHeatmapData = getRecoveryHeatmap('7d').columns
export const heatmapDateLabels = getRecoveryHeatmap('7d').dateLabels
