'use client'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

const Sonner2 = () => {
  return (
    <Button
      variant='outline'
      className='rounded-2xl bg-sky-500/5 text-sky-600 hover:text-sky-700 dark:hover:text-sky-500 border-sky-500/20 hover:bg-sky-500/10 hover:border-sky-500/30 transition-all duration-300 px-6'
      onClick={() =>
        toast('Upcoming Team Sync', {
          description: 'Friday, August 15, 2025 at 10:30 AM in Room 4B.',
          style: {
            borderRadius: '16px',
          },
          className: 'border-l-4 border-l-sky-500 shadow-xl shadow-sky-500/5',
        })
      }
    >
      View Scheduled Agenda
    </Button>
  )
}

export default Sonner2
