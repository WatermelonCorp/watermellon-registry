'use client'

import { useMemo, useState } from 'react'

import { ChevronDownIcon, Columns3Icon, RefreshCcwIcon, SearchIcon } from 'lucide-react'

import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type InvoiceStatus = 'failed' | 'paid' | 'processing' | 'review'

type ClientInvoice = {
  amount: number
  email: string
  id: string
  name: string
  status: InvoiceStatus
}

type ColumnKey = 'amount' | 'email' | 'name' | 'status'

type ColumnOption = {
  key: ColumnKey
  label: string
}

const data: readonly ClientInvoice[] = [
  {
    id: 'INV-201',
    name: 'Harbor Studio',
    amount: 699,
    status: 'paid',
    email: 'hello@harborstudio.co'
  },
  {
    id: 'INV-202',
    name: 'Bright Matter',
    amount: 242,
    status: 'paid',
    email: 'team@brightmatter.io'
  },
  {
    id: 'INV-203',
    name: 'Grain Works',
    amount: 655,
    status: 'processing',
    email: 'ops@grainworks.design'
  },
  {
    id: 'INV-204',
    name: 'North Track',
    amount: 874,
    status: 'review',
    email: 'finance@northtrack.app'
  },
  {
    id: 'INV-205',
    name: 'Common Unit',
    amount: 541,
    status: 'failed',
    email: 'billing@commonunit.dev'
  }
] as const

const columnOptions: readonly ColumnOption[] = [
  { key: 'name', label: 'Name' },
  { key: 'status', label: 'Status' },
  { key: 'email', label: 'Email' },
  { key: 'amount', label: 'Amount' }
] as const

const defaultVisibility: Record<ColumnKey, boolean> = {
  name: true,
  status: true,
  email: true,
  amount: true
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)

const DataTable3 = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [visibleColumns, setVisibleColumns] = useState<Record<ColumnKey, boolean>>(defaultVisibility)

  const selectedIdSet = useMemo(() => new Set(selectedIds), [selectedIds])
  const allSelected = selectedIds.length === data.length
  const someSelected = selectedIds.length > 0 && !allSelected

  const filteredColumnOptions = useMemo(
    () =>
      columnOptions.filter((column) =>
        column.label.toLowerCase().includes(searchQuery.trim().toLowerCase())
      ),
    [searchQuery]
  )

  const toggleAll = (checked: boolean) => {
    setSelectedIds(checked ? data.map((item) => item.id) : [])
  }

  const toggleRow = (id: string, checked: boolean) => {
    setSelectedIds((current) => {
      if (checked) {
        return current.includes(id) ? current : [...current, id]
      }

      return current.filter((item) => item !== id)
    })
  }

  const toggleColumn = (key: ColumnKey, checked: boolean) => {
    setVisibleColumns((current) => ({
      ...current,
      [key]: checked
    }))
  }

  const resetColumns = () => {
    setVisibleColumns(defaultVisibility)
    setSearchQuery('')
  }

  return (
    <div className='w-60 sm:w-100 md:w-120 lg:w-160 2xl:w-220 mx-auto'>
      <div className='py-4'>
        <DropdownMenu>
          <DropdownMenuTrigger className='inline-flex w-full max-w-44 items-center justify-between gap-2 rounded-lg border border-border/60 bg-background px-4 py-2 text-sm font-medium text-foreground outline-none transition-colors hover:bg-muted/20'>
            <span className='flex items-center gap-2'>
              <Columns3Icon className='size-4 text-muted-foreground' />
              Columns
            </span>
            <ChevronDownIcon className='size-4 text-muted-foreground' />
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start' className='w-56 rounded-lg border border-border/60 bg-background p-1 shadow-sm'>
            <div className='relative px-0.5 py-0.5'>
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='rounded-md border-border/60 bg-background pl-8'
                placeholder='Search columns'
                onKeyDown={(e) => e.stopPropagation()}
              />
              <SearchIcon className='absolute inset-y-0 left-3 my-auto size-4 text-muted-foreground' />
            </div>
            <DropdownMenuSeparator />
            {filteredColumnOptions.length > 0 ? (
              filteredColumnOptions.map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.key}
                  checked={visibleColumns[column.key]}
                  onCheckedChange={(value) => toggleColumn(column.key, !!value)}
                  onSelect={(e) => e.preventDefault()}
                >
                  {column.label}
                </DropdownMenuCheckboxItem>
              ))
            ) : (
              <DropdownMenuItem disabled>No columns found</DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={resetColumns}>
              <RefreshCcwIcon className='size-4' />
              Reset
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='overflow-hidden rounded-xl border border-border/60 bg-background'>
        <Table className='w-60 sm:w-100 md:w-120 lg:w-160 2xl:w-220 mx-auto'>
          <TableHeader>
            <TableRow>
              <TableHead className='h-12 w-10 border-b border-border/60 bg-transparent text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase'>
                <Checkbox
                  checked={allSelected}
                  aria-checked={someSelected ? 'mixed' : allSelected}
                  onCheckedChange={(value) => toggleAll(!!value)}
                  aria-label='Select all invoices'
                  className='after:hidden data-checked:border-sky-600 data-checked:bg-sky-600 data-checked:text-white dark:data-checked:border-sky-500 dark:data-checked:bg-sky-500 dark:data-checked:text-white'
                />
              </TableHead>
              {visibleColumns.name ? (
                <TableHead className='h-12 border-b border-border/60 bg-transparent text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase'>
                  Name
                </TableHead>
              ) : null}
              {visibleColumns.status ? (
                <TableHead className='h-12 border-b border-border/60 bg-transparent text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase'>
                  Status
                </TableHead>
              ) : null}
              {visibleColumns.email ? (
                <TableHead className='h-12 border-b border-border/60 bg-transparent text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase'>
                  Email
                </TableHead>
              ) : null}
              {visibleColumns.amount ? (
                <TableHead className='h-12 border-b border-border/60 bg-transparent text-right text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase'>
                  Amount
                </TableHead>
              ) : null}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => {
              const isSelected = selectedIdSet.has(row.id)

              return (
                <TableRow
                  key={row.id}
                  data-state={isSelected ? 'selected' : undefined}
                  className='transition-colors hover:bg-muted/20 data-[state=selected]:bg-muted/25'
                >
                  <TableCell className='py-3'>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(value) => toggleRow(row.id, !!value)}
                      aria-label={`Select ${row.name}`}
                      className='after:hidden data-checked:border-sky-600 data-checked:bg-sky-600 data-checked:text-white dark:data-checked:border-sky-500 dark:data-checked:bg-sky-500 dark:data-checked:text-white'
                    />
                  </TableCell>
                  {visibleColumns.name ? (
                    <TableCell className='py-3'>
                      <div className='font-medium'>{row.name}</div>
                    </TableCell>
                  ) : null}
                  {visibleColumns.status ? (
                    <TableCell className='py-3'>
                      <div className='capitalize text-sm text-muted-foreground'>{row.status}</div>
                    </TableCell>
                  ) : null}
                  {visibleColumns.email ? (
                    <TableCell className='py-3'>
                      <div className='text-sm text-muted-foreground'>{row.email}</div>
                    </TableCell>
                  ) : null}
                  {visibleColumns.amount ? (
                    <TableCell className='py-3'>
                      <div className='text-right font-medium'>{formatCurrency(row.amount)}</div>
                    </TableCell>
                  ) : null}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default DataTable3
