'use client'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

const Sonner10 = () => {
  return (
    <Button
      variant='outline'
      className='rounded-2xl bg-emerald-500/5 text-emerald-600 hover:text-emerald-700 dark:hover:text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300 px-6'
      onClick={() =>
        toast.success('File Uploaded Successfully', {
          description: 'Your document is now available in the dashboard.',
          style: {
            '--normal-bg':
              'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
            '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
            '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))',
            borderRadius: '16px',
          } as React.CSSProperties,
          className: 'shadow-xl shadow-emerald-500/5',
        })
      }
    >
      Show Soft Success Toast
    </Button>
  )
}

export default Sonner10
