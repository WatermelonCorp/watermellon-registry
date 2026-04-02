import type { LucideIcon } from 'lucide-react'
import { BookOpenIcon, BriefcaseIcon, LayoutGridIcon, TerminalSquareIcon } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type SocialAction = {
  href: string
  hoverClassName: string
  icon: LucideIcon
  iconClassName: string
  label: string
}

const actions: readonly SocialAction[] = [
  {
    href: '#',
    hoverClassName: 'hover:!bg-[#0f0f10]/6',
    icon: TerminalSquareIcon,
    iconClassName: 'stroke-[#171515]',
    label: 'Code'
  },
  {
    href: '#',
    hoverClassName: 'hover:!bg-[#0a66c2]/10',
    icon: BriefcaseIcon,
    iconClassName: 'stroke-[#0a66c2]',
    label: 'Work'
  },
  {
    href: '#',
    hoverClassName: 'hover:!bg-[#f24e1e]/10',
    icon: LayoutGridIcon,
    iconClassName: 'stroke-[#f24e1e]',
    label: 'Library'
  },
  {
    href: '#',
    hoverClassName: 'hover:!bg-[#111827]/8',
    icon: BookOpenIcon,
    iconClassName: 'stroke-[#111827]',
    label: 'Docs'
  }
] as const

const ButtonGroup5 = () => {
  return (
    <div className='inline-flex w-fit -space-x-px rounded-full shadow-xs rtl:space-x-reverse'>
      {actions.map((action, index) => {
        const Icon = action.icon
        const isFirst = index === 0
        const isLast = index === actions.length - 1

        return (
          <a
            key={action.label}
            href={action.href}
            target='_blank'
            rel='noopener noreferrer'
            className={cn(
              buttonVariants({ variant: 'outline', size: 'icon' }),
              'size-9 rounded-none border-border/70 bg-background p-2.5 shadow-none focus-visible:z-10',
              action.hoverClassName,
              isFirst ? 'rounded-l-full' : '',
              isLast ? 'rounded-r-full' : ''
            )}
          >
            <Icon className={action.iconClassName} />
            <span className='sr-only'>{action.label}</span>
          </a>
        )
      })}
    </div>
  )
}

export default ButtonGroup5
