'use client'

import { useState } from 'react';
import type { FC } from 'react';

import { ChevronDownIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const initialTimeValue = '10:10:00' as const;

const DatePicker10: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <div className="flex gap-6">
      <div className="flex flex-col gap-4">
        <Label htmlFor="date-picker" className="px-1 text-sm font-semibold text-primary">
          Date picker
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger>
            <Button variant="outline" id="date-picker" className="justify-between font-normal rounded-2xl h-11 shadow-xs border-border/60 focus:ring-2 focus:ring-primary/30">
              {date ? date.toLocaleDateString() : 'Pick a date'}
              <ChevronDownIcon className="ml-2 size-4 text-primary/80" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0 rounded-2xl shadow-lg border-border/60" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={d => {
                setDate(d);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-4">
        <Label htmlFor="time-picker" className="px-1 text-sm font-semibold text-primary">
          Time input
        </Label>
        <Input
          type="time"
          id="time-picker"
          step={1}
          defaultValue={initialTimeValue}
          className="h-11 rounded-2xl border-border/60 bg-background appearance-none pl-4 pr-3 shadow-xs focus:ring-2 focus:ring-primary/30 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  );
};

export default DatePicker10;
