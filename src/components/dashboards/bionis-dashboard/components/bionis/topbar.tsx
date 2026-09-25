import { useEffect, useRef, useState, type ComponentType, type SVGProps } from 'react'
import {
  ActivityIcon,
  AlertTriangleIcon,
  BatteryChargingIcon,
  BellIcon,
  CheckCircleRegularIcon,
  CloseIcon,
  HeartbeatFilledIcon,
  HeartbeatIcon,
  MoonStarsIcon,
  NurseFilledIcon,
  SearchIcon,
  WalkIcon,
} from './icons'
import { DashboardLink, useDashboardNavigation } from './navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { SidebarTrigger } from '@/components/ui/sidebar'
import {
  currentUser,
  keyMetricsByTimeline,
  navigationGroups,
  notifications,
  profileHealthSummary,
  type KeyMetricIcon,
  type NotificationIcon,
  type NotificationTone,
} from '../../data'
import { cn } from '@/lib/utils'

const profileMetricIcons: Record<
  KeyMetricIcon,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  heart: HeartbeatIcon,
  walk: WalkIcon,
  moon: MoonStarsIcon,
  battery: BatteryChargingIcon,
  heartbeat: HeartbeatFilledIcon,
  nurse: NurseFilledIcon,
}

const profileMetricIconBgMap: Record<KeyMetricIcon, string> = {
  heart: 'var(--metric-heart)',
  walk: 'var(--metric-steps)',
  moon: 'var(--metric-sleep)',
  battery: 'var(--metric-recovery)',
  heartbeat: 'var(--metric-vital)',
  nurse: 'var(--metric-vital)',
}

const notificationIcons: Record<
  NotificationIcon,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  moon: MoonStarsIcon,
  check: CheckCircleRegularIcon,
  heart: HeartbeatIcon,
  alert: AlertTriangleIcon,
  activity: ActivityIcon,
  battery: BatteryChargingIcon,
}

const notificationToneClass: Record<
  NotificationTone,
  { icon: string; bg: string }
> = {
  warning: {
    icon: '!text-(--prediction-warn) [&_*]:!text-(--prediction-warn)',
    bg: 'bg-(--chart-warn-bg)',
  },
  success: {
    icon: '!text-(--vital-good) [&_*]:!text-(--vital-good)',
    bg: 'bg-(--vital-good)/10',
  },
  info: {
    icon: '!text-(--chart-period) [&_*]:!text-(--chart-period)',
    bg: 'bg-(--chart-period-bg)',
  },
  danger: {
    icon: '!text-(--prediction-danger) [&_*]:!text-(--prediction-danger)',
    bg: 'bg-(--prediction-danger)/10',
  },
}

function useCurrentNavItem() {
  const { pathname } = useDashboardNavigation()
  return (
    navigationGroups
      .flatMap((group) => group.items)
      .find((item) => item.href === pathname) ?? navigationGroups[0].items[0]
  )
}

