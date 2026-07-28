'use client';

import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import type { NavigationItem } from '../../navigation-data';
import { useDashboardNavigation } from '../navigation';

export function SidebarNavigationItem({ item }: { item: NavigationItem }) {
  const { navigate, pathname } = useDashboardNavigation();
  const { isMobile, setOpenMobile, state } = useSidebar();
  const collapsed = !isMobile && state === 'collapsed';
  const active =
    pathname === item.href ||
    (item.href !== '/' && pathname.startsWith(item.href));
  const Icon = item.icon;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={active}
        tooltip={item.name}
        className={cn(
          'h-11 gap-3 rounded-xl border border-transparent px-3.5 text-base font-normal text-foreground transition-colors hover:bg-muted hover:text-foreground group-data-[collapsible=icon]:size-11! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0! [&_svg]:size-5!',
          active &&
            'bg-card! text-primary! shadow-border font-medium hover:bg-card! hover:text-primary!',
        )}
        onClick={() => {
          navigate(item.href);
          if (isMobile) setOpenMobile(false);
        }}
      >
        <Icon className="shrink-0" />
        {!collapsed && (
          <span className="flex flex-1 items-center justify-between">
            {item.name}
            {item.badge && (
              <span className="bg-primary/10 text-primary rounded px-2 py-1 text-xs leading-none font-medium">
                {item.badge}
              </span>
            )}
          </span>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
