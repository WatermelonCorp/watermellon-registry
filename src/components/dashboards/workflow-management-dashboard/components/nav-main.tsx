"use client";

import { type Icon } from "@tabler/icons-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
    isActive?: boolean;
  }[];
}) {
  return (
    <SidebarGroup className="">
      <SidebarGroupContent className="flex flex-col gap-0">
        <SidebarMenu className="gap-">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                isActive={item.isActive}
                className=" data-[active=true]:bg-white dark:data-[active=true]:bg-black data-[active=true]:text-zinc-900 dark:data-[active=true]:text-white data-[active=true]:hover:bg-zinc-100 dark:data-[active=true]:hover:bg-zinc-800 data-[active=true]:hover:text-zinc-900 data-[active=true]:shadow-sm rounded-none transition-colors outline-none focus-visible:ring-0"
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
