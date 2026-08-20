"use client";

import { useState } from "react";
import { LogOut, Moon, Settings, Sun, User } from "lucide-react";
import { BuildingIcon, CaretUpDownIcon } from "./icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  adminNavigation,
  companies,
  currentUser,
  workspaceNavigation,
} from "../../data";
import { DemostackLogo } from "./logo";
import { DashboardLink, useDashboardNavigation } from "./navigation";
import { useTheme } from "./theme-provider";

export function DashboardSidebar() {
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useDashboardNavigation();
  const { isMobile, setOpenMobile, state } = useSidebar();
  const collapsed = !isMobile && state === "collapsed";
  const [selectedCompany, setSelectedCompany] = useState<
    (typeof companies)[number]
  >(companies[0]);

  return (
    <Sidebar
      collapsible="icon"
      className="demostack-dashboard border-none p-1.5"
    >
      <SidebarHeader className="p-0">
        <div className="border rounded-2xl p-3 pt-3.5 group-data-[collapsible=icon]:p-2.5!">
          <div className="flex items-center justify-between mb-6 group-data-[collapsible=icon]:mb-2 group-data-[collapsible=icon]:justify-center">
            <DemostackLogo className="h-6 w-auto group-data-[collapsible=icon]:hidden" />
            <SidebarTrigger className="size-10! [&_svg]:size-5! group-data-[collapsible=icon]:size-12!" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger
              type="button"
              className="bg-secondary w-full p-2 pr-2.5 rounded-xl flex items-center gap-2 group-data-[collapsible=icon]:size-12! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:p-2!"
            >
              <div className="size-7.5 bg-foreground dark:bg-background rounded-full flex items-center justify-center text-background dark:text-foreground">
                <BuildingIcon className="size-3.5" />
              </div>
              <div className="flex items-start flex-col group-data-[collapsible=icon]:hidden">
                <p className="font-medium text-xs">{selectedCompany.name}</p>
                <p className="text-xxs text-muted-foreground">
                  {selectedCompany.role}
                </p>
              </div>

              <CaretUpDownIcon className="size-4.5 ml-auto group-data-[collapsible=icon]:hidden" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Select organization</DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={selectedCompany.name}
                onValueChange={(companyName) => {
                  const company = companies.find(
                    ({ name }) => name === companyName,
                  );

                  if (company) setSelectedCompany(company);
                }}
              >
                {companies.map((company) => (
                  <DropdownMenuRadioItem
                    key={company.name}
                    value={company.name}
                    className="group/org p-2"
                  >
                    <div className="flex flex-col text-muted-foreground group-data-[state=checked]/org:font-medium group-data-[state=checked]/org:text-foreground">
                      <p className="text-xs">{company.name}</p>
                      <p className="text-xxs">{company.role}</p>
                    </div>
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
              {collapsed && (
                <DropdownMenuGroup className="mt-2">
                  <DropdownMenuLabel>
                    MEMBERS [{selectedCompany.members.length}]
                  </DropdownMenuLabel>
                  <div className="flex flex-wrap gap-1.5 px-2 pb-2">
                    {selectedCompany.members.map((member) => (
                      <Avatar key={member.name} className="size-8">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.initials}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </DropdownMenuGroup>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="mt-3 group-data-[collapsible=icon]:hidden">
            <p className="text-sm text-muted-foreground">
              MEMBERS [{selectedCompany.members.length}]
            </p>
            <div className="flex flex-wrap mt-1.5 gap-1.5">
              {selectedCompany.members.map((member) => (
                <Avatar key={member.name} className="size-8">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.initials}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="pt-6 pb-3 px-2.75 group-data-[collapsible=icon]:overflow-x-hidden! group-data-[collapsible=icon]:overflow-y-auto!">
        {[
          { label: "Workspace", items: workspaceNavigation },
          { label: "Admin", items: adminNavigation },
        ].map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="text-sm mb-3">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-2">
                {group.items.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === item.href
                      : pathname === item.href ||
                        pathname.startsWith(`${item.href}/`);

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={active}
                        className="h-auto [&_svg]:size-5 group-data-[collapsible=icon]:size-12! group-data-[collapsible=icon]:justify-center! group-data-[collapsible=icon]:gap-0! group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:[&>span]:hidden"
                      >
                        <DashboardLink
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className="flex items-center gap-2.5 rounded-xl border border-transparent p-3 text-muted-foreground aria-[current=page]:border-border aria-[current=page]:bg-sidebar-accent aria-[current=page]:font-medium aria-[current=page]:text-foreground"
                          onClick={() => {
                            if (isMobile) setOpenMobile(false);
                          }}
                        >
                          <item.icon className="size-5" />
                          <span className="text-base">{item.name}</span>
                          {item.badge && (
                            <span className="rounded bg-primary/10 px-2 py-1 text-xs font-medium leading-none text-primary">
                              {item.badge}
                            </span>
                          )}
                        </DashboardLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-0">
        <div className="p-3 group-data-[collapsible=icon]:p-2.5!">
          <DropdownMenu>
            <DropdownMenuTrigger
              type="button"
              className="w-full flex items-center gap-2 text-left border-none outline-none group-data-[collapsible=icon]:size-12! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0"
            >
              <Avatar className="size-10 after:border-[2.5px] after:border-border/50">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>{currentUser.initials}</AvatarFallback>
              </Avatar>
              <div className="group-data-[collapsible=icon]:hidden">
                <p className="font-medium text-foreground truncate">
                  {currentUser.name}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  {currentUser.email}
                </p>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="font-normal">
                  <p className="font-medium text-foreground">
                    {currentUser.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {currentUser.email}
                  </p>
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings />
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={toggleTheme}>
                {theme === "dark" ? <Sun /> : <Moon />}
                {theme === "dark" ? "Light mode" : "Dark mode"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
