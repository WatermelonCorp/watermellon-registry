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
            <SidebarMenuButton asChild tooltip={item.title} className="text-neutral-500 dark:text-neutral-400 text-xs h-8 font-medium data-[active=true]:border-border hover:border hover:border-border data-[active=true]:text-neutral-600 dark:data-[active=true]:text-neutral-300 hover:text-neutral-600 dark:hover:text-neutral-300 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
              <a href={item.isDisabled ? "#" : item.url} onClick={(e) => {
                if (item.isDisabled) {
                  e.preventDefault();
                }
              }}>
                <item.icon className="size-4! transition-transform duration-300 group-hover/nav-item:scale-[1.05]" />
                <span className="tracking-tight">{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
