'use client'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

const Sonner5 = () => {
  return (
    <Button
      variant='outline'
      className='rounded-2xl bg-zinc-500/5 text-zinc-600 border-zinc-500/20 hover:bg-zinc-500/10 hover:border-zinc-500/30 transition-all duration-300 px-6'
      onClick={() =>
        toast('Draft Saved Automatically', {
          description: 'You can dismiss this message or wait for it to auto-close.',
          closeButton: true,
          style: {
            borderRadius: '14px',
          },
          className: 'shadow-lg border border-zinc-100',
        })
      }
    >
      Show Dismissible Toast
    </Button>
  )
}

export default Sonner5
