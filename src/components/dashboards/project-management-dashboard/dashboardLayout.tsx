import { AppSidebar } from "./components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger, useSidebar } from "./components/ui/sidebar";

const DashboardHeader = () => {
  const { open, isMobile, openMobile } = useSidebar();
  const isOpen = isMobile ? openMobile : open;

  return (
    <header className="flex h-9 p-3 shrink-0 items-center gap-2 ">
      {!isOpen && <SidebarTrigger className="-ml-1" />}
      <h3 className="text-sm text-neutral-600">Settings</h3>
    </header>
  );
};

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <SidebarProvider className="bg-sidebar">
      <AppSidebar />
      <SidebarInset className="rounded-md! shadow-none! border border-border">
        <DashboardHeader />
        <main className="flex-1 overflow-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};
