import type { LucideIcon } from 'lucide-react'
import { BriefcaseIcon } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'

type Profile = {
  label: string
  icon: LucideIcon
}

const profile: Profile = {
  label: 'Operations',
  icon: BriefcaseIcon
}

const Avatar6 = () => {
  const Icon = profile.icon

  return (
    <Avatar>
      <AvatarFallback className='bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'>
        <Icon className='size-4' />
      </AvatarFallback>
    </Avatar>
  )
}

export default Avatar6
