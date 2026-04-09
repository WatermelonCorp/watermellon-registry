import { InfoIcon } from 'lucide-react'

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
import type { FC } from 'react';

const Dialog2: FC = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          variant='outline'
          className='rounded-xl border border-border/40 bg-white text-neutral-800 hover:bg-neutral-50 transition dark:bg-neutral-900 dark:text-neutral-100 dark:border-border/60 dark:hover:bg-neutral-800 shadow-md'
        >
          Alert Dialog (With Icon)
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent
        className="rounded-2xl border border-border/40 bg-white shadow-lg p-6 dark:bg-neutral-900 dark:border-border/60"
      >
        <AlertDialogHeader>
          <div className='mb-3 flex size-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30'>
            <InfoIcon className='size-4 text-blue-600 dark:text-blue-400' />
          </div>
          <AlertDialogTitle className='text-base font-semibold text-neutral-900 dark:text-neutral-100'>Heads up!</AlertDialogTitle>
          <AlertDialogDescription className='text-sm text-neutral-600 dark:text-neutral-300'>
            This is a minimal dialog for simple confirmations or information. Please proceed if you understand.<br />
            <br />
            <span className="block mt-2">If you have any questions, feel free to contact support at <a href="mailto:support@example.com" className="text-blue-600 dark:text-blue-400 underline">support@example.com</a>.</span>
            <span className="block mt-2">Note: Your changes will not be saved unless you confirm this action.</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='bg-transparent p-4 pb-2'>
          <AlertDialogCancel className='rounded-xl border border-border/30 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition dark:bg-neutral-800 dark:text-neutral-200 dark:border-border/50 dark:hover:bg-neutral-700'>Cancel</AlertDialogCancel>
          <AlertDialogAction className='rounded-xl bg-blue-600! text-white! transition px-6 py-2 font-semibold shadow hover:bg-blue-700! dark:bg-blue-500! dark:hover:bg-blue-600!'>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Dialog2
