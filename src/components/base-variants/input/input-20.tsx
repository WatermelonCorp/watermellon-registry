import { useId } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Input20 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        Staging Subdomain
      </Label>
      <div className="flex rounded-xl">
        <Input
          id={id}
          type="text"
          placeholder="alpha-test"
          className="focus-visible:border-primary focus-visible:ring-primary/20 -me-px flex-1 rounded-r-none text-sm transition-all focus-visible:z-10 focus-visible:ring-3"
        />
        <span className="border-input bg-muted/50 text-muted-foreground inline-flex items-center rounded-r-xl border border-l-0 px-3 text-sm font-medium">
          .staging.sh
        </span>
      </div>
    </div>
  );
};

export default Input20;
