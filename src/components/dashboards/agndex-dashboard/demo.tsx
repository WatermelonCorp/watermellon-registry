import type { ReactNode } from 'react'
import DashboardLayout from './dashboard-layout'
import { ApiKeysPage } from './components/agndex/api-keys-page'
import { BillingPage } from './components/agndex/billing-page'
import { DashboardPage } from './components/agndex/dashboard-page'
import {
  DashboardNavigationProvider,
  useDashboardNavigation,
} from './components/agndex/navigation'
import { ThemeProvider } from './components/agndex/theme-provider'

function DashboardRoute() {
  const { pathname } = useDashboardNavigation()

  let content: ReactNode = <DashboardPage />

  if (pathname === '/api-keys') {
    content = <ApiKeysPage />
  } else if (pathname === '/billing') {
    content = <BillingPage />
  } else if (pathname === '/docs' || pathname === '/settings') {
    content = null
  }

  return <DashboardLayout>{content}</DashboardLayout>
}

export default function AgndexDashboardDemo() {
  return (
    <ThemeProvider>
      <DashboardNavigationProvider>
        <DashboardRoute />
      </DashboardNavigationProvider>
    </ThemeProvider>
  )
}
