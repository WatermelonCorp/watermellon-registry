import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  type NavigationItem,
  SidebarNavigationItem,
} from "./sidebar-navigation-item";
import {
  CustomersIcon,
  JobsIcon,
  LogoutIcon,
  SettingsIcon,
} from "../../assets/icons";
import { Logo } from "../../assets/logo";
import { DashboardLink } from "../navigation";

type SidebarItem = NavigationItem & {
  trailing?: "theme-toggle";
};

const primaryNavigationItems = [
  { label: "Customers", href: "/", icon: CustomersIcon },
  { label: "Jobs", href: "/jobs", icon: JobsIcon },
] satisfies NavigationItem[];

const utilityNavigationItems = [
  { label: "Settings", icon: SettingsIcon, trailing: "theme-toggle" },
  { label: "Logout", icon: LogoutIcon, variant: "destructive" },
] satisfies SidebarItem[];

function Brand() {
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <div className="flex items-center px-3">
      <DashboardLink
        href="/"
        aria-label="JobTracker home"
        className="flex max-w-48 min-w-0 items-center gap-2 overflow-hidden rounded-md transition-[max-width,opacity] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring group-data-[collapsible=icon]:max-w-0 group-data-[collapsible=icon]:opacity-0"
        onClick={() => {
          if (isMobile) {
            setOpenMobile(false);
          }
        }}
      >
        <Logo className="size-5 shrink-0 text-primary" aria-hidden="true" />
        <span className="whitespace-nowrap text-lg font-semibold tracking-tight">
          JOB <span className="text-primary">TRACKER</span>
        </span>
      </DashboardLink>
    </div>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      className="size-10 shrink-0 rounded-xl text-muted-foreground hover:!bg-background hover:!text-foreground group-data-[collapsible=icon]:hidden"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
    >
      <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}

export function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas" className="border-none">
      <SidebarHeader className="gap-6 p-3 transition-[padding] duration-200 group-data-[collapsible=icon]:p-2">
        <Brand />
        <SidebarMenu className="gap-2">
          {primaryNavigationItems.map((item) => (
            <SidebarNavigationItem key={item.label} item={item} />
          ))}
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent />

      <SidebarFooter className="p-3 transition-[padding] duration-200 group-data-[collapsible=icon]:p-2">
        <SidebarMenu className="gap-2">
          {utilityNavigationItems.map((item) => (
            <SidebarNavigationItem
              key={item.label}
              item={item}
              trailing={
                item.trailing === "theme-toggle" ? <ThemeToggle /> : undefined
              }
            />
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
