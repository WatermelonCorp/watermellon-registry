"use client"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar"

export function NavProjects({
  projects,
  label,
}: {
  projects: {
    name: string
    url: string
    icon: any
    color?: string
    isDisabled?: boolean
  }[]
  label?: string
}) {

  return (
    <SidebarGroup>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild tooltip={item.name} className=" hover:bg-indigo-600/5 hover:text-indigo-600  text-sidebar-foreground/70 tracking-tight data-[active=true]:bg-indigo-600/5 data-[active=true]:text-indigo-600">
              <a href={item.isDisabled ? "#" : item.url} onClick={(e) => {
                if (item.isDisabled) {
                  e.preventDefault();
                }
              }}>
                <item.icon className={item.color} />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
