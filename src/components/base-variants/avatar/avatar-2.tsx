import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Profile = {
  name: string
  avatar: string
}

const profile: Profile = {
  name: 'Owen Brooks',
  avatar: 'https://i.pravatar.cc/160?img=32'
}

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .map((word) => word.slice(0, 1))
    .join('')

const Avatar2 = () => {
  return (
    <Avatar className='ring-ring ring-2'>
      <AvatarImage src={profile.avatar} alt={profile.name} />
      <AvatarFallback className='text-xs'>{getInitials(profile.name)}</AvatarFallback>
    </Avatar>
  )
}

export default Avatar2

