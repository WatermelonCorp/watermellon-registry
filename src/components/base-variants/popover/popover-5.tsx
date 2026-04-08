import { InfoIcon, ExternalLinkIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const Popover5 = () => {
  return (
    <Popover>
      <PopoverTrigger asChild backdrop-blur-sm>
        <Button
          variant="outline"
          size="icon"
          className="rounded-xl transition-all hover:bg-neutral-100 active:scale-95 dark:hover:bg-neutral-800"
        >
          <InfoIcon className="size-4" />
          <span className="sr-only">About Shadcn Studio</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="shadow-3xl w-80 rounded-2xl border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
        <div className="flex flex-col gap-7 text-center">
          <div className="flex flex-col gap-2">
            <div className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Platform Alpha
            </div>
            <p className="mx-auto max-w-[240px] text-xs leading-relaxed font-medium text-neutral-500 dark:text-neutral-400">
              The next generation of high-performance UI components built for
              your creative professional workflow.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <Button
              size="sm"
              className="h-10 gap-2 rounded-xl border-none bg-orange-600 font-bold shadow-xl hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700"
              asChild
            >
              <a href="#" target="_blank" rel="noopener noreferrer">
                Get started
                <ExternalLinkIcon className="size-3.5" />
              </a>
            </Button>
            <div className="text-[11px] font-medium tracking-tight text-neutral-400 dark:text-neutral-600">
              Released as build 2.0.4-stable
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Popover5;
