import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const Pagination9 = () => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" className="rounded-none" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            isActive
            className='relative rounded-none border-0 bg-transparent! p-0 font-bold !shadow-none transition-all duration-300 before:absolute before:-bottom-1 before:left-0 before:h-1 before:w-full before:bg-indigo-600 before:content-[""] hover:before:bg-indigo-400'
          >
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            className="rounded-none px-3 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
          >
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            className="rounded-none px-3 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
          >
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" className="rounded-none" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Pagination9;
