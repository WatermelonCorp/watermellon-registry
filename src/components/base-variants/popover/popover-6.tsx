'use client';

import { useEffect, useState } from 'react';

import {
  DownloadIcon,
  PauseIcon,
  PlayIcon,
  XIcon,
  CheckCircle2Icon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';

import { cn } from '@/lib/utils';

const Popover6 = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);


  useEffect(() => {
    if (!hasStarted || isPaused || isCanceled) return;

    const timer = setInterval(() => {
      setValue((prev) => {
        if (prev < 100) {
          return Math.min(100, prev + Math.floor(Math.random() * 10) + 1);
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, [open, isPaused, isCanceled, hasStarted]);

  const getText = () => {
    if (isCanceled) return 'Sync Canceled';
    if (isPaused) return 'Sync Paused';
    if (value === 100) return 'Sync Complete';
    return 'Synchronizing Data';
  };

  return (
    <Popover
      onOpenChange={(val) => {
        setOpen(val);
        if (val && !isCanceled) setHasStarted(true);
      }}
      open={open}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-xl border-neutral-200 transition-all hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
        >
          <DownloadIcon className="size-4 text-neutral-500" />
          <span className="sr-only">Sync Data</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="shadow-3xl w-80 rounded-2xl border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="relative flex size-11 items-center justify-center rounded-xl border border-neutral-100 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
              <span
                className={cn(
                  'absolute inset-0 rounded-xl border-2 border-dashed',
                  value === 100
                    ? 'border-emerald-500 opacity-30'
                    : 'border-indigo-600 opacity-20 dark:border-indigo-400 dark:opacity-40',
                  {
                    'animate-spin [animation-duration:8s]':
                      value < 100 && !isPaused && !isCanceled,
                  },
                )}
              />
              {value === 100 ? (
                <CheckCircle2Icon className="size-5 text-emerald-500" />
              ) : (
                <DownloadIcon className="z-1 size-5 text-indigo-600 dark:text-indigo-400" />
              )}
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="block truncate text-sm font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                {getText()}
              </span>
              {value < 100 && !isCanceled && (
                <p className="truncate text-[10px] font-medium text-neutral-400">
                  backup_v4.bundle
                </p>
              )}
            </div>
            {!isCanceled && (
              <span
                className={cn(
                  'text-sm font-bold tabular-nums',
                  value === 100
                    ? 'text-emerald-500'
                    : 'text-neutral-900 dark:text-neutral-100',
                )}
              >
                {`${value}%`}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-5">
            <Progress
              value={value}
              className={cn(
                'h-1.5 bg-neutral-50 dark:bg-neutral-900',
                value === 100
                  ? '[&>[data-slot=progress-indicator]]:bg-emerald-500'
                  : '[&>[data-slot=progress-indicator]]:bg-indigo-600',
              )}
            />

            <div className="grid grid-cols-2 gap-2.5">
              <Button
                size="sm"
                variant="outline"
                className="h-9 gap-2 rounded-xl border-neutral-200 text-xs font-bold dark:border-neutral-800"
                onClick={() => setIsPaused(!isPaused)}
                disabled={value === 100 || isCanceled}
              >
                {isPaused ? (
                  <PlayIcon className="size-3 fill-current" />
                ) : (
                  <PauseIcon className="size-3 fill-current" />
                )}
                {isPaused ? 'Resume' : 'Pause'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-9 gap-2 rounded-xl border-neutral-200 text-xs font-bold dark:border-neutral-800"
                onClick={() => {
                  if (value < 100) {
                    setValue(0);
                    setIsCanceled(true);
                    setHasStarted(false);
                  }
                  setOpen(false);
                }}
              >
                <XIcon className="size-3.5" />
                {value === 100 ? 'Dismiss' : 'Cancel'}
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Popover6;
