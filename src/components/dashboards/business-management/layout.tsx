import { DashboardLayout } from '@/layout/dashboardLayout'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  )
}

export default Layout