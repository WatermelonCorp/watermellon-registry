import { useId } from 'react';

import { Label } from '@/components/ui/label';
import { NativeSelect } from '@/components/ui/native-select';

const Select1 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-zinc-600 dark:text-zinc-400">
        Account Identity Role
      </Label>
      <NativeSelect 
        id={id} 
        className="w-full rounded-xl border-zinc-200 shadow-xs dark:border-zinc-800 dark:bg-zinc-950 transition-all focus:ring-2 focus:ring-zinc-400/20 dark:focus:ring-zinc-500/20 dark:[&_select]:[color-scheme:dark]"
      >
        <option value="owner" className="dark:bg-zinc-950 dark:text-zinc-100">Organization Owner</option>
        <option value="admin" className="dark:bg-zinc-950 dark:text-zinc-100">System Administrator</option>
        <option value="editor" className="dark:bg-zinc-950 dark:text-zinc-100">Content Contributor</option>
        <option value="viewer" className="dark:bg-zinc-950 dark:text-zinc-100">Platform Observer</option>
      </NativeSelect>
    </div>
  );
};

export default Select1;

