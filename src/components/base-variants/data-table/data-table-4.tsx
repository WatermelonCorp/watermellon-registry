'use client'

import { useMemo, useState } from 'react'

import { SearchIcon } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type Availability = 'In Stock' | 'Limited' | 'Out of Stock'

type ProductItem = {
  availability: Availability
  fallback: string
  id: string
  price: number
  product: string
  productImage: string
  rating: number
}

type FilterState = {
  availability: Availability | 'all'
  maxPrice: string
  maxRating: string
  minPrice: string
  minRating: string
  product: string
}

const items: readonly ProductItem[] = [
  {
    id: '1',
    product: 'Ash Lounge Chair',
    productImage: 'https://picsum.photos/seed/ash-lounge-chair/160/160',
    fallback: 'AL',
    price: 159,
    availability: 'In Stock',
    rating: 3.9
  },
  {
    id: '2',
    product: 'Velocity Runner',
    productImage: 'https://picsum.photos/seed/velocity-runner/160/160',
    fallback: 'VR',
    price: 599,
    availability: 'Limited',
    rating: 4.4
  },
  {
    id: '3',
    product: 'Orbit Phone X',
    productImage: 'https://picsum.photos/seed/orbit-phone-x/160/160',
    fallback: 'OP',
    price: 1299,
    availability: 'Out of Stock',
    rating: 3.5
  },
  {
    id: '4',
    product: 'Switch Dock Set',
    productImage: 'https://picsum.photos/seed/switch-dock-set/160/160',
    fallback: 'SD',
    price: 499,
    availability: 'In Stock',
    rating: 4.9
  },
  {
    id: '5',
    product: 'Magic Pointer',
    productImage: 'https://picsum.photos/seed/magic-pointer/160/160',
    fallback: 'MP',
    price: 970,
    availability: 'Limited',
    rating: 4.1
  },
  {
    id: '6',
    product: 'Pulse Watch',
    productImage: 'https://picsum.photos/seed/pulse-watch/160/160',
    fallback: 'PW',
    price: 1500,
    availability: 'Limited',
    rating: 3.1
  },
  {
    id: '7',
    product: 'Terrain Watch',
    productImage: 'https://picsum.photos/seed/terrain-watch/160/160',
    fallback: 'TW',
    price: 194,
    availability: 'Out of Stock',
    rating: 1.5
  },
  {
    id: '8',
    product: 'North Shade Glasses',
    productImage: 'https://picsum.photos/seed/north-shade-glasses/160/160',
    fallback: 'NS',
    price: 199,
    availability: 'Out of Stock',
    rating: 2.4
  }
] as const

const defaultFilters: FilterState = {
  product: '',
  minPrice: '',
  maxPrice: '',
  availability: 'all',
  minRating: '',
  maxRating: ''
}

const availabilityBadgeClass: Record<Availability, string> = {
  'In Stock': 'border-none bg-green-600/10 text-green-600 dark:bg-green-400/10 dark:text-green-400',
  'Out of Stock': 'border-none bg-destructive/10 text-destructive dark:bg-destructive/20',
  Limited: 'border-none bg-amber-600/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400'
}

const toNumber = (value: string) => (value.trim() ? Number(value) : undefined)

