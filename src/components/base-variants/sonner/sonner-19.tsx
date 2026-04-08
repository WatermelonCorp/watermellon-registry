'use client'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

const Sonner19 = () => {
  return (
    <Button
      variant='outline'
      className='rounded-2xl bg-amber-500 dark:bg-amber-600 dark:hover:bg-amber-700 text-white hover:text-white border-amber-500 hover:bg-amber-600 shadow-lg shadow-amber-600/20 dark:shadow-none transition-all duration-300 px-6'
      onClick={() =>
        toast.warning('Unusual Activity Detected', {
          description: 'We noticed a login from a new device in London, UK.',
          style: {
            '--normal-bg': 'light-dark(var(--color-amber-600), var(--color-amber-500))',
            '--normal-text': 'var(--color-white)',
            '--normal-border': 'light-dark(var(--color-amber-600), var(--color-amber-500))',
            '--description-color': 'light-dark(var(--color-amber-100), var(--color-amber-200))',
            borderRadius: '16px',
          } as React.CSSProperties,
          className: 'shadow-2xl shadow-amber-600/10',
        })
      }
    >
      Activate Solid Warning
    </Button>
  )
}

export default Sonner19
