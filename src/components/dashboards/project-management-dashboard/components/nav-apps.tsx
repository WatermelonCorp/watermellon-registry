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
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function NavApps({
  apps,
}: {
  apps: {
    name: string
    url: string
    icon: LucideIcon
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
              <span>Apps</span>
            </CollapsibleTrigger>
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Plus className="size-3.5 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-100 cursor-pointer transition-colors outline-none focus-visible:ring-0" />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Install New App</DialogTitle>
                  </DialogHeader>
                  <div className="p-4 space-y-4">
                    <p className="text-sm text-neutral-500">Discover and install new applications to your workspace.</p>
                  </div>
                </DialogContent>
              </Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <GripVertical className="size-3.5 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-100 cursor-pointer transition-colors outline-none focus-visible:ring-0" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Manage Apps</DropdownMenuItem>
                  <DropdownMenuItem>App Store</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarMenu>
            {apps.map((app) => (
              <SidebarMenuItem key={app.name} className="group/nav-item">
                <SidebarMenuButton asChild tooltip={app.name} className="text-neutral-500 dark:text-neutral-400 text-xs h-8 font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800/50 data-[active=true]:bg-neutral-100 dark:data-[active=true]:bg-neutral-800/50 data-[active=true]:text-neutral-600 dark:data-[active=true]:text-neutral-300 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors outline-none focus-visible:ring-0">
                  <a href={app.isDisabled ? "#" : app.url} onClick={(e) => {
                    if (app.isDisabled) {
                      e.preventDefault();
                    }
                  }}>
                    <app.icon className="transition-colors group-hover/nav-item:text-neutral-800 dark:group-hover/nav-item:text-neutral-200" />
                    <span className="tracking-tight">{app.name}</span>
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

