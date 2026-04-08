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

const Pagination3 = () => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            className="transition-colors hover:text-orange-600"
          >
            Prev
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
              buttonVariants({
                variant: 'default',
                size: 'icon',
              }),
              'scale-110 rounded-xl border-none text-white shadow-lg shadow-orange-200 transition-all duration-300 hover:text-white dark:bg-orange-600 dark:hover:bg-orange-700',
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
            className="rounded-lg transition-all hover:bg-neutral-50 hover:text-orange-600 dark:hover:bg-neutral-900/50"
          >
            Next
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Pagination3;
