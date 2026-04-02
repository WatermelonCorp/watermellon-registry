'use client'

import { useState } from 'react'

import type { LucideIcon } from 'lucide-react'
import { ChevronRightIcon, PanelsTopLeftIcon, PlusIcon, UserIcon } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

type UserProfile = {
  avatarAlt: string
  avatarSrc: string
  bio: string
  fallback: string
  followers: number
  followed?: boolean
  name: string
  projects: number
}

const users: readonly UserProfile[] = [
  {
    avatarAlt: 'Maya Chen',
    avatarSrc: 'https://i.pravatar.cc/160?img=21',
    bio: 'Product designer focused on onboarding flows, product storytelling, and clean interface systems.',
    fallback: 'MC',
    followers: 142,
    name: 'Maya Chen',
    projects: 6
  },
  {
    avatarAlt: 'Owen Scott',
    avatarSrc: 'https://i.pravatar.cc/160?img=32',
    bio: 'Frontend engineer building flexible React systems with a focus on performance and implementation detail.',
    fallback: 'OS',
    followers: 108,
    followed: true,
    name: 'Owen Scott',
    projects: 4
  },
  {
    avatarAlt: 'Amara Lewis',
    avatarSrc: 'https://i.pravatar.cc/160?img=30',
    bio: 'Research lead translating user patterns into practical design decisions for product and brand teams.',
    fallback: 'AL',
    followers: 91,
    name: 'Amara Lewis',
    projects: 5
  }
] as const

type Metric = {
  icon: LucideIcon
  value: number
}

type UserRowProps = {
  user: UserProfile
}

const UserRow = ({ user }: UserRowProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const metrics: readonly Metric[] = [
    { icon: UserIcon, value: user.followers },
    { icon: PanelsTopLeftIcon, value: user.projects }
  ] as const

  return (
    <Collapsible open={open} onOpenChange={setOpen} className='rounded-lg border border-border/70 bg-background p-3 shadow-sm'>
      <CollapsibleTrigger className='flex w-full items-center justify-between gap-4'>
        <div className='flex items-center gap-3'>
          <Avatar>
            <AvatarImage src={user.avatarSrc} alt={user.avatarAlt} />
            <AvatarFallback>{user.fallback}</AvatarFallback>
          </Avatar>
          <span className='font-medium'>{user.name}</span>
        </div>
        <ChevronRightIcon className={`size-4 transition-transform ${open ? 'rotate-90' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className='pt-3'>
        <div className='flex flex-col gap-3'>
          <p className='text-sm text-muted-foreground'>{user.bio}</p>
          <div className='flex items-center justify-between gap-2'>
            <div className='flex items-center gap-4'>
              {metrics.map((metric) => {
                const Icon = metric.icon
                const metricKey = `${user.name}-${metric.value}-${Icon.name}`

                return (
                  <span key={metricKey} className='flex items-center gap-2'>
                    <Icon className='size-4 text-muted-foreground' />
                    <span className='text-sm'>{metric.value}</span>
                  </span>
                )
              })}
            </div>
            {user.followed ? (
              <Button variant='outline' className='h-7 rounded-md px-3 py-1 text-xs'>
                Following
              </Button>
            ) : (
              <Button className='h-7 rounded-md bg-sky-600 px-3 py-1 text-xs text-white hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400'>
                Follow
                <PlusIcon className='size-3.5' />
              </Button>
            )}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

const Collapsible4 = () => {
  return (
    <ul className='flex w-full max-w-[350px] flex-col gap-2.5'>
      {users.map((user) => (
        <li key={user.name}>
          <UserRow user={user} />
        </li>
      ))}
    </ul>
  )
}

export default Collapsible4
