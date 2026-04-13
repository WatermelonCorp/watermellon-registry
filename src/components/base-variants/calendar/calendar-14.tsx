'use client'

import type { ComponentProps } from 'react'
import { useState } from 'react'

import { type DateRange } from 'react-day-picker'

import { Calendar } from '@/components/ui//calendar'

type CalendarClassNames = NonNullable<ComponentProps<typeof Calendar>['classNames']>

const initialSelectedDateRange: DateRange = {
  from: new Date(2025, 5, 4),
  to: new Date(2025, 5, 17)
}

const calendarClassNames = {
  range_start: 'rounded-l-full bg-orange-500/20 dark:bg-orange-400/10',
  range_end: 'rounded-r-full bg-orange-500/20 dark:bg-orange-400/10',
  day_button:
    '!ring-0 !ring-offset-0 focus:!ring-0 focus-visible:!ring-0 data-[range-end=true]:rounded-full! data-[range-start=true]:rounded-full! data-[range-start=true]:bg-orange-500! data-[range-start=true]:text-white! data-[range-start=true]:dark:bg-orange-400! data-[range-end=true]:bg-orange-500! data-[range-end=true]:text-white! data-[range-end=true]:dark:bg-orange-400! data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-orange-500/20 data-[range-middle=true]:dark:bg-orange-400/10 hover:rounded-full',
  today:
    'rounded-full bg-muted/60! data-[selected=true]:rounded-l-none! data-[selected=true]:bg-orange-500/20! dark:data-[selected=true]:bg-orange-400/10! [&_button[data-range-middle=true]]:bg-transparent!'
} satisfies CalendarClassNames

const Calendar14 = () => {
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>(initialSelectedDateRange)

  return (
    <div>
      <Calendar
        mode='range'
        defaultMonth={selectedDateRange?.from}
        selected={selectedDateRange}
        onSelect={setSelectedDateRange}
        className='rounded-2xl border border-border/60 p-3 shadow-sm'
        classNames={calendarClassNames}
      />
      <p className='mt-3 text-center text-xs text-muted-foreground' role='region'>
        Soft range selection calendar
      </p>
    </div>
  )
}

export default Calendar14
