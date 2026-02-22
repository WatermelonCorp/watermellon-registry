"use client";

import {
  Home,
  Users,
  Building2,
  FolderKanban,
  SunMoon,
  Calendar,
  Clock,
  UserSearch,
  FileUser,
  MessageSquare,
  Wallet,
  BarChart3,
  Link2,
  CalendarClock,
  GraduationCap,
  TrendingUp,
  Receipt,
  FileText,
  Settings,
  HelpCircle,
  ChevronDown,
  Star,
  Bell,
  Headphones,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./ui/tooltip";
import { useTheme } from "next-themes";

interface NavItem {
  icon: any;
  label: string;
  href: string;
  isActive?: boolean;
  isDisabled?: boolean;
  bgColor?: string;
}

const mainNavItems: NavItem[] = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Employees", href: "#", isDisabled: true },
  { icon: Building2, label: "Clients", href: "#", isDisabled: true },
  { icon: FolderKanban, label: "Projects", href: "#", isDisabled: true },
];

const workforceItems: NavItem[] = [
  { icon: Calendar, label: "Calendrer", href: "#", isDisabled: true },
  { icon: Clock, label: "Attendance", href: "#", isDisabled: true },
  { icon: UserSearch, label: "Interviews", href: "#", isDisabled: true },
  { icon: FileUser, label: "Job & Applications", href: "#", isDisabled: true },
];

const communicationItems: NavItem[] = [
  { icon: MessageSquare, label: "Chat Hub", href: "#", isDisabled: true },
  { icon: Wallet, label: "Payroll & Finance", href: "#", isDisabled: true },
  { icon: BarChart3, label: "Reports & Analytics", href: "#", isDisabled: true },
  { icon: Link2, label: "Integrations", href: "#", isDisabled: true },
];

const projectItems: NavItem[] = [
  {
    icon: CalendarClock,
    label: "Shift Planner",
    href: "#",
    bgColor: "bg-orange-500",
    isDisabled: true,
  },
  {
    icon: GraduationCap,
    label: "Training Portal",
    href: "#",
    bgColor: "bg-purple-500",
    isDisabled: true,
  },
  {
    icon: TrendingUp,
    label: "Performance Hub",
    href: "#",
    bgColor: "bg-emerald-500",
    isDisabled: true,
  },
  { icon: Receipt, label: "Expense Claims", href: "#", bgColor: "bg-blue-500", isDisabled: true },
];

const adminItems: NavItem[] = [
  { icon: FileText, label: "Documents", href: "#", isDisabled: true },
  { icon: Settings, label: "Settings", href: "#", isDisabled: true },
  { icon: HelpCircle, label: "Help & Center", href: "#", isDisabled: true },
];

const iconRailItems = [
  { icon: Home, label: "Home" },
  { icon: FolderKanban, label: "Projects" },
  { icon: Bell, label: "Notifications" },
  { icon: MessageSquare, label: "Chat" },
];

const secondaryIconItems = [
  { icon: Headphones, label: "Support" },
  { icon: Settings, label: "Settings" },
  { icon: SunMoon, label: "Toggle Theme", isThemeToggle: true },
];

// Icon Rail - Panel 1 (Always visible, with toggle rail on right edge)
export function IconRail({
  onToggle,
}: {
  onToggle: () => void;
  isExpanded: boolean;
}) {

  return (
    <div className="relative flex h-full w-[60px] flex-col items-center border-r border-sidebar-border bg-sidebar py-4">
      {/* Logo */}
      <div className="mb-6">
        <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg border-b-2 border-neutral-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
        </div>
      </div>

      {/* Navigation Icons */}
      <div className="flex flex-col items-center gap-1 pb-1">
        {iconRailItems.map((item) => (
          <Tooltip key={item.label}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-10 text-neutral-500 hover:text-foreground hover:bg-muted"
                asChild
              >
                <a href="#" onClick={(e) => e.preventDefault()}>
                  <item.icon className="size-4" />
                  <span className="sr-only">{item.label}</span>
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">{item.label}</TooltipContent>
          </Tooltip>
        ))}
      </div>

      <div className="flex flex-col items-center gap-1 border-t border-sidebar-border py-1">
        {secondaryIconItems.map((item) => (
          <ThemeIconButton key={item.label} item={item} />
        ))}
      </div>

      <button
        onClick={onToggle}
        className="absolute inset-y-0 -right-2 w-4 cursor-e-resize hover:after:bg-sidebar-border after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] after:transition-colors z-20"
        title="Toggle Sidebar"
        aria-label="Toggle Sidebar"
      />
    </div>
  );
}

