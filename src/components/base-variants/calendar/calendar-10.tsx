'use client'

import { useState } from 'react'

import { Calendar } from '@/components/ui/calendar'

const initialSelectedDate = new Date()

const Calendar10 = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(initialSelectedDate)

  return (
    <div>
      <Calendar
        mode='single'
        selected={selectedDate}
        onSelect={setSelectedDate}
        className='rounded-2xl border border-border/60 p-2 shadow-sm [--cell-size:--spacing(11)] md:[--cell-size:--spacing(13)]'
      />
      <p className='mt-3 text-center text-xs text-muted-foreground' role='region'>
        Large cell calendar
      </p>
    </div>
  )
}

export default Calendar10
