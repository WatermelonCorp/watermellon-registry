import { AppSidebar } from "./components/app-sidebar"
import { SiteHeader } from "./components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "./components/ui/sidebar"

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <main className="flex-1">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}