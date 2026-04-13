import { ListBox, ListBoxItem } from 'react-aria-components';

import { Label } from '@/components/ui/label';

const envs = [
  { id: 'prod', label: 'Production (Main)', description: 'Critical systems' },
  { id: 'staging', label: 'Staging (Build)', description: 'UAT testing' },
  { id: 'dev', label: 'Development (Local)', description: 'Sandbox play' },
  { id: 'legacy', label: 'Legacy (v2)', description: 'Archived data', isDisabled: true },
];

const Select35 = () => {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label className="text-zinc-600 dark:text-zinc-400">Environment Context</Label>
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-950 transition-all">
        <ListBox
          className="flex flex-col p-1 outline-none"
          aria-label="Select environment context"
          selectionMode="single"
          defaultSelectedKeys={['staging']}
        >
          {envs.map((env) => (
            <ListBoxItem
              key={env.id}
              id={env.id}
              className="flex flex-col rounded-lg px-2.5 py-2 text-sm outline-none cursor-default select-none transition-colors data-[selected=true]:bg-zinc-100 dark:data-[selected=true]:bg-zinc-900 data-[selected=true]:text-zinc-900 dark:data-[selected=true]:text-zinc-100 data-[disabled]:opacity-40 data-[disabled]:grayscale focus:bg-zinc-100 dark:focus:bg-zinc-900"
              isDisabled={env.isDisabled}
              textValue={env.label}
            >
              <span className="font-medium text-zinc-900 dark:text-zinc-100">{env.label}</span>
              <span className="text-[11px] text-zinc-500">{env.description}</span>
            </ListBoxItem>
          ))}
        </ListBox>
      </div>
    </div>
  );
};

export default Select35;

