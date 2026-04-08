'use client'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

const Sonner17 = () => {
  return (
    <Button
      variant='outline'
      className='rounded-2xl bg-sky-500 dark:bg-sky-600 dark:hover:bg-sky-700 text-white hover:text-white border-sky-500 hover:bg-sky-600 shadow-lg shadow-sky-600/20 dark:shadow-none transition-all duration-300 px-6'
      onClick={() =>
        toast.info('Cloud Sync Enabled', {
          description: 'Your library is now syncing with the cloud.',
          style: {
            '--normal-bg': 'light-dark(var(--color-sky-500), var(--color-sky-600))',
            '--normal-text': 'var(--color-white)',
            '--normal-border': 'light-dark(var(--color-sky-500), var(--color-sky-600))',
            '--description-color': 'light-dark(var(--color-sky-100), var(--color-sky-200))',
            borderRadius: '16px',
          } as React.CSSProperties,
          className: 'shadow-2xl shadow-sky-600/10',
        })
      }
    >
      Activate Solid Info
    </Button>
  )
}

export default Sonner17
