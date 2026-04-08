import { useId } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Input4 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-neutral-500">
        Organization ID
      </Label>
      <Input
        id={id}
        type="text"
        placeholder="ORG-001"
        disabled
        className="focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl transition-all focus-visible:ring-3 disabled:border-neutral-200 disabled:bg-neutral-50 dark:disabled:border-neutral-800 dark:disabled:bg-neutral-900/50"
      />
    </div>
  );
};

export default Input4;
