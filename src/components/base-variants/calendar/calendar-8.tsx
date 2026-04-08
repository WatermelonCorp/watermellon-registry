'use client'

import { useState } from 'react'

import { type DateRange } from 'react-day-picker'
import { enUS, hi } from 'react-day-picker/locale'

import { Calendar } from '@/components/ui//calendar'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui//card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui//select'

type CalendarLocale = 'en' | 'hi'

type LocalizedCopy = {
  description: string
  title: string
}

const localizedStrings: Record<CalendarLocale, LocalizedCopy> = {
  en: {
    title: 'Book an appointment',
    description: 'Select the dates for your appointment'
  },
  hi: {
    title: '\u0905\u092A\u0949\u0907\u0902\u091F\u092E\u0947\u0902\u091F \u092C\u0941\u0915 \u0915\u0930\u0947\u0902',
    description:
      '\u0905\u092A\u0928\u0940 \u0905\u092A\u0949\u0907\u0902\u091F\u092E\u0947\u0902\u091F \u0915\u0947 \u0932\u093F\u090F \u0924\u093E\u0930\u0940\u0916\u0947\u0902 \u091A\u0941\u0928\u0947\u0902'
  }
}

const localeMap = {
  en: enUS,
  hi
} as const

const numeralMap = {
  en: 'latn',
  hi: 'deva'
} as const

const isCalendarLocale = (value: string | null): value is CalendarLocale => value === 'en' || value === 'hi'

const initialDateRange: DateRange = {
  from: new Date(2025, 8, 9),
  to: new Date(2025, 8, 17)
}

const Calendar8 = () => {
  const [selectedLocale, setSelectedLocale] = useState<CalendarLocale>('en')
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>(initialDateRange)

  return (
    <div>
      <Card className='w-2xs rounded-2xl border-border/60 shadow-sm'>
        <CardHeader className='border-b border-border/60 pb-4'>
          <CardTitle>{localizedStrings[selectedLocale].title}</CardTitle>
          <CardDescription>{localizedStrings[selectedLocale].description}</CardDescription>
          <CardAction>
            <Select
              value={selectedLocale}
              onValueChange={(value) => {
                if (!isCalendarLocale(value)) return
                setSelectedLocale(value)
              }}
            >
              <SelectTrigger className='h-9 w-[104px] rounded-full border-border/60' aria-label='Select language'>
                <SelectValue placeholder='Language' />
              </SelectTrigger>
              <SelectContent align='end'>
                <SelectItem value='hi'>Hindi</SelectItem>
                <SelectItem value='en'>English</SelectItem>
              </SelectContent>
            </Select>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Calendar
            mode='range'
            selected={selectedDateRange}
            onSelect={setSelectedDateRange}
            defaultMonth={selectedDateRange?.from}
            locale={localeMap[selectedLocale]}
            numerals={numeralMap[selectedLocale]}
            classNames={{
              today: '!bg-transparent',
              day_button: '!ring-0 !ring-offset-0 focus:!ring-0 focus-visible:!ring-0'
            }}
            className='w-full !bg-transparent p-0 !ring-0 !ring-offset-0 focus:!ring-0 focus:!ring-offset-0 focus-visible:!ring-0 focus-visible:!ring-offset-0 [&_*]:!ring-0 [&_*]:!ring-offset-0 [&_*]:focus:!ring-0 [&_*]:focus-visible:!ring-0 [&_.rdp-day_today]:!bg-transparent'
            buttonVariant='outline'
          />
        </CardContent>
      </Card>
      <p className='mt-3 text-center text-xs text-muted-foreground' role='region'>
        Localized range picker
      </p>
    </div>
  )
}

export default Calendar8
