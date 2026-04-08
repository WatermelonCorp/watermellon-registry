import { useId } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Input10 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        Invite Code
      </Label>
      <Input
        id={id}
        type="text"
        placeholder="WTR-MELON-2026"
        className="focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl tracking-widest uppercase transition-all focus-visible:ring-3"
      />
      <p className="text-muted-foreground px-1 text-end text-[10px] font-medium tracking-tight uppercase">
        Code expires in 24 hours
      </p>
    </div>
  );
};

export default Input10;
