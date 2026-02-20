"use client"
import * as React from "react"
import {
  Activity,
  Bot,
  Users,
  Network,
  Cpu,
  Zap,
  CalendarClock,
  ListOrdered,
  LineChart,
  AlertOctagon,
  GitPullRequestArrow,
  Grid3x3,
  Settings,
  HelpCircle,
  ChevronRight,
  ChevronsUpDown,
  ChevronDown
} from "lucide-react"
import { useLocation } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu"
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarTrigger,
} from "./ui/sidebar"
import { SearchForm } from "./search-form"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible"

const data = {
  user: {
    name: "Stephen S.",
    email: "stephen@srotimi.design",
    avatar: "/avatars/stephen.jpg",
  },
  navMain: [
    {
      title: "Activity stream",
      url: "/active-streams",
      icon: Activity,
      isActive: true,
    },
    {
      title: "Live operations",
      url: "#",
      icon: Bot,
      isDisabled: true,
    },
    {
      title: "Participants",
      url: "#",
      icon: Users,
      isDisabled: true,
    },
    {
      title: "System logic",
      url: "#",
      icon: Network,
      isDisabled: true,
      items: [
        {
          title: "Rules engine",
          url: "#",
          icon: Cpu,
          isDisabled: true,
        },
        {
          title: "Triggers",
          url: "#",
          icon: Zap,
          isDisabled: true,
        },
        {
          title: "Schedules",
          url: "#",
          icon: CalendarClock,
          isDisabled: true,
        },
      ],
    },
    {
      title: "Action queue",
      url: "#",
      icon: ListOrdered,
      isDisabled: true,
    },
    {
      title: "Insights",
      url: "#",
      icon: LineChart,
      isDisabled: true,
    },
  ],
  pinnedMonitors: [
    {
      title: "SLA breaches",
      url: "#",
      icon: AlertOctagon,
      isDisabled: true,
    },
    {
      title: "Escalated requests",
      url: "#",
      icon: GitPullRequestArrow,
      isDisabled: true,
    },
    {
      title: "High load zones",
      url: "#",
      icon: Grid3x3,
      isDisabled: true,
    },
  ],
  operatorConsole: [
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      isDisabled: true,
    },
    {
      title: "Help Center",
      url: "#",
      icon: HelpCircle,
      isDisabled: true,
    },
  ],
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onNavigate?: (view: string) => void;
  currentView?: string;
}

