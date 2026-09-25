import type { ComponentType, SVGProps } from 'react'
import {
  SidebarAnalyticsIcon,
  SidebarFixedIncomeIcon,
  SidebarFolderIcon,
  SidebarHomeMutedIcon,
  SidebarLinkIcon,
  SidebarNetWorthIcon,
  SidebarNotificationsIcon,
  SidebarRealEstateIcon,
  SidebarSettingsIcon,
} from './components/capitalio/icons'

export type NavIcon = ComponentType<SVGProps<SVGSVGElement>>

export type NavigationItem = {
  name: string
  href: string
  icon: NavIcon
  pageTitle?: string
}

export type NavigationSection = {
  label?: string
  collapsible?: boolean
  defaultOpen?: boolean
  items: NavigationItem[]
}

export const sidebarSections = {
  main: [
    {
      label: 'Overview',
      collapsible: false,
      items: [
        {
          name: 'Dashboard',
          href: '/',
          icon: SidebarHomeMutedIcon,
          pageTitle: 'Overview',
        },
        { name: 'Analytics', href: '/analytics', icon: SidebarAnalyticsIcon },
        { name: 'Net Worth', href: '/net-worth', icon: SidebarNetWorthIcon },
      ],
    },
    {
      label: 'Operations',
      collapsible: true,
      defaultOpen: true,
      items: [
        { name: 'Stocks', href: '/stocks', icon: SidebarFolderIcon },
        { name: 'Crypto', href: '/crypto', icon: SidebarLinkIcon },
        { name: 'Real Estate', href: '/real-estate', icon: SidebarRealEstateIcon },
        { name: 'Fixed Income', href: '/fixed-income', icon: SidebarFixedIncomeIcon },
      ],
    },
  ],
  footer: {
    items: [
      { name: 'Settings', href: '/settings', icon: SidebarSettingsIcon },
      {
        name: 'Notifications',
        href: '/notifications',
        icon: SidebarNotificationsIcon,
      },
    ],
  },
} satisfies {
  main: NavigationSection[]
  footer: NavigationSection
}

const navigationItems: NavigationItem[] = [
  ...sidebarSections.main.flatMap((section) => section.items),
  ...sidebarSections.footer.items,
]

export function getPageTitle(pathname: string) {
  const item = navigationItems.find((navItem) => navItem.href === pathname)

  return item?.pageTitle ?? item?.name ?? 'Overview'
}

export const currentUser = {
  name: 'Vansh Patel',
  email: 'vansh@capitalio.com',
  initials: 'VP',
  avatar: `https://api.dicebear.com/10.x/glyphs/svg?seed=${encodeURIComponent('Vansh Patel')}`,
}

export const notifications = [
  {
    id: 'template-ready',
    title: 'Template ready',
    description: 'Dashboard shell is ready for new content.',
    time: 'Now',
  },
] as const

export const dashboardTopbarData = {
  lastUpdated: 'Today, 9:42 AM',
  currency: 'USD',
  dateRange: 'Feb 18 - March 18',
} as const

export const dashboardPeriods = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'yearly', label: 'Yearly' },
] as const

export type PeriodValue = (typeof dashboardPeriods)[number]['value']

