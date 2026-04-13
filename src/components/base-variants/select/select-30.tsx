import { useId } from 'react';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const hubs = [
  { value: 'us', label: 'Western United States', flag: 'us' },
  { value: 'gb', label: 'United Kingdom Hub', flag: 'gb' },
  { value: 'jp', label: 'Japan Core Region', flag: 'jp' },
  { value: 'in', label: 'India South Cluster', flag: 'in' },
  { value: 'de', label: 'Germany Mainframe', flag: 'de' },
];

const Select30 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-zinc-600 dark:text-zinc-400">
        Global Resource Hub
      </Label>
      <Select defaultValue="us">
        <SelectTrigger 
          id={id} 
          className="w-full rounded-xl border-zinc-200 bg-white shadow-xs transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
        >
          <span className="flex items-center gap-2">
            <SelectValue placeholder="Identify region" />
          </span>
        </SelectTrigger>
        <SelectContent 
          position="popper" 
          sideOffset={4} 
          className="rounded-xl border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
        >
          {hubs.map((hub) => (
            <SelectItem key={hub.value} value={hub.value} className="rounded-lg">
              <span className="flex items-center gap-2">
                <img 
                  src={`https://flagcdn.com/w40/${hub.flag}.png`} 
                  alt={`${hub.label} flag`} 
                  className="h-3 w-4.5 object-cover rounded-xs border border-zinc-200 dark:border-zinc-800"
                />
                <span className="truncate">{hub.label}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Select30;

