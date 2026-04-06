import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const Pagination12 = () => {
  return (
    <Pagination>
      <PaginationContent className="w-full justify-between">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            className="rounded-lg border border-neutral-200 px-3 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-800"
          />
        </PaginationItem>
        <PaginationItem className="rounded-full border border-neutral-200 bg-neutral-100 px-4 py-1.5 shadow-inner dark:border-neutral-700 dark:bg-neutral-800">
          <p
            className="text-muted-foreground/80 text-xs font-medium tracking-[0.2em] uppercase"
            aria-live="polite"
          >
            Page{' '}
            <span className="text-foreground font-mono text-sm font-bold tracking-normal">
              02
            </span>{' '}
            / <span className="text-foreground font-mono text-sm">05</span>
          </p>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href="#"
            className="rounded-lg border border-neutral-200 px-3 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-800"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Pagination12;
