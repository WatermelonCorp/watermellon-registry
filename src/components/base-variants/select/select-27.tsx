import { useId } from 'react';
import {
  IconCamera,
  IconCode,
  IconDatabase,
  IconGlobe,
} from '@tabler/icons-react';

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

const Select27 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-zinc-600 dark:text-zinc-400">
        Portfolio Category
      </Label>
      <Select defaultValue="dev">
        <SelectTrigger 
          id={id} 
          className="w-full rounded-xl border-zinc-200 bg-white shadow-xs transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
        >
          <SelectValue placeholder="Identify field" />
        </SelectTrigger>
        <SelectContent 
          position="popper" 
          sideOffset={4} 
          className="rounded-xl border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
        >
          <SelectGroup>
            <SelectLabel className="text-zinc-500 text-xs">Primary Disciplines</SelectLabel>
            <SelectItem value="dev" className="rounded-lg">
              <span className="flex items-center gap-2">
                <IconCode className="size-4 text-zinc-500" stroke={1.5} />
                Engineering
              </span>
            </SelectItem>
            <SelectItem value="creative" className="rounded-lg">
              <span className="flex items-center gap-2">
                <IconCamera className="size-4 text-zinc-500" stroke={1.5} />
                Creative Arts
              </span>
            </SelectItem>
            <SelectItem value="data" className="rounded-lg">
              <span className="flex items-center gap-2">
                <IconDatabase className="size-4 text-zinc-500" stroke={1.5} />
                Analytics
              </span>
            </SelectItem>
            <SelectItem value="global" className="rounded-lg">
              <span className="flex items-center gap-2">
                <IconGlobe className="size-4 text-zinc-500" stroke={1.5} />
                Network Ops
              </span>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Select27;

