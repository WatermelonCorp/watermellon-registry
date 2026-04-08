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

const Input28 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        Server Endpoint
      </Label>
      <div className="flex rounded-xl">
        <Select defaultValue="https://">
          <SelectTrigger
            id={id}
            className="bg-muted/30 focus-visible:ring-primary/20 focus-visible:border-primary w-24 rounded-l-xl rounded-r-none border-r-0 text-sm shadow-none transition-all focus-visible:z-10 focus-visible:ring-3"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="https://" className="pr-2 [&_svg]:hidden">
              https://
            </SelectItem>
            <SelectItem value="wss://" className="pr-2 [&_svg]:hidden">
              wss://
            </SelectItem>
            <SelectItem value="grpc://" className="pr-2 [&_svg]:hidden">
              grpc://
            </SelectItem>
          </SelectContent>
        </Select>
        <Input
          id={id}
          type="text"
          placeholder="api.watermelon.sh"
          className="focus-visible:border-primary focus-visible:ring-primary/20 -ms-px rounded-l-none rounded-r-xl text-sm transition-all focus-visible:ring-3"
        />
      </div>
    </div>
  );
};

export default Input28;
