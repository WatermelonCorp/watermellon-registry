import { Button } from '@/components/ui//button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui//dialog'
import { Input } from '@/components/ui//input'
import { Label } from '@/components/ui//label'


import React from 'react'
import type { FormEvent } from 'react'

const Dialog9: React.FC = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // You can add your subscribe logic here
    // Example: show a toast or send API request
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="secondary" className="rounded-lg px-6 py-2 font-semibold shadow-md bg-blue-600 hover:bg-blue-700 text-white">
          Subscribe
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-white dark:bg-zinc-900 border-0 shadow-2xl rounded-2xl p-8">
        <DialogHeader className="text-center mb-2">
          <DialogTitle className="text-2xl font-bold text-zinc-900 dark:text-white">Join Our Community</DialogTitle>
          <DialogDescription className="text-sm text-zinc-600 dark:text-zinc-400">
            Become a part of our vibrant tech community! Enter your email to receive exclusive updates, event invites, and member-only resources. We respect your privacy and promise not to spam you.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col sm:flex-row gap-4 mt-4" onSubmit={handleSubmit}>
          <div className="flex-1 grid gap-2">
            <Label htmlFor="email" className="text-zinc-700 dark:text-zinc-200">Your Email Address</Label>
            <Input type="email" id="email" name="email" placeholder="you@example.com" required className="rounded-lg border-zinc-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400" />
          </div>
          <Button type="submit" className="self-end rounded-lg px-6 py-2 font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow">
            Join Now
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default Dialog9
