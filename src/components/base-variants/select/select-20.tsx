import { useId } from 'react';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Select20 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-zinc-600 dark:text-zinc-400">
        Infrastructure Region
      </Label>
      <Select defaultValue="use1">
        <SelectTrigger 
          id={id} 
          className="w-full rounded-xl border-zinc-200 bg-white shadow-xs transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
        >
          <SelectValue placeholder="System instance" />
        </SelectTrigger>
        <SelectContent position="popper" sideOffset={4} className="rounded-xl border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
          <SelectItem value="use1" className="rounded-lg">US-East (N. Virginia)</SelectItem>
          <SelectItem value="euw1" className="rounded-lg" disabled>
            EU-West (Ireland) — [Full]
          </SelectItem>
          <SelectItem value="apse1" className="rounded-lg">AP-Southeast (Singapore)</SelectItem>
          <SelectItem value="sae1" className="rounded-lg" disabled>
            SA-East (São Paulo) — [Offline]
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Select20;

