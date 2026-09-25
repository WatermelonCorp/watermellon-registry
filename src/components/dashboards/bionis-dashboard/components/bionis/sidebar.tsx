import { useState } from 'react'
import {
  BookOpenIcon,
  CreditCardIcon,
  LogOutIcon,
  MessageCircleIcon,
  SettingsIcon,
  UserIcon as LucideUserIcon,
} from 'lucide-react'
import {
  ArrowRightIcon,
  CloseIcon,
  QuestionIcon,
  SidebarCollapseIcon,
  ToggleIcon,
  UserIcon,
} from './icons'
import { BionisLogo } from './logo'
import { DashboardLink, useDashboardNavigation } from './navigation'
import { useTheme } from './theme-provider'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { currentUser, navigationGroups, type NavigationItem } from '../../data'
import { cn } from '@/lib/utils'

const menuButtonClassName = cn(
  'h-12 gap-2.5 rounded-xl border border-transparent px-3 text-base tracking-tight text-muted-foreground transition-colors',
  'aria-[current=page]:border-border aria-[current=page]:bg-background aria-[current=page]:font-medium aria-[current=page]:text-sidebar-accent-foreground aria-[current=page]:shadow-[1px_2px_12px_rgba(158,158,158,0.08)]',
  'dark:aria-[current=page]:border-transparent dark:aria-[current=page]:bg-sidebar-accent dark:aria-[current=page]:shadow-[1px_2px_12px_rgba(0,0,0,0.25)]',
  'hover:bg-sidebar-accent data-open:bg-background data-open:text-sidebar-accent-foreground dark:data-open:bg-sidebar-accent',
  '[&_svg]:size-5!',
  'group-data-[collapsible=icon]:size-11! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:[&>span]:hidden',
)

function NavItem({ item }: { item: NavigationItem }) {
  const { isMobile, setOpenMobile } = useSidebar()
  const { pathname } = useDashboardNavigation()
  const isActive =
    item.href === '/'
      ? pathname === item.href
      : pathname === item.href || pathname.startsWith(`${item.href}/`)

  return (
    <SidebarMenuButton
      asChild
      isActive={isActive}
      tooltip={item.name}
      className={menuButtonClassName}
    >
      <DashboardLink
        href={item.href}
        aria-current={isActive ? 'page' : undefined}
        onClick={() => {
          if (isMobile) setOpenMobile(false)
        }}
      >
        <item.icon />
        <span>{item.name}</span>
        {item.badge ? (
          <SidebarMenuBadge className="sidebar-badge-shadow static ml-auto rounded bg-background px-2 py-1.5 text-sm text-muted-foreground group-aria-[current=page]/menu-button:font-medium group-aria-[current=page]/menu-button:text-sidebar-accent-foreground">
            {item.badge}
          </SidebarMenuBadge>
        ) : null}
      </DashboardLink>
    </SidebarMenuButton>
  )
}

function HelpItem() {
  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton className={menuButtonClassName}>
            <QuestionIcon />
            <span>Help</span>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="top"
          align="start"
          className="bionis-dashboard w-56"
        >
          <DropdownMenuLabel className="font-normal">
            <p className="text-sm font-medium text-foreground">Need help?</p>
            <p>Guides, docs, and support for Bionis.</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <a href="https://docs.bionis.com" target="_blank" rel="noreferrer">
                <BookOpenIcon />
                Documentation
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href="https://bionis.com/support"
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircleIcon />
                Contact support
              </a>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  )
}

function DarkModeItem() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const label = isDark ? 'Light Mode' : 'Dark Mode'

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        tooltip={label}
        className={menuButtonClassName}
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
      >
        <ToggleIcon pressed={isDark} />
        <span>{label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

function ProfileItem() {
  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton tooltip="Profile" className={menuButtonClassName}>
            <UserIcon />
            <span>Profile</span>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="top"
          align="start"
          className="bionis-dashboard w-56"
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
    </SidebarMenuItem>
  )
}

function CollapseControl({
  collapsed,
  onToggle,
}: {
  collapsed: boolean
  onToggle: () => void
}) {
  if (!collapsed) {
    return (
      <button
        type="button"
        onClick={onToggle}
        className="flex size-9.5 shrink-0 items-center justify-center rounded-lg hover:bg-sidebar-accent transition-colors"
        aria-label="Collapse sidebar"
      >
        <SidebarCollapseIcon className="-rotate-90" />
      </button>
    )
  }

  return (
    <div className="relative size-11 shrink-0">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center transition-all ease-linear group-hover:scale-75 group-hover:opacity-0">
        <BionisLogo className="size-6" />
      </div>
      <div className="pointer-events-none absolute inset-0 flex scale-75 items-center justify-center opacity-0 transition-all ease-linear group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100">
        <button
          type="button"
          onClick={onToggle}
          className="flex size-11 items-center justify-center rounded-lg hover:bg-sidebar-accent transition-colors"
          aria-label="Expand sidebar"
        >
          <SidebarCollapseIcon className="rotate-90" />
        </button>
      </div>
    </div>
  )
}

function HealthCoachCard() {
  const [open, setOpen] = useState(true)

  if (!open) return null

  return (
    <div
      className={cn(
        'relative flex flex-col gap-8 rounded-2xl border p-4',
        'bg-[linear-gradient(347deg,var(--promo-gradient-from)_47.58%,var(--promo-gradient-to)_306.43%)]',
        'group-data-[collapsible=icon]:hidden',
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="rounded-xl bg-primary px-2.5 py-1.5 text-xs font-medium tracking-tight text-primary-foreground">
          New
        </span>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="flex size-6 shrink-0 items-center justify-center rounded -md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Dismiss AI Health Coach"
        >
          <CloseIcon className="size-4" />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <p className="font-semibold tracking-tight">
            AI Health Coach
          </p>
          <p className="text-sm tracking-tight text-muted-foreground">
            Get personalised tips based on your data
          </p>
        </div>

        <Button
          type="button"
          className="h-11 w-full gap-1 rounded-xl pr-2 pl-3 text-sm tracking-tight"
        >
          Try Now
          <ArrowRightIcon className="size-5" />
        </Button>
      </div>
    </div>
  )
}

export function DashboardSidebar() {
  const { state, toggleSidebar } = useSidebar()
  const collapsed = state === 'collapsed'

  return (
    <Sidebar collapsible="icon" className="h-full border-none">
      <SidebarHeader
        className={cn(
          'h-16 flex-row items-center border-b border-sidebar-border transition-[padding] md:h-20',
          collapsed ? 'justify-start px-3' : 'justify-between gap-4.75 px-4',
        )}
      >
        {!collapsed && (
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <BionisLogo className="size-5.5 shrink-0" />
            <span className="truncate text-xl font-semibold tracking-tight">
              Bionis
            </span>
          </div>
        )}
        <CollapseControl collapsed={collapsed} onToggle={toggleSidebar} />
      </SidebarHeader>

      <SidebarContent className="gap-4 overflow-x-hidden overflow-y-auto px-3 py-4 group-data-[collapsible=icon]:overflow-y-auto!">
        {navigationGroups.map((group) => (
          <SidebarGroup key={group.label} className="gap-2 p-0">
            <SidebarGroupLabel className="h-auto px-3 py-1 text-base font-normal tracking-tight text-muted-foreground">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-2">
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <NavItem item={item} />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="gap-6 border-t border-sidebar-border px-3 py-3">
        <HealthCoachCard />
        <SidebarMenu className="gap-2">
          <HelpItem />
          <DarkModeItem />
          <ProfileItem />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
