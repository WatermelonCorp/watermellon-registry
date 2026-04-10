'use client'

import { useState } from 'react'

import { ChevronsUpDownIcon } from 'lucide-react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui//command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui//popover'

const frameworks = [
  {
    value: 'design',
    label: 'Design'
  },
  {
    value: 'engineering',
    label: 'Engineering'
  },
  {
    value: 'marketing',
    label: 'Marketing'
  },
  {
    value: 'operations',
    label: 'Operations'
  },
  {
    value: 'support',
    label: 'Support'
  }
] as const

type FrameworkOption = (typeof frameworks)[number]
type FrameworkValue = FrameworkOption['value']

const isFrameworkValue = (value: string): value is FrameworkValue =>
  frameworks.some((framework) => framework.value === value)

const frameworkLabelByValue: Record<FrameworkValue, FrameworkOption['label']> = {
  design: 'Design',
  engineering: 'Engineering',
  marketing: 'Marketing',
  operations: 'Operations',
  support: 'Support'
}

const Combobox1 = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [selectedFramework, setSelectedFramework] = useState<FrameworkValue | ''>(
    ''
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        role='combobox'
        aria-expanded={open}
        className='flex h-10 w-full max-w-xs items-center justify-between rounded-xl border border-border/60 bg-background px-3 text-sm shadow-xs outline-none transition-colors hover:bg-accent/30 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50'
        aria-label='Framework combobox'
      >
        {selectedFramework
          ? frameworkLabelByValue[selectedFramework]
          : 'Select team...'}
        <ChevronsUpDownIcon className='size-4 opacity-50' />
      </PopoverTrigger>
      <PopoverContent className='w-[var(--radix-popover-trigger-width)] rounded-xl border-border/60 p-0 shadow-sm'>
        <Command>
          <CommandInput placeholder='Search team...' className='h-9' />
          <CommandList>
            <CommandEmpty>No team found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map(framework => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  className='pr-2'
                  data-checked={selectedFramework === framework.value}
                  onSelect={currentValue => {
                    if (currentValue === selectedFramework) {
                      setSelectedFramework('')
                      setOpen(false)
                      return
                    }

                    if (!isFrameworkValue(currentValue)) {
                      return
                    }

                    setSelectedFramework(currentValue)
                    setOpen(false)
                  }}
                >
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default Combobox1
