'use client'

import type { ComponentProps } from 'react'
import { useState } from 'react'

import { Calendar } from '@/components/ui//calendar'

type CalendarClassNames = NonNullable<ComponentProps<typeof Calendar>['classNames']>

const initialSelectedDate: Date = new Date()

const calendarClassNames = {
  day_button:
    'rounded-full! !ring-0 !ring-offset-0 focus:!ring-0 focus-visible:!ring-0 data-[selected-single=true]:bg-orange-500! data-[selected-single=true]:text-white! data-[selected-single=true]:dark:bg-orange-400!',
  today: 'rounded-full! bg-muted/60!'
} satisfies CalendarClassNames

const Calendar13 = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(initialSelectedDate)

  return (
    <div>
      <Calendar
        mode='single'
        selected={selectedDate}
        onSelect={setSelectedDate}
        className='rounded-[1.75rem] border border-border/60 p-3 shadow-sm'
        classNames={calendarClassNames}
      />
      <p className='mt-3 text-center text-xs text-muted-foreground' role='region'>
        Rounded selected-day calendar
      </p>
    </div>
  )
}

export default Calendar13
