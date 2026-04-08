import { useId } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Input7 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        Username
      </Label>
      <Input
        id={id}
        type="text"
        placeholder="@username"
        defaultValue="@watermelon_dev"
        className="focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl transition-all focus-visible:ring-3"
      />
    </div>
  );
};

export default Input7;
