
import { useId } from 'react';
import type { FC } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const initialTimeValue = '10:10:00' as const;

const DatePicker8: FC = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="px-1 text-sm font-medium">
        Pick time
      </Label>
      <Input
        type="time"
        id={id}
        step={1}
        defaultValue={initialTimeValue}
        className="h-11 rounded-2xl border-border/60 bg-background shadow-xs appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
      />
    </div>
  );
};

export default DatePicker8;
