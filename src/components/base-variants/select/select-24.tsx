import { useId } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Select24 = () => {
  const id = useId();

  return (
    <div className="group relative w-full max-w-xs transition-all">
      <label
        htmlFor={id}
        className="absolute -top-2 left-3 z-10 bg-white px-1.5 text-[11px] font-semibold text-zinc-500 transition-colors group-focus-within:text-zinc-900 dark:bg-zinc-950 dark:text-zinc-500 dark:group-focus-within:text-zinc-100"
      >
        System Identity
      </label>
      <Select defaultValue="default">
        <SelectTrigger 
          id={id} 
          className="w-full rounded-xl border-zinc-200 bg-white shadow-xs transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
        >
          <SelectValue placeholder="Identify namespace" />
        </SelectTrigger>
        <SelectContent 
          position="popper" 
          sideOffset={4} 
          className="rounded-xl border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
        >
          <SelectItem value="default" className="rounded-lg">Default Instance</SelectItem>
          <SelectItem value="staging" className="rounded-lg">Staging Cluster</SelectItem>
          <SelectItem value="prod" className="rounded-lg">Production Main</SelectItem>
          <SelectItem value="sandbox" className="rounded-lg">Sandbox Environment</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Select24;

