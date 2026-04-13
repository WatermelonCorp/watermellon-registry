'use client'

import type { ComponentProps } from 'react'
import { useId, useState } from 'react'

import { ChevronDownIcon } from 'lucide-react'

import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type CalendarClassNames = NonNullable<ComponentProps<typeof Calendar>['classNames']>

const formatSelectedDate = (selectedDate: Date) =>
  selectedDate.toLocaleDateString()

const calendarClassNames = {
  day_button:
    'rounded-full data-[selected=true]:rounded-full! data-[selected=true]:bg-slate-900! data-[selected=true]:text-white! data-[selected=true]:dark:bg-white! data-[selected=true]:dark:text-slate-950! hover:rounded-full',
  today:
    'rounded-full bg-muted/60! data-[selected=true]:bg-slate-900! data-[selected=true]:text-white! dark:data-[selected=true]:bg-white! dark:data-[selected=true]:text-slate-950!'
} satisfies CalendarClassNames

const DatePicker7 = () => {
  const id = useId()
  const [open, setOpen] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  return (
    <div className='w-full max-w-xs space-y-2'>
      <Label htmlFor={id} className='px-1 text-sm font-medium'>
        Hidden outside days
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          id={id}
          className='flex h-11 w-full items-center justify-between rounded-2xl border border-border/60 bg-background px-3.5 text-sm font-normal shadow-xs outline-none transition-colors hover:bg-accent/10 focus-visible:ring-[3px] focus-visible:ring-ring/50'
        >
          <span className={selectedDate ? 'text-foreground' : 'text-muted-foreground'}>
            {selectedDate ? formatSelectedDate(selectedDate) : 'Pick a date'}
          </span>
          <ChevronDownIcon className='size-4 text-muted-foreground/80' />
        </PopoverTrigger>
        <PopoverContent
          className='w-auto overflow-hidden rounded-2xl border-border/60 p-0 shadow-sm'
          align='start'
        >
          <Calendar
            mode='single'
            selected={selectedDate}
            classNames={calendarClassNames}
            showOutsideDays={false}
            onSelect={(date) => {
              setSelectedDate(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DatePicker7
