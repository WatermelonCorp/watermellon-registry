'use client'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

const Sonner7 = () => {
  const promise = () =>
    new Promise((resolve, reject) =>
      setTimeout(() => {
        if (Math.random() < 0.5) {
          resolve('Sync Complete')
        } else {
          reject('Connection Failed')
        }
      }, 2000)
    )

  return (
    <Button
      variant='outline'
      className='rounded-2xl bg-indigo-500/5 text-indigo-600 hover:text-indigo-700 dark:hover:text-indigo-500 border-indigo-500/20 hover:bg-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 px-6'
      onClick={() =>
        toast.promise(promise, {
          loading: 'Synchronizing project data...',
          success: (data) => {
            return `${data}: Your workspace is up to date.`
          },
          error: (err) => {
            return `${err}: Please check your internet connection.`
          },
          style: { borderRadius: '16px' },
          className: 'shadow-2xl shadow-indigo-500/5',
        })
      }
    >
      Sync Remote Repository
    </Button>
  )
}

export default Sonner7
