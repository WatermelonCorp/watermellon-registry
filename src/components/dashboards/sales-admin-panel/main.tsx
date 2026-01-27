"use client"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { SiteHeader } from "./site-header"

export default function SalesAdminPanel({children}: {children: React.ReactNode}) {
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
