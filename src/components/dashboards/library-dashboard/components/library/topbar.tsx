'use client';

import { useEffect, useRef, useState } from 'react';

import { Check, Search, X } from 'lucide-react';

import {
  ArrowDown01Icon,
  BellIcon,
  BuildingIcon,
  DashboardIcon,
} from './icons';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { organizations, topNavNotifications } from '../../data';
import { cn } from '@/lib/utils';

const searchPlaceholder = '“Search catalog, members, ISBN”';

export function DashboardTopbar() {
  const [selectedOrg, setSelectedOrg] = useState<string>(organizations[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mobileSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [mobileSearchOpen]);

  return (
    <header className="bg-background sticky top-0 z-30 flex h-16 items-center gap-2 border-b px-4 md:h-21 md:pl-6 md:pr-8">
      <div
        className={cn(
          'mr-auto flex items-center gap-2 md:gap-3 text-lg font-medium',
          mobileSearchOpen && 'hidden md:flex',
        )}
      >
        <SidebarTrigger size="icon-lg" className="size-11 md:hidden" />
        <DashboardIcon className="hidden size-5 md:block" />
        <span className="truncate">Dashboard</span>
      </div>

      <InputGroup
        className={cn(
          'bg-input h-11 gap-1.75 border-none pl-3 md:flex md:w-78 md:flex-none',
          mobileSearchOpen ? 'flex-1' : 'hidden',
        )}
      >
        <InputGroupAddon className="pl-0">
          <Search className="size-5 text-secondary-foreground" />
        </InputGroupAddon>
        <InputGroupInput
          ref={searchInputRef}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          aria-label="Search catalog, members, ISBN"
          className="h-full p-0 pl-0!"
          placeholder={searchPlaceholder}
        />
      </InputGroup>

      <Button
        aria-label={mobileSearchOpen ? 'Close search' : 'Search library'}
        aria-pressed={mobileSearchOpen}
        variant="secondary"
        size="icon-lg"
        className="size-11 md:hidden"
        onClick={() => setMobileSearchOpen((open) => !open)}
      >
        {mobileSearchOpen ? (
          <X className="size-5" />
        ) : (
          <Search className="size-5" />
        )}
      </Button>

      <div className={cn(mobileSearchOpen && 'hidden md:block')}>
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label="Notifications"
            className={cn(
              buttonVariants({ variant: 'secondary', size: 'icon-lg' }),
              'relative size-11',
            )}
          >
            <BellIcon className="size-5" />
            {topNavNotifications.some(
              (notification) => notification.unread,
            ) && (
              <span className="absolute top-3.25 left-6 size-1.5 rounded-full bg-red-500" />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-[calc(100vw-2rem)] max-w-80"
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="flex items-center justify-between px-2 py-1.5 font-semibold tracking-wider uppercase">
                <span>Notifications</span>
                <span className="font-normal tracking-normal normal-case">
                  {
                    topNavNotifications.filter(
                      (notification) => notification.unread,
                    ).length
                  }{' '}
                  unread
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-70 space-y-1 overflow-y-auto py-1">
                {topNavNotifications.slice(0, 3).map((notif) => (
                  <DropdownMenuItem
                    key={notif.id}
                    className="flex h-18 cursor-default flex-col items-start gap-1 rounded-md p-2.5 outline-hidden transition-colors"
                  >
                    <div className="flex w-full items-start justify-between gap-2">
                      <span className="line-clamp-2 text-xs leading-normal font-semibold">
                        {notif.text}
                      </span>
                      {notif.unread && (
                        <span className="mt-1 size-1.5 shrink-0 rounded-full bg-red-500" />
                      )}
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
                onClick={(event) => event.preventDefault()}
              >
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="hidden md:block">
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label={`Select library branch. Current branch: ${selectedOrg}`}
            className="flex h-11 cursor-pointer items-center justify-center gap-2"
          >
            <div className="bg-foreground text-background dark:bg-muted flex size-11 items-center justify-center rounded-lg">
              <BuildingIcon className="size-6" />
            </div>
            <ArrowDown01Icon className="size-6" />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-60 rounded-xl p-2 shadow-lg"
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="px-2 py-1.5 font-semibold tracking-wider uppercase">
                Select Branch
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {organizations.map((org) => (
                <DropdownMenuItem
                  key={org}
                  onClick={() => setSelectedOrg(org)}
                  className={cn(
                    'justify-between rounded-lg px-2 py-2.5',
                    org === selectedOrg
                      ? 'text-primary font-semibold'
                      : 'text-muted-foreground',
                  )}
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
    </header>
  );
}
