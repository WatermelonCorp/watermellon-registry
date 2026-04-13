'use client'

import { useState } from 'react'

import { Calendar } from '@/components/ui//calendar'


const Calendar1: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  return (
    <section className="flex flex-col items-center max-w-xs mx-auto">
      <Calendar
        mode="single"
        defaultMonth={selectedDate}
        selected={selectedDate}
        onSelect={setSelectedDate}
        classNames={{
          today: "!bg-transparent",
          day_button: "!ring-0 !ring-offset-0 focus:!ring-0 focus-visible:!ring-0"
        }}
        className="transition-all !ring-0 !ring-offset-0 focus:!ring-0 focus:!ring-offset-0 focus-visible:!ring-0 focus-visible:!ring-offset-0 [&_*]:!ring-0 [&_*]:!ring-offset-0 [&_*]:focus:!ring-0 [&_*]:focus-visible:!ring-0 [&_.rdp-day_today]:!bg-transparent"
      />
      <p className="mt-4 text-center text-xs text-muted-foreground font-light tracking-wide" role="region">
        Monthly date picker
      </p>
    </section>
  );
}

export default Calendar1
