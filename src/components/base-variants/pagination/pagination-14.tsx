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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Pagination14 = () => {
  return (
    <Pagination className="py-2">
      <PaginationContent className="mx-auto w-fit gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 p-1.5 shadow-sm max-sm:flex-wrap max-sm:justify-center dark:border-neutral-800 dark:bg-neutral-900/50">
        <PaginationItem>
          <PaginationLink
            href="#"
            aria-label="Start"
            size="icon"
            className="rounded-xl border-none bg-white shadow-sm transition-all hover:bg-neutral-100 active:scale-95 dark:bg-neutral-950 dark:hover:bg-neutral-800"
          >
            <IconChevronsLeft className="size-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            aria-label="Prev"
            size="icon"
            className="rounded-xl border-none transition-all hover:bg-white active:scale-95 dark:hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <IconChevronLeft className="size-4" />
          </PaginationLink>
        </PaginationItem>

        <PaginationItem className="mx-1 flex items-center gap-2 rounded-xl border border-neutral-100 bg-white px-3 whitespace-nowrap shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
          <span className="shrink-0 text-[10px] font-bold tracking-tight text-neutral-500 uppercase dark:text-neutral-400">
            Page
          </span>
          <Select defaultValue={String(1)} aria-label="Jump to page">
            <SelectTrigger
              id="jump-page"
              className="h-7 w-fit min-w-[40px] border-none px-0 font-bold text-neutral-900 shadow-none focus:ring-0 dark:bg-transparent dark:text-neutral-100 dark:hover:bg-transparent"
              aria-label="Choose page"
            >
              <SelectValue placeholder="1" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-neutral-200 shadow-xl dark:border-neutral-800">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((page) => (
                <SelectItem
                  key={page}
                  value={String(page)}
                  className="rounded-lg"
                >
                  {page}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="shrink-0 text-[10px] font-bold text-neutral-400 dark:text-neutral-500">
            / 10
          </span>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            href="#"
            aria-label="Next"
            size="icon"
            className="rounded-xl border-none transition-all hover:bg-white active:scale-95 dark:hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <IconChevronRight className="size-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            aria-label="End"
            size="icon"
            className="rounded-xl border-none bg-white shadow-sm transition-all hover:bg-neutral-100 active:scale-95 dark:bg-neutral-950 dark:hover:bg-neutral-800"
          >
            <IconChevronsRight className="size-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Pagination14;
