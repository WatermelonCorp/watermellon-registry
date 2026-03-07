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
    name: string;
    url: string;
    icon: Icon;
  }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarGroupLabel className="font-mono uppercase">
          Options
        </SidebarGroupLabel>
        <SidebarMenu className="gap-0">
          {items.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
              className="data-[active=true]:bg-white data-[active=true]:text-zinc-900 data-[active=true]:shadow-sm rounded-none hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white transition-all duration-200 group/navItem"
              >
                  <item.icon className="group-hover/navItem:scale-110 transition-transform duration-200" />
                  <span className="group-hover/navItem:translate-x-1 transition-transform duration-200">{item.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
