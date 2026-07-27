"use client";

import { Check, Ellipsis } from "lucide-react";
import {
  type ComponentType,
  type CSSProperties,
  type SVGProps,
  useEffect,
  useState,
} from "react";

import { Logo } from "../../assets/logo";

import {
  ArrowDown01Icon,
  BackwardIcon,
  BuildingIcon,
  CatalogIcon,
  CirculationIcon,
  DashboardIcon,
  HelpIcon,
  IntelligenceIcon,
  MembersIcon,
  OpacIcon,
  ReportsIcon,
  SettingsIcon,
  ThemeIcon,
} from "../../assets/icons";
import { SidebarNavigationItem } from "./sidebar-navigation-item";
import { useOrganization } from "./organization-provider";
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
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { organizations } from "../../data";
import { librarySidebarMenuButtonClassName } from "./sidebar-menu-styles";

export type NavigationIcon = ComponentType<SVGProps<SVGSVGElement>>;

export type NavigationItem = {
  label: string;
  href: string;
  icon: NavigationIcon;
  section: string;
  subItems?: {
    label: string;
    href: string;
    icon: NavigationIcon;
  }[];
};

export const primaryNavigation: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: DashboardIcon,
    section: "dashboard",
  },
  {
    label: "Catalog",
    href: "/catalog",
    icon: CatalogIcon,
    section: "catalog",
    subItems: [
      { label: "Items", href: "/catalog/items", icon: CatalogIcon },
      {
        label: "Categories",
        href: "/catalog/categories",
        icon: ReportsIcon,
      },
      { label: "Authors", href: "/catalog/authors", icon: MembersIcon },
    ],
  },
  {
    label: "Circulation",
    href: "/circulation",
    icon: CirculationIcon,
    section: "circulation",
  },
  {
    label: "Members",
    href: "/members",
    icon: MembersIcon,
    section: "members",
  },
  {
    label: "OPAC",
    href: "/opac",
    icon: OpacIcon,
    section: "opac",
  },
  {
    label: "Library Intelligence",
    href: "/library-intelligence",
    icon: IntelligenceIcon,
    section: "library-intelligence",
  },
  {
    label: "Reports",
    href: "/reports",
    icon: ReportsIcon,
    section: "reports",
  },
];

export const contentSections = new Set([
  ...primaryNavigation
    .filter((item) => item.section !== "dashboard")
    .map((item) => item.section),
  "help-support",
  "settings",
  "scan",
]);

const mobilePrimaryNavigation = primaryNavigation.slice(0, 4);
const mobileMoreNavigation = primaryNavigation.slice(4);

type AppSidebarProps = {
  activeSection?: string;
  activeSubsection?: string;
};

