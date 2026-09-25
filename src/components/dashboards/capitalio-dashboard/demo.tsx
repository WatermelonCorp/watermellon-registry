import type { ReactNode } from 'react'
import DashboardLayout from './dashboard-layout'
import { AnalyticsPage } from './components/capitalio/analytics-page'
import { DashboardPage } from './components/capitalio/dashboard-page'
import {
  DashboardNavigationProvider,
  useDashboardNavigation,
} from './components/capitalio/navigation'

const blankRoutes = new Set([
  '/net-worth',
  '/stocks',
  '/crypto',
  '/real-estate',
  '/fixed-income',
  '/settings',
  '/notifications',
])

function DashboardRoute() {
  const { pathname } = useDashboardNavigation()

  let content: ReactNode = <DashboardPage />

  if (pathname === '/analytics') {
    content = <AnalyticsPage />
  } else if (blankRoutes.has(pathname)) {
    content = null
  }

  return <DashboardLayout>{content}</DashboardLayout>
}

export default function CapitalioDashboardDemo() {
  return (
    <DashboardNavigationProvider>
      <DashboardRoute />
    </DashboardNavigationProvider>
  )
}
