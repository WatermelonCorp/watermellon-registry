import { ChevronRightIcon, GlobeIcon, Loader2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

const Popover12 = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="group rounded-xl border-neutral-200 transition-all hover:bg-neutral-50 active:scale-95 dark:border-neutral-800 dark:hover:bg-neutral-900"
        >
          <GlobeIcon className="size-4 text-orange-500 transition-transform group-hover:rotate-12" />
          <span className="sr-only">Data hub status</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[360px] overflow-hidden rounded-3xl border border-neutral-100 bg-white p-0 shadow-none transition-all dark:border-neutral-800 dark:bg-neutral-950">
        <div className="flex items-stretch">
          <div className="flex-1 space-y-3 p-5">
            <div className="flex items-center gap-2">
              <Badge className="rounded-md border-none bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-500">
                Operational
              </Badge>
              <span className="flex items-center gap-1 text-[9px] font-bold text-neutral-400">
                <Loader2Icon className="size-2.5 animate-spin" />
                Live sync
              </span>
            </div>
            <div className="space-y-0.5">
              <p className="text-base leading-tight font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                Northern Data Hub
              </p>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-medium text-neutral-500">
                  Reykjavík, Iceland • Tier 4 DC
                </span>
              </div>
            </div>
            <p className="text-[11px] leading-relaxed font-normal text-neutral-500 dark:text-neutral-400">
              Our flagship zero-emission facility utilizing geothermal energy
              for high-density neural network training.
            </p>
            <Button
              size="sm"
              variant="outline"
              className="group h-8 gap-2 rounded-full border-neutral-200 px-4 text-[10px] font-semibold transition-all hover:text-orange-500 dark:border-neutral-800"
            >
              View cluster status
              <ChevronRightIcon className="size-3 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
          <div className="relative w-1/3 min-w-[120px] bg-neutral-100 dark:bg-neutral-900">
            <img
              src="https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="modern data center server room"
              className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 hover:scale-105 dark:opacity-75"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white dark:to-neutral-950" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Popover12;
