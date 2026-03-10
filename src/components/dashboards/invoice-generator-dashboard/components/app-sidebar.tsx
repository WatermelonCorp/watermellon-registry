"use client";
import * as React from "react";
import {
  Plus,
} from "lucide-react";

import { SearchForm } from "./search-form";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "./ui/sidebar";

import { sidebarData } from "../data";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onNavigate?: (view: string) => void;
  currentView?: string;
}

export function AppSidebar({ onNavigate, currentView, ...props }: AppSidebarProps) {
  return (
    <Sidebar {...props} className="px-4 md:px-2">
      <SidebarHeader className="border-b px-2 md:px-0 border-border">
        <SidebarMenuButton
          className="
            flex items-center justify-center gap-2 px-8 py-3 font-sans text-base font-medium text-white/90 hover:text-white tracking-tight rounded-xl h-12 bg-linear-to-b from-[#279596] to-[#318A8B] shadow-[inset_0_4px_6px_rgba(255,255,255,0.4),inset_0_-4px_6px_rgba(255,255,255,0.2),inset_0_0_0_1px_rgba(255,255,255,0.1)] hover:scale-95 transition-all duration-300 ease-in-out
          "
        >
          <Plus className="size-6" strokeWidth={2.5} />
          <span>Compose Email</span>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="pt-2 px-2 md:px-0">
        <SearchForm />
        {sidebarData.navMain.map((item) => (
          <SidebarGroup key={item.title} className="px-2 md:px-0 border-b-[1.5px] border-border">
            <SidebarGroupLabel className="text-[15px] -ml-1.5 text-muted-foreground tracking-tight">{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((subItem) => (
                  <SidebarMenuItem key={subItem.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={currentView === subItem.title}
                      disabled={subItem.isDisabled}
                      className="h-10 text-[15px] text-muted-foreground/90 data-[active=true]:bg-accent data-[active=true]:text-teal-800 dark:data-[active=true]:text-teal-400 rounded-lg data-[active=true]:border-[1.5px] data-[active=true]:border-border tracking-tight hover:text-teal-800 dark:hover:text-teal-400 disabled:opacity-50 disabled:cursor-not-allowed pl-3"
                    >
                      <a
                        href={subItem.url}
                        onClick={(e) => {
                          if (subItem.isDisabled) {
                            e.preventDefault();
                            return;
                          }
                          if (onNavigate) {
                            e.preventDefault();
                            onNavigate(subItem.title);
                            return;
                          }
                        }}
                      >
                        {subItem.icon && (
                          <subItem.icon className="size-5" strokeWidth={2.5} />
                        )}
                        <span className="font-medium ">{subItem.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
