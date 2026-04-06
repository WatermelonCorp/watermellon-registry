'use client'

import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

const snacks = ['Burger', 'Pizza', 'Drinks'] as const

type Snack = (typeof snacks)[number]

const Checkbox6 = () => {
  const [selectedSnacks, setSelectedSnacks] = useState<Snack[]>([
    'Burger',
    'Pizza'
  ])

  const handleCheckedChange = (snack: Snack, checked: boolean) => {
    setSelectedSnacks((previousSelectedSnacks) =>
      checked
        ? previousSelectedSnacks.includes(snack)
          ? previousSelectedSnacks
          : [...previousSelectedSnacks, snack]
        : previousSelectedSnacks.filter((selectedSnack) => selectedSnack !== snack)
    )
  }

  return (
    <div className='flex items-center gap-2.5'>
      {snacks.map((snack) => (
        <Badge
          key={snack}
          variant='secondary'
          className='relative rounded-lg px-3 py-4'
        >
          <Checkbox
            id={snack}
            checked={selectedSnacks.includes(snack)}
            onCheckedChange={(checked) => handleCheckedChange(snack, checked === true)}
            className={`pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 data-checked:border-sky-600 data-checked:bg-sky-600 dark:data-checked:border-sky-500 dark:data-checked:bg-sky-500 ${
              selectedSnacks.includes(snack)
                ? 'opacity-100'
                : 'opacity-0'
            }`}
          />
          <label
            htmlFor={snack}
            className={`cursor-pointer select-none text-sm after:absolute after:inset-0 ${
              selectedSnacks.includes(snack) ? 'pl-5' : ''
            }`}
          >
            {snack}
          </label>
        </Badge>
      ))}
    </div>
  )
}

export default Checkbox6
