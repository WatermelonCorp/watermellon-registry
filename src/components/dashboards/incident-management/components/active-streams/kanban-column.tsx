"use client"

import { IconPlus, IconDots } from "@tabler/icons-react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "../ui/dialog"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "../ui/dropdown-menu"
import type { StreamCardProps } from "./types"
import { StreamCard } from "./stream-card"

export const KanbanColumn = ({
    title,
    count,
    cards,
    icon: Icon
}: {
    title: string
    count: number
    cards: StreamCardProps[]
    icon: any
}) => (
    <div className="flex-1 min-w-[340px] border-x-[1.5px] p-1.5 flex flex-col gap-4 border-neutral-100 dark:border-neutral-900 min-h-0">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 bg-neutral-200/50 dark:bg-neutral-800/50 px-2 py-1.5 rounded-lg group cursor-pointer">
                <Icon className="size-4 text-neutral-600 dark:text-neutral-400" />
                <h3 className="font text-neutral-800 dark:text-neutral-200 text-sm tracking-tight">{title}</h3>
                <Badge variant="secondary" className="bg-white dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 group-hover:shadow dark:group-hover:bg-neutral-700/50 rounded size-4.5 border-none text-[12px] transition-all duration-300 group-hover:-translate-y-0.5 active:scale-95 cursor-pointer">
                    {count}
                </Badge>
            </div>
            <div className="flex items-center gap-1 text-neutral-400 dark:text-neutral-500">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="icon-sm" className=" hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 rounded-lg transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer">
                            <IconPlus className="size-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white dark:bg-neutral-950 border-neutral-100 dark:border-neutral-800 rounded-xl shadow-xl">
                        <DialogHeader>
                            <DialogTitle className="text-neutral-900 dark:text-neutral-100 font-semibold tracking-tight">Add to {title}</DialogTitle>
                            <DialogDescription className="text-neutral-500 dark:text-neutral-400">Create a new stream item in this stage.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <label htmlFor="title" className="text-sm font-medium leading-none text-neutral-900 dark:text-neutral-100 tracking-tight">Title</label>
                                <Input id="title" placeholder="e.g. Server Latency Spike" className="rounded-lg border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-sm focus-visible:ring-1 focus-visible:ring-orange-500/50 focus-visible:border-orange-500/50 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] transition-all" />
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="priority" className="text-sm font-medium leading-none text-neutral-900 dark:text-neutral-100 tracking-tight">Priority</label>
                                <Input id="priority" placeholder="e.g. High" className="rounded-lg border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-sm focus-visible:ring-1 focus-visible:ring-orange-500/50 focus-visible:border-orange-500/50 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] transition-all" />
                            </div>
                        </div>
                        <DialogFooter className="bg-transparent dark:bg-transparent border-t-0 p-0 sm:justify-end gap-2 mx-0 mb-0 mt-0">
                            <DialogClose asChild>
                                <Button variant="outline" className="rounded-lg bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 shadow-none font-medium transition-colors">Cancel</Button>
                            </DialogClose>
                            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-none border-none font-medium transition-colors">Save Item</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm" className="hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 rounded-lg transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer">
                            <IconDots className="size-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-xl dark:border-neutral-800">
                        <DropdownMenuLabel>Column Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">Edit Column</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">Sort Items</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400 focus:bg-red-50 dark:focus:bg-red-950/30">Clear All</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
        <div className="flex-1 overflow-y-auto flex flex-col gap-2 pb-2 scrollbar-hide">
            {cards.map((card) => (
                <StreamCard key={card.id} card={card} />
            ))}
        </div>
    </div>
)
