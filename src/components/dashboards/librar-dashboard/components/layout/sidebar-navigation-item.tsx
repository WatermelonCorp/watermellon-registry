"use client";

import { Link } from "../link";
import { useState } from "react";

import { ArrowDown01Icon } from "../../assets/svgs/arrow-down-01-icon";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "../ui/sidebar";
import type { NavigationItem } from "../../data";
import { cn } from "../../lib/utils";

type SidebarNavigationItemProps = {
  active: boolean;
  activeSubsection?: string;
  item: NavigationItem;
};

export function SidebarNavigationItem({
  active,
  activeSubsection,
  item,
}: SidebarNavigationItemProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const [open, setOpen] = useState(false);
  const subItems = item.subItems;
  const hasSubItems = Boolean(subItems?.length);
  const showSubItems = !collapsed && open && hasSubItems;
  const showFlyout = collapsed && hasSubItems;

  const activeChild = activeSubsection
    ? subItems?.find((subItem) => subItem.href.endsWith(`/${activeSubsection}`))
    : undefined;
  const DisplayedIcon = active && activeChild ? activeChild.icon : item.icon;
  const displayedLabel = active && activeChild ? activeChild.label : item.label;
  const activeChildHref = activeChild?.href;
  const isActiveSubItem = (href: string) => active && href === activeChildHref;

  function toggleOpen() {
    if (hasSubItems) {
      setOpen((currentOpen) => !currentOpen);
    }
  }

  return (
    <SidebarMenuItem
      className={cn(showFlyout && "group/sidebar-item relative")}
    >
      <div className="relative">
        <SidebarMenuButton
          isActive={active}
          onClick={hasSubItems ? toggleOpen : undefined}
          render={
            !hasSubItems ? (
              <Link href={item.href}>
                <DisplayedIcon />
                {!collapsed && <span>{displayedLabel}</span>}
              </Link>
            ) : undefined
          }
        >
          {hasSubItems && (
            <>
              <DisplayedIcon />
              {!collapsed && (
                <>
                  <span>{displayedLabel}</span>
                  <ArrowDown01Icon
                    className={cn(
                      "pointer-events-none ml-auto size-4.5 transition-transform",
                      open && "rotate-180",
                    )}
                  />
                </>
              )}
            </>
          )}
        </SidebarMenuButton>
      </div>

      {showSubItems ? (
        <SidebarMenuSub>
          {subItems?.map((subItem) => {
            const SubIcon = subItem.icon;
            return (
              <SidebarMenuSubItem key={subItem.href}>
                <SidebarMenuSubButton
                  isActive={isActiveSubItem(subItem.href)}
                  render={
                    <Link href={subItem.href}>
                      <SubIcon />
                      <span>{subItem.label}</span>
                    </Link>
                  }
                />
              </SidebarMenuSubItem>
            );
          })}
        </SidebarMenuSub>
      ) : null}

      {showFlyout ? (
        <div className="bg-popover text-popover-foreground pointer-events-none invisible absolute top-0 left-full z-50 ml-2 w-48 rounded-lg border p-2 opacity-0 shadow-lg transition-opacity group-focus-within/sidebar-item:pointer-events-auto group-focus-within/sidebar-item:visible group-focus-within/sidebar-item:opacity-100 group-hover/sidebar-item:pointer-events-auto group-hover/sidebar-item:visible group-hover/sidebar-item:opacity-100 before:absolute before:top-0 before:-left-2 before:h-full before:w-2 before:content-['']">
          <p className="px-2 pb-2 font-medium">{item.label}</p>
          <div className="space-y-1">
            {subItems?.map((subItem) => {
              const SubIcon = subItem.icon;
              const subActive = isActiveSubItem(subItem.href);
              return (
                <Link
                  key={subItem.href}
                  href={subItem.href}
                  className={cn(
                    "text-muted-foreground hover:bg-muted hover:text-foreground flex h-11 w-full items-center gap-3 rounded-lg px-3.5 font-medium outline-hidden transition-colors [&_svg]:size-5 [&_svg]:shrink-0",
                    subActive &&
                      "bg-card text-primary hover:bg-card hover:text-primary border shadow-xs",
                  )}
                >
                  <SubIcon className="size-5 shrink-0" />
                  <span>{subItem.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </SidebarMenuItem>
  );
}
