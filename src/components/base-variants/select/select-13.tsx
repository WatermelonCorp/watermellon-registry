import { useId } from 'react';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Select13 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-zinc-600 dark:text-zinc-400">
        Release Method
      </Label>
      <Select defaultValue="rolling">
        <SelectTrigger 
          id={id} 
          className="w-full rounded-xl border-zinc-200 bg-white shadow-xs transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
        >
          <SelectValue placeholder="Choose a strategy" />
        </SelectTrigger>
        <SelectContent 
          position="popper" 
          sideOffset={4} 
          className="rounded-xl border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
        >
          <SelectItem value="rolling" className="rounded-lg">Rolling Update</SelectItem>
          <SelectItem value="canary" className="rounded-lg">Canary Deployment</SelectItem>
          <SelectItem value="blue-green" className="rounded-lg">Blue-Green Switch</SelectItem>
          <SelectItem value="recreate" className="rounded-lg">Full Recreate</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-[12px] text-zinc-500 dark:text-zinc-500" role="region" aria-live="polite">
        Pods will be cycled according to this deployment pattern.
      </p>
    </div>
  );
};

export default Select13;

