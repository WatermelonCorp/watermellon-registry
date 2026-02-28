"use client"

import * as React from "react"
import {
  IconChevronRight,
  IconRosetteDiscountCheck,
} from "@tabler/icons-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "./ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "./ui/sidebar"

import { data } from "./data"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-14 border-b p-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <div className="flex flex-1 items-center gap-2 overflow-hidden px-2 py-1">
              <div className="size-7 rounded-md bg-linear-to-br from-purple-500 via-pink-500 to-orange-400 shrink-0 shadow-sm" />
              <div className="flex items-center justify-center gap-1.5 overflow-hidden">
                <span className="font-semibold text-foreground truncate">OceanLabs</span>
                <IconRosetteDiscountCheck className="size-4 shrink-0 text-primary" />
              </div>
            </div>
            <SidebarTrigger className="h-8 w-8" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Workspace Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarMenu>
            {data.workspace.map((item) => {
              const hasItems = item.items && item.items.length > 0

              if (!hasItems) {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton tooltip={item.title} className="font-semibold tracking-tight hover:scale-[1.02] active:scale-[0.98] hover:translate-x-0.5 transition-all duration-200">
                      {item.icon && <item.icon strokeWidth={2.5} />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              }

              return (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title} className="font-semibold tracking-tight hover:scale-[1.02] active:scale-[0.98] hover:translate-x-0.5 transition-all duration-200">
                        {item.icon && <item.icon strokeWidth={2.5} />}
                        <span>{item.title}</span>
                        <IconChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 h-4 w-4" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild isActive={subItem.isActive} className="font-semibold tracking-tight hover:translate-x-1 hover:text-zinc-900 dark:hover:text-white transition-all duration-200">
                              <a href={subItem.url}>
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>

        {/* Favorites Section */}
        <Collapsible defaultOpen className="group/favorites">
          <SidebarGroup>
            <div className="flex items-center justify-between">
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="flex w-full items-center justify-between hover:text-foreground">
                  Favorites
                  <IconChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/favorites:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
            </div>
            <CollapsibleContent>
              <SidebarMenu>
                {data.favorites.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton tooltip={item.title} className="tracking-tight hover:scale-[1.02] active:scale-[0.98] hover:translate-x-0.5 transition-all duration-200">
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      {/* Footer Section */}
      <SidebarFooter className="border-t">
        <SidebarMenu>
          {data.footer.map((item) => (
            <SidebarMenuItem key={item.title} className="font-semibold tracking-tight">
              <SidebarMenuButton tooltip={item.title} className="hover:scale-[1.02] active:scale-[0.98] hover:translate-x-0.5 transition-all duration-200">
                {item.icon && <item.icon strokeWidth={2.5} />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
