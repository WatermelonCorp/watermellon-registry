import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Profile = {
  name: string
  src: string
}

const avatars: readonly Profile[] = [
  {
    src: 'https://i.pravatar.cc/160?img=12',
    name: 'Leo Grant'
  },
  {
    src: 'https://i.pravatar.cc/160?img=28',
    name: 'Nina Alvarez'
  },
  {
    src: 'https://i.pravatar.cc/160?img=36',
    name: 'Amara Lewis'
  },
  {
    src: 'https://i.pravatar.cc/160?img=52',
    name: 'Noah Bennett'
  }
] as const

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .map((word) => word.slice(0, 1))
    .join('')

const Avatar17 = () => {
  return (
    <div className='flex -space-x-2 hover:space-x-1'>
      {avatars.map((avatar) => (
        <Avatar key={avatar.name} className='ring-background ring-2 transition-all duration-300 ease-in-out'>
          <AvatarImage src={avatar.src} alt={avatar.name} />
          <AvatarFallback className='text-xs'>{getInitials(avatar.name)}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  )
}

export default Avatar17

