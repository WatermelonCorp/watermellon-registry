import {
  ChevronLeft,
  Database,
  FileText,
  GitBranch,
  House,
  MoonStar,
  Radio,
  SunDim,
  TrendingUp,
  UsersRound,
  Zap,
} from "lucide-react"
import { useState } from "react"

import { buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

import { SidebarToggleIcon } from "../../assets/icons"
import { Logo } from "../../assets/logo"
import { ProfileMenu } from "../shared/profile-menu"
import {
  SidebarNavigationItem,
  type NavigationItem,
} from "./sidebar-navigation-item"

export const primaryNavigation: NavigationItem[] = [
  { href: "/", label: "Dashboard", shortLabel: "Dashboard", icon: House },
  {
    href: "/modelling",
    label: "System modelling and data",
    shortLabel: "Modelling",
    icon: Database,
  },
  {
    href: "/flexibility",
    label: "Flexibility",
    shortLabel: "Flexibility",
    icon: Zap,
  },
  {
    href: "/planning",
    label: "Planning and investment",
    shortLabel: "Planning",
    icon: TrendingUp,
  },
  {
    href: "/operations",
    label: "Operations interface",
    shortLabel: "Operations",
    icon: Radio,
  },
  {
    href: "/stakeholders",
    label: "Stakeholders and public",
    shortLabel: "Stakeholders",
    icon: UsersRound,
  },
  {
    href: "/connections",
    label: "Connections and queue",
    shortLabel: "Connections",
    icon: GitBranch,
  },
]

type ThemeProps = {
  isDark: boolean
  onThemeChange: (isDark: boolean) => void
}

export function AppSidebar() {
  return (
    <aside
      aria-label="Primary navigation"
      className="absolute inset-y-0 left-0 z-30 hidden w-17 flex-col items-center justify-between border-r border-sidebar-border bg-sidebar px-2.5 py-4 text-sidebar-foreground md:flex"
    >
      <div className="flex w-full flex-col items-center gap-5">
        <div className="flex w-full justify-center border-b border-sidebar-border pb-4">
          <Logo />
        </div>

        <nav className="flex flex-col items-center gap-4 border-b border-sidebar-border pb-3">
          {primaryNavigation.map((item) => (
            <SidebarNavigationItem key={item.href} item={item} />
          ))}
        </nav>
      </div>

      <div className="flex flex-col items-center gap-4">
        <Tooltip>
          <TooltipTrigger
            type="button"
            aria-label="Documents"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon-lg" }),
              "rounded-lg text-muted-foreground",
            )}
          >
            <FileText aria-hidden="true" className="size-6" strokeWidth={1.6} />
          </TooltipTrigger>
          <TooltipContent side="right">Documents</TooltipContent>
        </Tooltip>
        <ProfileMenu placement="sidebar" />
      </div>
    </aside>
  )
}

export function MobileNavigation({
  isDark,
  onThemeChange,
}: ThemeProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open navigation menu"
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon-lg" }),
          "text-foreground md:hidden",
        )}
      >
        <SidebarToggleIcon aria-hidden="true" className="size-5" />
      </SheetTrigger>

      <SheetContent
        side="left"
        showCloseButton={false}
        className="w-4/5 gap-0 border-sidebar-border bg-sidebar p-0 text-sidebar-foreground sm:max-w-xs"
      >
        <SheetHeader className="flex-row items-center justify-between gap-3 border-b border-sidebar-border">
          <SheetTitle>
            <Logo showName compact />
          </SheetTitle>
          <SheetClose
            aria-label="Close navigation menu"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon-lg" }),
              "text-muted-foreground",
            )}
          >
            <ChevronLeft
              aria-hidden="true"
              className="size-6"
            />
          </SheetClose>
          <SheetDescription className="sr-only">
            Navigate between dashboard pages
          </SheetDescription>
        </SheetHeader>

        <nav className="flex flex-col gap-1 p-3">
          {primaryNavigation.map((item) => (
            <SidebarNavigationItem
              key={item.href}
              item={item}
              showLabel
              onNavigate={() => setOpen(false)}
            />
          ))}
        </nav>

        <SheetFooter className="border-t border-sidebar-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              {isDark ? (
                <MoonStar aria-hidden="true" className="size-4" />
              ) : (
                <SunDim aria-hidden="true" className="size-4.5" />
              )}
              <span>{isDark ? "Dark Mode" : "Light Mode"}</span>
            </div>
            <Switch
              checked={isDark}
              onCheckedChange={onThemeChange}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
              className="data-unchecked:bg-muted"
            />
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
