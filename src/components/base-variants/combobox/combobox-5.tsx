'use client'

import { useId, useState } from 'react'

import { CircleCheckIcon, ChevronsUpDownIcon } from 'lucide-react'

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

const frameworks = [
  {
    value: 'research',
    label: 'Research'
  },
  {
    value: 'planning',
    label: 'Planning'
  },
  {
    value: 'design',
    label: 'Design'
  },
  {
    value: 'testing',
    label: 'Testing'
  },
  {
    value: 'delivery',
    label: 'Delivery'
  }
] as const

type FrameworkOption = (typeof frameworks)[number]
type FrameworkValue = FrameworkOption['value']

const frameworkLabelByValue: Record<FrameworkValue, FrameworkOption['label']> = {
  research: 'Research',
  planning: 'Planning',
  design: 'Design',
  testing: 'Testing',
  delivery: 'Delivery'
}

const isFrameworkValue = (value: string): value is FrameworkValue =>
  frameworks.some((framework) => framework.value === value)

const Combobox5 = () => {
  const id = useId()
  const [open, setOpen] = useState<boolean>(false)
  const [selectedFramework, setSelectedFramework] = useState<FrameworkValue | ''>(
    ''
  )

  return (
    <div className='w-full max-w-xs space-y-2'>
      <Label htmlFor={id} className='text-sm font-medium'>
        Workflow stage
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          id={id}
          role='combobox'
          aria-expanded={open}
          className='flex h-10 w-full items-center justify-between rounded-xl border border-border/60 bg-background px-3 text-sm shadow-xs outline-none transition-colors hover:bg-accent/20 focus-visible:ring-[3px] focus-visible:ring-ring/50'
        >
          {selectedFramework ? (
            frameworkLabelByValue[selectedFramework]
          ) : (
            <span className='text-muted-foreground'>Select stage</span>
          )}
          <ChevronsUpDownIcon className='size-4 opacity-50' />
        </PopoverTrigger>
        <PopoverContent className='w-[var(--radix-popover-trigger-width)] rounded-xl border-border/60 p-0 shadow-sm'>
          <Command>
            <CommandInput placeholder='Search stage...' className='h-9' />
            <CommandList>
              <CommandEmpty>No stage found.</CommandEmpty>
              <CommandGroup>
                {frameworks.map(framework => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
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
                    <CircleCheckIcon
                      className={cn(
                        'ml-auto size-4 fill-sky-500 stroke-white dark:fill-sky-400',
                        selectedFramework === framework.value
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
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

export default Combobox5
