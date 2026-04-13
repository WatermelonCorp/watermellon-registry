import { useId } from 'react';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Select23 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-zinc-600 dark:text-zinc-400">
        Workspace Strategy
      </Label>
      <Select defaultValue="remote">
        <SelectTrigger 
          id={id} 
          className="w-full rounded-xl border-zinc-200 bg-white shadow-xs transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
        >
          <SelectValue placeholder="Identify model" />
        </SelectTrigger>
        <SelectContent 
          position="popper" 
          sideOffset={4} 
          className="rounded-xl border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
        >
          <SelectGroup>
            <SelectLabel className="text-zinc-500">Flexible Layouts</SelectLabel>
            <SelectItem value="remote" className="rounded-lg">Fully Distributed</SelectItem>
            <SelectItem value="hybrid" className="rounded-lg">Hybrid Dynamic</SelectItem>
          </SelectGroup>
          <SelectSeparator className="bg-zinc-100 dark:bg-zinc-800" />
          <SelectGroup>
            <SelectLabel className="text-zinc-500">Centralized Models</SelectLabel>
            <SelectItem value="office" className="rounded-lg">HQ Centric</SelectItem>
            <SelectItem value="pods" className="rounded-lg">Regional Pods</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Select23;

