import type { CSSProperties, ReactNode } from "react";
import { DashboardSidebar } from "./components/astrix/sidebar";
import { DashboardTopbar } from "./components/astrix/topbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import "./dashboard.css";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider
      className="astrix-dashboard h-svh overflow-hidden no-scrollbar"
      style={
        {
          "--sidebar-width": "18.125rem",
          "--sidebar-width-icon": "5.125rem",
        } as CSSProperties
      }
    >
      <DashboardSidebar />

      <main className="flex flex-1 flex-col overflow-hidden">
        <div className="sticky top-0 z-50 w-full bg-background">
          <DashboardTopbar />
        </div>

        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>
    </SidebarProvider>
  );
}
