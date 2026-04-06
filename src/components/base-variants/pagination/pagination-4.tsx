import { buttonVariants } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { cn } from '@/lib/utils';

const Pagination4 = () => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            className="rounded-lg px-4 text-emerald-700 transition-all hover:text-emerald-500 dark:text-emerald-400"
          >
            Back
          </PaginationPrevious>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            className="rounded-xl transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            isActive
            className={cn(
              'rounded-xl !border-none bg-emerald-100 font-bold text-emerald-800 !shadow-sm transition-all hover:bg-emerald-200 active:scale-95 dark:bg-emerald-900/50 dark:text-emerald-100 dark:hover:bg-emerald-900',
              buttonVariants({
                variant: 'secondary',
                size: 'icon',
              }),
            )}
          >
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            className="rounded-xl transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href="#"
            className="rounded-lg px-4 text-emerald-700 transition-all hover:text-emerald-500 dark:text-emerald-400"
          >
            Forward
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Pagination4;
