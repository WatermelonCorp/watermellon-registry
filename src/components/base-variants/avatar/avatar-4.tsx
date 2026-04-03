import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Profile = {
  name: string
  avatar: string
}

const profile: Profile = {
  name: 'Nina Alvarez',
  avatar: 'https://i.pravatar.cc/160?img=28'
}

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .map((word) => word.slice(0, 1))
    .join('')

const Avatar4 = () => {
  return (
    <Avatar className='size-12'>
      <AvatarImage src={profile.avatar} alt={profile.name} />
      <AvatarFallback className='text-xs'>{getInitials(profile.name)}</AvatarFallback>
    </Avatar>
  )
}

export default Avatar4

