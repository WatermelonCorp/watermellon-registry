'use client'

import { useState } from 'react'

import { type DateRange } from 'react-day-picker'

import { Calendar } from '@/components/ui//calendar'

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
        classNames={{
          today: '!bg-transparent',
          day_button: '!ring-0 !ring-offset-0 focus:!ring-0 focus-visible:!ring-0'
        }}
        className='!border-0 !bg-transparent transition-all !ring-0 !ring-offset-0 focus:!ring-0 focus:!ring-offset-0 focus-visible:!ring-0 focus-visible:!ring-offset-0 [&_*]:!ring-0 [&_*]:!ring-offset-0 [&_*]:focus:!ring-0 [&_*]:focus-visible:!ring-0 [&_.rdp-day_today]:!bg-transparent'
      />
      <p className='mt-3 text-center text-xs text-muted-foreground' role='region'>
        Minimum 5-day range
      </p>
    </div>
  )
}

export default Calendar5
