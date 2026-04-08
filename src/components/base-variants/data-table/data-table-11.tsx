'use client'

import { useMemo, useState } from 'react'

import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from 'lucide-react'

import { Badge } from '@/components/ui//badge'
import { Button } from '@/components/ui//button'
import { Checkbox } from '@/components/ui//checkbox'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from '@/components/ui//pagination'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui//select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui//table'
import { usePagination } from '@/hooks/use-pagination'
import { cn } from '@/lib/utils'

type Availability = 'In Stock' | 'Limited' | 'Out of Stock'

type ProductItem = {
  availability: Availability
  id: string
  price: number
  productName: string
}

type SortDirection = 'asc' | 'desc'

type SortableColumn = 'availability' | 'price' | 'productName'

type SortConfig = {
  column: SortableColumn
  direction: SortDirection
}

const data: readonly ProductItem[] = [
  { id: 'PRD-201', productName: 'Atlas Phone X', price: 699, availability: 'In Stock' },
  { id: 'PRD-202', productName: 'North Headphones', price: 242, availability: 'In Stock' },
  { id: 'PRD-203', productName: 'Pulse Tablet Air', price: 655, availability: 'Limited' },
  { id: 'PRD-204', productName: 'Studio Display 24', price: 874, availability: 'In Stock' },
  { id: 'PRD-205', productName: 'Mono Charging Dock', price: 541, availability: 'Out of Stock' },
  { id: 'PRD-206', productName: 'Trail Smartwatch', price: 319, availability: 'Limited' },
  { id: 'PRD-207', productName: 'Luma Keyboard', price: 189, availability: 'In Stock' },
  { id: 'PRD-208', productName: 'Vector Camera Mini', price: 999, availability: 'Out of Stock' },
  { id: 'PRD-209', productName: 'Glass Speaker One', price: 420, availability: 'Limited' },
  { id: 'PRD-210', productName: 'Orbit Mouse', price: 129, availability: 'In Stock' },
  { id: 'PRD-211', productName: 'Signal Router Max', price: 349, availability: 'Limited' },
  { id: 'PRD-212', productName: 'Core Laptop Stand', price: 79, availability: 'In Stock' }
] as const

const availabilityBadgeClass: Record<Availability, string> = {
  'In Stock': 'border-none bg-green-600/10 text-green-600 dark:bg-green-400/10 dark:text-green-400',
  'Out of Stock': 'border-none bg-destructive/10 text-destructive dark:bg-destructive/20',
  Limited: 'border-none bg-amber-600/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400'
}

const formatCurrency = (price: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)

