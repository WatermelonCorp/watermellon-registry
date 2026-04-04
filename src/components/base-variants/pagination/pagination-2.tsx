import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';

const Pagination2 = () => {
  return (
    <Pagination>
      <PaginationContent className="gap-4">
        <PaginationItem>
          <PaginationLink
            href="#"
            aria-label="Previous"
            size="icon"
            className="size-9 rounded-xl border-none bg-neutral-50 transition-all hover:bg-neutral-100 active:scale-95 dark:bg-neutral-900/50 dark:hover:bg-neutral-800"
          >
            <IconChevronLeft className="size-5 text-neutral-600 dark:text-neutral-400" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            className="size-9 rounded-xl border-none transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900"
          >
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            isActive
            className="size-9 rounded-xl border-none text-black shadow-sm shadow-neutral-400 dark:bg-neutral-900 dark:text-white dark:shadow-neutral-700"
          >
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            className="size-9 rounded-xl border-none transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900"
          >
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            aria-label="Next"
            size="icon"
            className="size-9 rounded-xl border-none bg-neutral-50 transition-all hover:bg-neutral-100 active:scale-95 dark:bg-neutral-900/50 dark:hover:bg-neutral-800"
          >
            <IconChevronRight className="size-5 text-neutral-600 dark:text-neutral-400" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Pagination2;
