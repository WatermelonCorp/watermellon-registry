'use client'

import { useId, useState } from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

type CheckboxCopy = {
  description: string
  label: string
}

const checkboxCopy: CheckboxCopy = {
  label: 'Accept terms and conditions',
  description: 'By clicking this checkbox, you agree to the terms and conditions.'
}

const Checkbox7 = () => {
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
      <div className='grid gap-1.5'>
        <Label htmlFor={id} className='text-sm leading-4 font-medium'>
          {checkboxCopy.label}
        </Label>
        <p className='text-muted-foreground text-xs'>
          {checkboxCopy.description}
        </p>
      </div>
    </div>
  )
}

export default Checkbox7
