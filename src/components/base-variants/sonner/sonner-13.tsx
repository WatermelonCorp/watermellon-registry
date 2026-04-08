'use client'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

const Sonner13 = () => {
  return (
    <Button
      variant='outline'
      className='rounded-2xl border-sky-500/30 text-sky-600 hover:text-sky-700 dark:hover:text-sky-500 hover:bg-sky-50 transition-all duration-300 px-6'
      onClick={() =>
        toast.info('System Maintenance Scheduled', {
          description: 'Our servers will be down for maintenance tonight at 2 AM.',
          style: {
            '--normal-bg': 'var(--background)',
            '--normal-text': 'light-dark(var(--color-sky-600), var(--color-sky-400))',
            '--normal-border': 'light-dark(var(--color-sky-600), var(--color-sky-400))',
            borderRadius: '16px',
          } as React.CSSProperties,
          className: 'shadow-lg',
        })
      }
    >
      Show Outline Info Toast
    </Button>
  )
}

export default Sonner13
