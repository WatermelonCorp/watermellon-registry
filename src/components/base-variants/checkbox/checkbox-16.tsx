'use client'

import { useId, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

type CheckboxCopy = {
  description: string
  label: string
}

const checkboxCopy: CheckboxCopy = {
  label: 'Agree to the usage policy',
  description: 'You confirm that you have read and accepted the current usage guidelines.'
}

const Checkbox16 = () => {
  const id = useId()
  const [isChecked, setIsChecked] = useState<boolean>(true)

  const handleReset = () => {
    setIsChecked(false)
  }

  return (
    <div className='flex max-w-sm items-start gap-3.5'>
      <Checkbox
        id={id}
        checked={isChecked}
        onCheckedChange={(checked) => setIsChecked(checked === true)}
        className='mt-0.5 data-checked:border-sky-600 data-checked:bg-sky-600 dark:data-checked:border-sky-500 dark:data-checked:bg-sky-500'
      />
      <div className='grid gap-2.5'>
        <Label htmlFor={id} className='text-sm leading-4 font-medium'>
          {checkboxCopy.label}
        </Label>
        <p className='text-muted-foreground text-[13px] leading-5'>
          {checkboxCopy.description}
        </p>
        <div className='flex flex-wrap gap-2'>
          <Button variant='outline' size='sm' onClick={handleReset}>
            Reset
          </Button>
          <Button
            size='sm'
            disabled={!isChecked}
            className='bg-sky-600 text-white hover:bg-sky-700 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400'
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Checkbox16
