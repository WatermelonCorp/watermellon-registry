import { CheckIcon } from 'lucide-react'

import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Profile = {
  name: string
  avatar: string
}

const profile: Profile = {
  name: 'Amara Lewis',
  avatar: 'https://i.pravatar.cc/160?img=36'
}

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .map((word) => word.slice(0, 1))
    .join('')

const Avatar8 = () => {
  return (
    <Avatar className='ring-offset-background ring-2 ring-emerald-600 ring-offset-2 dark:ring-emerald-400'>
      <AvatarImage src={profile.avatar} alt={profile.name} />
      <AvatarFallback className='text-xs'>{getInitials(profile.name)}</AvatarFallback>
      <AvatarBadge className='bg-emerald-600 text-white dark:bg-emerald-400'>
        <CheckIcon className='size-2.5' />
      </AvatarBadge>
    </Avatar>
  )
}

export default Avatar8

