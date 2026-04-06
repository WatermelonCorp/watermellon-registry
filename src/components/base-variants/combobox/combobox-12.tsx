'use client'

import { useId, useState } from 'react'

import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'

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

const workflowTags = [
  { value: 'research', label: 'Research' },
  { value: 'planning', label: 'Planning' },
  { value: 'design', label: 'Design' },
  { value: 'testing', label: 'Testing' },
  { value: 'delivery', label: 'Delivery' },
  { value: 'support', label: 'Support' },
  { value: 'docs', label: 'Docs' },
  { value: 'review', label: 'Review' }
] as const

type WorkflowTag = (typeof workflowTags)[number]
type WorkflowTagValue = WorkflowTag['value']

const Combobox12 = () => {
  const id = useId()
  const [open, setOpen] = useState<boolean>(false)
  const [selectedValues, setSelectedValues] = useState<WorkflowTagValue[]>([
    'research',
    'planning',
    'design',
    'testing'
  ])

  const toggleSelection = (value: WorkflowTagValue) => {
    setSelectedValues((previousValues) =>
      previousValues.includes(value)
        ? previousValues.filter(
            (selectedValue) => selectedValue !== value
          )
        : [...previousValues, value]
    )
  }

  return (
    <div className='w-full max-w-xs space-y-2'>
      <Label htmlFor={id} className='text-sm font-medium'>
        Selected workflow count
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          id={id}
          role='combobox'
          aria-expanded={open}
          className='flex min-h-11 w-full items-center justify-between rounded-2xl border border-border/60 bg-background px-3.5 py-2 text-sm shadow-xs outline-none transition-colors hover:bg-accent/10 focus-visible:ring-[3px] focus-visible:ring-ring/50'
        >
          <span className='flex items-center gap-2 text-left'>
            {selectedValues.length > 0 ? (
              <>
                <Badge
                  variant='outline'
                  className='rounded-lg border-border/60 bg-muted/20 px-2 py-0.5 text-xs'
                >
                  {selectedValues.length}
                </Badge>
                <span>{selectedValues.length === 1 ? 'tag selected' : 'tags selected'}</span>
              </>
            ) : (
              <span className='text-muted-foreground'>Select workflow tags</span>
            )}
          </span>
          <ChevronsUpDownIcon
            className='text-muted-foreground/80 size-4 shrink-0'
            aria-hidden='true'
          />
        </PopoverTrigger>
        <PopoverContent className='w-(--radix-popper-anchor-width) rounded-2xl border-border/60 p-0 shadow-sm'>
          <Command>
            <CommandInput placeholder='Search workflow tags...' className='h-10 px-2' />
            <CommandList>
              <CommandEmpty>No workflow tag found.</CommandEmpty>
              <CommandGroup>
                {workflowTags.map((tag) => (
                  <CommandItem
                    key={tag.value}
                    value={tag.value}
                    onSelect={() => toggleSelection(tag.value)}
                    className='flex items-center rounded-lg'
                  >
                    <span className='min-w-0 flex-1 truncate'>{tag.label}</span>
                    {selectedValues.includes(tag.value) && (
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

export default Combobox12
