import { useId } from 'react';

import { IconDownload } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Input32 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        Backup Configuration
      </Label>
      <div className="border-input focus-within:border-primary focus-within:ring-primary/20 flex rounded-xl border transition-all focus-within:ring-3">
        <Input
          id={id}
          type="text"
          placeholder="config_v2_stable"
          className="h-10 flex-1 rounded-none border-none focus-visible:ring-0"
        />
        <Button
          variant="ghost"
          size="icon"
          className="bg-muted/20 hover:bg-muted/40 h-10 w-10 shrink-0 rounded-l-none rounded-r-xl border-l"
          aria-label="Download backup"
        >
          <IconDownload className="size-4 stroke-[1.5]" />
        </Button>
      </div>
    </div>
  );
};

export default Input32;
