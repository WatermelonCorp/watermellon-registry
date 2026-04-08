import { useId } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Input3 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="gap-1 font-medium">
        Business Email <span className="text-rose-500">*</span>
      </Label>
      <Input
        id={id}
        type="email"
        placeholder="name@company.com"
        required
        className="focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl transition-all focus-visible:ring-3"
      />
    </div>
  );
};

export default Input3;
