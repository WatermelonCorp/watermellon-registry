'use client'

import { useState } from 'react'

import type { LucideIcon } from 'lucide-react'
import { MinusIcon, PlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

type ButtonGroupConfig = {
  initialValue: number
  maxValue: number
  minValue: number
  step: number
  decrementIcon: LucideIcon
  decrementLabel: string
  incrementIcon: LucideIcon
  incrementLabel: string
}

const config: ButtonGroupConfig = {
  initialValue: 2,
  maxValue: 5,
  minValue: 0,
  step: 1,
  decrementIcon: MinusIcon,
  decrementLabel: 'Decrease quantity',
  incrementIcon: PlusIcon,
  incrementLabel: 'Increase quantity'
}

const ButtonGroup6 = () => {
  const [value, setValue] = useState<number>(config.initialValue)
  const DecrementIcon = config.decrementIcon
  const IncrementIcon = config.incrementIcon

  const handleDecrease = () => {
    setValue((current) => Math.max(config.minValue, current - config.step))
  }

  const handleIncrease = () => {
    setValue((current) => Math.min(config.maxValue, current + config.step))
  }

  return (
    <div className='inline-flex w-fit -space-x-px rounded-md shadow-xs rtl:space-x-reverse'>
      <Button
        variant='outline'
        size='icon'
        className='rounded-none rounded-l-md border-border/70 shadow-none focus-visible:z-10'
        onClick={handleDecrease}
        disabled={value === config.minValue}
      >
        <DecrementIcon className='size-4' />
        <span className='sr-only'>{config.decrementLabel}</span>
      </Button>
      <span className='flex min-w-12 items-center justify-center border border-border/70 bg-muted/20 px-3 text-sm font-medium'>
        {value}
      </span>
      <Button
        variant='outline'
        size='icon'
        className='rounded-none rounded-r-md border-border/70 shadow-none focus-visible:z-10'
        onClick={handleIncrease}
        disabled={value === config.maxValue}
      >
        <IncrementIcon className='size-4' />
        <span className='sr-only'>{config.incrementLabel}</span>
      </Button>
    </div>
  )
}

export default ButtonGroup6
