'use client'

import { useId, useState } from 'react'

import { ClockIcon } from 'lucide-react'

import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const initialSelectedDate: Date = new Date()
const initialSelectedTime = '12:00:00'

const Calendar20 = () => {
  const id = useId()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialSelectedDate
  )
  const [selectedTime, setSelectedTime] = useState<string>(initialSelectedTime)

  return (
    <div>
      <Card className='gap-5 rounded-[1.75rem] border-border/60 bg-muted/10 py-5 shadow-sm'>
        <CardHeader className='flex items-center border-b border-dashed border-border/60 px-4 !pb-3'>
          <Label
            htmlFor={id}
            className='text-[11px] font-medium uppercase tracking-wide text-muted-foreground'
          >
            Enter time
          </Label>
          <div className='relative grow'>
            <Input
              id={id}
              type='time'
              step='1'
              value={selectedTime}
              onChange={(event) => setSelectedTime(event.target.value)}
              className='peer h-9 appearance-none rounded-full border-border/60 bg-background pl-9 text-sm shadow-xs [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
            />
            <div className='text-muted-foreground/80 pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50'>
              <ClockIcon size={16} aria-hidden='true' />
            </div>
          </div>
        </CardHeader>
        <CardContent className='px-5'>
          <Calendar
            mode='single'
            selected={selectedDate}
            onSelect={setSelectedDate}
            className='bg-transparent p-0'
          />
        </CardContent>
      </Card>
      <p className='text-muted-foreground mt-4 text-center text-xs' role='region'>
        Calendar with time input
      </p>
    </div>
  )
}

export default Calendar20
