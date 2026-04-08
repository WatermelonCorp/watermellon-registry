'use client'

import { type ChangeEvent, useId, useState } from 'react'

import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { Calendar } from '@/components/ui//calendar'
import { Card, CardContent, CardHeader } from '@/components/ui//card'
import { Input } from '@/components/ui//input'
import { Label } from '@/components/ui//label'

const initialSelectedDate: Date = new Date()
const initialDateInputValue: string = format(initialSelectedDate, 'yyyy-MM-dd')

const isValidDate = (value: Date): boolean => !Number.isNaN(value.getTime())

const Calendar19 = () => {
  const id = useId()
  const [visibleMonth, setVisibleMonth] = useState<Date>(initialSelectedDate)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialSelectedDate
  )
  const [inputValue, setInputValue] = useState<string>(initialDateInputValue)

  const handleDayPickerSelect = (nextDate: Date | undefined) => {
    if (!nextDate) {
      setInputValue('')
      setSelectedDate(undefined)
    } else {
      setSelectedDate(nextDate)
      setVisibleMonth(nextDate)
      setInputValue(format(nextDate, 'yyyy-MM-dd'))
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    setInputValue(value)

    if (value) {
      const parsedDate = new Date(value)

      if (!isValidDate(parsedDate)) {
        setSelectedDate(undefined)
        return
      }

      setSelectedDate(parsedDate)
      setVisibleMonth(parsedDate)
    } else {
      setSelectedDate(undefined)
    }
  }

  return (
    <div>
      <Card className='w-full max-w-lg gap-5 rounded-[1.75rem] border-border/60 bg-muted/10 py-5 shadow-sm'>
        <CardHeader className='flex flex-col items-start gap-3 border-b border-dashed border-border/60 px-4 pb-3!'>
          <Label
            htmlFor={id}
            className='shrink-0 text-[11px] font-medium uppercase tracking-wide text-muted-foreground'
          >
            Enter date
          </Label>
          <div className='relative w-fit'>
            <Input
              id={id}
              type='date'
              value={inputValue}
              onChange={handleInputChange}
              className='peer h-9 w-full min-w-0 appearance-none rounded-full border-border/60 bg-background pl-9 text-sm shadow-xs [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
              aria-label='Select date'
            />
            <div className='text-muted-foreground/80 pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50'>
              <CalendarIcon size={16} aria-hidden='true' />
            </div>
          </div>
        </CardHeader>
        <CardContent className='px-5'>
          <Calendar
            mode='single'
            selected={selectedDate}
            onSelect={handleDayPickerSelect}
            month={visibleMonth}
            onMonthChange={setVisibleMonth}
            classNames={{
              today: '!bg-transparent',
              day_button: '!ring-0 !ring-offset-0 focus:!ring-0 focus-visible:!ring-0'
            }}
            className='!bg-transparent p-0 !ring-0 !ring-offset-0 focus:!ring-0 focus:!ring-offset-0 focus-visible:!ring-0 focus-visible:!ring-offset-0 [&_*]:!ring-0 [&_*]:!ring-offset-0 [&_*]:focus:!ring-0 [&_*]:focus-visible:!ring-0 [&_.rdp-day_today]:!bg-transparent'
          />
        </CardContent>
      </Card>
      <p className='text-muted-foreground mt-4 text-center text-xs' role='region'>
        Calendar with date input
      </p>
    </div>
  )
}

export default Calendar19
