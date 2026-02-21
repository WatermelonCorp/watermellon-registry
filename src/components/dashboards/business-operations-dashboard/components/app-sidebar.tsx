"use client"

import * as React from "react"
import {
  IconBuildingSkyscraper,
  IconDots,
  IconSearch,
} from "@tabler/icons-react"

import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "./ui/sidebar"
import { data } from "../data"
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-transparent px-1 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center">
              <div className="flex items-center w-full">
                <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                  <IconBuildingSkyscraper className="size-4" />
                </div>
                <div className="flex flex-1 items-center gap-2 group-data-[collapsible=icon]:hidden px-2">
                  <span className="font-semibold truncate text-[15px] tracking-tight">Ocean Labs</span>
                  <IconDots className="size-3 text-muted-foreground" />
                </div>
                <SidebarTrigger className="-mr-2 ml-auto text-neutral-500 group-data-[collapsible=icon]:hidden" />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="pb-2 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:mt-2">
          <div className="relative">
            <IconSearch className="absolute left-2 top-2.5 size-4 text-muted-foreground group-data-[collapsible=icon]:left-1/2 group-data-[collapsible=icon]:top-1/2 group-data-[collapsible=icon]:-translate-x-1/2 group-data-[collapsible=icon]:-translate-y-1/2 group-data-[collapsible=icon]:size-4" />
            <input
              placeholder="Search anything..."
              className="w-full bg-white dark:bg-neutral-800/50 rounded-md py-2 pl-8 pr-4 text-sm focus:outline-hidden border border-sidebar-border group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:placeholder:text-transparent "
            />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavMain items={data.settings} />
        <NavProjects projects={data.favorites} label="Favorites" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
