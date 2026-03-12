"use client"

import { type Icon as TablerIcon } from "@tabler/icons-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar"

export function NavMain({
  items,
  label,
}: {
  items: {
    title: string
    url: string
    icon: TablerIcon
    isActive?: boolean
    badge?: string | number
    isDisabled?: boolean
  }[]
  label?: string
}) {
  const pathname = "/dashboard/tasks"
  return (
    <SidebarGroup>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild tooltip={item.title} isActive={pathname === item.url} className="h-9 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-400/15 dark:hover:bg-neutral-800/50 data-[active=true]:bg-neutral-400/15 dark:data-[active=true]:bg-neutral-800 data-[active=true]:text-neutral-900 dark:data-[active=true]:text-neutral-100 transition-all active:scale-[0.98]">
              <a href={item.isDisabled ? "#" : item.url} onClick={(e) => {
                if (item.isDisabled) {
                  e.preventDefault();
                }
              }}>
                <item.icon />
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
