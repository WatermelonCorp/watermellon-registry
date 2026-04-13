'use client'

import { useState } from 'react'

import { addDays } from 'date-fns'

import { Button } from '@/components/ui//button'
import { Calendar } from '@/components/ui//calendar'
import { Card, CardContent, CardFooter } from '@/components/ui//card'

type DatePreset = {
  label: string
  value: DatePresetOffset
}

type DatePresetOffset = -1 | 0 | 1 | 3 | 7 | 14

const initialSelectedDate: Date = new Date()

const datePresets: readonly DatePreset[] = [
  { label: 'Today', value: 0 },
  { label: 'Yesterday', value: -1 },
  { label: 'Tomorrow', value: 1 },
  { label: 'In 3 days', value: 3 },
  { label: 'In a week', value: 7 },
  { label: 'In 2 weeks', value: 14 }
]

const Calendar22 = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialSelectedDate
  )

  const handlePresetSelect = (presetOffset: DatePresetOffset) => {
    const nextDate = addDays(new Date(), presetOffset)

    setSelectedDate(nextDate)
  }

  return (
    <div>
      <Card className='max-w-xs rounded-[1.75rem] border-border/60 bg-muted/10 py-4 shadow-sm'>
        <CardContent className='px-4'>
          <Calendar
            mode='single'
            selected={selectedDate}
            onSelect={setSelectedDate}
            defaultMonth={selectedDate}
            classNames={{
              today: '!bg-transparent',
              day_button: '!ring-0 !ring-offset-0 focus:!ring-0 focus-visible:!ring-0'
            }}
            className='w-full !bg-transparent p-0 !ring-0 !ring-offset-0 focus:!ring-0 focus:!ring-offset-0 focus-visible:!ring-0 focus-visible:!ring-offset-0 [&_*]:!ring-0 [&_*]:!ring-offset-0 [&_*]:focus:!ring-0 [&_*]:focus-visible:!ring-0 [&_.rdp-day_today]:!bg-transparent'
          />
        </CardContent>
        <CardFooter className='flex flex-wrap gap-2 border-t border-dashed border-border/60 px-4 !pt-4'>
          {datePresets.map(preset => (
            <Button
              key={preset.value}
              variant='outline'
              size='sm'
              className='h-8 flex-1 rounded-full border-border/60 bg-background'
              onClick={() => handlePresetSelect(preset.value)}
            >
              {preset.label}
            </Button>
          ))}
        </CardFooter>
      </Card>
      <p
        className='text-muted-foreground mt-4 text-center text-[11px] uppercase tracking-wide'
        role='region'
      >
        Calendar with presets
      </p>
    </div>
  )
}

export default Calendar22
