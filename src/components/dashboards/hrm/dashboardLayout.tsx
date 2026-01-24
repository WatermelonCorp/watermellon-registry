"use client";

import { Home, Users } from "lucide-react";
import { IconRail, SecondarySidebar } from "./app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const getLabel = () => {
    if (pathname === "/dashboard") {
      return { label: "Dashboard", icon: Home };
    } else if (pathname === "/dashboard/employees") {
      return { label: "Employees", icon: Users };
    }
    return { label: "Dashboard", icon: Home };
  };

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex h-screen overflow-hidden bg-background">
        <IconRail
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          isExpanded={sidebarOpen}
        />

        <SecondarySidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-border px-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {(() => {
                const { label, icon: Icon } = getLabel();
                return (
                  <>
                    <Icon className="size-4" />
                    <span>{label}</span>
                  </>
                );
              })()}
            </div>
            <Image
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Logo"
              width={25}
              height={25}
              className="rounded-full"
            />
          </header>

          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </TooltipProvider>
  );
};
