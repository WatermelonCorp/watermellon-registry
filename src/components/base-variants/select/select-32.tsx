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

const ops = [
  { id: 'monitoring', label: 'Real-time Monitoring' },
  { id: 'logging', label: 'Log Aggregation' },
  { id: 'analytics', label: 'Security Analytics' },
  { id: 'backups', label: 'Automated Backups' },
];

const Select32 = () => {
  const [selected, setSelected] = useState<string[]>(['monitoring']);

  const toggleOp = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const getLabel = () => {
    if (selected.length === 0) return 'Select operations';
    if (selected.length === 1) return ops.find(o => o.id === selected[0])?.label;
    return `${selected.length} operations active`;
  };

  return (
    <div className="w-full max-w-xs space-y-2 text-zinc-900 dark:text-zinc-100">
      <Label className="text-zinc-600 dark:text-zinc-400">Active Pipeline Services</Label>
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
            {ops.map((op) => {
              const isSelected = selected.includes(op.id);
              return (
                <button
                  key={op.id}
                  onClick={() => toggleOp(op.id)}
                  className={cn(
                    "flex items-center justify-between w-full px-2.5 py-2 rounded-lg text-sm transition-colors outline-none",
                    "hover:bg-zinc-100 dark:hover:bg-zinc-900",
                    isSelected ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-600 dark:text-zinc-400"
                  )}
                >
                  <span className="font-medium">{op.label}</span>
                  {isSelected && (
                    <IconCheck className="size-4 text-zinc-900 dark:text-zinc-100" stroke={2} />
                  )}
                </button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Select32;

