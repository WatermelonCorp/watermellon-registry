
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui//avatar'
import { Button } from '@/components/ui//button'
import { Checkbox } from '@/components/ui//checkbox'
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
import React from 'react'
import type { FormEvent } from 'react'

const avatars = [
  {
    src: 'https://randomuser.me/api/portraits/men/32.jpg',
    fallback: 'JD',
    name: 'John Doe'
  },
  {
    src: 'https://randomuser.me/api/portraits/women/44.jpg',
    fallback: 'AS',
    name: 'Alice Smith'
  },
  {
    src: 'https://randomuser.me/api/portraits/men/65.jpg',
    fallback: 'BM',
    name: 'Bob Martin'
  }
]


const Dialog10: React.FC = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Add your referral logic here
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="secondary"
          className="rounded-xl px-7 py-2.5 font-bold shadow-lg bg-blue-600 hover:bg-blue-700 text-white border-0 transition-all duration-200 hover:scale-105 focus:ring-4 focus:ring-blue-200"
        >
          Refer & Earn
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl bg-white dark:bg-zinc-900 border-0 shadow-2xl rounded-3xl p-10">
        <DialogHeader className="text-center mb-4">
          <DialogTitle className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">Invite Friends & Unlock Rewards</DialogTitle>
          <DialogDescription className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Share the benefits of our platform! Invite your friends to join and both of you will receive exclusive rewards.<br />
            Enter their emails below and help grow our amazing community.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4 pt-4" onSubmit={handleSubmit}>
          <div className="flex-1 grid gap-3">
            <Label htmlFor="email" className="text-zinc-700 dark:text-zinc-200">Friend's Email(s)</Label>
            <Input type="text" id="email" name="email" placeholder="Enter emails, separated by commas" required className="rounded-lg border-zinc-300 placeholder:text-xs sm:placeholder:text-sm dark:border-zinc-700 focus:ring-2 focus:ring-blue-400" />
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="terms" />
            <Label htmlFor="terms">I confirm my friends have consented to be invited.</Label>
          </div>
          <div className="flex -space-x-2">
            {avatars.map((avatar, index) => (
              <Avatar key={index} className="ring-background ring-2">
                <AvatarImage src={avatar.src} alt={avatar.name} />
                <AvatarFallback className="text-xs">{avatar.fallback}</AvatarFallback>
              </Avatar>
            ))}
            <Avatar className="ring-background ring-2">
              <AvatarFallback className="text-xs">+10</AvatarFallback>
            </Avatar>
          </div>
          <DialogFooter className="items-stretch gap-2 border-none bg-transparent p-0 shadow-none sm:items-center sm:justify-end">
            <DialogClose asChild>
              <Button variant="outline" className="w-full rounded-xl px-6 py-2 font-semibold sm:w-auto">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              className="rounded-xl px-7 py-2.5 font-bold bg-blue-600 hover:bg-blue-700 text-white border-0 transition-all duration-200 hover:scale-105 focus:ring-4 focus:ring-blue-200 shadow"
            >
              Send Invites
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default Dialog10
