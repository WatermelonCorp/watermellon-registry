import { useId } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Input18 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        Documentation URL
      </Label>
      <div className="relative">
        <Input
          id={id}
          type="text"
          placeholder="quick-start"
          className="peer focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl pr-13 pl-16 text-sm transition-all focus-visible:ring-3"
        />
        <span className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 text-sm font-medium peer-disabled:opacity-50">
          docs.
        </span>
        <span className="text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 text-sm font-medium peer-disabled:opacity-50">
          .dev
        </span>
      </div>
    </div>
  );
};

export default Input18;
