"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
// import { usePathname } from "next/navigation";
// import Link from "next/link";

export function NavTeams({
  teams,
}: {
  teams: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden border-b">
      <SidebarGroupLabel className="h-0 pt-1 pb-3.5 text-neutral-600 -ml-1.5">TEAM</SidebarGroupLabel>
      <SidebarMenu>
        {teams.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild isActive={pathname === item.url}  className="data-[active=true]:border-y data-[active=true]:border-neutral-600 text-neutral-500 font-medium tracking-tight">
              <a href={item.url}>
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
