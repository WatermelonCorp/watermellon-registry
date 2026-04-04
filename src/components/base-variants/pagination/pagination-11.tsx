import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const Pagination11 = () => {
  return (
    <Pagination>
      <PaginationContent className="w-full justify-between gap-6 rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 px-2 py-2 dark:border-neutral-800 dark:bg-neutral-900/50">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            className="rounded-xl border-[1.5px] border-indigo-600/30 px-6 text-indigo-700 transition-all hover:scale-105 hover:bg-neutral-100 hover:text-indigo-800 dark:text-indigo-400 dark:hover:bg-neutral-800"
          >
            Previous
          </PaginationPrevious>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href="#"
            className="rounded-xl border-[1.5px] border-indigo-600/30 px-6 text-indigo-700 transition-all hover:scale-105 hover:bg-neutral-100 hover:text-indigo-800 dark:text-indigo-400 dark:hover:bg-neutral-800"
          >
            Next Step
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Pagination11;
