'use client'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

const Sonner6 = () => {
  return (
    <Button
      variant='outline'
      className='rounded-2xl bg-teal-500/5 text-teal-600 hover:text-teal-700 dark:hover:text-teal-500 border-teal-500/20 hover:bg-teal-500/10 hover:border-teal-500/30 transition-all duration-300 px-6'
      onClick={() =>
        toast('Message Archived', {
          description: 'Your conversation has been moved to the archive folder.',
          action: {
            label: 'Undo',
            onClick: () => console.log('Undo'),
          },
          style: { borderRadius: '16px' },
          className: 'border border-teal-100 shadow-xl shadow-teal-500/5',
        })
      }
    >
      Archive Conversation
    </Button>
  )
}

export default Sonner6
