'use client'

import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

const Sonner9 = () => {
  return (
    <Button
      variant='outline'
      className='rounded-2xl bg-sky-500/5 text-sky-600 hover:text-sky-700 dark:hover:text-sky-500 border-sky-500/20 hover:bg-sky-500/10 hover:border-sky-500/30 transition-all duration-300 px-6'
      onClick={() =>
        toast.info('New System Update Available', {
          description: 'Version 2.4.0 includes performance improvements.',
          style: {
            '--normal-bg':
              'color-mix(in oklab, light-dark(var(--color-sky-600), var(--color-sky-400)) 10%, var(--background))',
            '--normal-text': 'light-dark(var(--color-sky-600), var(--color-sky-400))',
            '--normal-border': 'light-dark(var(--color-sky-600), var(--color-sky-400))',
            borderRadius: '16px',
          } as React.CSSProperties,
          className: 'shadow-xl shadow-sky-500/5',
        })
      }
    >
      Show Soft Info Toast
    </Button>
  )
}

export default Sonner9
