'use client';

import { Wallet } from 'lucide-react';

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export function Billing() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex items-center justify-between hover:bg-transparent active:bg-transparent"
        >
          <div className="flex items-center gap-3">
            <div className="flex flex-col text-sm leading-tight group-data-[collapsible=icon]:hidden">
              <span className="truncate font-medium">14 Days</span>
              <span className="truncate text-xs font-medium text-neutral-500">
                Left on trials
              </span>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="h-7 cursor-pointer rounded-full border-y border-neutral-200 bg-neutral-100 text-neutral-900 transition-colors group-data-[collapsible=icon]:px-2 hover:bg-neutral-200/50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700/50">
                  <Wallet />
                  <span className="text-xs group-data-[collapsible=icon]:hidden">
                    Add Billings
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Billing Details</DialogTitle>
                  <DialogDescription>
                    Update your payment method to continue your subscription.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Input id="card-number" placeholder="Card Number" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Input id="card-expiry" placeholder="MM/YY" />
                    </div>
                    <div className="grid gap-2">
                      <Input id="card-cvc" placeholder="CVC" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" className="rounded-full">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button className="rounded-full bg-indigo-600 text-white hover:bg-indigo-700">
                    Save Details
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
