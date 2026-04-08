'use client'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

const Sonner16 = () => {
  return (
    <Button
      variant='outline'
      className='rounded-2xl border-destructive/30 text-destructive hover:text-destructive/80 dark:hover:text-destructive/80 hover:bg-destructive/5 transition-all duration-300 px-6'
      onClick={() =>
        toast.error('Account Access Revoked', {
          description: 'Your administrative privileges have been temporarily suspended.',
          style: {
            '--normal-bg': 'var(--background)',
            '--normal-text': 'var(--destructive)',
            '--normal-border': 'var(--destructive)',
            borderRadius: '16px',
          } as React.CSSProperties,
          className: 'shadow-2xl shadow-destructive/5',
        })
      }
    >
      Show Outline Destructive Toast
    </Button>
  )
}

export default Sonner16
