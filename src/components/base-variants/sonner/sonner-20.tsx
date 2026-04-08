'use client'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

const Sonner20 = () => {
  return (
    <Button
      variant='outline'
      className='rounded-2xl bg-red-500 dark:bg-red-600 dark:hover:bg-red-700 text-white hover:text-white border-red-500 hover:bg-red-600 shadow-lg shadow-red-600/20 dark:shadow-none transition-all duration-300 px-6'
      onClick={() =>
        toast.error('System Failure Detected', {
          description: 'A critical error occurred in the processing kernel.',
          style: {
            '--normal-bg': 'var(--destructive)',
            '--normal-text': 'var(--color-white)',
            '--normal-border': 'var(--destructive)',
            '--description-color': 'rgba(255, 255, 255, 0.7)',
            borderRadius: '16px',
          } as React.CSSProperties,
          className: 'shadow-2xl shadow-red-600/10',
        })
      }
    >
      Activate Solid Destructive
    </Button>
  )
}

export default Sonner20
