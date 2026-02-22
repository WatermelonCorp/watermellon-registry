import { AppSidebar } from "./components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "./components/ui/sidebar"

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider className="h-svh overflow-hidden">
      <AppSidebar />
      <SidebarInset className="border overflow-hidden min-h-0">
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}