export const dashboardSummaryCardsByPeriod = {
  monthly: [
    {
      id: 'net-worth',
      title: 'Total Net worth',
      value: '$2.8M',
      icon: 'wallet',
      color: 'var(--chart-4)',
      change: {
        value: '15%',
        label: 'Increased vs last month',
        tone: 'positive',
      },
      chart: {
        type: 'line',
        points: [
          { label: 'Jan', x: 0, y: 48 },
          { label: 'Feb', x: 54, y: 42 },
          { label: 'Mar', x: 96, y: 37 },
          { label: 'Apr', x: 144, y: 24 },
          { label: 'May', x: 188, y: 12 },
          { label: 'Jun', x: 216, y: 4 },
        ],
      },
    },
    {
      id: 'portfolio-return',
      title: 'Portfolio return',
      value: '+14.7%',
      icon: 'trend',
      color: 'var(--chart-1)',
      target: {
        current: '42%',
        label: 'to target',
        progress: 42,
        gained: '$184K gained',
        goal: 'Goal $438K',
      },
      bars: [
        { label: 'Jan', value: 12 },
        { label: 'Feb', value: 18 },
        { label: 'Mar', value: 8 },
        { label: 'Apr', value: 19 },
        { label: 'May', value: 12 },
        { label: 'Jun', value: 28 },
      ],
      chart: {
        type: 'bars',
      },
    },
    {
      id: 'asset-classes',
      title: 'Asset classes',
      value: '$2.05M',
      icon: 'pie',
      color: 'var(--chart-4)',
      allocations: [
        { label: 'Stock & Crypto', value: '$1.20M', share: 58, color: 'var(--chart-4)' },
        { label: 'Real estate', value: '$854K', share: 42, color: 'var(--chart-1)' },
      ],
    },
    {
      id: 'risk-score',
      title: 'Risk score',
      value: '62',
      suffix: '/ 100',
      icon: 'shield',
      color: 'var(--chart-3)',
      change: {
        value: 'Moderate,',
        label: 'well diversified',
        tone: 'neutral',
      },
      chart: {
        type: 'area',
        points: [
          { label: 'Jan', x: 0, y: 28 },
          { label: 'Feb', x: 50, y: 18 },
          { label: 'Mar', x: 100, y: 9 },
          { label: 'Apr', x: 150, y: 22 },
          { label: 'May', x: 200, y: 36 },
          { label: 'Jun', x: 252, y: 25 },
        ],
      },
    },
  ],
  weekly: [
    {
      id: 'net-worth',
      title: 'Total Net worth',
      value: '$2.74M',
      icon: 'wallet',
      color: 'var(--chart-4)',
      change: {
        value: '4.2%',
        label: 'Increased vs last week',
        tone: 'positive',
      },
      chart: {
        type: 'line',
        points: [
          { label: 'Mon', x: 0, y: 44 },
          { label: 'Tue', x: 42, y: 40 },
          { label: 'Wed', x: 84, y: 46 },
          { label: 'Thu', x: 126, y: 30 },
          { label: 'Fri', x: 168, y: 22 },
          { label: 'Sat', x: 216, y: 14 },
        ],
      },
    },
    {
      id: 'portfolio-return',
      title: 'Portfolio return',
      value: '+3.8%',
      icon: 'trend',
      color: 'var(--chart-1)',
      target: {
        current: '28%',
        label: 'to target',
        progress: 28,
        gained: '$42K gained',
        goal: 'Goal $150K',
      },
      bars: [
        { label: 'Mon', value: 10 },
        { label: 'Tue', value: 16 },
        { label: 'Wed', value: 12 },
        { label: 'Thu', value: 23 },
        { label: 'Fri', value: 15 },
        { label: 'Sat', value: 24 },
      ],
      chart: {
        type: 'bars',
      },
    },
    {
      id: 'asset-classes',
      title: 'Asset classes',
      value: '$2.02M',
      icon: 'pie',
      color: 'var(--chart-4)',
      allocations: [
        { label: 'Stock & Crypto', value: '$1.16M', share: 57, color: 'var(--chart-4)' },
        { label: 'Real estate', value: '$862K', share: 43, color: 'var(--chart-1)' },
      ],
    },
    {
      id: 'risk-score',
      title: 'Risk score',
      value: '58',
      suffix: '/ 100',
      icon: 'shield',
      color: 'var(--chart-3)',
      change: {
        value: 'Balanced,',
        label: 'lower volatility',
        tone: 'neutral',
      },
      chart: {
        type: 'area',
        points: [
          { label: 'Mon', x: 0, y: 24 },
          { label: 'Tue', x: 50, y: 18 },
          { label: 'Wed', x: 100, y: 20 },
          { label: 'Thu', x: 150, y: 30 },
          { label: 'Fri', x: 200, y: 26 },
          { label: 'Sat', x: 252, y: 18 },
        ],
      },
    },
  ],
  quarterly: [
    {
      id: 'net-worth',
      title: 'Total Net worth',
      value: '$2.92M',
      icon: 'wallet',
      color: 'var(--chart-4)',
      change: {
        value: '18%',
        label: 'Increased vs last quarter',
        tone: 'positive',
      },
      chart: {
        type: 'line',
        points: [
          { label: 'Q4 2024', x: 0, y: 50 },
          { label: 'Q1 2025', x: 44, y: 45 },
          { label: 'Q2 2025', x: 86, y: 32 },
          { label: 'Q3 2025', x: 128, y: 27 },
          { label: 'Q4 2025', x: 176, y: 13 },
          { label: 'Q1 2026', x: 216, y: 6 },
        ],
      },
    },
    {
      id: 'portfolio-return',
      title: 'Portfolio return',
      value: '+18.9%',
      icon: 'trend',
      color: 'var(--chart-1)',
      target: {
        current: '56%',
        label: 'to target',
        progress: 56,
        gained: '$245K gained',
        goal: 'Goal $438K',
      },
      bars: [
        { label: 'Q4 2024', value: 16 },
        { label: 'Q1 2025', value: 22 },
        { label: 'Q2 2025', value: 14 },
        { label: 'Q3 2025', value: 26 },
        { label: 'Q4 2025', value: 18 },
        { label: 'Q1 2026', value: 30 },
      ],
      chart: {
        type: 'bars',
      },
    },
    {
      id: 'asset-classes',
      title: 'Asset classes',
      value: '$2.17M',
      icon: 'pie',
      color: 'var(--chart-4)',
      allocations: [
        { label: 'Stock & Crypto', value: '$1.32M', share: 61, color: 'var(--chart-4)' },
        { label: 'Real estate', value: '$846K', share: 39, color: 'var(--chart-1)' },
      ],
    },
    {
      id: 'risk-score',
      title: 'Risk score',
      value: '65',
      suffix: '/ 100',
      icon: 'shield',
      color: 'var(--chart-3)',
      change: {
        value: 'Moderate,',
        label: 'growth tilted',
        tone: 'neutral',
      },
      chart: {
        type: 'area',
        points: [
          { label: 'Q4 2024', x: 0, y: 32 },
          { label: 'Q1 2025', x: 50, y: 22 },
          { label: 'Q2 2025', x: 100, y: 12 },
          { label: 'Q3 2025', x: 150, y: 18 },
          { label: 'Q4 2025', x: 200, y: 34 },
          { label: 'Q1 2026', x: 252, y: 28 },
        ],
      },
    },
  ],
  yearly: [
    {
      id: 'net-worth',
      title: 'Total Net worth',
      value: '$3.24M',
      icon: 'wallet',
      color: 'var(--chart-4)',
      change: {
        value: '31%',
        label: 'Increased vs last year',
        tone: 'positive',
      },
      chart: {
        type: 'line',
        points: [
          { label: '2021', x: 0, y: 52 },
          { label: '2022', x: 42, y: 48 },
          { label: '2023', x: 84, y: 38 },
          { label: '2024', x: 128, y: 20 },
          { label: '2025', x: 172, y: 16 },
          { label: '2026', x: 216, y: 2 },
        ],
      },
    },
    {
      id: 'portfolio-return',
      title: 'Portfolio return',
      value: '+26.4%',
      icon: 'trend',
      color: 'var(--chart-1)',
      target: {
        current: '72%',
        label: 'to target',
        progress: 72,
        gained: '$316K gained',
        goal: 'Goal $438K',
      },
      bars: [
        { label: '2021', value: 14 },
        { label: '2022', value: 21 },
        { label: '2023', value: 18 },
        { label: '2024', value: 24 },
        { label: '2025', value: 20 },
        { label: '2026', value: 31 },
      ],
      chart: {
        type: 'bars',
      },
    },
    {
      id: 'asset-classes',
      title: 'Asset classes',
      value: '$2.43M',
      icon: 'pie',
      color: 'var(--chart-4)',
      allocations: [
        { label: 'Stock & Crypto', value: '$1.56M', share: 64, color: 'var(--chart-4)' },
        { label: 'Real estate', value: '$872K', share: 36, color: 'var(--chart-1)' },
      ],
    },
    {
      id: 'risk-score',
      title: 'Risk score',
      value: '69',
      suffix: '/ 100',
      icon: 'shield',
      color: 'var(--chart-3)',
      change: {
        value: 'Moderate,',
        label: 'higher growth mix',
        tone: 'neutral',
      },
      chart: {
        type: 'area',
        points: [
          { label: '2021', x: 0, y: 35 },
          { label: '2022', x: 50, y: 20 },
          { label: '2023', x: 100, y: 14 },
          { label: '2024', x: 150, y: 10 },
          { label: '2025', x: 200, y: 26 },
          { label: '2026', x: 252, y: 32 },
        ],
      },
    },
  ],
} as const satisfies Record<PeriodValue, readonly unknown[]>

