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
  ArrowUpRight,
  Menu,
} from 'lucide-react';

export function Navigation1() {
  return (
    <div className="relative w-full border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
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
                // Outer absolute wrapper positioning
                '[&>.absolute]:inset-x-0 [&>.absolute]:top-full [&>.absolute]:w-full',
                // Viewport sizing and geometry
                '[&_[data-slot=navigation-menu-viewport]]:mt-1 [&_[data-slot=navigation-menu-viewport]]:!w-full',
                '[&_[data-slot=navigation-menu-viewport]]:rounded-none [&_[data-slot=navigation-menu-viewport]]:shadow-none [&_[data-slot=navigation-menu-viewport]]:ring-0',
                // Viewport borders and backgrounds
                '[&_[data-slot=navigation-menu-viewport]]:border-0 [&_[data-slot=navigation-menu-viewport]]:border-b',
                '[&_[data-slot=navigation-menu-viewport]]:border-neutral-200 dark:[&_[data-slot=navigation-menu-viewport]]:border-neutral-800',
                '[&_[data-slot=navigation-menu-viewport]]:bg-white dark:[&_[data-slot=navigation-menu-viewport]]:bg-neutral-950',
                // Viewport smooth animations
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
                      {/* Column 1 */}
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
                      <div className="flex flex-col gap-3">
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
                      <div className="flex flex-col gap-3">
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
                      <div className="flex flex-col">
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
                    className="rounded-xl bg-transparent px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-50"
                    href="#"
                  >
                    Customers
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="rounded-xl bg-transparent px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-50"
                    href="#"
                  >
                    Enterprise
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            variant="ghost"
            className="rounded-xl text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-50"
          >
            Sign in
          </Button>
          <Button className="rounded-xl bg-orange-600 px-4 py-2 text-white hover:bg-orange-700 dark:bg-orange-600 dark:text-white dark:hover:bg-orange-700">
            Get started
          </Button>
        </div>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="h-10 w-10 px-0 text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-[300px] flex-col gap-6 border-l border-neutral-200 bg-white p-6 text-neutral-900 sm:w-[400px] dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50"
            >
              <div className="mb-4 flex items-center gap-2">
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
                <span className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
                  Watermelon
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <a
                  href="#"
                  className="block py-2 text-base font-medium text-neutral-900 transition-colors hover:text-orange-600 dark:text-neutral-50 dark:hover:text-orange-400"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="flex items-center justify-between py-2 text-base font-medium text-neutral-900 transition-colors hover:text-orange-600 dark:text-neutral-50 dark:hover:text-orange-400"
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
                  className="block py-2 text-base font-medium tracking-tight text-neutral-900 transition-colors hover:text-orange-600 dark:text-neutral-50 dark:hover:text-orange-400"
                >
                  Customers
                </a>
                <a
                  href="#"
                  className="block py-2 text-base font-medium tracking-tight text-neutral-900 transition-colors hover:text-orange-600 dark:text-neutral-50 dark:hover:text-orange-400"
                >
                  Enterprise
                </a>
              </div>

              <div className="mt-auto flex flex-col gap-3 border-t border-neutral-200 pt-6 dark:border-neutral-800">
                <Button
                  variant="outline"
                  className="w-full justify-center rounded-xl border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:hover:bg-neutral-800/50"
                >
                  Sign in
                </Button>
                <Button className="w-full justify-center rounded-xl bg-orange-600 text-white hover:bg-orange-700 dark:bg-orange-600 dark:text-white dark:hover:bg-orange-700">
                  Get started
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}