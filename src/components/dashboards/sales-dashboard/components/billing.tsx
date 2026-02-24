"use client";

import {
  Wallet,
} from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "./ui/dialog";
import { Input } from "./ui/input";

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
              <span className="truncate text-xs text-neutral-500 font-medium">Left on trials</span>
            </div>
            <Dialog>
              <DialogTrigger render={
                <Button className="h-7 rounded-full border-y border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer group-data-[collapsible=icon]:px-2" />
              }>
                <Wallet />
                <span className="text-xs group-data-[collapsible=icon]:hidden">Add Billings</span>
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
                  <DialogClose render={<Button variant="outline" className="rounded-full" />}>Cancel</DialogClose>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full">Save Details</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