const DataTable11 = () => {
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(5)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    column: 'productName',
    direction: 'asc'
  })

  const sortedData = useMemo(() => {
    const sorted = [...data]

    sorted.sort((left, right) => {
      const leftValue = left[sortConfig.column]
      const rightValue = right[sortConfig.column]

      const comparison =
        typeof leftValue === 'number' && typeof rightValue === 'number'
          ? leftValue - rightValue
          : String(leftValue).localeCompare(String(rightValue))

      return sortConfig.direction === 'asc' ? comparison : -comparison
    })

    return sorted
  }, [sortConfig])

  const pageCount = Math.max(1, Math.ceil(sortedData.length / pageSize))
  const safePageIndex = Math.min(pageIndex, pageCount - 1)
  const currentPage = safePageIndex + 1
  const pageStart = safePageIndex * pageSize
  const pageEnd = pageStart + pageSize
  const paginatedData = sortedData.slice(pageStart, pageEnd)

  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage,
    totalPages: pageCount,
    paginationItemsToDisplay: 5
  })

  const allSelectedOnPage =
    paginatedData.length > 0 && paginatedData.every((item) => selectedIds.includes(item.id))
  const someSelectedOnPage =
    paginatedData.some((item) => selectedIds.includes(item.id)) && !allSelectedOnPage

  const toggleAllOnPage = (checked: boolean) => {
    if (checked) {
      setSelectedIds((current) => Array.from(new Set([...current, ...paginatedData.map((item) => item.id)])))
      return
    }

    setSelectedIds((current) => current.filter((id) => !paginatedData.some((item) => item.id === id)))
  }

  const toggleRow = (id: string, checked: boolean) => {
    setSelectedIds((current) => {
      if (checked) {
        return current.includes(id) ? current : [...current, id]
      }

      return current.filter((item) => item !== id)
    })
  }

  const toggleSort = (column: SortableColumn) => {
    setSortConfig((current) => {
      if (current.column === column) {
        return {
          column,
          direction: current.direction === 'asc' ? 'desc' : 'asc'
        }
      }

      return {
        column,
        direction: 'asc'
      }
    })
  }

  const changePageSize = (value: string | null) => {
    if (!value) {
      return
    }

    setPageSize(Number(value))
    setPageIndex(0)
  }

  return (
    <div className='w-60 sm:w-100 md:w-120 lg:w-160 2xl:w-220 mx-auto space-y-4'>
      <div className='overflow-hidden rounded-xl border border-border/60 bg-background shadow-sm'>
        <Table className='w-60 sm:w-100 md:w-120 lg:w-160 2xl:w-220 mx-auto'>
          <TableHeader>
            <TableRow className='hover:bg-transparent'>
              <TableHead className='h-12 w-10 bg-muted/20 font-medium'>
                <Checkbox
                  checked={allSelectedOnPage}
                  aria-checked={someSelectedOnPage ? 'mixed' : allSelectedOnPage}
                  onCheckedChange={(value) => toggleAllOnPage(!!value)}
                  aria-label='Select all products on this page'
                  className='after:hidden data-checked:border-sky-600 data-checked:bg-sky-600 data-checked:text-white dark:data-checked:border-sky-500 dark:data-checked:bg-sky-500 dark:data-checked:text-white'
                />
              </TableHead>

              {([
                ['productName', 'Product Name'],
                ['price', 'Price'],
                ['availability', 'Availability']
              ] as const).map(([column, label]) => {
                const direction = sortConfig.column === column ? sortConfig.direction : undefined

                return (
                  <TableHead
                    key={column}
                    className='h-12 bg-muted/20 text-[13px] font-medium tracking-[0.08em] text-muted-foreground'
                  >
                    <button
                      type='button'
                      className={cn(
                        'flex w-full items-center justify-between gap-2 text-left transition-opacity hover:opacity-80',
                        'font-medium'
                      )}
                      onClick={() => toggleSort(column)}
                    >
                      {label}
                      {direction === 'asc' ? (
                        <ChevronUpIcon className='size-4 opacity-60' aria-hidden='true' />
                      ) : direction === 'desc' ? (
                        <ChevronDownIcon className='size-4 opacity-60' aria-hidden='true' />
                      ) : null}
                    </button>
                  </TableHead>
                )
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => {
                const isSelected = selectedIds.includes(item.id)

                return (
                  <TableRow
                    key={item.id}
                    data-state={isSelected ? 'selected' : undefined}
                    className='hover:bg-muted/10 data-[state=selected]:bg-muted/20'
                  >
                    <TableCell className='py-3.5'>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(value) => toggleRow(item.id, !!value)}
                        aria-label={`Select ${item.productName}`}
                        className='after:hidden data-checked:border-sky-600 data-checked:bg-sky-600 data-checked:text-white dark:data-checked:border-sky-500 dark:data-checked:bg-sky-500 dark:data-checked:text-white'
                      />
                    </TableCell>
                    <TableCell className='py-3.5'>
                      <div className='font-medium'>{item.productName}</div>
                    </TableCell>
                    <TableCell className='py-3.5'>
                      <div className='font-medium'>{formatCurrency(item.price)}</div>
                    </TableCell>
                    <TableCell className='py-3.5'>
                      <Badge className={availabilityBadgeClass[item.availability]}>{item.availability}</Badge>
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={4} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-background px-4 py-3 shadow-sm max-sm:flex-col'>
        <p className='text-muted-foreground flex-1 text-sm whitespace-nowrap' aria-live='polite'>
          Page <span className='text-foreground'>{currentPage}</span> of <span className='text-foreground'>{pageCount}</span>
        </p>

        <div className='grow'>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button
                  size='icon'
                  variant='outline'
                  className='disabled:pointer-events-none disabled:opacity-50'
                  onClick={() => setPageIndex((current) => Math.max(current - 1, 0))}
                  disabled={safePageIndex === 0}
                  aria-label='Go to previous page'
                >
                  <ChevronLeftIcon aria-hidden='true' />
                </Button>
              </PaginationItem>

              {showLeftEllipsis ? (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : null}

              {pages.map((page) => {
                const isActive = page === currentPage

                return (
                  <PaginationItem key={page}>
                    <Button
                      size='icon'
                      variant={isActive ? 'outline' : 'ghost'}
                      onClick={() => setPageIndex(page - 1)}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {page}
                    </Button>
                  </PaginationItem>
                )
              })}

              {showRightEllipsis ? (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : null}

              <PaginationItem>
                <Button
                  size='icon'
                  variant='outline'
                  className='disabled:pointer-events-none disabled:opacity-50'
                  onClick={() => setPageIndex((current) => Math.min(current + 1, pageCount - 1))}
                  disabled={safePageIndex >= pageCount - 1}
                  aria-label='Go to next page'
                >
                  <ChevronRightIcon aria-hidden='true' />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        <div className='flex flex-1 justify-end'>
          <Select value={pageSize.toString()} onValueChange={changePageSize}>
            <SelectTrigger
              id='results-per-page'
              className='h-9 w-fit whitespace-nowrap border-border/60'
              aria-label='Results per page'
            >
              <SelectValue placeholder='Select number of results' />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 25, 50].map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size} / page
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

export default DataTable11
