import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';

const Pagination13 = () => {
  return (
    <Pagination>
      <PaginationContent className="gap-3 rounded-full border border-neutral-200 bg-neutral-50 p-1 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <PaginationItem>
          <PaginationLink
            href="#"
            aria-label="Previous"
            size="icon"
            className="rounded-full border-none bg-white shadow-sm transition-all hover:scale-110 hover:bg-neutral-50 active:scale-95 dark:bg-neutral-950 dark:hover:bg-neutral-800"
          >
            <IconChevronLeft className="size-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className="px-3">
          <p
            className="text-sm font-bold text-neutral-500 dark:text-neutral-400"
            aria-live="polite"
          >
            <span className="text-neutral-900 italic dark:text-neutral-100">
              2
            </span>{' '}
            <span className="px-1 opacity-40">/</span> 5
          </p>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            aria-label="Next"
            size="icon"
            className="rounded-full border-none bg-white shadow-sm transition-all hover:scale-110 hover:bg-neutral-50 active:scale-95 dark:bg-neutral-950 dark:hover:bg-neutral-800"
          >
            <IconChevronRight className="size-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Pagination13;
