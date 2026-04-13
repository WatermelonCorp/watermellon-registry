'use client'

import { useId, useState } from 'react'

import { ChevronsUpDownIcon, XIcon } from 'lucide-react'

import { Badge } from '@/components/ui//badge'
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

const frameworks = [
  { value: 'research', label: 'Research' },
  { value: 'planning', label: 'Planning' },
  { value: 'design', label: 'Design' },
  { value: 'testing', label: 'Testing' },
  { value: 'delivery', label: 'Delivery' },
  { value: 'support', label: 'Support' },
  { value: 'docs', label: 'Docs' },
  { value: 'review', label: 'Review' }
] as const

type FrameworkOption = (typeof frameworks)[number]
type FrameworkValue = FrameworkOption['value']

const frameworkByValue: Record<FrameworkValue, FrameworkOption['label']> = {
  research: 'Research',
  planning: 'Planning',
  design: 'Design',
  testing: 'Testing',
  delivery: 'Delivery',
  support: 'Support',
  docs: 'Docs',
  review: 'Review'
}

const Combobox10 = () => {
  const id = useId()
  const [open, setOpen] = useState<boolean>(false)
  const [selectedValues, setSelectedValues] = useState<FrameworkValue[]>([
    'research',
    'design'
  ])

  const toggleSelection = (value: FrameworkValue) => {
    setSelectedValues((previousValues) =>
      previousValues.includes(value)
        ? previousValues.filter((selectedValue) => selectedValue !== value)
        : [...previousValues, value]
    )
  }

  const removeSelection = (value: FrameworkValue) => {
    setSelectedValues((previousValues) =>
      previousValues.filter((selectedValue) => selectedValue !== value)
    )
  }

  return (
    <div className='w-full max-w-xs space-y-2'>
      <Label htmlFor={id} className='text-sm font-medium'>
        Workflow tags
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          id={id}
          role='combobox'
          aria-expanded={open}
          className='flex min-h-10 w-full items-start justify-between rounded-xl border border-border/60 bg-background px-2 py-2 text-sm shadow-xs outline-none transition-colors hover:bg-accent/10 focus-visible:ring-[3px] focus-visible:ring-ring/50'
        >
          <div className='flex flex-wrap items-center gap-1.5 pr-2.5'>
            {selectedValues.length > 0 ? (
              selectedValues.map((value) => (
                <Badge
                  key={value}
                  variant='outline'
                  className='rounded-md border-border/60 bg-background pl-2.5 pr-1 py-3!'
                >
                  {frameworkByValue[value]}
                  <button
                    type='button'
                    className='ml-0 inline-flex size-4 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground'
                    onClick={(event) => {
                      event.stopPropagation()
                      removeSelection(value)
                    }}
                  >
                    <XIcon className='size-3' />
                  </button>
                </Badge>
              ))
            ) : (
              <span className='text-muted-foreground'>Select workflow tags</span>
            )}
          </div>
          <ChevronsUpDownIcon
            className='text-muted-foreground/80 mt-1 size-4 shrink-0'
            aria-hidden='true'
          />
        </PopoverTrigger>
        <PopoverContent
          className='w-(--radix-popper-anchor-width) rounded-xl border-border/60 p-0 shadow-sm'
        >
          <Command>
            <CommandInput placeholder='Search workflow tags...' className='h-9 px-1' />
            <CommandList>
              <CommandEmpty>No workflow tag found.</CommandEmpty>
              <CommandGroup>
                {frameworks.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    data-checked={selectedValues.includes(framework.value)}
                    onSelect={() => toggleSelection(framework.value)}
                    className='flex items-center rounded-md pr-2'
                  >
                    <span className='min-w-0 flex-1 truncate'>{framework.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default Combobox10
