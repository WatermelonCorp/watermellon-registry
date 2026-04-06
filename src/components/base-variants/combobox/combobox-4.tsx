'use client'

import { useId, useState, type ComponentType, type SVGProps } from 'react'

import {
  BriefcaseIcon,
  CheckIcon,
  ChevronsUpDownIcon,
  CodeIcon,
  FolderKanbanIcon,
  LayoutGridIcon,
  ShieldCheckIcon,
  UsersIcon
} from 'lucide-react'

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

type IndustryOption = {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  label: string
  value: string
}

const industries = [
  {
    value: 'product',
    label: 'Product',
    icon: FolderKanbanIcon
  },
  {
    value: 'design',
    label: 'Design',
    icon: CodeIcon
  },
  {
    value: 'marketing',
    label: 'Marketing',
    icon: UsersIcon
  },
  {
    value: 'operations',
    label: 'Operations',
    icon: LayoutGridIcon
  },
  {
    value: 'support',
    label: 'Support',
    icon: BriefcaseIcon
  },
  {
    value: 'legal',
    label: 'Legal',
    icon: ShieldCheckIcon
  },
  {
    value: 'people',
    label: 'People',
    icon: BriefcaseIcon
  }
] as const satisfies readonly IndustryOption[]

type IndustryValue = (typeof industries)[number]['value']
type IndustryOptionMap = Record<IndustryValue, (typeof industries)[number]>

const industryByValue: IndustryOptionMap = {
  product: industries[0],
  design: industries[1],
  marketing: industries[2],
  operations: industries[3],
  support: industries[4],
  legal: industries[5],
  people: industries[6]
}

const isIndustryValue = (value: string): value is IndustryValue =>
  industries.some((industry) => industry.value === value)

const Combobox4 = () => {
  const id = useId()
  const [open, setOpen] = useState<boolean>(false)
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryValue | ''>(
    ''
  )

  const selectedIndustryOption = selectedIndustry
    ? industryByValue[selectedIndustry]
    : undefined
  const SelectedIcon = selectedIndustryOption?.icon

  return (
    <div className='w-full max-w-xs space-y-2'>
      <Label htmlFor={id} className='text-sm font-medium'>
        Choose a team area
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          id={id}
          role='combobox'
          aria-expanded={open}
          className='flex h-10 w-full items-center justify-between rounded-[1rem] border border-border/60 bg-background px-3.5 text-sm font-normal shadow-xs outline-offset-0 outline-none transition-colors hover:bg-accent/20 focus-visible:ring-[3px] focus-visible:ring-ring/50'
        >
          {selectedIndustryOption ? (
            <span className='flex min-w-0 items-center gap-2'>
              {SelectedIcon && (
                <SelectedIcon className='text-muted-foreground size-4' />
              )}
              <span className='truncate'>{selectedIndustryOption.label}</span>
            </span>
          ) : (
            <span className='text-muted-foreground'>Select team area</span>
          )}
          <ChevronsUpDownIcon
            className='text-muted-foreground/80 size-4 shrink-0'
            aria-hidden='true'
          />
        </PopoverTrigger>
        <PopoverContent
          className='w-full min-w-[var(--radix-popper-anchor-width)] rounded-[1rem] border-border/60 p-0 shadow-sm'
          align='start'
        >
          <Command>
            <CommandInput placeholder='Search team areas...' className='h-9 px-1' />
            <CommandList>
              <CommandEmpty>No team area found.</CommandEmpty>
              <CommandGroup>
                {industries.map((industry) => {
                  const Icon = industry.icon

                  return (
                    <CommandItem
                      key={industry.value}
                      value={industry.value}
                      onSelect={currentValue => {
                        if (currentValue === selectedIndustry) {
                          setSelectedIndustry('')
                          setOpen(false)
                          return
                        }

                        if (!isIndustryValue(currentValue)) {
                          return
                        }

                        setSelectedIndustry(currentValue)
                        setOpen(false)
                      }}
                      className='flex items-center justify-between rounded-md'
                    >
                      <div className='flex items-center gap-2'>
                        <Icon className='text-muted-foreground size-4' />
                        {industry.label}
                      </div>
                      {selectedIndustry === industry.value && (
                        <CheckIcon className='text-muted-foreground/80 size-4' />
                      )}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default Combobox4
