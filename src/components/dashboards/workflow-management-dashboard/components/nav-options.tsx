"use client";

import * as React from "react";
import { type Icon } from "@tabler/icons-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";


export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon: Icon;
  }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarGroupLabel className="font-mono text-md">Records</SidebarGroupLabel>
        <SidebarMenu className="gap-0">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                className=" data-[active=true]:bg-white dark:data-[active=true]:bg-black data-[active=true]:text-zinc-900 dark:data-[active=true]:text-white data-[active=true]:hover:bg-zinc-100 dark:data-[active=true]:hover:bg-zinc-800 data-[active=true]:hover:text-zinc-900 data-[active=true]:shadow-sm rounded-none transition-all active:scale-[0.98]"
              >
                <item.icon />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

      </SidebarGroupContent>
    </SidebarGroup>
  );
}
