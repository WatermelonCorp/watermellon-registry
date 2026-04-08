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

const Avatar21 = () => {
  return (
    <div className='bg-background flex flex-wrap items-center justify-center rounded-full border border-border/70 px-1.5 py-1 shadow-sm'>
      <div className='flex -space-x-1.5'>
        {avatars.map((avatar) => (
          <Avatar key={avatar.name} className='ring-background size-6 ring-2'>
            <AvatarImage src={avatar.src} alt={avatar.name} />
            <AvatarFallback className='text-xs'>{getInitials(avatar.name)}</AvatarFallback>
          </Avatar>
        ))}
      </div>
      <p className='text-muted-foreground px-2.5 text-xs'>
        Used by <strong className='text-foreground font-medium'>12K+</strong> product teams.
      </p>
    </div>
  )
}

export default Avatar21

