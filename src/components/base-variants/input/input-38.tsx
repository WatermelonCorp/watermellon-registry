import { useId } from 'react';

import { IconMicrophone, IconSearch } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Input38 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        Advanced Search Interface
      </Label>
      <div className="relative">
        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3">
          <IconSearch className="size-4 stroke-[1.5]" />
        </div>
        <Input
          id={id}
          type="search"
          placeholder="Find resources..."
          className="peer focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl px-9 transition-all focus-visible:ring-3 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none"
        />
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground absolute inset-y-0 right-0 h-full w-9 rounded-l-none hover:bg-transparent focus-visible:ring-0"
          aria-label="Activate voice search"
        >
          <IconMicrophone className="size-4 stroke-[1.5]" />
        </Button>
      </div>
    </div>
  );
};

export default Input38;
