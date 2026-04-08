'use client'

import { useState } from 'react'

import { Volume2Icon, VolumeXIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Slider } from '@/components/ui/slider'

const Popover4 = () => {
  const [value, setValue] = useState([45])

  return (
    <Popover>
      <PopoverTrigger asChild backdrop-blur-sm>
        <Button variant='outline' size='icon' className='rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all active:scale-95'>
          <Volume2Icon className="size-4" />
          <span className='sr-only'>Volume control</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80 rounded-2xl shadow-2xl border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6'>
        <div className='flex flex-col gap-6'>
          <div className='flex items-center justify-between gap-4'>
            <div className="flex flex-col gap-1">
               <Label className='text-sm font-bold text-neutral-900 dark:text-neutral-100'>Audio Output</Label>
               <p className="text-[11px] text-neutral-500 font-medium">Master session volume</p>
            </div>
            <output className='text-xl font-bold text-orange-500 tabular-nums'>{value[0]}%</output>
          </div>
          <div className='flex items-center gap-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl p-3'>
            <VolumeXIcon className='size-4 shrink-0 text-neutral-400 opacity-60' />
            <Slider 
              value={value} 
              onValueChange={setValue} 
              aria-label='Volume' 
              className="[&>[data-slot=slider-range]]:bg-orange-500 [&>[data-slot=slider-track]]:bg-neutral-200 dark:[&>[data-slot=slider-track]]:bg-neutral-800" 
            />
            <Volume2Icon className='size-4 shrink-0 text-neutral-400 opacity-60' />
          </div>
          <div className="grid grid-cols-2 gap-3">
             <Button variant="outline" size="sm" className="rounded-xl text-xs font-bold border-neutral-200 dark:border-neutral-800" onClick={() => setValue([0])}>Mute</Button>
             <Button variant="outline" size="sm" className="rounded-xl text-xs font-bold border-neutral-200 dark:border-neutral-800" onClick={() => setValue([100])}>Maximum</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default Popover4
