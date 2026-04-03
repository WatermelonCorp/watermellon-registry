import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Profile = {
  name: string
  avatar: string
  status: string
}

const profile: Profile = {
  name: 'Jade Morris',
  avatar: 'https://i.pravatar.cc/160?img=41',
  status: 'Away'
}

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .map((word) => word.slice(0, 1))
    .join('')

const Avatar9 = () => {
  return (
    <Avatar className='rounded-sm'>
      <AvatarImage
        src={profile.avatar}
        alt={profile.name}
        className='rounded-sm'
      />
      <AvatarFallback className='text-xs'>{getInitials(profile.name)}</AvatarFallback>
      <AvatarBadge className='top-0 right-0 bottom-auto translate-x-1/4 -translate-y-1/4 bg-amber-600 dark:bg-amber-400'>
        <span className='sr-only'>{profile.status}</span>
      </AvatarBadge>
    </Avatar>
  )
}

export default Avatar9

