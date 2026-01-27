"use client"

import * as React from "react"
import {
  BarChart3,
  Calendar,
  ChevronDown,
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
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
// import { usePathname } from "@/lib/next-compat"

const data = {
  quickActions: [
    { title: "Explore", url: "#", icon: Compass },
    { title: "Settings", url: "#", icon: Settings },
    { title: "Resources", url: "#", icon: Paperclip },
  ],
  mainNav: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Timelines", url: "/dashboard/timeline", icon: Calendar },
  ],
  navMain: [
    {
      title: "Reports",
      url: "#",
      icon: FileText,
      items: [
        { title: "All Reports", url: "#", icon: Files },
        { title: "Performance Trends", url: "#", icon: LineChart },
        { title: "Growth Scenarios", url: "#", icon: TrendingUp },
        { title: "Project Impact", url: "#", icon: Pencil },
        { title: "Hiring Threshold", url: "#", icon: BarChart3 },
      ],
    },
    { title: "Workflows", url: "#", icon: RefreshCw },
    { title: "Projects", url: "#", icon: FolderKanban },
    { title: "Documents", url: "#", icon: FileText },
    { title: "Locations", url: "#", icon: MapPin },
    { title: "Action Items", url: "#", icon: Sparkles },
  ],
  navSecondary: [
    { title: "Preferences", url: "#", icon: Settings },
    { title: "Invite Members", url: "#", icon: UserPlus },
    { title: "Help & Support", url: "#", icon: CircleHelp },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // const pathname = usePathname()
  const pathname = "/dashboard"
  return (
    <Sidebar variant="inset" {...props} className="px-3">
      <SidebarHeader className="px-0.5 pt-0 ">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex w-full items-center justify-between">
              <SidebarMenuButton className="flex-1 justify-start px-0 hover:bg-transparent">
                <div className="flex items-center gap-2">
                  <div className="flex size-6 items-center justify-center rounded bg-orange-500 text-white font-semibold">
                    A
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold">Acme inc</span>
                    <ChevronDown className="size-3 opacity-50" />
                  </div>
                </div>
              </SidebarMenuButton>
              <div className="flex items-center gap-1.5">
                <MoreHorizontal className="size-4 opacity-50" />
                <SidebarTrigger className="size-4 opacity-50" />
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>

        <Button className="w-full gap-1 flex justify-center items-center" variant="secondary">
          <Plus className="size-3.5" />
          New timeline
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="px-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {data.quickActions.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <a href={item.url}>
                      <item.icon className={`size-4 ${pathname === item.url ? "text-white" : "text-neutral-500"}`} />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="border-y px-0 py-4">
          <SidebarGroupContent>
            <SidebarMenu>
              {data.mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <a href={item.url}>
                      <item.icon className={`size-4 ${pathname === item.url ? "text-white" : "text-neutral-500"}`} />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="px-0">
          <SidebarMenu className="gap-1">
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={pathname === item.url}>
                  <a href={item.url} className="font-medium">
                    <item.icon className={`size-4 ${pathname === item.url ? "text-white" : "text-neutral-500"}`} />
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub className="ml-2 border-l-0 px-1.5 gap-1 mb-1">
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                          <a href={subItem.url}>
                            <subItem.icon className={`size-4 ${pathname === subItem.url ? "text-white" : "!text-neutral-500"}`} />
                            {subItem.title}
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

      <SidebarFooter className="px-0">
        <SidebarMenu>
          {data.navSecondary.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={pathname === item.url}>
                <a href={item.url}>
                  <item.icon className={`size-4 ${pathname === item.url ? "text-white" : "text-neutral-500"}`} />
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
