'use client'

import { useState } from 'react'

import { Calendar } from '@/components/ui/calendar'

const initialSelectedDate = new Date()

const Calendar10 = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(initialSelectedDate)

  return (
    <div className='@container mx-auto w-full max-w-md px-2 sm:px-0'>
      <Calendar
        mode='single'
        selected={selectedDate}
        onSelect={setSelectedDate}
        className='w-full rounded-2xl border border-border/60 p-2 shadow-sm [--cell-size:clamp(--spacing(8),10cqw,--spacing(13))]'
      />
      <p className='mt-3 text-center text-xs text-muted-foreground sm:text-[11px]' role='region'>
        Large cell calendar
      </p>
    </div>
  )
}

export default Calendar10
