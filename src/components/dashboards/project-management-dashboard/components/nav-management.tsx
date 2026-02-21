"use client"

import {
  ChevronRight,
  GripVertical,
  Plus,
  type LucideIcon,
} from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible"

export function NavManagement({
  management,
}: {
  management: {
    name: string
    url: string
    icon: LucideIcon
    color?: string
    isDisabled?: boolean
  }[]
}) {

  return (
    <Collapsible defaultOpen className="group/collapsible px-2">
      <SidebarGroup className="m-0 px-0! border-t-[0.5px] border-border py-2">
        <SidebarGroupLabel asChild className=" font-medium text-neutral-700 dark:text-neutral-300 px-0!">
          <div className="flex items-center justify-between w-full">
            <CollapsibleTrigger className="flex items-center gap-1 w-full p-0">
              <ChevronRight className="size-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
              <span>Management</span>
            </CollapsibleTrigger>
            <div className="flex items-center gap-2">
              <Plus className="size-3.5 text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer" />
              <GripVertical className="size-3.5 text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer" />
            </div>
          </div>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarMenu>
            {management.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild tooltip={item.name} className="text-neutral-500 dark:text-neutral-400 text-xs h-8 font-medium data-[active=true]:border-border hover:border hover:border-border data-[active=true]:text-neutral-600 dark:data-[active=true]:text-neutral-300 hover:text-neutral-600 dark:hover:text-neutral-300">
                  <a href={item.isDisabled ? "#" : item.url} onClick={(e) => {
                    if (item.isDisabled) {
                      e.preventDefault();
                    }
                  }}>
                    <item.icon />
                    <span className="tracking-tight">{item.name}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )
}
