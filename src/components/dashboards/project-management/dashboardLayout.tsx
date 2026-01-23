import { AppSidebar } from "./app-sidebar";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";


export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <SidebarProvider className="!bg-[#f3f2f0]">
      <AppSidebar />
      <SidebarInset className="!rounded-md !shadow-none border-[1.5] !border-neutral-200">
        <header className="flex h-9 p-3 shrink-0 items-center gap-2 ">
          <h3 className="text-sm text-neutral-600">Settings</h3>
        </header>
        <main className="flex-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};
