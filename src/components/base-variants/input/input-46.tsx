'use client';

import { useId, useMemo, useState } from 'react';

import { IconCheck, IconEye, IconEyeOff, IconX } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { cn } from '@/lib/utils';

const requirements = [
  { regex: /.{12,}/, text: 'At least 12 characters' },
  { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
  { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
  { regex: /[0-9]/, text: 'At least 1 number' },
  {
    regex: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
    text: 'At least 1 special character',
  },
];

const Input46 = () => {
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const id = useId();

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const strength = requirements.map((req) => ({
    met: req.regex.test(password),
    text: req.text,
  }));

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  const getColor = (score: number) => {
    if (score === 0) return 'bg-border';
    if (score <= 1) return 'bg-red-500';
    if (score <= 2) return 'bg-orange-500';
    if (score <= 3) return 'bg-amber-500';
    if (score === 4) return 'bg-yellow-400';
    return 'bg-green-500';
  };

  const getText = (score: number) => {
    if (score === 0) return 'Enter a password';
    if (score <= 2) return 'Weak verification level';
    if (score <= 3) return 'Moderate security';
    if (score === 4) return 'Strong encryption';
    return 'Maximum security';
  };

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        Secure Vault Passphrase
      </Label>
      <div className="relative mb-3">
        <Input
          id={id}
          type={isVisible ? 'text' : 'password'}
          placeholder="Enter secure password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl pr-9 font-medium transition-all focus-visible:ring-3"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleVisibility}
          className="text-muted-foreground absolute inset-y-0 right-0 h-full w-9 rounded-l-none focus-within:ring-0 hover:bg-transparent focus-visible:ring-0"
        >
          {isVisible ? (
            <IconEyeOff className="size-4 stroke-[1.5]" />
          ) : (
            <IconEye className="size-4 stroke-[1.5]" />
          )}
          <span className="sr-only">
            {isVisible ? 'Hide password' : 'Show password'}
          </span>
        </Button>
      </div>

      <div className="mb-4 flex h-1.5 w-full gap-1.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={index}
            className={cn(
              'h-full flex-1 rounded-full transition-all duration-500 ease-out',
              index < strengthScore ? getColor(strengthScore) : 'bg-muted',
            )}
          />
        ))}
      </div>

      <p className="text-foreground text-xs font-semibold tracking-wider uppercase">
        {getText(strengthScore)}
      </p>

      <ul className="mb-4 space-y-1.5 pt-1">
        {strength.map((req, index) => (
          <li key={index} className="flex items-center gap-2">
            {req.met ? (
              <IconCheck className="size-3.5 stroke-[2] text-green-600 dark:text-green-400" />
            ) : (
              <IconX className="text-muted-foreground/50 size-3.5 stroke-[2]" />
            )}
            <span
              className={cn(
                'text-[10px] font-medium tracking-tight uppercase',
                req.met
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-muted-foreground',
              )}
            >
              {req.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Input46;
