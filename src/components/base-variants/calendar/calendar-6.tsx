'use client'

import { useState } from 'react'

import { Calendar } from '@/components/ui/calendar'

const initialSelectedDate = new Date(2025, 5, 18)
const minimumAvailableDate = new Date(2025, 5, 12)

const Calendar6 = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(initialSelectedDate)

  return (
    <div>
      <Calendar
        mode='single'
        defaultMonth={selectedDate}
        selected={selectedDate}
        onSelect={setSelectedDate}
        disabled={{
          before: minimumAvailableDate
        }}
        className='rounded-2xl border border-border/60 p-3 shadow-sm'
      />
      <p className='mt-3 text-center text-xs text-muted-foreground' role='region'>
        Past dates disabled
      </p>
    </div>
  )
}

export default Calendar6
