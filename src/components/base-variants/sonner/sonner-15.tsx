'use client'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

const Sonner15 = () => {
  return (
    <Button
      variant='outline'
      className='rounded-2xl border-amber-500/30 text-amber-600 hover:text-amber-700 dark:hover:text-amber-500 hover:bg-amber-50 transition-all duration-300 px-6'
      onClick={() =>
        toast.warning('Unrecognized Login Attempt', {
          description: 'A new login was detected from a new IP address.',
          style: {
            '--normal-bg': 'var(--background)',
            '--normal-text': 'light-dark(var(--color-amber-600), var(--color-amber-400))',
            '--normal-border': 'light-dark(var(--color-amber-600), var(--color-amber-400))',
            borderRadius: '16px',
          } as React.CSSProperties,
          className: 'shadow-lg',
        })
      }
    >
      Show Outline Warning Toast
    </Button>
  )
}

export default Sonner15
