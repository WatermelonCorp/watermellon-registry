'use client'

import { useState } from 'react'

import { type DateRange } from 'react-day-picker'

import { Calendar } from '@/components/ui//calendar'

const Calendar3 = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2025, 5, 4),
    to: new Date(2025, 5, 17)
  })

  return (
    <div>
      <Calendar
        mode="range"
        selected={dateRange}
        defaultMonth={dateRange?.from}
        onSelect={setDateRange}
        classNames={{
          today: "!bg-transparent",
          day_button: "!ring-0 !ring-offset-0 focus:!ring-0 focus-visible:!ring-0"
        }}
        className="!border-0 !bg-transparent transition-all !ring-0 !ring-offset-0 focus:!ring-0 focus:!ring-offset-0 focus-visible:!ring-0 focus-visible:!ring-offset-0 [&_*]:!ring-0 [&_*]:!ring-offset-0 [&_*]:focus:!ring-0 [&_*]:focus-visible:!ring-0 [&_.rdp-day_today]:!bg-transparent"
      />
      <p className="text-muted-foreground mt-3 text-center text-xs" role="region">
        Single month calendar with range selection
      </p>
    </div>
  )
}

export default Calendar3
