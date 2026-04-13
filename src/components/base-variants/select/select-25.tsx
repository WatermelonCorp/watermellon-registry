import { useId } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Select25 = () => {
  const id = useId();

  return (
    <div className="flex w-full max-w-xs flex-col rounded-xl border border-zinc-200 bg-white p-3 pb-1 shadow-xs transition-all focus-within:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:focus-within:border-zinc-700">
      <label
        htmlFor={id}
        className="mb-1 text-[11px] font-bold tracking-tight text-zinc-500 uppercase dark:text-zinc-500"
      >
        Security Policy
      </label>
      <Select defaultValue="standard">
        <SelectTrigger 
          id={id} 
          className="h-auto w-full border-none bg-transparent p-0 shadow-none hover:bg-transparent focus-visible:ring-0 dark:bg-transparent dark:hover:bg-transparent"
        >
          <SelectValue placeholder="Identify policy" />
        </SelectTrigger>
        <SelectContent 
          position="popper" 
          sideOffset={12} 
          className="rounded-xl border-zinc-200 bg-white p-1 shadow-xl dark:border-zinc-800 dark:bg-zinc-950"
        >
          <SelectItem value="standard" className="rounded-lg">Standard Protocol</SelectItem>
          <SelectItem value="strict" className="rounded-lg">Strict Enforcement</SelectItem>
          <SelectItem value="relaxed" className="rounded-lg">Relaxed Governance</SelectItem>
          <SelectItem value="custom" className="rounded-lg">Custom Definition</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Select25;

