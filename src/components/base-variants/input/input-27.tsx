import { useId } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Input27 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        Upload Asset
      </Label>
      <Input
        id={id}
        type="file"
        className="text-muted-foreground file:border-input file:text-foreground file:bg-primary/5 focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl border-dashed p-0 pr-3 text-xs italic transition-all file:mr-3 file:h-full file:border-0 file:border-r file:border-solid file:px-4 file:text-sm file:font-semibold file:not-italic focus-visible:ring-3"
      />
    </div>
  );
};

export default Input27;
