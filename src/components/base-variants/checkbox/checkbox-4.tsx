'use client'

import { useId, useState } from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

type CheckboxCopy = {
  label: string
}

const checkboxCopy: CheckboxCopy = {
  label: 'Review weekly tasks'
}

const Checkbox4 = () => {
  const id = useId()
  const [isChecked, setIsChecked] = useState<boolean>(true)

  return (
    <div className='flex max-w-sm items-start gap-3'>
      <Checkbox
        id={id}
        checked={isChecked}
        onCheckedChange={(checked) => setIsChecked(checked === true)}
        className='mt-0.5 data-checked:border-sky-600 data-checked:bg-sky-600 dark:data-checked:border-sky-500 dark:data-checked:bg-sky-500'
      />
      <Label
        htmlFor={id}
        className={`text-sm font-medium transition-colors ${
          isChecked ? 'text-muted-foreground line-through' : ''
        }`}
      >
        {checkboxCopy.label}
      </Label>
    </div>
  )
}

export default Checkbox4