export const defaultDashboardPeriod = dashboardPeriods[0].value

const performanceMetrics = [
  { label: 'Stocks', value: '$1.20M', change: '+11.2%', tone: 'positive' },
  { label: 'Real estate', value: '$840K', change: '+6.8%', tone: 'positive' },
  { label: 'Crypto', value: '$380K', change: '+35.8%', tone: 'positive' },
  { label: 'Fixed Income', value: '$427K', change: '-1.1%', tone: 'negative' },
] as const

const allocationItems = [
  { label: 'Stocks', value: '$1.20M', percent: 42, color: 'var(--chart-1)' },
  { label: 'Real Estate', value: '$854K', percent: 30, color: 'var(--chart-4)' },
  { label: 'Crypto', value: '$370K', percent: 13, color: 'var(--chart-2)' },
  { label: 'Fixed income', value: '$427K', percent: 15, color: 'var(--chart-3)' },
] as const

export const dashboardDetailByPeriod = {
  monthly: {
    performance: {
      title: 'Portfolio Performance',
      trend: '+14.7% YTD',
      actionLabel: 'Full Analysis',
      yAxis: ['700K', '600K', '500K', '400K', '300K', '200K'],
      legend: [
        { label: 'Your Portfolio', color: 'var(--chart-4)' },
        { label: 'S&P 500', color: 'var(--chart-1)' },
      ],
      data: [
        { label: 'Week 1', axisLabel: 'Week 1', portfolio: 310, benchmark: 280 },
        { label: 'Week 1', portfolio: 295, benchmark: 260 },
        { label: 'Week 1', portfolio: 330, benchmark: 285 },
        { label: 'Week 1', portfolio: 470, benchmark: 330 },
        { label: 'Week 2', portfolio: 420, benchmark: 315 },
        { label: 'Week 2', axisLabel: 'Week 2', portfolio: 250, benchmark: 300 },
        { label: 'Week 2', portfolio: 370, benchmark: 295 },
        { label: 'Week 2', portfolio: 355, benchmark: 285 },
        { label: 'Week 3', portfolio: 380, benchmark: 280 },
        { label: 'Week 3', portfolio: 360, benchmark: 290 },
        { label: 'Week 3', axisLabel: 'Week 3', portfolio: 390, benchmark: 310 },
        { label: 'Week 3', portfolio: 430, benchmark: 345 },
        { label: 'Week 4', portfolio: 610, benchmark: 385 },
        { label: 'Week 4', portfolio: 640, benchmark: 440 },
        { label: 'Week 4', axisLabel: 'Week 4', portfolio: 590, benchmark: 450 },
      ],
      metrics: performanceMetrics,
    },
    allocation: {
      title: 'Asset Allocation',
      status: 'Balanced',
      centerValue: '4',
      centerLabel: 'Classes',
      items: allocationItems,
    },
  },
  weekly: {
    performance: {
      title: 'Portfolio Performance',
      trend: '+3.8% WTD',
      actionLabel: 'Full Analysis',
      yAxis: ['700K', '600K', '500K', '400K', '300K', '200K'],
      legend: [
        { label: 'Your Portfolio', color: 'var(--chart-4)' },
        { label: 'S&P 500', color: 'var(--chart-1)' },
      ],
      data: [
        { label: 'Mon', axisLabel: 'Mon', portfolio: 300, benchmark: 285 },
        { label: 'Mon', portfolio: 315, benchmark: 275 },
        { label: 'Tue', axisLabel: 'Tue', portfolio: 305, benchmark: 292 },
        { label: 'Tue', portfolio: 352, benchmark: 310 },
        { label: 'Wed', axisLabel: 'Wed', portfolio: 340, benchmark: 300 },
        { label: 'Wed', portfolio: 390, benchmark: 318 },
        { label: 'Thu', axisLabel: 'Thu', portfolio: 372, benchmark: 330 },
        { label: 'Thu', portfolio: 410, benchmark: 348 },
      ],
      metrics: performanceMetrics,
    },
    allocation: {
      title: 'Asset Allocation',
      status: 'Balanced',
      centerValue: '4',
      centerLabel: 'Classes',
      items: allocationItems,
    },
  },
  quarterly: {
    performance: {
      title: 'Portfolio Performance',
      trend: '+18.9% QTD',
      actionLabel: 'Full Analysis',
      yAxis: ['700K', '600K', '500K', '400K', '300K', '200K'],
      legend: [
        { label: 'Your Portfolio', color: 'var(--chart-4)' },
        { label: 'S&P 500', color: 'var(--chart-1)' },
      ],
      data: [
        { label: 'Jan', axisLabel: 'Jan', portfolio: 280, benchmark: 260 },
        { label: 'Jan', portfolio: 350, benchmark: 300 },
        { label: 'Feb', axisLabel: 'Feb', portfolio: 335, benchmark: 290 },
        { label: 'Feb', portfolio: 410, benchmark: 315 },
        { label: 'Mar', axisLabel: 'Mar', portfolio: 390, benchmark: 330 },
        { label: 'Mar', portfolio: 455, benchmark: 360 },
        { label: 'Apr', axisLabel: 'Apr', portfolio: 620, benchmark: 420 },
        { label: 'Apr', portfolio: 585, benchmark: 435 },
      ],
      metrics: performanceMetrics,
    },
    allocation: {
      title: 'Asset Allocation',
      status: 'Balanced',
      centerValue: '4',
      centerLabel: 'Classes',
      items: allocationItems,
    },
  },
  yearly: {
    performance: {
      title: 'Portfolio Performance',
      trend: '+26.4% YTD',
      actionLabel: 'Full Analysis',
      yAxis: ['700K', '600K', '500K', '400K', '300K', '200K'],
      legend: [
        { label: 'Your Portfolio', color: 'var(--chart-4)' },
        { label: 'S&P 500', color: 'var(--chart-1)' },
      ],
      data: [
        { label: 'Q1', axisLabel: 'Q1', portfolio: 260, benchmark: 240 },
        { label: 'Q1', portfolio: 340, benchmark: 285 },
        { label: 'Q2', axisLabel: 'Q2', portfolio: 315, benchmark: 275 },
        { label: 'Q2', portfolio: 390, benchmark: 300 },
        { label: 'Q3', axisLabel: 'Q3', portfolio: 440, benchmark: 335 },
        { label: 'Q3', portfolio: 470, benchmark: 360 },
        { label: 'Q4', axisLabel: 'Q4', portfolio: 630, benchmark: 410 },
        { label: 'Q4', portfolio: 680, benchmark: 460 },
      ],
      metrics: performanceMetrics,
    },
    allocation: {
      title: 'Asset Allocation',
      status: 'Balanced',
      centerValue: '4',
      centerLabel: 'Classes',
      items: allocationItems,
    },
  },
} as const

