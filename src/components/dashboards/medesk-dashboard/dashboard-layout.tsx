import type { CSSProperties, ReactNode } from "react";
import { DashboardSidebar } from "./components/medesk/sidebar";
import { DashboardTopbar } from "./components/medesk/topbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import "./dashboard.css";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider
      defaultOpen
      className="medesk-dashboard h-svh overflow-hidden no-scrollbar"
      style={
        {
          "--sidebar-width": "17.25rem",
          "--sidebar-width-icon": "5.125rem",
        } as CSSProperties
      }
    >
      <DashboardSidebar />

      <main className="flex flex-1 flex-col overflow-hidden bg-sidebar p-0 md:p-2 md:pl-0">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-background md:rounded-xl">
          <DashboardTopbar />
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
      </main>
    </SidebarProvider>
  );
}
