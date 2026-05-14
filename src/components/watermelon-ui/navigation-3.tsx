import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';
import {
  Cpu,
  Layers,
  GitBranch,
  Terminal,
  ArrowUpRight,
  Menu,
  Moon,
  Github,
  X,
} from 'lucide-react';

export function Navigation3() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 text-neutral-900 dark:text-neutral-50">
        <div className="flex items-center gap-4">
          <Popover open={isOpen} onOpenChange={setIsOpen} modal={true}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-xl text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
              >
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="max-h-[85dvh] w-screen max-w-none overflow-y-auto overscroll-contain rounded-none !border-x-0 !border-t-0 border-b border-neutral-200 bg-white p-0 shadow-none !ring-0 dark:border-neutral-800 dark:bg-neutral-950"
              align="start"
              sideOffset={15}
            >
              <div className="mx-auto max-w-7xl">
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-0 px-6 py-8 md:grid-cols-2 lg:grid-cols-4 lg:py-10">
                  {/* Column 1 */}
                  <div className="flex flex-col pb-6 md:px-6 md:pb-0 lg:border-neutral-200 lg:pr-8 dark:border-neutral-800">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-900">
                      <Cpu className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
                    </div>
                    <h4
                      className="mb-1 text-sm font-medium text-neutral-900 dark:text-neutral-50"
                      id="compute-engine-title"
                    >
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
                  <div className="flex flex-col gap-2 border-t border-neutral-200 py-6 md:border-t-0 md:border-l md:px-6 md:pt-0 lg:border-r lg:px-8 dark:border-neutral-800">
                    <h4 className="mb-1 text-xs text-neutral-400 uppercase dark:text-neutral-500">
                      Use Cases
                    </h4>
                    <div className="flex flex-col gap-3">
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
                  </div>

                  {/* Column 3 */}
                  <div className="flex flex-col gap-2 border-t border-neutral-200 py-6 md:px-6 md:pt-0 lg:border-t-0 lg:border-r lg:px-8 lg:pt-0 dark:border-neutral-800">
                    <h4 className="mb-1 text-xs text-neutral-400 uppercase dark:text-neutral-500">
                      Resources
                    </h4>
                    <div className="flex flex-col gap-3">
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
                  </div>

                  {/* Column 4 */}
                  <div className="flex flex-col border-t border-neutral-200 pt-6 lg:border-t-0 lg:pt-0 lg:pl-8 dark:border-neutral-800">
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
                          <ArrowUpRight className="ml-1 size-3" />
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
                        Register now
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
              </div>
            </PopoverContent>
          </Popover>

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
            <span className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
              Watermelon
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 lg:flex">
            <div className="mr-1 flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="icon-lg"
                className="rounded-xl text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800/50"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub Repository</span>
              </Button>
              <Button
                variant="ghost"
                size="icon-lg"
                className="rounded-xl text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800/50"
              >
                <Moon className="h-5 w-5" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
            <Button className="rounded-xl bg-orange-600 px-4 py-2 text-white hover:bg-orange-700 dark:bg-orange-600 dark:text-white dark:hover:bg-orange-700">
              Get started
            </Button>
          </div>

          <div className="flex items-center gap-0.5 lg:hidden">
            <Button
              variant="ghost"
              size="icon-lg"
              className="shrink-0 rounded-lg text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub Repository</span>
            </Button>
            <Button
              variant="ghost"
              size="icon-lg"
              className="shrink-0 rounded-lg text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
            >
              <Moon className="h-5 w-5" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}