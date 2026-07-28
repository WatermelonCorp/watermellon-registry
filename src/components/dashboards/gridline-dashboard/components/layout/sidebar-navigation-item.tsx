import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

import { useDashboardNavigation } from "../navigation";

export type NavigationItem = {
  href: string;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
};

type SidebarNavigationItemProps = {
  item: NavigationItem;
  showLabel?: boolean;
  onNavigate?: () => void;
};

export function SidebarNavigationItem({
  item,
  showLabel = false,
  onNavigate,
}: SidebarNavigationItemProps) {
  const { pathname, navigate } = useDashboardNavigation();
  const active =
    item.href === "/"
      ? pathname === item.href
      : pathname.startsWith(item.href);
  const Icon = item.icon;
  const className = cn(
    buttonVariants({
      variant: "ghost",
      size: showLabel ? "lg" : "icon-lg",
    }),
    "rounded-lg text-muted-foreground",
    showLabel && "w-full justify-start gap-3",
    active &&
      "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary",
  );

  const content = (
    <>
      <Icon
        aria-hidden="true"
        className={showLabel ? "size-5" : "size-6"}
        strokeWidth={showLabel ? 1.7 : 1.6}
      />
      {showLabel && item.shortLabel}
    </>
  );
  const handleNavigate = () => {
    navigate(item.href);
    onNavigate?.();
  };

  if (showLabel) {
    return (
      <button
        type="button"
        aria-current={active ? "page" : undefined}
        className={className}
        onClick={handleNavigate}
      >
        {content}
      </button>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger
        type="button"
        aria-label={item.label}
        aria-current={active ? "page" : undefined}
        className={className}
        onClick={handleNavigate}
      >
        {content}
      </TooltipTrigger>
      <TooltipContent side="right">{item.label}</TooltipContent>
    </Tooltip>
  );
}
