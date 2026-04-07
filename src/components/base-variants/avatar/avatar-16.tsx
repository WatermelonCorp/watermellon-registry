import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

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

const Avatar16 = () => {
  return (
    <div className='flex -space-x-2'>
      {avatars.map((avatar) => (
        <Avatar
          key={avatar.name}
          className='ring-background ring-2 transition-all duration-300 ease-in-out hover:z-1 hover:-translate-y-1 hover:shadow-lg'
        >
          <AvatarImage src={avatar.src} alt={avatar.name} />
          <AvatarFallback className='text-xs'>{getInitials(avatar.name)}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  )
}

export default Avatar16

