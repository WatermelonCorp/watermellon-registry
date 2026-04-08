import { StarIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const ratings = {
  1: 0,
  2: 15,
  3: 30,
  4: 30,
  5: 225,
};

const Popover1 = () => {
  const totalReviews = Object.values(ratings).reduce(
    (acc, count) => acc + count,
    0,
  );
  const totalRating = Object.entries(ratings).reduce(
    (acc, [star, count]) => acc + Number(star) * count,
    0,
  );
  const averageRating = Number((totalRating / totalReviews || 0).toFixed(2));

  return (
    <Popover>
      <PopoverTrigger asChild backdrop-blur-sm>
        <Button
          variant="outline"
          size="icon"
          className="rounded-xl border-neutral-200 transition-all hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
        >
          <StarIcon className="size-4 text-neutral-500" />
          <span className="sr-only">View Reviews</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={8}
        collisionPadding={12}
        className="shadow-3xl max-h-[var(--radix-popover-content-available-height)] w-[calc(100vw-32px)] max-w-[340px] overflow-y-auto rounded-3xl border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950"
      >
        <div className="flex flex-col gap-4 sm:gap-8">
          <div className="flex items-end justify-between px-1">
            <div className="flex flex-col gap-1">
              <span className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                {averageRating}
              </span>
              <div className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase dark:text-neutral-500">
                Rating Score
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={cn(
                      'size-3.5',
                      i < Math.floor(averageRating)
                        ? 'fill-orange-500 stroke-orange-500'
                        : 'fill-neutral-100 stroke-neutral-200 dark:fill-neutral-900 dark:stroke-neutral-800',
                    )}
                  />
                ))}
              </div>
              <div className="text-[11px] font-medium text-neutral-400 dark:text-neutral-600">
                {totalReviews} global reviews
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <div className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
                <span className="text-[11px] font-bold text-neutral-900 dark:text-neutral-100">
                  Live Activity
                </span>
              </div>
              <Badge
                variant="secondary"
                className="rounded-sm bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold tracking-widest text-emerald-700 uppercase dark:text-emerald-400"
              >
                +6 Today
              </Badge>
            </div>
            <Separator className="opacity-50 dark:opacity-20" />

            <ul className="space-y-4 px-1">
              {Object.entries(ratings)
                .reverse()
                .map(([star, count]) => (
                  <li key={star} className="flex items-center gap-4">
                    <span className="w-10 shrink-0 text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                      {star} Star
                    </span>
                    <Progress
                      value={(count / totalReviews) * 100}
                      className="h-1 bg-neutral-50 dark:bg-neutral-900 [&>[data-slot=progress-indicator]]:bg-orange-500"
                    />
                    <span className="w-8 shrink-0 text-right text-[11px] font-medium text-neutral-300 dark:text-neutral-700">
                      {count.toString()}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Popover1;
