"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  DollarSign,
  Landmark,
  ChartSpline,
  Headset,
  Bell,
  UsersRound,
  Workflow,
  Plug,
  ShieldCheck,
  Command,
  KeyRound,
  Terminal,
  Settings,
} from "lucide-react"

import { TeamSwitcher } from "./team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "./ui/sidebar"
import { NavTertiary } from "./nav-Tertiary"
import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { NavFooter } from "./nav-footer"
import { SearchForm } from "./search-form"

// This is sample data.
const data = {
  user: {
    name: "John Doe",
    email: "john@revnix.com",
    avatar: "/avatars/user.jpg",
  },
  teams: [
    {
      name: "Revnix",
      logo: Command,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      name: "Overview",
      url: "#",
      icon: LayoutDashboard,
      isDisabled: true,
    },
    {
      name: "Clients",
      url: "#",
      icon: Users,
      isDisabled: true,
    },
    {
      name: "Projects",
      url: "#",
      icon: FolderKanban,
      isDisabled: true,
    },

  ],
  navSecondary: [
    {
      title: "Payments Hub",
      url: "#",
      icon: DollarSign,
      isDisabled: true,
    },
    {
      title: "Financial Center",
      url: "#",
      icon: Landmark,
      isActive: true,
      items: [
        {
          title: "Invoices Dashboard",
          url: "#",
          isDisabled: true,
        },
        {
          title: "Invoice Manager",
          url: "/financial-center/invoice-manager",
        },
        {
          title: "Payment History",
          url: "#",
          isDisabled: true,
        },
        {
          title: "Subscriptions",
          url: "#",
          isDisabled: true,
        },
        {
          title: "Revenue Insights",
          url: "#",
          isDisabled: true,
        },
      ],
    },
    {
      title: "Analytics",
      url: "#",
      icon: ChartSpline,
      isDisabled: true,
      items: [
        {
          title: "Growth Overview",
          url: "#",
          isDisabled: true,
        },
        {
          title: "Expense Tracker",
          url: "#",
          isDisabled: true,
        },
        {
          title: "Performance Reports",
          url: "#",
          isDisabled: true,
        },
      ],
    },
    {
      title: "Support Center",
      url: "#",
      icon: Headset,
      isDisabled: true,
    },
    {
      title: "Notifications",
      url: "#",
      icon: Bell,
      isDisabled: true,
    },
  ],
  navTertiary: [

    {
      name: "Team Access",
      url: "#",
      icon: UsersRound,
      isDisabled: true,
    },
    {
      name: "Automation Rules",
      url: "#",
      icon: Workflow,
      isDisabled: true,
    },
    {
      name: "Integrations",
      url: "#",
      icon: Plug,
      isDisabled: true,
    },
    {
      name: "Compliance Center",
      url: "#",
      icon: ShieldCheck,
      isDisabled: true,
    },
  ],
  navFooter: [
    {
      name: "API Management",
      url: "#",
      icon: KeyRound,
      isDisabled: true,
    },
    {
      name: "Developer Console",
      url: "#",
      icon: Terminal,
      isDisabled: true,
    },
    {
      name: "Admin Panel",
      url: "#",
      icon: Settings,
      isDisabled: true,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <SearchForm />
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} />
        <NavTertiary items={data.navTertiary} />
        <NavFooter items={data.navFooter} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
