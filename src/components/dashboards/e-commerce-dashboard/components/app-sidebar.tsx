"use client";

import * as React from "react";
import {
  IconDashboard,
  IconInnerShadowTop,
  IconShoppingCart,
  IconBox,
  IconLayoutGrid,
  IconUserCheck,
  IconArrowRight,
  IconKey,
  IconBrandAppgallery,
} from "@tabler/icons-react";

import { NavSecondary } from "./nav-secondary";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { ChevronsUpDown } from "lucide-react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
      isActive: true,
    },
    {
      title: "Orders",
      url: "/orders",
      icon: IconShoppingCart,
      isDisabled: true,
    },
    {
      title: "Products",
      url: "/products",
      icon: IconLayoutGrid,
      isDisabled: true,
    },
    {
      title: "Customers",
      url: "/customers",
      icon: IconUserCheck,
      isDisabled: true,
    },
    {
      title: "Inventory",
      url: "/inventory",
      icon: IconBox,
      isDisabled: true,
    },
  ],

  navSecondary: [
    {
      name: "Processing",
      url: "/orders/processing",
      icon: IconUserCheck,
      badge: 12,
      isDisabled: true,
    },
    {
      name: "New Customers",
      url: "/orders/new",
      icon: IconArrowRight,
      badge: 3,
      isDisabled: true,
    },
    {
      name: "Refunds",
      url: "/orders/refunds",
      icon: IconKey,
      isDisabled: true,
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onNavigate?: (view: string) => void;
  currentView?: string;
}

export function AppSidebar({ onNavigate, currentView, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex flex-col gap-3">
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent bg-white dark:bg-neutral-900 shadow data-[state=open]:text-sidebar-accent-foreground h-15 px-3 border border-transparent dark:border-neutral-800"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <IconBrandAppgallery stroke={2} />
              </div>
              <div className="grid flex-1 flex-col text-left leading-tighter">
                <span className="truncate font-semibold tracking-tight text-lg">
                  Online Store
                </span>
                <span className="truncate text-sm font-mono font-medium tracking-tight text-muted-foreground">
                  30 PRODUCTS
                </span>
              </div>
              <ChevronsUpDown className="ml-auto text-neutral-500" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} onNavigate={onNavigate} currentView={currentView} />
        <NavSecondary items={data.navSecondary} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
