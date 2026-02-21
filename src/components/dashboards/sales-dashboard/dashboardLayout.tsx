import { AppSidebar } from "./components/app-sidebar";
import { SiteHeader } from "./components/site-header";

import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";

const DashboardLayout = ({ children, onNavigate, currentView }: { children: React.ReactNode; onNavigate?: (view: string) => void; currentView?: string }) => {
  return (
    <SidebarProvider>
      <AppSidebar onNavigate={onNavigate} currentView={currentView} />
      <SidebarInset className="h-svh overflow-hidden">
        <SiteHeader currentView={currentView} />
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;