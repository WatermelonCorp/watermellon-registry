'use client';

import { useId, useState } from 'react';

import { IconEye, IconEyeOff } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Input26 = () => {
  const [isVisible, setIsVisible] = useState(false);

  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        Secure Password
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={isVisible ? 'text' : 'password'}
          placeholder="Password"
          className="focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl pr-10 text-sm transition-all focus-visible:ring-3"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsVisible((prevState) => !prevState)}
          className="text-muted-foreground absolute inset-y-0 right-0 h-full w-10 rounded-l-none hover:bg-transparent focus-visible:bg-transparent"
        >
          {isVisible ? (
            <IconEyeOff className="size-5 stroke-[1.5]" />
          ) : (
            <IconEye className="size-5 stroke-[1.5]" />
          )}
          <span className="sr-only">
            {isVisible ? 'Hide password' : 'Show password'}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Input26;
