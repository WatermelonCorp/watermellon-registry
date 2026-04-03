"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavApps } from "./nav-products";
import { NavSecondary } from "./nav-options";

import {
  IconHome,
  IconChecklist,
  IconNews,
  IconHeartbeat,
  IconTargetArrow,
  IconCalendarEvent,
  IconLayoutDashboard,
  IconUsers,
  IconBuilding,
  IconBroadcast,
  IconBriefcase,
  IconSchool,
  IconSettings,
  IconPlayerRecord,
} from "@tabler/icons-react";
import { TeamSwitcher } from "./team-switcher";
import { BellIcon, Search, User, Settings, CreditCard, CheckCircle2, MessageSquare, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "cmdk";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export const data = {
  teams: [
    {
      name: "Watermelon",
      logo: IconHome,
      plan: "Free",
    },
  ],

  navMain: [
    {
      title: "Home",
      url: "/home",
      icon: IconHome,
    },
    {
      title: "Tasks",
      url: "/tasks",
      icon: IconChecklist,
      isActive: true,
    },
    {
      title: "Feed",
      url: "/feed",
      icon: IconNews,
    },
  ],

  apps: [
    {
      title: "Health",
      url: "/health",
      icon: IconHeartbeat,
      className: "text-green-500",
    },
    {
      title: "Opportunities",
      url: "/opportunities",
      icon: IconTargetArrow,
      className: "text-blue-500",
    },
    {
      title: "Meetings",
      url: "/meetings",
      icon: IconCalendarEvent,
      className: "text-purple-500",
    },
    {
      title: "Dashboards",
      url: "/dashboards",
      icon: IconLayoutDashboard,
      className: "text-yellow-500",
    },
  ],

  records: [
    {
      title: "People",
      url: "/people",
      icon: IconUsers,
    },
    {
      title: "Companies",
      url: "/companies",
      icon: IconBuilding,
    },
    {
      title: "Recordings",
      url: "/recordings",
      icon: IconPlayerRecord,
    },
  ],

  browse: [
    {
      title: "Broadcasts",
      url: "/broadcasts",
      icon: IconBroadcast,
    },
    {
      title: "Jobs",
      url: "/jobs",
      icon: IconBriefcase,
    },
    {
      title: "Skills",
      url: "/skills",
      icon: IconSchool,
    },
  ],

  options: [
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2 ">
            <TeamSwitcher teams={data.teams} />

            <div className="flex items-center justify-center text-muted-foreground group-data-[collapsible=icon]:hidden">
              <Button
                variant="ghost"
                size="sm"
                className=" p-1 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => setOpen(true)}
              >
                <Search className="size-4" />
              </Button>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="p-0 overflow-hidden sm:max-w-2xl border-none shadow-2xl bg-transparent">
                  <DialogHeader className="sr-only">
                    <DialogTitle>Search</DialogTitle>
                    <DialogDescription>Search for tasks, dashboards, and more.</DialogDescription>
                  </DialogHeader>
                  <Command className="rounded-xl border shadow-md bg-popover text-popover-foreground overflow-hidden">
                    <div className="flex items-center border-b px-3 h-12" cmdk-input-wrapper="">
                      <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                      <CommandInput
                        placeholder="Type a command or search..."
                        className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    <CommandList className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
                      <CommandEmpty className="py-6 text-center text-sm">No results found.</CommandEmpty>
                      <CommandGroup heading="Suggestions" className="overflow-hidden text-foreground **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground">
                        <CommandItem className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:bg-muted/50 transition-colors">
                          <IconChecklist className="mr-2 h-4 w-4" />
                          <span>Tasks</span>
                        </CommandItem>
                        <CommandItem className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:bg-muted/50 transition-colors">
                          <IconLayoutDashboard className="mr-2 h-4 w-4" />
                          <span>Dashboards</span>
                        </CommandItem>
                        <CommandItem className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:bg-muted/50 transition-colors">
                          <IconCalendarEvent className="mr-2 h-4 w-4" />
                          <span>Calendar</span>
                        </CommandItem>
                      </CommandGroup>
                      <CommandSeparator className="-mx-1 h-px bg-border my-2" />
                      <CommandGroup heading="Settings" className="overflow-hidden text-foreground **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground">
                        <CommandItem className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:bg-muted/50 transition-colors">
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </CommandItem>
                        <CommandItem className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:bg-muted/50 transition-colors">
                          <CreditCard className="mr-2 h-4 w-4" />
                          <span>Billing</span>
                        </CommandItem>
                        <CommandItem className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 cursor-pointer hover:bg-muted/50 transition-colors">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </DialogContent>
              </Dialog>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="relative">
                      <BellIcon className="size-4" />
                      <span className="absolute -top-1 -right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                      </span>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="start">
                  <PopoverHeader className="px-4 py-3 border-b border-border/50">
                    <PopoverTitle className="text-sm font-semibold flex items-center justify-between">
                      Notifications
                      <Badge variant="outline" className="text-[10px] font-bold px-1.5 py-0">3 New</Badge>
                    </PopoverTitle>
                  </PopoverHeader>
                  <ScrollArea className="h-[300px]">
                    <div className="flex flex-col">
                      <div className="flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors cursor-pointer border-b border-border/30">
                        <div className="size-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="size-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="text-xs font-medium">Task "API Integration" completed</p>
                          <p className="text-[10px] text-muted-foreground">2 minutes ago • Project Alpha</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors cursor-pointer border-b border-border/30">
                        <div className="size-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shrink-0">
                          <MessageSquare className="size-4 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="text-xs font-medium">New comment on "Design Review"</p>
                          <p className="text-[10px] text-muted-foreground">1 hour ago • By Sarah Miller</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                        <div className="size-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                          <AlertCircle className="size-4 text-red-600 dark:text-red-400" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="text-xs font-medium">Deadline approaching: "Sprint 4"</p>
                          <p className="text-[10px] text-muted-foreground">Yesterday • Urgent action required</p>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                  <div className="p-3 bg-muted/30 border-t border-border/50 text-center">
                    <Button variant="link" size="sm" className="h-auto p-0 text-[11px] font-semibold text-blue-600">
                      View all notifications
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavApps items={data.apps} />
        <NavSecondary items={data.records} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Options" className=" data-[active=true]:bg-white dark:data-[active=true]:bg-black data-[active=true]:text-zinc-900 dark:data-[active=true]:text-white data-[active=true]:hover:bg-zinc-100 dark:data-[active=true]:hover:bg-zinc-800 data-[active=true]:hover:text-zinc-900 data-[active=true]:shadow-sm rounded-none transition-colors outline-none focus-visible:ring-0">
            <IconSettings />
            <span>Options</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
}
