'use client'

import { useState } from 'react'

import {
  endOfMonth,
  endOfYear,
  startOfMonth,
  startOfYear,
  subDays,
  subMonths,
  subYears,
  addDays,
  addMonths
} from 'date-fns'
import type { DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

const DEFAULT_PRESET_INDEX = 3

type DateRangePreset = {
  label: string
  range: DateRange
}

const getDateRangePresets = (baseDate: Date): readonly DateRangePreset[] => {
  const previousMonth = subMonths(baseDate, 1)
  const upcomingMonth = addMonths(baseDate, 1)
  const previousYear = subYears(baseDate, 1)

  return [
    {
      label: 'Today',
      range: {
        from: baseDate,
        to: baseDate
      }
    },
    {
      label: 'Yesterday',
      range: {
        from: subDays(baseDate, 1),
        to: subDays(baseDate, 1)
      }
    },
    {
      label: 'Tomorrow',
      range: {
        from: baseDate,
        to: addDays(baseDate, 1)
      }
    },
    {
      label: 'Last 7 days',
      range: {
        from: subDays(baseDate, 6),
        to: baseDate
      }
    },
    {
      label: 'Next 7 days',
      range: {
        from: addDays(baseDate, 1),
        to: addDays(baseDate, 7)
      }
    },
    {
      label: 'Last 30 days',
      range: {
        from: subDays(baseDate, 29),
        to: baseDate
      }
    },
    {
      label: 'Month to date',
      range: {
        from: startOfMonth(baseDate),
        to: baseDate
      }
    },
    {
      label: 'Last month',
      range: {
        from: startOfMonth(previousMonth),
        to: endOfMonth(previousMonth)
      }
    },
    {
      label: 'Next month',
      range: {
        from: startOfMonth(upcomingMonth),
        to: endOfMonth(upcomingMonth)
      }
    },
    {
      label: 'Year to date',
      range: {
        from: startOfYear(baseDate),
        to: baseDate
      }
    },
    {
      label: 'Last year',
      range: {
        from: startOfYear(previousYear),
        to: endOfYear(previousYear)
      }
    }
  ]
}

const currentDate: Date = new Date()
const dateRangePresets: readonly DateRangePreset[] =
  getDateRangePresets(currentDate)
const initialSelectedDateRange: DateRange = dateRangePresets[
  DEFAULT_PRESET_INDEX
]?.range ?? {
  from: subDays(currentDate, 6),
  to: currentDate
}

const Calendar23 = () => {
  const [visibleMonth, setVisibleMonth] = useState<Date>(currentDate)
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >(initialSelectedDateRange)

  const handlePresetSelect = (presetRange: DateRange) => {
    setSelectedDateRange(presetRange)

    if (presetRange.to) {
      setVisibleMonth(presetRange.to)
    }
  }

  const handleDateRangeSelect = (newDateRange: DateRange | undefined) => {
    if (newDateRange) {
      setSelectedDateRange(newDateRange)
    }
  }

  return (
    <div>
      <Card className='max-w-xs rounded-[1.75rem] border-border/60 bg-muted/10 py-4 shadow-sm'>
        <CardContent className='px-4'>
          <Calendar
            mode='range'
            selected={selectedDateRange}
            onSelect={handleDateRangeSelect}
            month={visibleMonth}
            onMonthChange={setVisibleMonth}
            className='w-full bg-transparent p-0'
          />
        </CardContent>
        <CardFooter className='flex flex-wrap gap-2 border-t border-dashed border-border/60 px-4 !pt-4'>
          {dateRangePresets.map(preset => (
            <Button
              key={preset.label}
              variant='outline'
              size='sm'
              className='h-8 rounded-full border-border/60 bg-background'
              onClick={() => handlePresetSelect(preset.range)}
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
        Range calendar with presets
      </p>
    </div>
  )
}

export default Calendar23
