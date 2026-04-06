'use client'

import { useState } from 'react'

import { CircleCheckIcon } from 'lucide-react'

import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox'

type CheckboxColorId = 'destructive' | 'info' | 'success'

type CheckboxColorOption = {
  ariaLabel: string
  className: string
  id: CheckboxColorId
}

const checkboxColorOptions: readonly CheckboxColorOption[] = [
  {
    id: 'destructive',
    ariaLabel: 'Color destructive',
    className:
      'bg-destructive focus-visible:ring-destructive/20 data-checked:text-destructive dark:focus-visible:ring-destructive/40'
  },
  {
    id: 'info',
    ariaLabel: 'Color info',
    className:
      'bg-sky-600 focus-visible:ring-sky-600/20 data-checked:text-sky-600 dark:bg-sky-400 dark:focus-visible:ring-sky-400/40 dark:data-checked:text-sky-400'
  },
  {
    id: 'success',
    ariaLabel: 'Color success',
    className:
      'bg-green-600 focus-visible:ring-green-600/20 data-checked:text-green-600 dark:bg-green-400 dark:focus-visible:ring-green-400/40 dark:data-checked:text-green-400'
  }
]

const Checkbox12 = () => {
  const [checkedColors, setCheckedColors] = useState<
    Record<CheckboxColorId, boolean>
  >({
    destructive: true,
    info: true,
    success: true
  })

  const handleCheckedChange = (
    id: CheckboxColorOption['id'],
    checked: boolean
  ) => {
    setCheckedColors((previousCheckedColors) => ({
      ...previousCheckedColors,
      [id]: checked
    }))
  }

  return (
    <div className='flex items-center gap-3'>
      {checkboxColorOptions.map((option) => (
        <CheckboxPrimitive.Root
          key={option.id}
          data-slot='checkbox'
          checked={checkedColors[option.id]}
          onCheckedChange={(checked) => handleCheckedChange(option.id, checked === true)}
          className={`peer grid size-7 shrink-0 place-items-center rounded-full border border-transparent shadow-sm outline-none transition-all hover:scale-[1.02] focus-visible:ring-[3px] ${option.className}`}
          aria-label={option.ariaLabel}
        >
          <CheckboxPrimitive.Indicator
            data-slot='checkbox-indicator'
            className='grid place-items-center text-current transition-none'
          >
            <CircleCheckIcon className='size-5 fill-white stroke-current' />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
      ))}
    </div>
  )
}

export default Checkbox12
