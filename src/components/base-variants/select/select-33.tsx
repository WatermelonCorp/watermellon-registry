import { useState } from 'react';
import { IconCheck, IconChevronDown } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const channels = [
  { id: 'email', label: 'Primary Email' },
  { id: 'sms', label: 'SMS Gateway' },
  { id: 'push', label: 'Mobile Push' },
  { id: 'slack', label: 'Slack Webhook' },
  { id: 'discord', label: 'Discord Bot' },
];

const Select33 = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleChannel = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const getLabel = () => {
    if (selected.length === 0) return 'Select notification paths';
    if (selected.length === 1) return channels.find(c => c.id === selected[0])?.label;
    return `${selected.length} channels selected`;
  };

  return (
    <div className="w-full max-w-xs space-y-2 text-zinc-900 dark:text-zinc-100">
      <Label className="text-zinc-600 dark:text-zinc-400">Communication Channels</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between rounded-xl border-zinc-200 bg-white px-3 font-normal shadow-xs transition-all hover:bg-zinc-50 focus:ring-2 focus:ring-zinc-400/20 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900 dark:focus:ring-zinc-500/20 outline-none"
          >
            <span className={cn("truncate", selected.length === 0 && "text-zinc-500")}>
              {getLabel()}
            </span>
            <IconChevronDown className="size-4 shrink-0 opacity-50" stroke={1.5} />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          align="start"
          className="w-(--radix-popover-trigger-width) p-1 rounded-xl border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
        >
          <div className="flex flex-col gap-0.5">
            {channels.map((ch) => {
              const isSelected = selected.includes(ch.id);
              return (
                <button
                  key={ch.id}
                  onClick={() => toggleChannel(ch.id)}
                  className={cn(
                    "flex items-center justify-between w-full px-2.5 py-2 rounded-lg text-sm transition-colors outline-none",
                    "hover:bg-zinc-100 dark:hover:bg-zinc-900",
                    isSelected ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-600 dark:text-zinc-400"
                  )}
                >
                  <span className="font-medium">{ch.label}</span>
                  {isSelected && (
                    <IconCheck className="size-4 text-zinc-900 dark:text-zinc-100" stroke={2} />
                  )}
                </button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
      <p className="text-[12px] text-zinc-500 px-1 dark:text-zinc-500">
        System alerts will be delivered via all selected channels.
      </p>
    </div>
  );
};

export default Select33;

