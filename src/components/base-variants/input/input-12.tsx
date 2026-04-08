import { useId } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Input12 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        Confirm Password
      </Label>
      <Input
        id={id}
        type="password"
        placeholder="••••••••"
        className="peer transition-all focus-visible:border-rose-500 focus-visible:ring-3 focus-visible:ring-rose-500/20"
        defaultValue="password123"
        aria-invalid
      />
      <p className="px-1 text-[11px] font-medium text-rose-500">
        Passwords do not match. Please try again.
      </p>
    </div>
  );
};

export default Input12;
