"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "./ui/sidebar"

export function NavSecondary({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    isDisabled?: boolean
    items?: {
      title: string
      url: string
      isDisabled?: boolean
    }[]
  }[]
}) {
  const pathname = "/financial-center/invoice-manager"
  return (
    <SidebarGroup className="py-3! border-b">
      <SidebarMenu>
        {items.map((item) =>
          item.items && item.items.length > 0 ? (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`rounded transition-colors ${pathname === item.url ? "text-sidebar-foreground bg-sidebar-accent" : "text-sidebar-foreground/70"}`}
                    isActive={pathname === item.url}
                  >

                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          className={`rounded transition-colors ${pathname === subItem.url ? "text-sidebar-foreground bg-sidebar-accent" : "text-sidebar-foreground/70"}`}
                          isActive={pathname === subItem.url}
                        >

                          <a href={subItem.isDisabled ? "#" : subItem.url} onClick={(e) => {
                            if (subItem.isDisabled) {
                              e.preventDefault();
                            }
                          }}>
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={`rounded transition-colors ${pathname === item.url ? "text-sidebar-foreground bg-sidebar-accent" : "text-sidebar-foreground/70"}`}
                isActive={pathname === item.url}
              >

                <a href={item.isDisabled ? "#" : item.url} onClick={(e) => {
                  if (item.isDisabled) {
                    e.preventDefault();
                  }
                }}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  )
}
