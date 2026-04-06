'use client'

import { useState } from 'react'

import { formatDateRange } from 'little-date'
import { PlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

type CalendarEvent = {
  className: string
  from: string
  title: string
  to: string
}

const events: readonly CalendarEvent[] = [
  {
    className: 'bg-sky-50 text-sky-950 after:bg-sky-500 dark:bg-sky-950/30 dark:text-sky-100',
    title: 'Weekly Planning',
    from: '2025-06-12T09:00:00',
    to: '2025-06-12T10:00:00'
  },
  {
    className: 'bg-emerald-50 text-emerald-950 after:bg-emerald-500 dark:bg-emerald-950/30 dark:text-emerald-100',
    title: 'Design Review',
    from: '2025-06-12T11:30:00',
    to: '2025-06-12T12:30:00'
  },
  {
    className: 'bg-amber-50 text-amber-950 after:bg-amber-500 dark:bg-amber-950/30 dark:text-amber-100',
    title: 'Client Presentation',
    from: '2025-06-12T14:00:00',
    to: '2025-06-12T15:00:00'
  }
]

const initialSelectedDate = new Date()

const Calendar11 = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(initialSelectedDate)

  return (
    <div>
      <Card className='w-2xs rounded-2xl border-border/60 py-4 shadow-sm'>
        <CardContent className='px-4'>
          <Calendar
            mode='single'
            selected={selectedDate}
            onSelect={setSelectedDate}
            className='w-full bg-transparent p-0'
            required
          />
        </CardContent>
        <CardFooter className='flex flex-col items-start gap-3 border-t border-border/60 px-4 pt-4!'>
          <div className='flex w-full items-center justify-between px-1'>
            <div className='text-sm font-medium'>
              {selectedDate?.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </div>
            <Button variant='ghost' size='icon' className='size-7 rounded-full' title='Add Event'>
              <PlusIcon className='size-4' />
              <span className='sr-only'>Add Event</span>
            </Button>
          </div>
          <div className='flex w-full flex-col gap-2'>
            {events.map(event => (
              <div
                key={event.title}
                className={`relative rounded-lg p-2.5 pl-6 text-sm after:absolute after:inset-y-2.5 after:left-2 after:w-1 after:rounded-full ${event.className}`}
              >
                <div className='font-medium'>{event.title}</div>
                <div className='text-xs text-muted-foreground'>
                  {formatDateRange(new Date(event.from), new Date(event.to))}
                </div>
              </div>
            ))}
          </div>
        </CardFooter>
      </Card>
      <p className='mt-3 text-center text-xs text-muted-foreground' role='region'>
        Calendar with agenda list
      </p>
    </div>
  )
}

export default Calendar11
