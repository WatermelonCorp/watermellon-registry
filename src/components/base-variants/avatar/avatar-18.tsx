import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

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

const Avatar18 = () => {
  return (
    <TooltipProvider>
      <div className='group flex'>
        {avatars.map((avatar) => (
          <Tooltip key={avatar.name}>
            <TooltipTrigger className='first:ml-0 -ml-2 transition-[margin] duration-300 ease-in-out group-hover:ml-1'>
              <Avatar className='ring-background ring-2 transition-all duration-300 ease-in-out'>
                <AvatarImage src={avatar.src} alt={avatar.name} />
                <AvatarFallback className='text-xs'>{getInitials(avatar.name)}</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent className='px-2 py-1 text-[11px]'>{avatar.name}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
}

export default Avatar18

