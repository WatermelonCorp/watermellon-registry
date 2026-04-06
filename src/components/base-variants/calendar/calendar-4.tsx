'use client'

import { useState } from 'react'

import { type DateRange } from 'react-day-picker'

import { Calendar } from '@/components/ui/calendar'

const initialDateRange: DateRange = {
  from: new Date(2025, 4, 22),
  to: new Date(2025, 5, 17)
}

const Calendar4 = () => {
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>(initialDateRange)

  return (
    <div>
      <Calendar
        mode='range'
        defaultMonth={selectedDateRange?.from}
        selected={selectedDateRange}
        onSelect={setSelectedDateRange}
        numberOfMonths={2}
        className='rounded-2xl border border-border/60 p-3 shadow-sm'
      />
      <p className='mt-3 text-center text-xs text-muted-foreground' role='region'>
        Two-month range picker
      </p>
    </div>
  )
}

export default Calendar4
