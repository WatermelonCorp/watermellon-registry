import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from '@/components/ui/avatar'

type Profile = {
  name: string
  src: string
}

const avatars: readonly Profile[] = [
  {
    src: 'https://i.pravatar.cc/160?img=18',
    name: 'Maya Chen'
  },
  {
    src: 'https://i.pravatar.cc/160?img=28',
    name: 'Nina Alvarez'
  },
  {
    src: 'https://i.pravatar.cc/160?img=36',
    name: 'Amara Lewis'
  }
] as const

const overflowCount = 6

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .map((word) => word.slice(0, 1))
    .join('')

const Avatar14 = () => {
  return (
    <AvatarGroup>
      {avatars.map((avatar) => (
        <Avatar key={avatar.name}>
          <AvatarImage src={avatar.src} alt={avatar.name} />
          <AvatarFallback className='text-xs'>{getInitials(avatar.name)}</AvatarFallback>
        </Avatar>
      ))}
      <AvatarGroupCount className='text-xs'>+{overflowCount}</AvatarGroupCount>
    </AvatarGroup>
  )
}

export default Avatar14

