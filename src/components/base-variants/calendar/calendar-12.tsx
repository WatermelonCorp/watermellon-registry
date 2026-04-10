'use client'

import { useState } from 'react'

import { Calendar } from '@/components/ui//calendar'

const Calendar12 = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([new Date()])

  return (
    <div>
      <Calendar
        mode='multiple'
        required
        defaultMonth={selectedDates[0]}
        selected={selectedDates}
        onSelect={setSelectedDates}
        max={5}
        classNames={{
          today: '!bg-transparent',
          day_button: '!ring-0 !ring-offset-0 focus:!ring-0 focus-visible:!ring-0'
        }}
        className='!border-0 !bg-transparent transition-all !ring-0 !ring-offset-0 focus:!ring-0 focus:!ring-offset-0 focus-visible:!ring-0 focus-visible:!ring-offset-0 [&_*]:!ring-0 [&_*]:!ring-offset-0 [&_*]:focus:!ring-0 [&_*]:focus-visible:!ring-0 [&_.rdp-day_today]:!bg-transparent'
      />
      <p className='mt-3 text-center text-xs text-muted-foreground' role='region'>
        Multi-day selector
      </p>
    </div>
  )
}

export default Calendar12
