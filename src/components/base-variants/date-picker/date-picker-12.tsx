'use client'

import { useState } from 'react';
import type { FC } from 'react';

import { ChevronDownIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const initialTimeFrom = '10:10:00' as const;
const initialTimeTo = '18:10:00' as const;

const DatePicker12: FC = () => {
  const [openFrom, setOpenFrom] = useState<boolean>(false);
  const [openTo, setOpenTo] = useState<boolean>(false);
  const [dateFrom, setDateFrom] = useState<Date | undefined>(new Date('2025-06-18'));
  const [dateTo, setDateTo] = useState<Date | undefined>(new Date('2025-06-25'));

  return (
    <div className="flex w-full max-w-64 min-w-0 flex-col gap-7">
      <div className="flex gap-6">
        <div className="flex flex-1 flex-col gap-4">
          <Label htmlFor="date-from" className="px-1 text-sm font-semibold text-primary">
            Start Date
          </Label>
          <Popover open={openFrom} onOpenChange={setOpenFrom}>
            <PopoverTrigger>
              <Button variant="outline" id="date-from" className="w-full justify-between font-normal rounded-2xl h-11 shadow-xs border-border/60 focus:ring-2 focus:ring-primary/30">
                {dateFrom
                  ? dateFrom.toLocaleDateString('en-US', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })
                  : 'Pick a date'}
                <ChevronDownIcon className="ml-2 size-4 text-primary/80" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0 rounded-2xl shadow-lg border-border/60" align="start">
              <Calendar
                mode="single"
                selected={dateFrom}
                onSelect={d => {
                  setDateFrom(d);
                  setOpenFrom(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="time-from" className="invisible px-1 text-sm font-semibold text-primary">
            Start Time
          </Label>
          <Input
            type="time"
            id="time-from"
            step={1}
            defaultValue={initialTimeFrom}
            className="h-11 rounded-2xl border-border/60 bg-background appearance-none pl-4 pr-3 shadow-xs focus:ring-2 focus:ring-primary/30 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </div>
      </div>
      <div className="flex gap-6">
        <div className="flex flex-1 flex-col gap-4">
          <Label htmlFor="date-to" className="px-1 text-sm font-semibold text-primary">
            End Date
          </Label>
          <Popover open={openTo} onOpenChange={setOpenTo}>
            <PopoverTrigger>
              <Button variant="outline" id="date-to" className="w-full justify-between font-normal rounded-2xl h-11 shadow-xs border-border/60 focus:ring-2 focus:ring-primary/30">
                {dateTo
                  ? dateTo.toLocaleDateString('en-US', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })
                  : 'Pick a date'}
                <ChevronDownIcon className="ml-2 size-4 text-primary/80" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0 rounded-2xl shadow-lg border-border/60" align="start">
              <Calendar
                mode="single"
                selected={dateTo}
                captionLayout="dropdown"
                onSelect={d => {
                  setDateTo(d);
                  setOpenTo(false);
                }}
                disabled={dateFrom ? { before: dateFrom } : undefined}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="time-to" className="invisible px-1 text-sm font-semibold text-primary">
            End Time
          </Label>
          <Input
            type="time"
            id="time-to"
            step={1}
            defaultValue={initialTimeTo}
            className="h-11 rounded-2xl border-border/60 bg-background appearance-none pl-4 pr-3 shadow-xs focus:ring-2 focus:ring-primary/30 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </div>
      </div>
    </div>
  );
};

export default DatePicker12;
