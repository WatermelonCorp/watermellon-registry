import { useId } from 'react';

import { Label } from '@/components/ui/label';
import { NativeSelect } from '@/components/ui/native-select';

const Select5 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-zinc-600 dark:text-zinc-400">
        Primary Gateway Version
      </Label>
      <NativeSelect 
        id={id} 
        aria-invalid="true"
        className="w-full rounded-xl border-red-500/50 shadow-xs dark:border-red-900/50 dark:bg-zinc-950 focus:ring-2 focus:ring-red-500/20 dark:focus:ring-red-500/10 dark:[&_select]:[color-scheme:dark]"
      >
        <option value="v1" className="dark:bg-zinc-950 dark:text-zinc-100">Legacy Gateway (v1.0)</option>
        <option value="v2" className="dark:bg-zinc-950 dark:text-zinc-100">Standard API (v2.4)</option>
        <option value="v3" className="dark:bg-zinc-950 dark:text-zinc-100">Modern Edge (v3.1-beta)</option>
        <option value="v4" className="dark:bg-zinc-950 dark:text-zinc-100">Serverless v4 (Experimental)</option>
      </NativeSelect>
      <p className="text-[11px] text-red-500 px-1 dark:text-red-400" role="alert" aria-live="polite">
        The selected version is currently undergoing maintenance.
      </p>
    </div>
  );
};

export default Select5;

