'use client'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

const Sonner11 = () => {
  return (
    <Button
      variant='outline'
      className='rounded-2xl bg-amber-500/5 text-amber-600 hover:text-amber-700 dark:hover:text-amber-500 border-amber-500/20 hover:bg-amber-500/10 hover:border-amber-500/30 transition-all duration-300 px-6'
      onClick={() =>
        toast.warning('Storage Space is Running Low', {
          description: 'You have used 90% of your available storage.',
          style: {
            '--normal-bg':
              'color-mix(in oklab, light-dark(var(--color-amber-600), var(--color-amber-400)) 10%, var(--background))',
            '--normal-text': 'light-dark(var(--color-amber-600), var(--color-amber-400))',
            '--normal-border': 'light-dark(var(--color-amber-600), var(--color-amber-400))',
            borderRadius: '16px',
          } as React.CSSProperties,
          className: 'shadow-xl shadow-amber-500/5',
        })
      }
    >
      Show Soft Warning Toast
    </Button>
  )
}

export default Sonner11
