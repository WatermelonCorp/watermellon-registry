"use client";

import { type Icon } from "@tabler/icons-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

export function NavMain({
  items,
  onNavigate,
  currentView,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
    isActive?: boolean;
    isDisabled?: boolean;
  }[];
  onNavigate?: (view: string) => void;
  currentView?: string;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2 ">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                size={"lg"}
                tooltip={item.title}
                className="h-9 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
                isActive={currentView ? item.title === currentView : item.isActive}
                onClick={(e) => {
                  if (item.isDisabled) {
                    e.preventDefault();
                    return;
                  }
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate(item.title);
                  }
                }}
                asChild={!onNavigate}
              >
                {item.icon && (
                  <item.icon className="size-5! text-neutral-500" />
                )}
                <span className="text-neutral-500 font-medium tracking-tight text-base">
                  {item.title}
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
