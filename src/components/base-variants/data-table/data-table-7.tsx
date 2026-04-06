'use client'

import type { CSSProperties } from 'react'
import { useMemo, useState } from 'react'

import { ArrowLeftFromLineIcon, ArrowRightFromLineIcon, EllipsisIcon, PinOffIcon } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type Discontinued = 'no' | 'yes'

type ProductRow = {
  category: string
  discontinued: Discontinued
  price: number
  productId: number
  productName: string
  stockQuantity: number
  supplier: string
}

type ColumnKey = 'category' | 'discontinued' | 'price' | 'productName' | 'stockQuantity' | 'supplier'

type PinSide = false | 'left' | 'right'

type ColumnConfig = {
  key: ColumnKey
  label: string
  width: number
}

type PinnedState = Record<ColumnKey, PinSide>

const data: readonly ProductRow[] = [
  {
    productId: 1,
    productName: 'Apple iPhone 14',
    category: 'Smartphones',
    stockQuantity: 4550,
    price: 1500,
    supplier: 'Dixon Electronics',
    discontinued: 'no'
  },
  {
    productId: 2,
    productName: 'Metal Frame Table',
    category: 'Furniture',
    stockQuantity: 150,
    price: 540,
    supplier: 'Milton Furniture',
    discontinued: 'no'
  },
  {
    productId: 3,
    productName: 'Xiaomi A Series',
    category: 'Electronics',
    stockQuantity: 1500,
    price: 2200,
    supplier: 'Xiaomi Electronics',
    discontinued: 'yes'
  },
  {
    productId: 4,
    productName: 'RC Monster Truck',
    category: 'Toys',
    stockQuantity: 10500,
    price: 250,
    supplier: 'Lego Toys',
    discontinued: 'no'
  },
  {
    productId: 5,
    productName: 'Glass Water Bottle',
    category: 'Kitchenware',
    stockQuantity: 5503,
    price: 69,
    supplier: 'Kitchen Essentials',
    discontinued: 'no'
  },
  {
    productId: 6,
    productName: 'BenQ Monitor 24',
    category: 'Electronics',
    stockQuantity: 600,
    price: 1000,
    supplier: 'BenQ Electronics',
    discontinued: 'yes'
  }
] as const

const columns: readonly ColumnConfig[] = [
  { key: 'productName', label: 'Product Name', width: 220 },
  { key: 'category', label: 'Category', width: 150 },
  { key: 'stockQuantity', label: 'Stock Quantity', width: 150 },
  { key: 'price', label: 'Price', width: 120 },
  { key: 'supplier', label: 'Supplier', width: 190 },
  { key: 'discontinued', label: 'Discontinued', width: 130 }
] as const

const defaultPinnedState: PinnedState = {
  productName: false,
  category: false,
  stockQuantity: false,
  price: false,
  supplier: false,
  discontinued: false
}

const formatCurrency = (price: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)

const DataTable7 = () => {
  const [pinned, setPinned] = useState<PinnedState>(defaultPinnedState)

  const leftPinnedColumns = useMemo(
    () => columns.filter((column) => pinned[column.key] === 'left'),
    [pinned]
  )

  const rightPinnedColumns = useMemo(
    () => columns.filter((column) => pinned[column.key] === 'right'),
    [pinned]
  )

  const leftOffsets = useMemo(() => {
    return leftPinnedColumns
      .reduce(
        (acc, column) => {
          acc.offsets[column.key] = acc.offset
          return {
            offsets: acc.offsets,
            offset: acc.offset + column.width
          }
        },
        { offsets: {} as Record<ColumnKey, number>, offset: 0 }
      )
      .offsets
  }, [leftPinnedColumns])

  const rightOffsets = useMemo(() => {
    return [...rightPinnedColumns]
      .reverse()
      .reduce(
        (acc, column) => {
          acc.offsets[column.key] = acc.offset
          return {
            offsets: acc.offsets,
            offset: acc.offset + column.width
          }
        },
        { offsets: {} as Record<ColumnKey, number>, offset: 0 }
      )
      .offsets
  }, [rightPinnedColumns])

  const setPin = (key: ColumnKey, side: PinSide) => {
    setPinned((current) => ({
      ...current,
      [key]: side
    }))
  }

  const getPinnedStyles = (column: ColumnConfig): CSSProperties => {
    const pinSide = pinned[column.key]

    if (pinSide === 'left') {
      return {
        position: 'sticky',
        left: leftOffsets[column.key],
        width: column.width,
        minWidth: column.width,
        maxWidth: column.width,
        zIndex: 2
      }
    }

    if (pinSide === 'right') {
      return {
        position: 'sticky',
        right: rightOffsets[column.key],
        width: column.width,
        minWidth: column.width,
        maxWidth: column.width,
        zIndex: 2
      }
    }

    return {
      width: column.width,
      minWidth: column.width,
      maxWidth: column.width
    }
  }

  const renderCell = (row: ProductRow, key: ColumnKey) => {
    switch (key) {
      case 'productName':
        return <div className='font-medium'>{row.productName}</div>
      case 'category':
        return row.category
      case 'stockQuantity':
        return row.stockQuantity.toLocaleString('en-US')
      case 'price':
        return formatCurrency(row.price)
      case 'supplier':
        return row.supplier
      case 'discontinued':
        return <span className='capitalize'>{row.discontinued}</span>
    }
  }

  return (
    <div className='w-full'>
      <div className='overflow-hidden rounded-xl border border-border/60 bg-background shadow-sm'>
        <Table className='border-separate border-spacing-0 table-fixed'>
          <TableHeader>
            <TableRow className='[&>th]:border-b [&>th]:border-border/60'>
              {columns.map((column) => {
                const pinSide = pinned[column.key]

                return (
                  <TableHead
                    key={column.key}
                    className='relative h-12 bg-muted/20 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground'
                    style={getPinnedStyles(column)}
                    data-pinned={pinSide || undefined}
                  >
                    <div className='flex items-center justify-between gap-2'>
                      <span className='truncate'>{column.label}</span>

                      {pinSide ? (
                        <button
                          type='button'
                          className='inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground'
                          onClick={() => setPin(column.key, false)}
                          aria-label={`Unpin ${column.label} column`}
                          title={`Unpin ${column.label} column`}
                        >
                          <PinOffIcon className='size-4 opacity-70' aria-hidden='true' />
                        </button>
                      ) : (
                        <DropdownMenu>
                          <DropdownMenuTrigger className='inline-flex size-7 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-background hover:text-foreground'>
                            <EllipsisIcon className='size-4 opacity-70' aria-hidden='true' />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuItem onClick={() => setPin(column.key, 'left')}>
                              <ArrowLeftFromLineIcon className='size-4 opacity-70' aria-hidden='true' />
                              Stick to left
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setPin(column.key, 'right')}>
                              <ArrowRightFromLineIcon className='size-4 opacity-70' aria-hidden='true' />
                              Stick to right
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </TableHead>
                )
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.productId} className='[&>td]:border-b [&>td]:border-border/60 hover:bg-muted/10'>
                {columns.map((column) => {
                  const pinSide = pinned[column.key]

                  return (
                    <TableCell
                      key={column.key}
                      className='truncate bg-background py-3.5'
                      style={getPinnedStyles(column)}
                      data-pinned={pinSide || undefined}
                    >
                      {renderCell(row, column.key)}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default DataTable7
