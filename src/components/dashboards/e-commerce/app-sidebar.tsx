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
} from "@/components/ui/sidebar";
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
    },
    {
      title: "Orders",
      url: "/orders",
      icon: IconShoppingCart,
    },
    {
      title: "Products",
      url: "/products",
      icon: IconLayoutGrid,
    },
    {
      title: "Customers",
      url: "/customers",
      icon: IconUserCheck,
    },
    {
      title: "Inventory",
      url: "/inventory",
      icon: IconBox,
    },
  ],

  navSecondary: [
    {
      name: "Processing",
      url: "#",
      icon: IconUserCheck,
      badge: 12,
    },
    {
      name: "New Customers",
      url: "#",
      icon: IconArrowRight,
      badge: 3,
    },
    {
      name: "Refunds",
      url: "#",
      icon: IconKey,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
              className="data-[state=open]:bg-sidebar-accent bg-white dark:bg-black shadow data-[state=open]:text-sidebar-accent-foreground h-15 px-3"
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
              <ChevronsUpDown className="ml-auto text-muted-foreground" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
