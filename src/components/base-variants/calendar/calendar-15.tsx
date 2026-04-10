'use client'

import type { ComponentProps } from 'react'
import { useState } from 'react'

import { Calendar } from '@/components/ui//calendar'

type CalendarClassNames = NonNullable<ComponentProps<typeof Calendar>['classNames']>

const initialSelectedDate: Date = new Date()

const calendarClassNames = {
  month_caption: 'flex h-8 items-center justify-start px-1',
  nav: 'absolute inset-x-0 top-0 flex w-full items-center justify-end',
  today: '!bg-transparent',
  day_button: '!ring-0 !ring-offset-0 focus:!ring-0 focus-visible:!ring-0'
} satisfies CalendarClassNames

const Calendar15 = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(initialSelectedDate)

  return (
    <div>
      <Calendar
        mode='single'
        selected={selectedDate}
        defaultMonth={selectedDate}
        onSelect={setSelectedDate}
        className='!border-0 !bg-transparent transition-all !ring-0 !ring-offset-0 focus:!ring-0 focus:!ring-offset-0 focus-visible:!ring-0 focus-visible:!ring-offset-0 [&_*]:!ring-0 [&_*]:!ring-offset-0 [&_*]:focus:!ring-0 [&_*]:focus-visible:!ring-0 [&_.rdp-day_today]:!bg-transparent'
        classNames={calendarClassNames}
      />
      <p className='mt-3 text-center text-xs text-muted-foreground' role='region'>
        Right-aligned month navigation
      </p>
    </div>
  )
}

export default Calendar15
