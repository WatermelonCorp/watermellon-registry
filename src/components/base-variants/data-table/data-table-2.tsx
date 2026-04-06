'use client'

import { useMemo, useState } from 'react'

import { Rows2Icon, Rows3Icon, Rows4Icon } from 'lucide-react'

import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { cn } from '@/lib/utils'

type Density = 'compact' | 'flexible' | 'standard'

type InvoiceStatus = 'failed' | 'paid' | 'processing' | 'review'

type ClientInvoice = {
  amount: number
  email: string
  id: string
  name: string
  status: InvoiceStatus
}

type DensityOption = {
  icon: typeof Rows2Icon
  label: string
  value: Density
}

const densityOptions: readonly DensityOption[] = [
  {
    value: 'compact',
    label: 'Compact',
    icon: Rows4Icon
  },
  {
    value: 'standard',
    label: 'Standard',
    icon: Rows3Icon
  },
  {
    value: 'flexible',
    label: 'Flexible',
    icon: Rows2Icon
  }
] as const

const data: readonly ClientInvoice[] = [
  {
    id: 'INV-101',
    name: 'Aurora Lab',
    amount: 699,
    status: 'paid',
    email: 'billing@auroralab.co'
  },
  {
    id: 'INV-102',
    name: 'Northline Studio',
    amount: 242,
    status: 'paid',
    email: 'hello@northline.studio'
  },
  {
    id: 'INV-103',
    name: 'Metric House',
    amount: 655,
    status: 'processing',
    email: 'ops@metrichouse.io'
  },
  {
    id: 'INV-104',
    name: 'Olive Systems',
    amount: 874,
    status: 'review',
    email: 'team@olivesystems.dev'
  },
  {
    id: 'INV-105',
    name: 'Canvas Union',
    amount: 541,
    status: 'failed',
    email: 'accounts@canvasunion.com'
  }
] as const

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)

const densityClasses: Record<Density, string> = {
  compact: '[&_td]:py-2 [&_th]:py-2',
  standard: '[&_td]:py-3 [&_th]:py-2.5',
  flexible: '[&_td]:py-4 [&_th]:py-3'
}

const DataTable2 = () => {
  const [density, setDensity] = useState<Density>('standard')
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const selectedIdSet = useMemo(() => new Set(selectedIds), [selectedIds])
  const allSelected = selectedIds.length === data.length
  const someSelected = selectedIds.length > 0 && !allSelected

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
      <div className='py-4'>
        <Select value={density} onValueChange={(value) => setDensity(value as Density)}>
          <SelectTrigger
            className='w-full max-w-44 rounded-md border-border/60 bg-muted/20 shadow-none hover:bg-muted/30'
            aria-label='Density select'
          >
            <SelectValue placeholder='Density' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Density</SelectLabel>
              {densityOptions.map((option) => {
                const Icon = option.icon

                return (
                  <SelectItem key={option.value} value={option.value}>
                    <div className='flex items-center gap-2'>
                      <Icon className='size-4 text-muted-foreground' />
                      {option.label}
                    </div>
                  </SelectItem>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className='overflow-hidden rounded-lg border border-border/60 bg-background'>
        <Table className={cn(densityClasses[density])}>
          <TableHeader>
            <TableRow>
              <TableHead className='w-10 bg-muted/20 font-medium'>
                <Checkbox
                  checked={allSelected}
                  aria-checked={someSelected ? 'mixed' : allSelected}
                  onCheckedChange={(value) => toggleAll(!!value)}
                  aria-label='Select all invoices'
                  className='after:hidden data-checked:border-sky-600 data-checked:bg-sky-600 data-checked:text-white dark:data-checked:border-sky-500 dark:data-checked:bg-sky-500 dark:data-checked:text-white'
                />
              </TableHead>
              <TableHead className='bg-muted/20 font-medium'>Name</TableHead>
              <TableHead className='bg-muted/20 font-medium'>Status</TableHead>
              <TableHead className='bg-muted/20 font-medium'>Email</TableHead>
              <TableHead className='bg-muted/20 text-right font-medium'>Amount</TableHead>
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
                  <TableCell>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(value) => toggleRow(row.id, !!value)}
                      aria-label={`Select ${row.name}`}
                      className='after:hidden data-checked:border-sky-600 data-checked:bg-sky-600 data-checked:text-white dark:data-checked:border-sky-500 dark:data-checked:bg-sky-500 dark:data-checked:text-white'
                    />
                  </TableCell>
                  <TableCell>
                    <div className='font-medium'>{row.name}</div>
                  </TableCell>
                  <TableCell>
                    <div className='capitalize text-sm text-muted-foreground'>{row.status}</div>
                  </TableCell>
                  <TableCell>
                    <div className='text-sm text-muted-foreground'>{row.email}</div>
                  </TableCell>
                  <TableCell>
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

export default DataTable2
