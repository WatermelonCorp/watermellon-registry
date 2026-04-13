import { UserPlusIcon } from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Friend = {
  src: string;
  fallback: string;
  name: string;
  mail: string;
};

const friends: Friend[] = [
  {
    src: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=128&h=128&facepad=2&q=80',
    fallback: 'AL',
    name: 'Alex Lee',
    mail: 'alex.lee@email.com',
  },
  {
    src: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=128&h=128&facepad=2&q=80',
    fallback: 'MS',
    name: 'Maria Silva',
    mail: 'maria.silva@email.com',
  },
  {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=128&h=128&facepad=2&q=80',
    fallback: 'JP',
    name: 'John Park',
    mail: 'john.park@email.com',
  },
  {
    src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=128&h=128&facepad=2&q=80',
    fallback: 'SK',
    name: 'Sara Kim',
    mail: 'sara.kim@email.com',
  },
  {
    src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=128&h=128&facepad=2&q=80',
    fallback: 'RM',
    name: 'Ravi Mehra',
    mail: 'ravi.mehra@email.com',
  },
  {
    src: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=128&h=128&facepad=2&q=80',
    fallback: 'EL',
    name: 'Emma Li',
    mail: 'emma.li@email.com',
  },
];

const Dialog15 = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="outline"
          className="rounded-xl border border-zinc-200 bg-zinc-50 px-6 py-2 font-medium text-zinc-800 transition-all hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
        >
          Invite
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-xl sm:max-w-lg dark:border-zinc-800 dark:bg-zinc-900">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl text-zinc-900 dark:text-zinc-100">
            Invite new members
          </DialogTitle>
        </DialogHeader>
        <form
          className="flex gap-4 max-sm:flex-col"
          onSubmit={(e) => {
            e.preventDefault(); /* handle invite */
          }}
        >
          <div className="grid gap-3">
            <Label htmlFor="invite-name">Name</Label>
            <Input
              id="invite-name"
              name="invite-name"
              placeholder="Full name"
              required
            />
            <Label htmlFor="invite-email" className="mt-2">
              Email
            </Label>
            <Input
              type="email"
              id="invite-email"
              name="invite-email"
              placeholder="name@email.com"
              required
            />
          </div>
          <Button
            type="submit"
            className="rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 focus-visible:ring-zinc-800 sm:self-end dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:focus-visible:ring-zinc-600"
          >
            Send Invite
          </Button>
        </form>
        <p className="mt-2 text-zinc-700 dark:text-zinc-300">Invite Friends</p>
        <ul className="space-y-4">
          {friends.map((item, index) => (
            <li key={index} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 max-[420px]:w-50">
                <Avatar className="size-10">
                  <AvatarImage src={item.src} alt={item.name} />
                  <AvatarFallback className="text-xs">
                    {item.fallback}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-col overflow-hidden">
                  <span className="text-zinc-900 dark:text-zinc-100">
                    {item.name}
                  </span>
                  <span className="truncate text-sm text-zinc-500 dark:text-zinc-400">
                    {item.mail}
                  </span>
                </div>
              </div>
              <Button
                size="sm"
                className="rounded-lg bg-zinc-200 text-zinc-900 hover:bg-zinc-300 focus-visible:ring-zinc-400 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:focus-visible:ring-zinc-600"
              >
                <UserPlusIcon className="mr-1 size-4" />
                Invite
              </Button>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default Dialog15;
