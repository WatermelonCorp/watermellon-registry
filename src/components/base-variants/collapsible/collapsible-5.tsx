'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'

import { ChevronDownIcon, StarIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

type PriceRange = {
  maxPlaceholder: string
  minPlaceholder: string
}

type RatingOption = {
  id: string
  value: number
}

type FilterOption = {
  id: string
  label: string
}

const priceRange: PriceRange = {
  maxPlaceholder: '1200',
  minPlaceholder: '50'
}

const ratings: readonly RatingOption[] = [
  { id: 'rating-4', value: 4 },
  { id: 'rating-3', value: 3 },
  { id: 'rating-2', value: 2 }
] as const

const brands: readonly FilterOption[] = [
  { id: 'brand-apple', label: 'Apple' },
  { id: 'brand-samsung', label: 'Samsung' },
  { id: 'brand-google', label: 'Google' },
  { id: 'brand-oneplus', label: 'OnePlus' },
  { id: 'brand-xiaomi', label: 'Xiaomi' }
] as const

const batterySizes: readonly FilterOption[] = [
  { id: 'battery-3500', label: '3500mAh' },
  { id: 'battery-4000', label: '4000mAh' },
  { id: 'battery-5000', label: '5000mAh' },
  { id: 'battery-6000', label: '6000mAh' }
] as const

type SectionShellProps = {
  children: ReactNode
  title: string
}

const SectionShell = ({ children, title }: SectionShellProps) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen} className='flex flex-col gap-2'>
      <div className='flex items-center justify-between gap-4 rounded-md px-2 py-1.5 hover:bg-muted/30'>
        <div className='text-sm font-semibold'>{title}</div>
        <CollapsibleTrigger>
          <Button variant='ghost' size='icon-sm'>
            <ChevronDownIcon className={`size-4 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
            <span className='sr-only'>Toggle {title}</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className='flex flex-col gap-2 px-1 pb-1'>{children}</CollapsibleContent>
    </Collapsible>
  )
}

const Collapsible5 = () => {
  return (
    <div className='w-full max-w-[350px] space-y-3 rounded-xl border border-border/70 bg-background p-3.5 shadow-sm'>
      <SectionShell title='Price Range'>
        <div className='flex items-center justify-between gap-4 px-1'>
          <Label htmlFor='min-price' className='shrink-0 text-sm font-medium'>
            Min Price
          </Label>
          <Input id='min-price' type='number' placeholder={priceRange.minPlaceholder} className='h-9 max-w-56 border-border/70 bg-muted/20' />
        </div>
        <div className='flex items-center justify-between gap-4 px-1'>
          <Label htmlFor='max-price' className='shrink-0 text-sm font-medium'>
            Max Price
          </Label>
          <Input id='max-price' type='number' placeholder={priceRange.maxPlaceholder} className='h-9 max-w-56 border-border/70 bg-muted/20' />
        </div>
      </SectionShell>
      <Separator />
      <SectionShell title='Customer Ratings'>
        {ratings.map((rating) => (
          <div key={rating.id} className='flex items-center gap-2 rounded-md px-2 py-1 hover:bg-muted/20'>
            <Checkbox id={rating.id} />
            <Label htmlFor={rating.id} className='flex shrink-0 items-center gap-1 text-sm font-medium'>
              <span className='flex items-center gap-1'>
                {rating.value}
                <StarIcon className='size-4 fill-amber-500 stroke-amber-500 dark:fill-amber-400 dark:stroke-amber-400' />
              </span>
              & Up
            </Label>
          </div>
        ))}
      </SectionShell>
      <Separator />
      <SectionShell title='Brand'>
        {brands.map((brand) => (
          <div key={brand.id} className='flex items-center gap-2 rounded-md px-2 py-1 hover:bg-muted/20'>
            <Checkbox id={brand.id} />
            <Label htmlFor={brand.id} className='shrink-0 text-sm font-medium'>
              {brand.label}
            </Label>
          </div>
        ))}
      </SectionShell>
      <Separator />
      <SectionShell title='Battery'>
        {batterySizes.map((battery) => (
          <div key={battery.id} className='flex items-center gap-2 rounded-md px-2 py-1 hover:bg-muted/20'>
            <Checkbox id={battery.id} />
            <Label htmlFor={battery.id} className='shrink-0 text-sm font-medium'>
              {battery.label}
            </Label>
          </div>
        ))}
      </SectionShell>
    </div>
  )
}

export default Collapsible5