export function AppSidebar({ onNavigate, currentView, ...props }: AppSidebarProps) {
  const [openPinned, setOpenPinned] = React.useState(true)
  const [openOperator, setOpenOperator] = React.useState(true)
  const location = useLocation()
  const pathname = location.pathname
  return (
    <Sidebar {...props}>
      <SidebarHeader className="px-0 pt-0 border-b">
        <SidebarMenu className="border-b h-15 pl-2.5 justify-center">
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:bg-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-md shadow-sm">
                    <img src="/logo.png" alt="Logo" width={50} height={50} className="rounded-md" />
                  </div>
                  <span className="font-semibold text-base">OceanLabs</span>
                </div>
                <div className="flex items-center justify-center size-8 rounded-md bg-[#f8f8f8] dark:bg-neutral-900 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.08),inset_-2px_-2px_5px_rgba(255,255,255,1)] dark:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.4),inset_-2px_-2px_5px_rgba(255,255,255,0.05)] transition-colors">
                  <SidebarTrigger className="text-neutral-500 dark:text-neutral-400" />
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm />
      </SidebarHeader>

      <SidebarContent className="gap-0">
        <SidebarGroup>
          <SidebarMenu className="pl-2.5 pt-2">
            {data.navMain.map((item) => (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  {item.items ? (
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title} className="h-10 px-2.5 rounded-lg text-neutral-500 dark:text-neutral-400 font-normal text-[15.5px] tracking-tight data-[active=true]:text-white! data-[active=true]:bg-orange-500 data-[active=true]:shadow-[inset_2px_4px_8px_rgba(255,255,255,0.4),inset_-2px_-4px_8px_rgba(0,0,0,0.3)] hover:bg-[#f8f8f8] dark:hover:bg-neutral-800 hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.08),inset_-2px_-2px_5px_rgba(255,255,255,1)] dark:hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.4),inset_-2px_-2px_5px_rgba(255,255,255,0.05)] hover:text-neutral-500! dark:hover:text-neutral-400!">
                          {item.icon && <item.icon className="!size-5" />}
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname === subItem.url}
                                className="h-10 px-2.5 rounded-lg text-neutral-500 dark:text-neutral-400 font-normal text-[15.5px] tracking-tight data-[active=true]:text-white! data-[active=true]:bg-orange-500 data-[active=true]:shadow-[inset_2px_4px_8px_rgba(255,255,255,0.4),inset_-2px_-4px_8px_rgba(0,0,0,0.3)] hover:bg-[#f8f8f8] dark:hover:bg-neutral-800 hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.08),inset_-2px_-2px_5px_rgba(255,255,255,1)] dark:hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.4),inset_-2px_-2px_5px_rgba(255,255,255,0.05)] hover:text-neutral-500! dark:hover:text-neutral-400!"
                              >
                                <a href={subItem.url} onClick={(e) => subItem.isDisabled && e.preventDefault()}>
                                  {subItem.icon && <subItem.icon className="size-5! text-neutral-500! dark:text-neutral-400! data-[active=true]:text-white!" />}
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={currentView ? (item.title === "Activity stream" && currentView === "Activity Stream") : item.isActive}
                      className="h-10 px-2.5 rounded-lg text-neutral-500 dark:text-neutral-400 font-normal text-[15.5px] tracking-tight data-[active=true]:text-white! data-[active=true]:bg-orange-500 data-[active=true]:shadow-[inset_2px_4px_8px_rgba(255,255,255,0.4),inset_-2px_-4px_8px_rgba(0,0,0,0.3)] hover:bg-[#f8f8f8] dark:hover:bg-neutral-800 hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.08),inset_-2px_-2px_5px_rgba(255,255,255,1)] dark:hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.4),inset_-2px_-2px_5px_rgba(255,255,255,0.05)] hover:text-neutral-500 dark:hover:text-neutral-400"
                    >
                      <a
                        href={item.url}
                        onClick={(e) => {
                          if (item.isDisabled) {
                            e.preventDefault()
                            return
                          }
                          if (item.title === "Activity stream" && onNavigate) {
                            e.preventDefault()
                            onNavigate("Activity Stream")
                          }
                        }}
                      >
                        {item.icon && <item.icon className="size-5!" />}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent className="px-2">
            <Collapsible open={openPinned} onOpenChange={setOpenPinned}>
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="cursor-pointer" asChild>
                  <div className="flex items-center justify-between gap-1.5 text-neutral-400! dark:text-neutral-500! font-normal tracking-tight text-[15px]">
                    Pinned monitors <ChevronDown className={`size-3.5! transition-transform ${openPinned ? "rotate-180" : ""}`} />
                  </div>
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenu className="px-1.5">
                  {data.pinnedMonitors.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.url}
                        className="h-9 rounded-sm hover:bg-[#f8f8f8] dark:hover:bg-neutral-800 hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.08),inset_-2px_-2px_5px_rgba(255,255,255,1)] dark:hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.4),inset_-2px_-2px_5px_rgba(255,255,255,0.05)] hover:text-neutral-500 dark:hover:text-neutral-400 transition-all duration-200 data-[active=true]:text-white! data-[active=true]:bg-orange-500 data-[active=true]:shadow-[inset_2px_4px_8px_rgba(255,255,255,0.4),inset_-2px_-4px_8px_rgba(0,0,0,0.3)] text-neutral-500 dark:text-neutral-400 font-normal tracking-tight text-[15px]"
                      >
                        <a href={item.url} onClick={(e) => item.isDisabled && e.preventDefault()}>
                          <item.icon className="size-5!" />
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
          <SidebarGroupContent className="px-2.5">
            <Collapsible open={openOperator} onOpenChange={setOpenOperator}>
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="cursor-pointer" asChild>
                  <div className="flex items-center justify-between gap-1.5 text-neutral-400! dark:text-neutral-500! font-normal tracking-tight text-[15px]">
                    Operator console <ChevronDown className={`size-3.5! transition-transform ${openOperator ? "rotate-180" : ""}`} />
                  </div>
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenu className="px-1.5">
                  {data.operatorConsole.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.url}
                        className="h-9 rounded-sm hover:bg-[#f8f8f8] dark:hover:bg-neutral-800 hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.08),inset_-2px_-2px_5px_rgba(255,255,255,1)] dark:hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.4),inset_-2px_-2px_5px_rgba(255,255,255,0.05)] hover:text-neutral-500 dark:hover:text-neutral-400 transition-all duration-200 data-[active=true]:text-white! data-[active=true]:bg-orange-500 data-[active=true]:shadow-[inset_2px_4px_8px_rgba(255,255,255,0.4),inset_-2px_-4px_8px_rgba(0,0,0,0.3)] text-neutral-500 dark:text-neutral-400 font-normal tracking-tight text-[15px]"
                      >
                        <a href={item.url} onClick={(e) => item.isDisabled && e.preventDefault()}>
                          <item.icon className="size-5!" />
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

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-full">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                      className="grayscale"
                    />
                    <AvatarFallback className="rounded-lg">SS</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{data.user.name}</span>
                    <span className="truncate text-xs">{data.user.email}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
