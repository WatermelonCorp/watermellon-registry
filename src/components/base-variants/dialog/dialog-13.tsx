import { useId } from 'react';
import type React from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Dialog13 = () => {
  const id = useId();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="outline"
          className="rounded-xl border border-teal-200 bg-teal-50 px-6 py-2 font-medium text-teal-800 transition-all hover:bg-teal-100 dark:border-cyan-800 dark:bg-cyan-950 dark:text-cyan-100 dark:hover:bg-cyan-900"
        >
          Sign Up
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl sm:max-w-md dark:border-zinc-800 dark:bg-zinc-900">
        <DialogHeader className="space-y-1.5 text-left">
          <DialogTitle className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Create your account
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-600 dark:text-zinc-400">
            Sign up free to get started, no card needed.
          </DialogDescription>
        </DialogHeader>
        <form className="mt-2 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input
                id="first-name"
                name="firstname"
                placeholder="e.g. Alex"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input
                id="last-name"
                name="lastname"
                placeholder="e.g. Smith"
                required
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              type="email"
              id="email"
              name="useremail"
              placeholder="alex@email.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Create password</Label>
            <Input
              type="password"
              id="password"
              name="userpassword"
              placeholder="At least 8 characters"
              required
            />
          </div>
          <div className="mt-1 flex items-start gap-3">
            <Checkbox
              id={id}
              className="mt-0.5 focus-visible:ring-teal-600/20 data-[state=checked]:border-teal-600 data-[state=checked]:bg-teal-600 dark:focus-visible:ring-cyan-500/40 dark:data-[state=checked]:border-cyan-500 dark:data-[state=checked]:bg-cyan-500"
              defaultChecked
              required
            />
            <Label
              htmlFor={id}
              className="block text-sm leading-snug font-normal text-zinc-600 dark:text-zinc-300"
            >
              <span className="inline">
                I agree to the{' '}
                <a
                  href="#"
                  className="font-medium text-zinc-900 underline transition-colors hover:no-underline dark:text-zinc-100"
                >
                  Terms of Service
                </a>{' '}
                and{' '}
                <a
                  href="#"
                  className="font-medium text-zinc-900 underline transition-colors hover:no-underline dark:text-zinc-100"
                >
                  Privacy Policy
                </a>
              </span>
            </Label>
          </div>
          <DialogFooter className="m-0 mt-2 flex-col gap-3 border-none bg-transparent p-0 pt-4 sm:flex-col">
            <Button
              type="submit"
              className="w-full rounded-xl bg-teal-600 py-2.5 font-semibold text-white shadow-md transition-all hover:bg-teal-700 focus-visible:ring-teal-600 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus-visible:ring-cyan-500"
            >
              Create account
            </Button>
            <div className="flex items-center gap-4 before:h-px before:flex-1 before:bg-zinc-200 after:h-px after:flex-1 after:bg-zinc-200 dark:before:bg-zinc-700 dark:after:bg-zinc-700">
              <span className="text-xs font-medium tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
                Or sign up with
              </span>
            </div>
            <Button
              variant="outline"
              className="flex w-full items-center gap-2 rounded-xl border border-zinc-200 bg-white py-2.5 font-medium text-zinc-900 shadow-sm transition-all hover:bg-zinc-50 focus-visible:ring-teal-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:focus-visible:ring-cyan-500"
            >
              <img
                src="https://api.iconify.design/logos:google-icon.svg"
                alt="Google Icon"
                className="size-4"
              />
              Continue with Google
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Dialog13;