const dicebearGlassAvatar = (seed: string) =>
  `https://api.dicebear.com/10.x/glass/svg?seed=${encodeURIComponent(seed)}`

const holdingLogoUrls = {
  aapl: dicebearGlassAvatar('AAPL'),
  bitcoin: dicebearGlassAvatar('Bitcoin'),
  oakAve: dicebearGlassAvatar('55 Oak Ave'),
  msft: dicebearGlassAvatar('MSFT'),
  treasury: dicebearGlassAvatar('US Treasury 10Y'),
} as const

const topHoldings = [
  {
    no: '1',
    asset: 'AAPL',
    type: 'US Equity',
    value: '$284,500',
    allocation: '10.0%',
    return: '+22.4%',
    day: '+1.8%',
    logo: holdingLogoUrls.aapl,
    tone: 'positive',
    dayTone: 'positive',
  },
  {
    no: '2',
    asset: 'Bitcoin',
    type: 'Crypto Asset',
    value: '$198,720',
    allocation: '7.0%',
    return: '+61.2%',
    day: '+3.4%',
    logo: holdingLogoUrls.bitcoin,
    tone: 'positive',
    dayTone: 'positive',
  },
  {
    no: '3',
    asset: '55 Oak Ave',
    type: 'Real Estate',
    value: '$1,100,000',
    allocation: '11.2%',
    return: '+15.3%',
    day: '-----',
    logo: holdingLogoUrls.oakAve,
    tone: 'positive',
    dayTone: 'neutral',
  },
  {
    no: '4',
    asset: 'MSFT',
    type: 'US Equity',
    value: '$950,000',
    allocation: '9.7%',
    return: '+20.1%',
    day: '+2.3%',
    logo: holdingLogoUrls.msft,
    tone: 'positive',
    dayTone: 'positive',
  },
  {
    no: '5',
    asset: 'US Treasury 10Y',
    type: 'US Equity',
    value: '$1,100,000',
    allocation: '8.8%',
    return: '-1.2%',
    day: '-----',
    logo: holdingLogoUrls.treasury,
    tone: 'negative',
    dayTone: 'neutral',
  },
] as const

const smartInsights = [
  {
    title: 'Rebalance opportunity',
    description: 'Crypto at 13%, above 10% target. Trim $68K.',
    action: 'Rebalance Now',
    icon: 'scale',
  },
  {
    title: 'Tax-loss harvesting',
    description: '2 holdings eligible, saving est. $12,400',
    action: 'Review',
    icon: 'taxes',
  },
  {
    title: 'Dividend reinvestment',
    description: '$3,840 pending. DRIP adds +0.4% annually.',
    action: 'Enable DRIP',
    icon: 'reload',
  },
] as const

