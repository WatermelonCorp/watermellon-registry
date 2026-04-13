'use client'

import { Fragment, useId, useState } from 'react'

import { ChevronsUpDownIcon } from 'lucide-react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui//command'
import { Label } from '@/components/ui//label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui//popover'

const items = [
  {
    continent: 'Product',
    items: [{ value: 'Roadmap' }, { value: 'Research' }, { value: 'Launch' }]
  },
  {
    continent: 'Design',
    items: [{ value: 'Wireframes' }, { value: 'UI Kit' }, { value: 'Icons' }]
  },
  {
    continent: 'Operations',
    items: [{ value: 'Logistics' }, { value: 'Support' }, { value: 'Reports' }]
  }
] as const

type ComboboxGroup = (typeof items)[number]
type ComboboxValue = ComboboxGroup['items'][number]['value']

const isComboboxValue = (value: string): value is ComboboxValue =>
  items.some((group) => group.items.some((item) => item.value === value))

const Combobox2 = () => {
  const id = useId()
  const [open, setOpen] = useState<boolean>(false)
  const [selectedValue, setSelectedValue] = useState<ComboboxValue | ''>('')

  return (
    <div className='w-full max-w-xs space-y-2'>
      <Label htmlFor={id}>Grouped combobox</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          id={id}
          role='combobox'
          aria-expanded={open}
          className='flex h-10 w-full items-center justify-between rounded-xl border border-input bg-background px-3 text-sm font-normal outline-offset-0 outline-none transition-colors hover:bg-accent/20 focus-visible:ring-[3px] focus-visible:ring-ring/50'
        >
          {selectedValue ? (
            <span className='flex min-w-0 items-center gap-2'>
              <span className='truncate'>{selectedValue}</span>
            </span>
          ) : (
            <span className='text-muted-foreground'>Select option</span>
          )}
          <ChevronsUpDownIcon
            className='text-muted-foreground/80 shrink-0 size-4'
            aria-hidden='true'
          />
        </PopoverTrigger>
        <PopoverContent className='border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0' align='start'>
          <Command>
            <CommandInput placeholder='Search option...' />
            <CommandList>
              <CommandEmpty>No option found.</CommandEmpty>
              {items.map(group => (
                <Fragment key={group.continent}>
                  <CommandGroup heading={group.continent}>
                    {group.items.map(item => (
                      <CommandItem
                        key={item.value}
                        value={item.value}
                        className='pr-2'
                        data-checked={selectedValue === item.value}
                        onSelect={currentValue => {
                          if (!isComboboxValue(currentValue)) {
                            return
                          }

                          setSelectedValue(currentValue)
                          setOpen(false)
                        }}
                      >
                        {item.value}
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

export default Combobox2
