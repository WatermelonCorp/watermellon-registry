import type { LucideIcon } from 'lucide-react'
import { UploadIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

type ButtonGroupData = {
  actionLabel: string
  countLabel: string
  icon: LucideIcon
}

const buttonGroup: ButtonGroupData = {
  actionLabel: 'Upload',
  countLabel: '24 files',
  icon: UploadIcon
}

const ButtonGroup1 = () => {
  const Icon = buttonGroup.icon

  return (
    <div className='inline-flex w-fit -space-x-px rounded-md shadow-xs rtl:space-x-reverse'>
      <Button
        variant='outline'
        className='gap-2 rounded-none rounded-l-md border-border/70 px-3 shadow-none focus-visible:z-10'
      >
        <Icon className='size-4' />
        {buttonGroup.actionLabel}
      </Button>
      <span className='flex items-center rounded-r-md border border-border/70 bg-muted/20 px-3 text-sm font-medium text-muted-foreground'>
        {buttonGroup.countLabel}
      </span>
    </div>
  )
}

export default ButtonGroup1
