"use client";

import { type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
// import { usePathname } from "next/navigation";
// import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  return (
    <SidebarGroup className="border-b">
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              tooltip={item.title}
              isActive={pathname === item.url}
              className="data-[active=true]:border-y data-[active=true]:border-neutral-600 text-neutral-500 font-medium tracking-tight"
            >
              <a href={item.url}>
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
