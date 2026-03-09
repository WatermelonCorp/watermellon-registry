import { AppSidebar } from "./components/app-sidebar";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import { SiteHeader } from "./components/site-header";

export const DashboardLayout = ({
  children,
  onNavigate,
  currentView,
  onTogglePreview,
  isPreviewHidden
}: {
  children: React.ReactNode;
  onNavigate?: (view: string) => void;
  currentView?: string;
  onTogglePreview?: () => void;
  isPreviewHidden?: boolean;
}) => {
  return (
    <SidebarProvider>
      <AppSidebar onNavigate={onNavigate} currentView={currentView} />
      <SidebarInset>
        <SiteHeader
          currentView={currentView}
          onTogglePreview={onTogglePreview}
          isPreviewHidden={isPreviewHidden}
        />
        <main className="flex-1">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
