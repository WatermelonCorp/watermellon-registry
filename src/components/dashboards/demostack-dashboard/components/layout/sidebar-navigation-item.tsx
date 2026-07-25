'use client';

import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import type { NavigationItem } from '../../navigation-data';
import { cn } from '@/lib/utils';
import { DashboardLink, useDashboardNavigation } from '../navigation';

export function SidebarNavigationItem({ item }: { item: NavigationItem }) {
  const { pathname } = useDashboardNavigation();
  const { isMobile, setOpenMobile, state } = useSidebar();
  const collapsed = !isMobile && state === 'collapsed';
  const active =
    pathname === item.href ||
    (item.href !== '/' && pathname.startsWith(item.href));
  const Icon = item.icon;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={active}
        tooltip={item.name}
        className={cn(
          'rounded-xl px-3 text-base font-normal',
          active && 'shadow-border font-medium',
        )}
      >
        <DashboardLink
          href={item.href}
          onClick={() => isMobile && setOpenMobile(false)}
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
        </DashboardLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
