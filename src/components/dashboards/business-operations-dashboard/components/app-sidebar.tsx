"use client"

import * as React from "react"
import {
  IconBuildingSkyscraper,
  IconDots,
  IconSearch,
  IconPlus,
} from "@tabler/icons-react"

import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"
import { Button } from "./ui/button"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { data } from "../data"
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="hover:bg-transparent px-1 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center active:bg-transparent transition-all">
              <div className="flex items-center w-full">
                <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                  <IconBuildingSkyscraper className="size-4" />
                </div>
                <div className="flex flex-1 items-center gap-2 group-data-[collapsible=icon]:hidden px-2 min-w-0">
                  <span className="font-semibold truncate text-[15px] tracking-tight">Ocean Labs</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-5 text-muted-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all active:scale-90 ml-0.5">
                        <IconDots className="size-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                      <DropdownMenuLabel className="text-xs text-muted-foreground">Workspaces</DropdownMenuLabel>
                      <DropdownMenuItem className="gap-2 p-2">
                        <div className="flex size-6 items-center justify-center rounded-sm border bg-background">
                          <IconBuildingSkyscraper className="size-4 shrink-0" />
                        </div>
                        Ocean Labs
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 p-2">
                        <div className="flex size-6 items-center justify-center rounded-sm border bg-background">
                          <IconBuildingSkyscraper className="size-4 shrink-0 text-muted-foreground" />
                        </div>
                        Personal Projects
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2 p-2">
                        <IconPlus className="size-4" />
                        Add Workspace
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <SidebarTrigger className="ml-auto text-neutral-500 group-data-[collapsible=icon]:hidden transition-all duration-200 hover:scale-110 active:scale-95 hover:bg-neutral-100 dark:hover:bg-neutral-800" />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="pb-2 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:mt-2">
          <div className="relative">
            <IconSearch className="absolute left-2 top-2.5 size-4 text-muted-foreground group-data-[collapsible=icon]:left-1/2 group-data-[collapsible=icon]:top-1/2 group-data-[collapsible=icon]:-translate-x-1/2 group-data-[collapsible=icon]:-translate-y-1/2 group-data-[collapsible=icon]:size-4" />
            <input
              placeholder="Search anything..."
              className="w-full bg-white dark:bg-neutral-800/50 rounded-md py-2 pl-8 pr-4 text-sm focus:outline-hidden border border-sidebar-border group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:placeholder:text-transparent transition-all hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-sm"
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
