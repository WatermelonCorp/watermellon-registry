"use client"

import React from "react"

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
    icon: React.ElementType
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
            <SidebarMenuButton asChild tooltip={item.name} className=" hover:bg-indigo-600/5 hover:text-indigo-600  text-sidebar-foreground/70 tracking-tight data-[active=true]:bg-indigo-600/5 data-[active=true]:text-indigo-600 dark:data-[active=true]:bg-indigo-600/20 dark:data-[active=true]:text-indigo-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-600/20 transition-colors duration-200">
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
