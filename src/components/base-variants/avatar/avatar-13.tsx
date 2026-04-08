import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

type Profile = {
  name: string
  src: string
}

const avatars: readonly Profile[] = [
  {
    src: 'https://i.pravatar.cc/160?img=60',
    name: 'Mia Foster'
  },
  {
    src: 'https://i.pravatar.cc/160?img=63',
    name: 'Daniel Reed'
  },
  {
    src: 'https://i.pravatar.cc/160?img=66',
    name: 'Priya Shah'
  },
  {
    src: 'https://i.pravatar.cc/160?img=69',
    name: 'Evan Torres'
  }
] as const

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .map((word) => word.slice(0, 1))
    .join('')

const Avatar13 = () => {
  return (
    <TooltipProvider>
      <div className='flex -space-x-2.5'>
        {avatars.map((avatar) => (
          <Tooltip key={avatar.name}>
            <TooltipTrigger>
              <Avatar className='ring-background ring-2 shadow-sm'>
                <AvatarImage src={avatar.src} alt={avatar.name} />
                <AvatarFallback className='text-xs'>{getInitials(avatar.name)}</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent className='px-2 py-1 text-[11px]'>
              {avatar.name}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
}

export default Avatar13

