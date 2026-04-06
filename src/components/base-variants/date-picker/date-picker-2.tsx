'use client'

import type { ComponentProps } from 'react'
import { useId, useState } from 'react'

import { ChevronDownIcon } from 'lucide-react'
import { type DateRange } from 'react-day-picker'

import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type CalendarClassNames = NonNullable<ComponentProps<typeof Calendar>['classNames']>

const formatDateRange = (range: DateRange) => {
  if (range.from && range.to) {
    return `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`
  }

  if (range.from) {
    return range.from.toLocaleDateString()
  }

  return 'Pick a date range'
}

const calendarClassNames = {
  range_start: 'rounded-l-full bg-slate-900/10 dark:bg-white/10',
  range_end: 'rounded-r-full bg-slate-900/10 dark:bg-white/10',
  day_button:
    'data-[range-end=true]:rounded-full! data-[range-start=true]:rounded-full! data-[range-start=true]:bg-slate-900! data-[range-start=true]:text-white! data-[range-start=true]:dark:bg-white! data-[range-start=true]:dark:text-slate-950! data-[range-end=true]:bg-slate-900! data-[range-end=true]:text-white! data-[range-end=true]:dark:bg-white! data-[range-end=true]:dark:text-slate-950! data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-slate-900/10 data-[range-middle=true]:dark:bg-white/10 hover:rounded-full',
  today:
    'rounded-full bg-muted/60! data-[selected=true]:rounded-l-none! data-[selected=true]:bg-slate-900/10! dark:data-[selected=true]:bg-white/10!'
} satisfies CalendarClassNames

const DatePicker2 = () => {
  const id = useId()
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    undefined
  )

  return (
    <div className='w-full max-w-xs space-y-2'>
      <Label htmlFor={id} className='px-1 text-sm font-medium'>
        Date range
      </Label>
      <Popover>
        <PopoverTrigger
          id={id}
          className='flex h-11 w-full items-center justify-between rounded-2xl border border-border/60 bg-background px-3.5 text-sm font-normal shadow-xs outline-none transition-colors hover:bg-accent/10 focus-visible:ring-[3px] focus-visible:ring-ring/50'
        >
          <span
            className={
              selectedRange?.from ? 'text-foreground' : 'text-muted-foreground'
            }
          >
            {selectedRange ? formatDateRange(selectedRange) : 'Pick a date range'}
          </span>
          <ChevronDownIcon className='size-4 text-muted-foreground/80' />
        </PopoverTrigger>
        <PopoverContent
          className='w-auto overflow-hidden rounded-2xl border-border/60 p-0 shadow-sm'
          align='start'
        >
          <Calendar
            mode='range'
            selected={selectedRange}
            classNames={calendarClassNames}
            onSelect={(range) => {
              setSelectedRange(range)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DatePicker2
