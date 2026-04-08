import { useId } from 'react';

import { IconUser } from '@tabler/icons-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Input14 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        Full Name
      </Label>
      <div className="relative">
        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
          <IconUser className="size-4 stroke-[1.5]" />
        </div>
        <Input
          id={id}
          type="text"
          placeholder="John Doe"
          className="peer focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl pl-9 transition-all focus-visible:ring-3"
        />
      </div>
    </div>
  );
};

export default Input14;
