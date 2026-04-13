import { useId } from 'react';

import { Label } from '@/components/ui/label';
import { NativeSelect } from '@/components/ui/native-select';

const Select4 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-zinc-600 dark:text-zinc-400">
        Data Residency Policy
      </Label>
      <NativeSelect 
        id={id} 
        className="w-full [&_select]:!rounded-xl [&_select]:!border-zinc-200 shadow-xs dark:[&_select]:!border-zinc-800 dark:[&_select]:!bg-zinc-950 transition-all focus:ring-2 focus:ring-zinc-400/20 dark:focus:ring-zinc-500/20 dark:[&_select]:[color-scheme:dark]"
      >
        <option value="gdpr" className="dark:bg-zinc-950 dark:text-zinc-100">EU Sovereignty (GDPR)</option>
        <option value="ccpa" className="dark:bg-zinc-950 dark:text-zinc-100">California Privacy (CCPA)</option>
        <option value="federal" className="dark:bg-zinc-950 dark:text-zinc-100">Federal Compliance (HIPAA)</option>
        <option value="global" className="dark:bg-zinc-950 dark:text-zinc-100">Standard Global Policy</option>
      </NativeSelect>
      <p className="text-[11px] text-zinc-500 px-1 dark:text-zinc-500" role="region" aria-live="polite">
        Selection determines the primary geographic cluster for secure storage.
      </p>
    </div>
  );
};

export default Select4;

