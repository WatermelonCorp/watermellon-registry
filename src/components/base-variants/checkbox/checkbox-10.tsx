'use client'

import { useState } from 'react'

import { Checkbox } from '@/components/ui/checkbox'

type CheckboxColorOption = {
  ariaLabel: string
  className: string
  id: string
}

const checkboxColorOptions: readonly CheckboxColorOption[] = [
  {
    id: 'destructive',
    ariaLabel: 'Color destructive',
    className:
      'data-checked:border-destructive data-checked:bg-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:text-white'
  },
  {
    id: 'info',
    ariaLabel: 'Color info',
    className:
      'focus-visible:ring-sky-600/20 data-checked:border-sky-600 data-checked:bg-sky-600 dark:text-white dark:focus-visible:ring-sky-400/40 dark:data-checked:border-sky-400 dark:data-checked:bg-sky-400'
  },
  {
    id: 'success',
    ariaLabel: 'Color success',
    className:
      'focus-visible:ring-green-600/20 data-checked:border-green-600 data-checked:bg-green-600 dark:text-white dark:focus-visible:ring-green-400/40 dark:data-checked:border-green-400 dark:data-checked:bg-green-400'
  }
]

const Checkbox10 = () => {
  const [checkedColors, setCheckedColors] = useState<Record<string, boolean>>({
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
        <Checkbox
          key={option.id}
          checked={checkedColors[option.id]}
          onCheckedChange={(checked) => 
            handleCheckedChange(option.id, checked === true)
          }
          aria-label={option.ariaLabel}
          className={`size-5 rounded-[6px] shadow-xs ${option.className}`}
        />
      ))}
    </div>
  )
}

export default Checkbox10
