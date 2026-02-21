"use client";

import * as React from "react";
import {
  ArrowLeftToLine,
  Command,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import { SearchForm } from "./search-form";
import { NavSupport } from "./nav-support";
import { NavApps } from "./nav-apps";
import { NavManagement } from "./nav-management";
import { data } from "../data";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { toggleSidebar } = useSidebar();
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="bg-background border border-border"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <Command className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate">Courtney Henry</span>
                <span className="truncate text-[10px] mt-0.5 text-neutral-500">
                  The Walt Disney Company
                </span>
              </div>
              <ArrowLeftToLine
                onClick={() => {
                  toggleSidebar();
                }}
                className="size-4 text-muted-foreground"
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="py-3 gap-0">
        <SearchForm />
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavManagement management={data.management} />
        <NavSupport support={data.support} />
        <NavApps apps={data.apps} />
      </SidebarContent>
    </Sidebar>
  );
}
