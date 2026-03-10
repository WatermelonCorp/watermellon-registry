"use client"

import {
  type LucideIcon,
} from "lucide-react"

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar"

export function NavTertiary({
  items,
}: {
  items: {
    name: string
    url: string
    icon: LucideIcon
    isDisabled?: boolean
  }[]
}) {
  const pathname = "/financial-center/invoice-manager";
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden py-3 border-b">
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              asChild
              className={`rounded transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${pathname === item.url ? "text-sidebar-foreground bg-sidebar-accent" : "text-sidebar-foreground/70"}`}
              isActive={pathname === item.url}
            >
              <a href={item.isDisabled ? "#" : item.url} onClick={(e) => {
                if (item.isDisabled) {
                  e.preventDefault();
                }
              }}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
