'use client'

import { useId, useMemo, useState } from 'react'

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

type TimezoneOption = {
  label: string
  numericOffset: number
  value: string
}

const Combobox7 = () => {
  const id = useId()
  const [open, setOpen] = useState<boolean>(false)
  const [selectedTimezone, setSelectedTimezone] = useState<string>(
    'Indian/Cocos'
  )

  const supportedTimezones = Intl.supportedValuesOf('timeZone')

  const formattedTimezones = useMemo<TimezoneOption[]>(() => {
    return supportedTimezones
      .map((timezone) => {
        const formatter = new Intl.DateTimeFormat('en', {
          timeZone: timezone,
          timeZoneName: 'shortOffset'
        })

        const parts = formatter.formatToParts(new Date())
        const offset =
          parts.find((part) => part.type === 'timeZoneName')?.value ?? ''
        const formattedOffset = offset === 'GMT' ? 'GMT+0' : offset

        return {
          value: timezone,
          label: `(${formattedOffset}) ${timezone.replace(/_/g, ' ')}`,
          numericOffset: Number.parseInt(
            formattedOffset.replace('GMT', '').replace('+', '') || '0',
            10
          )
        }
      })
      .sort((firstTimezone, secondTimezone) => firstTimezone.numericOffset - secondTimezone.numericOffset)
  }, [supportedTimezones])

  const selectedTimezoneLabel =
    formattedTimezones.find((timezone) => timezone.value === selectedTimezone)
      ?.label ?? ''

  return (
    <div className='w-full max-w-xs space-y-2'>
      <Label htmlFor={id} className='text-sm font-medium'>
        Timezone picker
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          id={id}
          role='combobox'
          aria-expanded={open}
          className='flex h-10 w-full items-center justify-between rounded-xl border border-border/60 bg-background px-3.5 text-sm shadow-xs outline-none transition-colors hover:bg-accent/20 focus-visible:ring-[3px] focus-visible:ring-ring/50'
        >
          <span className={cn('truncate', !selectedTimezone && 'text-muted-foreground')}>
            {selectedTimezone ? (
              selectedTimezoneLabel
            ) : (
              <span className='text-muted-foreground'>Select timezone</span>
            )}
          </span>
          <ChevronsUpDownIcon
            className='text-muted-foreground/80 size-4 shrink-0'
            aria-hidden='true'
          />
        </PopoverTrigger>
        <PopoverContent className='w-(--radix-popper-anchor-width) rounded-xl border-border/60 p-0 shadow-sm'>
          <Command>
            <CommandInput placeholder='Search timezone' className='h-9 px-1' />
            <CommandList>
              <CommandEmpty>No timezone found.</CommandEmpty>
              <CommandGroup>
                {formattedTimezones.map(({ value: timezoneValue, label }) => (
                  <CommandItem
                    key={timezoneValue}
                    value={timezoneValue}
                    onSelect={currentValue => {
                      setSelectedTimezone(
                        currentValue === selectedTimezone ? '' : currentValue
                      )
                      setOpen(false)
                    }}
                    className='rounded-md'
                  >
                    <span className='truncate'>{label}</span>
                    {selectedTimezone === timezoneValue && (
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

export default Combobox7
