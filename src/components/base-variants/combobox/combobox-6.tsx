'use client'

import { useId, useState } from 'react'

import { CheckIcon, ChevronsUpDownIcon, PlusIcon } from 'lucide-react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { cn } from '@/lib/utils'

const universities = [
  {
    value: 'atlas',
    label: 'Atlas Workspace'
  },
  {
    value: 'notion-lab',
    label: 'Notion Lab'
  },
  {
    value: 'north-star',
    label: 'North Star'
  },
  {
    value: 'field-note',
    label: 'Field Note'
  }
] as const

type UniversityOption = (typeof universities)[number]
type UniversityValue = UniversityOption['value']

const universityLabelByValue: Record<UniversityValue, UniversityOption['label']> =
  {
    atlas: 'Atlas Workspace',
    'notion-lab': 'Notion Lab',
    'north-star': 'North Star',
    'field-note': 'Field Note'
  }

const isUniversityValue = (value: string): value is UniversityValue =>
  universities.some((university) => university.value === value)

const Combobox6 = () => {
  const id = useId()
  const [open, setOpen] = useState<boolean>(false)
  const [selectedUniversity, setSelectedUniversity] =
    useState<UniversityValue>('atlas')

  return (
    <div className='w-full max-w-xs space-y-2'>
      <Label htmlFor={id} className='text-sm font-medium'>
        Workspace picker
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          id={id}
          role='combobox'
          aria-expanded={open}
          className='flex h-10 w-full items-center justify-between rounded-3xl border border-border/60 bg-background px-3.5 text-sm font-normal shadow-xs outline-offset-0 outline-none transition-colors hover:bg-accent/20 focus-visible:ring-[3px] focus-visible:ring-ring/50'
        >
          <span
            className={cn(
              'truncate',
              !selectedUniversity && 'text-muted-foreground'
            )}
          >
            {selectedUniversity ? (
              universityLabelByValue[selectedUniversity]
            ) : (
              <span className='text-muted-foreground'>Select workspace</span>
            )}
          </span>
          <ChevronsUpDownIcon
            className='text-muted-foreground/80 size-4 shrink-0'
            aria-hidden='true'
          />
        </PopoverTrigger>
        <PopoverContent
          className='w-full min-w-(--radix-popper-anchor-width) overflow-hidden rounded-3xl border border-border/60 p-0 shadow-sm'
          align='start'
        >
          <Command className='rounded-3xl!'>
            <CommandInput placeholder='Find workspace' className='h-9 px-1' />
            <CommandList>
              <CommandEmpty>No workspace found.</CommandEmpty>
              <CommandGroup>
                {universities.map(university => (
                  <CommandItem
                    key={university.value}
                    value={university.value}
                    onSelect={currentValue => {
                      if (!isUniversityValue(currentValue)) {
                        return
                      }

                      setSelectedUniversity(currentValue)
                      setOpen(false)
                    }}
                    className='flex items-center rounded-md'
                  >
                    <span className='min-w-0 flex-1 truncate'>
                      {university.label}
                    </span>
                    {selectedUniversity === university.value && (
                      <CheckIcon size={16} className='ml-auto shrink-0' />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <button
                  type='button'
                  className='hover:bg-accent/30 flex h-9 w-full items-center justify-start gap-2 rounded-md px-2 text-sm font-normal'
                >
                  <PlusIcon className='-ms-2 size-4 opacity-60' aria-hidden='true' />
                  New workspace
                </button>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default Combobox6
