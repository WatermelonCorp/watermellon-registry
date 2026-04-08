'use client'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

const Sonner8 = () => {
  const triggerToast = (
    position:
      | 'top-left'
      | 'top-center'
      | 'top-right'
      | 'bottom-left'
      | 'bottom-center'
      | 'bottom-right'
  ) => {
    toast('Position Updated', {
      description: `Notification now showing at ${position}.`,
      position,
      style: { borderRadius: '12px' },
      className: 'shadow-lg border border-zinc-100',
    });
  };

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
      {([
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ] as const).map((pos) => (
        <Button
          key={pos}
          variant='outline'
          className='rounded-xl bg-zinc-500/5 text-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-500 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900 transition-all duration-200 capitalize text-xs h-9'
          onClick={() => triggerToast(pos)}
        >
          {pos.replace('-', ' ')}
        </Button>
      ))}
    </div>
  )
}

export default Sonner8
