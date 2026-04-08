'use client'

import { toast } from 'sonner'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

const Sonner4 = () => {
  return (
    <Button
      variant='outline'
      className='rounded-2xl bg-purple-500/5 text-purple-600 hover:text-purple-700 dark:hover:text-purple-500 border-purple-500/20 hover:bg-purple-500/10 hover:border-purple-500/30 transition-all duration-300 px-6'
      onClick={() =>
        toast(
          <div className='flex items-center gap-3'>
            <Avatar className='size-10'>
              <AvatarImage src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww' alt='Hallie Richards' />
              <AvatarFallback className='text-xs bg-purple-50 text-purple-600'>HR</AvatarFallback>
            </Avatar>
            <div className='flex flex-col gap-0.5'>
              <span className='font-medium text-sm'>Profile Updated</span>
              <p className='text-xs opacity-70'>Settings synced across all devices.</p>
            </div>
          </div>,
          {
            style: { borderRadius: '18px' },
            className: 'border border-purple-100 shadow-xl shadow-purple-500/5',
          }
        )
      }
    >
      Update System Profile
    </Button>
  )
}

export default Sonner4
