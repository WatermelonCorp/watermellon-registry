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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export function NavProjects({
  projects,
}: {
  projects: {
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
              <span>Projects</span>
            </CollapsibleTrigger>
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Plus className="size-3.5 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-100 cursor-pointer transition-all duration-200 hover:scale-[1.05] active:scale-90" />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Project</DialogTitle>
                  </DialogHeader>
                  <div className="p-4 space-y-4">
                    <p className="text-sm text-neutral-500">Configure your new project workspace here.</p>
                  </div>
                </DialogContent>
              </Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <GripVertical className="size-3.5 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-100 cursor-pointer transition-all duration-200 hover:scale-[1.05] active:scale-90" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Reorder Projects</DropdownMenuItem>
                  <DropdownMenuItem>Hide Section</DropdownMenuItem>
                  <DropdownMenuItem>Manage Sidebar</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </SidebarGroupLabel>
        <CollapsibleContent className="">
          <SidebarMenu>
            {projects.map((project) => (
              <SidebarMenuItem key={project.name} className="group/nav-item">
                <SidebarMenuButton asChild tooltip={project.name} className="text-neutral-500 dark:text-neutral-400 text-xs h-8 font-medium data-[active=true]:border-border hover:border hover:border-border data-[active=true]:text-neutral-600 dark:data-[active=true]:text-neutral-300 hover:text-neutral-600 dark:hover:text-neutral-300 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                  <a href={project.isDisabled ? "#" : project.url} onClick={(e) => {
                    if (project.isDisabled) {
                      e.preventDefault();
                    }
                  }}>
                    <div className={`flex aspect-square size-4 items-center justify-center p-0.5 text-white rounded transition-transform duration-300 group-hover/nav-item:scale-[1.05] ${project.color ?? 'bg-neutral-300/50'}`}>
                      <project.icon className="size-2.5!" />
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