"use client";

import { type Icon } from "@tabler/icons-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

export function NavDocuments({
  items,
}: {
  items: {
    name: string;
    url: string;
    icon: Icon;
  }[];
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden ">
      <SidebarGroupLabel className="font-mono uppercase">
        Documents
      </SidebarGroupLabel>
      <SidebarMenu className="gap-0">
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
            className="data-[active=true]:bg-white data-[active=true]:text-zinc-900 data-[active=true]:shadow-sm rounded-none hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white transition-colors duration-200 group/navItem"
            >
                <item.icon />
                <span>{item.name}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
