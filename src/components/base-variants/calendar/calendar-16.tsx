'use client'

import type { ComponentProps } from 'react'
import { useState } from 'react'

import { Calendar } from '@/components/ui/calendar'

type CalendarClassNames = NonNullable<ComponentProps<typeof Calendar>['classNames']>

const initialSelectedDate: Date = new Date()

const calendarClassNames = {
  month_caption: 'flex h-8 items-center justify-end px-1',
  nav: 'absolute inset-x-0 top-0 flex w-full items-center justify-start'
} satisfies CalendarClassNames

const Calendar16 = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(initialSelectedDate)

  return (
    <div>
      <Calendar
        mode='single'
        selected={selectedDate}
        defaultMonth={selectedDate}
        onSelect={setSelectedDate}
        className='rounded-2xl border border-border/60 p-3 shadow-sm'
        classNames={calendarClassNames}
      />
      <p className='mt-3 text-center text-xs text-muted-foreground' role='region'>
        Left-aligned month navigation
      </p>
    </div>
  )
}

export default Calendar16
