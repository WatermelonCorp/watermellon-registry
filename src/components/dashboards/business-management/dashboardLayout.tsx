import { AppSidebar } from "./components/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
} from "./components/ui/sidebar"

export const DashboardLayout = ({ children, onNavigate, currentView }: { children: React.ReactNode; onNavigate?: (view: string) => void; currentView?: string }) => {
    return (
        <SidebarProvider>
            <AppSidebar onNavigate={onNavigate} currentView={currentView} />
            <SidebarInset className="h-svh overflow-hidden">
                <main className="flex flex-col min-h-0 overflow-hidden flex-1">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}