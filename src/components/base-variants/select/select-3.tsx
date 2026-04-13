import { useId } from 'react';
import { IconDatabase } from '@tabler/icons-react';

import { Label } from '@/components/ui/label';
import { NativeSelect } from '@/components/ui/native-select';

const Select3 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-zinc-600 dark:text-zinc-400">
        Metric Architecture
      </Label>
      <div className="group relative w-full">
        <NativeSelect 
          id={id} 
          className="w-full [&_select]:!pl-9 [&_select]:!rounded-xl [&_select]:!border-zinc-200 dark:[&_select]:!border-zinc-800 dark:[&_select]:!bg-zinc-950 transition-all [&_select]:focus-visible:ring-zinc-400/20 dark:[&_select]:focus-visible:ring-zinc-500/20 dark:[&_select]:[color-scheme:dark]"
          defaultValue=""
        >
          <option value="" disabled className="dark:bg-zinc-950 dark:text-zinc-500">Identify stream type</option>
          <option value="logs" className="dark:bg-zinc-950 dark:text-zinc-100">Unified System Logs</option>
          <option value="events" className="dark:bg-zinc-950 dark:text-zinc-100">Transaction Events</option>
          <option value="metrics" className="dark:bg-zinc-950 dark:text-zinc-100">Performance Metrics</option>
          <option value="traces" className="dark:bg-zinc-950 dark:text-zinc-100">Distributed Traces</option>
        </NativeSelect>
        <div className="text-zinc-400 pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 group-has-[select:disabled]:opacity-50 dark:text-zinc-600">
          <IconDatabase size={16} stroke={1.5} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default Select3;

