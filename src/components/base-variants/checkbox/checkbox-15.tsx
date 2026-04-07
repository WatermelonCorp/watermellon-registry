'use client'

import { useMemo, useState } from 'react'

import { CheckIcon, MinusIcon } from 'lucide-react'

import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox'

import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const items = ['Module 1', 'Module 2', 'Module 3'] as const

type Item = (typeof items)[number]
type CheckboxRootProps = CheckboxPrimitive.Root.Props

const Checkbox = ({
  checked,
  className,
  indeterminate = false,
  ...props
}: CheckboxRootProps) => {
  return (
    <CheckboxPrimitive.Root
      data-slot='checkbox'
      checked={checked}
      indeterminate={indeterminate}
      className={cn(
        'peer relative flex size-4 shrink-0 items-center justify-center rounded-[5px] border border-input bg-background outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30 data-checked:border-sky-600 data-checked:bg-sky-600 data-checked:text-white data-indeterminate:border-input data-indeterminate:bg-background data-indeterminate:text-muted-foreground dark:data-checked:border-sky-500 dark:data-checked:bg-sky-500 dark:data-indeterminate:border-input dark:data-indeterminate:bg-input/30 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot='checkbox-indicator'
        className='grid place-content-center text-current transition-none'
      >
        {indeterminate ? (
          <MinusIcon className='size-2.5' />
        ) : checked ? (
          <CheckIcon className='size-3.5' />
        ) : null}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

const Checkbox15 = () => {
  const [selectedItems, setSelectedItems] = useState<Item[]>([
    'Module 1',
    'Module 2'
  ])

  const allChildrenSelected = useMemo(
    () => selectedItems.length === items.length,
    [selectedItems]
  )
  const isParentIndeterminate = useMemo(
    () => selectedItems.length > 0 && selectedItems.length < items.length,
    [selectedItems]
  )

  const handleParentCheckedChange = (checked: boolean) => {
    if (checked) {
      setSelectedItems([...items])
    } else {
      setSelectedItems([])
    }
  }

  const handleChildCheckedChange = (item: Item, checked: boolean) => {
    setSelectedItems((previousSelectedItems) =>
      checked
        ? previousSelectedItems.includes(item)
          ? previousSelectedItems
          : [...previousSelectedItems, item]
        : previousSelectedItems.filter((selectedItem) => selectedItem !== item)
    )
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-2'>
        <Checkbox
          id='parent'
          checked={allChildrenSelected}
          indeterminate={isParentIndeterminate}
          onCheckedChange={handleParentCheckedChange}
        />
        <Label htmlFor='parent' className='text-sm font-medium'>
          Select all modules
        </Label>
      </div>
      <div className='flex flex-col gap-2 pl-6'>
        {items.map((item) => (
          <div key={item} className='flex items-center gap-2'>
            <Checkbox
              id={item}
              checked={selectedItems.includes(item)}
              onCheckedChange={(checked) =>
                handleChildCheckedChange(item, checked)
              }
            />
            <Label htmlFor={item} className='text-sm'>
              {item}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Checkbox15
