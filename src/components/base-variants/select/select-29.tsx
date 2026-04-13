import { useId } from 'react';
import { IconCircle } from '@tabler/icons-react';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Select29 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-zinc-600 dark:text-zinc-400">
        Lifecycle Stage
      </Label>
      <Select defaultValue="active">
        <SelectTrigger 
          id={id} 
          className="w-full rounded-xl border-zinc-200 bg-white shadow-xs transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
        >
          <span className="flex items-center gap-2">
            <SelectValue placeholder="Identify phase" />
          </span>
        </SelectTrigger>
        <SelectContent 
          position="popper" 
          sideOffset={4} 
          className="rounded-xl border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
        >
          <SelectItem value="draft" className="rounded-lg">
            <span className="flex items-center gap-2">
              <IconCircle className="size-2 fill-zinc-400 text-zinc-400 stroke-zinc-400" />
              Unpublished Draft
            </span>
          </SelectItem>
          <SelectItem value="active" className="rounded-lg">
            <span className="flex items-center gap-2">
              <IconCircle className="size-2 fill-emerald-500 text-emerald-500 stroke-emerald-500" />
              Live Deployment
            </span>
          </SelectItem>
          <SelectItem value="archived" className="rounded-lg">
            <span className="flex items-center gap-2">
              <IconCircle className="size-2 fill-amber-500 text-amber-500 stroke-amber-500" />
              Archived Record
            </span>
          </SelectItem>
          <SelectItem value="deprecated" className="rounded-lg">
            <span className="flex items-center gap-2">
              <IconCircle className="size-2 fill-rose-500 text-rose-500 stroke-rose-500" />
              Legacy System
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Select29;

