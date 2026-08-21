import { useEffect, useRef, useState } from "react";
import { CloseIcon, CommandIcon, SearchIcon } from "./icons";
import { useDashboardNavigation } from "./navigation";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { navigationGroups } from "../../data";

export function DashboardTopbar() {
  const { pathname } = useDashboardNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const currentPage =
    navigationGroups
      .flatMap((group) => group.items)
      .find((item) => item.href === pathname) ?? navigationGroups[0].items[0];
  const CurrentPageIcon = currentPage.icon;

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
    <header className="flex h-18 shrink-0 items-center justify-between gap-4 px-5 md:px-6">
      {isMobileSearchOpen ? (
        <div className="flex w-full items-center gap-2 md:hidden">
          <InputGroup className="h-9 flex-1 rounded-lg border-none bg-secondary py-1 pr-2 pl-3">
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
            size="icon"
            className="shrink-0 rounded-lg"
            aria-label="Close search"
            onClick={closeMobileSearch}
          >
            <CloseIcon />
          </Button>
        </div>
      ) : (
        <>
          <div className="flex min-w-0 items-center gap-2">
            <SidebarTrigger
              size="icon"
              className="shrink-0 md:hidden [&_svg]:size-5!"
            />
            <div className="hidden items-end gap-4 md:flex">
              <div className="flex h-6 items-center gap-3">
                <CurrentPageIcon className="size-4" />
                <span className="text-lg leading-6.5 font-medium">
                  {currentPage.name}
                </span>
              </div>
              <div className="flex h-6 items-center gap-1">
                <span className="size-1.5 rounded-full bg-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Last synced{" "}
                  <span className="text-foreground/80">5 min ago</span>
                </span>
              </div>
            </div>
          </div>

          <InputGroup className="hidden h-9 w-69.25 shrink-0 rounded-lg border-none bg-secondary py-1 pr-2 pl-2.5 md:flex">
            <InputGroupAddon className="gap-1.5 p-0 text-muted-foreground">
              <SearchIcon className="size-3" />
            </InputGroupAddon>
            <InputGroupInput
              ref={searchInputRef}
              className="h-full p-0 px-1 text-xs placeholder:text-muted-foreground"
              aria-label="Search patients and staff"
              placeholder="Search patients, staff..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
            {searchQuery === "" ? (
              <InputGroupAddon
                align="inline-end"
                className="p-0 text-muted-foreground"
              >
                <div className="flex h-6 w-9.5 items-center justify-center gap-1 rounded-md bg-background p-1.5">
                  <CommandIcon className="size-3" />
                  <span className="text-xs leading-none">K</span>
                </div>
              </InputGroupAddon>
            ) : null}
          </InputGroup>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0 md:hidden"
            aria-label="Open search"
            onClick={openMobileSearch}
          >
            <SearchIcon className="size-4" />
          </Button>
        </>
      )}
    </header>
  );
}
