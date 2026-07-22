"use client";

import { useState } from "react";
import { Bell, Check, Search, X } from "lucide-react";

import { ArrowDown01Icon } from "../../assets/svgs/arrow-down-01-icon";
import { BuildingIcon } from "../../assets/svgs/building-icon";
import { DashboardIcon } from "../../assets/svgs/dashboard-icon";
import { LogoIcon } from "../../assets/svgs/logo-icon";
import { Link } from "../link";
import { useOrganization } from "./organization-provider";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { organizations, topNavNotifications } from "../../data";
import { cn } from "../../lib/utils";

export function TopNav() {
  const { selectedOrg, setSelectedOrg } = useOrganization();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 md:h-21 md:px-6">
      <div
        className={cn(
          "flex items-center gap-2 text-lg font-medium",
          mobileSearchOpen && "hidden md:flex",
        )}
      >
        <Link aria-label="Librar dashboard" href="/" className="md:hidden">
          <LogoIcon className="size-8 shrink-0" />
        </Link>
        <DashboardIcon className="hidden size-5 shrink-0 md:block" />
        <span className="truncate">Dashboard</span>
      </div>

      {mobileSearchOpen && (
        <div className="relative min-w-0 flex-1 md:hidden">
          <Search className="text-accent-foreground pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2" />
          <Input
            autoFocus
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            aria-label="Search catalog, members, ISBN"
            className="bg-input placeholder:text-accent-foreground h-10 w-full rounded-xl border-0 pr-3 pl-9"
            placeholder="Search catalog..."
          />
        </div>
      )}

      <div className="flex shrink-0 items-center justify-end gap-2">
        <div className="hidden md:order-3 md:block">
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label={`Select Librar branch. Current branch: ${selectedOrg}`}
              className="flex h-10 cursor-pointer items-center justify-center gap-1.5 md:h-11"
            >
              <div className="bg-foreground text-background dark:bg-muted flex size-10 items-center justify-center rounded-md md:size-11">
                <BuildingIcon className="size-6" />
              </div>
              <ArrowDown01Icon className="size-6" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="librar bg-popover z-50 w-60 rounded-lg border p-2 shadow-lg"
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-muted-foreground px-2 py-1.5 text-xs font-semibold tracking-wider uppercase">
                  Select Branch
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {organizations.map((org) => (
                  <DropdownMenuItem
                    key={org}
                    onClick={() => setSelectedOrg(org)}
                    className={cn(org === selectedOrg && "text-primary")}
                  >
                    <span>{org}</span>
                    {org === selectedOrg && (
                      <Check className="text-primary size-4" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="relative order-1 hidden h-11 w-78 md:block">
          <Search className="text-accent-foreground pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search catalog, members, ISBN"
            className="bg-input placeholder:text-accent-foreground h-10 w-full rounded-lg border-0 pr-4 pl-10 md:h-11"
            placeholder='"Search catalog, members, ISBN"'
          />
        </div>

        <Button
          aria-label={mobileSearchOpen ? "Close search" : "Search Librar"}
          aria-pressed={mobileSearchOpen}
          variant="secondary"
          size="icon-lg"
          className="md:hidden"
          onClick={() => setMobileSearchOpen((open) => !open)}
        >
          {mobileSearchOpen ? (
            <X className="size-5" />
          ) : (
            <Search className="size-5" />
          )}
        </Button>

        <div className={cn("order-2", mobileSearchOpen && "hidden md:block")}>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  aria-label="Notifications"
                  variant="secondary"
                  size="icon-lg"
                  className="relative"
                >
                  <Bell className="size-5" />
                  {topNavNotifications.some(
                    (notification) => notification.unread,
                  ) && (
                    <span className="absolute top-1/2 left-1/2 size-5 -translate-x-1/2 -translate-y-1/2">
                      <span className="absolute top-0 right-0 size-2 rounded-full bg-red-500" />
                    </span>
                  )}
                </Button>
              }
            />
            <DropdownMenuContent
              align="end"
              className="librar z-50 w-[calc(100vw-2rem)] max-w-80"
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-muted-foreground flex items-center justify-between px-2 py-1.5 text-xs font-semibold tracking-wider uppercase">
                  <span>Notifications</span>
                  <span className="font-normal tracking-normal normal-case">
                    {
                      topNavNotifications.filter(
                        (notification) => notification.unread,
                      ).length
                    }{" "}
                    unread
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-70 space-y-1 overflow-y-auto py-1">
                  {topNavNotifications
                    .filter((notif) => notif.unread)
                    .map((notif) => (
                      <DropdownMenuItem
                        key={notif.id}
                        className="flex h-18 cursor-default flex-col items-start gap-1 rounded-md p-2.5 outline-hidden transition-colors"
                      >
                        <div className="flex w-full items-start justify-between gap-2">
                          <span className="line-clamp-2 text-xs leading-normal font-semibold">
                            {notif.text}
                          </span>
                          <span className="mt-1 size-1.5 shrink-0 rounded-full bg-red-500" />
                        </div>
                        <span className="text-muted-foreground text-xs">
                          {notif.time}
                        </span>
                      </DropdownMenuItem>
                    ))}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-primary justify-center"
                  render={
                    <Link href="/notifications">View all notifications</Link>
                  }
                />
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
