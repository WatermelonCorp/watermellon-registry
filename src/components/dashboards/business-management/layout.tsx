import { DashboardLayout } from '@/components/dashboards/business-management/dashboardLayout'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  )
}

export default Layout