'use client'

import { useMemo, useState } from 'react'

import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'

import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

type InvoiceStatus = 'failed' | 'paid' | 'processing' | 'review'

type ClientInvoice = {
  amount: number
  email: string
  id: string
  name: string
  status: InvoiceStatus
}

type SortDirection = 'asc' | 'desc'

type SortableColumn = 'amount' | 'email' | 'name' | 'status'

type SortConfig = {
  column: SortableColumn
  direction: SortDirection
}

const data: readonly ClientInvoice[] = [
  {
    id: 'INV-301',
    name: 'Shoreline Co',
    amount: 699,
    status: 'paid',
    email: 'accounts@shoreline.co'
  },
  {
    id: 'INV-302',
    name: 'Kevin Lincoln',
    amount: 242,
    status: 'paid',
    email: 'kevinli09@gmail.com'
  },
  {
    id: 'INV-303',
    name: 'Milton Rose',
    amount: 655,
    status: 'processing',
    email: 'rose96@gmail.com'
  },
  {
    id: 'INV-304',
    name: 'Silas Ryan',
    amount: 874,
    status: 'review',
    email: 'silas22@gmail.com'
  },
  {
    id: 'INV-305',
    name: 'Ben Tenison',
    amount: 541,
    status: 'failed',
    email: 'bent@hotmail.com'
  }
] as const

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)

const DataTable5 = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    column: 'name',
    direction: 'asc'
  })

  const selectedIdSet = useMemo(() => new Set(selectedIds), [selectedIds])

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

  const allSelected = sortedData.length > 0 && selectedIds.length === sortedData.length
  const someSelected = selectedIds.length > 0 && !allSelected

  const toggleAll = (checked: boolean) => {
    setSelectedIds(checked ? sortedData.map((item) => item.id) : [])
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

  const getSortDirection = (column: SortableColumn) => (sortConfig.column === column ? sortConfig.direction : undefined)

  const renderSortIcon = (column: SortableColumn) => {
    const direction = getSortDirection(column)

    if (direction === 'asc') {
      return <ChevronUpIcon className='size-4 shrink-0 opacity-60' aria-hidden='true' />
    }

    if (direction === 'desc') {
      return <ChevronDownIcon className='size-4 shrink-0 opacity-60' aria-hidden='true' />
    }

    return null
  }

  return (
    <div className='w-60 sm:w-100 md:w-120 lg:w-160 2xl:w-220 mx-auto'>
      <div className='overflow-hidden rounded-xl border border-border/60 bg-background shadow-sm'>
        <Table className='w-60 sm:w-100 md:w-120 lg:w-160 2xl:w-220 mx-auto'>
          <TableHeader>
            <TableRow>
              <TableHead className='h-12 w-10 bg-muted/20 font-medium'>
                <Checkbox
                  checked={allSelected}
                  aria-checked={someSelected ? 'mixed' : allSelected}
                  onCheckedChange={(value) => toggleAll(!!value)}
                  aria-label='Select all invoices'
                  className='after:hidden data-checked:border-sky-600 data-checked:bg-sky-600 data-checked:text-white dark:data-checked:border-sky-500 dark:data-checked:bg-sky-500 dark:data-checked:text-white'
                />
              </TableHead>
              {([
                ['name', 'Name'],
                ['status', 'Status'],
                ['email', 'Email'],
                ['amount', 'Amount']
              ] as const).map(([column, label]) => {
                const direction = getSortDirection(column)

                return (
                  <TableHead
                    key={column}
                    aria-sort={
                      direction === 'asc' ? 'ascending' : direction === 'desc' ? 'descending' : 'none'
                    }
                    className={cn(
                      'h-12 bg-muted/20 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground',
                      column === 'amount' && 'text-left'
                    )}
                  >
                    <button
                      type='button'
                      className='flex w-full items-center justify-between gap-2 text-left transition-opacity hover:opacity-80'
                      onClick={() => toggleSort(column)}
                    >
                      <span className='truncate'>{label}</span>
                      {renderSortIcon(column)}
                    </button>
                  </TableHead>
                )
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((row) => {
              const isSelected = selectedIdSet.has(row.id)

              return (
                <TableRow
                  key={row.id}
                  data-state={isSelected ? 'selected' : undefined}
                  className='transition-colors hover:bg-muted/10 data-[state=selected]:bg-muted/20'
                >
                  <TableCell className='py-3.5'>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(value) => toggleRow(row.id, !!value)}
                      aria-label={`Select ${row.name}`}
                      className='after:hidden data-checked:border-sky-600 data-checked:bg-sky-600 data-checked:text-white dark:data-checked:border-sky-500 dark:data-checked:bg-sky-500 dark:data-checked:text-white'
                    />
                  </TableCell>
                  <TableCell className='py-3.5'>
                    <div className='font-medium'>{row.name}</div>
                  </TableCell>
                  <TableCell className='py-3.5'>
                    <div className='capitalize text-sm text-muted-foreground'>{row.status}</div>
                  </TableCell>
                  <TableCell className='py-3.5'>
                    <div className='text-sm text-muted-foreground'>{row.email}</div>
                  </TableCell>
                  <TableCell className='py-3.5'>
                    <div className='font-medium'>{formatCurrency(row.amount)}</div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default DataTable5
