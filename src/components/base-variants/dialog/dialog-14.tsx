
import { LogInIcon } from 'lucide-react'
import { Button } from '@/components/ui//button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui//dialog'
import { Input } from '@/components/ui//input'
import { Label } from '@/components/ui//label'
import type React from 'react'

const Dialog14 = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Add sign-in logic here
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" className="rounded-xl px-6 py-2 font-medium bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-100 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-all">
          Sign In
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-xl">
        <DialogHeader className="items-center">
          <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-blue-600/10 sm:mx-0 dark:bg-blue-400/10">
            <LogInIcon className="size-6 text-blue-600 dark:text-blue-400" />
          </div>
          <DialogTitle className="text-lg font-semibold text-blue-900 dark:text-blue-100">Sign in to your account</DialogTitle>
          <DialogDescription className="text-center text-zinc-600 dark:text-zinc-300">
            Access your workspace and collaborate instantly.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4 mt-2" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email address</Label>
            <Input type="email" id="email" name="useremail" placeholder="you@email.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" name="userpassword" placeholder="Your password" required />
          </div>
          <DialogFooter className="pt-4 sm:flex-col gap-3 bg-transparent border-t-0">
            <Button type="submit" className="bg-blue-700 text-white hover:bg-blue-800 focus-visible:ring-blue-700 dark:bg-blue-400 dark:hover:bg-blue-500 dark:focus-visible:ring-blue-400 rounded-xl">
              Sign In
            </Button>
            <div className="before:bg-zinc-200 after:bg-zinc-200 dark:before:bg-zinc-700 dark:after:bg-zinc-700 flex items-center gap-4 before:h-px before:flex-1 after:h-px after:flex-1">
              <span className="text-zinc-400 dark:text-zinc-500 text-xs">Or sign in with</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="outline" className="flex-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-700">
                <img
                  src="https://api.iconify.design/logos:google-icon.svg"
                  alt="Google Icon"
                  className="size-5"
                />
              </Button>
              <Button variant="outline" className="flex-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-700">
                <img
                  src="https://api.iconify.design/simple-icons:x.svg"
                  alt="X Icon"
                  className="size-5 dark:invert"
                />
              </Button>
              <Button variant="outline" className="flex-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-700">
                <img
                  src="https://api.iconify.design/logos:facebook.svg"
                  alt="Facebook Icon"
                  className="size-5"
                />
              </Button>
              <Button variant="outline" className="flex-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-700">
                <img
                  src="https://api.iconify.design/logos:github-icon.svg"
                  alt="GitHub Icon"
                  className="size-5 dark:invert"
                />
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default Dialog14
