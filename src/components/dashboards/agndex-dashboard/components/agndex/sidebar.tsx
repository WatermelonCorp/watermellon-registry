import {
  BadgeCheckIcon,
  ChevronsUpDownIcon,
  ShieldIcon,
  UserPlusIcon,
  UsersIcon,
} from 'lucide-react'
import { AgndexLogo } from './logo'
import { DashboardLink, useDashboardNavigation } from './navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import {
  currentUser,
  footerNavigation,
  logoutItem,
  navigationGroups,
  type NavigationItem,
} from '../../data'

function NavItem({ item }: { item: NavigationItem }) {
  const { pathname } = useDashboardNavigation()
  const { isMobile, setOpenMobile } = useSidebar()
  const active =
    item.href === '/'
      ? pathname === item.href
      : pathname === item.href || pathname.startsWith(`${item.href}/`)
  const className =
    'gap-2.5 rounded-lg px-3 py-2 text-smd tracking-tight text-(--sidebar-muted-foreground) opacity-80 aria-[current=page]:bg-sidebar-accent aria-[current=page]:font-medium aria-[current=page]:text-sidebar-accent-foreground aria-[current=page]:opacity-100'

  function handleClick() {
    if (isMobile) setOpenMobile(false)
  }

  return (
    <SidebarMenuButton asChild className="h-auto p-0">
      {item.external ? (
        <a
          href={item.href}
          target="_blank"
          rel="noreferrer"
          onClick={handleClick}
          className={className}
        >
          <item.icon />
          <span>{item.name}</span>
        </a>
      ) : (
        <DashboardLink
          href={item.href}
          aria-current={active ? 'page' : undefined}
          onClick={handleClick}
          className={className}
        >
          <item.icon />
          <span>{item.name}</span>
        </DashboardLink>
      )}
    </SidebarMenuButton>
  )
}

export function DashboardSidebar() {
  return (
    <Sidebar className="border-none h-full">
      <SidebarHeader className="flex-row items-center justify-between gap-2 px-4 pt-6 pb-0">
        <div className="flex items-center gap-2">
          <AgndexLogo className="size-5.5" />
          <span className="text-xl font-semibold tracking-tight">
            AGNDEX
          </span>
        </div>
        <span className="rounded-md bg-(--sidebar-badge) px-2 py-1.5 text-xxs text-sidebar-foreground/70">
          Developer Portal
        </span>
      </SidebarHeader>

      <SidebarContent className="mt-8 gap-8 px-4">
        {navigationGroups.map((group) => (
          <SidebarGroup key={group.label} className="p-0">
            <SidebarGroupLabel className="mb-2 h-auto px-0 py-2 text-xsm text-(--sidebar-muted)">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1.5">
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

      <SidebarFooter className="px-4 pb-6">
        <SidebarMenu className="gap-1.5">
          {footerNavigation.map((item) => (
            <SidebarMenuItem key={item.name}>
              <NavItem item={item} />
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem>
            <SidebarMenuButton
              type="button"
              className="h-auto gap-2.5 rounded-lg px-3 py-2 text-smd tracking-tight text-(--sidebar-muted-foreground) opacity-80 hover:bg-destructive/10 hover:text-destructive hover:opacity-100 active:bg-destructive/10 active:text-destructive"
            >
              <logoutItem.icon className="-rotate-90" />
              <span>{logoutItem.name}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="peer/menu-button flex h-auto w-full items-center gap-2.5 overflow-hidden rounded-lg px-3 py-2 text-left text-smd tracking-tight ring-sidebar-ring outline-hidden transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0">
                <Avatar size="sm">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  <AvatarFallback>{currentUser.initials}</AvatarFallback>
                </Avatar>
                <span className="flex-1 font-medium tracking-tight">
                  {currentUser.name}
                </span>
                <ChevronsUpDownIcon className="text-sidebar-foreground/50" />
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="agndex-dashboard w-64">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex items-center gap-2.5">
                    <Avatar size="sm">
                      <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                      <AvatarFallback>{currentUser.initials}</AvatarFallback>
                    </Avatar>
                    <div className="leading-tight">
                      <p className="text-sm font-medium text-foreground">
                        {currentUser.name}
                      </p>
                      <p>{currentUser.email}</p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheckIcon />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <UsersIcon />
                    Team
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ShieldIcon />
                    Security
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <UserPlusIcon />
                    Invite members
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
