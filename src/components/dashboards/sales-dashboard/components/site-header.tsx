'use client';
import { useState, useMemo } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from './ui/breadcrumb';
import { Separator } from './ui/separator';
import { SidebarTrigger } from './ui/sidebar';
import { Badge } from './ui/badge';
import {
  Bell,
  Search,
  Building2,
  Kanban,
  Settings,
  CreditCard,
  LogOut,
  User,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Dialog, DialogContent } from './ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Input } from './ui/input';
import { companiesData, deals } from '../data';

const NOTIFICATIONS = [
  {
    id: 1,
    Icon: CheckCircle2,
    title: 'Stripe deal marked as Closed Won',
    description: 'Noah Lee closed the deal · $442k',
    time: '5m ago',
    unread: true,
    iconColor: 'text-green-500',
    iconBg: 'bg-green-100 dark:bg-green-900/30',
  },
  {
    id: 2,
    Icon: Kanban,
    title: 'Apple deal moved to Negotiation',
    description: 'Alex Santos updated the stage',
    time: '1h ago',
    unread: true,
    iconColor: 'text-indigo-500',
    iconBg: 'bg-indigo-100 dark:bg-indigo-900/30',
  },
  {
    id: 3,
    Icon: Building2,
    title: 'LVMH QBR Call scheduled',
    description: 'Sarah Nguyen created an activity',
    time: '3h ago',
    unread: true,
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
  },
  {
    id: 4,
    Icon: AlertTriangle,
    title: 'Follow-up with Disney due today',
    description: 'Discovery call reminder',
    time: '6h ago',
    unread: false,
    iconColor: 'text-orange-500',
    iconBg: 'bg-orange-100 dark:bg-orange-900/30',
  },
  {
    id: 5,
    Icon: User,
    title: 'James Taylor mentioned you',
    description: 'In a comment on the Disney deal',
    time: 'Yesterday',
    unread: false,
    iconColor: 'text-neutral-500',
    iconBg: 'bg-neutral-100 dark:bg-neutral-800',
  },
];

