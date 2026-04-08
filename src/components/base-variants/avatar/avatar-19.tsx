import { PlusIcon } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
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
    src: 'https://i.pravatar.cc/160?img=41',
    name: 'Jade Morris'
  },
  {
    src: 'https://i.pravatar.cc/160?img=47',
    name: 'Elena Park'
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

const Avatar19 = () => {
  return (
    <TooltipProvider>
      <div className='flex -space-x-2'>
        {avatars.slice(0, 3).map((avatar) => (
          <Tooltip key={avatar.name}>
            <TooltipTrigger>
              <Avatar className='ring-background ring-2'>
                <AvatarImage src={avatar.src} alt={avatar.name} />
                <AvatarFallback className='text-xs'>{getInitials(avatar.name)}</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent className='px-2 py-1 text-[11px]'>{avatar.name}</TooltipContent>
          </Tooltip>
        ))}
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger>
              <DropdownMenuTrigger className='bg-muted has-focus-visible:ring-ring/50 ring-background flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full ring-2'>
                <PlusIcon className='size-4' />
                <span className='sr-only'>Add</span>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent className='px-2 py-1 text-[11px]'>More people</TooltipContent>
          </Tooltip>
          <DropdownMenuContent>
            {avatars.slice(3).map((avatar) => (
              <DropdownMenuItem key={avatar.name}>
                <Avatar>
                  <AvatarImage src={avatar.src} alt={avatar.name} />
                  <AvatarFallback className='text-xs'>{getInitials(avatar.name)}</AvatarFallback>
                </Avatar>
                <span>{avatar.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </TooltipProvider>
  )
}

export default Avatar19

