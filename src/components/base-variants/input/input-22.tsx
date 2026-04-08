import { useId } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Input22 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        Recovery Email
      </Label>
      <Input
        id={id}
        type="email"
        placeholder="backup@example.com"
        className="bg-primary/5 focus-visible:bg-background focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl border-transparent text-sm shadow-none transition-all focus-visible:ring-3"
      />
    </div>
  );
};

export default Input22;
