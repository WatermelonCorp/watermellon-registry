import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  Cpu,
  Layers,
  GitBranch,
  Terminal,
  User,
  Menu,
  X,
  ArrowUpRight,
  Search,
  Settings,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { useState } from 'react';

export function Navigation7() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full py-10">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-6">
        {/* Navigation Wrapper with Anchor */}
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverAnchor asChild>
            {/* Floating Navbar Pill */}
            <div className="flex h-16 w-full items-center justify-between gap-2 rounded-full border border-neutral-200 bg-white pr-4 shadow-lg md:w-5xl lg:w-4xl dark:border-neutral-800 dark:bg-neutral-950">
              <div className="flex items-center gap-2 pl-4">
                {/* Toggle Button */}
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-xl text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                  >
                    {isOpen ? (
                      <X className="size-5" />
                    ) : (
                      <Menu className="size-5" />
                    )}
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </PopoverTrigger>

                {/* Logo Section */}
                <div className="flex items-center gap-1.5">
                  <div className="flex h-8 w-8 items-center justify-center text-orange-600 dark:text-orange-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-6 fill-current"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <span className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
                    Watermelon
                  </span>
                </div>
              </div>

              {/* Action Icons Section */}
              <div className="flex items-center gap-2">
                {/* Search Icon - Desktop Only */}
                <div className="hidden lg:block">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                  >
                    <Search className="size-4.5" />
                  </Button>
                </div>

                {/* Avatar Section - Visible Everywhere */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-auto rounded-full p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800/50"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 rounded-full border border-neutral-200 dark:border-neutral-800">
                          <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <ChevronDown className="hidden h-4 w-4 text-neutral-400 lg:block" />
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
                    <DropdownMenuItem className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800">
                      <User className="h-4 w-4" /> Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800">
                      <Settings className="h-4 w-4" /> Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-1 bg-neutral-100 dark:bg-neutral-800" />
                    <DropdownMenuItem
                      variant="destructive"
                      className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                      <LogOut className="h-4 w-4" /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </PopoverAnchor>

          <PopoverContent
            align="center"
            sideOffset={20}
            className={cn(
              'max-h-[82dvh] w-xs max-w-none overflow-y-auto overscroll-contain rounded-2xl border border-neutral-200 bg-white p-0 shadow-none ring-0 sm:w-2xl dark:border-neutral-800 dark:bg-neutral-950',
              'lg:w-[calc(100vw-3rem)] lg:max-w-5xl lg:rounded-[2.5rem] lg:shadow-lg',
            )}
          >
            <div className="mx-auto grid w-full max-w-none grid-cols-1 gap-0 px-8 py-6 lg:max-w-5xl lg:grid-cols-4 lg:px-10 lg:py-10 dark:divide-neutral-900">
              {/* Column 1 */}
              <div className="flex flex-col pb-8 lg:pr-8 lg:pb-0">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-900">
                  <Cpu className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
                </div>
                <h4 className="mb-1 text-sm font-medium text-neutral-900 dark:text-neutral-50">
                  Compute Engine
                </h4>
                <p className="mb-3 text-sm tracking-tight text-neutral-500 dark:text-neutral-400">
                  Train and deploy models with infinite scale infrastructure.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    className="h-7 gap-1.5 rounded-full px-3 text-xs text-neutral-700 dark:text-neutral-300"
                  >
                    <Layers className="h-3.5 w-3.5" />
                    Pipelines
                  </Button>
                  <Button
                    variant="outline"
                    className="h-7 gap-1.5 rounded-full px-3 text-xs text-neutral-700 dark:text-neutral-300"
                  >
                    <GitBranch className="h-3.5 w-3.5" />
                    Webhooks
                  </Button>
                  <Button
                    variant="outline"
                    className="h-7 gap-1.5 rounded-full px-3 text-xs text-neutral-700 dark:text-neutral-300"
                  >
                    <Terminal className="h-3.5 w-3.5" />
                    CLI Tool
                  </Button>
                </div>
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-3 border-t border-neutral-100 py-8 lg:border-t-0 lg:border-l lg:py-0 lg:pl-8 dark:border-neutral-900">
                <h4 className="mb-1 text-xs text-neutral-400 uppercase dark:text-neutral-500">
                  Use Cases
                </h4>
                <a
                  href="#"
                  className="text-sm font-medium tracking-tight text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                >
                  Fraud Detection
                </a>
                <a
                  href="#"
                  className="text-sm font-medium tracking-tight text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                >
                  Personalized Search
                </a>
                <a
                  href="#"
                  className="text-sm font-medium tracking-tight text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                >
                  Predictive Analytics
                </a>
                <a
                  href="#"
                  className="text-sm font-medium tracking-tight text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                >
                  LLM Gateways
                </a>
              </div>

              {/* Column 3 */}
              <div className="flex flex-col gap-3 border-t border-neutral-100 py-8 lg:border-t-0 lg:border-l lg:py-0 lg:pl-8 dark:border-neutral-900">
                <h4 className="mb-1 text-xs text-neutral-400 uppercase dark:text-neutral-500">
                  Resources
                </h4>
                <a
                  href="#"
                  className="text-sm font-medium tracking-tight text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                >
                  Documentation
                </a>
                <a
                  href="#"
                  className="text-sm font-medium tracking-tight text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                >
                  API Reference
                </a>
                <a
                  href="#"
                  className="text-sm font-medium tracking-tight text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                >
                  System Status
                </a>
              </div>

              {/* Column 4 */}
              <div className="flex flex-col border-t border-neutral-100 py-8 lg:border-t-0 lg:border-l lg:py-0 lg:pl-8 dark:border-neutral-900">
                <h4 className="mb-4 text-xs text-neutral-400 uppercase dark:text-neutral-500">
                  Featured
                </h4>
                <a
                  href="#"
                  className="group relative flex h-full min-h-[160px] flex-col justify-between overflow-hidden rounded-2xl p-6 ring ring-orange-500/50 transition-all"
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
                    <p className="text-sm tracking-tight text-neutral-600 dark:text-neutral-400">
                      Join our engineers for a live teardown of the new Compute
                      Engine architecture.
                    </p>
                  </div>

                  <div className="mt-4 flex items-center text-sm font-medium text-orange-600 dark:text-orange-400">
                    Register now{' '}
                    <ArrowUpRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </a>
              </div>
            </div>

            {/* Mobile Button Collection */}
            <div className="px-6 pb-8 lg:hidden">
              <Button className="w-full rounded-xl bg-orange-600 py-6 text-white shadow-lg shadow-orange-600/20 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700">
                Get started
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}