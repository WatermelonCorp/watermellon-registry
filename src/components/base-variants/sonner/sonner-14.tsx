'use client'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

const Sonner14 = () => {
  return (
    <Button
      variant='outline'
      className='rounded-2xl border-emerald-500/30 text-emerald-600 hover:text-emerald-700 dark:hover:text-emerald-500 hover:bg-emerald-50 transition-all duration-300 px-6'
      onClick={() =>
        toast.success('Payment Received', {
          description: 'Your invoice #2931 has been marked as paid.',
          style: {
            '--normal-bg': 'var(--background)',
            '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
            '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))',
            borderRadius: '16px',
          } as React.CSSProperties,
          className: 'shadow-lg',
        })
      }
    >
      Show Outline Success Toast
    </Button>
  )
}

export default Sonner14
