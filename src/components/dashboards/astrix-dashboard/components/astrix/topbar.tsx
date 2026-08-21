import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { BellIcon, CmdIcon, ImportProductIcon, SearchIcon } from "./icons";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { notifications } from "../../data";

export function DashboardTopbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);

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
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="flex h-16 items-center justify-between gap-4 border-b px-4 md:px-6 md:pr-8">
      {isMobileSearchOpen ? (
        <div className="flex w-full items-center gap-2.5 md:hidden">
          <InputGroup className="h-10 flex-1 border-none bg-secondary px-3 py-1">
            <InputGroupAddon className="pl-0">
              <SearchIcon className="size-3.5 text-input-addon-foreground" />
            </InputGroupAddon>
            <InputGroupInput
              ref={mobileSearchInputRef}
              className="h-full p-0 px-1.5!"
              aria-label="Search"
              placeholder="Search products, HS codes, classifications..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </InputGroup>
          <Button
            type="button"
            variant="outline"
            size="icon-lg"
            className="size-10"
            aria-label="Close search"
            onClick={closeMobileSearch}
          >
            <X className="size-4.5" />
          </Button>
        </div>
      ) : (
        <>
          <div className="flex flex-1 items-center gap-2 md:max-w-105">
            <SidebarTrigger className="size-10 md:hidden [&_svg]:size-5!" />

            <InputGroup className="hidden h-10 flex-1 border-none bg-secondary px-3 py-1 md:flex">
              <InputGroupAddon className="pl-0">
                <SearchIcon className="size-3.5 text-input-addon-foreground" />
              </InputGroupAddon>
              <InputGroupInput
                ref={searchInputRef}
                className="h-full p-0 px-1.5!"
                aria-label="Search"
                placeholder="Search products, HS codes, classifications..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              {searchQuery === "" ? (
                <InputGroupAddon
                  align="inline-end"
                  className="pr-0 text-input-addon-foreground"
                >
                  <div className="flex items-center gap-1 rounded-md bg-background px-2 py-1.5">
                    <CmdIcon className="size-2.5" />
                    <span className="text-sm leading-none font-medium">K</span>
                  </div>
                </InputGroupAddon>
              ) : null}
            </InputGroup>
          </div>

          <div className="flex shrink-0 items-center gap-2 md:gap-4">
            <Button
              type="button"
              variant="secondary"
              size="icon-lg"
              className="relative size-10 md:hidden"
              aria-label="Open search"
              onClick={openMobileSearch}
            >
              <SearchIcon className="size-4.5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger
                type="button"
                className={buttonVariants({
                  variant: "secondary",
                  size: "icon-lg",
                  className: "size-10",
                })}
                aria-label="Notifications"
              >
                <span className="relative">
                  <BellIcon className="size-5" />
                  <span className="absolute top-0 right-0.5 size-2 rounded-full bg-destructive" />
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                collisionPadding={16}
                className="astrix-dashboard w-78"
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className="min-w-0 items-start py-2"
                    >
                      <div className="min-w-0">
                        <p className="font-medium">{notification.title}</p>
                        <p className="truncate text-sm text-muted-foreground">
                          {notification.description}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground/60">
                          {notification.time}
                        </p>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center hover:underline focus:bg-transparent">
                  View all
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button type="button" className="h-10 gap-3 pr-3 pl-3.5">
              <span className="md:hidden">Import</span>
              <span className="hidden md:inline">Import Product</span>
              <ImportProductIcon className="size-5" />
            </Button>
          </div>
        </>
      )}
    </header>
  );
}
