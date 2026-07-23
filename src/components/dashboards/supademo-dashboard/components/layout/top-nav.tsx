"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { SidebarTrigger } from "../ui/sidebar";
import { Bell, Blocks } from "lucide-react";
import { NavCmdIcon, NavSearchIcon } from "../../assets/icons";
import { adminNavigation, workspaceNavigation } from "../../navigation-data";
import { useDashboardNavigation } from "../navigation";

const navigationItems = [...workspaceNavigation, ...adminNavigation];

export function TopNav() {
  const { pathname } = useDashboardNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const currentPage =
    navigationItems.find(({ href }) =>
      href === "/"
        ? pathname === href
        : pathname === href || pathname.startsWith(`${href}/`),
    ) ?? navigationItems[0];
  const TitleIcon = currentPage.icon;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();

        requestAnimationFrame(() => searchInputRef.current?.focus());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="bg-background flex shrink-0 items-center justify-between gap-2 border px-4 py-4 md:gap-4 md:rounded-t-2xl md:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-3 md:gap-4">
        <SidebarTrigger className="shrink-0 md:hidden" />

        <div className="hidden shrink-0 items-center gap-1.5 md:flex">
          <TitleIcon aria-hidden="true" className="size-5" />
          <h1 className="text-lg font-medium leading-none">
            {currentPage.name}
          </h1>
        </div>

        <InputGroup
          id="top-nav-search"
          className="bg-card flex-1 border-border md:max-w-72"
        >
          <InputGroupAddon className="pl-2">
            <span aria-hidden="true" className="flex items-center">
              <NavSearchIcon className="size-3.5" />
            </span>
          </InputGroupAddon>
          <InputGroupInput
            ref={searchInputRef}
            aria-label="Quick search"
            placeholder="Quick search for demo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery === "" && (
            <InputGroupAddon
              align="inline-end"
              className="hidden pr-1.5 md:flex"
            >
              <div className="flex h-6 w-9 items-center justify-center gap-1 rounded-md border text-muted-foreground bg-card">
                <NavCmdIcon className="size-2.5" />
                <span className="text-xs leading-none text-muted-foreground/60">
                  K
                </span>
              </div>
            </InputGroupAddon>
          )}
        </InputGroup>
      </div>

      <div className="flex shrink-0 items-center gap-2.5">
        <>
          <Button
            type="button"
            variant="outline"
            size="icon-lg"
            className="bg-card hidden rounded-full border-0 shadow-border md:inline-flex xl:hidden"
            aria-label="Add Extension"
          >
            <Blocks aria-hidden="true" className="size-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="bg-card hidden rounded-full border-0 px-4 shadow-border xl:inline-flex"
          >
            <Blocks aria-hidden="true" className="size-4" />
            <span className="text-xs leading-none">Add Extension</span>
          </Button>
        </>

        <Button
          type="button"
          variant="outline"
          size="icon-lg"
          className="bg-card rounded-full border-0 shadow-border"
          aria-label="Notifications"
        >
          <Bell aria-hidden="true" className="size-4" />
        </Button>
      </div>
    </header>
  );
}
