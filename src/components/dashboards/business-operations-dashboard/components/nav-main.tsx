"use client"

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
    icon?: any
    isDisabled?: boolean
    isActive?: boolean
  }[]
  label?: string
}) {
  return (
    <SidebarGroup>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              tooltip={item.title}
              isActive={item.isActive}
              className="h-9 hover:bg-indigo-600/5 hover:text-indigo-600 font-medium text-sidebar-foreground/70 tracking-tight data-[active=true]:bg-indigo-600/5 dark:data-[active=true]:bg-indigo-600/20 dark:data-[active=true]:text-indigo-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-600/20 data-[active=true]:text-indigo-600 transition-all duration-200 hover:translate-x-1 active:scale-95"
            >
              <a href={item.isDisabled ? "#" : item.url} onClick={(e) => {
                if (item.isDisabled) {
                  e.preventDefault();
                }
              }}>
                {item.icon && <item.icon className="size-4" />}
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
