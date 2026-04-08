import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

type Profile = {
  name: string
  role: string
}

const profile: Profile = {
  name: 'Ethan Cole',
  role: 'Support Lead'
}

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .map((word) => word.slice(0, 1))
    .join('')

const Avatar5 = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Avatar>
            <AvatarFallback className='text-xs'>{getInitials(profile.name)}</AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent className='px-2 py-1 text-[11px]'>
          {profile.name} · {profile.role}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default Avatar5
