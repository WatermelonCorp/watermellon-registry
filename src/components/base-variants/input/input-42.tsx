'use client';

import { useId, useState } from 'react';

import { IconMinus, IconPlus } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Input42 = () => {
  const id = useId();
  const [value, setValue] = useState(1024);

  const increment = () => setValue((prev) => prev + 1);
  const decrement = () => setValue((prev) => Math.max(0, prev - 1));

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        Server Port Number
      </Label>
      <div className="border-input focus-within:border-primary focus-within:ring-primary/20 flex overflow-hidden rounded-xl border transition-all focus-within:ring-3">
        <Input
          id={id}
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          placeholder="8080"
          className="h-10 flex-1 [appearance:textfield] rounded-none border-none text-center tabular-nums focus-visible:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <div className="flex flex-col border-l">
          <Button
            variant="ghost"
            className="hover:bg-muted h-5 w-8 rounded-none border-b p-0"
            onClick={increment}
            aria-label="Increment"
          >
            <IconPlus className="size-3" />
          </Button>
          <Button
            variant="ghost"
            className="hover:bg-muted h-5 w-8 rounded-none p-0"
            onClick={decrement}
            aria-label="Decrement"
          >
            <IconMinus className="size-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Input42;
