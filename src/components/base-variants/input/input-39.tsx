'use client';

import { useEffect, useId, useState } from 'react';

import { IconLoader2, IconSearch } from '@tabler/icons-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Input39 = () => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const id = useId();

  useEffect(() => {
    if (!value) return;

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setIsLoading(newValue !== '');
  };

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        Deep Search Engine
      </Label>
      <div className="relative">
        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3">
          <IconSearch className="size-4 stroke-[1.5]" />
        </div>
        <Input
          id={id}
          type="search"
          placeholder="Query database..."
          value={value}
          onChange={handleSearchChange}
          className="peer focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl px-9 transition-all focus-visible:ring-3 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none"
        />
        {isLoading && (
          <div className="text-muted-foreground absolute inset-y-0 right-0 flex items-center justify-center pr-3">
            <IconLoader2 className="size-4 animate-spin stroke-[1.5]" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Input39;
