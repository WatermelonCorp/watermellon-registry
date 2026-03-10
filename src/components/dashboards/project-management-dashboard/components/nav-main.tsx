"use client"

import { type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
    isDisabled?: boolean
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="-ml-2 font-medium text-neutral-700 dark:text-neutral-300">Essentials</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title} className="group/nav-item">
            <SidebarMenuButton asChild tooltip={item.title} className="text-neutral-500 dark:text-neutral-400 text-xs h-8 font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800/50 data-[active=true]:bg-neutral-100 dark:data-[active=true]:bg-neutral-800/50 data-[active=true]:text-neutral-600 dark:data-[active=true]:text-neutral-300 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors outline-none focus-visible:ring-0">
              <a href={item.isDisabled ? "#" : item.url} onClick={(e) => {
                if (item.isDisabled) {
                  e.preventDefault();
                }
              }}>
                <item.icon className="size-4! transition-colors group-hover/nav-item:text-neutral-800 dark:group-hover/nav-item:text-neutral-200" />
                <span className="tracking-tight">{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
