import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from '@tabler/icons-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

const pages = [1, 2, 3];

const Pagination7 = () => {
  return (
    <Pagination>
      <PaginationContent className="mx-auto w-fit gap-1.5 rounded-2xl bg-neutral-100/50 p-1 dark:bg-neutral-900/50">
        <PaginationItem>
          <PaginationLink
            href="#"
            aria-label="First page"
            size="icon"
            className="rounded-xl border-none bg-white shadow-sm transition-all hover:shadow-md dark:bg-neutral-950"
          >
            <IconChevronsLeft className="size-4 text-neutral-900 dark:text-neutral-100" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            aria-label="Previous"
            size="icon"
            className="rounded-xl border-none transition-all hover:bg-white dark:hover:bg-neutral-800"
          >
            <IconChevronLeft className="size-4" />
          </PaginationLink>
        </PaginationItem>
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={`#${page}`}
              isActive={page === 2}
              className={cn(
                'rounded-xl font-semibold transition-all',
                page === 2
                  ? 'scale-105 transform shadow-md'
                  : 'hover:bg-white dark:hover:bg-neutral-800',
              )}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationLink
            href="#"
            aria-label="Next"
            size="icon"
            className="rounded-xl border-none transition-all hover:bg-white dark:hover:bg-neutral-800"
          >
            <IconChevronRight className="size-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            aria-label="Last page"
            size="icon"
            className="rounded-xl border-none bg-white shadow-sm transition-all hover:shadow-md dark:bg-neutral-950"
          >
            <IconChevronsRight className="size-4 text-neutral-900 dark:text-neutral-100" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Pagination7;
