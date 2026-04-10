import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import React from 'react';
import type { FormEvent } from 'react';

const avatars = [
  {
    src: 'https://randomuser.me/api/portraits/men/32.jpg',
    fallback: 'JD',
    name: 'John Doe',
  },
  {
    src: 'https://randomuser.me/api/portraits/women/44.jpg',
    fallback: 'AS',
    name: 'Alice Smith',
  },
  {
    src: 'https://randomuser.me/api/portraits/men/65.jpg',
    fallback: 'BM',
    name: 'Bob Martin',
  },
];

const Dialog10: React.FC = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your referral logic here
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="secondary"
          className="rounded-xl border-0 bg-blue-600 px-7 py-2.5 font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200"
        >
          Refer & Earn
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl border-0 bg-white p-6 shadow-2xl sm:max-w-xl dark:bg-zinc-900">
        <DialogHeader className="text-left">
          <DialogTitle className="text-2xl font-bold text-zinc-900 dark:text-white">
            Invite Friends & Unlock Rewards
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-600 dark:text-zinc-400">
            Invite your friends to join and you'll both receive exclusive
            rewards.
          </DialogDescription>
        </DialogHeader>
        <form className="mt-2 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-1 flex-col gap-2 text-left">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-200"
            >
              Friend's Email(s)
            </Label>
            <Input
              type="text"
              id="email"
              name="email"
              placeholder="Enter emails, separated by commas"
              required
              className="w-full rounded-lg border-zinc-300 focus:ring-2 focus:ring-blue-500 dark:border-zinc-700"
            />
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="terms" />
            <Label
              htmlFor="terms"
              className="text-sm text-zinc-700 dark:text-zinc-200"
            >
              I confirm my friends have consented to be invited.
            </Label>
          </div>
          <div className="flex -space-x-2">
            {avatars.map((avatar, index) => (
              <Avatar key={index} className="ring-background ring-2">
                <AvatarImage src={avatar.src} alt={avatar.name} />
                <AvatarFallback className="text-xs">
                  {avatar.fallback}
                </AvatarFallback>
              </Avatar>
            ))}
            <Avatar className="ring-background ring-2">
              <AvatarFallback className="text-xs">+10</AvatarFallback>
            </Avatar>
          </div>
          <DialogFooter className="items-stretch gap-2 border-none bg-transparent shadow-none sm:items-center sm:justify-end">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="w-full rounded-xl px-6 py-2 font-semibold sm:w-auto"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="rounded-xl border-0 bg-blue-600 px-7 py-2.5 font-bold text-white shadow transition-all duration-200 hover:scale-105 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200"
            >
              Send Invites
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Dialog10;
