import { useId } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Input21 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        Project Identifier
      </Label>
      <div className="flex rounded-xl">
        <span className="border-input bg-muted/50 text-muted-foreground inline-flex items-center rounded-l-xl border border-r-0 px-3 text-sm font-medium">
          PRJ-
        </span>
        <Input
          id={id}
          type="text"
          placeholder="1024"
          className="focus-visible:border-primary focus-visible:ring-primary/20 -mx-px flex-1 rounded-none text-sm transition-all focus-visible:z-10 focus-visible:ring-3"
        />
        <span className="border-input bg-muted/50 text-muted-foreground inline-flex items-center rounded-r-xl border border-l-0 px-3 text-sm font-medium">
          -DEV
        </span>
      </div>
    </div>
  );
};

export default Input21;
