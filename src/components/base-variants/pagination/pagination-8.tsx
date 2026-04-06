import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const Pagination8 = () => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            className="rounded-lg px-3 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
          />
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
            className="rounded-xl border-none shadow-lg"
          >
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <Tooltip>
            <TooltipTrigger
              asChild
              className="flex size-9 cursor-pointer items-center justify-center rounded-xl transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <PaginationEllipsis />
            </TooltipTrigger>
            <TooltipContent className="rounded-lg border-none bg-indigo-600 px-3 py-1.5 text-white shadow-lg">
              <p className="text-xs font-bold tracking-wider uppercase">
                Search 10+ more
              </p>
            </TooltipContent>
          </Tooltip>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href="#"
            className="rounded-lg px-3 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Pagination8;
