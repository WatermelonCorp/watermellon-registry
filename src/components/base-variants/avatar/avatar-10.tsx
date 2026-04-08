import { PlusCircleIcon } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Profile = {
  name: string
  avatar: string
  actionLabel: string
}

const profile: Profile = {
  name: 'Elena Park',
  avatar: 'https://i.pravatar.cc/160?img=47',
  actionLabel: 'Invite'
}

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .map((word) => word.slice(0, 1))
    .join('')

const Avatar10 = () => {
  return (
    <div className='relative w-fit'>
      <Avatar className='size-10'>
        <AvatarImage src={profile.avatar} alt={profile.name} />
        <AvatarFallback className='text-xs'>{getInitials(profile.name)}</AvatarFallback>
      </Avatar>
      <button className='focus-visible:ring-ring/50 absolute -right-1 -bottom-1 inline-flex cursor-pointer items-center justify-center rounded-full focus-visible:ring-[3px] focus-visible:outline-none'>
        <PlusCircleIcon className='size-5 fill-slate-400 text-background' />
        <span className='sr-only'>{profile.actionLabel}</span>
      </button>
    </div>
  )
}

export default Avatar10

