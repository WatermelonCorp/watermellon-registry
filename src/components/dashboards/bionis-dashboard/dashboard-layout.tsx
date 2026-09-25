import type { CSSProperties, ReactNode } from 'react'
import { DashboardSidebar } from './components/bionis/sidebar'
import { DashboardTopbar } from './components/bionis/topbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import './dashboard.css'

type DashboardLayoutProps = {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider
      defaultOpen
      className="bionis-dashboard h-svh overflow-hidden no-scrollbar"
      style={
        {
          '--sidebar-width': '18.125rem',
          '--sidebar-width-icon': '4.25rem',
        } as CSSProperties
      }
    >
      <DashboardSidebar />

      <main className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopbar />
        <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-10">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}
