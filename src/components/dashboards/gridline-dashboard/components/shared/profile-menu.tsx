import { LogOut, MoonStar, Settings, UserRound } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export function ProfileMenu({
  placement,
  isDark,
  onThemeChange,
  className,
}: {
  placement: "sidebar" | "topbar"
  isDark: boolean
  onThemeChange: (isDark: boolean) => void
  className?: string
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open profile menu"
        title="Profile"
        className={cn(
          buttonVariants({
            variant: placement === "topbar" ? "secondary" : "ghost",
            size: "icon-lg",
          }),
          "rounded-lg",
          placement === "sidebar" && "text-muted-foreground",
          className,
        )}
      >
        <UserRound aria-hidden="true" className="size-5" strokeWidth={1.7} />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side={placement === "sidebar" ? "right" : "bottom"}
        align="end"
        sideOffset={8}
        className="w-48"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuItem>
            <UserRound />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            Settings
          </DropdownMenuItem>
          <DropdownMenuCheckboxItem
            checked={isDark}
            onCheckedChange={onThemeChange}
          >
            <MoonStar />
            Dark mode
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOut />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
