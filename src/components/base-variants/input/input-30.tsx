import { useId } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Input30 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        Newsletter Signup
      </Label>
      <div className="flex gap-2">
        <Input
          id={id}
          type="email"
          placeholder="mail@watermelon.sh"
          className="focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl text-sm transition-all focus-visible:ring-3"
        />
        <Button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"
        >
          Join Us
        </Button>
      </div>
    </div>
  );
};

export default Input30;
