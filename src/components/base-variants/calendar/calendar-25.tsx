'use client'

import { type ComponentProps, useState } from 'react'

import { Calendar, CalendarDayButton } from '@/components/ui/calendar'

type CalendarComponents = NonNullable<ComponentProps<typeof Calendar>['components']>
type CalendarDayButtonProps = ComponentProps<typeof CalendarDayButton>

const initialSelectedDate: Date = new Date()
const minimumAvailableDate: Date = new Date()

function getPriceForDate(date: Date): number {
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()
  const randomValue = (seed * 9301 + 49297) % 233280

  return Math.floor(50 + (randomValue / 233280) * 200)
}

const calendarComponents = {
  DayButton: ({ children, modifiers, day, ...props }: CalendarDayButtonProps) => {
    const price = getPriceForDate(day.date)
    const isLowPrice = price < 100

    return (
      <CalendarDayButton day={day} modifiers={modifiers} {...props}>
        {children}
        {!modifiers.outside && (
          <span
            className={
              isLowPrice
                ? 'font-medium text-emerald-600 dark:text-emerald-400'
                : 'text-muted-foreground'
            }
          >
            ${price}
          </span>
        )}
      </CalendarDayButton>
    )
  }
} satisfies CalendarComponents

const Calendar25 = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialSelectedDate
  )

  return (
    <div>
      <Calendar
        mode='single'
        selected={selectedDate}
        onSelect={setSelectedDate}
        showOutsideDays={false}
        className='rounded-[1.75rem] border border-border/60 bg-muted/10 p-3 shadow-sm [--cell-size:--spacing(12)]'
        components={calendarComponents}
        disabled={{ before: minimumAvailableDate }}
      />
      <p
        className='text-muted-foreground mt-4 text-center text-[11px] uppercase tracking-wide'
        role='region'
      >
        Calendar with pricing
      </p>
    </div>
  )
}

export default Calendar25
