import DashboardLayout from './dashboard-layout'
import { DashboardContent } from './components/bionis/dashboard-content'
import { TrendsContent } from './components/bionis/trends-content'
import {
  DashboardNavigationProvider,
  useDashboardNavigation,
} from './components/bionis/navigation'
import { ThemeProvider } from './components/bionis/theme-provider'

function DashboardRoute() {
  const { pathname } = useDashboardNavigation()

  return (
    <DashboardLayout>
      {pathname === '/trends' ? <TrendsContent /> : <DashboardContent />}
    </DashboardLayout>
  )
}

export default function BionisDashboardDemo() {
  return (
    <ThemeProvider>
      <DashboardNavigationProvider>
        <DashboardRoute />
      </DashboardNavigationProvider>
    </ThemeProvider>
  )
}
