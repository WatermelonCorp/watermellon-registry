'use client'

import { useState } from 'react'

import { Calendar } from '@/components/ui//calendar'


const Calendar2: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div>
      <Calendar
        mode="single"
        defaultMonth={date}
        numberOfMonths={2}
        selected={date}
        onSelect={setDate}
        classNames={{
          today: "!bg-transparent",
          day_button: "!ring-0 !ring-offset-0 focus:!ring-0 focus-visible:!ring-0"
        }}
        className="!border-0 !bg-transparent transition-all !ring-0 !ring-offset-0 focus:!ring-0 focus:!ring-offset-0 focus-visible:!ring-0 focus-visible:!ring-offset-0 [&_*]:!ring-0 [&_*]:!ring-offset-0 [&_*]:focus:!ring-0 [&_*]:focus-visible:!ring-0 [&_.rdp-day_today]:!bg-transparent"
      />
      <p className="text-muted-foreground mt-4 text-center text-xs" role="region">
        Multi month calendar
      </p>
    </div>
  );
}

export default Calendar2
