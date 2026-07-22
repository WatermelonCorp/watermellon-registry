"use client";

import { Check, Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";

import { BackwardIcon } from "../../assets/svgs/backward-icon";
import { ArrowDown01Icon } from "../../assets/svgs/arrow-down-01-icon";
import { BuildingIcon } from "../../assets/svgs/building-icon";
import { HelpIcon } from "../../assets/svgs/help-icon";
import { SettingsIcon } from "../../assets/svgs/settings-icon";
import { ThemeIcon } from "../../assets/svgs/theme-icon";
import { LogoIcon } from "../../assets/svgs/logo-icon";
import { Link } from "../link";
import { SidebarNavigationItem } from "./sidebar-navigation-item";
import { useOrganization } from "./organization-provider";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import { organizations, primaryNavigation } from "../../data";
import { cn } from "../../lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const mobilePrimaryNavigation = primaryNavigation.slice(0, 4);
const mobileMoreNavigation = primaryNavigation.slice(4);

type AppSidebarProps = {
  activeSection: string;
  activeSubsection?: string;
};

export function AppSidebar({
  activeSection,
  activeSubsection,
}: AppSidebarProps) {
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    document.documentElement.classList.toggle(
      "dark",
      storedTheme === "dark" || (!storedTheme && prefersDark),
    );
  }, []);

  function toggleTheme() {
    const dark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }

  return (
    <>
      <Sidebar collapsible="icon" className="librar bg-sidebar border-r">
        <SidebarHeader
          className={cn(
            "group relative flex h-21 flex-row items-center border-b p-0 transition-[padding] duration-200",
            collapsed ? "justify-center px-0" : "justify-between px-4.5",
          )}
        >
          {!collapsed ? (
            <>
              <Link
                aria-label="Librar dashboard"
                className="flex h-8 items-center gap-2"
                href="/"
              >
                <LogoIcon className="size-8" />
                <span className="text-xl font-bold tracking-tight">Librar</span>
              </Link>
              <Button
                aria-label="Collapse sidebar"
                variant="ghost"
                size="icon-lg"
                className="text-muted-foreground rounded-lg"
                onClick={toggleSidebar}
              >
                <BackwardIcon className="size-5" />
              </Button>
            </>
          ) : (
            <div className="relative size-10">
              <div className="pointer-events-none absolute inset-0 flex scale-100 items-center justify-center opacity-100 transition-all duration-200 group-hover:scale-75 group-hover:opacity-0">
                <LogoIcon className="size-6" />
              </div>
              <div className="pointer-events-none absolute inset-0 flex scale-75 items-center justify-center opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100">
                <Button
                  aria-label="Expand sidebar"
                  variant="ghost"
                  size="icon-lg"
                  className="text-muted-foreground rounded-lg"
                  onClick={toggleSidebar}
                >
                  <BackwardIcon className="size-5 rotate-180" />
                </Button>
              </div>
            </div>
          )}
        </SidebarHeader>

        <SidebarContent className="px-4.5 pt-6 pb-2">
          <SidebarMenu className="gap-1.5">
            {primaryNavigation.map((item) => (
              <SidebarNavigationItem
                key={item.section}
                active={item.section === activeSection}
                item={item}
                activeSubsection={activeSubsection}
              />
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="shrink-0 border-t px-4.5 pt-2 pb-6">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={activeSection === "help-support"}
                render={
                  <Link href="/help-support">
                    <HelpIcon />
                    {!collapsed && <span>Help & Support</span>}
                  </Link>
                }
              />
            </SidebarMenuItem>
            <SidebarMenuItem className="flex items-center gap-1">
              <SidebarMenuButton
                isActive={activeSection === "settings"}
                className="min-w-0 flex-1"
                render={
                  <Link href="/settings">
                    <SettingsIcon />
                    {!collapsed && <span>Settings</span>}
                  </Link>
                }
              />
              {!collapsed && (
                <Button
                  aria-label="Toggle theme"
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground size-11 bg-transparent! hover:bg-transparent!"
                  onClick={toggleTheme}
                >
                  <ThemeIcon className="size-5" />
                </Button>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <MobileBottomNavigation
        activeSection={activeSection}
        activeSubsection={activeSubsection}
        onToggleTheme={toggleTheme}
      />
    </>
  );
}

function MobileBottomNavigation({
  activeSection,
  activeSubsection,
  onToggleTheme,
}: {
  activeSection: string;
  activeSubsection?: string;
  onToggleTheme: () => void;
}) {
  const [moreOpen, setMoreOpen] = useState(false);
  const { selectedOrg, setSelectedOrg } = useOrganization();
  const moreActive = mobileMoreNavigation.some(
    (item) => item.section === activeSection,
  );

  return (
    <div className="bg-sidebar/95 fixed inset-x-0 bottom-0 z-50 grid h-16 grid-cols-5 items-center border-t px-2 backdrop-blur-md md:hidden">
      {mobilePrimaryNavigation.map((item) => {
        const active = item.section === activeSection;
        const activeSubItem =
          active && activeSubsection
            ? item.subItems?.find((subItem) =>
                subItem.href.endsWith(`/${activeSubsection}`),
              )
            : undefined;
        const Icon = activeSubItem?.icon ?? item.icon;
        const label = activeSubItem?.label ?? item.label;

        if (item.section === "catalog") {
          return (
            <DropdownMenu key={item.section}>
              <DropdownMenuTrigger
                render={
                  <Button
                    aria-label={label}
                    variant="ghost"
                    className={cn(
                      "text-muted-foreground hover:text-foreground h-full w-full min-w-0 px-0 py-0 hover:bg-transparent",
                      active && "text-primary hover:text-primary",
                    )}
                  >
                    <Icon className="size-5 shrink-0" />
                  </Button>
                }
              />
              <DropdownMenuContent
                side="top"
                align="center"
                sideOffset={8}
                className="librar bg-popover z-50 w-48 rounded-lg border p-2 shadow-lg"
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-muted-foreground px-2 py-1.5 text-xs font-semibold tracking-wider uppercase">
                    Catalog Sections
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {item.subItems?.map((subItem) => {
                    const SubIcon = subItem.icon;
                    const subItemActive =
                      active && subItem.href.endsWith(`/${activeSubsection}`);

                    return (
                      <DropdownMenuItem
                        key={subItem.href}
                        className={cn(
                          "rounded-lg",
                          subItemActive && "bg-secondary text-primary",
                        )}
                        render={
                          <Link
                            href={subItem.href}
                            className="flex items-center gap-2"
                          >
                            <SubIcon className="size-4.5 shrink-0" />
                            <span>{subItem.label}</span>
                          </Link>
                        }
                      />
                    );
                  })}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        }

        return (
          <Link
            key={item.section}
            href={item.href}
            aria-label={item.label}
            className={cn(
              "text-muted-foreground hover:text-foreground flex h-full min-w-0 items-center justify-center transition-colors",
              active && "text-primary hover:text-primary",
            )}
          >
            <Icon className="size-5 shrink-0" />
          </Link>
        );
      })}

      <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
        <SheetTrigger
          render={
            <Button
              aria-label="Open more navigation"
              variant="ghost"
              className={cn(
                "text-muted-foreground hover:text-foreground h-full w-full min-w-0 px-0 py-0 hover:bg-transparent",
                moreActive && "text-primary hover:text-primary",
              )}
            >
              <Ellipsis className="size-5 shrink-0" />
            </Button>
          }
        />
        <SheetContent
          side="bottom"
          className="librar max-h-[85dvh] gap-0 rounded-t-3xl px-4 pt-2 pb-[calc(1rem+env(safe-area-inset-bottom))] md:hidden"
        >
          <div className="bg-border mx-auto mb-2 h-1 w-10 rounded-full" />
          <SheetHeader className="px-0 pt-2 pb-3">
            <SheetTitle className="text-lg font-semibold">More</SheetTitle>
          </SheetHeader>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  className="h-auto w-full justify-between py-2"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="bg-foreground text-background dark:bg-muted flex size-10 shrink-0 items-center justify-center rounded-lg">
                      <BuildingIcon className="size-5" />
                    </span>
                    <span className="min-w-0 text-left">
                      <span className="text-muted-foreground block text-xs font-normal">
                        Librar branch
                      </span>
                      <span className="block truncate text-sm font-semibold">
                        {selectedOrg}
                      </span>
                    </span>
                  </span>
                  <ArrowDown01Icon className="text-muted-foreground size-5 shrink-0" />
                </Button>
              }
            />
            <DropdownMenuContent
              align="center"
              side="top"
              sideOffset={8}
              className="librar bg-popover z-70 w-[calc(100vw-2rem)] max-w-sm rounded-xl border p-2 shadow-lg"
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-muted-foreground px-2 py-1.5 text-xs font-semibold tracking-wider uppercase">
                  Select Branch
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {organizations.map((organization) => (
                  <DropdownMenuItem
                    key={organization}
                    onClick={() => setSelectedOrg(organization)}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-2 py-2.5",
                      organization === selectedOrg && "text-primary",
                    )}
                  >
                    <span>{organization}</span>
                    {organization === selectedOrg && (
                      <Check className="text-primary size-4" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <nav aria-label="More navigation" className="space-y-1">
            {mobileMoreNavigation.map((item) => {
              const Icon = item.icon;
              const active = item.section === activeSection;

              return (
                <Link
                  key={item.section}
                  href={item.href}
                  onClick={() => setMoreOpen(false)}
                  className={cn(
                    "text-muted-foreground hover:bg-accent hover:text-accent-foreground flex h-12 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors",
                    active && "bg-secondary text-primary",
                  )}
                >
                  <span className="bg-secondary flex size-9 shrink-0 items-center justify-center rounded-lg [&_svg]:size-5">
                    <Icon />
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <Link
              href="/help-support"
              onClick={() => setMoreOpen(false)}
              className={cn(
                "text-muted-foreground hover:bg-accent hover:text-accent-foreground flex h-12 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors",
                activeSection === "help-support" && "bg-secondary text-primary",
              )}
            >
              <span className="bg-secondary flex size-9 shrink-0 items-center justify-center rounded-lg">
                <HelpIcon className="size-5" />
              </span>
              <span>Help & Support</span>
            </Link>
            <div className="flex items-center gap-1">
              <Link
                href="/settings"
                onClick={() => setMoreOpen(false)}
                className={cn(
                  "text-muted-foreground hover:bg-accent hover:text-accent-foreground flex h-12 min-w-0 flex-1 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors",
                  activeSection === "settings" && "bg-secondary text-primary",
                )}
              >
                <span className="bg-secondary flex size-9 shrink-0 items-center justify-center rounded-lg">
                  <SettingsIcon className="size-5" />
                </span>
                <span>Settings</span>
              </Link>
              <Button
                aria-label="Toggle theme"
                variant="ghost"
                size="icon"
                className="text-muted-foreground size-11 bg-transparent! hover:bg-transparent!"
                onClick={onToggleTheme}
              >
                <ThemeIcon className="size-5" />
              </Button>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
