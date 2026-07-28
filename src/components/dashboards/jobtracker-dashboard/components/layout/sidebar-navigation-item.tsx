import type { ComponentType, ReactNode, SVGProps } from "react";

import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

import { useDashboardNavigation } from "../navigation";

export type NavigationItem = {
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  href?: string;
  active?: boolean;
  variant?: "default" | "destructive";
};

export const sidebarNavigationButtonClassName =
  "h-10 gap-3 rounded-xl px-3 text-base font-medium tracking-tight text-muted-foreground data-active:bg-background data-active:text-primary data-active:hover:bg-background data-active:hover:text-primary [&_svg]:size-5";

export const sidebarNavigationLabelClassName =
  "max-w-40 whitespace-nowrap opacity-100 transition-[max-width,opacity] duration-200 group-data-[collapsible=icon]:max-w-0 group-data-[collapsible=icon]:opacity-0";

type SidebarNavigationItemProps = {
  item: NavigationItem;
  trailing?: ReactNode;
};

export function SidebarNavigationItem({
  item,
  trailing,
}: SidebarNavigationItemProps) {
  const Icon = item.icon;
  const { navigate, pathname } = useDashboardNavigation();
  const { isMobile, setOpenMobile } = useSidebar();
  const isActive =
    item.active ??
    (item.href === "/"
      ? pathname === item.href
      : Boolean(item.href && pathname.startsWith(item.href)));
  const content = (
    <>
      <Icon />
      <span className={sidebarNavigationLabelClassName}>{item.label}</span>
    </>
  );

  if (item.href) {
    return (
      <SidebarMenuItem className={cn(trailing && "flex items-center gap-1")}>
        <SidebarMenuButton
          isActive={isActive}
          tooltip={item.label}
          className={cn(
            sidebarNavigationButtonClassName,
            !isActive &&
              item.variant !== "destructive" &&
              "hover:!bg-background hover:!text-foreground",
            item.variant === "destructive" &&
              "text-destructive hover:bg-destructive/10 hover:text-destructive active:bg-destructive/10 active:text-destructive",
            trailing && "min-w-0 flex-1",
          )}
          onClick={() => {
            navigate(item.href!);
            if (isMobile) {
              setOpenMobile(false);
            }
          }}
        >
          {content}
        </SidebarMenuButton>
        {trailing}
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem className={cn(trailing && "flex items-center gap-1")}>
      <SidebarMenuButton
        isActive={isActive}
        tooltip={item.label}
        className={cn(
          sidebarNavigationButtonClassName,
          !isActive &&
            item.variant !== "destructive" &&
            "hover:!bg-background hover:!text-foreground",
          item.variant === "destructive" &&
            "text-destructive hover:bg-destructive/10 hover:text-destructive active:bg-destructive/10 active:text-destructive",
          trailing && "min-w-0 flex-1",
        )}
      >
        {content}
      </SidebarMenuButton>
      {trailing}
    </SidebarMenuItem>
  );
}
