import { useId } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Input16 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        GitHub Repository
      </Label>
      <div className="relative">
        <Input
          id={id}
          type="text"
          placeholder="username/repo"
          className="peer focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl pl-24 transition-all focus-visible:ring-3"
        />
        <span className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 text-xs font-medium peer-disabled:opacity-50">
          github.com/
        </span>
      </div>
    </div>
  );
};

export default Input16;
