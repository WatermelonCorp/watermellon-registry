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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Dialog16 = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="outline"
          className="rounded-xl border border-zinc-200 bg-zinc-50 px-6 py-2 font-medium text-zinc-800 transition-all hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
        >
          Top left align
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl sm:top-0 sm:left-0 sm:m-6 sm:max-w-[425px] sm:translate-x-0 sm:translate-y-0 dark:border-zinc-800 dark:bg-zinc-900">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Profile settings
          </DialogTitle>
          <DialogDescription className="text-zinc-600 dark:text-zinc-300">
            Update your personal information and username below.
          </DialogDescription>
        </DialogHeader>
        <form
          className="mt-2 grid gap-4"
          onSubmit={(e) => {
            e.preventDefault(); /* handle save */
          }}
        >
          <div className="grid gap-3">
            <Label htmlFor="profile-fullname">Full name</Label>
            <Input
              id="profile-fullname"
              name="profile-fullname"
              placeholder="e.g. Jamie Smith"
              defaultValue="Alex Lee"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="profile-username">Username</Label>
            <Input
              id="profile-username"
              name="profile-username"
              placeholder="e.g. jamie_smith"
              defaultValue="alexlee"
            />
          </div>
          <DialogFooter className="m-0 border-t border-zinc-200 bg-transparent p-0 pt-4 dark:border-zinc-800">
            <DialogClose>
              <Button variant="outline" className="w-full rounded-lg">
                Discard
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 focus-visible:ring-zinc-800 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:focus-visible:ring-zinc-600"
            >
              Update profile
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Dialog16;
