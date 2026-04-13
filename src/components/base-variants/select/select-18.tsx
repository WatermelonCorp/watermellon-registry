import { useId } from 'react';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Select18 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-zinc-600 dark:text-zinc-400 font-medium">
        UI Scaling Factor
      </Label>
      <Select defaultValue="100">
        <SelectTrigger 
          id={id} 
          className="w-full rounded-xl border-none bg-transparent shadow-none hover:bg-zinc-100/80 focus-visible:ring-zinc-400/20 dark:bg-transparent dark:hover:bg-zinc-800/80 dark:focus-visible:ring-zinc-500/20 px-3"
        >
          <SelectValue placeholder="Display scale" />
        </SelectTrigger>
        <SelectContent 
          position="popper" 
          sideOffset={4} 
          className="rounded-xl border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
        >
          <SelectItem value="80" className="rounded-lg">Compact View (80%)</SelectItem>
          <SelectItem value="100" className="rounded-lg">Standard Scale (100%)</SelectItem>
          <SelectItem value="125" className="rounded-lg">Cozy Desktop (125%)</SelectItem>
          <SelectItem value="150" className="rounded-lg">Accessible (150%)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Select18;

