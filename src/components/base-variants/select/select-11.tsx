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

const Select11 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2 text-zinc-900 dark:text-zinc-100">
      <Label htmlFor={id} className="text-zinc-600 dark:text-zinc-400">
        Primary Specialization
      </Label>
      <Select>
        <SelectTrigger 
          id={id} 
          className="w-full rounded-xl border-zinc-200 bg-white shadow-xs transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
        >
          <SelectValue placeholder="Identify your core skill" />
        </SelectTrigger>
        <SelectContent 
          position="popper" 
          sideOffset={4} 
          className="rounded-xl border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
        >
          <SelectGroup>
            <SelectLabel className="text-zinc-500">Engineering Roles</SelectLabel>
            <SelectItem value="frontend" className="rounded-lg">Frontend Development</SelectItem>
            <SelectItem value="backend" className="rounded-lg">Backend Systems</SelectItem>
            <SelectItem value="fullstack" className="rounded-lg">Full-Stack Engineering</SelectItem>
            <SelectItem value="devops" className="rounded-lg">SRE & DevOps</SelectItem>
            <SelectItem value="security" className="rounded-lg">Cyber Security</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Select11;

