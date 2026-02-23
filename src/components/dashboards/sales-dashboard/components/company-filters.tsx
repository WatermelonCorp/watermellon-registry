"use client";

import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "./ui/dialog";
import { Input } from "./ui/input";
import { Download, Plus } from "lucide-react";

export function CompanyFilters() {
  return (
    <div className="flex flex-wrap items-center gap-3 p-4">
      <Select defaultValue="pipeline-value">
        <SelectTrigger size="sm" className="w-fit text-xs rounded-full! border-y border-neutral-200 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 focus:ring-0 shadow-none  transition-all duration-300 cursor-pointer">
          <span className="text-neutral-500 dark:text-neutral-400 text-xs">Sort by</span>
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700">
          <SelectItem value="pipeline-value">Pipeline Value</SelectItem>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="activity">Last Activity</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="all-owners">
        <SelectTrigger size="sm" className="w-fit text-xs rounded-full border-y border-neutral-200 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 focus:ring-0 shadow-none  transition-all duration-300 cursor-pointer">
          <span className="text-neutral-500 dark:text-neutral-400 text-xs">Filter</span>
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700">
          <SelectItem value="all-owners">All Owners</SelectItem>
          <SelectItem value="my-companies">My Companies</SelectItem>
          <SelectItem value="team">Team</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="any">
        <SelectTrigger size="sm" className="w-fit text-xs rounded-full border-y border-neutral-200 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 focus:ring-0 shadow-none  transition-all duration-300 cursor-pointer">
          <span className="text-neutral-500 dark:text-neutral-400 text-xs">Stage</span>
          <SelectValue placeholder="Stage" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700">
          <SelectItem value="any">Any</SelectItem>
          <SelectItem value="prospect">Prospect</SelectItem>
          <SelectItem value="qualified">Qualified</SelectItem>
          <SelectItem value="negotiation">Negotiation</SelectItem>
          <SelectItem value="closed">Closed</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="7-days">
        <SelectTrigger size="sm" className="w-fit text-xs rounded-full border-y border-neutral-200 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 focus:ring-0 shadow-none  transition-all duration-300 cursor-pointer">
          <span className="text-neutral-500 dark:text-neutral-400 text-xs">Last Activity</span>
          <SelectValue placeholder="Last Activity" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700">
          <SelectItem value="7-days">7 Days</SelectItem>
          <SelectItem value="30-days">30 Days</SelectItem>
          <SelectItem value="90-days">90 Days</SelectItem>
          <SelectItem value="all-time">All Time</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex-1" />

      <Dialog>
        <DialogTrigger render={
          <button
            className="rounded-full border-y border-neutral-200 dark:border-neutral-600 text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 text-xs flex items-center gap-2 px-3 py-2 transition-all duration-300 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-none"
          />
        }>
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
            <DialogClose render={<Button variant="outline" className="rounded-full" />}>Cancel</DialogClose>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full">Export</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger render={
          <Button
            size="sm"
            className="bg-gradient-to-r from-indigo-700 to-indigo-800 text-white rounded-full text-xs font-semibold inset-shadow-sm inset-shadow-blue-500/50-sm border-[1.5px] border-indigo-600 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer hover:shadow-md hover:brightness-110 group"
          />
        }>
          <Plus className="size-3.5 group-hover:rotate-90 transition-transform duration-300" />
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
            <DialogClose render={<Button variant="outline" className="rounded-full" />}>Cancel</DialogClose>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full">Save Company</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
