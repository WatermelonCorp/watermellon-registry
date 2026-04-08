import { useId } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Input33 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        API Access Token
      </Label>
      <div className="border-input focus-within:border-primary focus-within:ring-primary/20 flex rounded-xl border transition-all focus-within:ring-3">
        <Input
          id={id}
          type="password"
          placeholder="••••••••••••••••"
          className="h-10 flex-1 rounded-l-xl rounded-r-none border-none focus-visible:ring-0"
        />
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 h-[40px] rounded-l-none rounded-r-xl px-4 shadow-none">
          Refresh
        </Button>
      </div>
    </div>
  );
};

export default Input33;
