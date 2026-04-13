import { useId } from 'react';

import { Label } from '@/components/ui/label';
import { NativeSelect } from '@/components/ui/native-select';

const Select6 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
        Primary Deployment Region <span className="text-red-500 font-bold" aria-hidden="true">*</span>
      </Label>
      <NativeSelect 
        id={id} 
        required
        className="w-full rounded-xl border-zinc-200 shadow-xs dark:border-zinc-800 dark:bg-zinc-950 transition-all focus:ring-2 focus:ring-zinc-400/20 dark:focus:ring-zinc-500/20 dark:[&_select]:[color-scheme:dark]"
      >
        <option value="us-east" className="dark:bg-zinc-950 dark:text-zinc-100">US East (N. Virginia)</option>
        <option value="eu-west" className="dark:bg-zinc-950 dark:text-zinc-100">EU West (Ireland)</option>
        <option value="ap-south" className="dark:bg-zinc-950 dark:text-zinc-100">Asia Pacific (Mumbai)</option>
        <option value="all" className="dark:bg-zinc-950 dark:text-zinc-100">Global Multi-AZ</option>
      </NativeSelect>
    </div>
  );
};

export default Select6;

