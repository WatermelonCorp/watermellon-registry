import { useId } from 'react';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Select14 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-zinc-600 dark:text-zinc-400">
        Active Environment
      </Label>
      <Select defaultValue="prod">
        <SelectTrigger 
          id={id} 
          aria-invalid="true"
          className="w-full rounded-xl border-zinc-200 bg-white shadow-xs transition-all hover:bg-zinc-50 aria-invalid:border-amber-500 aria-invalid:ring-amber-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900 dark:aria-invalid:border-amber-900 dark:aria-invalid:ring-amber-900/40"
        >
          <SelectValue placeholder="Identify environment" />
        </SelectTrigger>
        <SelectContent 
          position="popper" 
          sideOffset={4} 
          className="rounded-xl border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
        >
          <SelectItem value="dev" className="rounded-lg">Development Sandbox</SelectItem>
          <SelectItem value="staging" className="rounded-lg">Staging Cluster</SelectItem>
          <SelectItem value="qa" className="rounded-lg">QA Validation</SelectItem>
          <SelectItem value="prod" className="rounded-lg">Production Main</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-[12px] text-amber-600 dark:text-amber-500" role="alert" aria-live="polite">
        Production environment is currently locked for maintenance tasks.
      </p>
    </div>
  );
};

export default Select14;

