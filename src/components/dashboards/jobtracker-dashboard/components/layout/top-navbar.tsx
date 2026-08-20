import {
  CustomersIcon,
  JobsIcon,
  MenuIcon,
  NotificationIcon,
} from "../../assets/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants, Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

import { currentUser, notifications } from "../../data";
import { CircleHelp, LogOut, Settings, UserRound } from "lucide-react";
import { useDashboardNavigation } from "../navigation";

export function TopNavbar() {
  const isMobile = useIsMobile();
  const { pathname } = useDashboardNavigation();
  const currentPage = pathname.startsWith("/jobs")
    ? { label: "Jobs", icon: JobsIcon }
    : { label: "Customers", icon: CustomersIcon };
  const PageIcon = currentPage.icon;

  return (
    <header className="flex h-16 shrink-0 items-center justify-between px-4 sm:px-6 lg:px-10">
      <div className="flex min-w-0 items-center gap-3">
        <SidebarTrigger
          size="icon-lg"
          className="md:hidden"
          aria-label="Toggle sidebar"
        />
        <PageIcon className="hidden size-5 shrink-0 md:block" />
        <span className="truncate text-lg font-medium tracking-tight">
          {currentPage.label}
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <NotificationsMenu
          align={isMobile ? "center" : "end"}
          collisionPadding={isMobile ? 16 : 5}
        />
        <ProfileMenu
          align={isMobile ? "center" : "end"}
          collisionPadding={isMobile ? 16 : 5}
        />
      </div>
    </header>
  );
}

type MenuPositioningProps = {
  align: "center" | "end";
  collisionPadding: number;
};

function NotificationsMenu({ align, collisionPadding }: MenuPositioningProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: "secondary", size: "icon-lg" }),
          "relative rounded-full",
        )}
        aria-label="Open notifications"
      >
        <NotificationIcon className="size-5" />
        <span className="absolute top-2 right-2 size-2 rounded-full bg-red-500 ring-2 ring-sidebar" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        sideOffset={8}
        collisionPadding={collisionPadding}
        className="w-72 rounded-xl p-2"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-2 py-2 text-sm">
            Notifications
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {notifications.slice(0, 3).map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className="block rounded-lg py-2.5"
            >
              <span className="flex min-w-0 items-center justify-between gap-3">
                <span className="truncate font-medium">
                  {notification.title}
                </span>
                <time className="shrink-0 text-xs text-muted-foreground">
                  {notification.timestamp}
                </time>
              </span>
              <span className="mt-0.5 block truncate text-sm text-muted-foreground">
                {notification.description}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <div className="mt-1 border-t pt-1">
          <Button variant="link" size="sm" className="w-full">
            View all notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ProfileMenu({ align, collisionPadding }: MenuPositioningProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: "secondary", size: "lg" }),
          "gap-1 rounded-full p-1 pr-1.5",
        )}
        aria-label="Open profile menu"
      >
        <Avatar className="size-8">
          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
          <AvatarFallback>VP</AvatarFallback>
        </Avatar>
        <MenuIcon className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        sideOffset={8}
        collisionPadding={collisionPadding}
        className="w-72 rounded-xl p-2"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex items-center gap-3 px-2 py-2 text-popover-foreground">
            <Avatar className="size-9">
              <AvatarImage src={currentUser.avatar} alt="VP" />
              <AvatarFallback>VP</AvatarFallback>
            </Avatar>
            <span className="min-w-0">
              <span className="block truncate font-medium">
                {currentUser.name}
              </span>
              <span className="block truncate font-normal text-muted-foreground">
                {currentUser.email}
              </span>
            </span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="rounded-lg">
            <UserRound />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-lg">
            <Settings />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-lg">
            <CircleHelp />
            Help and support
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup className="mt-1 border-t pt-1">
          <DropdownMenuItem variant="destructive" className="rounded-lg">
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