export function AppSidebar({
  activeSection = "dashboard",
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
      <Sidebar
        collapsible="icon"
        className="bg-sidebar border-r"
        style={
          {
            "--sidebar-width": "18.125rem",
            "--sidebar-width-icon": "5rem",
          } as CSSProperties
        }
      >
        <SidebarHeader
          className={cn(
            "group relative flex h-21 flex-row items-center border-b p-0 transition-[padding] duration-200",
            collapsed ? "justify-center px-0" : "justify-between px-4.5",
          )}
        >
          {!collapsed ? (
            <>
              <a
                aria-label="Library dashboard"
                className="flex h-8 items-center gap-2"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                <Logo className="size-8" />
                <span className="text-xl font-bold tracking-tight">
                  Library
                </span>
              </a>
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
                <Logo className="size-6 object-contain" />
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
                className={cn(
                  librarySidebarMenuButtonClassName,
                  activeSection === "help-support" && "text-primary",
                )}
                onClick={(event) => event.preventDefault()}
              >
                <HelpIcon />
                {!collapsed && <span>Help & Support</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem className="flex items-center gap-1">
              <SidebarMenuButton
                isActive={activeSection === "settings"}
                className={cn(
                  librarySidebarMenuButtonClassName,
                  "min-w-0",
                  !collapsed && "flex-1",
                  activeSection === "settings" && "text-primary",
                )}
                onClick={(event) => event.preventDefault()}
              >
                <SettingsIcon />
                {!collapsed && <span>Settings</span>}
              </SidebarMenuButton>
              {!collapsed && (
                <Button
                  aria-label="Toggle theme"
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground size-11 bg-transparent! hover:bg-transparent! focus-visible:bg-transparent!"
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
    <div className="bg-sidebar/95 fixed inset-x-0 bottom-0 z-50 flex h-16 items-center justify-around border-t px-2 backdrop-blur-md md:hidden">
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
                aria-label={label}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "text-muted-foreground hover:text-primary h-full flex-1 items-center justify-center px-0 py-0 hover:bg-transparent",
                  active && "text-primary font-semibold",
                )}
              >
                <Icon className="size-5 shrink-0" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="center"
                sideOffset={8}
                className="bg-popover z-50 w-48 rounded-lg border p-2 shadow-lg"
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
                          subItemActive &&
                            "bg-secondary text-primary font-semibold",
                        )}
                        onClick={(event) => event.preventDefault()}
                      >
                        <SubIcon className="size-4.5 shrink-0" />
                        <span>{subItem.label}</span>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        }

        return (
          <a
            key={item.section}
            href={item.href}
            aria-label={item.label}
            onClick={(e) => e.preventDefault()}
            className={cn(
              "text-muted-foreground hover:text-primary flex h-full flex-1 items-center justify-center transition-colors",
              active && "text-primary font-semibold",
            )}
          >
            <Icon className="size-5 shrink-0" />
          </a>
        );
      })}

      <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
        <SheetTrigger
          aria-label="More navigation"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "text-muted-foreground hover:text-primary h-full flex-1 items-center justify-center px-0 py-0 hover:bg-transparent",
            moreActive && "text-primary font-semibold",
          )}
        >
          <Ellipsis className="size-5 shrink-0" />
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="max-h-[85dvh] gap-0 rounded-t-3xl px-4 pt-2 pb-[calc(1rem+env(safe-area-inset-bottom))] md:hidden"
        >
          <div className="bg-border mx-auto mb-2 h-1 w-10 rounded-full" />
          <SheetHeader className="px-0 pt-2 pb-3">
            <SheetTitle className="text-lg font-semibold">More</SheetTitle>
          </SheetHeader>

          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "h-auto w-full justify-between py-2",
              )}
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className="bg-foreground text-background dark:bg-muted flex size-10 shrink-0 items-center justify-center rounded-lg">
                  <BuildingIcon className="size-5" />
                </span>
                <span className="min-w-0 text-left">
                  <span className="text-muted-foreground block text-xs font-normal">
                    Library branch
                  </span>
                  <span className="block truncate text-sm font-semibold">
                    {selectedOrg}
                  </span>
                </span>
              </span>
              <ArrowDown01Icon className="text-muted-foreground size-5 shrink-0" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              side="top"
              sideOffset={8}
              className="bg-popover z-70 w-[calc(100vw-2rem)] max-w-sm rounded-xl border p-2 shadow-lg"
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
                      organization === selectedOrg &&
                        "text-primary font-semibold",
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
                <a
                  key={item.section}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setMoreOpen(false);
                  }}
                  className={cn(
                    "text-muted-foreground hover:bg-muted hover:text-foreground flex h-12 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors",
                    active && "bg-secondary text-primary",
                  )}
                >
                  <span className="bg-secondary flex size-9 shrink-0 items-center justify-center rounded-lg [&_svg]:size-5">
                    <Icon />
                  </span>
                  <span>{item.label}</span>
                </a>
              );
            })}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setMoreOpen(false);
              }}
              className={cn(
                "text-muted-foreground hover:bg-muted hover:text-foreground flex h-12 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors",
                activeSection === "help-support" && "bg-secondary text-primary",
              )}
            >
              <span className="bg-secondary flex size-9 shrink-0 items-center justify-center rounded-lg">
                <HelpIcon className="size-5" />
              </span>
              <span>Help & Support</span>
            </a>
            <div className="flex items-center gap-1">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setMoreOpen(false);
                }}
                className={cn(
                  "text-muted-foreground hover:bg-muted hover:text-foreground flex h-12 min-w-0 flex-1 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors",
                  activeSection === "settings" && "bg-secondary text-primary",
                )}
              >
                <span className="bg-secondary flex size-9 shrink-0 items-center justify-center rounded-lg">
                  <SettingsIcon className="size-5" />
                </span>
                <span>Settings</span>
              </a>
              <Button
                aria-label="Toggle theme"
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground size-11 bg-transparent! hover:bg-transparent! focus-visible:bg-transparent!"
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
