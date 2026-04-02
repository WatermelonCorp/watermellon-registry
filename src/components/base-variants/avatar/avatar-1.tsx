import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Profile = {
  name: string
  avatar: string
}

const profile: Profile = {
  name: 'Maya Chen',
  avatar: 'https://i.pravatar.cc/160?img=18'
}

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .map((word) => word.slice(0, 1))
    .join('')

const Avatar1 = () => {
  return (
    <Avatar>
      <AvatarImage src={profile.avatar} alt={profile.name} />
      <AvatarFallback className='text-xs'>{getInitials(profile.name)}</AvatarFallback>
    </Avatar>
  )
}

export default Avatar1

