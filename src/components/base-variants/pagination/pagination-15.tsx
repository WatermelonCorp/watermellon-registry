import { useId } from 'react';
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconDots,
} from '@tabler/icons-react';
import { Label } from '@/components/ui/label';
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

const pages = [1, 2, 3];

const Pagination15 = () => {
  const id = useId();

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-6 rounded-2xl border border-neutral-200 bg-white/70 p-5 shadow-xl backdrop-blur-md max-sm:flex-col max-sm:justify-center max-sm:gap-4 max-sm:px-3 max-sm:py-6 dark:border-neutral-800 dark:bg-neutral-950/70">
      <div className="flex shrink-0 items-center gap-4 rounded-xl border border-neutral-100 bg-neutral-100/50 p-1 dark:border-neutral-800 dark:bg-neutral-900/50">
        <Label
          htmlFor={id}
          className="pl-2 text-[10px] font-bold tracking-widest text-neutral-500 uppercase dark:text-neutral-400"
        >
          Rows
        </Label>
        <Select defaultValue="10">
          <SelectTrigger
            id={id}
            className="h-7 w-[60px] rounded-lg border-none bg-white px-2 text-xs font-bold shadow-none dark:bg-neutral-950"
          >
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-neutral-200 shadow-2xl dark:border-neutral-800">
            <SelectItem value="10" className="rounded-lg">
              10
            </SelectItem>
            <SelectItem value="25" className="rounded-lg">
              25
            </SelectItem>
            <SelectItem value="50" className="rounded-lg">
              50
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-6 max-sm:flex-col max-sm:justify-center max-sm:gap-4">
        <p
          className="text-xs font-semibold text-neutral-500 dark:text-neutral-400"
          aria-live="polite"
        >
          Showing{' '}
          <span className="px-1 font-bold text-indigo-600 dark:text-indigo-400">
            1-10
          </span>{' '}
          of{' '}
          <span className="px-1 font-bold text-neutral-900 dark:text-neutral-100">
            100
          </span>{' '}
          items
        </p>
        <Pagination className="w-auto">
          <PaginationContent className="gap-1.5 rounded-xl bg-neutral-100/50 p-1 max-sm:flex-wrap max-sm:justify-center max-sm:gap-1 dark:bg-neutral-900/50">
            <PaginationItem className="hidden sm:flex">
              <PaginationLink
                href="#"
                aria-label="Jump Start"
                size="icon"
                className="rounded-xl border-none bg-white shadow-sm transition-all hover:scale-105 hover:bg-neutral-100 active:scale-95 dark:bg-neutral-950 dark:hover:bg-neutral-800"
              >
                <IconChevronsLeft className="size-4" />
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                aria-label="Back"
                size="icon"
                className="rounded-lg border-none transition-all hover:bg-white active:scale-95 dark:hover:bg-neutral-100 dark:hover:bg-neutral-800"
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
                    'rounded-lg font-bold transition-all',
                    page === 2
                      ? 'scale-110 bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:text-white dark:bg-indigo-600 dark:shadow-indigo-900/20 dark:hover:bg-indigo-700'
                      : 'hover:bg-white dark:hover:bg-neutral-800',
                  )}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <Tooltip>
                <TooltipTrigger
                  asChild
                  className="flex size-8 items-center justify-center rounded-lg transition-all hover:bg-white active:scale-95 dark:hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <IconDots className="size-4 opacity-50" />
                </TooltipTrigger>
                <TooltipContent className="rounded-lg border-none bg-neutral-900 px-3 py-1.5 text-white shadow-xl">
                  <p className="text-[10px] font-bold tracking-tight uppercase">
                    2 more pages
                  </p>
                </TooltipContent>
              </Tooltip>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                aria-label="Forward"
                size="icon"
                className="rounded-lg border-none transition-all hover:bg-white active:scale-95 dark:hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <IconChevronRight className="size-4" />
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className="hidden sm:flex">
              <PaginationLink
                href="#"
                aria-label="Jump End"
                size="icon"
                className="rounded-lg border-none bg-white shadow-sm transition-all hover:scale-105 hover:bg-neutral-100 active:scale-95 dark:bg-neutral-950 dark:hover:bg-neutral-800"
              >
                <IconChevronsRight className="size-4" />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Pagination15;
