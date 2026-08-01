'use client';

import { Check, Ellipsis } from 'lucide-react';
import { useRef, useState } from 'react';

import { Logo } from './logo';
import { useTheme } from './theme-provider';

import {
  ArrowDown01Icon,
  BackwardIcon,
  BuildingIcon,
  HelpIcon,
  SettingsIcon,
  ThemeIcon,
} from './icons';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import {
  type NavigationItem,
  organizations,
  primaryNavigation,
} from '../../data';

const menuButtonBaseClassName =
  'h-11 gap-3 rounded-lg border border-transparent px-3.5 font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:bg-muted active:text-foreground data-active:border-border data-active:bg-card data-active:text-primary data-active:shadow-[1.35px_2.7px_32.45px_rgba(158,158,158,0.08)] data-active:hover:bg-card data-active:hover:text-primary data-active:active:bg-card data-active:active:text-primary [&_svg]:size-5 [&_svg]:text-foreground data-active:[&_svg]:text-primary';

const sidebarMenuButtonClassName = cn(
  menuButtonBaseClassName,
  'group-data-[collapsible=icon]:size-11! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0!',
);

const sidebarMenuSubButtonClassName = cn(
  menuButtonBaseClassName,
  '[&_svg]:text-foreground! data-active:[&_svg]:text-primary!',
);

const subItemsMenuContentClassName = 'z-100 w-48 p-1.5 shadow-lg';

const bottomNavItemClassName = cn(
  buttonVariants({ variant: 'ghost' }),
  'text-foreground hover:text-primary h-full flex-1 px-0 hover:bg-transparent rounded-none',
);

const moreNavItemClassName = cn(
  menuButtonBaseClassName,
  'flex items-center text-sm',
);

const mobilePrimaryNavigation = primaryNavigation.slice(0, 4);
const mobileMoreNavigation = primaryNavigation.slice(4);

type DashboardSidebarProps = {
  activeSection?: string;
  activeSubsection?: string;
};

export function DashboardSidebar({
  activeSection = 'dashboard',
  activeSubsection,
}: DashboardSidebarProps) {
  const { state, toggleSidebar } = useSidebar();
  const { toggleTheme } = useTheme();
  const collapsed = state === 'collapsed';

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader
          className={cn(
            'h-21 flex-row items-center border-b p-0 transition-[padding] duration-200 library-dashboard bg-background',
            collapsed ? 'justify-start px-5' : 'justify-between px-4.5',
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
                variant="secondary"
                size="icon-lg"
                onClick={toggleSidebar}
              >
                <BackwardIcon className="size-5" />
              </Button>
            </>
          ) : (
            <div className="relative size-10">
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center transition-all duration-200 group-hover:scale-75 group-hover:opacity-0">
                <Logo className="size-6" />
              </div>
              <div className="pointer-events-none absolute inset-0 flex scale-75 items-center justify-center opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100">
                <Button
                  aria-label="Expand sidebar"
                  variant="secondary"
                  size="icon-lg"
                  onClick={toggleSidebar}
                >
                  <BackwardIcon className="size-5 rotate-180" />
                </Button>
              </div>
            </div>
          )}
        </SidebarHeader>

        <SidebarContent className="px-4.5 pt-6 pb-2 library-dashboard bg-background">
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

        <SidebarFooter className="border-t px-4.5 pt-2 pb-6 library-dashboard bg-background">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={activeSection === 'help-support'}
                tooltip="Help & Support"
                className={sidebarMenuButtonClassName}
                onClick={(event) => event.preventDefault()}
              >
                <HelpIcon />
                {!collapsed && <span>Help & Support</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem className="flex items-center gap-1">
              <SidebarMenuButton
                isActive={activeSection === 'settings'}
                tooltip="Settings"
                className={cn(sidebarMenuButtonClassName, !collapsed && 'flex-1')}
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
                  className="size-11"
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
      />
    </>
  );
}

