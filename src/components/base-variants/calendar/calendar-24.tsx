'use client'

import { type ComponentProps, useState } from 'react'

import { CircleCheckIcon } from 'lucide-react'

import { Button } from '@/components/ui//button'
import { Calendar } from '@/components/ui//calendar'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui//card'
import { ScrollArea } from '@/components/ui//scroll-area'

type TimeSlot = string
type CalendarFormatters = NonNullable<
  ComponentProps<typeof Calendar>['formatters']
>
type CalendarModifiers = NonNullable<ComponentProps<typeof Calendar>['modifiers']>
type CalendarModifiersClassNames = NonNullable<
  ComponentProps<typeof Calendar>['modifiersClassNames']
>

const initialSelectedDate: Date = new Date(2025, 5, 20)
const initialSelectedTime: TimeSlot = '10:00'
const bookedDates: Date[] = Array.from(
  { length: 3 },
  (_, index) => new Date(2025, 5, 17 + index)
)

const timeSlots: readonly TimeSlot[] = Array.from({ length: 37 }, (_, index) => {
  const totalMinutes = index * 15
  const hour = Math.floor(totalMinutes / 60) + 9
  const minute = totalMinutes % 60

  return `${hour.toString().padStart(2, '0')}:${minute
    .toString()
    .padStart(2, '0')}`
})

const formatAppointmentDate = (selectedDate: Date): string =>
  selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  })

const calendarModifiers = {
  booked: bookedDates
} satisfies CalendarModifiers

const calendarModifiersClassNames = {
  booked: '[&>button]:line-through opacity-100'
} satisfies CalendarModifiersClassNames

const calendarFormatters = {
  formatWeekdayName: (date: Date): string =>
    date.toLocaleString('en-US', { weekday: 'short' })
} satisfies CalendarFormatters

const Calendar24 = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialSelectedDate
  )
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(
    initialSelectedTime
  )

  return (
    <div>
      <Card className='gap-0 rounded-[1.75rem] border-border/60 bg-muted/10 p-0 shadow-sm'>
        <CardHeader className='flex h-max justify-center border-b border-dashed border-border/60 p-4!'>
          <CardTitle className='text-[1rem]'>Book your appointment</CardTitle>
        </CardHeader>
        <CardContent className='relative flex flex-col p-0 max-[1439px]:items-center max-[1439px]:flex-col min-[1440px]:flex-row min-[1440px]:pr-48'>
          <div className='p-3 sm:p-4 min-[1440px]:flex-1 min-[1440px]:p-6'>
            <Calendar
              mode='single'
              selected={selectedDate}
              onSelect={setSelectedDate}
              defaultMonth={selectedDate}
              disabled={bookedDates}
              showOutsideDays={false}
              modifiers={calendarModifiers}
              modifiersClassNames={calendarModifiersClassNames}
              classNames={{
                today: '!bg-transparent',
                day_button:
                  '!ring-0 !ring-offset-0 focus:!ring-0 focus-visible:!ring-0'
              }}
              className='!bg-transparent p-0 !ring-0 !ring-offset-0 focus:!ring-0 focus:!ring-offset-0 focus-visible:!ring-0 focus-visible:!ring-offset-0 [&_*]:!ring-0 [&_*]:!ring-offset-0 [&_*]:focus:!ring-0 [&_*]:focus-visible:!ring-0 [&_.rdp-day_today]:!bg-transparent [--cell-size:--spacing(10)]'
              formatters={calendarFormatters}
            />
          </div>
          <div className='flex w-full flex-col gap-4 border-t border-dashed border-border/60 max-[1439px]:h-60 min-[1440px]:absolute min-[1440px]:inset-y-0 min-[1440px]:right-0 min-[1440px]:w-48 min-[1440px]:border-t-0 min-[1440px]:border-l'>
            <ScrollArea className='h-full'>
              <div className='flex flex-col gap-2 p-3 sm:p-4 min-[1440px]:p-6'>
                {timeSlots.map(time => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? 'default' : 'outline'}
                    onClick={() => setSelectedTime(time)}
                    className={`h-9 w-full rounded-full border-border/60 shadow-none ${
                      selectedTime === time
                        ? 'bg-slate-900 text-white hover:bg-slate-950 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200'
                        : 'bg-background'
                    }`}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </CardContent>
        <CardFooter className='flex flex-col gap-4 border-t border-dashed border-border/60 px-6 py-5! md:flex-row'>
          <div className='flex items-center gap-2 text-sm'>
            {selectedDate && selectedTime ? (
              <>
                <CircleCheckIcon className='size-5 stroke-green-600 dark:stroke-green-400' />
                <span>
                  Your meeting is booked for{' '}
                  <span className='font-medium'>
                    {' '}
                    {formatAppointmentDate(selectedDate)}{' '}
                  </span>
                  at <span className='font-medium'>{selectedTime}</span>.
                </span>
              </>
            ) : (
              <>Select a date and time for your meeting.</>
            )}
          </div>
          <Button
            disabled={!selectedDate || !selectedTime}
            className='h-9 w-full rounded-full md:ml-auto md:w-auto'
            variant='outline'
          >
            Continue
          </Button>
        </CardFooter>
      </Card>
      <p className='text-muted-foreground mt-4 text-center text-xs' role='region'>
        Appointment calendar
      </p>
    </div>
  )
}

export default Calendar24
