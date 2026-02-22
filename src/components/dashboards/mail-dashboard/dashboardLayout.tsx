"use client"

import { AppSidebar } from "./components/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
} from "./components/ui/sidebar"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider className="bg-background"
            defaultOpen={false}
            style={{
                "--sidebar-width-icon": "4rem",
            } as React.CSSProperties}
        >
            <AppSidebar />
            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}