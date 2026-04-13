import { useId } from 'react';

import { Label } from '@/components/ui/label';
import { NativeSelect } from '@/components/ui/native-select';

const Select34 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2 text-zinc-900 dark:text-zinc-100">
      <Label htmlFor={id} className="text-zinc-600 dark:text-zinc-400">
        Dietary Preferences
      </Label>
      <NativeSelect 
        id={id} 
        multiple 
        className="w-full [&_svg]:hidden [&_select]:h-32 [&_select]:rounded-xl [&_select]:border-zinc-200 [&_select]:py-2 [&_select]:pr-2.5 [&_select]:shadow-xs dark:[&_select]:border-zinc-800 dark:[&_select]:bg-zinc-950 transition-all [&_select]:focus-visible:ring-zinc-400/20 dark:[&_select]:focus-visible:ring-zinc-500/20"
      >
        <option value="vegetarian" className="py-1 px-1.5 focus:bg-zinc-100 dark:focus:bg-zinc-900">
          Vegetarian Options
        </option>
        <option value="vegan" className="py-1 px-1.5 focus:bg-zinc-100 dark:focus:bg-zinc-900">
          Strictly Vegan
        </option>
        <option value="gluten-free" className="py-1 px-1.5 focus:bg-zinc-100 dark:focus:bg-zinc-900">
          Gluten-Free Diet
        </option>
        <option value="halal" className="py-1 px-1.5 focus:bg-zinc-100 dark:focus:bg-zinc-900">
          Halal Certified
        </option>
        <option value="kosher" className="py-1 px-1.5 focus:bg-zinc-100 dark:focus:bg-zinc-900">
          Kosher Selection
        </option>
        <option value="dairy-free" className="py-1 px-1.5 focus:bg-zinc-100 dark:focus:bg-zinc-900">
          Dairy-Free Items
        </option>
      </NativeSelect>
      <p className="text-[11px] text-zinc-500 px-1 dark:text-zinc-500">
        Hold Cmd/Ctrl to select multiple preferences.
      </p>
    </div>
  );
};

export default Select34;

