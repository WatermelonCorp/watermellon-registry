'use client'

import { useState } from 'react'

import { ChevronUpIcon } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

type Task = {
  fallback: string
  image: string
  name: string
  progress: number
  role: string
}

const tasks: readonly Task[] = [
  {
    image: 'https://i.pravatar.cc/160?img=21',
    fallback: 'MC',
    name: 'Maya Chen',
    role: 'Product Designer',
    progress: 88
  },
  {
    image: 'https://i.pravatar.cc/160?img=32',
    fallback: 'OS',
    name: 'Owen Scott',
    role: 'Frontend Engineer',
    progress: 64
  },
  {
    image: 'https://i.pravatar.cc/160?img=30',
    fallback: 'AL',
    name: 'Amara Lewis',
    role: 'Research Lead',
    progress: 76
  },
  {
    image: 'https://i.pravatar.cc/160?img=47',
    fallback: 'JP',
    name: 'Jordan Price',
    role: 'Operations Analyst',
    progress: 29
  }
] as const

const Collapsible3 = () => {
  const [open, setOpen] = useState<boolean>(false)
  const visibleTasks = tasks.slice(0, 2)
  const hiddenTasks = tasks.slice(2)

  return (
    <Collapsible open={open} onOpenChange={setOpen} className='flex w-full max-w-[350px] flex-col items-start gap-4 rounded-lg border border-border/70 bg-background p-4 shadow-sm'>
      <div className='font-medium'>Today&apos;s team progress</div>
      <ul className='flex w-full flex-col gap-3'>
        {visibleTasks.map((task) => (
          <li key={task.name} className='flex items-start gap-4 rounded-md border border-border/60 px-3 py-2'>
            <Avatar>
              <AvatarImage src={task.image} alt={task.name} />
              <AvatarFallback>{task.fallback}</AvatarFallback>
            </Avatar>
            <div className='flex flex-1 flex-col'>
              <div className='text-sm font-medium'>{task.name}</div>
              <p className='text-xs text-muted-foreground'>{task.role}</p>
            </div>
            <span className='text-sm text-muted-foreground'>{`${task.progress}%`}</span>
          </li>
        ))}
        <CollapsibleContent className='flex flex-col gap-3'>
          {hiddenTasks.map((task) => (
            <li key={task.name} className='flex items-start gap-4 rounded-md border border-border/60 px-3 py-2'>
              <Avatar>
                <AvatarImage src={task.image} alt={task.name} />
                <AvatarFallback>{task.fallback}</AvatarFallback>
              </Avatar>
              <div className='flex flex-1 flex-col'>
                <div className='text-sm font-medium'>{task.name}</div>
                <p className='text-xs text-muted-foreground'>{task.role}</p>
              </div>
              <span className='text-sm text-muted-foreground'>{`${task.progress}%`}</span>
            </li>
          ))}
        </CollapsibleContent>
      </ul>
      <CollapsibleTrigger>
        <Button variant='outline' size='sm' className='border-border/70'>
          <span>{open ? 'Show less' : 'Show more'}</span>
          <ChevronUpIcon className={`size-4 transition-transform ${open ? '' : 'rotate-180'}`} />
        </Button>
      </CollapsibleTrigger>
    </Collapsible>
  )
}

export default Collapsible3
