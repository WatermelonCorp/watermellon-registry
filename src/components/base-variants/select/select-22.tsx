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

const Select22 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-zinc-600 dark:text-zinc-400">
        Infrastructure Core
      </Label>
      <Select defaultValue="edge">
        <SelectTrigger 
          id={id} 
          className="w-full rounded-xl border-zinc-200 bg-white shadow-xs transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
        >
          <SelectValue placeholder="Identify resource" />
        </SelectTrigger>
        <SelectContent 
          position="popper" 
          sideOffset={4} 
          className="rounded-xl border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
        >
          <SelectGroup>
            <SelectLabel className="text-zinc-500">Compute Layer</SelectLabel>
            <SelectItem value="lambda" className="rounded-lg">Serverless Lambda</SelectItem>
            <SelectItem value="ec2" className="rounded-lg">Virtual Instance</SelectItem>
            <SelectItem value="containers" className="rounded-lg">Managed Cluster</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel className="text-zinc-500">Delivery Layer</SelectLabel>
            <SelectItem value="cdn" className="rounded-lg">Content Delivery</SelectItem>
            <SelectItem value="edge" className="rounded-lg">Edge Computing</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Select22;

