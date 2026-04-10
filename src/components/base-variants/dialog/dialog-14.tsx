import { LogInIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import type React from 'react';

const Dialog14 = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add sign-in logic here
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="outline"
          className="rounded-xl border border-blue-200 bg-blue-50 px-6 py-2 font-medium text-blue-800 transition-all hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100 dark:hover:bg-blue-900"
        >
          Sign In
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-xl sm:max-w-sm dark:border-zinc-800 dark:bg-zinc-900">
        <DialogHeader className="items-center">
          <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-blue-600/10 sm:mx-0 dark:bg-blue-400/10">
            <LogInIcon className="size-6 text-blue-600 dark:text-blue-400" />
          </div>
          <DialogTitle className="text-lg font-semibold text-blue-900 dark:text-blue-100">
            Sign in to your account
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-600 dark:text-zinc-300">
            Access your workspace and collaborate instantly.
          </DialogDescription>
        </DialogHeader>
        <form className="mt-2 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              type="email"
              id="email"
              name="useremail"
              placeholder="you@email.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="userpassword"
              placeholder="Your password"
              required
            />
          </div>
          <DialogFooter className="flex-col gap-3 border-none bg-transparent pt-4 sm:flex-col">
            <Button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-2.5 font-semibold text-white transition-all hover:bg-blue-700 focus-visible:ring-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus-visible:ring-blue-500"
            >
              Sign In
            </Button>
            <div className="flex items-center gap-4 before:h-px before:flex-1 before:bg-zinc-200 after:h-px after:flex-1 after:bg-zinc-200 dark:before:bg-zinc-700 dark:after:bg-zinc-700">
              <span className="text-xs text-zinc-400 dark:text-zinc-500">
                Or sign in with
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="outline"
                className="flex-1 border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
              >
                <img
                  src="https://api.iconify.design/logos:google-icon.svg"
                  alt="Google Icon"
                  className="size-4"
                />
              </Button>
              <Button
                variant="outline"
                className="flex-1 border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
              >
                <img
                  src="https://api.iconify.design/simple-icons:x.svg"
                  alt="X Icon"
                  className="size-3 dark:invert"
                />
              </Button>
              <Button
                variant="outline"
                className="flex-1 border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
              >
                <img
                  src="https://api.iconify.design/logos:facebook.svg"
                  alt="Facebook Icon"
                  className="size-4"
                />
              </Button>
              <Button
                variant="outline"
                className="flex-1 border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
              >
                <img
                  src="https://api.iconify.design/logos:github-icon.svg"
                  alt="GitHub Icon"
                  className="size-4 dark:invert"
                />
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Dialog14;
