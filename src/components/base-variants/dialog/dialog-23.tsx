import { Button } from '@/components/ui//button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui//dialog'
import { Input } from '@/components/ui//input'
import { Label } from '@/components/ui//label'

const Dialog23 = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" className="rounded-xl px-6 py-2 font-medium bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
          Bottom right align
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:top-auto sm:right-0 sm:bottom-0 sm:left-auto sm:m-6 sm:max-w-[425px] sm:translate-x-0 sm:translate-y-0 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Profile settings</DialogTitle>
          <DialogDescription className="text-zinc-600 dark:text-zinc-300">Update your personal information and username below.</DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 mt-2" onSubmit={e => { e.preventDefault(); /* handle save */ }}>
          <div className="grid gap-3">
            <Label htmlFor="profile-fullname">Full name</Label>
            <Input id="profile-fullname" name="profile-fullname" placeholder="e.g. Jamie Smith" defaultValue="Alex Lee" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="profile-username">Username</Label>
            <Input id="profile-username" name="profile-username" placeholder="e.g. jamie_smith" defaultValue="alexlee" />
          </div>
          <DialogFooter className='bg-transparent pb-0' >
            <DialogClose>
              <Button variant="outline" className="w-full rounded-lg">Discard</Button>
            </DialogClose>
            <Button type="submit" className="bg-zinc-800 text-white hover:bg-zinc-700 focus-visible:ring-zinc-800 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:focus-visible:ring-zinc-600 rounded-lg">Update profile</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default Dialog23
