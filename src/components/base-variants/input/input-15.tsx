import { useId } from 'react';

import { IconMail } from '@tabler/icons-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Input15 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        Business Email
      </Label>
      <div className="relative">
        <Input
          id={id}
          type="email"
          placeholder="hello@watermelon.sh"
          className="peer focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl pr-9 transition-all focus-visible:ring-3"
        />
        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 peer-disabled:opacity-50">
          <IconMail className="size-4 stroke-[1.5]" />
        </div>
      </div>
    </div>
  );
};

export default Input15;