export const dashboardBottomByPeriod = {
  monthly: {
    holdings: {
      title: 'Top Holdings',
      actionLabel: 'View all',
      columns: ['No', 'Asset', 'Value', 'Allocation', 'Return', '24H'],
      rows: topHoldings,
    },
    insights: {
      title: 'Smart Insights',
      status: 'AI Recommendation',
      items: smartInsights,
    },
  },
  weekly: {
    holdings: {
      title: 'Top Holdings',
      actionLabel: 'View all',
      columns: ['No', 'Asset', 'Value', 'Allocation', 'Return', '24H'],
      rows: topHoldings,
    },
    insights: {
      title: 'Smart Insights',
      status: 'AI Recommendation',
      items: smartInsights,
    },
  },
  quarterly: {
    holdings: {
      title: 'Top Holdings',
      actionLabel: 'View all',
      columns: ['No', 'Asset', 'Value', 'Allocation', 'Return', '24H'],
      rows: topHoldings,
    },
    insights: {
      title: 'Smart Insights',
      status: 'AI Recommendation',
      items: smartInsights,
    },
  },
  yearly: {
    holdings: {
      title: 'Top Holdings',
      actionLabel: 'View all',
      columns: ['No', 'Asset', 'Value', 'Allocation', 'Return', '24H'],
      rows: topHoldings,
    },
    insights: {
      title: 'Smart Insights',
      status: 'AI Recommendation',
      items: smartInsights,
    },
  },
} as const

const analyticsMetrics = {
  monthly: [
    {
      id: 'net-worth',
      title: 'Total Net worth',
      value: '1.84',
      description: 'Strong risk-adjusted return',
      color: 'var(--chart-4)',
      type: 'line',
      data: [
        { label: 'Jan', x: 0, y: 36 },
        { label: 'Feb', x: 44, y: 34 },
        { label: 'Mar', x: 88, y: 31 },
        { label: 'Apr', x: 132, y: 26 },
        { label: 'May', x: 176, y: 20 },
        { label: 'Jun', x: 220, y: 14 },
      ],
    },
    {
      id: 'risk-score',
      title: 'Risk score',
      value: '-4.2%',
      description: 'Peak to trough - Jan 2026',
      color: 'var(--chart-5)',
      type: 'area',
      data: [
        { label: 'Jan', x: 0, y: 26 },
        { label: 'Feb', x: 44, y: 20 },
        { label: 'Mar', x: 88, y: 16 },
        { label: 'Apr', x: 132, y: 18 },
        { label: 'May', x: 176, y: 27 },
        { label: 'Jun', x: 220, y: 38 },
      ],
    },
    {
      id: 'portfolio-return',
      title: 'Portfolio return',
      value: '8.6%',
      description: 'Below benchmark avg 10.2%',
      color: 'var(--chart-3)',
      type: 'bars',
      data: [
        { label: 'Jan', value: 18 },
        { label: 'Feb', value: 24 },
        { label: 'Mar', value: 17 },
        { label: 'Apr', value: 22 },
        { label: 'May', value: 16 },
        { label: 'Jun', value: 24 },
      ],
    },
  ],
  weekly: [
    {
      id: 'net-worth',
      title: 'Total Net worth',
      value: '1.31',
      description: 'Stable short-term efficiency',
      color: 'var(--chart-4)',
      type: 'line',
      data: [
        { label: 'Mon', x: 0, y: 34 },
        { label: 'Tue', x: 44, y: 30 },
        { label: 'Wed', x: 88, y: 32 },
        { label: 'Thu', x: 132, y: 25 },
        { label: 'Fri', x: 176, y: 18 },
        { label: 'Sat', x: 220, y: 16 },
      ],
    },
    {
      id: 'risk-score',
      title: 'Risk score',
      value: '-1.1%',
      description: 'Intraday drawdown - Thu',
      color: 'var(--chart-5)',
      type: 'area',
      data: [
        { label: 'Mon', x: 0, y: 30 },
        { label: 'Tue', x: 44, y: 22 },
        { label: 'Wed', x: 88, y: 18 },
        { label: 'Thu', x: 132, y: 24 },
        { label: 'Fri', x: 176, y: 31 },
        { label: 'Sat', x: 220, y: 34 },
      ],
    },
    {
      id: 'portfolio-return',
      title: 'Portfolio return',
      value: '3.8%',
      description: 'Above benchmark avg 3.0%',
      color: 'var(--chart-3)',
      type: 'bars',
      data: [
        { label: 'Mon', value: 8 },
        { label: 'Tue', value: 12 },
        { label: 'Wed', value: 10 },
        { label: 'Thu', value: 15 },
        { label: 'Fri', value: 11 },
        { label: 'Sat', value: 14 },
      ],
    },
  ],
  quarterly: [
    {
      id: 'net-worth',
      title: 'Total Net worth',
      value: '2.12',
      description: 'Improving quarterly efficiency',
      color: 'var(--chart-4)',
      type: 'line',
      data: [
        { label: 'Jan', x: 0, y: 38 },
        { label: 'Feb', x: 44, y: 33 },
        { label: 'Mar', x: 88, y: 28 },
        { label: 'Apr', x: 132, y: 20 },
        { label: 'May', x: 176, y: 16 },
        { label: 'Jun', x: 220, y: 10 },
      ],
    },
    {
      id: 'risk-score',
      title: 'Risk score',
      value: '-3.5%',
      description: 'Peak to trough - Feb 2026',
      color: 'var(--chart-5)',
      type: 'area',
      data: [
        { label: 'Jan', x: 0, y: 28 },
        { label: 'Feb', x: 44, y: 18 },
        { label: 'Mar', x: 88, y: 14 },
        { label: 'Apr', x: 132, y: 19 },
        { label: 'May', x: 176, y: 24 },
        { label: 'Jun', x: 220, y: 32 },
      ],
    },
    {
      id: 'portfolio-return',
      title: 'Portfolio return',
      value: '18.9%',
      description: 'Above benchmark avg 15.0%',
      color: 'var(--chart-3)',
      type: 'bars',
      data: [
        { label: 'Jan', value: 15 },
        { label: 'Feb', value: 20 },
        { label: 'Mar', value: 18 },
        { label: 'Apr', value: 24 },
        { label: 'May', value: 19 },
        { label: 'Jun', value: 27 },
      ],
    },
  ],
  yearly: [
    {
      id: 'net-worth',
      title: 'Total Net worth',
      value: '2.68',
      description: 'Best annual risk-adjusted return',
      color: 'var(--chart-4)',
      type: 'line',
      data: [
        { label: '2021', x: 0, y: 42 },
        { label: '2022', x: 44, y: 36 },
        { label: '2023', x: 88, y: 30 },
        { label: '2024', x: 132, y: 22 },
        { label: '2025', x: 176, y: 12 },
        { label: '2026', x: 220, y: 6 },
      ],
    },
    {
      id: 'risk-score',
      title: 'Risk score',
      value: '-6.4%',
      description: 'Peak to trough - 2024',
      color: 'var(--chart-5)',
      type: 'area',
      data: [
        { label: '2021', x: 0, y: 32 },
        { label: '2022', x: 44, y: 20 },
        { label: '2023', x: 88, y: 14 },
        { label: '2024', x: 132, y: 12 },
        { label: '2025', x: 176, y: 22 },
        { label: '2026', x: 220, y: 30 },
      ],
    },
    {
      id: 'portfolio-return',
      title: 'Portfolio return',
      value: '26.4%',
      description: 'Above benchmark avg 21.3%',
      color: 'var(--chart-3)',
      type: 'bars',
      data: [
        { label: '2021', value: 12 },
        { label: '2022', value: 17 },
        { label: '2023', value: 15 },
        { label: '2024', value: 21 },
        { label: '2025', value: 18 },
        { label: '2026', value: 26 },
      ],
    },
  ],
} as const

