import { useId } from 'react';
import { IconCommand, IconSearch } from '@tabler/icons-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Input37 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        Global Asset Search
      </Label>
      <div className="relative">
        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3">
          <IconSearch className="size-4 stroke-[1.5]" />
        </div>
        <Input
          id={id}
          type="search"
          placeholder="Search components..."
          className="peer focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl px-9 transition-all focus-visible:ring-3 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-2 peer-disabled:opacity-50">
          <kbd className="text-muted-foreground bg-muted inline-flex h-5 items-center rounded-md border px-1.5 font-sans text-[10px] font-bold tracking-tight uppercase">
            <IconCommand className="size-3" />
            <span>K</span>
          </kbd>
        </div>
      </div>
    </div>
  );
};

export default Input37;
