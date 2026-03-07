"use client"

import { AppSidebar } from "./components/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
} from "./components/ui/sidebar"

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="lg:h-svh lg:overflow-hidden flex flex-col min-h-svh">
                <main className="flex-1 lg:overflow-hidden">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
