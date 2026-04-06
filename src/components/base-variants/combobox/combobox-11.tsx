'use client'

import { useId, useMemo, useState } from 'react'

import { CheckIcon, ChevronsUpDownIcon, XIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
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

const MAX_SHOWN_ITEMS = 2

const Combobox11 = () => {
  const id = useId()
  const [open, setOpen] = useState<boolean>(false)
  const [expanded, setExpanded] = useState<boolean>(false)
  const [selectedValues, setSelectedValues] = useState<FrameworkValue[]>([
    'research',
    'design',
    'testing',
    'delivery',
    'docs'
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

  const visibleItems = useMemo(
    () =>
      expanded ? selectedValues : selectedValues.slice(0, MAX_SHOWN_ITEMS),
    [expanded, selectedValues]
  )
  const hiddenCount = selectedValues.length - visibleItems.length

  return (
    <div className='w-full max-w-xs space-y-2'>
      <Label htmlFor={id} className='text-sm font-medium'>
        Expandable workflow tags
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          id={id}
          role='combobox'
          aria-expanded={open}
          className='flex min-h-11 w-full items-start justify-between rounded-2xl border border-border/60 bg-background px-3.5 py-2.5 text-sm shadow-xs outline-none transition-colors hover:bg-accent/10 focus-visible:ring-[3px] focus-visible:ring-ring/50'
        >
          <div className='flex flex-wrap items-center gap-2 pr-3'>
            {selectedValues.length > 0 ? (
              <>
                {visibleItems.map((value) => (
                  <Badge
                    key={value}
                    variant='outline'
                    className='rounded-lg border-border/60 bg-muted/20 px-2.5 py-1 text-xs'
                  >
                    {frameworkByValue[value]}
                    <button
                      type='button'
                      className='ml-1 inline-flex size-4 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground'
                      onClick={(event) => {
                        event.stopPropagation()
                        removeSelection(value)
                      }}
                    >
                      <XIcon className='size-3' />
                    </button>
                  </Badge>
                ))}
                {(hiddenCount > 0 || expanded) && (
                <Badge
                  variant='outline'
                  onClick={(event) => {
                    event.stopPropagation()
                    setExpanded((previousExpanded) => !previousExpanded)
                  }}
                    className='rounded-lg border-dashed border-border/60 bg-transparent px-2.5 py-1 text-xs'
                  >
                    {expanded ? 'Show less' : `+${hiddenCount} more`}
                  </Badge>
                )}
              </>
            ) : (
              <span className='text-muted-foreground'>Select workflow tags</span>
            )}
          </div>
          <ChevronsUpDownIcon
            className='text-muted-foreground/80 mt-0.5 size-4 shrink-0'
            aria-hidden='true'
          />
        </PopoverTrigger>
        <PopoverContent className='w-(--radix-popper-anchor-width) rounded-2xl border-border/60 p-0 shadow-sm'>
          <Command>
            <CommandInput
              placeholder='Search workflow tags...'
              className='h-10 px-2'
            />
            <CommandList>
              <CommandEmpty>No workflow tag found.</CommandEmpty>
              <CommandGroup>
                {frameworks.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={() => toggleSelection(framework.value)}
                    className='flex items-center rounded-lg'
                  >
                    <span className='min-w-0 flex-1 truncate'>
                      {framework.label}
                    </span>
                    {selectedValues.includes(framework.value) && (
                      <CheckIcon size={16} className='ml-auto shrink-0' />
                    )}
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

export default Combobox11
