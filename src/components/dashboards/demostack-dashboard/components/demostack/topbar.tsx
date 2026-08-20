"use client";

import { useEffect, useRef, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Blocks, Search, X } from "lucide-react";
import { NavCmdIcon, NavSearchIcon } from "./icons";
import {
  adminNavigation,
  notifications,
  workspaceNavigation,
} from "../../data";
import { useDashboardNavigation } from "./navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";

const navigationItems = [...workspaceNavigation, ...adminNavigation];

export function DashboardTopbar() {
  const { pathname } = useDashboardNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);

  const currentPage =
    navigationItems.find(({ href }) =>
      href === "/"
        ? pathname === href
        : pathname === href || pathname.startsWith(`${href}/`),
    ) ?? navigationItems[0];

  const TitleIcon = currentPage.icon;

  const openMobileSearch = () => {
    setIsMobileSearchOpen(true);

    requestAnimationFrame(() => {
      mobileSearchInputRef.current?.focus();
    });
  };

  const closeMobileSearch = () => {
    setIsMobileSearchOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();

        if (window.matchMedia("(max-width: 767px)").matches) {
          setIsMobileSearchOpen(true);

          requestAnimationFrame(() => {
            mobileSearchInputRef.current?.focus();
          });

          return;
        }

        requestAnimationFrame(() => {
          searchInputRef.current?.focus();
        });
      }

      if (event.key === "Escape") {
        setIsMobileSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="flex h-16.5 items-center justify-between md:rounded-t-2xl border px-4 md:px-7">
      {isMobileSearchOpen ? (
        <div className="flex w-full items-center gap-2.5 md:hidden">
          <InputGroup className="h-8.5 flex-1 border-none bg-secondary p-1 pl-2.5">
            <InputGroupAddon className="pl-0">
              <span aria-hidden="true" className="flex items-center">
                <NavSearchIcon className="size-3.5 text-input-addon-foreground" />
              </span>
            </InputGroupAddon>

            <InputGroupInput
              ref={mobileSearchInputRef}
              className="h-full p-0 px-1.5!"
              aria-label="Quick search"
              placeholder="Quick search for demo"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </InputGroup>

          <Button
            type="button"
            variant="outline"
            size="icon-lg"
            className="size-8.5 shrink-0 rounded-full"
            aria-label="Close search"
            onClick={closeMobileSearch}
          >
            <X aria-hidden="true" className="size-4.5" />
          </Button>
        </div>
      ) : (
        <>
          <div className="flex items-center md:gap-4.5">
            <SidebarTrigger className="size-8.5 shrink-0 md:hidden [&_svg]:size-5!" />

            <div className="hidden shrink-0 items-center gap-1.5 md:flex">
              <TitleIcon aria-hidden="true" className="size-4" />

              <h1 className="text-lg leading-none font-medium">
                {currentPage.name}
              </h1>
            </div>

            <InputGroup className="hidden h-8.5 border-none bg-secondary p-1 pl-2.5 md:flex md:w-75">
              <InputGroupAddon className="pl-0">
                <span aria-hidden="true" className="flex items-center">
                  <NavSearchIcon className="size-3.5 text-input-addon-foreground" />
                </span>
              </InputGroupAddon>

              <InputGroupInput
                ref={searchInputRef}
                className="h-full p-0 px-1.5!"
                aria-label="Quick search"
                placeholder="Quick search for demo"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />

              {searchQuery === "" && (
                <InputGroupAddon
                  align="inline-end"
                  className="pr-0 text-input-addon-foreground"
                >
                  <div className="flex items-center gap-1 rounded-sm bg-background px-1.75 py-1.25">
                    <NavCmdIcon className="size-2.5" />

                    <span className="text-xs leading-none">K</span>
                  </div>
                </InputGroupAddon>
              )}
            </InputGroup>
          </div>

          <div className="flex shrink-0 items-center gap-2.5">
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="hidden lg:flex h-8.5 gap-3 rounded-full px-3 py-2 pl-4"
            >
              <Blocks aria-hidden="true" className="size-4.5" />
              <span className="text-xs leading-none">Add Extension</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon-lg"
              className="size-8.5 rounded-full lg:hidden"
              aria-label="Add Extension"
            >
              <Blocks aria-hidden="true" className="size-4.5" />
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon-lg"
              className="size-8.5 rounded-full md:hidden"
              aria-label="Open search"
              onClick={openMobileSearch}
            >
              <Search aria-hidden="true" className="size-4.5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger
                type="button"
                className={buttonVariants({
                  variant: "outline",
                  size: "icon-lg",
                  className: "size-8.5 rounded-full",
                })}
                aria-label="Notifications"
              >
                <Bell aria-hidden="true" className="size-4.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className="items-start py-2"
                    >
                      <div>
                        <p className="font-medium">{notification.title}</p>
                        <p className="text-muted-foreground text-xs">
                          {notification.description}
                        </p>
                        <p className="text-muted-foreground mt-1 text-xs">
                          {notification.time}
                        </p>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center focus:bg-transparent hover:underline">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      )}
    </header>
  );
}
