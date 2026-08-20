import { useEffect, useRef, useState } from "react";
import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon as LucideUserIcon,
} from "lucide-react";
import {
  BellIcon,
  CaretDownIcon,
  CloseIcon,
  CommandIcon,
  SearchIcon,
} from "./icons";
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
import { currentUser, notifications } from "../../data";

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

        searchInputRef.current?.focus();
      }

      if (event.key === "Escape") {
        setIsMobileSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 md:h-20 md:px-8">
      {isMobileSearchOpen ? (
        <div className="flex w-full items-center gap-2 md:hidden">
          <InputGroup className="h-11 flex-1 rounded-lg border-none bg-secondary py-1 pr-2 pl-3">
            <InputGroupAddon className="pl-0 text-muted-foreground">
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput
              ref={mobileSearchInputRef}
              className="h-full p-0 px-1.5! text-sm leading-5 tracking-tight placeholder:text-muted-foreground"
              aria-label="Find a control"
              placeholder="find a control"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </InputGroup>
          <Button
            type="button"
            variant="outline"
            size="icon-lg"
            className="size-8.5 shrink-0 rounded-lg"
            aria-label="Close search"
            onClick={closeMobileSearch}
          >
            <CloseIcon />
          </Button>
        </div>
      ) : (
        <>
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <SidebarTrigger className="size-8.5 shrink-0 md:hidden [&_svg]:size-5!" />

            <InputGroup className="hidden h-11 w-105.25 max-w-full rounded-lg border-none bg-secondary py-1 pr-2 pl-3 md:flex">
              <InputGroupAddon className="pl-0 text-muted-foreground">
                <SearchIcon />
              </InputGroupAddon>
              <InputGroupInput
                ref={searchInputRef}
                className="h-full p-0 px-1.5! text-sm leading-5 tracking-tight placeholder:text-muted-foreground"
                aria-label="Find a control"
                placeholder="find a control"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              {searchQuery === "" ? (
                <InputGroupAddon
                  align="inline-end"
                  className="pr-0 text-muted-foreground"
                >
                  <div className="flex h-5.5 w-9.5 items-center justify-center gap-1 rounded-md bg-background px-2 py-1.5">
                    <CommandIcon />
                    <span className="text-sm leading-none">K</span>
                  </div>
                </InputGroupAddon>
              ) : null}
            </InputGroup>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon-lg"
              className="size-8.5 rounded-lg md:hidden"
              aria-label="Open search"
              onClick={openMobileSearch}
            >
              <SearchIcon className="size-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger
                type="button"
                className={buttonVariants({
                  variant: "outline",
                  size: "icon-lg",
                  className: "relative size-8.5 rounded-lg",
                })}
                aria-label="Notifications"
              >
                <BellIcon />
                <span className="absolute top-1.75 left-4.5 size-1.5 rounded-full bg-destructive" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="tallie-dashboard w-72 mr-4.75"
              >
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
                        <p className="text-xs text-muted-foreground">
                          {notification.description}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {notification.time}
                        </p>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center hover:underline focus:bg-transparent">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger
                type="button"
                className={buttonVariants({
                  variant: "ghost",
                  className:
                    "h-auto gap-2 px-0 hover:bg-transparent aria-expanded:bg-transparent data-open:[&>svg]:rotate-180",
                })}
                aria-label="Account menu"
              >
                <img
                  src={currentUser.avatar}
                  alt=""
                  className="size-8.5 rounded-lg border bg-muted object-cover"
                />
                <CaretDownIcon className="hidden transition-transform md:block" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="tallie-dashboard w-56"
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="leading-tight">
                    <p className="text-sm font-medium text-foreground">
                      {currentUser.name}
                    </p>
                    <p>{currentUser.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <LucideUserIcon />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SettingsIcon />
                    Preferences
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCardIcon />
                    Billing
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <LogOutIcon />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      )}
    </header>
  );
}
