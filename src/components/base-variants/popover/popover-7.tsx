import { FileWarningIcon, AlertTriangleIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const Popover7 = () => {
  return (
    <Popover>
      <PopoverTrigger asChild backdrop-blur-sm>
        <Button
          variant="outline"
          size="icon"
          className="group rounded-xl border-red-200 transition-all hover:bg-red-50 active:scale-95 dark:border-red-500/20 dark:bg-transparent dark:hover:bg-red-500/20"
        >
          <FileWarningIcon className="size-4 text-red-500 transition-transform group-hover:scale-110" />
          <span className="sr-only">Delete File</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="shadow-3xl w-72 rounded-3xl border-neutral-100 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="relative flex size-12 items-center justify-center rounded-xl border border-red-100 bg-red-50 dark:border-red-500/20 dark:bg-red-500/10">
            <AlertTriangleIcon className="size-5 text-red-600 dark:text-red-500" />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Reset Session?
            </div>
            <p className="mx-auto max-w-[200px] text-xs leading-relaxed font-medium text-neutral-500 dark:text-neutral-400">
              This will clear all active session cookies and tracking data. This
              action is irreversible.
            </p>
          </div>

          <div className="grid w-full grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-10 rounded-xl border-neutral-200 text-xs font-bold text-neutral-600 dark:border-neutral-800 dark:text-neutral-400"
            >
              Go Back
            </Button>
            <Button
              variant="secondary"
              className="h-10 rounded-xl border-none bg-red-600 text-xs font-bold text-white shadow-lg shadow-red-500/20 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
            >
              Reset
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Popover7;
