import { useId } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Input9 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        Phone Number
      </Label>
      <Input
        id={id}
        type="tel"
        placeholder="+1 (555) 000-0000"
        className="focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl transition-all focus-visible:ring-3"
      />
      <p className="text-muted-foreground px-1 text-xs italic">
        Verification code will be sent to this number.
      </p>
    </div>
  );
};

export default Input9;
