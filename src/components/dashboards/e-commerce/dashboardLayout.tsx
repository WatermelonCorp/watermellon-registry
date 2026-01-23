"use client"

import { SidebarInset, SidebarProvider } from "./ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { SiteHeader } from "./site-header"

export default function ECommerceDashboard({children}: {children: React.ReactNode}) {
    return (
       <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex-1">{children}</div>
      </SidebarInset>
    </SidebarProvider>
    )
}
