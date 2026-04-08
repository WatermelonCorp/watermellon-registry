'use client'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

const Sonner12 = () => {
  return (
    <Button
      variant='outline'
      className='rounded-2xl bg-destructive/5 text-destructive hover:text-destructive/80 border-destructive/20 hover:bg-destructive/10 hover:border-destructive/30 transition-all duration-300 px-6'
      onClick={() =>
        toast.error('Permanent Deletion Warning', {
          description: 'This action cannot be undone. Please confirm.',
          style: {
            '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
            '--normal-text': 'var(--destructive)',
            '--normal-border': 'var(--destructive)',
            borderRadius: '16px',
          } as React.CSSProperties,
          className: 'shadow-xl shadow-destructive/5',
        })
      }
    >
      Show Soft Destructive Toast
    </Button>
  )
}

export default Sonner12
