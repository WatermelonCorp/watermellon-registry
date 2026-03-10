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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"

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
    dialog?: {
      title: string
      description: string
      content: React.ReactNode
    }
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
                    className={`rounded transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${pathname === item.url ? "text-sidebar-foreground bg-sidebar-accent" : "text-sidebar-foreground/70"}`}
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
                          className={`rounded transition-all duration-200 hover:translate-x-1 ${pathname === subItem.url ? "text-sidebar-foreground bg-sidebar-accent" : "text-sidebar-foreground/70"}`}
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
              {item.dialog ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={`rounded transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${pathname === item.url ? "text-sidebar-foreground bg-sidebar-accent" : "text-sidebar-foreground/70"}`}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{item.dialog.title}</DialogTitle>
                      <DialogDescription>
                        {item.dialog.description}
                      </DialogDescription>
                    </DialogHeader>
                    {item.dialog.content}
                  </DialogContent>
                </Dialog>
              ) : (
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={`rounded transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${pathname === item.url ? "text-sidebar-foreground bg-sidebar-accent" : "text-sidebar-foreground/70"}`}
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
              )}
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  )
}
