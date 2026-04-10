import { TriangleAlertIcon } from 'lucide-react';

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
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const Dialog3 = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          variant="outline"
          className="rounded-xl border border-zinc-200 bg-zinc-50 px-6 py-2 font-medium text-zinc-800 shadow-sm transition-all hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
        >
          Alert Dialog Destructive
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-border/40 dark:border-border/60 rounded-xl border bg-white p-7 shadow-xl dark:bg-neutral-900">
        <AlertDialogHeader className="place-items-start text-left">
          <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <TriangleAlertIcon className="size-6 text-red-600 dark:text-red-400" />
          </div>
          <AlertDialogTitle className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Delete this workspace?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-neutral-600 dark:text-neutral-300">
            This action is permanent and cannot be undone. All associated data
            will be removed forever.
            <span className="mt-5 flex items-center justify-start gap-3">
              <Checkbox
                id="terms"
                className="border-neutral-400 bg-white data-[state=checked]:border-red-600 data-[state=checked]:bg-red-600 data-[state=checked]:text-white dark:border-neutral-500 dark:bg-neutral-800 dark:data-[state=checked]:border-red-500 dark:data-[state=checked]:bg-red-500"
              />
              <Label
                htmlFor="terms"
                className="text-sm text-neutral-700 dark:text-neutral-200"
              >
                I understand that this action is irreversible
              </Label>
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mx-0 justify-end bg-transparent px-0 pt-4 pb-2">
          <AlertDialogCancel className="border-border/30 dark:border-border/50 rounded-xl border bg-neutral-100 text-neutral-700 transition hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="rounded-xl bg-red-600 px-6 py-2 font-semibold text-white shadow transition hover:bg-red-700 dark:bg-red-500 dark:text-white dark:hover:bg-red-600">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Dialog3;
