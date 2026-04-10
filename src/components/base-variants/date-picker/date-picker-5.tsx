'use client'

import type { ComponentProps } from 'react'
import { useId, useState, type ChangeEvent, type KeyboardEvent } from 'react'

import { parseDate } from 'chrono-node'
import { CalendarIcon } from 'lucide-react'

import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type CalendarClassNames = NonNullable<ComponentProps<typeof Calendar>['classNames']>

function formatDate(date: Date | undefined) {
  if (!date) {
    return ''
  }

  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

const calendarClassNames = {
  day_button:
    'rounded-full data-[selected=true]:rounded-full! data-[selected=true]:bg-slate-900! data-[selected=true]:text-white! data-[selected=true]:dark:bg-white! data-[selected=true]:dark:text-slate-950! hover:rounded-full',
  today:
    'rounded-full bg-muted/60! data-[selected=true]:bg-slate-900! data-[selected=true]:text-white! dark:data-[selected=true]:bg-white! dark:data-[selected=true]:text-slate-950!'
} satisfies CalendarClassNames

const DatePicker5 = () => {
  const id = useId()
  const initialInputValue = 'In 2 days'
  const initialSelectedDate = parseDate(initialInputValue) ?? undefined
  const [open, setOpen] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>(initialInputValue)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialSelectedDate
  )
  const [visibleMonth, setVisibleMonth] = useState<Date | undefined>(
    initialSelectedDate
  )

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value
    const nextDate = parseDate(nextValue) ?? undefined

    setInputValue(nextValue)

    if (nextDate) {
      setSelectedDate(nextDate)
      setVisibleMonth(nextDate)
    }
  }

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setOpen(true)
    }
  }

  return (
    <div className='w-full max-w-xs space-y-2'>
      <Label htmlFor={id} className='px-1 text-sm font-medium'>
        Natural date input
      </Label>
      <div className='relative flex gap-2'>
        <Input
          id={id}
          value={inputValue}
          placeholder='Tomorrow or next week'
          className='h-11 rounded-2xl border-border/60 bg-background pr-11 shadow-xs'
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            id={`${id}-picker`}
            className='absolute top-1/2 right-2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground/80 outline-none transition-colors hover:bg-accent/30 hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50'
          >
            <CalendarIcon className='size-3.5' />
            <span className='sr-only'>Pick a date</span>
          </PopoverTrigger>
          <PopoverContent
            className='w-auto overflow-hidden rounded-2xl border-border/60 p-0 shadow-sm'
            align='end'
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode='single'
              selected={selectedDate}
              month={visibleMonth}
              classNames={calendarClassNames}
              onMonthChange={setVisibleMonth}
              onSelect={(date) => {
                setSelectedDate(date)
                setInputValue(formatDate(date))
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className='text-muted-foreground px-1 text-xs'>
        Your reminder is currently scheduled for{' '}
        <span className='font-medium'>{formatDate(selectedDate)}</span>.
      </div>
    </div>
  )
}

export default DatePicker5
