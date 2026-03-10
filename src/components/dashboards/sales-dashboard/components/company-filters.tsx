'use client';

import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from './ui/dialog';
import { Input } from './ui/input';
import { Download, Plus } from 'lucide-react';

export function CompanyFilters() {
  return (
    <div className="flex flex-wrap items-center gap-3 p-4">
      <Select defaultValue="pipeline-value">
        <SelectTrigger
          size="sm"
          className="w-fit cursor-pointer rounded-full! border-y border-neutral-200 bg-neutral-100 text-xs shadow-none transition-colors hover:bg-neutral-200/50 focus:ring-0 dark:border-neutral-600 dark:bg-neutral-800 dark:hover:bg-neutral-700/50"
        >
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            Sort by
          </span>
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className="border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
          <SelectItem value="pipeline-value">Pipeline Value</SelectItem>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="activity">Last Activity</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="all-owners">
        <SelectTrigger
          size="sm"
          className="w-fit cursor-pointer rounded-full border-y border-neutral-200 bg-neutral-100 text-xs shadow-none transition-colors hover:bg-neutral-200/50 focus:ring-0 dark:border-neutral-600 dark:bg-neutral-800 dark:hover:bg-neutral-700/50"
        >
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            Filter
          </span>
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent className="border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
          <SelectItem value="all-owners">All Owners</SelectItem>
          <SelectItem value="my-companies">My Companies</SelectItem>
          <SelectItem value="team">Team</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="any">
        <SelectTrigger
          size="sm"
          className="w-fit cursor-pointer rounded-full border-y border-neutral-200 bg-neutral-100 text-xs shadow-none transition-colors hover:bg-neutral-200/50 focus:ring-0 dark:border-neutral-600 dark:bg-neutral-800 dark:hover:bg-neutral-700/50"
        >
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            Stage
          </span>
          <SelectValue placeholder="Stage" />
        </SelectTrigger>
        <SelectContent className="border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
          <SelectItem value="any">Any</SelectItem>
          <SelectItem value="prospect">Prospect</SelectItem>
          <SelectItem value="qualified">Qualified</SelectItem>
          <SelectItem value="negotiation">Negotiation</SelectItem>
          <SelectItem value="closed">Closed</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="7-days">
        <SelectTrigger
          size="sm"
          className="w-fit cursor-pointer rounded-full border-y border-neutral-200 bg-neutral-100 text-xs shadow-none transition-colors hover:bg-neutral-200/50 focus:ring-0 dark:border-neutral-600 dark:bg-neutral-800 dark:hover:bg-neutral-700/50"
        >
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            Last Activity
          </span>
          <SelectValue placeholder="Last Activity" />
        </SelectTrigger>
        <SelectContent className="border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
          <SelectItem value="7-days">7 Days</SelectItem>
          <SelectItem value="30-days">30 Days</SelectItem>
          <SelectItem value="90-days">90 Days</SelectItem>
          <SelectItem value="all-time">All Time</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex-1" />

      <Dialog>
        <DialogTrigger
          render={
            <button className="flex cursor-pointer items-center gap-2 rounded-full border-y border-neutral-200 bg-neutral-100 px-3 py-2 text-xs text-neutral-600 shadow-none transition-colors hover:bg-neutral-200/50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700/50" />
          }
        >
          <Download className="size-3.5" />
          Export
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Companies Data</DialogTitle>
            <DialogDescription>
              Select the file format to export your company records.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <span className="text-sm font-medium">Format</span>
              <Select defaultValue="csv">
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV Document (.csv)</SelectItem>
                  <SelectItem value="xlsx">Excel File (.xlsx)</SelectItem>
                  <SelectItem value="pdf">PDF Document (.pdf)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose
              render={<Button variant="outline" className="rounded-full" />}
            >
              Cancel
            </DialogClose>
            <Button className="rounded-full bg-indigo-600 text-white hover:bg-indigo-700">
              Export
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger
          render={
            <Button
              size="sm"
              className="cursor-pointer rounded-full border-[1.5px] border-indigo-600 bg-gradient-to-r from-indigo-700 to-indigo-800 text-xs font-semibold text-white inset-shadow-sm"
            />
          }
        >
          <Plus className="size-3.5" />
          New Company
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Company</DialogTitle>
            <DialogDescription>
              Enter the details of the new company you want to track.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Input id="name" placeholder="Company Name" />
            </div>
            <div className="grid gap-2">
              <Input id="website" placeholder="Website (e.g. acme.com)" />
            </div>
            <div className="grid gap-2">
              <Select defaultValue="prospect">
                <SelectTrigger>
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prospect">Prospect</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="negotiation">Negotiation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose
              render={<Button variant="outline" className="rounded-full" />}
            >
              Cancel
            </DialogClose>
            <Button className="rounded-full bg-indigo-600 text-white hover:bg-indigo-700">
              Save Company
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
