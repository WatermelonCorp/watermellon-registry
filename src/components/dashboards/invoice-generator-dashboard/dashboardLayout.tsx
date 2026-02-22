import { AppSidebar } from "./components/app-sidebar";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import { SiteHeader } from "./components/site-header";

export const DashboardLayout = ({
  children,
  onNavigate,
  currentView
}: {
  children: React.ReactNode;
  onNavigate?: (view: string) => void;
  currentView?: string
}) => {
  return (
    <SidebarProvider>
      <AppSidebar onNavigate={onNavigate} currentView={currentView} />
      <SidebarInset>
        <SiteHeader currentView={currentView} />
        <main className="flex-1">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
