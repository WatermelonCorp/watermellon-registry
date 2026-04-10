import { ChevronLeftIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

const Dialog5 = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="outline"
          className="rounded-xl border border-zinc-200 bg-zinc-50 px-6 py-2 font-medium text-zinc-800 shadow-sm transition-all hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
        >
          Sticky Header Dialog
        </Button>
      </DialogTrigger>
      <DialogContent className="border-border/40 dark:border-border/60 flex max-h-[min(650px,90vh)] flex-col gap-0 overflow-hidden rounded-xl border bg-white p-0 shadow-xl sm:max-w-md dark:bg-neutral-900">
        <DialogHeader className="border-border/30 dark:border-border/60 border-b px-6 py-4 text-left">
          <DialogTitle className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Terms of Service Update
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="p-6">
            <DialogDescription className="text-neutral-600 dark:text-neutral-400">
              <div className="space-y-4 [&_strong]:font-semibold [&_strong]:text-neutral-900 dark:[&_strong]:text-neutral-100">
                <div className="space-y-1">
                  <p>
                    <strong>Effective Date:</strong> October 1, 2026
                  </p>
                  <p>
                    We have updated our Terms of Service to provide clarity on
                    our data retention policies and to introduce new guidelines
                    for API usage.
                  </p>
                </div>
                <div className="space-y-1">
                  <p>
                    <strong>1. Privacy Policy Adjustments</strong>
                  </p>
                  <p>
                    To comply with new global privacy regulations, we have
                    detailed our data collection methods, offering users more
                    granular control over what information is shared.
                  </p>
                </div>
                <div className="space-y-1">
                  <p>
                    <strong>2. API Rate Limits</strong>
                  </p>
                  <p>
                    We are introducing new rate limits for standard tier users
                    to ensure platform stability. The new limit is 1,000
                    requests per minute.
                  </p>
                </div>
                <div className="space-y-1">
                  <p>
                    <strong>3. Acceptable Use Policy</strong>
                  </p>
                  <p>
                    Our acceptable use guidelines have been expanded to
                    explicitly prohibit automated scraping of user profiles
                    without prior consent.
                  </p>
                </div>
                <div className="space-y-1">
                  <p>
                    <strong>4. Subscription Renewals</strong>
                  </p>
                  <p>
                    Auto-renewal terms have been simplified. You will now
                    receive a notification 7 days before any automatic charges
                    are applied to your account.
                  </p>
                </div>
                <div className="space-y-1">
                  <p>
                    <strong>5. Dispute Resolution</strong>
                  </p>
                  <p>
                    The governing law for arbitration has been updated to the
                    state of Delaware. All informal dispute resolution steps
                    must be exhausted before arbitration can commence.
                  </p>
                </div>
                <div className="space-y-1">
                  <p>
                    <strong>Agreement:</strong>
                  </p>
                  <p>
                    By continuing to access or use our services after the
                    effective date, you agree to be bound by the revised Terms.
                    If you do not agree, you must stop using the services.
                  </p>
                </div>
              </div>
            </DialogDescription>
          </div>

          <DialogFooter className="border-border/30 dark:border-border/60 z-10 m-0 flex flex-col-reverse items-stretch gap-2 border-t bg-neutral-50/50 p-4 sm:flex-row sm:items-center sm:justify-end sm:px-6 sm:pb-6 dark:bg-neutral-900/50">
            <DialogClose asChild>
              <Button
                variant="ghost"
                className="flex w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5 font-medium text-neutral-700 shadow-none transition hover:bg-neutral-100 sm:w-auto dark:text-neutral-200 dark:hover:bg-neutral-800"
              >
                <ChevronLeftIcon className="size-4" />
                Decline
              </Button>
            </DialogClose>
            <Button
              type="button"
              className="w-full rounded-lg bg-linear-to-r from-blue-600 to-blue-400 px-7 py-2.5 font-semibold text-white shadow-md transition hover:from-blue-700 hover:to-blue-500 sm:w-auto dark:from-blue-500 dark:to-blue-400 dark:text-white dark:hover:from-blue-600 dark:hover:to-blue-500"
            >
              I Agree
            </Button>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default Dialog5;
