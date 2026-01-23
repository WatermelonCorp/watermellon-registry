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
      url: "/company",
      icon: Building2,
      isActive: true,
    },
    {
      title: "Deals Board",
      url: "/dealsboard",
      icon: Kanban,
    },
    {
      title: "Forecast",
      url: "/forecast",
      icon: TrendingUp,
    },
    {
      title: "Activities",
      url: "/activities",
      icon: Activity,
    },
    {
      title: "Contacts",
      url: "/contacts",
      icon: Users,
    },
    {
      title: "Email Sequences",
      url: "/email-sequences",
      icon: Mail,
    },
  ],
  navSecondary: [
    {
      title: "Invite teammates",
      url: "/invite",
      icon: Users,
    },
    {
      title: "Help",
      url: "/help",
      icon: HelpCircle,
    },
  ],
  teams_section: [
    {
      name: "Strategic AEs",
      url: "/team/strategic-aes",
      icon: UserCheck,
    },
    {
      name: "Mid Market",
      url: "/team/mid-market",
      icon: Briefcase,
    },
    {
      name: "SDR Team",
      url: "/team/sdr",
      icon: Users,
    },
  ],
  reporting: [
    {
      name: "Q1 Forecast",
      url: "/reporting/q1-forecast",
      icon: TrendingUp,
    },
    {
      name: "Slipping Deals",
      url: "/reporting/slipping-deals",
      icon: AlertTriangle,
    },
  ],
  pipelines: [
    {
      name: "North America",
      url: "/pipelines/north-america",
      color: "text-yellow-500",
    },
    {
      name: "EMEA Enterprise",
      url: "/pipelines/emea",
      color: "text-pink-500",
    },
    {
      name: "APAC Expansion",
      url: "/pipelines/apac",
      color: "text-blue-500",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b data-[state=open]:py-1">
        <SidebarMenuButton
          size="lg"
          className="hover:bg-transparent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="bg-neutral-700 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
            <data.company.logo className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium text-sm">
              {data.company.name}
            </span>
            <span className="truncate text-xs text-neutral-600 font-medium">
              {data.company.plan}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavTeams teams={data.teams_section} />
        <NavReporting reports={data.reporting} />
        <NavPipelines pipelines={data.pipelines} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="border-t py-1 group-data-[collapsible=icon]:py-1.5">
        <Billing />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
