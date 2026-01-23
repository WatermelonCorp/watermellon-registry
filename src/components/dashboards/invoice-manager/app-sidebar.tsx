"use client"

import * as React from "react"
import {
  Search,
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

import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
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
    },
    {
      name: "Clients",
      url: "#",
      icon: Users,
    },
    {
      name: "Projects",
      url: "#",
      icon: FolderKanban,
    },

  ],
  navSecondary: [
    {
      title: "Payments Hub",
      url: "#",
      icon: DollarSign,
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
        },
        {
          title: "Invoice Manager",
          url: "/dashboard/financial-center/invoice-manager",
        },
        {
          title: "Payment History",
          url: "#",
        },
        {
          title: "Subscriptions",
          url: "#",
        },
        {
          title: "Revenue Insights",
          url: "#",
        },
      ],
    },
    {
      title: "Analytics",
      url: "#",
      icon: ChartSpline,
      items: [
        {
          title: "Growth Overview",
          url: "#",
        },
        {
          title: "Expense Tracker",
          url: "#",
        },
        {
          title: "Performance Reports",
          url: "#",
        },
      ],
    },
    {
      title: "Support Center",
      url: "#",
      icon: Headset,
    },
    {
      title: "Notifications",
      url: "#",
      icon: Bell,
    },
  ],
  navTertiary: [

    {
      name: "Team Access",
      url: "#",
      icon: UsersRound,
    },
    {
      name: "Automation Rules",
      url: "#",
      icon: Workflow,
    },
    {
      name: "Integrations",
      url: "#",
      icon: Plug,
    },
    {
      name: "Compliance Center",
      url: "#",
      icon: ShieldCheck,
    },
  ],
  navFooter: [
    {
      name: "API Management",
      url: "#",
      icon: KeyRound,
    },
    {
      name: "Developer Console",
      url: "#",
      icon: Terminal,
    },
    {
      name: "Admin Panel",
      url: "#",
      icon: Settings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="bg-background">
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
