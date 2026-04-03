"use client";
import { AppSidebar } from "./components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="bg-white dark:bg-white/5  h-svh w-screen overflow-hidden font-sans">
      <SidebarProvider
        className="h-full min-h-0! overflow-hidden gap-2 "
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 60)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar className="group" />

        {children}
      </SidebarProvider>
    </div>
  );
};
