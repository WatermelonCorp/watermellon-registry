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
      <CalendarDayButton
        day={day}
        modifiers={modifiers}
        {...props}
        className='flex-col gap-0.5 px-1 py-1 sm:gap-1 sm:px-2 sm:py-2'
      >
        {children}
        {!modifiers.outside && (
          <span
            className={
              modifiers.selected
                ? 'text-[0.6rem] leading-none text-zinc-100 opacity-100 sm:text-xs'
                : isLowPrice
                  ? 'text-[0.6rem] leading-none font-medium text-emerald-600 dark:text-emerald-400 sm:text-xs'
                  : 'text-[0.6rem] leading-none text-muted-foreground sm:text-xs'
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
    <div className='mx-auto w-full max-w-[20rem] px-2 sm:max-w-[24rem] sm:px-0 lg:max-w-104'>
      <Calendar
        mode='single'
        selected={selectedDate}
        onSelect={setSelectedDate}
        showOutsideDays={false}
        className='w-full rounded-[1.75rem] border border-border/60 bg-muted/10 p-2 shadow-sm [--cell-size:--spacing(8)] sm:p-3 sm:[--cell-size:--spacing(10)] lg:[--cell-size:--spacing(12)]'
        components={calendarComponents}
        disabled={{ before: minimumAvailableDate }}
      />
      <p
        className='text-muted-foreground mt-4 text-center text-[10px] uppercase tracking-wide sm:text-[11px]'
        role='region'
      >
        Calendar with pricing
      </p>
    </div>
  )
}

export default Calendar25
