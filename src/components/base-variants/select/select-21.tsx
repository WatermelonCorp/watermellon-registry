import { useId } from 'react';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Select21 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
        Identity Verification <span className="text-red-500 font-bold" aria-hidden="true">*</span>
      </Label>
      <Select defaultValue="verified" required>
        <SelectTrigger 
          id={id} 
          className="w-full rounded-xl border-zinc-200 bg-white shadow-xs transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
        >
          <SelectValue placeholder="Identify your status" />
        </SelectTrigger>
        <SelectContent 
          position="popper" 
          sideOffset={4} 
          className="rounded-xl border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
        >
          <SelectItem value="unverified" className="rounded-lg">Unverified Guest</SelectItem>
          <SelectItem value="verified" className="rounded-lg">Identity Confirmed</SelectItem>
          <SelectItem value="privileged" className="rounded-lg">Privileged Access</SelectItem>
          <SelectItem value="restricted" className="rounded-lg">Restricted Entry</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Select21;