const analyticsPeriodLabels = {
  monthly: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  weekly: ['Mon', 'Tue', 'Wed', 'Thu'],
  quarterly: ['Jan', 'Feb', 'Mar', 'Apr'],
  yearly: ['Q1', 'Q2', 'Q3', 'Q4'],
} as const

const analyticsPerformanceLegend = [
  { dataKey: 'portfolio', label: 'Portfolio +14.7%', color: 'var(--chart-4)' },
  { dataKey: 'benchmark', label: 'S&P 500 +11.4%', color: 'var(--chart-1)' },
  { dataKey: 'balanced', label: '60/40 +7.2%', color: 'var(--chart-2)' },
] as const

const analyticsPerformanceData = {
  monthly: [
    { label: 'Week 1', axisLabel: 'Week 1', portfolio: 310, benchmark: 285, balanced: 245 },
    { label: 'Week 1', portfolio: 295, benchmark: 270, balanced: 245 },
    { label: 'Week 1', portfolio: 330, benchmark: 292, balanced: 230 },
    { label: 'Week 1', portfolio: 465, benchmark: 325, balanced: 240 },
    { label: 'Week 2', axisLabel: 'Week 2', portfolio: 405, benchmark: 315, balanced: 255 },
    { label: 'Week 2', portfolio: 245, benchmark: 305, balanced: 250 },
    { label: 'Week 2', portfolio: 365, benchmark: 300, balanced: 255 },
    { label: 'Week 2', portfolio: 380, benchmark: 290, balanced: 265 },
    { label: 'Week 3', axisLabel: 'Week 3', portfolio: 385, benchmark: 292, balanced: 245 },
    { label: 'Week 3', portfolio: 360, benchmark: 300, balanced: 265 },
    { label: 'Week 3', portfolio: 405, benchmark: 320, balanced: 285 },
    { label: 'Week 3', portfolio: 430, benchmark: 345, balanced: 310 },
    { label: 'Week 4', axisLabel: 'Week 4', portfolio: 610, benchmark: 390, balanced: 340 },
    { label: 'Week 4', portfolio: 640, benchmark: 440, balanced: 365 },
    { label: 'Week 4', portfolio: 590, benchmark: 435, balanced: 395 },
  ],
  weekly: [
    { label: 'Mon', axisLabel: 'Mon', portfolio: 292, benchmark: 276, balanced: 238 },
    { label: 'Mon', portfolio: 320, benchmark: 285, balanced: 248 },
    { label: 'Tue', axisLabel: 'Tue', portfolio: 345, benchmark: 300, balanced: 255 },
    { label: 'Tue', portfolio: 360, benchmark: 315, balanced: 270 },
    { label: 'Wed', axisLabel: 'Wed', portfolio: 385, benchmark: 318, balanced: 285 },
    { label: 'Wed', portfolio: 370, benchmark: 326, balanced: 295 },
    { label: 'Thu', axisLabel: 'Thu', portfolio: 430, benchmark: 350, balanced: 318 },
    { label: 'Thu', portfolio: 455, benchmark: 365, balanced: 332 },
  ],
  quarterly: [
    { label: 'Jan', axisLabel: 'Jan', portfolio: 280, benchmark: 260, balanced: 235 },
    { label: 'Jan', portfolio: 350, benchmark: 300, balanced: 255 },
    { label: 'Feb', axisLabel: 'Feb', portfolio: 335, benchmark: 290, balanced: 248 },
    { label: 'Feb', portfolio: 410, benchmark: 315, balanced: 270 },
    { label: 'Mar', axisLabel: 'Mar', portfolio: 390, benchmark: 330, balanced: 292 },
    { label: 'Mar', portfolio: 455, benchmark: 360, balanced: 312 },
    { label: 'Apr', axisLabel: 'Apr', portfolio: 620, benchmark: 420, balanced: 350 },
    { label: 'Apr', portfolio: 585, benchmark: 435, balanced: 382 },
  ],
  yearly: [
    { label: 'Q1', axisLabel: 'Q1', portfolio: 260, benchmark: 240, balanced: 220 },
    { label: 'Q1', portfolio: 340, benchmark: 285, balanced: 245 },
    { label: 'Q2', axisLabel: 'Q2', portfolio: 315, benchmark: 275, balanced: 252 },
    { label: 'Q2', portfolio: 390, benchmark: 300, balanced: 270 },
    { label: 'Q3', axisLabel: 'Q3', portfolio: 440, benchmark: 335, balanced: 305 },
    { label: 'Q3', portfolio: 470, benchmark: 360, balanced: 325 },
    { label: 'Q4', axisLabel: 'Q4', portfolio: 630, benchmark: 410, balanced: 370 },
    { label: 'Q4', portfolio: 680, benchmark: 460, balanced: 410 },
  ],
} as const

