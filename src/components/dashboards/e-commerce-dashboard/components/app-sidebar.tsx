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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronsUpDown, Plus } from "lucide-react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "",
  },
  teams: [
    {
      name: "Online Store",
      logo: IconBrandAppgallery,
      plan: "30 Products",
    },
    {
      name: "Acme Corp",
      logo: IconInnerShadowTop,
      plan: "Enterprise",
    },
  ],
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent bg-white dark:bg-neutral-900 shadow data-[state=open]:text-sidebar-accent-foreground h-15 px-3 border border-transparent dark:border-neutral-800 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] cursor-pointer"
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
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg shadow-xl dark:border-neutral-800"
                align="start"
                side="bottom"
                sideOffset={4}
              >
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Stores
                </DropdownMenuLabel>
                {data.teams.map((team, index) => (
                  <DropdownMenuItem
                    key={team.name}
                    className="gap-2 p-2 cursor-pointer transition-all hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <div className="flex size-6 items-center justify-center border border-neutral-200 dark:border-neutral-700 rounded-sm bg-neutral-50 dark:bg-neutral-900">
                      <team.logo className="size-4 shrink-0" />
                    </div>
                    <div className="flex flex-1 flex-col leading-none">
                      <span className="font-semibold text-sm">{team.name}</span>
                      <span className="text-xs text-muted-foreground">{team.plan}</span>
                    </div>
                    {index === 0 && <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator className="dark:bg-neutral-800" />
                <DropdownMenuItem className="gap-2 p-2 cursor-pointer transition-all hover:bg-neutral-100 dark:hover:bg-neutral-800">
                  <div className="flex size-6 items-center justify-center border border-neutral-200 dark:border-neutral-700 rounded-sm bg-neutral-50 dark:bg-neutral-900">
                    <Plus className="size-4 shrink-0" />
                  </div>
                  <div className="font-medium text-muted-foreground">Create new store</div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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