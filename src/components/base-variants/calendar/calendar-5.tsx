'use client'

import { useState } from 'react'

import { type DateRange } from 'react-day-picker'

import { Calendar } from '@/components/ui/calendar'

const initialDateRange: DateRange = {
  from: new Date(2025, 5, 8),
  to: new Date(2025, 5, 17)
}

const Calendar5 = () => {
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>(initialDateRange)

  return (
    <div>
      <Calendar
        mode='range'
        defaultMonth={selectedDateRange?.from}
        selected={selectedDateRange}
        onSelect={setSelectedDateRange}
        numberOfMonths={1}
        min={5}
        className='rounded-2xl border border-border/60 p-3 shadow-sm'
      />
      <p className='mt-3 text-center text-xs text-muted-foreground' role='region'>
        Minimum 5-day range
      </p>
    </div>
  )
}

export default Calendar5
