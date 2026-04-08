'use client'

import { TruckIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

const Sonner3 = () => {
  return (
    <Button
      variant='outline'
      className='rounded-2xl bg-orange-500/5 text-orange-600 hover:text-orange-700 dark:hover:text-orange-500 border-orange-500/20 hover:bg-orange-500/10 hover:border-orange-500/30 transition-all duration-300 px-6'
      onClick={() =>
        toast(
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-orange-500/10 rounded-xl'>
              <TruckIcon className='size-5 text-orange-600 shrink-0' />
            </div>
            <div className='flex flex-col gap-1'>
               <span className='font-semibold'>Order Out for Delivery</span>
               <span className='text-xs opacity-80'>Your courier is just a few blocks away!</span>
            </div>
          </div>,
          {
            style: { borderRadius: '20px' },
            className: 'shadow-2xl shadow-orange-500/10',
          }
        )
      }
    >
      Track Delivery Status
    </Button>
  )
}

export default Sonner3
