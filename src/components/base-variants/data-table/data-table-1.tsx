'use client'

import { useMemo, useState } from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export type ProjectInvoice = {
  amount: number
  client: string
  email: string
  id: string
  status: 'draft' | 'paid' | 'pending' | 'review'
}

const data: readonly ProjectInvoice[] = [
  {
    id: 'INV-001',
    client: 'North Studio',
    amount: 1240,
    status: 'paid',
    email: 'billing@northstudio.co'
  },
  {
    id: 'INV-002',
    client: 'Atlas Works',
    amount: 540,
    status: 'review',
    email: 'accounts@atlasworks.io'
  },
  {
    id: 'INV-003',
    client: 'Paper Trail',
    amount: 920,
    status: 'pending',
    email: 'hello@papertrail.design'
  },
  {
    id: 'INV-004',
    client: 'Luma Team',
    amount: 1580,
    status: 'paid',
    email: 'finance@luma.team'
  },
  {
    id: 'INV-005',
    client: 'Mono Labs',
    amount: 310,
    status: 'draft',
    email: 'ops@monolabs.dev'
  }
] as const

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)

const DataTable1 = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const allSelected = selectedIds.length === data.length
  const someSelected = selectedIds.length > 0 && !allSelected

  const selectedIdSet = useMemo(() => new Set(selectedIds), [selectedIds])

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

  return (
    <div className='w-full'>
      <div className='overflow-hidden rounded-lg border border-border/60 bg-background'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='h-11 w-10 bg-muted/20 font-medium'>
                <Checkbox
                  checked={allSelected}
                  aria-checked={someSelected ? 'mixed' : allSelected}
                  onCheckedChange={(value) => toggleAll(!!value)}
                  aria-label='Select all'
                  className='after:hidden data-checked:border-sky-600 data-checked:bg-sky-600 data-checked:text-white dark:data-checked:border-sky-500 dark:data-checked:bg-sky-500 dark:data-checked:text-white'
                />
              </TableHead>
              <TableHead className='h-11 bg-muted/20 font-medium'>Client</TableHead>
              <TableHead className='h-11 bg-muted/20 font-medium'>Status</TableHead>
              <TableHead className='h-11 bg-muted/20 font-medium'>Email</TableHead>
              <TableHead className='h-11 bg-muted/20 text-right font-medium'>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => {
              const isSelected = selectedIdSet.has(row.id)

              return (
                <TableRow
                  key={row.id}
                  data-state={isSelected ? 'selected' : undefined}
                  className='transition-colors hover:bg-muted/10'
                >
                  <TableCell className='py-3'>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(value) => toggleRow(row.id, !!value)}
                      aria-label={`Select ${row.client}`}
                      className='after:hidden data-checked:border-sky-600 data-checked:bg-sky-600 data-checked:text-white dark:data-checked:border-sky-500 dark:data-checked:bg-sky-500 dark:data-checked:text-white'
                    />
                  </TableCell>
                  <TableCell className='py-3'>
                    <div className='font-medium'>{row.client}</div>
                  </TableCell>
                  <TableCell className='py-3'>
                    <div className='capitalize text-sm text-muted-foreground'>{row.status}</div>
                  </TableCell>
                  <TableCell className='py-3'>
                    <div className='text-sm text-muted-foreground'>{row.email}</div>
                  </TableCell>
                  <TableCell className='py-3'>
                    <div className='text-right font-medium'>{formatCurrency(row.amount)}</div>
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

export default DataTable1
