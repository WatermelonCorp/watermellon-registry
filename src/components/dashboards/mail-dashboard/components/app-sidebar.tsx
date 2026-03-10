"use client"

import * as React from "react"

import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar"

import {
  IconMailFilled,
  IconQuoteFilled,
  IconUserFilled,
  IconStarsFilled,
  IconBulbFilled,
  IconSearch,
  IconArchiveFilled,
} from "@tabler/icons-react";

// This is sample data
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Inbox",
      url: "/inbox",
      icon: IconMailFilled,
      isDisabled: true
    },
    {
      title: "Messages",
      url: "#",
      icon: IconQuoteFilled,
      isDisabled: true,
    },
    {
      title: "Profile",
      url: "#",
      icon: IconUserFilled,
      isDisabled: true,
    },
    {
      title: "AI",
      url: "#",
      icon: IconStarsFilled,
      isDisabled: true,
    },
    {
      title: "Ideas",
      url: "#",
      icon: IconBulbFilled,
      isDisabled: true,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
      isDisabled: true,
    },
    {
      title: "Archive",
      url: "#",
      icon: IconArchiveFilled,
      isDisabled: true,
    },
  ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar
      collapsible="icon"
      className="border-r p-2 group-data-[collapsible=icon]:p-0 bg-sidebar"
      {...props}
    >
      <SidebarHeader className="border-b max-md:py-4 py-4 flex items-center justify-start group-data-[collapsible=icon]:justify-center px-4 group-data-[collapsible=icon]:px-0">
        <SidebarMenu className="flex items-center justify-start group-data-[collapsible=icon]:items-center">
          <SidebarMenuItem className="flex items-center justify-start w-full group-data-[collapsible=icon]:justify-center">
            <SidebarMenuButton size="lg" className="group-data-[collapsible=icon]:h-10! group-data-[collapsible=icon]:w-10! group-data-[collapsible=icon]:p-0! flex items-center justify-start group-data-[collapsible=icon]:justify-center bg-orange-600 text-white rounded-lg shadow-[inset_0px_1px_2px_rgba(255,255,255,0.4),inset_0px_-2px_4px_rgba(0,0,0,0.3)] px-3 group-data-[collapsible=icon]:px-0 gap-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-6"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span className="font-medium text-base  md:group-data-[collapsible=icon]:hidden">OceanLabs</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="p-0">
          <SidebarGroupContent className="px-1.5 group-data-[collapsible=icon]:px-3">
            <SidebarMenu className="gap-3 py-4 flex flex-col items-start group-data-[collapsible=icon]:items-center px-2 group-data-[collapsible=icon]:px-0">
              {data.navMain.map((item) => {
                const isActive = item.title === "Inbox";
                return (
                  <SidebarMenuItem key={item.title} className="w-full">
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      isActive={isActive}
                      className="group-data-[collapsible=icon]:h-10! max-md:h-10 group-data-[collapsible=icon]:w-10! group-data-[collapsible=icon]:p-0! flex items-center justify-start group-data-[collapsible=icon]:justify-center rounded-lg hover:bg-sidebar-accent active:scale-95 transition-all data-[active=true]:bg-sidebar-accent data-[active=true]:border data-[active=true]:border-sidebar-border data-[active=true]:shadow-[inset_0px_2px_4px_rgba(0,0,0,0.3)] w-full gap-3 px-3 group-data-[collapsible=icon]:px-0"
                      asChild
                    >
                      <a
                        href={item.isDisabled ? "#" : item.url}
                        onClick={(e) => {
                          if (item.isDisabled) {
                            e.preventDefault();
                          }
                        }}
                        className="flex items-center justify-start group-data-[collapsible=icon]:justify-center text-sidebar-foreground/70 w-full gap-3"
                      >
                        <item.icon stroke={1.5} className="size-6! shrink-0 opacity-80" />
                        <span className="md:group-data-[collapsible=icon]:hidden font-medium">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="pt-4 flex items-center justify-start group-data-[collapsible=icon]:justify-center px-2 group-data-[collapsible=icon]:px-0">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
