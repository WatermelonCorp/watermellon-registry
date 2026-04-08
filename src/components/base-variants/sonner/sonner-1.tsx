'use client'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

const Sonner1 = () => {
  return (
    <Button
      variant='outline'
      className='rounded-2xl bg-primary/5 text-primary hover:text-primary border-primary/20 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 px-6'
      onClick={() =>
        toast.success('Project deployed successfully!', {
          description: 'Your changes are now live on the production server.',
          style: {
            borderRadius: '16px',
            padding: '16px',
          },
          className: 'border-l-4 border-l-green-500 shadow-2xl',
        })
      }
    >
      Launch Success Toast
    </Button>
  )
}

export default Sonner1