function MobileBottomNavigation({
  activeSection,
  activeSubsection,
}: {
  activeSection: string;
  activeSubsection?: string;
}) {
  const { toggleTheme } = useTheme();
  const [moreOpen, setMoreOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<string>(organizations[0]);
  const moreActive = mobileMoreNavigation.some(
    (item) => item.section === activeSection,
  );

  return (
    <div className="bg-sidebar fixed inset-x-0 bottom-0 z-50 flex h-16 items-center justify-around border-t px-2 md:hidden">
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

        if (item.subItems?.length) {
          return (
            <DropdownMenu key={item.section}>
              <DropdownMenuTrigger
                aria-label={label}
                className={cn(
                  bottomNavItemClassName,
                  active && 'text-primary font-medium',
                )}
              >
                <Icon className="size-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="center"
                sideOffset={8}
                className={subItemsMenuContentClassName}
              >
                <NavigationSubItemsMenu
                  item={item}
                  isSubItemActive={(href) =>
                    active && href.endsWith(`/${activeSubsection}`)
                  }
                />
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
              bottomNavItemClassName,
              active && 'text-primary font-medium',
            )}
          >
            <Icon className="size-5" />
          </a>
        );
      })}

      <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
        <SheetTrigger
          aria-label="More navigation"
          className={cn(
            bottomNavItemClassName,
            moreActive && 'text-primary font-medium',
          )}
        >
          <Ellipsis className="size-5" />
        </SheetTrigger>
        <SheetContent
          side="bottom"
          showCloseButton={false}
          className="max-h-[85dvh] gap-1.5 rounded-t-3xl px-4 pt-2 pb-[calc(1rem+env(safe-area-inset-bottom))] md:hidden"
        >
          <div className="bg-border mx-auto h-1 w-10 rounded-full" />
          <SheetHeader className="px-0 pt-2 pb-1">
            <SheetTitle className="text-lg font-semibold">More</SheetTitle>
          </SheetHeader>

          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'h-auto w-full justify-between py-2',
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
              <ArrowDown01Icon className="text-muted-foreground size-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              side="top"
              sideOffset={8}
              className="z-70 w-[calc(100vw-2rem)] max-w-sm rounded-xl p-2 shadow-lg"
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel className="px-2 py-1.5 font-semibold tracking-wider uppercase">
                  Select Branch
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {organizations.map((organization) => (
                  <DropdownMenuItem
                    key={organization}
                    onClick={() => setSelectedOrg(organization)}
                    className={cn(
                      'justify-between rounded-lg px-2 py-2.5',
                      organization === selectedOrg
                        ? 'text-primary font-semibold'
                        : 'text-muted-foreground',
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

          <nav aria-label="More navigation" className="flex flex-col gap-1.5">
            {mobileMoreNavigation.map((item) => {
              const Icon = item.icon;
              const active = item.section === activeSection;

              return (
                <a
                  key={item.section}
                  href={item.href}
                  data-active={active || undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    setMoreOpen(false);
                  }}
                  className={moreNavItemClassName}
                >
                  <Icon />
                  <span>{item.label}</span>
                </a>
              );
            })}
            <a
              href="#"
              data-active={activeSection === 'help-support' || undefined}
              onClick={(e) => {
                e.preventDefault();
                setMoreOpen(false);
              }}
              className={moreNavItemClassName}
            >
              <HelpIcon />
              <span>Help & Support</span>
            </a>
            <div className="flex items-center gap-1">
              <a
                href="#"
                data-active={activeSection === 'settings' || undefined}
                onClick={(e) => {
                  e.preventDefault();
                  setMoreOpen(false);
                }}
                className={cn(moreNavItemClassName, 'flex-1')}
              >
                <SettingsIcon />
                <span>Settings</span>
              </a>
              <Button
                aria-label="Toggle theme"
                variant="ghost"
                size="icon"
                className="size-11"
                onClick={toggleTheme}
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

type SidebarNavigationItemProps = {
  active: boolean;
  activeSubsection?: string;
  item: NavigationItem;
};

function SidebarNavigationItem({
  active,
  activeSubsection,
  item,
}: SidebarNavigationItemProps) {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
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
    setOpen((currentOpen) => !currentOpen);
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
      {collapsed && hasSubItems ? (
        <DropdownMenu
          modal={false}
          open={flyoutOpen}
          onOpenChange={setFlyoutOpen}
        >
          <DropdownMenuTrigger
            aria-label={displayedLabel}
            data-active={active || undefined}
            onPointerEnter={openFlyout}
            onPointerLeave={scheduleFlyoutClose}
            className={cn(sidebarMenuButtonClassName, 'flex w-full items-center')}
          >
            <DisplayedIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="right"
            align="start"
            sideOffset={8}
            onPointerEnter={openFlyout}
            onPointerLeave={scheduleFlyoutClose}
            className={subItemsMenuContentClassName}
          >
            <NavigationSubItemsMenu
              item={item}
              isSubItemActive={isActiveSubItem}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      ) : hasSubItems ? (
        <SidebarMenuButton
          isActive={active}
          onClick={toggleOpen}
          className={sidebarMenuButtonClassName}
        >
          <DisplayedIcon />
          {!collapsed && (
            <>
              <span>{displayedLabel}</span>
              <ArrowDown01Icon
                className={cn(
                  'pointer-events-none ml-auto size-4.5 transition-transform',
                  open && 'rotate-180',
                )}
              />
            </>
          )}
        </SidebarMenuButton>
      ) : (
        <SidebarMenuButton
          isActive={active}
          tooltip={displayedLabel}
          className={sidebarMenuButtonClassName}
          onClick={(event) => event.preventDefault()}
        >
          <DisplayedIcon />
          {!collapsed && <span>{displayedLabel}</span>}
        </SidebarMenuButton>
      )}

      {showSubItems ? (
        <SidebarMenuSub>
          {subItems?.map((subItem) => {
            const SubIcon = subItem.icon;
            return (
              <SidebarMenuSubItem key={subItem.href}>
                <SidebarMenuSubButton
                  isActive={isActiveSubItem(subItem.href)}
                  className={sidebarMenuSubButtonClassName}
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

function NavigationSubItemsMenu({
  item,
  isSubItemActive,
}: {
  item: NavigationItem;
  isSubItemActive: (href: string) => boolean;
}) {
  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel className="px-2 py-1 font-semibold tracking-wider uppercase">
        {item.label}
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      {item.subItems?.map((subItem) => {
        const SubIcon = subItem.icon;

        return (
          <DropdownMenuItem
            key={subItem.href}
            data-active={isSubItemActive(subItem.href) || undefined}
            onClick={(event) => event.preventDefault()}
            className={cn(
              sidebarMenuSubButtonClassName,
              'h-10 gap-2.5 px-3 focus:bg-muted focus:text-foreground data-active:focus:bg-card data-active:focus:text-primary',
            )}
          >
            <SubIcon />
            <span>{subItem.label}</span>
          </DropdownMenuItem>
        );
      })}
    </DropdownMenuGroup>
  );
}
