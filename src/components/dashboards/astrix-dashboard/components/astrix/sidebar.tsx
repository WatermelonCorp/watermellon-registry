import { LogOut, Moon, Settings, Sun, User } from "lucide-react";
import { AstrixLogo } from "./logo";
import { SidebarToggleIcon } from "./icons";
import { DashboardLink, useDashboardNavigation } from "./navigation";
import { useTheme } from "./theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  currentUser,
  workspaceNavigation,
  type NavigationItem,
} from "../../data";
import { cn } from "@/lib/utils";

const dropdownTriggerClassName =
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-sidebar-ring outline-hidden transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0";

function NavItem({ item }: { item: NavigationItem }) {
  const { pathname } = useDashboardNavigation();
  const { isMobile, setOpenMobile } = useSidebar();
  const isActive =
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip={item.name}
        className={cn(
          "h-auto [&_svg]:size-5",
          "group-data-[collapsible=icon]:size-12!",
          "group-data-[collapsible=icon]:px-3.5!",
        )}
      >
        <DashboardLink
          href={item.href}
          aria-current={isActive ? "page" : undefined}
          onClick={() => {
            if (isMobile) setOpenMobile(false);
          }}
          className={cn(
            "group/nav flex h-12 w-full items-center gap-2.5 overflow-hidden rounded-xl px-3 py-2.5 text-muted-foreground hover:text-foreground",
            "transition-[width,padding] ease-linear",
            "aria-[current=page]:bg-sidebar-accent aria-[current=page]:text-primary aria-[current=page]:[filter:var(--shadow-sidebar-item)]",
          )}
        >
          <item.icon className="size-5" />
          <span className="truncate text-base group-data-[collapsible=icon]:hidden">
            {item.name}
          </span>
          {item.badge ? (
            <span className="ml-auto rounded-md bg-foreground/10 px-1.5 py-0.5 text-xs font-medium text-foreground group-data-[collapsible=icon]:hidden group-aria-[current=page]/nav:bg-primary/10 group-aria-[current=page]/nav:text-primary">
              {item.badge}
            </span>
          ) : null}
        </DashboardLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function DashboardSidebar() {
  const { toggleSidebar } = useSidebar();
  const { theme, toggleTheme } = useTheme();

  return (
    <Sidebar collapsible="icon" className="border-none">
      <SidebarHeader className="h-16 flex-row items-center justify-between px-3 transition-[padding] ease-linear group-data-[collapsible=icon]:px-4.25">
        <div className="flex min-w-0 items-center gap-2 overflow-hidden group-data-[collapsible=icon]:hidden">
          <AstrixLogo />
          <span className="truncate text-xl font-medium">ASTRIX</span>
        </div>
        <Button
          variant="ghost"
          size="icon-lg"
          onClick={toggleSidebar}
          className="ml-auto text-muted-foreground hover:text-foreground group-data-[collapsible=icon]:size-12"
        >
          <SidebarToggleIcon className="size-6" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </SidebarHeader>

      <SidebarContent className="overflow-x-hidden px-3 py-4 transition-[padding] ease-linear group-data-[collapsible=icon]:px-4.25">
        <SidebarMenu className="gap-3">
          {workspaceNavigation.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="px-3 py-2 transition-[padding] ease-linear group-data-[collapsible=icon]:px-5.25">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                type="button"
                className={cn(
                  dropdownTriggerClassName,
                  "h-auto gap-2.5 overflow-hidden rounded-xl px-1.5 py-1.5 group-data-[collapsible=icon]:size-10! group-data-[collapsible=icon]:rounded-full! group-data-[collapsible=icon]:p-0!",
                )}
                aria-label="Account menu"
              >
                <Avatar className="size-10 after:border-[0.15625rem]">
                  <AvatarImage
                    src={currentUser.avatar}
                    alt={currentUser.name}
                  />
                  <AvatarFallback>{currentUser.initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1 text-left group-data-[collapsible=icon]:hidden">
                  <p className="truncate text-base font-semibold">
                    {currentUser.name}
                  </p>
                  <p className="truncate text-sm text-muted-foreground">
                    {currentUser.email}
                  </p>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="start"
                side="top"
                className="astrix-dashboard w-56"
              >
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
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
