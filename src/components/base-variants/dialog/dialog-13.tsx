import { useId } from 'react'
import type React from 'react'

import { Button } from '@/components/ui//button'
import { Checkbox } from '@/components/ui//checkbox'
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


const Dialog13 = () => {
  const id = useId()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Add form submission logic here
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" className="rounded-xl px-6 py-2 font-medium bg-teal-50 dark:bg-cyan-950 text-teal-800 dark:text-cyan-100 border border-teal-200 dark:border-cyan-800 hover:bg-teal-100 dark:hover:bg-cyan-900 transition-all">
          Sign Up
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-xl">
        <DialogHeader className="items-center">
          <DialogTitle className="text-2xl font-bold text-teal-900 dark:text-cyan-100">Create your account</DialogTitle>
          <DialogDescription className="text-base text-zinc-600 dark:text-zinc-300 mt-1">
            Sign up free to get started—no card needed.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4 mt-2" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" name="firstname" placeholder="e.g. Alex" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" name="lastname" placeholder="e.g. Smith" required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email address</Label>
            <Input type="email" id="email" name="useremail" placeholder="alex@email.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Create password</Label>
            <Input type="password" id="password" name="userpassword" placeholder="At least 8 characters" required />
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Checkbox
              id={id}
              className="focus-visible:ring-teal-600/20 data-[state=checked]:border-teal-600 data-[state=checked]:bg-teal-600 dark:text-white dark:focus-visible:ring-cyan-400/40 dark:data-[state=checked]:border-cyan-400 dark:data-[state=checked]:bg-cyan-400"
              defaultChecked
              required
            />
            <Label htmlFor={id} className="gap-1 whitespace-nowrap text-[11px] text-zinc-600 dark:text-zinc-300 sm:text-xs">
              I agree to the
              <a href="#" className="underline hover:no-underline text-teal-700 dark:text-cyan-300 ml-1">
                Terms of Service
              </a>
              and
              <a href="#" className="underline hover:no-underline text-teal-700 dark:text-cyan-300 ml-1">
                Privacy Policy
              </a>
            </Label>
          </div>
          <DialogFooter className="border-t-0 pt-4 sm:flex-col gap-3 bg-transparent">
            <Button type="submit" className="bg-teal-600 text-white hover:bg-teal-700 focus-visible:ring-teal-700 dark:bg-cyan-400 dark:hover:bg-cyan-500 dark:focus-visible:ring-cyan-400 rounded-xl">
              Create account
            </Button>
            <div className="before:bg-zinc-200 after:bg-zinc-200 dark:before:bg-zinc-700 dark:after:bg-zinc-700 flex items-center gap-4 before:h-px before:flex-1 after:h-px after:flex-1">
              <span className="text-zinc-400 dark:text-zinc-500 text-xs">Or sign up with</span>
            </div>
            <Button variant="outline" className="rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-700 flex items-center gap-2">
              <img
                src="https://api.iconify.design/logos:google-icon.svg"
                alt="Google Icon"
                className="size-5"
              />
              <span className="flex justify-center">Continue with Google</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default Dialog13
