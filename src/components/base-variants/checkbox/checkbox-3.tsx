'use client'

import { useId, useState } from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

type CheckboxCopy = {
  label: string
}

const checkboxCopy: CheckboxCopy = {
  label: 'Accept terms and conditions',
}

const Checkbox3 = () => {
  const id = useId()
  const [isChecked, setIsChecked] = useState<boolean>(false)

  return (
    <div className='flex max-w-sm items-start gap-3'>
      <Checkbox
        id={id}
        checked={isChecked}
        onCheckedChange={(checked) => setIsChecked(checked === true)}
        className='mt-0.5 border-dashed border-input data-checked:border-sky-600 data-checked:bg-sky-600 dark:border-input dark:data-checked:border-sky-500 dark:data-checked:bg-sky-500'
      />
      <div className='space-y-1'>
        <Label htmlFor={id} className='text-sm font-medium'>
          {checkboxCopy.label}
        </Label>
      </div>
    </div>
  )
}

export default Checkbox3
