import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Cpu,
  Layers,
  GitBranch,
  Terminal,
  ArrowUpRight,
  Search,
  ChevronDown,
  Menu,
  User,
  Settings,
  LogOut,
  MoonStar,
  Bookmark,
} from 'lucide-react';

export function Navigation4() {
  return (
    <div className="relative w-full border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950 [&_a]:no-underline">
      <div className="mx-auto flex h-17 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center text-orange-600 dark:text-orange-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 fill-current"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight text-neutral-900 lg:hidden dark:text-white">
              Watermelon
            </span>
          </div>

          <div className="hidden lg:block">
            <NavigationMenu
              className={cn(
                'static',
                '[&>.absolute]:inset-x-0 [&>.absolute]:top-full [&>.absolute]:w-full',
                '[&_[data-slot=navigation-menu-viewport]]:mt-1 [&_[data-slot=navigation-menu-viewport]]:!w-full',
                '[&_[data-slot=navigation-menu-viewport]]:rounded-none [&_[data-slot=navigation-menu-viewport]]:shadow-none [&_[data-slot=navigation-menu-viewport]]:ring-0',
                '[&_[data-slot=navigation-menu-viewport]]:border-0 [&_[data-slot=navigation-menu-viewport]]:border-b',
                '[&_[data-slot=navigation-menu-viewport]]:border-neutral-200 dark:[&_[data-slot=navigation-menu-viewport]]:border-neutral-800',
                '[&_[data-slot=navigation-menu-viewport]]:bg-white dark:[&_[data-slot=navigation-menu-viewport]]:bg-neutral-950',
                '[&_[data-slot=navigation-menu-viewport]]:transition-all [&_[data-slot=navigation-menu-viewport]]:duration-300 [&_[data-slot=navigation-menu-viewport]]:ease-in-out',
                '[&_[data-slot=navigation-menu-viewport]]:data-open:fade-in-0 [&_[data-slot=navigation-menu-viewport]]:data-closed:fade-out-0',
                '[&_[data-slot=navigation-menu-viewport]]:data-open:zoom-in-100 [&_[data-slot=navigation-menu-viewport]]:data-closed:zoom-out-100',
              )}
            >
              <NavigationMenuList className="gap-6">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="rounded-xl bg-transparent px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-50"
                    href="#"
                  >
                    Features
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="flex items-center gap-2 rounded-xl bg-transparent px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-50"
                    href="#"
                  >
                    Developers
                    <Badge
                      variant="secondary"
                      className="h-5 rounded-full bg-orange-100 px-2 text-[10px] text-orange-600 hover:bg-orange-100 dark:bg-orange-500/20 dark:text-orange-400 dark:hover:bg-orange-500/20"
                    >
                      API
                    </Badge>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem className="gap-5">
                  <NavigationMenuTrigger className="h-auto rounded-xl bg-transparent px-3 py-1.5 text-sm font-medium text-neutral-700 transition-all hover:bg-neutral-100 hover:text-neutral-900 focus:bg-neutral-100 focus:text-neutral-900 data-[active]:bg-neutral-100 data-[state=open]:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-50 dark:focus:bg-neutral-800/50 dark:focus:text-neutral-50 dark:data-[active]:bg-neutral-800/50 dark:data-[state=open]:bg-neutral-800/50">
                    Solutions
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="!w-full">
                    <div className="mx-auto grid max-w-6xl grid-cols-4 gap-6 divide-x px-6 py-8">
                      <div className="flex flex-col">
                        <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-900">
                          <Cpu className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
                        </div>
                        <h4 className="mb-1 text-sm font-medium text-neutral-900 dark:text-neutral-50">
                          Compute Engine
                        </h4>
                        <p className="mb-3 text-sm tracking-tight text-neutral-500 dark:text-neutral-400">
                          Train and deploy models with infinite scale
                          infrastructure.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Button
                            variant="outline"
                            className="h-7 gap-1.5 rounded-full px-3 text-xs text-neutral-700 dark:text-neutral-300"
                          >
                            <Layers className="h-3.5 w-3.5" /> Pipelines
                          </Button>
                          <Button
                            variant="outline"
                            className="h-7 gap-1.5 rounded-full px-3 text-xs text-neutral-700 dark:text-neutral-300"
                          >
                            <GitBranch className="h-3.5 w-3.5" /> Webhooks
                          </Button>
                          <Button
                            variant="outline"
                            className="h-7 gap-1.5 rounded-full px-3 text-xs text-neutral-700 dark:text-neutral-300"
                          >
                            <Terminal className="h-3.5 w-3.5" /> CLI Tool
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3 pl-6">
                        <h4 className="mb-1 text-xs text-neutral-400 uppercase dark:text-neutral-500">
                          Use Cases
                        </h4>
                        <a
                          href="#"
                          className="text-sm font-medium text-neutral-500 no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          Fraud Detection
                        </a>
                        <a
                          href="#"
                          className="text-sm font-medium text-neutral-500 no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          Personalized Search
                        </a>
                        <a
                          href="#"
                          className="text-sm font-medium text-neutral-500 no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          Predictive Analytics
                        </a>
                        <a
                          href="#"
                          className="text-sm font-medium text-neutral-500 no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          LLM Gateways
                        </a>
                      </div>
                      <div className="flex flex-col gap-3 pl-6">
                        <h4 className="mb-1 text-xs text-neutral-400 uppercase dark:text-neutral-500">
                          Resources
                        </h4>
                        <a
                          href="#"
                          className="text-sm font-medium text-neutral-500 no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          Documentation
                        </a>
                        <a
                          href="#"
                          className="text-sm font-medium text-neutral-500 no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          API Reference
                        </a>
                        <a
                          href="#"
                          className="text-sm font-medium text-neutral-500 no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          System Status
                        </a>
                      </div>
                      <div className="flex flex-col pl-6">
                        <h4 className="mb-4 text-xs text-neutral-400 uppercase dark:text-neutral-500">
                          Featured
                        </h4>
                        <a
                          href="#"
                          className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6 no-underline ring ring-orange-500/50 transition-all"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent group-hover:opacity-100 dark:from-orange-500/10" />
                          <div className="absolute inset-0 -z-10 bg-neutral-100 dark:bg-neutral-900" />
                          <div>
                            <Badge
                              variant="outline"
                              className="mb-3 border-orange-200 bg-white text-orange-600 dark:border-orange-900 dark:bg-neutral-950 dark:text-orange-400"
                            >
                              Upcoming Webinar
                            </Badge>
                            <h4 className="mb-2 text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                              Building scalable AI pipelines
                            </h4>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              Join our engineers for a live teardown of
                              architecture.
                            </p>
                          </div>
                          <div className="mt-4 flex items-center text-sm font-medium text-orange-600 dark:text-orange-400">
                            Register now{' '}
                            <ArrowUpRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </a>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mx-8 hidden max-w-md flex-1 lg:block">
          <div className="group relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <Input
              type="text"
              placeholder="Search components..."
              className="w-full rounded-lg border-neutral-200 bg-neutral-50 pr-4 pl-10 text-sm transition-all focus:ring-2 focus:ring-orange-600/20 dark:border-neutral-800 dark:bg-neutral-900"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex hidden items-center gap-2 lg:block">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg p-0 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
            >
              <MoonStar className="h-5 w-5" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg p-0 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
            >
              <Bookmark className="h-5 w-5" />
              <span className="sr-only">Bookmarks</span>
            </Button>
          </div>

          <div className="hidden h-6 w-px bg-neutral-200 lg:block dark:bg-neutral-800" />

          {/* Avatar Section */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-auto rounded-xl p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800/50"
              >
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 rounded-full border border-neutral-200 dark:border-neutral-800">
                    <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-4 w-4 text-neutral-400" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 rounded-xl p-1.5 shadow-xl"
            >
              <DropdownMenuLabel className="px-2 py-1.5 text-xs text-neutral-400 uppercase">
                Account
              </DropdownMenuLabel>
              <DropdownMenuItem className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm">
                <User className="h-4 w-4" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm">
                <Settings className="h-4 w-4" /> Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm !focus:bg-red-600/10"
              >
                <LogOut className="h-4 w-4" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="text-neutral-700 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-10 w-10 rounded-xl p-0 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-xs">
                <div className="flex h-full flex-col overflow-y-auto px-6 py-8">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center text-orange-600 dark:text-orange-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-6 w-6 fill-current"
                        >
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                      </div>
                      <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                        Watermelon
                      </span>
                    </div>
                  </div>

                  {/* Sheet Search */}
                  <div className="relative mb-6">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <Input
                      placeholder="Search..."
                      className="rounded-lg pl-10"
                    />
                  </div>

                  <div className="flex flex-col gap-1 text-base font-medium">
                    <a
                      href="#"
                      className="block py-2 text-neutral-900 no-underline transition-colors hover:text-orange-600 dark:text-neutral-50"
                    >
                      Features
                    </a>
                    <a
                      href="#"
                      className="flex items-center justify-between py-2 text-neutral-900 no-underline transition-colors hover:text-orange-600 dark:text-neutral-50"
                    >
                      Developers
                      <Badge
                        variant="secondary"
                        className="bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400"
                      >
                        API
                      </Badge>
                    </a>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="solutions" className="border-none">
                        <AccordionTrigger className="justify-between py-2 text-base font-medium text-neutral-900 no-underline transition-colors hover:text-orange-600 hover:no-underline dark:text-neutral-50 dark:hover:text-orange-400">
                          Solutions
                        </AccordionTrigger>
                        <AccordionContent className="mt-1 ml-2 flex !h-auto flex-col gap-3 border-l border-neutral-200 pb-0 pl-4 dark:border-neutral-800 [&_a]:no-underline">
                          <div className="flex flex-col gap-2">
                            <span className="text-xs text-neutral-400 uppercase">
                              Infrastructure
                            </span>
                            <a
                              href="#"
                              className="text-sm font-medium tracking-tight text-neutral-600 hover:text-orange-600 dark:text-neutral-300 dark:hover:text-orange-400"
                            >
                              Compute Engine
                            </a>
                            <a
                              href="#"
                              className="text-sm font-medium tracking-tight text-neutral-600 hover:text-orange-600 dark:text-neutral-300 dark:hover:text-orange-400"
                            >
                              System Status
                            </a>
                          </div>
                          <div className="mt-2 flex flex-col gap-2">
                            <span className="text-xs text-neutral-400 uppercase">
                              Use Cases
                            </span>
                            <a
                              href="#"
                              className="text-sm font-medium tracking-tight text-neutral-600 hover:text-orange-600 dark:text-neutral-300 dark:hover:text-orange-400"
                            >
                              Fraud Detection
                            </a>
                            <a
                              href="#"
                              className="text-sm font-medium tracking-tight text-neutral-600 hover:text-orange-600 dark:text-neutral-300 dark:hover:text-orange-400"
                            >
                              Predictive Analytics
                            </a>
                            <a
                              href="#"
                              className="text-sm font-medium tracking-tight text-neutral-600 hover:text-orange-600 dark:text-neutral-300 dark:hover:text-orange-400"
                            >
                              LLM Gateways
                            </a>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <a
                      href="#"
                      className="block py-2 text-neutral-900 no-underline transition-colors hover:text-orange-600 dark:text-neutral-50"
                    >
                      Pricing
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
}
