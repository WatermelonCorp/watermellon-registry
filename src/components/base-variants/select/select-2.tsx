import { useId } from 'react';

import { Label } from '@/components/ui/label';
import { NativeSelect } from '@/components/ui/native-select';

const Select2 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-zinc-600 dark:text-zinc-400">
        Project Domain
      </Label>
      <NativeSelect 
        id={id} 
        defaultValue="" 
        className="w-full rounded-xl border-zinc-200 shadow-xs dark:border-zinc-800 dark:bg-zinc-950 transition-all focus:ring-2 focus:ring-zinc-400/20 dark:focus:ring-zinc-500/20 dark:[&_select]:[color-scheme:dark]"
      >
        <option value="" disabled className="dark:bg-zinc-950 dark:text-zinc-500">Identify target sector</option>
        <option value="fintech" className="dark:bg-zinc-950 dark:text-zinc-100">Financial Operations</option>
        <option value="ecom" className="dark:bg-zinc-950 dark:text-zinc-100">E-commerce Solutions</option>
        <option value="health" className="dark:bg-zinc-950 dark:text-zinc-100">Healthcare Systems</option>
        <option value="saas" className="dark:bg-zinc-950 dark:text-zinc-100">SaaS Infrastructure</option>
      </NativeSelect>
    </div>
  );
};

export default Select2;

