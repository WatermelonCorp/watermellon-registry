'use client'

import { Fragment, useId, useState } from 'react'

import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { cn } from '@/lib/utils'

type ComboboxItem = {
  disabled?: boolean
  value: string
}

type ComboboxGroup = {
  category: string
  items: readonly ComboboxItem[]
}

const items: readonly ComboboxGroup[] = [
  {
    category: 'Workspace',
    items: [{ value: 'Overview' }, { value: 'Inbox' }, { value: 'Library' }]
  },
  {
    category: 'Planning',
    items: [
      { value: 'Roadmap' },
      { value: 'Timeline', disabled: true },
      { value: 'Calendar' }
    ]
  },
  {
    category: 'People',
    items: [
      { value: 'Members' },
      { value: 'Guests', disabled: true },
      { value: 'Roles' }
    ]
  }
] as const

type ComboboxValue = ComboboxItem['value']

const isComboboxValue = (value: string): value is ComboboxValue =>
  items.some((group) => group.items.some((item) => item.value === value))

const Combobox3 = () => {
  const id = useId()
  const [open, setOpen] = useState<boolean>(false)
  const [selectedValue, setSelectedValue] = useState<ComboboxValue | ''>('')

  return (
    <div className='w-full max-w-xs space-y-2'>
      <Label htmlFor={id} className='text-sm font-medium'>
        Choose a workspace section
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          id={id}
          role='combobox'
          aria-expanded={open}
          className='flex h-10 w-full items-center justify-between rounded-xl border border-border/60 bg-background px-3 text-sm font-normal shadow-xs outline-offset-0 outline-none transition-colors hover:bg-accent/20 focus-visible:ring-[3px] focus-visible:ring-ring/50'
        >
          {selectedValue ? (
            <span className='flex min-w-0 items-center gap-2'>
              <span className='truncate'>{selectedValue}</span>
            </span>
          ) : (
            <span className='text-muted-foreground'>Select section</span>
          )}
          <ChevronsUpDownIcon
            className='text-muted-foreground/80 size-4 shrink-0'
            aria-hidden='true'
          />
        </PopoverTrigger>
        <PopoverContent
          className='w-full min-w-[var(--radix-popper-anchor-width)] rounded-xl border-border/60 p-0 shadow-sm'
          align='start'
        >
          <Command>
            <CommandInput placeholder='Search section...' className='h-9' />
            <CommandList>
              <CommandEmpty>No section found.</CommandEmpty>
              {items.map(group => (
                <Fragment key={group.category}>
                  <CommandGroup heading={group.category}>
                    {group.items.map(item => (
                      <CommandItem
                        key={item.value}
                        value={item.value}
                        onSelect={currentValue => {
                          if (item.disabled) {
                            return
                          }

                          if (!isComboboxValue(currentValue)) {
                            return
                          }

                          setSelectedValue(currentValue)
                          setOpen(false)
                        }}
                        className={cn(item.disabled && 'cursor-not-allowed opacity-50')}
                        disabled={item.disabled ?? false}
                      >
                        {item.value}
                        {selectedValue === item.value && (
                          <CheckIcon size={16} className='ml-auto' />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Fragment>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default Combobox3
