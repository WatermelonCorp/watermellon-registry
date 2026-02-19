"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { useLocation } from "react-router-dom";

export function NavReporting({
  reports,
}: {
  reports: {
    name: string;
    url: string;
    icon: LucideIcon;
    isDisabled?: boolean;
  }[];
}) {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden border-b border-neutral-200 dark:border-neutral-800">
      <SidebarGroupLabel className="h-0 pt-1 pb-3.5 text-neutral-500 dark:text-neutral-400 -ml-1.5">REPORTS</SidebarGroupLabel>
      <SidebarMenu>
        {reports.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild isActive={pathname === item.url} className="data-[active=true]:border-y data-[active=true]:border-neutral-200 dark:data-[active=true]:border-neutral-700 text-neutral-500 dark:text-neutral-400 font-medium tracking-tight">
              <a href={item.url} onClick={(e) => item.isDisabled && e.preventDefault()}>
                <item.icon className="size-4" strokeWidth={2.5} />
                <span >{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
