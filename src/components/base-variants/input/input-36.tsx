'use client';

import { useId, useRef, useState } from 'react';

import { IconX } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Input36 = () => {
  const [value, setValue] = useState('Draft document v1');

  const inputRef = useRef<HTMLInputElement>(null);

  const id = useId();

  const handleClearInput = () => {
    setValue('');

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        Document Title
      </Label>
      <div className="relative">
        <Input
          ref={inputRef}
          id={id}
          type="text"
          placeholder="Untitled Document..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl pr-9 transition-all focus-visible:ring-3"
        />
        {value && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClearInput}
            className="text-muted-foreground absolute inset-y-0 right-0 h-full w-9 rounded-l-none hover:bg-transparent focus-visible:ring-0"
            aria-label="Clear input"
          >
            <IconX className="size-4 stroke-[1.5]" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Input36;
