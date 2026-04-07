'use client';

import { useEffect, useMemo, useState } from 'react';

import {
  FileIcon,
  LayersIcon,
  Loader2Icon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
  XIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const commands = [
  {
    title: 'Project Layers',
    category: 'Workspace',
    icon: LayersIcon,
    shortcut: '⌘L',
    color: 'text-orange-500 bg-orange-500/10',
  },
  {
    title: 'Team Contributors',
    category: 'Access',
    icon: UserIcon,
    shortcut: '⌘T',
    color: 'text-indigo-500 bg-indigo-500/10',
  },
  {
    title: 'System Settings',
    category: 'General',
    icon: SettingsIcon,
    shortcut: '⌘S',
    color: 'text-emerald-500 bg-emerald-500/10',
  },
  {
    title: 'Technical Specs',
    category: 'Docs',
    icon: FileIcon,
    shortcut: '⌘D',
    color: 'text-blue-500 bg-blue-500/10',
  },
];

const useDebounce = (value: string, delay: number = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Popover10 = () => {
  const [inputValue, setInputValue] = useState('');
  const debouncedSearch = useDebounce(inputValue);
  const isLoading = !!inputValue && inputValue !== debouncedSearch;

  const filteredCommands = useMemo(() => {
    const searchTerm = debouncedSearch.trim().toLowerCase();
    if (!searchTerm) return commands;
    return commands.filter(
      (cmd) =>
        cmd.title.toLowerCase().includes(searchTerm) ||
        cmd.category.toLowerCase().includes(searchTerm),
    );
  }, [debouncedSearch]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-xl border-neutral-200 transition-all hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
        >
          <SearchIcon className="size-4 text-neutral-500" />
          <span className="sr-only">Search commands</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="shadow-3xl w-80 overflow-hidden rounded-3xl border-neutral-100 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
        <div className="flex flex-col gap-6">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3.5 text-neutral-400">
              <SearchIcon className="size-3.5" />
            </div>
            <Input
              type="text"
              placeholder="Search workspace layers..."
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              className="h-11 rounded-2xl border-neutral-100 bg-neutral-100/50 px-10 text-xs font-medium transition-all outline-none placeholder:text-neutral-500 focus-visible:border-neutral-200 focus-visible:ring-0 focus-visible:ring-offset-0 dark:border-neutral-800 dark:bg-neutral-900/50 dark:focus-visible:border-neutral-700"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {isLoading ? (
                <Loader2Icon className="size-4 animate-spin text-orange-500" />
              ) : (
                inputValue && (
                  <button
                    onClick={() => {
                      setInputValue('');
                    }}
                    className="group rounded-lg p-1.5 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <XIcon className="size-3.5 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-200" />
                  </button>
                )
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs tracking-tight text-neutral-400">
                Workspace search
              </span>
              {inputValue && (
                <span className="text-[10px] font-bold text-neutral-400/60">
                  {filteredCommands.length} results
                </span>
              )}
            </div>

            <ul className="flex flex-col gap-1.5">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, index) => (
                  <li
                    key={index}
                    className="group flex cursor-pointer items-center gap-3.5 rounded-2xl p-2.5 transition-all hover:bg-neutral-50 dark:hover:bg-neutral-900"
                  >
                    <div
                      className={cn(
                        'flex size-9 items-center justify-center rounded-xl border border-transparent transition-all group-hover:scale-105',
                        cmd.color,
                      )}
                    >
                      <cmd.icon className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[13px] font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                        {cmd.title}
                      </div>
                      <p className="text-[10px] font-medium text-neutral-400">
                        {cmd.category}
                      </p>
                    </div>
                    <kbd className="hidden h-6 items-center gap-1 rounded border border-neutral-100 bg-neutral-50 px-1.5 font-mono text-[10px] font-bold text-neutral-400 opacity-60 transition-opacity select-none group-hover:opacity-100 sm:inline-flex dark:border-neutral-800 dark:bg-neutral-900">
                      {cmd.shortcut}
                    </kbd>
                  </li>
                ))
              ) : (
                <li className="py-12 text-center">
                  <div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-3xl border border-neutral-100 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
                    <SearchIcon className="size-5 text-neutral-300 dark:text-neutral-700" />
                  </div>
                  <p className="text-sm font-bold text-neutral-400">
                    No results found
                  </p>
                  <p className="text-xs font-medium tracking-tight text-neutral-500">
                    Try another keyword or layer name
                  </p>
                </li>
              )}
            </ul>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Popover10;
