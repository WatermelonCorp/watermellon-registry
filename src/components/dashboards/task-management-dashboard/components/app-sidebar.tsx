"use client"

import * as React from "react"
import { IconDots, IconSun, IconMoon } from "@tabler/icons-react"

import { useTheme } from "next-themes"
import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "./ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { data } from "../data"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const activeTeam = data.teams[0]

  const navSecondaryWithActions = data.navSecondary.map((item) => {
    if (item.title === "Appearance") {
      return {
        ...item,
        rightIcon: mounted ? (resolvedTheme === "dark" ? IconSun : IconMoon) : item.rightIcon,
        onClick: () => {
          setTheme(resolvedTheme === "dark" ? "light" : "dark")
        },
      }
    }
    return item
  })

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader className="gap-4 p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-black text-white">
              <span className="text-xs font-bold">O</span>
            </div>
            <span className="text-lg font-serif">OceanLabs</span>
          </div>
          <SidebarTrigger className="-mr-1 ml-auto hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-all active:scale-[0.98]" />
        </div>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="border bg-white dark:bg-neutral-900 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all active:scale-[0.98]">
              <div className="flex w-full items-center">
                <div className="flex aspect-square size-5 items-center justify-center rounded bg-linear-to-br from-orange-400 to-rose-400 text-white">
                  {/* Team Logo Placeholder */}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight ml-2">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-semibold">{activeTeam.name}</span>
                    <span className="rounded bg-indigo-100 px-1 py-0.5 text-[10px] font-bold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                      {activeTeam.plan}
                    </span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="ml-auto p-1.5 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-md transition-colors shrink-0 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300">
                      <IconDots className="size-3.5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Workspace Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Switch Workspace</DropdownMenuItem>
                    <DropdownMenuItem>Workspace Settings</DropdownMenuItem>
                    <DropdownMenuItem>Manage Subscriptions</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950/50">Leave Workspace</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <NavMain items={data.navMain} />
        {/* <NavMain label="Applications" items={data.applications} /> */}
        <NavSecondary items={navSecondaryWithActions} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
