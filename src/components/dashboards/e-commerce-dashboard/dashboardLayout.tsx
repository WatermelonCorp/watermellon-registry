import { AppSidebar } from "./components/app-sidebar";
import { SiteHeader } from "./components/site-header";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";

export const DashboardLayout = ({
  children,
  onNavigate,
  currentView,
}: {
  children: React.ReactNode;
  onNavigate?: (view: string) => void;
  currentView?: string;
}) => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" onNavigate={onNavigate} currentView={currentView} />
      <SidebarInset className="min-w-0">
        <SiteHeader />
        <div className="flex flex-1 flex-col min-w-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};