const DataTable4 = () => {
  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const filteredItems = useMemo(() => {
    const productQuery = filters.product.trim().toLowerCase()
    const minPrice = toNumber(filters.minPrice)
    const maxPrice = toNumber(filters.maxPrice)
    const minRating = toNumber(filters.minRating)
    const maxRating = toNumber(filters.maxRating)

    return items.filter((item) => {
      const matchesProduct = productQuery ? item.product.toLowerCase().includes(productQuery) : true
      const matchesAvailability =
        filters.availability === 'all' ? true : item.availability === filters.availability
      const matchesMinPrice = minPrice !== undefined ? item.price >= minPrice : true
      const matchesMaxPrice = maxPrice !== undefined ? item.price <= maxPrice : true
      const matchesMinRating = minRating !== undefined ? item.rating >= minRating : true
      const matchesMaxRating = maxRating !== undefined ? item.rating <= maxRating : true

      return (
        matchesProduct &&
        matchesAvailability &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesMinRating &&
        matchesMaxRating
      )
    })
  }, [filters])

  const selectedIdSet = useMemo(() => new Set(selectedIds), [selectedIds])
  const visibleIds = filteredItems.map((item) => item.id)
  const allSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedIdSet.has(id))
  const someSelected = visibleIds.some((id) => selectedIdSet.has(id)) && !allSelected

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((current) => ({
      ...current,
      [key]: value
    }))
  }

  const toggleAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds((current) => Array.from(new Set([...current, ...visibleIds])))
      return
    }

    setSelectedIds((current) => current.filter((id) => !visibleIds.includes(id)))
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
    <div className='w-60 sm:w-100 md:w-120 lg:w-160 2xl:w-220 mx-auto'>
      <div className='overflow-hidden rounded-xl border border-border/60 bg-background shadow-sm'>
        <div className='grid gap-3 border-b border-dashed border-border/60 px-4 py-5 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]'>
          <div className='space-y-2'>
            <Label htmlFor='product-filter'>Product</Label>
            <div className='relative'>
              <Input
                id='product-filter'
                className='h-10 rounded-md border-border/60 pl-9'
                value={filters.product}
                onChange={(e) => updateFilter('product', e.target.value)}
                placeholder='Search product'
                type='text'
              />
              <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground'>
                <SearchIcon size={16} />
              </div>
            </div>
          </div>

          <div className='space-y-2'>
            <Label>Price</Label>
            <div className='flex'>
              <Input
                className='h-10 rounded-r-none border-border/60'
                value={filters.minPrice}
                onChange={(e) => updateFilter('minPrice', e.target.value)}
                placeholder='Min'
                type='number'
              />
              <Input
                className='-ms-px h-10 rounded-l-none border-border/60'
                value={filters.maxPrice}
                onChange={(e) => updateFilter('maxPrice', e.target.value)}
                placeholder='Max'
                type='number'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='availability-filter' >Availability</Label>
            <Select
              value={filters.availability}
              onValueChange={(value) => updateFilter('availability', value as FilterState['availability'])}
            >
              <SelectTrigger id='availability-filter' className='h-10 w-full rounded-lg border-border/60 py-[19px]'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All</SelectItem>
                <SelectItem value='In Stock'>In Stock</SelectItem>
                <SelectItem value='Limited'>Limited</SelectItem>
                <SelectItem value='Out of Stock'>Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label>Rating</Label>
            <div className='flex'>
              <Input
                className='h-10 rounded-r-none border-border/60'
                value={filters.minRating}
                onChange={(e) => updateFilter('minRating', e.target.value)}
                placeholder='Min'
                type='number'
                step='0.1'
              />
              <Input
                className='-ms-px h-10 rounded-l-none border-border/60'
                value={filters.maxRating}
                onChange={(e) => updateFilter('maxRating', e.target.value)}
                placeholder='Max'
                type='number'
                step='0.1'
              />
            </div>
          </div>
        </div>

        <Table className='w-60 sm:w-100 md:w-120 lg:w-160 2xl:w-220 mx-auto [&_td]:align-top'>
          <TableHeader>
            <TableRow>
              <TableHead className='h-12 w-10 border-b border-dashed border-border/60 bg-transparent font-medium'>
                <Checkbox
                  checked={allSelected}
                  aria-checked={someSelected ? 'mixed' : allSelected}
                  onCheckedChange={(value) => toggleAll(!!value)}
                  aria-label='Select all products'
                  className='after:hidden data-checked:border-sky-600 data-checked:bg-sky-600 data-checked:text-white dark:data-checked:border-sky-500 dark:data-checked:bg-sky-500 dark:data-checked:text-white'
                />
              </TableHead>
              <TableHead className='h-12 border-b border-dashed border-border/60 bg-transparent text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground'>
                Sr. No
              </TableHead>
              <TableHead className='h-12 border-b border-dashed border-border/60 bg-transparent text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground'>
                Product
              </TableHead>
              <TableHead className='h-12 border-b border-dashed border-border/60 bg-transparent text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground'>
                Price
              </TableHead>
              <TableHead className='h-12 border-b border-dashed border-border/60 bg-transparent text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground'>
                Availability
              </TableHead>
              <TableHead className='h-12 border-b border-dashed border-border/60 bg-transparent text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground'>
                Rating
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => {
                const isSelected = selectedIdSet.has(item.id)

                return (
                <TableRow
                  key={item.id}
                  data-state={isSelected ? 'selected' : undefined}
                  className='transition-colors hover:bg-muted/10 data-[state=selected]:bg-muted/15'
                >
                    <TableCell className='py-3.5'>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(value) => toggleRow(item.id, !!value)}
                        aria-label={`Select ${item.product}`}
                        className='after:hidden data-checked:border-sky-600 data-checked:bg-sky-600 data-checked:text-white dark:data-checked:border-sky-500 dark:data-checked:bg-sky-500 dark:data-checked:text-white'
                      />
                    </TableCell>
                    <TableCell className='py-3.5'>
                      <div className='text-sm text-muted-foreground'>{item.id}</div>
                    </TableCell>
                    <TableCell className='py-3.5'>
                      <div className='flex items-center gap-3'>
                        <Avatar className='rounded-sm'>
                          <AvatarImage src={item.productImage} alt={item.product} />
                          <AvatarFallback className='text-xs'>{item.fallback}</AvatarFallback>
                        </Avatar>
                        <div className='font-medium'>{item.product}</div>
                      </div>
                    </TableCell>
                    <TableCell className='py-3.5 font-medium'>${item.price}</TableCell>
                    <TableCell className='py-3.5'>
                      <Badge className={availabilityBadgeClass[item.availability]}>{item.availability}</Badge>
                    </TableCell>
                    <TableCell className='py-3.5 text-muted-foreground'>{item.rating.toFixed(1)}</TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className='h-24 text-center text-muted-foreground'>
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

export default DataTable4
