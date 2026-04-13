import { useId } from 'react';
import { IconDeviceDesktop } from '@tabler/icons-react';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Select12 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-zinc-600 dark:text-zinc-400">
        Deployment Target
      </Label>
      <Select defaultValue="web">
        <SelectTrigger 
          id={id} 
          className="w-full rounded-xl border-zinc-200 bg-white px-3 shadow-xs transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
        >
          <span className="flex items-center gap-2">
            <IconDeviceDesktop className="size-4 text-zinc-500" stroke={1.5} />
            <SelectValue placeholder="Identify platform" />
          </span>
        </SelectTrigger>
        <SelectContent 
          position="popper" 
          sideOffset={4} 
          className="rounded-xl border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
        >
          <SelectItem value="web" className="rounded-lg">Web Application</SelectItem>
          <SelectItem value="mobile" className="rounded-lg">Native Mobile</SelectItem>
          <SelectItem value="desktop" className="rounded-lg">System Desktop</SelectItem>
          <SelectItem value="cloud" className="rounded-lg">Cloud Infrastructure</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Select12;

