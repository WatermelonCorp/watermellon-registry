import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

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
    src: 'https://i.pravatar.cc/160?img=41',
    name: 'Jade Morris'
  },
  {
    src: 'https://i.pravatar.cc/160?img=47',
    name: 'Elena Park'
  },
  {
    src: 'https://i.pravatar.cc/160?img=56',
    name: 'Clara Hughes'
  }
] as const

const overflowCount = 3

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .map((word) => word.slice(0, 1))
    .join('')

const Avatar20 = () => {
  return (
    <TooltipProvider>
      <div className='bg-background flex items-center rounded-full border border-border/70 px-1.5 py-1 shadow-md'>
        <div className='flex -space-x-2.5'>
          {avatars.map((avatar) => (
            <Tooltip key={avatar.name}>
              <TooltipTrigger>
                <Avatar className='ring-background ring-2 shadow-sm'>
                  <AvatarImage src={avatar.src} alt={avatar.name} />
                  <AvatarFallback className='text-xs'>{getInitials(avatar.name)}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent className='px-2 py-1 text-[11px]'>{avatar.name}</TooltipContent>
            </Tooltip>
          ))}
        </div>
        <Tooltip>
          <TooltipTrigger>
            <span className='text-muted-foreground flex items-center justify-center rounded-full bg-muted/50 px-2.5 py-1 text-xs shadow-none'>
              +{overflowCount}
            </span>
          </TooltipTrigger>
          <TooltipContent className='px-2 py-1 text-[11px]'>More teammates</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}

export default Avatar20

