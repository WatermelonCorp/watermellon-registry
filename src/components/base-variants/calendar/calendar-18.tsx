'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const initialSelectedDate: Date = new Date(2025, 5, 15)
const currentMonthDate: Date = new Date()

const Calendar18 = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialSelectedDate
  )
  const [visibleMonth, setVisibleMonth] = useState<Date | undefined>(
    currentMonthDate
  )

  return (
    <div>
      <Card className='rounded-[1.75rem] border-border/60 bg-muted/10 shadow-sm'>
        <CardHeader className='pb-4'>
          <CardTitle className='text-[1rem]'>Book a session</CardTitle>
          <CardDescription>Pick an available day</CardDescription>
          <CardAction>
            <Button
              size='sm'
              variant='outline'
              className='h-8 rounded-full px-4'
              onClick={() => {
                const today = new Date()

                setVisibleMonth(today)
                setSelectedDate(today)
              }}
            >
              Today
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Calendar
            mode='single'
            month={visibleMonth}
            onMonthChange={setVisibleMonth}
            selected={selectedDate}
            onSelect={setSelectedDate}
            className='bg-transparent p-0'
          />
        </CardContent>
      </Card>
      <p className='text-muted-foreground mt-4 text-center text-xs' role='region'>
        Calendar with quick today jump
      </p>
    </div>
  )
}

export default Calendar18
