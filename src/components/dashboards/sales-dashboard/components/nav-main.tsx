"use client";

import { type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { useLocation } from "react-router-dom";

export function NavMain({
  items,
  onNavigate,
  currentView,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    isDisabled?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
  onNavigate?: (view: string) => void;
  currentView?: string;
}) {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <SidebarGroup className="border-b border-neutral-200 dark:border-neutral-800">
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              tooltip={item.title}
              isActive={currentView === item.title || (pathname === item.url && item.url !== "#")}
              className="data-[active=true]:border-y data-[active=true]:border-neutral-200 dark:data-[active=true]:border-neutral-600 text-neutral-500 dark:text-neutral-400 font-medium tracking-tight"
            >
              <a
                href={item.url}
                onClick={(e) => {
                  if (item.isDisabled) {
                    e.preventDefault();
                    return;
                  }
                  if (item.url === "#" && onNavigate) {
                    e.preventDefault();
                    onNavigate(item.title);
                  }
                }}
              >
                {item.icon && (
                  <item.icon className="size-4" strokeWidth={2.5} />
                )}
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
