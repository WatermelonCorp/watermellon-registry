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

const Select26 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-zinc-600 dark:text-zinc-400">
        API Permissions
      </Label>
      <Select defaultValue="read-only">
        <SelectTrigger 
          id={id} 
          className="w-full rounded-xl border-zinc-200 bg-white shadow-xs transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
        >
          <SelectValue placeholder="Identify scope" />
        </SelectTrigger>
        <SelectContent 
          position="popper" 
          sideOffset={4} 
          className="rounded-xl border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
        >
          <SelectGroup>
            <SelectLabel className="text-zinc-500">Read Operations</SelectLabel>
            <SelectItem value="read-only" className="rounded-lg">Metadata & Stats</SelectItem>
            <SelectItem value="search" className="rounded-lg">Search Indices</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel className="text-zinc-500">Write Access</SelectLabel>
            <SelectItem value="editor" className="rounded-lg">Content Management</SelectItem>
            <SelectItem value="admin" className="rounded-lg">System Configuration</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Select26;

