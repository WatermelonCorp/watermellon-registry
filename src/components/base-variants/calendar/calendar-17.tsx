'use client'

import { useState } from 'react'

import { Calendar } from '@/components/ui//calendar'

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
        classNames={{
          today: '!bg-transparent',
          day_button: '!ring-0 !ring-offset-0 focus:!ring-0 focus-visible:!ring-0'
        }}
        className='!border-0 !bg-transparent transition-all !ring-0 !ring-offset-0 focus:!ring-0 focus:!ring-offset-0 focus-visible:!ring-0 focus-visible:!ring-offset-0 [&_*]:!ring-0 [&_*]:!ring-offset-0 [&_*]:focus:!ring-0 [&_*]:focus-visible:!ring-0 [&_.rdp-day_today]:!bg-transparent'
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