export function DashboardTopbar() {
  const currentNavItem = useCurrentNavItem()
  const PageIcon = currentNavItem.icon
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const mobileSearchInputRef = useRef<HTMLInputElement>(null)

  const openMobileSearch = () => {
    setIsMobileSearchOpen(true)
    requestAnimationFrame(() => {
      mobileSearchInputRef.current?.focus()
    })
  }

  const closeMobileSearch = () => {
    setIsMobileSearchOpen(false)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()

        if (window.matchMedia('(width < 48rem)').matches) {
          setIsMobileSearchOpen(true)
          requestAnimationFrame(() => {
            mobileSearchInputRef.current?.focus()
          })
          return
        }

        searchInputRef.current?.focus()
      }

      if (event.key === 'Escape') {
        setIsMobileSearchOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b py-4 px-4 md:h-20 md:pr-8 md:pl-6">
      {isMobileSearchOpen ? (
        <div className="flex w-full items-center gap-2 md:hidden">
          <InputGroup className="h-11 flex-1 border-none bg-secondary py-1 pr-2 pl-3">
            <InputGroupAddon className="pl-0 text-muted-foreground">
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput
              ref={mobileSearchInputRef}
              className="h-full px-1.5! text-sm tracking-tight placeholder:text-muted-foreground"
              aria-label="Search"
              placeholder="search insights, goals, records..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </InputGroup>
          <Button
            type="button"
            variant="outline"
            size="icon-lg"
            className="size-11 shrink-0"
            aria-label="Close search"
            onClick={closeMobileSearch}
          >
            <CloseIcon />
          </Button>
        </div>
      ) : (
        <>
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <SidebarTrigger className="size-11 shrink-0 md:hidden [&_svg]:size-5!" />
            <div className="flex items-center gap-3">
              <PageIcon className="hidden size-5 shrink-0 md:block" />
              <p className="truncate text-lg font-medium">
                {currentNavItem.name}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <InputGroup className="hidden h-11 w-70 max-w-full border-none bg-secondary py-1 pr-2 pl-3 md:flex">
              <InputGroupAddon className="pl-0 text-muted-foreground">
                <SearchIcon />
              </InputGroupAddon>
              <InputGroupInput
                ref={searchInputRef}
                className="h-full px-1.5! text-sm tracking-tight placeholder:text-muted-foreground"
                aria-label="Search"
                placeholder="search insights, goals, records..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </InputGroup>

            <Button
              type="button"
              variant="outline"
              size="icon-lg"
              className="size-11 rounded-lg md:hidden"
              aria-label="Open search"
              onClick={openMobileSearch}
            >
              <SearchIcon className="size-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="icon-lg"
                  className="relative size-11"
                  aria-label="Notifications"
                >
                  <BellIcon className="size-6!" />
                  {notifications.some((item) => item.unread) ? (
                    <svg
                      aria-hidden
                      viewBox="0 0 10 10"
                      className="pointer-events-none absolute top-2 right-2 size-2.5 overflow-visible"
                    >
                      <circle cx="5" cy="5" r="5" className="fill-background" />
                      <circle
                        cx="5"
                        cy="5"
                        r="2.75"
                        fill="none"
                        className="stroke-destructive"
                        strokeWidth="2"
                      />
                    </svg>
                  ) : null}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bionis-dashboard ml-3 w-80 p-0"
              >
                <div className="flex items-center justify-between gap-3 border-b px-3.5 py-3">
                  <p className="text-sm font-medium">Notifications</p>
                  <p className="text-xs text-muted-foreground">
                    {notifications.filter((item) => item.unread).length} unread
                  </p>
                </div>

                <div className="p-1.5">
                  {notifications.slice(0, 3).map((notification) => {
                    const Icon = notificationIcons[notification.icon]
                    const tone = notificationToneClass[notification.tone]

                    return (
                      <DropdownMenuItem
                        key={notification.id}
                        className="cursor-pointer items-start gap-3 rounded-xl px-2.5 py-2.5 [&_svg]:!text-inherit"
                      >
                        <span
                          className={cn(
                            'mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg',
                            tone.bg,
                            tone.icon,
                          )}
                        >
                          <Icon className="size-4" />
                        </span>
                        <div className="min-w-0 flex-1 space-y-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-medium leading-snug">
                              {notification.title}
                            </p>
                            {notification.unread ? (
                              <span
                                aria-label="Unread"
                                className="mt-1.5 size-1.5 shrink-0 rounded-full bg-(--live)"
                              />
                            ) : null}
                          </div>
                          <p className="truncate text-xs leading-relaxed text-muted-foreground">
                            {notification.description}
                          </p>
                          <p className="text-xs text-muted-foreground/80">
                            {notification.time}
                          </p>
                        </div>
                      </DropdownMenuItem>
                    )
                  })}
                </div>

                <div className="border-t px-3.5 py-2.5 text-center">
                  <DashboardLink
                    href="/notifications"
                    className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  >
                    View all
                  </DashboardLink>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="h-auto gap-2 px-0 aria-expanded:bg-transparent hover:bg-transparent"
                  aria-label="Health profile"
                >
                  <img
                    src={currentUser.avatar}
                    alt=""
                    className="size-11 rounded-lg bg-muted object-cover"
                  />
                  <div className="hidden flex-col items-start gap-1 text-left md:flex">
                    <span className="text-base font-medium leading-none">
                      {currentUser.name}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm leading-none text-muted-foreground">
                      Age: {currentUser.age}
                      <span
                        aria-hidden
                        className="block size-1.5 shrink-0 rounded-full bg-muted-foreground/50"
                      />
                      <span className="text-(--live)">
                        {currentUser.planStatus}
                      </span>
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bionis-dashboard w-72 p-0"
              >
                <div className="space-y-3 p-3">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 space-y-1">
                        <p className="truncate text-sm font-medium">
                          {currentUser.name}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {currentUser.email}
                        </p>
                        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          Age: {currentUser.age}
                          <span
                            aria-hidden
                            className="block size-1.5 shrink-0 rounded-full bg-muted-foreground/50"
                          />
                          <span className="text-(--live)">
                            {currentUser.planStatus}
                          </span>
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-xs text-muted-foreground">Score</p>
                        <p className="text-lg font-medium leading-none">
                          {profileHealthSummary.wellnessScore}
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex rounded-full bg-(--live)/10 px-2 py-0.5 text-xs font-medium text-(--live)">
                      {profileHealthSummary.condition}
                    </span>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {profileHealthSummary.summary.before}
                      <span className="font-medium text-foreground">
                        {profileHealthSummary.summary.highlight}
                      </span>
                      {profileHealthSummary.summary.after}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {keyMetricsByTimeline['7d'].map((metric) => {
                      const Icon = profileMetricIcons[metric.icon]
                      return (
                        <div
                          key={metric.id}
                          className="flex items-center gap-2 rounded-lg bg-muted p-2"
                        >
                          <span
                            className="flex size-6 shrink-0 items-center justify-center rounded-md text-white"
                            style={{ backgroundColor: profileMetricIconBgMap[metric.icon] }}
                          >
                            <Icon className="size-3" />
                          </span>
                          <p className="min-w-0 truncate text-sm font-medium tabular-nums">
                            {metric.value}
                            <span className="ml-0.5 text-xs font-normal text-muted-foreground">
                              {metric.unit}
                            </span>
                          </p>
                        </div>
                      )
                    })}
                  </div>

                  <div className="flex items-center justify-between gap-2 rounded-lg border px-2.5 py-2">
                    {profileHealthSummary.vitals.map((vital) => (
                      <div key={vital.label} className="text-center">
                        <p className="text-xs text-muted-foreground">
                          {vital.label}
                        </p>
                        <p
                          className={cn(
                            'text-xs font-semibold tabular-nums',
                            vital.tone === 'good' && 'text-(--vital-good)',
                            vital.tone === 'warn' && 'text-(--chart-warn)',
                          )}
                        >
                          {vital.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      )}
    </header>
  )
}
