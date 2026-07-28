"use client";

import { useRef, useState } from "react";

import { ArrowDown01Icon } from "../../assets/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import type { NavigationItem } from "./app-sidebar";
import {
  librarySidebarMenuButtonClassName,
  librarySidebarMenuSubButtonClassName,
} from "./sidebar-menu-styles";

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
  const [flyoutOpen, setFlyoutOpen] = useState(false);
  const flyoutCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const subItems = item.subItems;
  const hasSubItems = Boolean(subItems?.length);
  const showSubItems = !collapsed && open && hasSubItems;

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

  function openFlyout() {
    if (flyoutCloseTimer.current) {
      clearTimeout(flyoutCloseTimer.current);
    }

    setFlyoutOpen(true);
  }

  function scheduleFlyoutClose() {
    flyoutCloseTimer.current = setTimeout(() => {
      setFlyoutOpen(false);
    }, 120);
  }

  return (
    <SidebarMenuItem>
      <div className="relative">
        {collapsed && hasSubItems ? (
          <DropdownMenu open={flyoutOpen} onOpenChange={setFlyoutOpen}>
            <DropdownMenuTrigger
              aria-label={displayedLabel}
              onPointerEnter={openFlyout}
              onPointerLeave={scheduleFlyoutClose}
              className={cn(
                librarySidebarMenuButtonClassName,
                "flex w-full items-center",
                active && "text-primary",
              )}
            >
              <DisplayedIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="right"
              align="start"
              sideOffset={8}
              onPointerEnter={openFlyout}
              onPointerLeave={scheduleFlyoutClose}
              className="z-[100] w-48 rounded-lg p-2"
            >
              <DropdownMenuLabel className="px-2 pb-2">
                {item.label}
              </DropdownMenuLabel>
              {subItems?.map((subItem) => {
                const SubIcon = subItem.icon;
                const subActive = isActiveSubItem(subItem.href);

                return (
                  <DropdownMenuItem
                    key={subItem.href}
                    className={cn(
                      "text-muted-foreground flex h-11 items-center gap-3 rounded-lg px-3.5 font-medium [&_svg]:size-5 [&_svg]:text-current!",
                      subActive &&
                        "bg-card text-primary font-semibold focus:bg-card focus:text-primary",
                    )}
                  >
                    <SubIcon />
                    <span>{subItem.label}</span>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : hasSubItems ? (
          <SidebarMenuButton
            isActive={active}
            onClick={toggleOpen}
            className={cn(
              librarySidebarMenuButtonClassName,
              active && "text-primary",
            )}
          >
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
          </SidebarMenuButton>
        ) : (
          <SidebarMenuButton
            isActive={active}
            className={cn(
              librarySidebarMenuButtonClassName,
              active && "text-primary",
            )}
            onClick={(event) => event.preventDefault()}
          >
            <DisplayedIcon />
            {!collapsed && <span>{displayedLabel}</span>}
          </SidebarMenuButton>
        )}
      </div>

      {showSubItems ? (
        <SidebarMenuSub>
          {subItems?.map((subItem) => {
            const SubIcon = subItem.icon;
            return (
              <SidebarMenuSubItem key={subItem.href}>
                <SidebarMenuSubButton
                  isActive={isActiveSubItem(subItem.href)}
                  className={cn(
                    librarySidebarMenuSubButtonClassName,
                    isActiveSubItem(subItem.href) && "text-primary",
                  )}
                  href={subItem.href}
                  onClick={(event) => event.preventDefault()}
                >
                  <SubIcon />
                  <span>{subItem.label}</span>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            );
          })}
        </SidebarMenuSub>
      ) : null}
    </SidebarMenuItem>
  );
}
