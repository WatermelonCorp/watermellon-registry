'use client'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

const Sonner18 = () => {
  return (
    <Button
      variant='outline'
      className='rounded-2xl bg-emerald-500 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white hover:text-white border-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-600/20 dark:shadow-none transition-all duration-300 px-6'
      onClick={() =>
        toast.success('Backup Complete', {
          description: 'All your files are safely stored in the secure vault.',
          style: {
            '--normal-bg': 'light-dark(var(--color-green-600), var(--color-green-700))',
            '--normal-text': 'var(--color-white)',
            '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-700))',
            '--description-color': 'light-dark(var(--color-green-100), var(--color-green-200))',
            borderRadius: '16px',
          } as React.CSSProperties,
          className: 'shadow-2xl shadow-emerald-600/10',
        })
      }
    >
      Activate Solid Success
    </Button>
  )
}

export default Sonner18
