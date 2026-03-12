"use client";

import {
  type Icon,
} from "@tabler/icons-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

export function NavApps({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: Icon;
    className: string
  }[];
}) {

  return (
    <SidebarGroup >
      <SidebarGroupContent>
        <SidebarGroupLabel className="font-mono text-sm ">
          Apps
        </SidebarGroupLabel>
        <SidebarMenu className="gap-0">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                className=" data-[active=true]:bg-white dark:data-[active=true]:bg-black data-[active=true]:text-zinc-900 dark:data-[active=true]:text-white data-[active=true]:hover:bg-zinc-100 dark:data-[active=true]:hover:bg-zinc-800 data-[active=true]:hover:text-zinc-900 data-[active=true]:shadow-sm rounded-none transition-colors outline-none focus-visible:ring-0"
              >
                <item.icon className={item.className} />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
