'use client'

import { useState } from 'react'

import { Calendar } from '@/components/ui//calendar'

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
        classNames={{
          today: '!bg-transparent',
          day_button: '!ring-0 !ring-offset-0 focus:!ring-0 focus-visible:!ring-0'
        }}
        className='!border-0 !bg-transparent transition-all !ring-0 !ring-offset-0 focus:!ring-0 focus:!ring-offset-0 focus-visible:!ring-0 focus-visible:!ring-offset-0 [&_*]:!ring-0 [&_*]:!ring-offset-0 [&_*]:focus:!ring-0 [&_*]:focus-visible:!ring-0 [&_.rdp-day_today]:!bg-transparent'
      />
      <p className='mt-3 text-center text-xs text-muted-foreground' role='region'>
        Past dates disabled
      </p>
    </div>
  )
}

export default Calendar6
