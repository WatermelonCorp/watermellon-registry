import { useId } from 'react';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Select17 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-zinc-600 dark:text-zinc-400">
        Operation Type
      </Label>
      <Select defaultValue="internal">
        <SelectTrigger 
          id={id} 
          className="w-full rounded-xl border-zinc-300/50 bg-zinc-100/50 shadow-none transition-all hover:bg-zinc-100 focus-visible:ring-zinc-400/20 dark:border-zinc-700/50 dark:bg-zinc-900/50 dark:hover:bg-zinc-900 dark:focus-visible:ring-zinc-500/20 px-3"
        >
          <SelectValue placeholder="System category" />
        </SelectTrigger>
        <SelectContent 
          position="popper" 
          sideOffset={4} 
          className="rounded-xl border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
        >
          <SelectGroup>
            <SelectLabel className="text-zinc-500">Resource Categories</SelectLabel>
            <SelectItem value="internal" className="rounded-lg">Internal Operations</SelectItem>
            <SelectItem value="client" className="rounded-lg">Client Interaction</SelectItem>
            <SelectItem value="rd" className="rounded-lg">Research & Develop</SelectItem>
            <SelectItem value="maint" className="rounded-lg">System Maintenance</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Select17;

