import { useId } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Input29 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        Domain Availability
      </Label>
      <div className="flex rounded-xl">
        <Input
          id={id}
          type="text"
          placeholder="my-awesome-app"
          className="focus-visible:border-primary focus-visible:ring-primary/20 -me-px rounded-l-xl rounded-r-none text-sm transition-all focus-visible:z-10 focus-visible:ring-3"
        />
        <Select defaultValue=".sh">
          <SelectTrigger
            id={id}
            className="bg-muted/30 focus-visible:ring-primary/20 focus-visible:border-primary w-20 rounded-l-none rounded-r-xl border-l-0 text-sm shadow-none transition-all focus-visible:ring-3"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=".sh" className="pr-2 [&_svg]:hidden">
              .sh
            </SelectItem>
            <SelectItem value=".io" className="pr-2 [&_svg]:hidden">
              .io
            </SelectItem>
            <SelectItem value=".app" className="pr-2 [&_svg]:hidden">
              .app
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Input29;
