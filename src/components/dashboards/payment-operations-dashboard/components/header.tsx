"use client";
import { Search, Plus } from "lucide-react";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ModeToggle } from "./theme-toggle";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export function DashboardHeader() {
  return (
    <header className="flex h-fit items-start justify-between gap-4 flex-col md:flex-row md:items-center">
      <div className="">
        <h1 className="text-2xl font-medium tracking-tight leading-tight cursor-default">
          Dashboard
        </h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          Showing data for the last
          <Select defaultValue="21">
            <SelectTrigger className="h-fit shadow-none rounded-none max-h-6 border-none bg-linear-to-b from-zinc-100 to-zinc-200 dark:bg-linear-to-b dark:from-zinc-700 dark:to-zinc-800 px-2 py-0 text-xs font-sm focus:ring-0 text-foreground hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors duration-200">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 Days</SelectItem>
              <SelectItem value="21">21 Days</SelectItem>
              <SelectItem value="30">30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-4 flex-row md:flex-row   ">
        <div className="relative w-full group/search">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-hover/search:text-foreground transition-colors duration-300" />
          <Input
            placeholder="Search Anything..."
            className="pl-9 h-9 bg-zinc-200/50 dark:black/20 border-none focus-visible:ring-1 hover:bg-zinc-200/80 dark:hover:bg-zinc-800/50 transition-colors duration-300"
          />
        </div>
        <div className="flex gap-4 items-center w-full     ">
          <div className="flex items-center gap-2 md:border-l dark:border-zinc-500 pl-4">
            <span className="text-sm text-muted-foreground">Test Mode</span>
            <Switch className="data-[state=checked]:bg-zinc-400 dark:data-[state=checked]:bg-zinc-100" />
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="icon"
                className="size-8 rounded-full bg-zinc-700 dark:bg-zinc-100 hover:bg-black transition-colors duration-300 shadow-md group/btn"
              >
                <Plus className="size-4 text-white dark:text-black" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-none shadow-2xl p-0 overflow-hidden border-zinc-200 dark:border-zinc-800">
              <div className="p-6 pb-0">
                <DialogHeader>
                  <DialogTitle className="text-xl">New Transaction</DialogTitle>
                  <DialogDescription>
                    Start a manual payment or invoice.
                  </DialogDescription>
                </DialogHeader>
              </div>
              <div className="p-6 grid gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="customer" className="text-sm font-medium text-foreground">Customer Name</label>
                  <Input id="customer" placeholder="Enter name or email" className="h-9 rounded-none bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-1" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="amount" className="text-sm font-medium text-foreground">Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">₹</span>
                    <Input id="amount" type="number" placeholder="0.00" className="pl-7 h-9 rounded-none bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-1" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="method" className="text-sm font-medium text-foreground">Payment Method</label>
                  <Select>
                    <SelectTrigger className="h-9 rounded-none bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus:ring-1">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent className="rounded-none">
                      <SelectItem value="card">Credit Card</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 p-4 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800">
                <Button variant="outline" className="rounded-none h-9 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800">Cancel</Button>
                <Button type="submit" className="rounded-none h-9 text-xs font-medium bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors">Create Transaction</Button>
              </div>
            </DialogContent>
          </Dialog>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
