import type { CSSProperties, ReactNode } from 'react'
import { DashboardSidebar } from './components/agndex/sidebar'
import { DashboardTopbar } from './components/agndex/topbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import './dashboard.css'

type DashboardLayoutProps = {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider
      open
      className="agndex-dashboard h-svh overflow-hidden no-scrollbar"
      style={
        {
          '--sidebar-width': '17.25rem',
        } as CSSProperties
      }
    >
      <DashboardSidebar />

      <main className="flex-1 overflow-y-auto md:bg-sidebar md:p-2">
        <div className="flex h-full flex-col overflow-hidden rounded-xl bg-background">
          <DashboardTopbar />
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
      </main>
    </SidebarProvider>
  )
}
