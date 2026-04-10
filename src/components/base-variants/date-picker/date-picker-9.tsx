import { Clock8Icon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { FC } from 'react';

const initialTimeValue = '10:10:00' as const;

const DatePicker9: FC = () => {
  return (
    <div className="w-full max-w-xs space-y-3">
      <Label htmlFor="time-picker" className="px-1 text-sm font-semibold text-primary">
        Time input with start icon
      </Label>
      <div className="relative">
        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 peer-disabled:opacity-50">
          <Clock8Icon className="size-5 text-primary/80" />
          <span className="sr-only">User</span>
        </div>
        <Input
          type="time"
          id="time-picker"
          step={1}
          defaultValue={initialTimeValue}
          className="peer h-11 rounded-2xl border-border/60 bg-background appearance-none pl-11 pr-3 shadow-xs focus:ring-2 focus:ring-primary/30 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  );
};

export default DatePicker9;
