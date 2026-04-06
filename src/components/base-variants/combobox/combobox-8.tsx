'use client'

import { useId, useState } from 'react'

import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type UserStatus = 'away' | 'busy' | 'offline' | 'online'

type UserOption = {
  avatar: string
  email: string
  name: string
  status: UserStatus
}

const users = [
  {
    name: 'Maya Chen',
    email: 'maya.chen@northstar.app',
    avatar: 'https://i.pravatar.cc/160?img=32',
    status: 'online'
  },
  {
    name: 'Leo Grant',
    email: 'leo.grant@fieldnote.co',
    avatar: 'https://i.pravatar.cc/160?img=12',
    status: 'offline'
  },
  {
    name: 'Amara Lewis',
    email: 'amara.lewis@atlas.team',
    avatar: 'https://i.pravatar.cc/160?img=47',
    status: 'away'
  },
  {
    name: 'Noah Bennett',
    email: 'noah.bennett@orbitmail.com',
    avatar: 'https://i.pravatar.cc/160?img=15',
    status: 'online'
  },
  {
    name: 'Jade Morris',
    email: 'jade.morris@studioflow.io',
    avatar: 'https://i.pravatar.cc/160?img=5',
    status: 'busy'
  },
  {
    name: 'Elena Park',
    email: 'elena.park@workframe.dev',
    avatar: 'https://i.pravatar.cc/160?img=20',
    status: 'online'
  }
] as const satisfies readonly UserOption[]

type UserName = (typeof users)[number]['name']
type UserRecord = (typeof users)[number]

const userByName: Record<UserName, UserRecord> = {
  'Maya Chen': users[0],
  'Leo Grant': users[1],
  'Amara Lewis': users[2],
  'Noah Bennett': users[3],
  'Jade Morris': users[4],
  'Elena Park': users[5]
}

const isUserName = (value: string): value is UserName =>
  users.some((user) => user.name === value)

const getInitials = (name: string): string =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

const statusClassNameByValue: Record<UserStatus, string> = {
  online: 'bg-emerald-500',
  offline: 'bg-slate-400',
  away: 'bg-amber-400',
  busy: 'bg-rose-500'
}

const Combobox8 = () => {
  const id = useId()
  const [open, setOpen] = useState<boolean>(false)
  const [selectedUserName, setSelectedUserName] = useState<UserName | ''>('')

  const selectedUser: UserRecord | undefined = selectedUserName
    ? userByName[selectedUserName]
    : undefined

  return (
    <div className='w-full max-w-xs space-y-2'>
      <Label htmlFor={id} className='text-sm font-medium'>
        Assignee picker
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          id={id}
          role='combobox'
          aria-expanded={open}
          className='flex h-10 w-full items-center justify-between rounded-[1rem] border border-border/60 bg-background px-3.5 text-sm shadow-xs outline-none transition-colors hover:bg-accent/20 focus-visible:ring-[3px] focus-visible:ring-ring/50'
        >
          {selectedUser ? (
            <span className='flex min-w-0 items-center gap-2'>
              <Avatar className='size-6'>
                <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                <AvatarFallback>{getInitials(selectedUser.name)}</AvatarFallback>
              </Avatar>
              <span className='truncate font-medium'>{selectedUser.name}</span>
            </span>
          ) : (
            <span className='text-muted-foreground'>Select assignee</span>
          )}
          <ChevronsUpDownIcon
            className='text-muted-foreground/80 size-4 shrink-0'
            aria-hidden='true'
          />
        </PopoverTrigger>
        <PopoverContent className='w-[300px] rounded-[1rem] border-border/60 p-0 shadow-sm'>
          <Command>
            <CommandInput placeholder='Search assignee...' className='h-9 px-1' />
            <CommandList>
              <CommandEmpty>No assignee found.</CommandEmpty>
              <CommandGroup>
                {users.map((user) => (
                  <CommandItem
                    key={user.name}
                    value={user.name}
                    onSelect={(currentValue) => {
                      if (currentValue === selectedUserName) {
                        setSelectedUserName('')
                        setOpen(false)
                        return
                      }

                      if (!isUserName(currentValue)) {
                        return
                      }

                      setSelectedUserName(currentValue)
                      setOpen(false)
                    }}
                    className='rounded-lg'
                  >
                    <span className='flex min-w-0 flex-1 items-center gap-2'>
                      <span className='relative shrink-0'>
                        <Avatar className='size-7'>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <span
                          className={`absolute right-0 bottom-0 size-2 rounded-full ring-2 ring-background ${statusClassNameByValue[user.status]}`}
                        />
                      </span>
                      <span className='flex min-w-0 flex-col'>
                        <span className='truncate font-medium'>{user.name}</span>
                        <span className='text-muted-foreground truncate text-sm'>
                          {user.email}
                        </span>
                      </span>
                    </span>
                    {selectedUserName === user.name && (
                      <CheckIcon size={16} className='ml-auto shrink-0' />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default Combobox8