const analyticsMonthlyReturns = [
  { label: 'Jan', stocks: 1.8, realEstate: 1.1, crypto: 4.8, fixedIncome: 0.5 },
  { label: 'Feb', stocks: 1.6, realEstate: 0.7, crypto: 4.9, fixedIncome: 0.4 },
  { label: 'Mar', stocks: 2.9, realEstate: 0.7, crypto: -1.8, fixedIncome: 0.3 },
  { label: 'Apr', stocks: 1.9, realEstate: 0.4, crypto: 8.0, fixedIncome: 0.5 },
  { label: 'May', stocks: 1.8, realEstate: 1.0, crypto: 4.8, fixedIncome: 0.4 },
  { label: 'Jun', stocks: 3.7, realEstate: 1.0, crypto: 6.8, fixedIncome: 0.4 },
] as const

const analyticsIncomeStreams = [
  { label: 'Jan', dividends: 0.9, rentalIncome: 3.2 },
  { label: 'Feb', dividends: 0.7, rentalIncome: 2.6 },
  { label: 'Mar', dividends: 1.3, rentalIncome: 2.5 },
  { label: 'Apr', dividends: 0.9, rentalIncome: 1.2 },
  { label: 'May', dividends: 1.6, rentalIncome: 2.3 },
  { label: 'Jun', dividends: 0.9, rentalIncome: 2.6 },
] as const

const analyticsWeeklyReturns = [
  { label: 'Mon', stocks: 0.4, realEstate: 0.2, crypto: 1.1, fixedIncome: 0.1 },
  { label: 'Tue', stocks: 0.7, realEstate: 0.3, crypto: 1.6, fixedIncome: 0.2 },
  { label: 'Wed', stocks: -0.3, realEstate: 0.1, crypto: 0.8, fixedIncome: 0.1 },
  { label: 'Thu', stocks: 1.0, realEstate: 0.3, crypto: 2.2, fixedIncome: 0.2 },
  { label: 'Fri', stocks: 0.6, realEstate: 0.2, crypto: 1.4, fixedIncome: 0.1 },
  { label: 'Sat', stocks: 0.9, realEstate: 0.2, crypto: 1.9, fixedIncome: 0.1 },
] as const

const analyticsQuarterlyReturns = [
  { label: 'Jan', stocks: 2.4, realEstate: 1.2, crypto: 5.8, fixedIncome: 0.5 },
  { label: 'Feb', stocks: 2.0, realEstate: 1.0, crypto: 4.6, fixedIncome: 0.4 },
  { label: 'Mar', stocks: 3.1, realEstate: 1.4, crypto: 6.2, fixedIncome: 0.6 },
  { label: 'Apr', stocks: 2.8, realEstate: 1.1, crypto: 5.4, fixedIncome: 0.5 },
  { label: 'May', stocks: 3.4, realEstate: 1.5, crypto: 7.0, fixedIncome: 0.7 },
  { label: 'Jun', stocks: 4.0, realEstate: 1.6, crypto: 7.8, fixedIncome: 0.7 },
] as const

const analyticsYearlyReturns = [
  { label: '2021', stocks: 8.4, realEstate: 3.2, crypto: 12.8, fixedIncome: 1.4 },
  { label: '2022', stocks: -2.8, realEstate: 2.6, crypto: -3.5, fixedIncome: 0.9 },
  { label: '2023', stocks: 9.2, realEstate: 4.1, crypto: 14.6, fixedIncome: 1.8 },
  { label: '2024', stocks: 11.4, realEstate: 4.7, crypto: 18.2, fixedIncome: 2.1 },
  { label: '2025', stocks: 10.8, realEstate: 5.0, crypto: 16.5, fixedIncome: 2.2 },
  { label: '2026', stocks: 13.6, realEstate: 5.8, crypto: 21.0, fixedIncome: 2.4 },
] as const

const analyticsWeeklyIncomeStreams = [
  { label: 'Mon', dividends: 0.2, rentalIncome: 0.6 },
  { label: 'Tue', dividends: 0.1, rentalIncome: 0.5 },
  { label: 'Wed', dividends: 0.3, rentalIncome: 0.6 },
  { label: 'Thu', dividends: 0.2, rentalIncome: 0.4 },
  { label: 'Fri', dividends: 0.3, rentalIncome: 0.5 },
  { label: 'Sat', dividends: 0.2, rentalIncome: 0.6 },
] as const

const analyticsQuarterlyIncomeStreams = [
  { label: 'Jan', dividends: 1.1, rentalIncome: 3.1 },
  { label: 'Feb', dividends: 0.9, rentalIncome: 2.7 },
  { label: 'Mar', dividends: 1.4, rentalIncome: 3.0 },
  { label: 'Apr', dividends: 1.0, rentalIncome: 2.4 },
  { label: 'May', dividends: 1.6, rentalIncome: 3.2 },
  { label: 'Jun', dividends: 1.2, rentalIncome: 3.0 },
] as const

const analyticsYearlyIncomeStreams = [
  { label: '2021', dividends: 3.4, rentalIncome: 9.8 },
  { label: '2022', dividends: 4.0, rentalIncome: 10.7 },
  { label: '2023', dividends: 4.8, rentalIncome: 12.1 },
  { label: '2024', dividends: 5.5, rentalIncome: 13.6 },
  { label: '2025', dividends: 6.2, rentalIncome: 14.8 },
  { label: '2026', dividends: 7.1, rentalIncome: 16.4 },
] as const

