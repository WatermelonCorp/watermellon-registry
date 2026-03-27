import * as React from "react"
import { type Icon as TablerIcon } from "@tabler/icons-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export function NavSecondary({
  items,
  className,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: TablerIcon
    badge?: string | number
    rightIcon?: TablerIcon
    onClick?: (e: React.MouseEvent) => void
    isDisabled?: boolean
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup className={cn("mt-auto", className)} {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild size="default" className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-400/15 dark:hover:bg-neutral-800/50 transition-all active:scale-[0.98]">
                {item.onClick ? (
                  <button
                    onClick={(e) => {
                      if (item.isDisabled) {
                        e.preventDefault();
                        return;
                      }
                      item.onClick?.(e)
                    }}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                    {item.rightIcon && (
                      <item.rightIcon className="ml-auto size-4 text-muted-foreground/60" />
                    )}
                  </button>
                ) : (
                  <a href={item.isDisabled ? "#" : item.url} onClick={(e) => {
                    if (item.isDisabled) {
                      e.preventDefault();
                    }
                  }}>
                    <item.icon />
                    <span>{item.title}</span>
                    {item.rightIcon && (
                      <item.rightIcon className="ml-auto size-4 text-muted-foreground/60" />
                    )}
                  </a>
                )}
              </SidebarMenuButton>
              {item.badge && (
                <SidebarMenuBadge className="bg-neutral-200 px-0.5 text-neutral-700 rounded text-[10px] dark:bg-neutral-800 dark:text-neutral-400">
                  {item.badge}
                </SidebarMenuBadge>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}