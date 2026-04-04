import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const Pagination1 = () => {
  return (
    <Pagination className="py-2">
      <PaginationContent className="gap-3">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            className="px-3 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            Back
          </PaginationPrevious>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            className="transition-all hover:bg-neutral-50 active:scale-90 dark:hover:bg-neutral-900"
          >
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            isActive
            className="!border-primary/50 scale-110 shadow-md transition-all"
          >
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            className="transition-all hover:bg-neutral-50 active:scale-90 dark:hover:bg-neutral-900"
          >
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href="#"
            className="px-3 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            Next
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Pagination1;
