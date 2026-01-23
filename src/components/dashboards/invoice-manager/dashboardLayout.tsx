import { AppSidebar } from "./app-sidebar"
import { SiteHeader } from "./site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "./ui/sidebar"


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