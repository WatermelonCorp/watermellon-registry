import { TriangleAlertIcon } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui//alert-dialog'
import { Button } from '@/components/ui//button'
import { Checkbox } from '@/components/ui//checkbox'
import { Label } from '@/components/ui//label'

const Dialog3 = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          variant='outline'
          className='rounded-xl border border-border/40 bg-white text-neutral-800 hover:bg-neutral-50 transition dark:bg-neutral-900 dark:text-neutral-100 dark:border-border/60 dark:hover:bg-neutral-800 shadow-md'
        >
          Alert Dialog Destructive
        </Button>
      </AlertDialogTrigger>
        <AlertDialogContent className="rounded-xl border border-border/40 bg-white shadow-xl p-7 dark:bg-neutral-900 dark:border-border/60">
        <AlertDialogHeader className='items-center'>
          <div className='bg-red-100 dark:bg-red-900/30 mx-auto mb-2 flex size-12 items-center justify-center rounded-full'>
            <TriangleAlertIcon className='text-red-600 dark:text-red-400 size-6' />
          </div>
          <AlertDialogTitle className='text-base font-semibold text-neutral-900 dark:text-neutral-100 text-center'>Are you absolutely sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription className='text-center text-sm text-neutral-600 dark:text-neutral-300'>
            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
              <span className='mt-5 flex items-center justify-center gap-3'>
                <Checkbox id='terms' className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
                <Label htmlFor='terms' className='text-neutral-700 dark:text-neutral-200 text-sm'>Don&apos;t ask again next time</Label>
              </span>
              {/* Custom style to make the checkmark blue */}
              <style>{`
                [data-state="checked"] svg {
                  color: #2563eb !important; /* Tailwind blue-600 */
                  stroke: #2563eb !important;
                }
              `}</style>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='bg-transparent p-4 pb-2'>
          <AlertDialogCancel className='rounded-xl border border-border/30 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition dark:bg-neutral-800 dark:text-neutral-200 dark:border-border/50 dark:hover:bg-neutral-700'>Cancel</AlertDialogCancel>
          <AlertDialogAction className='rounded-xl bg-red-600 text-white hover:bg-red-700 transition font-semibold px-6 py-2 shadow dark:bg-red-500 dark:hover:bg-red-600 dark:text-white'>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Dialog3
