import { AppSidebar } from "./components/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"


export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-white dark:bg-neutral-800 p-3 h-svh w-screen overflow-hidden">
            <SidebarProvider
                className="h-full min-h-0! overflow-hidden gap-2"
                style={{ "--sidebar-width": "250px" } as React.CSSProperties}
            >
                <AppSidebar />
                <SidebarInset className="overflow-hidden min-h-0 rounded-xl border-[1.5px] border-neutral-200  bg-neutral-50 dark:bg-neutral-950 dark:border-neutral-800 p-4">
                    <div className="flex items-center gap-2 mb-4 lg:hidden">
                        <SidebarTrigger className="-ml-1" />
                        <div className="h-4 w-px bg-neutral-200" />
                    </div>
                    {children}
                </SidebarInset>
            </SidebarProvider >
        </div >
    )
}