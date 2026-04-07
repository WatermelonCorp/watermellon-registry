import type { LucideIcon } from 'lucide-react'
import { RotateCcwIcon, RotateCwIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

type ActionButton = {
  icon: LucideIcon
  label: string
}

const actions: readonly ActionButton[] = [
  { icon: RotateCcwIcon, label: 'Rotate Left' },
  { icon: RotateCwIcon, label: 'Rotate Right' }
] as const

const ButtonGroup10 = () => {
  return (
    <div className='inline-flex w-fit divide-x divide-white/10 overflow-hidden rounded-full bg-slate-900 text-white dark:divide-black/10 dark:bg-slate-100 dark:text-slate-900'>
      {actions.map((action, index) => {
        const Icon = action.icon
        const isFirst = index === 0
        const isLast = index === actions.length - 1

        return (
          <Button
            key={action.label}
            size='icon'
            variant='outline'
            className={[
              'rounded-none border-0 bg-transparent text-white shadow-none hover:bg-white/10 hover:text-white hover:[&_svg]:text-white focus-visible:z-10 dark:text-slate-900 dark:hover:bg-black/5 dark:hover:text-slate-900 dark:hover:[&_svg]:text-slate-900',
              isFirst ? 'rounded-l-full' : '',
              isLast ? 'rounded-r-full' : ''
            ].join(' ')}
          >
            <Icon className='size-4 text-white dark:text-slate-900' />
            <span className='sr-only'>{action.label}</span>
          </Button>
        )
      })}
    </div>
  )
}

export default ButtonGroup10
