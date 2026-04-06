import { MessageCircleIcon, SendIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const Popover8 = () => {
  return (
    <Popover>
      <PopoverTrigger asChild backdrop-blur-sm>
        <Button
          variant="outline"
          size="icon"
          className="rounded-xl transition-all hover:bg-neutral-100 active:scale-95 dark:hover:bg-neutral-800"
        >
          <MessageCircleIcon className="size-4" />
          <span className="sr-only">Feedback</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="shadow-3xl w-80 rounded-3xl border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <Label className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              Developer Notes
            </Label>
            <p className="text-[11px] leading-tight font-medium text-neutral-500 dark:text-neutral-500">
              Attach a technical note to this asset.
            </p>
          </div>

          <Textarea
            placeholder="Write your architectural notes here..."
            className="min-h-[120px] resize-none rounded-2xl border-neutral-100 bg-neutral-50 p-4 text-xs font-medium transition-none focus-visible:border-neutral-100 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:focus-visible:border-neutral-800"
          />

          <div className="grid w-full grid-cols-2 gap-3 pb-1">
            <Button
              variant="outline"
              size="sm"
              className="h-10 rounded-2xl border-neutral-200 text-xs font-bold text-neutral-500 dark:border-neutral-800"
            >
              Discard
            </Button>
            <Button
              size="sm"
              className="h-10 gap-2 rounded-2xl border-none bg-emerald-600 text-xs font-bold text-white shadow-lg shadow-emerald-500/10 hover:bg-emerald-700"
            >
              <SendIcon className="size-3.5" />
              Save Note
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Popover8;
