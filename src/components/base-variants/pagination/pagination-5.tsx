import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

const pages = [1, 2, 3];

const Pagination5 = () => {
  return (
    <Pagination>
      <PaginationContent className="gap-0 divide-x divide-neutral-200 overflow-hidden rounded-xl border bg-white shadow-lg dark:divide-neutral-800 dark:bg-neutral-950">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            className="h-10 rounded-none border-none px-4 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            Prev
          </PaginationPrevious>
        </PaginationItem>
        {pages.map((page) => {
          const isActive = page === 2;

          return (
            <PaginationItem key={page}>
              <PaginationLink
                href={`#${page}`}
                className={cn(
                  {
                    'bg-neutral-900 text-white hover:bg-neutral-800 hover:text-white dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200':
                      isActive,
                    'hover:bg-neutral-100 dark:hover:bg-neutral-800': !isActive,
                  },
                  'flex h-10 w-10 items-center justify-center rounded-none border-none transition-all',
                )}
                isActive={isActive}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            href="#"
            className="h-10 rounded-none border-none px-4 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            Next
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Pagination5;
