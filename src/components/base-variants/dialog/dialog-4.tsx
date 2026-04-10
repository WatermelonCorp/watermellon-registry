import { ChevronLeftIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

const Dialog4 = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="outline"
          className="rounded-xl border border-zinc-200 bg-zinc-50 px-6 py-2 font-medium text-zinc-800 shadow-sm transition-all hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
        >
          Scrollable Dialog
        </Button>
      </DialogTrigger>
      <DialogContent className="border-border/40 dark:border-border/60 flex max-h-[min(650px,90vh)] flex-col gap-0 overflow-hidden rounded-xl border bg-white p-0 shadow-xl sm:max-w-md dark:bg-neutral-900">
        <DialogHeader className="px-6 pt-6 pb-4 text-left">
          <DialogTitle className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            v2.0 Release Notes
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="px-6 pb-6">
            <DialogDescription className="text-neutral-600 dark:text-neutral-400">
              <div className="space-y-4 [&_strong]:font-semibold [&_strong]:text-neutral-900 dark:[&_strong]:text-neutral-100">
                <div className="space-y-1">
                  <p>
                    <strong>Overview:</strong>
                  </p>
                  <p>
                    We are excited to announce the release of Version 2.0! This
                    major update brings significant performance improvements, a
                    redesigned user interface, and highly requested features to
                    streamline your workflow.
                  </p>
                </div>
                <div className="space-y-1">
                  <p>
                    <strong>New Features:</strong>
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>Real-time collaboration with multi-user editing</li>
                    <li>Advanced data visualization with interactive charts</li>
                    <li>Global search with lightning-fast indexing</li>
                    <li>Dark mode support across the entire platform</li>
                    <li>Customizable dashboards with drag-and-drop tiles</li>
                  </ul>
                </div>
                <div className="space-y-1">
                  <p>
                    <strong>UI Improvements:</strong>
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>Streamlined navigation for faster access to tools</li>
                    <li>Enhanced accessibility with full keyboard support</li>
                    <li>Modernized component library with Glassmorphism</li>
                    <li>Improved mobile responsiveness for all pages</li>
                  </ul>
                </div>
                <div className="space-y-1">
                  <p>
                    <strong>Performance:</strong>
                  </p>
                  <p>
                    Load times have been reduced by up to 40% thanks to our new
                    caching engine and optimized asset delivery pipeline.
                  </p>
                </div>
                <div className="space-y-1">
                  <p>
                    <strong>Bug Fixes:</strong>
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>Fixed intermittent login failures on slow networks</li>
                    <li>Resolved memory leaks in the analytics engine</li>
                    <li>Corrected layout issues in the export PDF feature</li>
                    <li>Patched security vulnerabilities in API endpoints</li>
                  </ul>
                </div>
                <div className="space-y-1">
                  <p>
                    <strong>Known Issues:</strong>
                  </p>
                  <p>
                    The legacy export format (CSV) is currently disabled for
                    large datasets while we finish the migration to our new
                    streaming service.
                  </p>
                </div>
                <div className="space-y-1">
                  <p>
                    <strong>Support:</strong>
                  </p>
                  <p>
                    If you encounter any issues with this release, please reach
                    out to our 24/7 technical support team or visit the
                    community forums.
                  </p>
                </div>
              </div>
            </DialogDescription>
          </div>
        </ScrollArea>

        <DialogFooter className="border-border/30 dark:border-border/60 m-0 flex flex-col-reverse items-stretch gap-2 border-t bg-transparent p-4 sm:flex-row sm:items-center sm:justify-end sm:px-6 sm:pb-6">
          <DialogClose asChild>
            <Button
              variant="ghost"
              className="flex w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5 font-medium text-neutral-700 shadow-none transition hover:bg-neutral-100 sm:w-auto dark:text-neutral-200 dark:hover:bg-neutral-800"
            >
              <ChevronLeftIcon className="size-4" />
              Back
            </Button>
          </DialogClose>
          <Button
            type="button"
            className="w-full rounded-lg border-none bg-linear-to-r from-blue-600 to-blue-400 px-7 py-2.5 font-semibold text-white shadow-md transition hover:from-blue-700 hover:to-blue-500 sm:w-auto dark:from-blue-500 dark:to-blue-400 dark:text-white dark:hover:from-blue-600 dark:hover:to-blue-500"
          >
            Read More
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Dialog4;
