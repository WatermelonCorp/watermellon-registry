"use client"

import { AppSidebar } from "./components/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
} from "./components/ui/sidebar"
import { SiteHeader } from "./components/site-header"

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="h-svh overflow-hidden">
                <SiteHeader />
                <main className="flex-1 overflow-hidden h-full">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
