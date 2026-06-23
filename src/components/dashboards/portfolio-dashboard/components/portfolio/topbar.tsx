import { Bell, ChevronDown, CommandIcon, Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DashboardTopbar() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center border-b px-4 backdrop-blur md:px-8">
      <SidebarTrigger className="md:hidden" />
      <h1 className="text-base font-semibold">Portfolio Overview</h1>
      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="text-muted-foreground absolute top-3 left-3 size-4" />
          <Input
            className="shadow-border focus-visible:ring-primary/30 focus-visible:border-primary/50 h-10 w-72 rounded-xl border-0 bg-white pr-8 pl-9 focus-visible:border"
            placeholder="find a control"
          />
          <kbd className="text-muted-foreground shadow-border absolute top-2.5 right-2.5 flex items-center gap-1 rounded-sm bg-white px-1 text-sm dark:bg-zinc-800">
            <CommandIcon className="size-3" /> K
          </kbd>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shadow-border relative size-10 border-0 bg-white"
            >
              <Bell className="size-4" />
              <span className="bg-destructive absolute top-2.5 right-2.5 size-1.5 rounded-full" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="portfolio-dashboard w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications
              <span className="text-muted-foreground text-xs font-normal">
                3 unread
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex flex-col gap-1 p-1">
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 whitespace-normal">
                <span className="text-sm font-medium">Policy renewal due</span>
                <span className="text-muted-foreground text-xs">
                  Acme Corp's general liability policy expires in 2 days.
                </span>
                <span className="text-muted-foreground mt-1 text-[10px]">
                  2 hours ago
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 whitespace-normal">
                <span className="text-sm font-medium">New claim filed</span>
                <span className="text-muted-foreground text-xs">
                  Jane Doe has filed a new auto insurance claim.
                </span>
                <span className="text-muted-foreground mt-1 text-[10px]">
                  5 hours ago
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 whitespace-normal">
                <span className="text-sm font-medium">System update</span>
                <span className="text-muted-foreground text-xs">
                  Scheduled maintenance will occur tonight at 2 AM EST.
                </span>
                <span className="text-muted-foreground mt-1 text-[10px]">
                  1 day ago
                </span>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-primary justify-center text-center text-sm">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="shadow-border h-10 gap-2 rounded-md border-0 bg-white"
            >
              <Avatar className="shadow-border size-6 border-0">
                <AvatarImage src="https://assets.watermelon.sh/wm_ben.png" />
                <AvatarFallback>VP</AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline">Vansh Patel</span>
              <ChevronDown className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950/50 dark:focus:text-red-500">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
