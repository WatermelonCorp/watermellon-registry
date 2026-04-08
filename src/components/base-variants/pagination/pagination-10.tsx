import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const Pagination10 = () => {
  return (
    <Pagination>
      <PaginationContent className="gap-2 rounded-2xl border border-neutral-200 bg-white/80 p-2 shadow-xl backdrop-blur-sm transition-all hover:shadow-2xl dark:border-neutral-800 dark:bg-neutral-950">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            className="rounded-xl px-4 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
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
            className="rounded-xl border-none font-bold shadow-lg transition-all"
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
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Pagination10;
