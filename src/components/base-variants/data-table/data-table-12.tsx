'use client'

import { useMemo, useState } from 'react'

import { DownloadIcon, FileSpreadsheetIcon, FileTextIcon } from 'lucide-react'

import Papa from 'papaparse'
import * as XLSX from 'xlsx'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type PaymentStatus = 'failed' | 'processing' | 'success'

type Payment = {
  amount: number
  email: string
  id: string
  name: string
  status: PaymentStatus
}

const data: readonly Payment[] = [
  {
    id: 'PAY-101',
    name: 'Shang Chain',
    amount: 699,
    status: 'success',
    email: 'shang07@yahoo.com'
  },
  {
    id: 'PAY-102',
    name: 'Kevin Lincoln',
    amount: 242,
    status: 'success',
    email: 'kevinli09@gmail.com'
  },
  {
    id: 'PAY-103',
    name: 'Milton Rose',
    amount: 655,
    status: 'processing',
    email: 'rose96@gmail.com'
  },
  {
    id: 'PAY-104',
    name: 'Silas Ryan',
    amount: 874,
    status: 'success',
    email: 'silas22@gmail.com'
  },
  {
    id: 'PAY-105',
    name: 'Ben Tenison',
    amount: 541,
    status: 'failed',
    email: 'bent@hotmail.com'
  },
  {
    id: 'PAY-106',
    name: 'Alice Cooper',
    amount: 321,
    status: 'processing',
    email: 'alice@email.com'
  },
  {
    id: 'PAY-107',
    name: 'Bob Johnson',
    amount: 789,
    status: 'success',
    email: 'bob.j@company.com'
  },
  {
    id: 'PAY-108',
    name: 'Carol Williams',
    amount: 456,
    status: 'processing',
    email: 'carol.w@domain.org'
  }
] as const

const availabilityBadgeClass: Record<PaymentStatus, string> = {
  success: 'border-none bg-green-600/10 text-green-600 dark:bg-green-400/10 dark:text-green-400',
  failed: 'border-none bg-destructive/10 text-destructive dark:bg-destructive/20',
  processing: 'border-none bg-amber-600/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400'
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)

const DataTable12 = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const filteredData = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    if (!query) {
      return data
    }

    return data.filter((item) =>
      [item.name, item.email, item.status, String(item.amount)].some((value) => value.toLowerCase().includes(query))
    )
  }, [searchQuery])

  const allSelected = filteredData.length > 0 && filteredData.every((item) => selectedIds.includes(item.id))
  const someSelected = filteredData.some((item) => selectedIds.includes(item.id)) && !allSelected

  const selectedRows = data.filter((item) => selectedIds.includes(item.id))

  const exportRows = (): Payment[] => [...(selectedRows.length > 0 ? selectedRows : filteredData)]

  const toggleAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds((current) => Array.from(new Set([...current, ...filteredData.map((item) => item.id)])))
      return
    }

    setSelectedIds((current) => current.filter((id) => !filteredData.some((item) => item.id === id)))
  }

  const toggleRow = (id: string, checked: boolean) => {
    setSelectedIds((current) => {
      if (checked) {
        return current.includes(id) ? current : [...current, id]
      }

      return current.filter((item) => item !== id)
    })
  }

  const downloadBlob = (blob: Blob, filename: string) => {
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)

    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const exportToCSV = () => {
    const csv = Papa.unparse(exportRows(), { header: true })
    downloadBlob(new Blob([csv], { type: 'text/csv;charset=utf-8;' }), `payments-export-${new Date().toISOString().split('T')[0]}.csv`)
  }

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(exportRows())
    const workbook = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Payments')
    worksheet['!cols'] = [{ wch: 12 }, { wch: 20 }, { wch: 15 }, { wch: 28 }, { wch: 14 }]

    XLSX.writeFile(workbook, `payments-export-${new Date().toISOString().split('T')[0]}.xlsx`)
  }

  const exportToJSON = () => {
    const json = JSON.stringify(exportRows(), null, 2)
    downloadBlob(new Blob([json], { type: 'application/json' }), `payments-export-${new Date().toISOString().split('T')[0]}.json`)
  }

  return (
    <div className='w-full'>
      <div className='flex justify-between gap-2 pb-4 max-sm:flex-col sm:items-center'>
        <div className='flex items-center space-x-2'>
          <Input
            placeholder='Search all columns...'
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className='h-10 max-w-sm rounded-full border-border/60 bg-muted/20 px-4'
          />
        </div>
        <div className='flex items-center space-x-2'>
          <div className='text-muted-foreground text-sm'>
            {selectedRows.length > 0 ? (
              <span className='mr-2'>
                {selectedRows.length} of {filteredData.length} row(s) selected
              </span>
            ) : null}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className='inline-flex h-10 min-w-28 items-center justify-center rounded-md border border-border/60 bg-background px-3 py-2 text-sm font-medium text-foreground outline-none transition-colors hover:bg-muted/20'>
              <DownloadIcon className='mr-2 size-4' />
              Export
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-52'>
              <DropdownMenuItem onClick={exportToCSV} className='whitespace-nowrap'>
                <FileTextIcon className='mr-2 size-4' />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportToExcel} className='whitespace-nowrap'>
                <FileSpreadsheetIcon className='mr-2 size-4' />
                Export as Excel
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={exportToJSON} className='whitespace-nowrap'>
                <FileTextIcon className='mr-2 size-4' />
                Export as JSON
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className='overflow-hidden rounded-xl border border-border/60 bg-background shadow-sm'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='h-12 w-10 bg-muted/20 font-medium'>
                <Checkbox
                  checked={allSelected}
                  aria-checked={someSelected ? 'mixed' : allSelected}
                  onCheckedChange={(value) => toggleAll(!!value)}
                  aria-label='Select all filtered rows'
                  className='after:hidden data-checked:border-sky-600 data-checked:bg-sky-600 data-checked:text-white dark:data-checked:border-sky-500 dark:data-checked:bg-sky-500 dark:data-checked:text-white'
                />
              </TableHead>
              <TableHead className='h-12 bg-muted/20 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground'>
                Name
              </TableHead>
              <TableHead className='h-12 bg-muted/20 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground'>
                Status
              </TableHead>
              <TableHead className='h-12 bg-muted/20 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground'>
                Email
              </TableHead>
              <TableHead className='h-12 bg-muted/20 text-right text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground'>
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => {
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
                        aria-label={`Select ${item.name}`}
                        className='after:hidden data-checked:border-sky-600 data-checked:bg-sky-600 data-checked:text-white dark:data-checked:border-sky-500 dark:data-checked:bg-sky-500 dark:data-checked:text-white'
                      />
                    </TableCell>
                    <TableCell className='py-3.5'>
                      <div className='font-medium'>{item.name}</div>
                    </TableCell>
                    <TableCell className='py-3.5'>
                      <Badge className={availabilityBadgeClass[item.status]}>{item.status}</Badge>
                    </TableCell>
                    <TableCell className='py-3.5'>
                      <div className='lowercase text-muted-foreground'>{item.email}</div>
                    </TableCell>
                    <TableCell className='py-3.5 text-right'>
                      <div className='font-medium'>{formatCurrency(item.amount)}</div>
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default DataTable12
