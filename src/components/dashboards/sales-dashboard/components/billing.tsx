"use client";

import {
  Wallet,
} from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Button } from "./ui/button";

export function Billing() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex items-center justify-between hover:bg-transparent"
        >
          <div className="flex items-center gap-3">
            <div className="flex flex-col text-sm leading-tight group-data-[collapsible=icon]:hidden">
              <span className="truncate font-medium">14 Days</span>
              <span className="truncate text-xs text-neutral-500 font-medium">Left on trials</span>
            </div>
            <Button className="h-7 rounded-full border-y border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors group-data-[collapsible=icon]:px-2">
              <Wallet />
              <span className="text-xs group-data-[collapsible=icon]:hidden">Add Billings</span>
            </Button>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
