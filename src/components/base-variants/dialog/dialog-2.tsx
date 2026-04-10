import { InfoIcon } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import type { FC } from 'react';

const Dialog2: FC = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          variant="outline"
          className="rounded-xl border border-zinc-200 bg-zinc-50 px-6 py-2 font-medium text-zinc-800 shadow-sm transition-all hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
        >
          Alert Dialog (With Icon)
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-border/40 dark:border-border/60 rounded-2xl border bg-white p-6 shadow-lg dark:bg-neutral-900">
        <AlertDialogHeader className="place-items-start text-left">
          <div className="mb-3 flex size-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
            <InfoIcon className="size-4 text-blue-600 dark:text-blue-400" />
          </div>
          <AlertDialogTitle className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Heads up!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-neutral-600 dark:text-neutral-300">
            This is a minimal dialog for simple confirmations or information.
            Please proceed if you understand.
            <br />
            <br />
            <span className="mt-2 block">
              If you have any questions, feel free to contact support at{' '}
              <a
                href="mailto:support@example.com"
                className="text-blue-600 underline dark:text-blue-400"
              >
                support@example.com
              </a>
              .
            </span>
            <span className="mt-2 block">
              Note: Your changes will not be saved unless you confirm this
              action.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mx-0 justify-end bg-transparent px-0 pt-4 pb-2">
          <AlertDialogCancel className="border-border/30 dark:border-border/50 rounded-xl border bg-neutral-100 text-neutral-700 transition hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="rounded-xl bg-blue-600! px-6 py-2 font-semibold text-white! shadow transition hover:bg-blue-700! dark:bg-blue-500! dark:hover:bg-blue-600!">
            OK
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Dialog2;
