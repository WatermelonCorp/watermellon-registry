'use client';

import { useId, useState } from 'react';

import { IconMinus, IconPlus } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Input41 = () => {
  const id = useId();
  const [value, setValue] = useState(1024);

  const increment = () => setValue((prev) => prev + 1);
  const decrement = () => setValue((prev) => Math.max(0, prev - 1));

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        Inventory Batch Size
      </Label>
      <div className="flex rounded-xl shadow-xs">
        <Input
          id={id}
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          placeholder="100"
          className="focus-visible:border-primary focus-visible:ring-primary/20 h-10 [appearance:textfield] rounded-r-none border-r-0 text-center tabular-nums transition-all focus-visible:z-10 focus-visible:ring-3 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={decrement}
          className="h-10 w-10 shrink-0 rounded-none border-r-0"
          aria-label="Decrement"
        >
          <IconMinus className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={increment}
          className="h-10 w-10 shrink-0 rounded-l-none"
          aria-label="Increment"
        >
          <IconPlus className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default Input41;
