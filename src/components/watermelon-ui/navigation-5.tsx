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
  Command,
  User,
  Menu,
  ArrowUpRight,
} from 'lucide-react';

export function Navigation5() {
  return (
    <div className="relative w-full py-10">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-6">
        {/* Floating Navbar Pill */}
        <div className="flex h-16 w-4xl items-center justify-between gap-2 rounded-full border border-neutral-200 bg-white pr-3 shadow-sm md:w-5xl dark:border-neutral-800 dark:bg-neutral-950">
          {/* Logo Section */}
          <div className="flex items-center gap-2 pr-6 pl-4">
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

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <NavigationMenu
              className={cn(
                'static',
                // Position the viewport wrapper to be full-width relative to the navbar container
                '[&>div:last-child]:inset-x-0 [&>div:last-child]:top-full [&>div:last-child]:w-full',
                // Custom viewport styling for the "island" look
                '[&_[data-slot=navigation-menu-viewport]]:mx-auto [&_[data-slot=navigation-menu-viewport]]:-mt-6 [&_[data-slot=navigation-menu-viewport]]:max-w-7xl [&_[data-slot=navigation-menu-viewport]]:ring-0',
                '[&_[data-slot=navigation-menu-viewport]]:rounded-[2.5rem] [&_[data-slot=navigation-menu-viewport]]:border [&_[data-slot=navigation-menu-viewport]]:border-neutral-200 dark:[&_[data-slot=navigation-menu-viewport]]:border-neutral-800',
                '[&_[data-slot=navigation-menu-viewport]]:bg-white [&_[data-slot=navigation-menu-viewport]]:shadow-2xl dark:[&_[data-slot=navigation-menu-viewport]]:bg-neutral-950',
                // Viewport smooth animations
                '[&_[data-slot=navigation-menu-viewport]]:transition-all [&_[data-slot=navigation-menu-viewport]]:duration-300 [&_[data-slot=navigation-menu-viewport]]:ease-in-out',
                '[&_[data-slot=navigation-menu-viewport]]:data-open:fade-in-0 [&_[data-slot=navigation-menu-viewport]]:data-closed:fade-out-0',
                '[&_[data-slot=navigation-menu-viewport]]:data-open:zoom-in-100 [&_[data-slot=navigation-menu-viewport]]:data-closed:zoom-out-100',
              )}
            >
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="rounded-full bg-transparent px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                    href="#"
                  >
                    Features
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="flex items-center gap-2 rounded-full bg-transparent px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                    href="#"
                  >
                    Developers
                    <Badge
                      variant="secondary"
                      className="h-4 rounded-full bg-orange-100 px-1.5 text-[10px] text-orange-600 hover:bg-orange-100 dark:bg-orange-500/20 dark:text-orange-400 dark:hover:bg-orange-500/20"
                    >
                      API
                    </Badge>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-auto rounded-full bg-transparent px-4 py-2 text-sm font-medium text-neutral-600 transition-all hover:bg-neutral-100/50 hover:text-neutral-900 focus:bg-transparent data-[state=open]:bg-neutral-100/80 dark:text-neutral-400 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-50 dark:data-[state=open]:bg-neutral-800/80">
                    Solutions
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-0">
                    <div className="grid w-5xl grid-cols-4 gap-6 divide-x divide-neutral-100 px-10 py-10 dark:divide-neutral-900">
                      {/* Column 1 */}
                      <div className="flex flex-col px-2">
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
                      <div className="flex flex-col gap-3 pl-6">
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
                      <div className="flex flex-col gap-3 pl-6">
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
                      <div className="flex flex-col pl-6">
                        <h4 className="mb-4 text-xs text-neutral-400 uppercase dark:text-neutral-500">
                          Featured
                        </h4>
                        <a
                          href="#"
                          className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6 ring ring-orange-500/50 transition-all"
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
                              Join our engineers for a live teardown of the new
                              Compute Engine architecture.
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

                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="rounded-full bg-transparent px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                    href="#"
                  >
                    Customers
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="rounded-full bg-transparent px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                    href="#"
                  >
                    Enterprise
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Action Icons Section */}
          <div className="flex items-center gap-2">
            <div className="flex hidden items-center gap-1 md:flex">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
              >
                <Command className="size-4.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
              >
                <User className="size-4.5" />
              </Button>
            </div>
            <Button className="hidden rounded-full bg-orange-600 px-6 font-semibold text-white hover:bg-orange-700 md:block dark:bg-orange-600 dark:hover:bg-orange-700">
              Get started
            </Button>

            {/* Mobile Menu Trigger */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-lg"
                    className="rounded-full text-neutral-700 dark:text-neutral-300"
                  >
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="flex w-[300px] flex-col gap-6 p-6 dark:bg-neutral-950"
                >
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
                        className="size-6 fill-current"
                      >
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <span className="text-lg font-bold text-neutral-900 dark:text-white">
                      Watermelon
                    </span>
                  </div>

                  <div className="flex flex-col gap-4">
                    <a
                      href="#"
                      className="text-base font-medium text-neutral-900 dark:text-neutral-50"
                    >
                      Features
                    </a>
                    <div className="flex items-center justify-between">
                      <a
                        href="#"
                        className="text-base font-medium text-neutral-900 dark:text-neutral-50"
                      >
                        Developers
                      </a>
                      <Badge
                        variant="secondary"
                        className="bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400"
                      >
                        API
                      </Badge>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="solutions" className="border-none">
                        <AccordionTrigger className="justify-between py-0 text-base font-medium text-neutral-900 hover:no-underline dark:text-neutral-50">
                          Solutions
                        </AccordionTrigger>
                        <AccordionContent className="mt-1 ml-2 flex !h-auto flex-col gap-3 border-l border-neutral-200 pb-0 pl-4 text-base font-medium dark:border-neutral-800 [&_a]:no-underline">
                          <div className="flex flex-col gap-2 pt-4">
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
                      className="text-base font-medium text-neutral-900 dark:text-neutral-50"
                    >
                      Customers
                    </a>
                    <a
                      href="#"
                      className="text-base font-medium text-neutral-900 dark:text-neutral-50"
                    >
                      Enterprise
                    </a>
                  </div>

                  <div className="mt-auto flex flex-col gap-3">
                    <Button className="w-full rounded-full bg-orange-600 text-white hover:bg-orange-700">
                      Get started
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}