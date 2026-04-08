import { useId } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Input8 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="px-1 text-sm font-medium">
        Project Name
      </Label>
      <Input
        id={id}
        type="text"
        placeholder="e.g. Antigravity Platform"
        className="focus-visible:border-primary focus-visible:ring-primary/20 rounded-full px-4 transition-all focus-visible:ring-3"
      />
    </div>
  );
};

export default Input8;
