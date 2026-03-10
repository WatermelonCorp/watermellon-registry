"use client"

import * as React from "react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "./ui/sidebar"

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}) {
  const [activeTeam] = React.useState(teams[0])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex w-full items-center">
          <SidebarMenuButton
            size="default"
            className="flex-1 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-transparent active:scale-[0.98] transition-all duration-200 group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:flex-none"
          >
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-7 items-center justify-center rounded transition-transform duration-200 group-hover:scale-110">
              <activeTeam.logo className="size-3.5" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
              <span className="truncate font-medium text-lg">{activeTeam.name}</span>
              {/* <span className="truncate text-xs">{activeTeam.plan}</span> */}
            </div>
          </SidebarMenuButton>
          <SidebarTrigger className="group-data-[collapsible=icon]:hidden transition-all duration-200 hover:scale-110 active:scale-95" />
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
