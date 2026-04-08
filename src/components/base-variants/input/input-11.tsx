import { useId } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Input11 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <div className="flex items-center justify-between gap-2 px-1">
        <Label htmlFor={id} className="text-sm font-medium">
          Portfolio URL
        </Label>
        <span className="text-muted-foreground text-[10px] font-medium uppercase">
          Optional
        </span>
      </div>
      <Input
        id={id}
        type="url"
        placeholder="https://your-work.com"
        className="focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl transition-all focus-visible:ring-3"
      />
    </div>
  );
};

export default Input11;
