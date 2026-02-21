"use client"
import * as React from "react"
import { Bolt, ChevronDown, ChevronUp, Minus, PlusIcon, ShieldCheck, X } from "lucide-react"

import { SearchForm } from "./search-form"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "./ui/sidebar"
import { sidebarData } from "../data"
import { Button } from "./ui/button"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onNavigate?: (view: string) => void;
  currentView?: string;
}

export function AppSidebar({ onNavigate, currentView, ...props }: AppSidebarProps) {
  const [open, setOpen] = React.useState(true)
  const [openTeam, setOpenTeam] = React.useState(true)

  return (
    <Sidebar {...props}>
      <SidebarHeader className="px-0 pt-0 border-b">
        <SidebarMenu className="border-b h-[4.5rem] px-2 justify-center pt-2.5">
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-600 dark:bg-sidebar-primary text-white dark:text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                    <Bolt className="size-4" strokeWidth={2.5} />
                  </div>
                  <span className="font-medium text-base">OceanLabs</span>
                </div>
                <div className="bg-neutral-100 dark:bg-neutral-800 size-7 flex justify-center items-center rounded-sm"><SidebarTrigger /></div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm />
      </SidebarHeader>

      <SidebarContent className="gap-0">
        <SidebarGroup className="pb-0">
          <SidebarGroupContent >
            <Collapsible open={open} onOpenChange={setOpen}>
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="" asChild>
                  <div className="flex items-center gap-1.5 text-neutral-500!">Main Menu {open ? <ChevronDown className="size-3.5! text" /> : <ChevronUp className="size-3.5!" />}</div>
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenu className="px-2">
                  {sidebarData.mainMenu.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className="h-9 rounded-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 data-[active=true]:bg-neutral-100 dark:data-[active=true]:bg-neutral-800 "
                        isActive={currentView ? item.title === currentView : item.isActive}
                      >
                        <a
                          href={item.url}
                          onClick={(e) => {
                            if (item.isDisabled) {
                              e.preventDefault()
                              return
                            }
                            if (onNavigate) {
                              e.preventDefault()
                              onNavigate(item.title)
                            }
                          }}
                        >
                          <item.icon className="size-4" />
                          {item.title}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <Collapsible open={openTeam} onOpenChange={setOpenTeam}>
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="" asChild>
                  <div className="flex items-center justify-between gap-1.5 text-neutral-500!">Team Management {openTeam ? <PlusIcon className="size-3.5!" /> : <Minus className="size-3.5!" />}</div>
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenu className="px-2">
                  {sidebarData.teamManagement.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className="h-9 rounded-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 data-[active=true]:bg-neutral-100 dark:data-[active=true]:bg-neutral-800"
                        isActive={currentView ? item.title === currentView : false}
                      >
                        <a
                          href={item.url}
                          onClick={(e) => {
                            if (item.isDisabled) {
                              e.preventDefault()
                              return
                            }
                            if (onNavigate) {
                              e.preventDefault()
                              onNavigate(item.title)
                            }
                          }}
                        >
                          <item.icon className="size-4" />
                          {item.title}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="relative overflow-hidden rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 group">
          <div className="flex items-start justify-between mb-4">
            <div className="size-9 rounded-md bg-green-500 flex items-center justify-center shadow-[0_0_10px_rgba(34,197,94,0.5)]">
              <ShieldCheck className="size-5 text-white" strokeWidth={2} />
            </div>
          </div>
          <Button size="icon-xs" className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors rounded-full border-y border-y-neutral-500/40 bg-neutral-500/10 absolute top-2 right-2 hover:bg-neutral-500/15">
            <X className="size-4!" />
          </Button>

          <h3 className="text-neutral-900 dark:text-white font-medium tracking-tight mb-1.5">Increase your security</h3>
          <p className="text-[12px] font-medium  mb-4 text-neutral-500">
            Add a secondary method of verification used during login.
          </p>
          <Button className="w-full h-9 py-2 bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-900 dark:text-white text-xs font-medium rounded-sm transition-colors border border-neutral-200 dark:border-neutral-700 ">
            Enable 2-step verification
          </Button>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
