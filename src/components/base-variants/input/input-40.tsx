'use client';

import { useId, useState } from 'react';

import { IconMinus, IconPlus } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Input40 = () => {
  const id = useId();
  const [value, setValue] = useState(1024);

  const increment = () => setValue((prev) => prev + 1);
  const decrement = () => setValue((prev) => Math.max(0, prev - 1));

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        Order Quantity
      </Label>
      <div className="flex rounded-xl shadow-xs">
        <Button
          variant="outline"
          size="icon"
          onClick={decrement}
          className="h-10 w-10 shrink-0 rounded-r-none border-r-0"
          aria-label="Decrement"
        >
          <IconMinus className="size-4" />
        </Button>
        <Input
          id={id}
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          placeholder="1"
          className="focus-visible:border-primary h-10 flex-1 [appearance:textfield] rounded-none text-center tabular-nums focus-visible:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={increment}
          className="h-10 w-10 shrink-0 rounded-l-none border-l-0"
          aria-label="Increment"
        >
          <IconPlus className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default Input40;
