import type { LucideIcon } from 'lucide-react'
import { ListRestartIcon, PauseIcon, PlayIcon, SkipForwardIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

type ControlAction = {
  icon: LucideIcon
  label: string
}

const actions: readonly ControlAction[] = [
  { icon: ListRestartIcon, label: 'Restart' },
  { icon: PlayIcon, label: 'Play' },
  { icon: PauseIcon, label: 'Pause' },
  { icon: SkipForwardIcon, label: 'Next' }
] as const

const ButtonGroup4 = () => {
  return (
    <TooltipProvider>
      <div className='inline-flex w-fit divide-x divide-primary-foreground/20 overflow-hidden rounded-full shadow-sm'>
        {actions.map((action, index) => {
          const Icon = action.icon
          const isFirst = index === 0
          const isLast = index === actions.length - 1

          return (
            <Tooltip key={action.label}>
              <TooltipTrigger>
                <Button
                  className={[
                    'rounded-none px-4 py-3 shadow-none focus-visible:z-10',
                    isFirst ? 'rounded-l-full' : '',
                    isLast ? 'rounded-r-full' : ''
                  ].join(' ')}
                >
                  <Icon className='size-4' />
                  <span className='sr-only'>{action.label}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className='px-2 py-1 text-xs'>{action.label}</TooltipContent>
            </Tooltip>
          )
        })}
      </div>
    </TooltipProvider>
  )
}

export default ButtonGroup4
