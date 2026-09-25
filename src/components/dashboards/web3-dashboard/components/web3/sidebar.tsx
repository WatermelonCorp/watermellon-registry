import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "../ui/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { navSections, utilityItems } from "../../data";
import { cn } from "@/lib/utils";
import LogoIcon from "./logo-icons";

export function DashboardSidebar() {
  return (
    <Sidebar collapsible="icon" className="overflow-hidden border-r">
      <SidebarHeader className="p-3">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              asChild
              size="lg"
              className="h-11 px-2 group-data-[collapsible=icon]:hidden group-data-[collapsible=icon]:p-0"
            >
              <a href="#">
                <LogoIcon className="text-primary size-8" />
                <span className="text-lg font-medium">Watermelon</span>
              </a>
            </SidebarMenuButton>
            <SidebarTrigger className=" " />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-4 p-3">
        {navSections.map((section) => (
          <SidebarGroup key={section.title} className="p-0">
            <SidebarGroupLabel className="h-8 px-1 text-sm">
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.active}
                      tooltip={item.label}
                      className={cn(
                        "h-9 gap-3 rounded-lg px-3 text-sm font-medium",
                        item.active
                          ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-primary"
                          : "text-muted-foreground",
                      )}
                    >
                      <a href="#">
                        <item.icon
                          className={cn(
                            "size-4",
                            item.active ? "text-primary" : "",
                          )}
                        />
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarSeparator />

      <SidebarFooter className="gap-3 px-3 pb-3">
        <SidebarMenu className="gap-1">
          {utilityItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                tooltip={item.label}
                className="text-muted-foreground h-9 gap-3 rounded-lg px-3 text-sm"
              >
                <a href="#">
                  <item.icon className="size-4" />
                  <span>{item.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem className="flex items-center gap-0 group-data-[collapsible=icon]:p-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  tooltip="Connected account"
                  className="flex h-11 items-center gap-3 rounded-md group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0"
                >
                  <Avatar className="size-6 shrink-0">
                    <AvatarImage
                      src={"https://assets.watermelon.sh/wm_ben.png"}
                      className=""
                    />

                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                      VP
                    </AvatarFallback>
                  </Avatar>
                  <span className="flex-1 overflow-hidden text-left text-sm font-medium text-ellipsis whitespace-nowrap group-data-[collapsible=icon]:hidden">
                    Vansh Patel
                  </span>
                  <ChevronDown className="text-muted-foreground size-4 shrink-0 group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56"
                align="end"
                side="right"
                sideOffset={16}
              >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="group-data-[collapsible=icon]:hidden">
              <ThemeToggle />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
