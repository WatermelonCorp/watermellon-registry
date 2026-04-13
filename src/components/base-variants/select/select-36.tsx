'use client';

import { useState } from 'react';
import { 
  Header, 
  ListBox, 
  ListBoxItem, 
  ListBoxSection, 
  Separator 
} from 'react-aria-components';
import { IconCheck } from '@tabler/icons-react';
import type { Selection } from 'react-aria-components';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const Select36 = () => {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(['read', 'billing']));

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label className="text-zinc-600 dark:text-zinc-400 font-medium tracking-tight">
        Policy Governance Scopes
      </Label>
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-950 transition-all">
        <ListBox
          className="max-h-72 flex flex-col gap-2 overflow-auto p-1 text-sm outline-none"
          aria-label="Select security scopes"
          selectionMode="multiple"
          selectionBehavior="toggle"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          <ListBoxSection className="space-y-1">
            <Header className="px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Operational Scopes
            </Header>
            {[
              { id: 'read', label: 'ReadOnly Access' },
              { id: 'write', label: 'Write & Execute' },
              { id: 'delete', label: 'Destructive Ops' },
            ].map((item) => (
              <ListBoxItem
                key={item.id}
                id={item.id}
                className={({ isSelected, isHovered, isFocusVisible }) => cn(
                  "flex items-center justify-between rounded-lg px-2.5 py-2 text-sm outline-none cursor-default select-none transition-colors",
                  isHovered && "bg-zinc-100/50 dark:bg-zinc-900/50",
                  isSelected && "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
                  isFocusVisible && "ring-2 ring-zinc-400 dark:ring-zinc-500 ring-offset-2 dark:ring-offset-zinc-950",
                  !isSelected && "text-zinc-600 dark:text-zinc-400"
                )}
              >
                {({ isSelected }) => (
                  <>
                    <span className="font-medium">{item.label}</span>
                    {isSelected && (
                      <IconCheck className="size-4 text-zinc-900 dark:text-zinc-100" stroke={2} />
                    )}
                  </>
                )}
              </ListBoxItem>
            ))}
          </ListBoxSection>

          <Separator className="mx-1 my-1.5 border-t border-zinc-100 dark:border-zinc-800" />

          <ListBoxSection className="space-y-1">
            <Header className="px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Administrative Scopes
            </Header>
            {[
              { id: 'users', label: 'User Governance' },
              { id: 'billing', label: 'Billing & Quotas' },
              { id: 'audit', label: 'Security Audits' },
            ].map((item) => (
              <ListBoxItem
                key={item.id}
                id={item.id}
                className={({ isSelected, isHovered, isFocusVisible }) => cn(
                  "flex items-center justify-between rounded-lg px-2.5 py-2 text-sm outline-none cursor-default select-none transition-colors",
                  isHovered && "bg-zinc-100/50 dark:bg-zinc-900/50",
                  isSelected && "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
                  isFocusVisible && "ring-2 ring-zinc-400 dark:ring-zinc-500 ring-offset-2 dark:ring-offset-zinc-950",
                  !isSelected && "text-zinc-600 dark:text-zinc-400"
                )}
              >
                {({ isSelected }) => (
                  <>
                    <span className="font-medium">{item.label}</span>
                    {isSelected && (
                      <IconCheck className="size-4 text-zinc-900 dark:text-zinc-100" stroke={2} />
                    )}
                  </>
                )}
              </ListBoxItem>
            ))}
          </ListBoxSection>
        </ListBox>
      </div>
      <p className="text-[11px] text-zinc-500 px-1 dark:text-zinc-500">
        Click to toggle multiple policy scopes.
      </p>
    </div>
  );
};

export default Select36;

