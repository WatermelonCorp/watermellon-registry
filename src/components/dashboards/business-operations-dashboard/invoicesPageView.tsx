"use client"

import {
    IconPlus,
    IconSearch,
    IconLayoutGrid,
    IconFilter,
    IconLayoutSidebar,
    IconCalendarEvent,
    IconFileInvoice,
    IconDots,
    IconClockFilled,
    IconCircleCheckFilled,
    IconFileStarFilled,
} from "@tabler/icons-react"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { Textarea } from "./components/ui/textarea"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "./components/ui/tabs"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./components/ui/dialog"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./components/ui/popover"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./components/ui/dropdown-menu"
import { SidebarTrigger, useSidebar } from "./components/ui/sidebar"
import { InvoiceCard } from "./components/invoice-card"
import { Separator } from './components/ui/separator'
import { invoices } from "./data"

export default function InvoicesPageView() {
    const { state, isMobile } = useSidebar()
    return (
        <div className="flex flex-col h-full bg-neutral-50/50 dark:bg-neutral-950/50 rounded-xl overflow-hidden min-h-0">
            {/* Header */}
            <header className="flex h-14 shrink-0 items-center justify-between px-5 border-b bg-background rounded-t-xl">
                <div className="flex items-center gap-2">
                    {(state === "collapsed" || isMobile) &&
                        <>
                            <SidebarTrigger className="-ml-1" />
                            <div className="w-[1px] h-4 bg-border mx-1" />
                        </>
                    }
                    <div className="flex items-center gap-2 h-4">
                        <div className="flex items-center gap-1.5">
                            <IconFileInvoice className="size-4 text-muted-foreground" />
                            <h1 className="text-[15px] font-semibold">Invoices</h1>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="size-6 text-muted-foreground/50 hover:text-muted-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-all active:scale-90">
                                        <IconDots className="size-3.5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="w-56">
                                    <DropdownMenuLabel>Page Settings</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Rename Page</DropdownMenuItem>
                                    <DropdownMenuItem>Duplicate Page</DropdownMenuItem>
                                    <DropdownMenuItem>Export as JSON</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem variant="destructive">Delete Page</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="group h-8 bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all duration-200 hover:shadow-md hover:shadow-indigo-500/20 text-white text-xs px-3 gap-2 rounded-md shrink-0 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2">
                            <IconPlus className="size-3.5 transition-transform group-hover:rotate-90" />
                            <span className="hidden sm:inline">Create Invoice</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create New Invoice</DialogTitle>
                            <DialogDescription>
                                Fill in the details to create a new invoice for your client.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="client">Client Name</Label>
                                <Input id="client" placeholder="e.g. Acme Corp" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="amount">Amount</Label>
                                    <Input id="amount" type="number" placeholder="0.00" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="due-date">Due Date</Label>
                                    <Input id="due-date" type="date" />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea id="notes" placeholder="Optional notes for the client..." />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">Save Invoice</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </header>

            {/* Toolbar */}
            <Tabs defaultValue="board" className="flex-1 flex flex-col min-h-0 gap-0">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between px-5 py-3 gap-4 border-b bg-background">
                    <div className="flex items-center gap-3 w-full overflow-x-auto scrollbar-hide">
                        <TabsList className="bg-transparent p-1 gap-2">
                            <TabsTrigger value="board" className="gap-2 h-9 transition-all duration-200 active:scale-95 data-[state=active]:bg-neutral-100 dark:data-[state=active]:bg-neutral-800 data-[state=active]:shadow-none! data-[state=active]:border-neutral-300/80 dark:data-[state=active]:border-neutral-700/50">
                                <IconLayoutGrid className="size-4" />
                                Board
                            </TabsTrigger>
                            <TabsTrigger disabled value="overview" className="gap-2 h-9 transition-all duration-200 active:scale-95 data-[state=active]:bg-neutral-100 dark:data-[state=active]:bg-neutral-800 data-[state=active]:shadow-none! data-[state=active]:border-neutral-300/80 dark:data-[state=active]:border-neutral-700/50">
                                <IconCalendarEvent className="size-4" />
                                Overview
                            </TabsTrigger>
                            <TabsTrigger disabled value="list" className="gap-2 h-9 transition-all duration-200 active:scale-95 data-[state=active]:bg-neutral-100 dark:data-[state=active]:bg-neutral-800 data-[state=active]:shadow-none! data-[state=active]:border-neutral-300/80 dark:data-[state=active]:border-neutral-700/50">
                                <IconLayoutSidebar className="size-4" />
                                List
                            </TabsTrigger>
                        </TabsList>

                        <Separator
                            orientation="vertical"
                            className=" data-[orientation=vertical]:h-6"
                        />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button size="sm" className="text-muted-foreground gap-1.5 bg-background border hover:bg-neutral-50 dark:hover:bg-neutral-900 active:scale-95 transition-all duration-200 h-9 shrink-0">
                                    <IconPlus className="size-4" />
                                    <span className="hidden sm:inline">Add View</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-48">
                                <DropdownMenuLabel>Views</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Grid View</DropdownMenuItem>
                                <DropdownMenuItem>List View</DropdownMenuItem>
                                <DropdownMenuItem>Kanban View</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="flex items-center gap-2 w-full lg:w-auto">
                        <div className="relative flex-1 lg:w-64">
                            <IconSearch className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                            <Input placeholder="Search invoice..." className="pl-9 bg-muted/50 shadow-none focus-visible:ring-1 border w-full" />
                        </div>
                        <Separator
                            orientation="vertical"
                            className=" data-[orientation=vertical]:h-6"
                        />
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" size="sm" className="gap-2 h-9 active:scale-95 transition-all duration-200 hover:bg-neutral-50 dark:hover:bg-neutral-900 shadow-xs">
                                    <IconLayoutGrid className="size-4" />
                                    View
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-56 p-2">
                                <div className="grid gap-1">
                                    <Button variant="ghost" size="sm" className="justify-start font-normal h-8">Board View</Button>
                                    <Button variant="ghost" size="sm" className="justify-start font-normal h-8">Table View</Button>
                                    <Button variant="ghost" size="sm" className="justify-start font-normal h-8">List View</Button>
                                </div>
                            </PopoverContent>
                        </Popover>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" size="sm" className="gap-2 h-9 active:scale-95 transition-all duration-200 hover:bg-neutral-50 dark:hover:bg-neutral-900 shadow-xs">
                                    <IconFilter className="size-4" />
                                    Filter
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-64 p-3">
                                <div className="space-y-3">
                                    <h4 className="font-medium text-sm leading-none">Filter Invoices</h4>
                                    <div className="grid gap-2">
                                        <Label htmlFor="status-filter" className="text-xs">Status</Label>
                                        <Input id="status-filter" placeholder="Filter by status..." className="h-8 text-xs" />
                                    </div>
                                    <div className="flex justify-end gap-2 pt-2">
                                        <Button variant="outline" size="sm" className="h-7 text-xs">Reset</Button>
                                        <Button size="sm" className="h-7 text-xs bg-indigo-600 hover:bg-indigo-700 text-white">Apply</Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <TabsContent value="board" className="flex-1 flex flex-col min-h-0 m-0 data-[state=inactive]:hidden overflow-hidden">
                    <div className="flex-1 overflow-hidden p-4 md:p-6 md:pb-0  flex flex-col">
                        <div className="flex w-full gap-4 md:gap-6 flex-1 items-stretch min-h-0 overflow-x-auto md:overflow-visible scrollbar-hide snap-x snap-mandatory pb-4">
                            {/* Unpaid Column */}
                            <div className="flex flex-col gap-4 flex-1 min-w-[300px] md:min-w-0 min-h-0 snap-center">
                                <div className="flex items-center justify-between bg-orange-500/10 dark:bg-orange-500/20 px-3 py-2 rounded-lg shrink-0">
                                    <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                                        <IconClockFilled
                                            className="size-5 " />
                                        <span className="font-semibold font-mono text-sm tracking-tight ">Unpaid</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-medium text-neutral-500 font-mono">12</span>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="size-6 text-neutral-500 hover:bg-orange-200/50 dark:hover:bg-orange-500/20 active:scale-90 transition-all">
                                                    <IconDots className="size-3.5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48">
                                                <DropdownMenuLabel>Column Actions</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>Select All</DropdownMenuItem>
                                                <DropdownMenuItem>Archive All</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem variant="destructive">Delete Column</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                                <div className="flex-1 overflow-y-auto scrollbar-hide">
                                    <div className="flex flex-col gap-4">
                                        {invoices.filter(i => i.status === "unpaid").map(invoice => (
                                            <InvoiceCard key={invoice.id} invoice={invoice} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <Separator orientation="vertical" className='hidden md:block data-[orientation=vertical]:h-full data-[orientation=vertical]:bg-border' />

                            {/* Paid Column */}
                            <div className="flex flex-col gap-4 flex-1 min-w-[300px] md:min-w-0 min-h-0 snap-center">
                                <div className="flex items-center justify-between bg-emerald-500/10 dark:bg-emerald-500/20 px-3 py-2 rounded-lg shrink-0">
                                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                                        <IconCircleCheckFilled className="size-5" />
                                        <span className="font-semibold font-mono text-sm tracking-tight">Paid</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-medium text-neutral-500 font-mono">12</span>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="size-6 text-neutral-500 hover:bg-emerald-200/50 dark:hover:bg-emerald-500/20 active:scale-90 transition-all">
                                                    <IconDots className="size-3.5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48">
                                                <DropdownMenuLabel>Column Actions</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>Select All</DropdownMenuItem>
                                                <DropdownMenuItem>Archive All</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem variant="destructive">Delete Column</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                                <div className="flex-1 overflow-y-auto scrollbar-hide">
                                    <div className="flex flex-col gap-4">
                                        {invoices.filter(i => i.status === "paid").map(invoice => (
                                            <InvoiceCard key={invoice.id} invoice={invoice} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <Separator orientation="vertical" className='hidden md:block data-[orientation=vertical]:h-auto  data-[orientation=vertical]:bg-border' />

                            {/* Draft Column */}
                            <div className="flex flex-col gap-4 flex-1 min-w-[300px] md:min-w-0 min-h-0 snap-center">
                                <div className="flex items-center justify-between bg-neutral-500/10 dark:bg-neutral-800 px-3 py-2 rounded-lg shrink-0">
                                    <div className="flex items-center gap-2">
                                        <IconFileStarFilled className="size-5 text-neutral-600 dark:text-neutral-400" />
                                        <span className="font-semibold text-neutral-950 dark:text-neutral-50 font-mono text-sm tracking-tight">Draft</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-medium text-neutral-500 font-mono">12</span>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="size-6 text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-700 active:scale-90 transition-all">
                                                    <IconDots className="size-3.5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48">
                                                <DropdownMenuLabel>Column Actions</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>Select All</DropdownMenuItem>
                                                <DropdownMenuItem>Archive All</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem variant="destructive">Delete Column</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                                <div className="flex-1 overflow-y-auto scrollbar-hide">
                                    <div className="flex flex-col gap-4">
                                        {invoices.filter(i => i.status === "draft").map(invoice => (
                                            <InvoiceCard key={invoice.id} invoice={invoice} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
