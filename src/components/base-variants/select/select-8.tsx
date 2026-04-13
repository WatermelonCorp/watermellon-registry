import { useId } from 'react';

import { NativeSelect } from '@/components/ui/native-select';

const Select8 = () => {
  const id = useId();

  return (
    <div className="group relative w-full max-w-xs transition-all">
      <label
        htmlFor={id}
        className="absolute -top-2 left-3 z-10 bg-white px-1.5 text-[11px] font-semibold text-zinc-500 transition-colors group-focus-within:text-zinc-900 dark:bg-zinc-950 dark:text-zinc-500 dark:group-focus-within:text-zinc-100"
      >
        Execution Priority
      </label>
      <NativeSelect 
        id={id} 
        className="w-full rounded-xl border-zinc-200 shadow-xs dark:border-zinc-800 dark:bg-zinc-950 transition-all focus:ring-2 focus:ring-zinc-400/20 dark:focus:ring-zinc-500/20 dark:[&_select]:[color-scheme:dark] dark:[&_select]:bg-zinc-950 dark:hover:[&_select]:bg-zinc-950"
      >
        <option value="low" className="dark:bg-zinc-950 dark:text-zinc-100">Low (Background Task)</option>
        <option value="med" className="dark:bg-zinc-950 dark:text-zinc-100">Medium (Standard Request)</option>
        <option value="high" className="dark:bg-zinc-950 dark:text-zinc-100">High (Real-time Critical)</option>
        <option value="ultra" className="dark:bg-zinc-950 dark:text-zinc-100">Ultra (System Interrupt)</option>
      </NativeSelect>
    </div>
  );
};

export default Select8;

