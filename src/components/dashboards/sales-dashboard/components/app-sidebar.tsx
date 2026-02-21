"use client";

import * as React from "react";
import {
  Building2,
  GalleryVerticalEnd,
  Kanban,
  TrendingUp,
  Activity,
  Users,
  Mail,
  AlertTriangle,
  HelpCircle,
  UserCheck,
  Briefcase,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { Billing } from "./billing";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "./ui/sidebar";
import { NavReporting } from "./nav-reporting";
import { NavSecondary } from "./nav-secondary";
import { NavTeams } from "./nav-teams";
import { NavPipelines } from "./nav-pipelines";

export const data = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/avatars/john.jpg",
  },
  company: {
    name: "Sales CRM",
    logo: GalleryVerticalEnd,
    plan: "Company Pipeline",
  },
  navMain: [
    {
      title: "Companies",
      url: "#",
      icon: Building2,
      isActive: true,
    },
    {
      title: "Deals Board",
      url: "#",
      icon: Kanban,
    },
    {
      title: "Forecast",
      url: "#",
      icon: TrendingUp,
      isDisabled: true,
    },
    {
      title: "Activities",
      url: "#",
      icon: Activity,
      isDisabled: true,
    },
    {
      title: "Contacts",
      url: "#",
      icon: Users,
      isDisabled: true,
    },
    {
      title: "Email Sequences",
      url: "#",
      icon: Mail,
      isDisabled: true,
    },
  ],
  navSecondary: [
    {
      title: "Invite teammates",
      url: "#",
      icon: Users,
      isDisabled: true,
    },
    {
      title: "Help",
      url: "#",
      icon: HelpCircle,
      isDisabled: true,
    },
  ],
  teams_section: [
    {
      name: "Strategic AEs",
      url: "#",
      icon: UserCheck,
      isDisabled: true,
    },
    {
      name: "Mid Market",
      url: "#",
      icon: Briefcase,
      isDisabled: true,
    },
    {
      name: "SDR Team",
      url: "#",
      icon: Users,
      isDisabled: true,
    },
  ],
  reporting: [
    {
      name: "Q1 Forecast",
      url: "#",
      icon: TrendingUp,
      isDisabled: true,
    },
    {
      name: "Slipping Deals",
      url: "#",
      icon: AlertTriangle,
      isDisabled: true,
    },
  ],
  pipelines: [
    {
      name: "North America",
      url: "#",
      color: "text-yellow-500",
      isDisabled: true,
    },
    {
      name: "EMEA Enterprise",
      url: "#",
      color: "text-pink-500",
      isDisabled: true,
    },
    {
      name: "APAC Expansion",
      url: "#",
      color: "text-blue-500",
      isDisabled: true,
    },
  ],
};

export function AppSidebar({ onNavigate, currentView, ...props }: React.ComponentProps<typeof Sidebar> & { onNavigate?: (view: string) => void; currentView?: string }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b border-neutral-200 dark:border-neutral-800 data-[state=open]:py-1">
        <SidebarMenuButton
          size="lg"
          className="hover:bg-transparent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md border border-neutral-200 dark:border-neutral-600">
            <data.company.logo className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium text-sm">
              {data.company.name}
            </span>
            <span className="truncate text-xs text-neutral-500 dark:text-neutral-400 font-medium">
              {data.company.plan}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} onNavigate={onNavigate} currentView={currentView} />
        <NavTeams teams={data.teams_section} />
        <NavReporting reports={data.reporting} />
        <NavPipelines pipelines={data.pipelines} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="border-t border-neutral-200 dark:border-neutral-800 py-1 group-data-[collapsible=icon]:py-1.5">
        <Billing />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
