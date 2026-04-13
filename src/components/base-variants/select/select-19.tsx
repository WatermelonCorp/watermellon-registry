import { useId } from 'react';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Select19 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2 opacity-60">
      <Label htmlFor={id} className="text-zinc-600 dark:text-zinc-400">
        Transfer Protocol (Locked)
      </Label>
      <Select defaultValue="v2" disabled>
        <SelectTrigger 
          id={id} 
          className="w-full rounded-xl border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 shadow-none cursor-not-allowed"
        >
          <SelectValue placeholder="System protocol" />
        </SelectTrigger>
        <SelectContent position="popper" sideOffset={4} className="rounded-xl border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
          <SelectItem value="v1.1" className="rounded-lg">HTTP/1.1 Standard</SelectItem>
          <SelectItem value="v2" className="rounded-lg">HTTP/2 Binary</SelectItem>
          <SelectItem value="v3" className="rounded-lg">HTTP/3 QUIC</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Select19;

