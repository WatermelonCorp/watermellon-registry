import { useId } from 'react';

import { IconSend } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Input31 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        Support Ticket Subject
      </Label>
      <div className="relative">
        <Input
          id={id}
          type="text"
          placeholder="Briefly describe your issue..."
          className="peer focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl pr-9 transition-all focus-visible:ring-3"
        />
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground absolute inset-y-0 right-0 h-full w-9 rounded-l-none hover:bg-transparent focus-visible:ring-0"
        >
          <IconSend className="size-4 stroke-[1.5]" />
          <span className="sr-only">Submit</span>
        </Button>
      </div>
    </div>
  );
};

export default Input31;
