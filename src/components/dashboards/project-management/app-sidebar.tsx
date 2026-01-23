"use client";

import * as React from "react";
import {
  ArrowLeftToLine,
  Calendar,
  ChartNoAxesCombined,
  Command,
  FileText,
  Frame,
  Home,
  LifeBuoy,
  ListTodo,
  Map,
  PieChart,
  Send,
  Settings,
  Rocket,
  Trello,
  Figma,
  Users,
  Zap,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { SearchForm } from "./search-form";
import { NavSupport } from "./nav-support";
import { NavApps } from "./nav-apps";
import { NavManagement } from "./nav-management";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "#",
      icon: Home,
    },
    {
      title: "Tasks",
      url: "#",
      icon: ListTodo,
    },
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Team",
      url: "#",
      icon: Users,
    },
    {
      title: "Docs",
      url: "#",
      icon: FileText,
    },
    {
      title: "Automations",
      url: "#",
      icon: Zap,
    },
    {
      title: "Reporting",
      url: "#",
      icon: ChartNoAxesCombined,
    },
  ],
  projects: [
    {
      name: "Atlas CRM Revamp",
      url: "#",
      icon: Frame,
      color: "bg-red-500",
    },
    {
      name: "Nimbus Dashboard",
      url: "#",
      icon: PieChart,
      color: "bg-green-500",
    },
    {
      name: "Orion API Gateway",
      url: "#",
      icon: Map,
      color: "bg-blue-500",
    },
    {
      name: "Helio Task System",
      url: "#",
      icon: ListTodo,
      color: "bg-yellow-500",
    },
  ],
  management: [],
  support: [
    {
      name: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
    {
      name: "Releases",
      url: "#",
      icon: Rocket,
    },
  ],
  apps: [
    {
      name: "Trello",
      url: "#",
      icon: Trello,
    },
    {
      name: "Figma",
      url: "#",
      icon: Figma,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { toggleSidebar } = useSidebar();
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="bg-white border border-neutral-300"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <Command className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate">Courtney Henry</span>
                <span className="truncate text-[10px] mt-0.5 text-neutral-500">
                  The Walt Disney Company
                </span>
              </div>
              <ArrowLeftToLine
                onClick={() => {
                  toggleSidebar();
                }}
                className="size-4 text-muted-foreground"
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="py-3 gap-0">
        <SearchForm />
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavManagement management={data.management} />
        <NavSupport support={data.support} />
        <NavApps apps={data.apps} />
      </SidebarContent>
    </Sidebar>
  );
}
