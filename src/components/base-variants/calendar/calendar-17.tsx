'use client'

import { useState } from 'react'

import { Calendar } from '@/components/ui/calendar'

const initialSelectedDate: Date = new Date()

const Calendar17 = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialSelectedDate
  )

  return (
    <div>
      <Calendar
        mode='single'
        defaultMonth={selectedDate}
        selected={selectedDate}
        onSelect={setSelectedDate}
        className='rounded-[1.75rem] border border-border/60 bg-muted/10 p-3 shadow-sm'
        showWeekNumber
      />
      <p
        className='text-muted-foreground mt-4 text-center text-[11px] tracking-wide uppercase'
        role='region'
      >
        Calendar with week numbers
      </p>
    </div>
  )
}

export default Calendar17
