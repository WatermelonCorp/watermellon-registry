'use client'

import { useState } from 'react'

import { Calendar } from '@/components/ui//calendar'

const Calendar10 = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  return (
    <div className='@container mx-auto w-full max-w-md px-2 sm:px-0'>
      <Calendar
        mode='single'
        defaultMonth={selectedDate}
        selected={selectedDate}
        onSelect={setSelectedDate}
        classNames={{
          today: '!bg-transparent',
          day_button: '!ring-0 !ring-offset-0 focus:!ring-0 focus-visible:!ring-0'
        }}
        className='w-full !border-0 !bg-transparent transition-all !ring-0 !ring-offset-0 focus:!ring-0 focus:!ring-offset-0 focus-visible:!ring-0 focus-visible:!ring-offset-0 [&_*]:!ring-0 [&_*]:!ring-offset-0 [&_*]:focus:!ring-0 [&_*]:focus-visible:!ring-0 [&_.rdp-day_today]:!bg-transparent [--cell-size:clamp(--spacing(8),10cqw,--spacing(13))]'
      />
      <p className='mt-3 text-center text-xs text-muted-foreground sm:text-[11px]' role='region'>
        Large cell calendar
      </p>
    </div>
  )
}

export default Calendar10
