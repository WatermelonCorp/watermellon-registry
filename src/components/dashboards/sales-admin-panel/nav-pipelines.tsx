"use client";

import { Dot } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
// import Link from "next/link";
// import { usePathname } from "@/lib/next-compat";

export function NavPipelines({
  pipelines,
}: {
  pipelines: {
    name: string;
    url: string;
    color: string;
  }[];
}) {
    // const pathname = usePathname();
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="h-0 pt-1 pb-3.5 text-neutral-600 -ml-1.5">PIPELINE</SidebarGroupLabel>
      <SidebarMenu>
        {pipelines.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild isActive={pathname === item.url}  className="data-[active=true]:border-y data-[active=true]:border-neutral-600 text-neutral-500 font-medium tracking-tight">
              <a href={item.url}>
                <Dot className={`${item.color}`} strokeWidth={10} />
                <span >{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}