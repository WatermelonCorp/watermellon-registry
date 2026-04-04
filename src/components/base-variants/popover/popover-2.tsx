import { PencilRulerIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const Popover2 = () => {
  return (
    <Popover>
      <PopoverTrigger asChild backdrop-blur-sm>
        <Button
          variant="outline"
          size="icon"
          className="rounded-xl transition-all hover:bg-neutral-100 active:scale-95 dark:hover:bg-neutral-800"
        >
          <PencilRulerIcon className="size-4" />
          <span className="sr-only">Dimensions</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 rounded-2xl border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-950">
        <div className="grid gap-6 p-1">
          <div className="space-y-1.5">
            <h4 className="leading-none font-bold text-neutral-900 dark:text-neutral-100">
              Workspace Bounds
            </h4>
            <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
              Control the structural limits of this container.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label
                htmlFor="width"
                className="text-sm font-medium text-neutral-500"
              >
                Horizon
              </Label>
              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8 rounded-lg border-neutral-200 bg-neutral-50 font-medium dark:border-neutral-800 dark:bg-neutral-900"
                title="Width"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label
                htmlFor="maxWidth"
                className="text-sm font-medium text-neutral-500"
              >
                Max Horiz.
              </Label>
              <Input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8 rounded-lg border-neutral-200 bg-neutral-50 font-medium dark:border-neutral-800 dark:bg-neutral-900"
                title="Max width"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label
                htmlFor="height"
                className="text-sm font-medium text-neutral-500"
              >
                Vertical
              </Label>
              <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8 rounded-lg border-neutral-200 bg-neutral-50 font-medium dark:border-neutral-800 dark:bg-neutral-900"
                title="Height"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label
                htmlFor="maxHeight"
                className="text-sm font-medium text-neutral-500"
              >
                Max Vert.
              </Label>
              <Input
                id="maxHeight"
                defaultValue="none"
                className="col-span-2 h-8 rounded-lg border-neutral-200 bg-neutral-50 font-medium dark:border-neutral-800 dark:bg-neutral-900"
                title="Max height"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Popover2;
