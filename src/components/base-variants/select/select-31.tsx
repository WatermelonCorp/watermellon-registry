import { useId } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const agents = [
  { id: '1', handle: 'vance', name: 'Vance Sterling', initials: 'VS' },
  { id: '2', handle: 'elara', name: 'Elara Vance', initials: 'EV' },
  { id: '3', handle: 'jules', name: 'Jules Winfield', initials: 'JW' },
];

const Select31 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-zinc-600 dark:text-zinc-400">
        Delegate Action
      </Label>
      <Select defaultValue="1">
        <SelectTrigger 
          id={id} 
          className="w-full rounded-xl border-zinc-200 bg-white shadow-xs transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900 px-2"
        >
          <SelectValue placeholder="Identify member" />
        </SelectTrigger>
        <SelectContent 
          position="popper" 
          sideOffset={4} 
          className="rounded-xl border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
        >
          <SelectGroup>
            <SelectLabel className="text-zinc-500 text-xs px-2.5">Available Agents</SelectLabel>
            {agents.map((agent) => (
              <SelectItem key={agent.id} value={agent.id} className="rounded-lg">
                <span className="flex items-center gap-2">
                  <Avatar className="size-5 border border-zinc-200 dark:border-zinc-800">
                    <AvatarImage src={`https://unavatar.io/${agent.handle}`} alt={agent.name} />
                    <AvatarFallback className="text-[8px] bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                      {agent.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate">{agent.name}</span>
                </span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Select31;

