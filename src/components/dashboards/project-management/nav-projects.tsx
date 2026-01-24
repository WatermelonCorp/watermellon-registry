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
} from "@/component@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/component@/components/ui/collapsible"

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: LucideIcon
    color?: string
  }[]
}) {

  return (
    <Collapsible defaultOpen className="group/collapsible px-2">
      <SidebarGroup className="m-0 !px-0 border-t-[0.5px] border-neutral-200 py-2">
        <SidebarGroupLabel asChild className=" font-medium text-neutral-700 !px-0">
          <div className="flex items-center justify-between w-full">
            <CollapsibleTrigger className="flex items-center gap-1 w-full p-0">
              <ChevronRight className="size-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
              <span>Projects</span>
            </CollapsibleTrigger>
            <div className="flex items-center gap-2">
              <Plus className="size-3.5 text-neutral-500 hover:text-neutral-700 cursor-pointer" />
              <GripVertical className="size-3.5 text-neutral-500 hover:text-neutral-700 cursor-pointer" />
            </div>
          </div>
        </SidebarGroupLabel>
        <CollapsibleContent className="">
          <SidebarMenu>
            {projects.map((project) => (
                <SidebarMenuItem key={project.name}>
                  <SidebarMenuButton asChild tooltip={project.name} className="text-neutral-500 text-xs h-8 font-medium data-[active=true]:border-neutral-300 hover:border hover:border-neutral-300 data-[active=true]:text-neutral-600 hover:text-neutral-600">
                    <a href={project.url}>
                      <div className={`flex aspect-square size-4 items-center justify-center p-0.5 text-white rounded ${project.color ?? 'bg-neutral-300/50'}`}>

                      <project.icon className="!size-2.5" />
                      </div>
                      <span className="tracking-tight">{project.name}</span>
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
