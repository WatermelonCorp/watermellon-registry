"use client"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { SiteHeader } from "./site-header"

export const DashboardLayout = ({children}: {children: React.ReactNode}) => {
    return (
    <SidebarProvider className="w-full relative h-full">
          <AppSidebar className="absolute h-full" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </SidebarInset>
    </SidebarProvider>
    )
}