export function SecondarySidebar({
  isOpen,
  onToggle,
  onNavigate,
  currentView
}: {
  isOpen: boolean;
  onToggle: () => void;
  onNavigate?: (view: string) => void;
  currentView?: string;
}) {
  return (
    <div
      className={cn(
        "h-full flex-shrink-0 border-r border-sidebar-border bg-sidebar overflow-hidden transition-all duration-300 ease-in-out",
        isOpen ? "w-[240px]" : "w-0"
      )}
    >
      <div className="flex h-full w-[240px] flex-col">
        {/* Header */}
        <div className="h-14 border-b border-sidebar-border flex items-center justify-center p-1.5">
          <div className="w-full flex items-center gap-2 rounded-md p-1 bg-muted/60 border border-sidebar-border">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Logo"
              className="size-7 rounded"
            />
            <div className="flex-1 text-left text-sm leading-tight">
              <div className="truncate font-medium text-foreground">GR8R HRM</div>
              <div className="truncate text-xs text-muted-foreground/60">Admin</div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-muted-foreground hover:text-foreground hover:bg-muted"
              onClick={onToggle}
            >
              <X className="size-4" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-2 no-scrollbar">

          {/* Main Nav */}
          <div className="space-y-1 mb-4">
            {mainNavItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  if (item.isDisabled) {
                    e.preventDefault();
                    return;
                  }
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate(item.label);
                  }
                }}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2.5 py-2 text-sm transition-colors",
                  (currentView ? currentView === item.label : item.isActive)
                    ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                    : "text-muted-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="size-4" />
                <span>{item.label}</span>
              </a>
            ))}
          </div>

          <div className="h-px bg-sidebar-border mb-3" />


          <CollapsibleSection title="Workforce" items={workforceItems} onNavigate={onNavigate} />

          <div className="h-px bg-sidebar-border mb-3" />

          <CollapsibleSection
            title="Communication"
            items={communicationItems}
            onNavigate={onNavigate}
          />

          <div className="h-px bg-sidebar-border mb-3" />

          <Collapsible defaultOpen className="group/collapsible mb-2">
            <CollapsibleTrigger className="flex w-full items-center justify-between px-2 py-1 text-sm tracking-tight text-sidebar-foreground/30">
              Projects
              <ChevronDown className="size-3 transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 mt-1">
              {projectItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    if (item.isDisabled) {
                      e.preventDefault();
                      return;
                    }
                  }}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors
                    text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <div
                    className={cn(
                      "size-4 rounded flex items-center justify-center",
                      item.bgColor
                    )}
                  >
                    <item.icon className="size-2.5 text-white" />
                  </div>
                  <span>{item.label}</span>
                  <Star className="ml-auto size-3.5 fill-neutral-100" />
                </a>
              ))}
            </CollapsibleContent>
          </Collapsible>
          <div className="h-px bg-sidebar-border mb-3" />

          <CollapsibleSection title="Administration" items={adminItems} onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}

function ThemeIconButton({ item }: { item: typeof secondaryIconItems[0] }) {
  const { setTheme, theme } = useTheme();

  if (item.isThemeToggle) {
    return (
      <Tooltip key={item.label}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-10 text-neutral-500 hover:text-foreground hover:bg-muted"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <item.icon className="size-4" />
            <span className="sr-only">{item.label}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">{item.label}</TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Tooltip key={item.label}>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-10 text-neutral-500 hover:text-foreground hover:bg-muted"
          asChild
        >
          <a href="#" onClick={(e) => e.preventDefault()}>
            <item.icon className="size-4" />
            <span className="sr-only">{item.label}</span>
          </a>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">{item.label}</TooltipContent>
    </Tooltip>
  );
}

function CollapsibleSection({
  title,
  items,
  onNavigate,
}: {
  title: string;
  items: NavItem[];
  onNavigate?: (view: string) => void;
}) {
  return (
    <Collapsible defaultOpen className="group/collapsible mb-2">
      <CollapsibleTrigger className="flex w-full items-center justify-between px-2 py-1 text-sm tracking-tight  text-sidebar-foreground/35">
        {title}
        <ChevronDown className="size-3 transition-transform group-data-[state=open]/collapsible:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-1 mt-1">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => {
              if (item.isDisabled) {
                e.preventDefault();
                return;
              }
              if (onNavigate) {
                e.preventDefault();
                onNavigate(item.label);
              }
            }}
            className="flex items-center gap-1.5 rounded-md px-2 pl-3 py-1.5 text-sm transition-colors
              text-sidebar-foreground/55 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <item.icon className="size-4" />
            <span>{item.label}</span>
          </a>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
