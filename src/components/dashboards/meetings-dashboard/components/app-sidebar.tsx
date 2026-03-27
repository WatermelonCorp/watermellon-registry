"use client";
import * as React from "react";
import {
  IconLayoutDashboard,
  IconBuilding,
  IconUsers,
  IconBriefcase,
  IconCheckbox,
  IconCalendar,
  IconBolt,
  IconFileText,
  IconChartBar,
  IconGitBranch,
  IconSettings,
  IconPlus,
  IconMinus,
  IconChevronDown,
  IconSparkles,
  IconMessage,
  IconCheck,
} from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const data = {
  user: {
    name: "Stephen S.",
    email: "stephen@srotimi.design",
    avatar: "/avatars/stephen.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconLayoutDashboard,
    },
    {
      title: "Companies",
      url: "/companies",
      icon: IconBuilding,
    },
    {
      title: "Contacts",
      url: "/contacts",
      icon: IconUsers,
    },
    {
      title: "Deals",
      url: "/deals",
      icon: IconBriefcase,
    },
    {
      title: "Tasks",
      url: "/tasks",
      icon: IconCheckbox,
    },
    {
      title: "Meetings",
      url: "/dashboard/meetings",
      icon: IconCalendar,
      isActive: true,
    },
  ],
  insightAndControl: [
    {
      title: "Activities",
      url: "#",
      icon: IconBolt,
    },
    {
      title: "Reports",
      url: "#",
      icon: IconFileText,
    },
    {
      title: "Analytics",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "Workflows",
      url: "#",
      icon: IconGitBranch,
    },
  ],
  system: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
  ],
  favorites: [
    {
      title: "Stripe",
      url: "#",
      icon: "/icons/stripe.png",
      color: "bg-indigo-600",
    },
    {
      title: "Dzen.ru",
      url: "#",
      icon: "/icons/dzen.png",
      color: "bg-black",
    },
    {
      title: "Patreon",
      url: "#",
      icon: "/icons/patreon.png",
      color: "bg-orange-400",
    },
  ],
  recentChats: [
    {
      id: "1",
      title: "Email outreach to war...",
      url: "#",
      icon: IconMessage,
    },
    {
      id: "2",
      title: "Email outreach to war...",
      url: "#",
      icon: IconMessage,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [openInsight, setOpenInsight] = React.useState(true);
  const [openSystem, setOpenSystem] = React.useState(true);
  const [openFavorites, setOpenFavorites] = React.useState(true);
  const [openRecent, setOpenRecent] = React.useState(true);
  return (
    <Sidebar
      {...props}
      className="relative h-full border-none! **:data-[slot=sidebar-container]:relative **:data-[slot=sidebar-container]:h-full **:data-[slot=sidebar-container]:w-(--sidebar-width) **:data-[slot=sidebar-inner]:h-full **:data-[slot=sidebar-inner]:rounded-xl **:data-[slot=sidebar-inner]:bg-neutral-200/50 **:data-[slot=sidebar-inner]:dark:bg-neutral-900 **:data-[slot=sidebar-gap]:hidden"
    >
      <SidebarHeader className="h-14">
        <div className="flex items-center justify-between px-2 pt-1">
          <SidebarMenuButton
            size="lg"
            className="hover:bg-transparent px-2 transition-colors outline-none focus-visible:ring-0"
          >
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center bg-indigo-600 rounded-full transition-colors">
                <div className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin-slow" />
              </div>
              <span className="font-semibold text-xl tracking-tight text-neutral-800 dark:text-neutral-100 italic">
                OceanLabs
              </span>
            </div>
          </SidebarMenuButton>
        </div>
      </SidebarHeader>

      <SidebarContent className="gap-0 no-scrollbar">
        <SidebarGroup>
          <SidebarMenu className="px-2 pt-2 gap-1">
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={item.isActive}
                  className="h-9 px-3 rounded-lg text-neutral-500 dark:text-neutral-300 font-medium text-[13px] tracking-tight data-[active=true]:bg-black data-[active=true]:text-white dark:data-[active=true]:bg-white dark:data-[active=true]:text-black hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60 transition-colors outline-none focus-visible:ring-0"
                >
                  <item.icon className="size-[1.1rem]!" />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <Collapsible open={openInsight} onOpenChange={setOpenInsight}>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="px-3 pl-3.5 text-[12px] font-medium tracking-tight text-neutral-400 uppercase flex items-center justify-between cursor-pointer">
                Insight & Control
                <IconChevronDown
                  className={`size-3 transition-transform ${openInsight ? "" : "-rotate-180"}`}
                />
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent className="mt-1.5">
                <SidebarMenu className="px-2 gap-0.5">
                  {data.insightAndControl.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton className="h-9 px-2 rounded-lg text-neutral-500 dark:text-neutral-300 font-medium text-[13px] hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60 transition-colors outline-none focus-visible:ring-0">
                        <item.icon className="size-[1.1rem]!" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        <SidebarGroup>
          <Collapsible open={openSystem} onOpenChange={setOpenSystem}>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="px-3 pl-3.5 text-[12px] font-medium tracking-tight text-neutral-400 uppercase flex items-center justify-between cursor-pointer">
                System
                <IconChevronDown
                  className={`size-3 transition-transform ${openSystem ? "" : "-rotate-180"}`}
                />
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent className="mt-1.5">
                <SidebarMenu className="px-2 gap-0.5">
                  {data.system.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton className="h-9 px-2 rounded-lg text-neutral-500 dark:text-neutral-300 font-medium text-[13px] hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60 transition-colors outline-none focus-visible:ring-0">
                        <item.icon className="size-[1.1rem]!" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        <SidebarGroup>
          <Collapsible open={openFavorites} onOpenChange={setOpenFavorites}>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="px-3 pl-3.5 text-[12px] font-medium tracking-tight text-neutral-400 uppercase flex items-center justify-between cursor-pointer">
                Favorites
                <IconChevronDown
                  className={`size-3 transition-transform ${openFavorites ? "" : "-rotate-180"}`}
                />
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent className="mt-1.5">
                <SidebarMenu className="px-1 gap-0.5">
                  {data.favorites.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton className="h-9 px-2 rounded-lg text-neutral-500 dark:text-neutral-300 font-medium text-[13px] hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60 transition-colors outline-none focus-visible:ring-0">
                        <div
                          className={`size-5 rounded-sm flex items-center justify-center text-[10px] text-white font-semibold shadow-sm ${item.color} transition-colors`}
                        >
                          {item.title[0]}
                        </div>
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                  <SidebarMenuItem>
                    <SidebarMenuButton className="h-9 px-2 text-neutral-500 font-medium text-[13px] hover:bg-neutral-200/40 dark:hover:bg-neutral-800/40 transition-colors outline-none focus-visible:ring-0">
                      <span className="pl-2">See More</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        <SidebarGroup>
          <Collapsible open={openRecent} onOpenChange={setOpenRecent}>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="px-3 pl-3.5 text-[12px] font-medium tracking-tight text-neutral-400 uppercase flex items-center justify-between cursor-pointer">
                Recent Chats
                <div className="flex items-center gap-1">
                  {openRecent ? (
                    <IconPlus className="size-3.5" strokeWidth={2.5} />
                  ) : (
                    <IconMinus className="size-3.5" strokeWidth={2.5} />
                  )}
                </div>
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent className="mt-1.5">
                <SidebarMenu className="px-2 gap-0.5">
                  {data.recentChats.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton className="h-9 px-2 rounded-lg text-neutral-500 dark:text-neutral-300 font-medium text-[13px] hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60 transition-colors outline-none focus-visible:ring-0">
                        <item.icon className="size-[1.1rem]!" />
                        <span className="truncate">{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="rounded-2xl bg-white dark:bg-neutral-900 p-4 flex flex-col gap-4 border border-neutral-200 dark:border-neutral-800 shadow">
          <div className="space-y-1">
            <h4 className="text-[14px] font-normal tracking-tight text-neutral-500 dark:text-neutral-300">
              Upgrade to Pro to get the Latest Features
            </h4>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="h-10 flex items-center justify-center gap-2 tracking-tight bg-neutral-100 dark:bg-neutral-800 py-2.5 rounded-xl text-[14px] text-neutral-500 dark:text-neutral-300 font-medium border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors shadow-sm hover:shadow-md outline-none focus-visible:ring-0">
                <IconSparkles className="size-4 fill-indigo-600 dark:fill-indigo-400 transition-colors" />
                Upgrade to Pro
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <IconSparkles className="size-5 text-indigo-600 fill-indigo-600" />
                  OceanLabs Pro
                </DialogTitle>
                <DialogDescription>
                  Unlock the full potential of your workflow with advanced
                  features and unlimited possibilities.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <div className="space-y-2">
                  <h5 className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">
                    Pro Features:
                  </h5>
                  <ul className="space-y-2">
                    {[
                      "Unlimited Tasks & Projects",
                      "Advanced CRM Integration",
                      "Custom Analytics Dashboards",
                      "Priority 24/7 Support",
                      "AI-Powered Insights",
                    ].map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400"
                      >
                        <IconCheck
                          className="size-4 text-green-500"
                          strokeWidth={3}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-800/50 p-4 rounded-xl border border-neutral-100 dark:border-neutral-700 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Starting at
                    </p>
                    <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                      $19
                      <span className="text-sm font-normal text-neutral-500">
                        /mo
                      </span>
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-500/20"
                  >
                    Save 20% yearly
                  </Badge>
                </div>
              </div>
              <DialogFooter className="flex-col sm:flex-col gap-2">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600 border-none rounded-xl h-11 transition-colors outline-none focus-visible:ring-0">
                  Upgrade Now
                </Button>
                <p className="text-[11px] text-center text-neutral-400">
                  7-day free trial. No credit card required.
                </p>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
