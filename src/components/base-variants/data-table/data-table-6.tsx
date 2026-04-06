'use client'

import type { MouseEvent as ReactMouseEvent } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type InvoiceStatus = 'failed' | 'paid' | 'processing' | 'review'

type ClientInvoice = {
  amount: number
  dueDate: string
  email: string
  id: string
  name: string
  status: InvoiceStatus
}

type ColumnKey = 'amount' | 'dueDate' | 'email' | 'name' | 'status'

type ColumnConfig = {
  key: ColumnKey
  label: string
  minWidth: number
}

type ColumnWidths = Record<ColumnKey, number>

type ResizeState = {
  column: ColumnKey
  startWidth: number
  startX: number
} | null

const data: readonly ClientInvoice[] = [
  {
    id: 'INV-401',
    name: 'Shang Chain',
    amount: 699,
    status: 'paid',
    email: 'shang07@yahoo.com',
    dueDate: '2026-04-14'
  },
  {
    id: 'INV-402',
    name: 'Kevin Lincoln',
    amount: 242,
    status: 'paid',
    email: 'kevinli09@gmail.com',
    dueDate: '2026-04-18'
  },
  {
    id: 'INV-403',
    name: 'Milton Rose',
    amount: 655,
    status: 'processing',
    email: 'rose96@gmail.com',
    dueDate: '2026-04-20'
  },
  {
    id: 'INV-404',
    name: 'Silas Ryan',
    amount: 874,
    status: 'review',
    email: 'silas22@gmail.com',
    dueDate: '2026-04-24'
  },
  {
    id: 'INV-405',
    name: 'Ben Tenison',
    amount: 541,
    status: 'failed',
    email: 'bent@hotmail.com',
    dueDate: '2026-04-29'
  }
] as const

const columns: readonly ColumnConfig[] = [
  { key: 'name', label: 'Name', minWidth: 170 },
  { key: 'status', label: 'Status', minWidth: 120 },
  { key: 'email', label: 'Email', minWidth: 220 },
  { key: 'amount', label: 'Amount', minWidth: 120 },
  { key: 'dueDate', label: 'Due Date', minWidth: 130 }
] as const

const defaultWidths: ColumnWidths = {
  name: 180,
  status: 120,
  email: 230,
  amount: 120,
  dueDate: 140
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)

const DataTable6 = () => {
  const [columnWidths, setColumnWidths] = useState<ColumnWidths>(defaultWidths)
  const [resizeState, setResizeState] = useState<ResizeState>(null)
  const resizeStateRef = useRef<ResizeState>(null)

  const tableWidth = useMemo(
    () => columns.reduce((total, column) => total + columnWidths[column.key], 0),
    [columnWidths]
  )

  useEffect(() => {
    resizeStateRef.current = resizeState
  }, [resizeState])

  useEffect(() => {
    const handlePointerMove = (event: MouseEvent) => {
      const currentResize = resizeStateRef.current

      if (!currentResize) {
        return
      }

      const column = columns.find((item) => item.key === currentResize.column)

      if (!column) {
        return
      }

      const nextWidth = Math.max(column.minWidth, currentResize.startWidth + (event.clientX - currentResize.startX))

      setColumnWidths((current) => ({
        ...current,
        [currentResize.column]: nextWidth
      }))
    }

    const handlePointerUp = () => {
      setResizeState(null)
    }

    window.addEventListener('mousemove', handlePointerMove)
    window.addEventListener('mouseup', handlePointerUp)

    return () => {
      window.removeEventListener('mousemove', handlePointerMove)
      window.removeEventListener('mouseup', handlePointerUp)
    }
  }, [])

  const startResize = (column: ColumnKey, event: ReactMouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setResizeState({
      column,
      startX: event.clientX,
      startWidth: columnWidths[column]
    })
  }

  return (
    <div className='max-w-5xl max-md:max-w-full'>
      <div className='overflow-hidden rounded-lg border border-border/60 bg-background'>
        <Table className='table-fixed' style={{ width: tableWidth }}>
          <TableHeader>
            <TableRow>
              {columns.map((column) => {
                const isResizing = resizeState?.column === column.key

                return (
                  <TableHead
                    key={column.key}
                    className='group/head relative h-11 bg-muted/20 font-medium'
                    style={{ width: columnWidths[column.key] }}
                  >
                    <div className='truncate pr-4'>{column.label}</div>
                    <button
                      type='button'
                      onDoubleClick={() =>
                        setColumnWidths((current) => ({
                          ...current,
                          [column.key]: defaultWidths[column.key]
                        }))
                      }
                      onMouseDown={(event) => startResize(column.key, event)}
                      aria-label={`Resize ${column.label} column`}
                      className='absolute top-0 right-0 h-full w-4 cursor-col-resize touch-none select-none'
                    >
                      <span
                        className={`absolute inset-y-0 right-1 w-px bg-border transition-opacity ${
                          isResizing ? 'opacity-100' : 'opacity-0 group-hover/head:opacity-100'
                        }`}
                      />
                    </button>
                  </TableHead>
                )
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id} className='hover:bg-muted/10'>
                <TableCell className='truncate py-3'>
                  <div className='font-medium'>{row.name}</div>
                </TableCell>
                <TableCell className='truncate py-3'>
                  <div className='capitalize text-sm text-muted-foreground'>{row.status}</div>
                </TableCell>
                <TableCell className='truncate py-3'>
                  <div className='text-sm text-muted-foreground'>{row.email}</div>
                </TableCell>
                <TableCell className='truncate py-3'>
                  <div className='font-medium'>{formatCurrency(row.amount)}</div>
                </TableCell>
                <TableCell className='truncate py-3'>
                  <div className='text-muted-foreground'>{row.dueDate}</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default DataTable6
