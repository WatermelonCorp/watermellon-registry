import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import React from 'react';
import type { FormEvent } from 'react';

const Dialog9: React.FC = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // You can add your subscribe logic here
    // Example: show a toast or send API request
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="secondary"
          className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white shadow-md hover:bg-blue-700"
        >
          Subscribe
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl border-0 bg-white p-6 shadow-2xl sm:max-w-lg dark:bg-zinc-900">
        <DialogHeader className="space-y-1.5 text-left">
          <DialogTitle className="text-2xl font-bold text-zinc-900 dark:text-white">
            Join Our Community
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-600 dark:text-zinc-400">
            Enter your email to receive exclusive updates and member-only
            resources. We respect your privacy.
          </DialogDescription>
        </DialogHeader>
        <form
          className="mt-2 flex flex-col items-start gap-3 sm:flex-row sm:items-end"
          onSubmit={handleSubmit}
        >
          <div className="flex w-full flex-1 flex-col gap-2 text-left">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-200"
            >
              Email Address
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              required
              className="w-full rounded-lg border-zinc-300 focus:ring-2 focus:ring-blue-500 dark:border-zinc-700"
            />
          </div>
          <Button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white shadow-md transition-colors hover:bg-blue-700 sm:w-auto"
          >
            Join Now
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Dialog9;
