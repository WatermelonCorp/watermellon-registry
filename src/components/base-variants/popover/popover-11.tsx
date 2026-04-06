'use client';

import { useState } from 'react';

import {
  BellIcon,
  CheckCheckIcon,
  Settings2Icon,
  ClockIcon,
  RocketIcon,
  ShieldAlertIcon,
  CloudCheckIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const notifications = [
  {
    id: 1,
    icon: RocketIcon,
    message: 'Production deployment #842 successful',
    category: 'System',
    color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500',
    time: '12 min',
  },
  {
    id: 2,
    icon: ShieldAlertIcon,
    message: 'Unauthorized access attempt blocked',
    category: 'Security',
    color: 'bg-red-500/10 text-red-600 dark:text-red-500',
    time: '45 min',
  },
  {
    id: 3,
    icon: CloudCheckIcon,
    message: 'Architecture backup completed successfully',
    category: 'Backup',
    color: 'bg-blue-500/10 text-blue-600 dark:text-blue-500',
    time: '2 hours',
  },
];

const Popover11 = () => {
  const [readMessages, setReadMessages] = useState([3]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="group rounded-xl border-neutral-200 transition-all hover:bg-neutral-50 active:scale-95 dark:border-neutral-800 dark:hover:bg-neutral-900"
        >
          <BellIcon className="size-4 text-neutral-500 transition-transform group-hover:scale-110" />
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 overflow-hidden rounded-3xl border border-neutral-100 bg-white p-0 shadow-none transition-all dark:border-neutral-800 dark:bg-neutral-950">
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-4 border-b border-neutral-50 bg-neutral-50/50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-950">
            <div className="flex items-center gap-2.5">
              <span className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                Alerts
              </span>
              <div className="rounded-full border border-orange-500/20 bg-orange-500/10 px-1.5 py-0.5 text-[9px] leading-none font-bold text-orange-600 dark:bg-orange-500/20 dark:text-orange-500">
                {
                  notifications.filter((i) => !readMessages.includes(i.id))
                    .length
                }{' '}
                new
              </div>
            </div>
            <div className="flex items-center gap-0.5">
              <Button
                variant="ghost"
                className="size-7 rounded-lg p-0 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-emerald-500 dark:hover:bg-neutral-800"
                onClick={() =>
                  setReadMessages(notifications.map((item) => item.id))
                }
                title="Mark all as read"
              >
                <CheckCheckIcon className="size-3.5" />
              </Button>
              <Button
                variant="ghost"
                className="size-7 rounded-lg p-0 text-neutral-400 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                title="Settings"
              >
                <Settings2Icon className="size-3.5" />
              </Button>
            </div>
          </div>

          <ul className="flex flex-col gap-1.5 p-2">
            {notifications.map((item) => (
              <li
                key={item.id}
                className={cn(
                  'group relative flex cursor-pointer items-start gap-3 rounded-2xl border px-3 py-2.5 transition-all',
                  !readMessages.includes(item.id)
                    ? 'border-neutral-100 bg-neutral-50/50 dark:border-neutral-800 dark:bg-white/5'
                    : 'border-transparent bg-transparent hover:border-neutral-100 hover:bg-neutral-50 dark:hover:border-neutral-800 dark:hover:bg-white/5',
                )}
                onClick={() => setReadMessages([...readMessages, item.id])}
              >
                <div
                  className={cn(
                    'flex size-8 shrink-0 items-center justify-center rounded-xl border border-transparent transition-all group-hover:scale-105',
                    item.color,
                  )}
                >
                  <item.icon className="size-4" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-0">
                  <div className="line-clamp-2 text-[12px] leading-tight font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                    {item.message}
                  </div>
                  <div className="mt-0.5 flex items-center justify-between gap-2">
                    <p className="text-[9px] font-medium text-neutral-500">
                      {item.category}
                    </p>
                    <div className="flex items-center gap-1.5 opacity-60">
                      <ClockIcon className="size-2.5 text-neutral-400" />
                      <p className="text-[9px] font-normal tracking-tight whitespace-nowrap text-neutral-500">
                        {item.time} ago
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t border-neutral-100 p-3 dark:border-neutral-800">
            <Button
              variant="outline"
              className="w-full rounded-xl border-neutral-200 bg-white text-[11px] font-semibold text-neutral-500 shadow-none transition-all hover:text-orange-500 active:scale-95 dark:border-neutral-800 dark:bg-neutral-950"
            >
              View all alerts
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Popover11;
