import { useId } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Input17 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        Platform Username
      </Label>
      <div className="relative">
        <Input
          id={id}
          type="text"
          placeholder="username"
          className="peer focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl pr-13 text-sm transition-all focus-visible:ring-3"
        />
        <span className="text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 text-sm font-medium peer-disabled:opacity-50">
          .sh
        </span>
      </div>
    </div>
  );
};

export default Input17;