export const SiteHeader = ({ currentView }: { currentView?: string }) => {
  const location = useLocation();
  const pathname = location.pathname;

  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [readIds, setReadIds] = useState<Set<number>>(new Set());

  const unreadCount = NOTIFICATIONS.filter(
    (n) => n.unread && !readIds.has(n.id),
  ).length;

  const markAllRead = () => setReadIds(new Set(NOTIFICATIONS.map((n) => n.id)));

  const markRead = (id: number) => setReadIds((prev) => new Set([...prev, id]));

  const getBreadcrumbLabel = () => {
    if (currentView) return currentView;
    if (pathname.includes('company')) return 'Companies';
    if (pathname.includes('dealsboard')) return 'Deals Board';
    return 'Dashboard';
  };

  const filteredCompanies = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return companiesData
      .filter((c) => c.name.toLowerCase().includes(q))
      .slice(0, 4);
  }, [query]);

  const filteredDeals = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return deals.filter((d) => d.company.toLowerCase().includes(q)).slice(0, 3);
  }, [query]);

  const hasResults = filteredCompanies.length > 0 || filteredDeals.length > 0;
  const showEmpty = query.trim().length > 0 && !hasResults;

  return (
    <header className="flex h-16 justify-between border-neutral-200 pr-5 dark:border-none">
      {/* Left — breadcrumb */}
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="my-auto mr-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex items-center gap-2">
          <Breadcrumb>
            <BreadcrumbItem className="flex items-center gap-1">
              <BreadcrumbLink href="#">{getBreadcrumbLabel()}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Badge variant="secondary" className="text-xs">
            <div className="size-1.5 rounded-full bg-green-600" />
            Active
          </Badge>
        </div>
      </div>

      {/* Right — actions */}
      <div className="flex items-center gap-2">
        {/* ── Search ── */}
        <button
          onClick={() => setSearchOpen(true)}
          className="flex size-7 cursor-pointer items-center justify-center rounded-full border-y border-neutral-200 bg-neutral-100 text-neutral-900 transition-colors hover:bg-neutral-200/50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700/50"
        >
          <Search className="size-4" />
        </button>

        <Dialog
          open={searchOpen}
          onOpenChange={(open) => {
            setSearchOpen(open);
            if (!open) setQuery('');
          }}
        >
          <DialogContent
            showCloseButton={false}
            className="top-[14%] translate-y-0 gap-0 overflow-hidden p-0 sm:max-w-lg"
          >
            <span className="sr-only">Search</span>

            {/* Single flex container — prevents grid row-sizing from collapsing body to zero */}
            <div className="flex flex-col">
              {/* input row */}
              <div className="flex items-center gap-3 px-4">
                <Search className="size-4 shrink-0 text-neutral-400 dark:text-neutral-500" />
                <Input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search companies, deals…"
                  className="h-12 border-0 bg-transparent dark:bg-transparent rounded-none px-0 text-sm shadow-none ring-0 placeholder:text-neutral-400 focus-visible:ring-0 dark:placeholder:text-neutral-600"
                />
                <kbd className="hidden shrink-0 rounded border border-neutral-200 px-1.5 py-0.5 text-[10px] text-neutral-400 sm:inline dark:border-neutral-700 dark:text-neutral-600">
                  ESC
                </kbd>
              </div>

              {/* thin rule */}
              <div className="h-px bg-neutral-100 dark:bg-neutral-800" />

              {/* default state — recent companies */}
              {query.trim() === '' && (
                <div className="p-2 pb-3">
                  <p className="px-2 py-1.5 text-[10px] font-semibold tracking-wider text-neutral-400 uppercase dark:text-neutral-600">
                    Recent
                  </p>
                  {companiesData.slice(0, 4).map((company) => (
                    <div
                      key={company.id}
                      onClick={() => setSearchOpen(false)}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                      <div className="flex size-7 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800/60">
                        <Building2 className="size-3.5 text-neutral-400 dark:text-neutral-500" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-neutral-900 dark:text-white">
                          {company.name}
                        </p>
                        <p className="text-xs text-neutral-400 dark:text-neutral-500">
                          {company.openDeals} open deals · $
                          {(company.pipelineValue / 1000).toFixed(0)}k pipeline
                        </p>
                      </div>
                      <span className="text-xs text-neutral-300 dark:text-neutral-700">
                        ↵
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* no results */}
              {showEmpty && (
                <div className="px-4 py-8 text-center">
                  <p className="text-sm text-neutral-400 dark:text-neutral-500">
                    No results for{' '}
                    <span className="font-medium text-neutral-600 dark:text-neutral-400">
                      &ldquo;{query}&rdquo;
                    </span>
                  </p>
                </div>
              )}

              {/* results */}
              {hasResults && (
                <div className="max-h-72 overflow-y-auto p-2 pb-3">
                  {filteredCompanies.length > 0 && (
                    <>
                      <p className="px-2 py-1.5 text-[10px] font-semibold tracking-wider text-neutral-400 uppercase dark:text-neutral-600">
                        Companies
                      </p>
                      {filteredCompanies.map((company) => (
                        <div
                          key={company.id}
                          onClick={() => setSearchOpen(false)}
                          className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        >
                          <div className="flex size-7 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800/60">
                            <Building2 className="size-3.5 text-neutral-500" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-neutral-900 dark:text-white">
                              {company.name}
                            </p>
                            <p className="text-xs text-neutral-400 dark:text-neutral-500">
                              {company.openDeals} open deals · $
                              {(company.pipelineValue / 1000).toFixed(0)}k
                              pipeline
                            </p>
                          </div>
                        </div>
                      ))}
                    </>
                  )}

                  {filteredDeals.length > 0 && (
                    <>
                      {filteredCompanies.length > 0 && (
                        <div className="my-1 h-px bg-neutral-100 dark:bg-neutral-800" />
                      )}
                      <p className="px-2 py-1.5 text-[10px] font-semibold tracking-wider text-neutral-400 uppercase dark:text-neutral-600">
                        Deals
                      </p>
                      {filteredDeals.map((deal) => (
                        <div
                          key={deal.id}
                          onClick={() => setSearchOpen(false)}
                          className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        >
                          <div className="flex size-7 shrink-0 items-center justify-center rounded-md border border-indigo-100 bg-indigo-50 dark:border-indigo-800 dark:bg-indigo-900/20">
                            <Kanban className="size-3.5 text-indigo-500" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-neutral-900 dark:text-white">
                              {deal.company}
                            </p>
                            <p className="text-xs text-neutral-400 dark:text-neutral-500">
                              {deal.stage} · ${deal.value.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* ── Notifications ── */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative flex size-7 cursor-pointer items-center justify-center rounded-full border-y border-neutral-200 bg-neutral-100 text-neutral-900 transition-colors hover:bg-neutral-200/50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700/50">
              <Bell className="size-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex size-3.5 items-center justify-center rounded-full bg-indigo-600 text-[8px] leading-none font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-80 overflow-hidden border-neutral-200 bg-white p-0 dark:border-neutral-800 dark:bg-neutral-900"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                  Notifications
                </span>
                {unreadCount > 0 && (
                  <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-indigo-600 px-1 text-[10px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="cursor-pointer text-xs text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  Mark all read
                </button>
              )}
            </div>

            {/* items */}
            <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {NOTIFICATIONS.map((n) => {
                const isUnread = n.unread && !readIds.has(n.id);
                return (
                  <div
                    key={n.id}
                    onClick={() => markRead(n.id)}
                    className={`flex cursor-pointer gap-3 px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 ${isUnread ? 'bg-indigo-50/50 dark:bg-indigo-950/20' : ''}`}
                  >
                    <div
                      className={`flex size-7 shrink-0 items-center justify-center rounded-full ${n.iconBg}`}
                    >
                      <n.Icon className={`size-3.5 ${n.iconColor}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-[13px] leading-snug ${isUnread ? 'font-medium text-neutral-900 dark:text-white' : 'text-neutral-500 dark:text-neutral-400'}`}
                      >
                        {n.title}
                      </p>
                      <p className="mt-0.5 text-xs text-neutral-400 dark:text-neutral-500">
                        {n.description}
                      </p>
                      <p className="mt-0.5 text-[11px] text-neutral-400 dark:text-neutral-600">
                        {n.time}
                      </p>
                    </div>
                    {isUnread && (
                      <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-indigo-500" />
                    )}
                  </div>
                );
              })}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* ── User ── */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex h-fit cursor-pointer items-center justify-center gap-2 rounded-full border-y border-neutral-200 bg-neutral-100 p-1 text-neutral-900 transition-colors hover:bg-neutral-200/50 md:pr-2.5 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700/50">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="user"
                height={20}
                width={20}
                className="size-5 rounded-full object-cover"
              />
              <span className="hidden text-xs sm:inline">John doe</span>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-56 border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
          >
            {/* profile */}
            <div className="flex items-center gap-3 px-3 py-2.5">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="user"
                className="size-8 rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-neutral-900 dark:text-white">
                  John Doe
                </p>
                <p className="truncate text-xs text-neutral-500 dark:text-neutral-400">
                  john@example.com
                </p>
              </div>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuLabel className="text-[10px] font-semibold tracking-wider text-neutral-400 uppercase dark:text-neutral-600">
              Account
            </DropdownMenuLabel>

            <DropdownMenuItem className="cursor-pointer gap-2.5">
              <User className="size-4 text-neutral-500" />
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-2.5">
              <Settings className="size-4 text-neutral-500" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-2.5">
              <CreditCard className="size-4 text-neutral-500" />
              Billing
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              variant="destructive"
              className="cursor-pointer gap-2.5"
            >
              <LogOut className="size-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