export const analyticsDataByPeriod = {
  monthly: {
    performance: {
      title: 'Portfolio Performance',
      subtitle: 'Portfolio performance over 6 months',
      trend: 'Outperforming +3.3pp',
      compareLabel: 'vs S&P 500',
      labels: analyticsPeriodLabels.monthly,
      legend: analyticsPerformanceLegend,
      data: analyticsPerformanceData.monthly,
    },
    metrics: analyticsMetrics.monthly,
    returns: {
      title: 'Monthly returns',
      subtitle: 'Per asset class 2026',
      status: 'All positive',
      series: [
        { dataKey: 'stocks', label: 'Stocks', color: 'var(--chart-1)' },
        { dataKey: 'realEstate', label: 'Real Estate', color: 'var(--chart-4)' },
        { dataKey: 'crypto', label: 'Crypto', color: 'var(--chart-3)' },
        { dataKey: 'fixedIncome', label: 'Fixed Income', color: 'var(--chart-2)' },
      ],
      data: analyticsMonthlyReturns,
    },
    income: {
      title: 'Income streams',
      subtitle: 'Dividends & rental income - 2026',
      status: '$18,240 YTD',
      series: [
        { dataKey: 'dividends', label: 'Dividends', color: 'var(--chart-1)' },
        { dataKey: 'rentalIncome', label: 'Rental Income', color: 'var(--chart-4)' },
      ],
      data: analyticsIncomeStreams,
    },
  },
  weekly: {
    performance: {
      title: 'Portfolio Performance',
      subtitle: 'Portfolio performance this week',
      trend: 'Outperforming +0.8pp',
      compareLabel: 'vs S&P 500',
      labels: analyticsPeriodLabels.weekly,
      legend: analyticsPerformanceLegend,
      data: analyticsPerformanceData.weekly,
    },
    metrics: analyticsMetrics.weekly,
    returns: {
      title: 'Daily returns',
      subtitle: 'Per asset class this week',
      status: 'All positive',
      series: [
        { dataKey: 'stocks', label: 'Stocks', color: 'var(--chart-1)' },
        { dataKey: 'realEstate', label: 'Real Estate', color: 'var(--chart-4)' },
        { dataKey: 'crypto', label: 'Crypto', color: 'var(--chart-3)' },
        { dataKey: 'fixedIncome', label: 'Fixed Income', color: 'var(--chart-2)' },
      ],
      data: analyticsWeeklyReturns,
    },
    income: {
      title: 'Income streams',
      subtitle: 'Dividends & rental income this week',
      status: '$3,120 WTD',
      series: [
        { dataKey: 'dividends', label: 'Dividends', color: 'var(--chart-1)' },
        { dataKey: 'rentalIncome', label: 'Rental Income', color: 'var(--chart-4)' },
      ],
      data: analyticsWeeklyIncomeStreams,
    },
  },
  quarterly: {
    performance: {
      title: 'Portfolio Performance',
      subtitle: 'Portfolio performance this quarter',
      trend: 'Outperforming +3.9pp',
      compareLabel: 'vs S&P 500',
      labels: analyticsPeriodLabels.quarterly,
      legend: analyticsPerformanceLegend,
      data: analyticsPerformanceData.quarterly,
    },
    metrics: analyticsMetrics.quarterly,
    returns: {
      title: 'Monthly returns',
      subtitle: 'Per asset class this quarter',
      status: 'All positive',
      series: [
        { dataKey: 'stocks', label: 'Stocks', color: 'var(--chart-1)' },
        { dataKey: 'realEstate', label: 'Real Estate', color: 'var(--chart-4)' },
        { dataKey: 'crypto', label: 'Crypto', color: 'var(--chart-3)' },
        { dataKey: 'fixedIncome', label: 'Fixed Income', color: 'var(--chart-2)' },
      ],
      data: analyticsQuarterlyReturns,
    },
    income: {
      title: 'Income streams',
      subtitle: 'Dividends & rental income this quarter',
      status: '$9,640 QTD',
      series: [
        { dataKey: 'dividends', label: 'Dividends', color: 'var(--chart-1)' },
        { dataKey: 'rentalIncome', label: 'Rental Income', color: 'var(--chart-4)' },
      ],
      data: analyticsQuarterlyIncomeStreams,
    },
  },
  yearly: {
    performance: {
      title: 'Portfolio Performance',
      subtitle: 'Portfolio performance this year',
      trend: 'Outperforming +5.1pp',
      compareLabel: 'vs S&P 500',
      labels: analyticsPeriodLabels.yearly,
      legend: analyticsPerformanceLegend,
      data: analyticsPerformanceData.yearly,
    },
    metrics: analyticsMetrics.yearly,
    returns: {
      title: 'Quarterly returns',
      subtitle: 'Per asset class 2026',
      status: 'All positive',
      series: [
        { dataKey: 'stocks', label: 'Stocks', color: 'var(--chart-1)' },
        { dataKey: 'realEstate', label: 'Real Estate', color: 'var(--chart-4)' },
        { dataKey: 'crypto', label: 'Crypto', color: 'var(--chart-3)' },
        { dataKey: 'fixedIncome', label: 'Fixed Income', color: 'var(--chart-2)' },
      ],
      data: analyticsYearlyReturns,
    },
    income: {
      title: 'Income streams',
      subtitle: 'Dividends & rental income - 2026',
      status: '$18,240 YTD',
      series: [
        { dataKey: 'dividends', label: 'Dividends', color: 'var(--chart-1)' },
        { dataKey: 'rentalIncome', label: 'Rental Income', color: 'var(--chart-4)' },
      ],
      data: analyticsYearlyIncomeStreams,
    },
  },
} as const satisfies Record<PeriodValue, unknown>
