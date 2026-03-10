"use client"

import * as React from "react"
import {
  BarChart3,
  Calendar,
  CircleHelp,
  Compass,
  FileText,
  Files,
  FolderKanban,
  LayoutDashboard,
  LineChart,
  MapPin,
  MoreHorizontal,
  Paperclip,
  Pencil,
  Plus,
  RefreshCw,
  Settings,
  Sparkles,
  TrendingUp,
  UserPlus,
  Clock,
  BarChart2,
  MessageSquare,
  CheckSquare,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger
} from "./ui/sidebar"
import { Button } from "./ui/button"
import { useLocation } from "react-router-dom"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "./ui/dialog"
import { Input } from "./ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"

const data = {
  quickActions: [
    { title: "Explore", url: "#", icon: Compass, isDisabled: true },
    { title: "Settings", url: "#", icon: Settings, isDisabled: true },
    { title: "Resources", url: "#", icon: Paperclip, isDisabled: true },
  ],
  mainNav: [
    { title: "Dashboard", url: "#", icon: LayoutDashboard, isDisabled: true },
    { title: "Timelines", url: "/dashboard/timeline", icon: Calendar, isActive: true },
  ],
  navMain: [
    {
      title: "Schedule",
      url: "#",
      icon: Clock,
      isDisabled: true,
    },
    {
      title: "Reports",
      url: "#",
      icon: BarChart2,
      isDisabled: true,
      items: [
        { title: "All Reports", url: "#", icon: Files, isDisabled: true },
        { title: "Performance Trends", url: "#", icon: LineChart, isDisabled: true },
        { title: "Growth Scenarios", url: "#", icon: TrendingUp, isDisabled: true },
        { title: "Project Impact", url: "#", icon: Pencil, isDisabled: true },
        { title: "Hiring Threshold", url: "#", icon: BarChart3, isDisabled: true },
      ],
    },
    {
      title: "Messages",
      url: "#",
      icon: MessageSquare,
      isDisabled: true,
    },
    {
      title: "Tasks",
      url: "#",
      icon: CheckSquare,
      isDisabled: true,
    },
    { title: "Workflows", url: "#", icon: RefreshCw, isDisabled: true },
    { title: "Projects", url: "#", icon: FolderKanban, isDisabled: true },
    { title: "Documents", url: "#", icon: FileText, isDisabled: true },
    { title: "Locations", url: "#", icon: MapPin, isDisabled: true },
    { title: "Action Items", url: "#", icon: Sparkles, isDisabled: true },
  ],
  navSecondary: [
    { title: "Preferences", url: "#", icon: Settings, isDisabled: true },
    { title: "Invite Members", url: "#", icon: UserPlus, isDisabled: true },
    { title: "Help & Support", url: "#", icon: CircleHelp, isDisabled: true },
  ],
}

export function AppSidebar({ onNavigate, currentView, ...props }: React.ComponentProps<typeof Sidebar> & { onNavigate?: (view: string) => void; currentView?: string }) {
  const location = useLocation()
  const pathname = location.pathname
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader className="px-4 md:px-0.5 ">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex w-full items-center justify-between">
              <SidebarMenuButton className="flex-1 justify-start px-0 hover:bg-transparent active:bg-transparent">
                <div className="flex items-center gap-2">
                  <div className="flex size-6 items-center justify-center rounded bg-orange-500 text-white font-semibold">
                    A
                  </div>
                  <span className="text-sm font-semibold">Acme inc</span>
                </div>
              </SidebarMenuButton>
              <div className="flex items-center gap-1.5">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <MoreHorizontal className="size-4 text-neutral-500 hover:text-orange-500! cursor-pointer transition-transform duration-300" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Log out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <SidebarTrigger className="size-4 text-neutral-500 hover:text-orange-500! transition-transform duration-300" />
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>

        <Dialog>
          <DialogTrigger render={<Button className="w-full gap-1 flex justify-center items-center shadow-none border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200/10! dark:hover:bg-neutral-700/10" variant="outline" />}>
            <Plus className="size-3.5 text-neutral-500 hover:text-orange-500" />
            New timeline
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Timeline</DialogTitle>
              <DialogDescription>
                Fill in the details for your new timeline.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Input id="name" placeholder="Timeline name..." />
              </div>
            </div>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="px-4 md:px-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {data.quickActions.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <a href={item.url} onClick={(e) => item.isDisabled && e.preventDefault()}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="border-y px-4 md:px-0 py-4">
          <SidebarGroupContent>
            <SidebarMenu>
              {data.mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={currentView ? (item.title === "Timelines" && currentView === "Timeline") : item.isActive}
                  >
                    <a
                      href={item.url}
                      onClick={(e) => {
                        if (item.isDisabled) {
                          e.preventDefault()
                          return
                        }
                        if (item.title === "Timelines" && onNavigate) {
                          e.preventDefault()
                          onNavigate("Timeline")
                        }
                      }}
                    >
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="px-4 md:px-0">
          <SidebarMenu className="gap-1">
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={pathname === item.url} >
                  <a href={item.url} className="font-medium" onClick={(e) => item.isDisabled && e.preventDefault()}>
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub className="ml-2 border-l-0 px-1.5 gap-1 mb-1 group-data-[collapsible=icon]:hidden">
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild isActive={pathname === subItem.url} >
                          <a href={subItem.url} onClick={(e) => subItem.isDisabled && e.preventDefault()}>
                            <subItem.icon className="size-4" />
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-4 md:px-0">
        <SidebarMenu>
          {data.navSecondary.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={pathname === item.url} >
                <a href={item.url} onClick={(e) => item.isDisabled && e.preventDefault()}>
                  <item.icon className="size-4" />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
