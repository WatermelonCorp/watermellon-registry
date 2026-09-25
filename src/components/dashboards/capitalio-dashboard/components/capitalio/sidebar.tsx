import { Collapsible } from '@base-ui/react/collapsible'
import {
  SidebarChevronIcon,
  SidebarLogoutIcon,
} from './icons'
import { CapitalioLogo } from './logo'
import { DashboardLink, useDashboardNavigation } from './navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import { Button } from '@/components/ui/button'
import { currentUser, sidebarSections, type NavigationItem, type NavigationSection } from '../../data'
import { cn } from '@/lib/utils'

function Brand() {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-3">
      <div className="size-10 flex shrink-0 items-center justify-center rounded-lg border border-primary bg-linear-to-t from-[color-mix(in_oklab,var(--primary)_80%,black)] to-primary">
        <CapitalioLogo className="size-6 shrink-0 text-white" />
      </div>
      <span className="truncate text-lg font-medium text-sidebar-accent-foreground">
        Capitalio
      </span>
    </div>
  )
}

function NavLinkButton({
  item,
}: {
  item: NavigationItem
}) {
  const { pathname } = useDashboardNavigation()
  const { isMobile, setOpenMobile } = useSidebar()
  const isActive =
    item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
  const Icon = item.icon

  function handleClick() {
    if (isMobile) setOpenMobile(false)
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        tooltip={item.name}
        isActive={isActive}
        className={cn(
          'h-auto gap-2 rounded-lg px-3 py-3 text-base leading-5 text-muted-foreground transition-colors',
          'bg-transparent hover:bg-transparent active:bg-transparent data-active:bg-transparent!',
          'data-active:text-sidebar-accent-foreground',
          '[&_img]:size-5!',
          isActive && 'active-sidebar-item',
        )}
      >
        <DashboardLink href={item.href} onClick={handleClick} aria-current={isActive ? 'page' : undefined}>
          <Icon />
          <span className="truncate">{item.name}</span>
        </DashboardLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

function SidebarSectionMenu({ items }: { items: NavigationItem[] }) {
  return (
    <SidebarGroupContent>
      <SidebarMenu className="gap-2">
        {items.map((item) => (
          <NavLinkButton key={item.name} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  )
}

function SidebarNavSection({ section }: { section: NavigationSection }) {
  if (section.collapsible) {
    return (
      <Collapsible.Root defaultOpen={section.defaultOpen ?? true}>
        <SidebarGroup className="gap-2 p-0">
          {section.label ? (
            <Collapsible.Trigger
              className="flex w-full cursor-pointer items-center justify-between px-2 py-3 font-section text-base font-normal tracking-tight text-muted-foreground/70 transition-colors hover:text-muted-foreground [&>svg]:size-2.5! [&>svg]:transition-transform [&>svg]:duration-200 [&>svg]:ease-out data-panel-open:[&>svg]:rotate-180"
            >
              {section.label}
              <SidebarChevronIcon className="shrink-0" />
            </Collapsible.Trigger>
          ) : null}
          <Collapsible.Panel>
            <SidebarSectionMenu items={section.items} />
          </Collapsible.Panel>
        </SidebarGroup>
      </Collapsible.Root>
    )
  }

  return (
    <SidebarGroup className="gap-2 p-0">
      {section.label ? (
        <SidebarGroupLabel className="px-2 py-3 font-section text-base font-normal tracking-tight text-muted-foreground/70">
          {section.label}
        </SidebarGroupLabel>
      ) : null}
      <SidebarSectionMenu items={section.items} />
    </SidebarGroup>
  )
}

export function DashboardSidebar() {
  return (
    <Sidebar
      className="border-none! p-0.5 capitalio-dashboard"
    >
      <SidebarHeader className="mb-6 flex-row items-start gap-2 px-4 pt-6 pb-0">
        <Brand />
      </SidebarHeader>

      <SidebarContent className="gap-3 px-4 pb-4">
        {sidebarSections.main.map((section) => (
          <SidebarNavSection key={section.label} section={section} />
        ))}
      </SidebarContent>

      <SidebarFooter className="gap-3 px-4 pt-0 pb-5">
        <SidebarMenu className="gap-2">
          {sidebarSections.footer.items.map((item) => (
            <NavLinkButton key={item.name} item={item} />
          ))}
        </SidebarMenu>
        <div className="border-t" />
        <div className="flex min-w-0 items-center gap-3">
          <Avatar className="size-10 rounded-lg after:rounded-lg">
            <AvatarImage
              src={currentUser.avatar}
              className="rounded-lg"
            />
            <AvatarFallback className="rounded-lg">
              {currentUser.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="truncate text-base leading-none font-medium text-sidebar-accent-foreground">
              {currentUser.name}
            </span>
            <span className="premium-badge">Premium</span>
          </div>

          <Button
            size="icon"
            variant="destructive"
            className="bg-transparent! group"
          >
            <SidebarLogoutIcon className="size-4 opacity-70 group-hover:opacity-100 transition-colors" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
