'use client'

import { useState, useMemo } from 'react';
import type { FC } from 'react';

import { CalendarIcon } from 'lucide-react'
import type { DateRange } from 'react-day-picker'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import type { ChartConfig } from '@/components/ui/chart'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const chartData = [
  { date: '2025-01-01', visitors: 210 },
  { date: '2025-01-02', visitors: 320 },
  { date: '2025-01-03', visitors: 150 },
  { date: '2025-01-04', visitors: 400 },
  { date: '2025-01-05', visitors: 90 },
  { date: '2025-01-06', visitors: 275 },
  { date: '2025-01-07', visitors: 350 },
  { date: '2025-01-08', visitors: 500 },
  { date: '2025-01-09', visitors: 120 },
  { date: '2025-01-10', visitors: 380 },
  { date: '2025-01-11', visitors: 60 },
  { date: '2025-01-12', visitors: 420 },
  { date: '2025-01-13', visitors: 200 },
  { date: '2025-01-14', visitors: 310 },
  { date: '2025-01-15', visitors: 180 },
  { date: '2025-01-16', visitors: 390 },
  { date: '2025-01-17', visitors: 470 },
  { date: '2025-01-18', visitors: 130 },
  { date: '2025-01-19', visitors: 260 },
  { date: '2025-01-20', visitors: 340 },
  { date: '2025-01-21', visitors: 210 },
  { date: '2025-01-22', visitors: 370 },
  { date: '2025-01-23', visitors: 490 },
  { date: '2025-01-24', visitors: 110 },
  { date: '2025-01-25', visitors: 150 },
  { date: '2025-01-26', visitors: 410 },
  { date: '2025-01-27', visitors: 430 },
  { date: '2025-01-28', visitors: 170 },
  { date: '2025-01-29', visitors: 95 },
  { date: '2025-01-30', visitors: 460 },
  { date: '2025-01-31', visitors: 300 }
];

const total = chartData.reduce((acc, curr) => acc + curr.visitors, 0)

const chartConfig = {
  visitors: {
    label: 'Visitors',
    color: 'var(--color-primary)'
  }
} satisfies ChartConfig

const DatePicker13: FC = () => {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2025, 0, 1),
    to: new Date(2025, 0, 31)
  })

  const filteredData = useMemo(() => {
    if (!range?.from && !range?.to) {
      return chartData
    }

    return chartData.filter(item => {
      const date = new Date(item.date)

      return date >= range.from! && date <= range.to!
    })
  }, [range])

  return (
    <Card className='@container/card w-full max-w-xl rounded-3xl shadow-xl border border-border/60 bg-background/80 backdrop-blur-sm'>
      <CardHeader className='flex flex-col border-b rounded-t-3xl @md/card:grid'>
        <CardTitle>Sales Performance</CardTitle>
        <CardDescription>Track your daily sales for the selected period.</CardDescription>
        <CardAction className='mt-2 @md/card:mt-0'>
          <Popover>
            <PopoverTrigger>
              <Button variant='outline' className='rounded-2xl'>
                <CalendarIcon />
                {range?.from && range?.to
                  ? `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`
                  : 'January 2025'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto overflow-hidden p-0' align='end'>
              <Calendar
                className='w-full r rounded-full'
                mode='range'
                defaultMonth={range?.from}
                selected={range}
                onSelect={setRange}
                startMonth={range?.from}
                fixedWeeks
                showOutsideDays
                disabled={{
                  after: new Date(2025, 0, 31),
                  before: new Date(2025, 0, 1)
                }}
              />
            </PopoverContent>
          </Popover>
        </CardAction>
      </CardHeader>
      <CardContent className='px-4 rounded-b-2xl'>
        <ChartContainer config={chartConfig} className='aspect-auto h-62 w-full rounded-2xl'>
          <BarChart
            accessibilityLayer
            data={filteredData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={20}
              tickFormatter={value => {
                const date = new Date(value)
                return date.toLocaleDateString('en-US', { day: 'numeric' })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className='w-[150px]'
                  nameKey='visitors'
                  labelFormatter={value => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })
                  }}
                />
              }
            />
            <Bar dataKey='visitors' fill="#3b82f6" radius={8} />
          </BarChart>
        </ChartContainer>
        <div className='mt-6 text-center text-base text-muted-foreground'>
          Analyze your sales trends and adjust your strategy for better results.
        </div>
      </CardContent>
      <CardFooter className='border-t rounded-b-3xl'>
        <div className='text-sm'>
          Total sales: <span className='font-semibold'>{total.toLocaleString()}</span> units in January.
        </div>
      </CardFooter>
    </Card>
  )
}

export default DatePicker13
