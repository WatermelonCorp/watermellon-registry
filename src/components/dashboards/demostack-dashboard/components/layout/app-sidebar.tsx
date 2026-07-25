'use client';

import { useState } from 'react';
import {
  Blocks,
  ChevronDown,
  ChevronsLeft,
  LogOut,
  Moon,
  Settings,
  Sun,
  User,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { BuildingIcon, CaretUpDownIcon } from '../../assets/icons';
import { DemostackLogo } from '../../assets/logo';
import { SidebarNavigationItem } from './sidebar-navigation-item';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  adminNavigation,
  companies,
  workspaceNavigation,
} from '../../navigation-data';
import { cn } from '@/lib/utils';

export function AppSidebar() {
  const { isMobile, setOpen, setOpenMobile, state } = useSidebar();
  const { resolvedTheme, setTheme } = useTheme();
  const collapsed = !isMobile && state === 'collapsed';
  const [membersOpen, setMembersOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<
    (typeof companies)[number]
  >(companies[0]);

  return (
    <Sidebar
      collapsible="icon"
      className="m-1.5 h-[calc(100svh-0.75rem)]! w-[calc(var(--sidebar-width)-0.75rem)]! overflow-hidden! border-none! group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)-0.75rem)]! [&>[data-sidebar=sidebar]]:bg-transparent"
    >
      <SidebarHeader className="p-0">
        <div
          className={cn(
            'bg-card shadow-border flex shrink-0 flex-col rounded-2xl border',
            collapsed ? 'items-center p-2' : 'p-3 pt-3.5',
          )}
        >
          <div
            className={cn(
              'flex w-full items-center',
              collapsed ? 'justify-center' : 'justify-between',
            )}
          >
            {collapsed ? (
              <div className="group/logo relative flex size-10 shrink-0 items-center justify-center">
                <DemostackLogo
                  aria-label="Demostack"
                  className="size-8 shrink-0 transition-opacity duration-200 group-hover/logo:opacity-0"
                />
                <Button
                  aria-label="Expand sidebar"
                  variant="ghost"
                  size="icon-lg"
                  className="pointer-events-none absolute rounded-full opacity-0 transition-opacity duration-200 group-hover/logo:pointer-events-auto group-hover/logo:opacity-100 focus-visible:pointer-events-auto focus-visible:opacity-100"
                  onClick={() => setOpen(true)}
                >
                  <ChevronsLeft className="size-5 rotate-180" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <DemostackLogo className="size-7" />
                <span className="text-lg font-semibold">Demostack</span>
              </div>
            )}
            {!collapsed && (
              <Button
                aria-label={isMobile ? 'Close sidebar' : 'Collapse sidebar'}
                variant="ghost"
                size="icon-lg"
                className="rounded-full"
                onClick={() =>
                  isMobile ? setOpenMobile(false) : setOpen(false)
                }
              >
                <ChevronsLeft className="size-5" />
              </Button>
            )}
          </div>

          <div className="mt-3 w-full">
            <DropdownMenu>
              <DropdownMenuTrigger
                aria-label={
                  collapsed
                    ? `Switch organization, currently ${selectedCompany.name}`
                    : undefined
                }
                className={cn(
                  'focus-visible:ring-ring transition-colors outline-none focus-visible:ring-2',
                  collapsed
                    ? 'hover:ring-accent mx-auto flex rounded-full hover:ring-4'
                    : 'bg-muted hover:bg-accent flex w-full items-center justify-between rounded-xl p-2 text-left',
                )}
              >
                {collapsed ? (
                  <CompanyIcon />
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <CompanyIcon />
                      <div className="leading-normal">
                        <p className="text-sm font-medium">
                          {selectedCompany.name}
                        </p>
                        <p className="text-muted-foreground mt-0.5 text-xs">
                          {selectedCompany.role}
                        </p>
                      </div>
                    </div>
                    <CaretUpDownIcon />
                  </>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56"
                align="start"
                side={collapsed ? 'right' : 'bottom'}
                sideOffset={collapsed ? 16 : 4}
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Select organization</DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={selectedCompany.name}
                  onValueChange={(companyName) => {
                    const company = companies.find(
                      ({ name }) => name === companyName,
                    );
                    if (company) setSelectedCompany(company);
                  }}
                >
                  {companies.map((company) => (
                    <DropdownMenuRadioItem
                      key={company.name}
                      value={company.name}
                      className="data-checked:text-primary! data-checked:**:text-primary! py-2.5 data-checked:font-semibold"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm">{company.name}</span>
                        <span
                          className={cn(
                            'text-muted-foreground text-xs',
                            company.name === selectedCompany.name &&
                              'opacity-60 dark:opacity-100',
                          )}
                        >
                          {company.role}
                        </span>
                      </div>
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {!collapsed && (
              <div className="mt-3 space-y-2">
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground h-auto w-full justify-between p-0 transition-colors hover:bg-transparent aria-expanded:bg-transparent"
                  aria-expanded={membersOpen}
                  onClick={() => setMembersOpen((open) => !open)}
                >
                  <span className="flex items-center gap-2">
                    <span>Members</span>
                    <span className="bg-primary/10 text-primary inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[0.6875rem] font-semibold tabular-nums">
                      1
                    </span>
                  </span>
                  <ChevronDown
                    className={cn(
                      'size-4 transition-transform',
                      !membersOpen && '-rotate-90',
                    )}
                  />
                </Button>
                {membersOpen && (
                  <Avatar className="size-8 border">
                    <AvatarImage
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256"
                      alt="Member avatar"
                    />
                    <AvatarFallback>M</AvatarFallback>
                  </Avatar>
                )}
              </div>
            )}
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent
        className={cn(
          'gap-6 overflow-x-hidden! overflow-y-auto! py-4 transition-[padding] duration-200 ease-out',
          collapsed ? 'px-1' : 'px-3',
        )}
      >
        <NavigationGroup
          label="Workspace"
          items={workspaceNavigation}
          collapsed={collapsed}
        />
        <NavigationGroup
          label="Admin"
          items={adminNavigation}
          collapsed={collapsed}
        />
      </SidebarContent>

      <SidebarFooter className="bg-sidebar relative z-10 shrink-0 border-t px-0 py-2">
        {isMobile && (
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="bg-card shadow-border mx-3 justify-start rounded-xl border-0"
          >
            <Blocks />
            Add Extension
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              'hover:bg-accent/50 flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left transition-colors outline-none',
              collapsed && 'ml-0.5 size-12 justify-center rounded-full p-0',
            )}
          >
            <Avatar className="size-10 border">
              <AvatarImage
                src="https://api.dicebear.com/10.x/notionists/svg"
                alt="Vansh Patel"
              />
              <AvatarFallback>VP</AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="min-w-0 flex-1 leading-tight">
                <p className="truncate font-medium">Vansh Patel</p>
                <p className="text-muted-foreground truncate text-sm">
                  vanshpatel@gmail.com
                </p>
              </div>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mb-2 w-56" align="start">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal">
                <p className="text-sm font-semibold">Vansh Patel</p>
                <p className="text-muted-foreground mt-1 text-xs">
                  vanshpatel@gmail.com
                </p>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings />
              Account Settings
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
              }
            >
              {resolvedTheme === 'dark' ? <Sun /> : <Moon />}
              {resolvedTheme === 'dark' ? 'Light mode' : 'Dark mode'}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

function CompanyIcon() {
  return (
    <div className="bg-foreground dark:bg-background flex size-8 shrink-0 items-center justify-center rounded-full">
      <BuildingIcon className="size-3.5" />
    </div>
  );
}

function NavigationGroup({
  label,
  items,
  collapsed,
}: {
  label: string;
  items: typeof workspaceNavigation;
  collapsed: boolean;
}) {
  return (
    <div className="space-y-3">
      {!collapsed && (
        <span className="text-muted-foreground block px-3 text-sm font-medium">
          {label}
        </span>
      )}
      <SidebarMenu className="gap-2">
        {items.map((item) => (
          <SidebarNavigationItem key={item.href} item={item} />
        ))}
      </SidebarMenu>
    </div>
  );
}
