'use client'

import { useState } from 'react'

import { Calendar } from '@/components/ui/calendar'

const initialSelectedDates: Date[] = [new Date(2025, 5, 12), new Date(2025, 5, 17)]

const Calendar12 = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>(initialSelectedDates)

  return (
    <div>
      <Calendar
        mode='multiple'
        required
        selected={selectedDates}
        onSelect={setSelectedDates}
        max={5}
        className='rounded-2xl border border-border/60 p-2 shadow-sm'
      />
      <p className='mt-3 text-center text-xs text-muted-foreground' role='region'>
        Multi-day selector
      </p>
    </div>
  )
}

export default Calendar12
