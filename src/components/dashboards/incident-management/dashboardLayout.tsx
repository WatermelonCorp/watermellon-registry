import { AppSidebar } from "./components/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
} from "./components/ui/sidebar"


export const DashboardLayout = ({ children, onNavigate, currentView }: { children: React.ReactNode; onNavigate?: (view: string) => void; currentView?: string }) => {
    return (
        <SidebarProvider className="h-svh overflow-hidden">
            <AppSidebar onNavigate={onNavigate} currentView={currentView} />
            <SidebarInset className="overflow-hidden min-h-0">
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}