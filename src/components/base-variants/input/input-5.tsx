import { useId } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Input5 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="font-medium">
        Secret API Key
      </Label>
      <Input
        id={id}
        type="text"
        placeholder="API Key"
        defaultValue="sk_live_51Msz8pS..."
        className="focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl font-mono text-xs transition-all read-only:bg-neutral-50 focus-visible:ring-3 dark:read-only:bg-neutral-900/50"
        readOnly
      />
    </div>
  );
};

export default Input5;
