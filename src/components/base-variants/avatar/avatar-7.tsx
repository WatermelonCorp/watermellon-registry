import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Profile = {
  name: string
  avatar: string
  status: string
}

const profile: Profile = {
  name: 'Leo Grant',
  avatar: 'https://i.pravatar.cc/160?img=12',
  status: 'Available'
}

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .map((word) => word.slice(0, 1))
    .join('')

const Avatar7 = () => {
  return (
    <Avatar>
        <AvatarImage src={profile.avatar} alt={profile.name} />
        <AvatarFallback className='text-xs'>{getInitials(profile.name)}</AvatarFallback>
      <AvatarBadge className='bg-emerald-500'>
        <span className='sr-only'>{profile.status}</span>
      </AvatarBadge>
    </Avatar>
  )
}

export default Avatar7

