import { useId } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Input23 = () => {
  const id = useId();

  return (
    <div className="group relative w-full max-w-xs">
      <Label
        htmlFor={id}
        className="bg-background text-muted-foreground group-focus-within:text-primary absolute top-0 left-3 z-10 block -translate-y-1/2 px-1 text-[10px] font-semibold tracking-wider uppercase transition-colors"
      >
        Mailing Address
      </Label>
      <Input
        id={id}
        type="text"
        placeholder="1234 Silicon Valley"
        className="focus-visible:border-primary focus-visible:ring-primary/20 h-12 rounded-xl bg-transparent text-sm transition-all focus-visible:ring-3 dark:bg-transparent"
      />
    </div>
  );
};

export default Input23;
