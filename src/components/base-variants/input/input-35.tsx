'use client';

import { useId, useState, type ChangeEvent } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const maxLength = 120;
const initialValue = '';

const Input35 = () => {
  const [value, setValue] = useState(initialValue);
  const [characterCount, setCharacterCount] = useState(initialValue.length);

  const id = useId();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= maxLength) {
      setValue(e.target.value);
      setCharacterCount(e.target.value.length);
    }
  };

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        Professional Headline
      </Label>
      <Input
        id={id}
        type="text"
        placeholder="e.g. Senior Software Architect..."
        value={value}
        maxLength={maxLength}
        onChange={handleChange}
        className="focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl transition-all focus-visible:ring-3"
      />
      <p className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
        <span className="tabular-nums">{maxLength - characterCount}</span>{' '}
        characters remaining
      </p>
    </div>
  );
};

export default Input35;
