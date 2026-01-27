import { AppSidebar } from "./app-sidebar"
import { SiteHeader } from "./site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"


export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider className="w-full relative h-full">
            <AppSidebar className="absolute h-full" />
            <SidebarInset>
                <SiteHeader />
                <main className="flex-1">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}