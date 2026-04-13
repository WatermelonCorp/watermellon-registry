import { useId } from 'react';

import { NativeSelect } from '@/components/ui/native-select';

const Select9 = () => {
  const id = useId();

  return (
    <div className='border-input bg-background focus-within:border-ring focus-within:ring-ring/50 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40 has-aria-invalid:border-destructive relative w-full max-w-xs rounded-xl border shadow-xs transition-[color,box-shadow] outline-none focus-within:ring-[3px] has-[select:disabled]:cursor-not-allowed has-[select:disabled]:opacity-50 has-[select:is(:disabled)_*]:pointer-events-none dark:border-zinc-800 dark:bg-zinc-950'>
      <label htmlFor={id} className='text-zinc-500 block px-3 pt-2 text-[10px] font-bold uppercase tracking-wider dark:text-zinc-500'>
        Security clearance
      </label>
      <NativeSelect 
        id={id} 
        defaultValue=""
        className="!w-full [&_select]:!w-full [&_select]:!h-9 [&_select]:!border-none [&_select]:!bg-transparent [&_select]:!px-3 [&_select]:!shadow-none [&_select]:!ring-0 [&_select]:!ring-offset-0 [&_select]:!focus:ring-0 [&_select]:!focus-visible:ring-0 [&_select]:!focus-visible:outline-none [&_select]:!outline-none [&_select]:text-zinc-900 dark:[&_select]:text-zinc-100 dark:[&_select]:[color-scheme:dark]"
      >
        <option value="" disabled className="dark:bg-zinc-950 dark:text-zinc-500">Pick status level</option>
        <option value="level1" className="dark:bg-zinc-950 dark:text-zinc-100">Public Access (Level 1)</option>
        <option value="level2" className="dark:bg-zinc-950 dark:text-zinc-100">Confidential Internal (Level 2)</option>
        <option value="level3" className="dark:bg-zinc-950 dark:text-zinc-100">Restricted Sensitive (Level 3)</option>
        <option value="level4" className="dark:bg-zinc-950 dark:text-zinc-100">Top Secret Core (Level 4)</option>
      </NativeSelect>
    </div>
  );
};

export default Select9;

