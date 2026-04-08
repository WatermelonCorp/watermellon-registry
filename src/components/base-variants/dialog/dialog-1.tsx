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

const Dialog1: FC = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          variant='outline'
          className='rounded-2xl shadow-md bg-white/80 text-primary border border-border/40 backdrop-blur-sm dark:bg-neutral-900 dark:text-primary dark:border-border/60 dark:backdrop-blur-md'
        >
          Alert Dialog
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-3xl shadow-2xl bg-white/80 border border-border/40 backdrop-blur-md dark:bg-neutral-900 dark:border-border/60 dark:backdrop-blur-md">
        <AlertDialogHeader>
          <AlertDialogTitle className='text-neutral-900 dark:text-neutral-100'>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className='text-neutral-700 dark:text-neutral-300'>
            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='rounded-2xl shadow bg-white/70 border border-border/30 text-primary dark:bg-neutral-800 dark:text-primary dark:border-border/50'>Cancel</AlertDialogCancel>
          <AlertDialogAction className='rounded-full bg-blue-600 text-white hover:bg-blue-700 transition font-semibold px-7 py-2.5 shadow dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white'>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Dialog1
