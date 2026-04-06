'use client'

import { useState } from 'react'

import { Checkbox } from '@/components/ui/checkbox'

type CheckboxSizeOption = {
  ariaLabel: string
  className?: string
  id: string
}

const checkboxSizeOptions: readonly CheckboxSizeOption[] = [
  {
    id: 'default',
    ariaLabel: 'Default checkbox size'
  },
  {
    id: 'medium',
    ariaLabel: 'Medium checkbox size',
    className: 'size-5'
  },
  {
    id: 'large',
    ariaLabel: 'Large checkbox size',
    className: 'size-6'
  }
]

const Checkbox5 = () => {
  const [checkedSizes, setCheckedSizes] = useState<Record<string, boolean>>({
    default: true,
    medium: true,
    large: true
  })

  const handleCheckedChange = (id: CheckboxSizeOption['id'], checked: boolean) => {
    setCheckedSizes(previousState => ({
      ...previousState,
      [id]: checked
    }))
  }

  return (
    <div className='flex items-center gap-3'>
      {checkboxSizeOptions.map(option => (
        <Checkbox
          key={option.id}
          checked={checkedSizes[option.id]}
          onCheckedChange={(checked) => handleCheckedChange(option.id, checked === true)}
          aria-label={option.ariaLabel}
          className={`${option.className ?? ''} data-checked:border-sky-600 data-checked:bg-sky-600 dark:data-checked:border-sky-500 dark:data-checked:bg-sky-500`.trim()}
        />
      ))}
    </div>
  )
}

export default Checkbox5
