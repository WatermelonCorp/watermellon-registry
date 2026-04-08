import { useId } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Input2 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label
        htmlFor={id}
        className="font-semibold text-neutral-700 dark:text-neutral-300"
      >
        Street Address
      </Label>
      <Input
        id={id}
        type="text"
        placeholder="123 Main St"
        className="focus-visible:border-primary focus-visible:ring-primary/20 rounded-2xl transition-all focus-visible:ring-3"
      />
    </div>
  );
};

export default Input2;
