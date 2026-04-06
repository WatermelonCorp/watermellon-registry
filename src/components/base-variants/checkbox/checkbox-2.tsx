'use client'

import { useId, useState } from 'react'

import { CheckIcon, MinusIcon } from 'lucide-react'

import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox'

import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

type CheckboxRootProps = CheckboxPrimitive.Root.Props
type CheckboxCopy = {
  description: string
  label: string
}

type IndeterminateCheckboxProps = CheckboxRootProps & {
  checked: boolean
  indeterminate?: boolean
}

const checkboxCopy: CheckboxCopy = {
  label: 'Indeterminate checkbox',
  description: 'This state is useful when only part of a selection is complete.'
}

const Checkbox = ({
  className,
  checked,
  indeterminate = false,
  ...props
}: IndeterminateCheckboxProps) => {
  return (
    <CheckboxPrimitive.Root
      data-slot='checkbox'
      className={cn(
        'peer relative flex size-4 shrink-0 items-center justify-center rounded-[5px] border border-input bg-background text-muted-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30 dark:text-muted-foreground data-checked:border-sky-600 data-checked:bg-background data-checked:text-sky-600 data-indeterminate:border-input data-indeterminate:bg-background data-indeterminate:text-muted-foreground dark:data-checked:border-sky-500 dark:data-checked:bg-background dark:data-checked:text-sky-400 dark:data-indeterminate:border-input dark:data-indeterminate:bg-input/30 dark:data-indeterminate:text-muted-foreground aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
        className
      )}
      checked={checked}
      indeterminate={indeterminate}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot='checkbox-indicator'
        className='grid place-content-center text-current transition-none'
      >
        {indeterminate ? (
          <MinusIcon className='size-2.5' />
        ) : (
          checked && <CheckIcon className='size-3.5' />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

const Checkbox2 = () => {
  const id = useId()
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [isIndeterminate, setIsIndeterminate] = useState<boolean>(true)

  const handleCheckedChange = (checked: boolean) => {
    setIsChecked(checked)
    setIsIndeterminate(false)
  }

  return (
    <div className='flex max-w-sm items-start gap-3'>
      <Checkbox
        id={id}
        checked={isChecked}
        indeterminate={isIndeterminate}
        onCheckedChange={handleCheckedChange}
        className='mt-0.5'
      />
      <div className='space-y-1'>
        <Label htmlFor={id} className='text-sm font-medium'>
          {checkboxCopy.label}
        </Label>
        <p className='text-muted-foreground text-xs'>
          {checkboxCopy.description}
        </p>
      </div>
    </div>
  )
}

export default Checkbox2
