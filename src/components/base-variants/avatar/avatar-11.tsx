import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

type Profile = {
  name: string
  avatar: string
  count: number
}

const profile: Profile = {
  name: 'Noah Bennett',
  avatar: 'https://i.pravatar.cc/160?img=52',
  count: 5
}

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .map((word) => word.slice(0, 1))
    .join('')

const Avatar11 = () => {
  return (
    <div className='relative w-fit'>
      <Avatar className='size-10 rounded-sm'>
        <AvatarImage
          src={profile.avatar}
          alt={profile.name}
          className='rounded-sm'
        />
        <AvatarFallback className='text-xs'>{getInitials(profile.name)}</AvatarFallback>
      </Avatar>
      <Badge className='absolute -top-2.5 -right-2.5 h-5 min-w-5 bg-slate-700 px-1 tabular-nums text-white dark:bg-slate-200 dark:text-slate-900'>
        {profile.count}
      </Badge>
    </div>
  )
}

export default Avatar11

