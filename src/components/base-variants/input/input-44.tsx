'use client';

import { useId, useState } from 'react';

import { IconMinus, IconPlus } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Input44 = () => {
  const id = useId();
  const [value, setValue] = useState(1024);

  const increment = () => setValue((prev) => prev + 1);
  const decrement = () => setValue((prev) => Math.max(0, prev - 1));

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        Retry Interval (ms)
      </Label>
      <div className="relative">
        <Input
          id={id}
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="border-input focus-visible:border-primary focus-visible:ring-primary/20 h-10 w-full [appearance:textfield] rounded-xl border px-3 pr-20 tabular-nums transition-all focus-visible:ring-3 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <div className="absolute top-1 right-1 flex gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={decrement}
            className="hover:bg-muted h-8 w-8 rounded-lg border-none"
            aria-label="Decrement"
          >
            <IconMinus className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={increment}
            className="hover:bg-muted h-8 w-8 rounded-lg border-none"
            aria-label="Increment"
          >
            <IconPlus className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Input44;
