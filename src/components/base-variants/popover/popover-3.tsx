import { DollarSignIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const Popover3 = () => {
  return (
    <Popover>
      <PopoverTrigger asChild backdrop-blur-sm>
        <Button
          variant="outline"
          size="icon"
          className="rounded-xl transition-all hover:bg-neutral-100 active:scale-95 dark:hover:bg-neutral-800"
        >
          <DollarSignIcon className="size-4" />
          <span className="sr-only">Pricing details</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 rounded-2xl border-neutral-200 bg-white p-4 shadow-2xl dark:border-neutral-800 dark:bg-neutral-950">
        <div className="grid gap-5">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              Professional Plan
            </span>
            <div className="flex flex-col items-end">
              <span className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
                $29.00
              </span>
              <span className="text-[10px] font-medium text-neutral-400">
                per month
              </span>
            </div>
          </div>
          <p className="text-[13px] leading-relaxed font-medium text-neutral-500 dark:text-neutral-400">
            Specialized tools for creators and small teams. Includes advanced
            analytics, custom domain support, and priority status.
          </p>
          <div className="flex items-center gap-3 rounded-xl border border-neutral-100 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-neutral-900/50">
            <Badge
              variant="secondary"
              className="rounded-md bg-neutral-900 px-2 py-0.5 text-[10px] font-bold tracking-tight text-white dark:bg-neutral-50 dark:text-neutral-900"
            >
              Early Access
            </Badge>
            <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
              Save 15% on yearly billing
            </span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Popover3;
