"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Home,
  FolderKanban,
  Bell,
  MessageSquare,
  Headphones,
  Settings,
  Moon,
} from "lucide-react";

const topIcons = [
  { icon: Home, label: "Home", href: "#" },
  { icon: FolderKanban, label: "Projects", href: "#" },
  { icon: Bell, label: "Notifications", href: "#" },
  { icon: MessageSquare, label: "Chat", href: "#" },
  { icon: Headphones, label: "Support", href: "#" },
];

export function IconRail() {
  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex h-full w-[60px] flex-col items-center border-r border-sidebar-border bg-sidebar py-4">
        {/* Logo */}
        <div className="mb-6">
          <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
          </div>
        </div>

        {/* Top Icons */}
        <div className="flex flex-1 flex-col items-center gap-2">
          {topIcons.map((item) => (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-10 text-muted-foreground hover:text-foreground hover:bg-muted"
                  asChild
                >
                  <a href={item.href}>
                    <item.icon className="size-5" />
                    <span className="sr-only">{item.label}</span>
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                {item.label}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Bottom Icons */}
        <div className="flex flex-col items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-10 text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <Settings className="size-5" />
                <span className="sr-only">Settings</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-10 text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <Moon className="size-5" />
                <span className="sr-only">Toggle Theme</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Toggle Theme</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
