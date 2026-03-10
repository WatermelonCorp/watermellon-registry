import { IconRail, SecondarySidebar } from "./components/app-sidebar"
import { TooltipProvider } from "./components/ui/tooltip";
import { Button } from "./components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "./components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Menu, User, Settings, LogOut } from "lucide-react";
import { useState } from "react";

export const DashboardLayout = ({
  children,
  onNavigate,
  currentView
}: {
  children: React.ReactNode;
  onNavigate?: (view: string) => void;
  currentView?: string
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = (view: string) => {
    setIsMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(view);
    }
  };

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex h-full shrink-0">
          <IconRail
            onToggle={() => setSidebarOpen(!sidebarOpen)}
            isExpanded={sidebarOpen}
          />

          <SecondarySidebar
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
            onNavigate={handleNavigate}
            currentView={currentView}
          />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-border px-4 lg:px-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {/* Mobile Navigation Trigger */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden -ml-2">
                    <Menu className="size-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-fit flex flex-row gap-0 h-full border-none bg-transparent no-scrollbar [&>button]:hidden">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <IconRail onToggle={() => setIsMobileMenuOpen(false)} isExpanded={true} />
                  <SecondarySidebar
                    isOpen={true}
                    onToggle={() => setIsMobileMenuOpen(false)}
                    onNavigate={handleNavigate}
                    currentView={currentView}
                  />
                </SheetContent>
              </Sheet>
              <span>{currentView || "Dashboard"}</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full outline-none p-1 hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all active:scale-95 duration-200">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="User"
                    className="size-7 rounded-full object-cover shadow-sm"
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-1.5 rounded-xl border-sidebar-border bg-sidebar text-sidebar-foreground shadow-lg">
                <DropdownMenuLabel className="font-normal flex p-3 gap-3 pb-2">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="User"
                      className="size-8 rounded-lg object-cover"
                    />
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold text-foreground">Admin User</span>
                      <span className="truncate text-xs text-muted-foreground">admin@gr8r.io</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-sidebar-border" />
                <div className="p-1">
                  <DropdownMenuItem className="gap-2 cursor-pointer rounded-md focus:bg-sidebar-accent focus:text-sidebar-accent-foreground py-2 text-sm">
                    <User className="size-4 text-muted-foreground" />
                    <span>My Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 cursor-pointer rounded-md focus:bg-sidebar-accent focus:text-sidebar-accent-foreground py-2 text-sm">
                    <Settings className="size-4 text-muted-foreground" />
                    <span>Account Settings</span>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator className="bg-sidebar-border" />
                <div className="p-1">
                  <DropdownMenuItem className="gap-2 cursor-pointer text-red-500 rounded-md focus:bg-red-500/10 focus:text-red-500 py-2 text-sm">
                    <LogOut className="size-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>

          <main className="flex-1 overflow-auto bg-background">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
}
