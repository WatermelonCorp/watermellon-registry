'use client'

import { useState } from 'react'

import { Calendar } from '@/components/ui/calendar'


const Calendar1: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  return (
    <section className="flex flex-col items-center p-6 bg-transparent rounded-2xl max-w-xs mx-auto">
      <Calendar
        mode="single"
        defaultMonth={selectedDate}
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="rounded-lg border border-border/60 shadow-md transition-all focus:ring-2 focus:ring-primary/50"
      />
      <p className="mt-4 text-center text-xs text-muted-foreground font-light tracking-wide" role="region">
        Monthly date picker
      </p>
    </section>
  );
}

export default Calendar1
