import { useId } from 'react';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Select28 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-zinc-600 dark:text-zinc-400">
        Primary Framework
      </Label>
      <Select defaultValue="react">
        <SelectTrigger 
          id={id} 
          className="w-full rounded-xl border-zinc-200 bg-white shadow-xs transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
        >
          <span className="flex items-center gap-1.5 text-zinc-500 font-medium">
            Project Stack: <SelectValue placeholder="Identify core tech" />
          </span>
        </SelectTrigger>
        <SelectContent 
          position="popper" 
          sideOffset={4} 
          className="rounded-xl border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
        >
          <SelectItem value="react" className="rounded-lg">React.js Engine</SelectItem>
          <SelectItem value="vue" className="rounded-lg">Vue.js Ecosystem</SelectItem>
          <SelectItem value="next" className="rounded-lg">Next.js Framework</SelectItem>
          <SelectItem value="astro" className="rounded-lg">Astro Static Gen</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Select28;

