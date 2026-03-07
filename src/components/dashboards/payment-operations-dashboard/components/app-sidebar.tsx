"use client";

import * as React from "react";
import {
  IconCurrencyDollar,
  IconCreditCard,
  IconDashboard,
  IconFileText,
  IconInfoCircle,
  IconInnerShadowTop,
  IconReceipt,
  IconTarget,
  IconSettings,
  IconUsers,
  IconArrowsExchange,
  IconBell,
  IconWallet,
  IconLayersSelected,
} from "@tabler/icons-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "./ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-footer";
import { NavSecondary } from "./nav-options";

const data = {
  user: {
    name: "Vansh",
    email: "vansh@example.com",
    avatar: "/avatars/vansh.jpg",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
      isActive: true,
    },
    {
      title: "Balances",
      url: "/balances",
      icon: IconWallet,
    },
    {
      title: "Transactions",
      url: "/transactions",
      icon: IconArrowsExchange,
    },
    {
      title: "Customers",
      url: "/customers",
      icon: IconUsers,
    },
    {
      title: "Product Catalog",
      url: "/products",
      icon: IconLayersSelected,
    },
    {
      title: "Budget",
      url: "/budget",
      icon: IconReceipt,
    },
    {
      title: "Goals",
      url: "/goals",
      icon: IconTarget,
    },
  ],

  products: [
    {
      name: "Billings",
      url: "/billings",
      icon: IconCurrencyDollar,
    },
    {
      name: "Payments",
      url: "/payments",
      icon: IconCreditCard,
    },
    {
      name: "Reports",
      url: "/reports",
      icon: IconFileText,
    },
  ],

  options: [
    {
      name: "Notifications",
      url: "/notifications",
      icon: IconBell,
    },
    {
      name: "Help & Support",
      url: "/help",
      icon: IconInfoCircle,
    },
    {
      name: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar(); // "expanded" | "collapsed"
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="mt-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2 ">
            {state === "expanded" && (
              <SidebarMenuButton
                asChild
                className="data-[slot=sidebar-menu-button]:!p-1.5  group-data-[collapsed=icon]:hidden"
              >
                <a href="#" className="">
                  <IconInnerShadowTop className="!size-8" />
                  <span className=" font-semibold text-2xl">OceanLabs</span>
                </a>
              </SidebarMenuButton>
            )}
            <SidebarTrigger />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="">
        <NavMain items={data.navMain} />

        <NavSecondary items={data.options} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
