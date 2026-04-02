'use client'

import { useMemo, useState } from 'react'

import type { LucideIcon } from 'lucide-react'
import { ChevronDownIcon, SendIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

type ActionOption = {
  description: string
  icon: LucideIcon
  label: string
  value: string
}

const options: readonly ActionOption[] = [
  {
    description: 'Send the update to everyone currently assigned to the thread.',
    icon: SendIcon,
    label: 'Send Update',
    value: 'send'
  },
  {
    description: 'Send the message and flag it for follow-up during the next review.',
    icon: SendIcon,
    label: 'Send and Review',
    value: 'review'
  },
  {
    description: 'Queue the message as a draft so the team can check it before sending.',
    icon: SendIcon,
    label: 'Save as Draft',
    value: 'draft'
  }
] as const

const ButtonGroup11 = () => {
  const [selectedValue, setSelectedValue] = useState<ActionOption['value']>(options[0].value)

  const selectedOption = useMemo(
    () => options.find((option) => option.value === selectedValue) ?? options[0],
    [selectedValue]
  )

  const SelectedIcon = selectedOption.icon

  return (
    <div className='inline-flex w-fit divide-x divide-primary-foreground/20 overflow-hidden rounded-md shadow-xs'>
      <Button className='gap-2 rounded-none rounded-l-md px-3.5 shadow-none focus-visible:z-10'>
        <SelectedIcon className='size-4' />
        {selectedOption.label}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button size='icon' className='rounded-none rounded-r-md shadow-none focus-visible:z-10'>
            <ChevronDownIcon className='size-4' />
            <span className='sr-only'>Select action</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side='bottom' sideOffset={4} align='end' className='w-80 max-w-[calc(100vw-2rem)]'>
          <DropdownMenuRadioGroup value={selectedValue} onValueChange={(value) => setSelectedValue(value as ActionOption['value'])}>
            {options.map((option) => {
              const Icon = option.icon

              return (
                <DropdownMenuRadioItem key={option.value} value={option.value} className='items-start [&>span]:pt-1.5'>
                  <div className='flex gap-2'>
                    <Icon className='mt-0.5 size-4 text-muted-foreground' />
                    <div className='flex flex-col gap-1'>
                      <span className='text-sm font-medium'>{option.label}</span>
                      <span className='text-muted-foreground text-xs'>{option.description}</span>
                    </div>
                  </div>
                </DropdownMenuRadioItem>
              )
            })}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default ButtonGroup11
