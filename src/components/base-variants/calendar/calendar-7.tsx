'use client'

import { useState } from 'react'

import { type DateRange } from 'react-day-picker'

import { Calendar } from '@/components/ui/calendar'

const initialDateRange: DateRange = {
  from: new Date(2025, 5, 17),
  to: new Date(2025, 5, 20)
}

const disabledWeekend = {
  dayOfWeek: [0, 6]
}

const Calendar7 = () => {
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>(initialDateRange)

  return (
    <div>
      <Calendar
        mode='range'
        defaultMonth={selectedDateRange?.from}
        selected={selectedDateRange}
        onSelect={setSelectedDateRange}
        disabled={disabledWeekend}
        className='rounded-2xl border border-border/60 p-2 shadow-sm'
        excludeDisabled
      />
      <p className='mt-3 text-center text-xs text-muted-foreground' role='region'>
        Weekends unavailable
      </p>
    </div>
  )
}

export default Calendar7
