import { useId } from 'react';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Select16 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-zinc-600 dark:text-zinc-400">
        System Criticality
      </Label>
      <Select defaultValue="p2">
        <SelectTrigger 
          id={id} 
          className="w-full rounded-xl border-zinc-200 bg-white shadow-xs transition-all hover:bg-zinc-50 focus-visible:border-zinc-400 focus-visible:ring-zinc-400/20 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900 dark:focus-visible:border-zinc-600 dark:focus-visible:ring-zinc-500/20"
        >
          <SelectValue placeholder="Set level" />
        </SelectTrigger>
        <SelectContent 
          position="popper" 
          sideOffset={4} 
          className="rounded-xl border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
        >
          <SelectItem value="p1" className="rounded-lg">P1 - Highest Attention</SelectItem>
          <SelectItem value="p2" className="rounded-lg">P2 - Priority Ops</SelectItem>
          <SelectItem value="p3" className="rounded-lg">P3 - Regular Flow</SelectItem>
          <SelectItem value="p4" className="rounded-lg">P4 - Informational</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Select16;

