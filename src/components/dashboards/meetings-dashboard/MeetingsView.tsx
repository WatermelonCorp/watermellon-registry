"use client"

import {
    IconPlus,
    IconSearch,
    IconFilter,
    IconLayoutGrid,
    IconColumns,
    IconCalendar,
    IconUpload,
    IconCalendarEvent,
} from "@tabler/icons-react"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Badge } from "./components/ui/badge"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./components/ui/select"
import {
    Tabs, TabsList, TabsTrigger
} from "./components/ui/tabs"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./components/ui/sheet"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./components/ui/dialog"
import { Command, Maximize2, Plus } from "lucide-react"

import { MEETING_COLUMNS, MEETINGS } from "./data"
import { MeetingCard } from "./components/MeetingCard"
import { SidebarFilters } from "./components/SidebarFilters"
import { useState } from "react"

export default function MeetingsView() {
    const [showFilters, setShowFilters] = useState(true)

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Header */}
            <header className="h-12 flex items-start justify-between border-b-[1.5px] border-neutral-200 dark:border-neutral-800 shrink-0">
                <div className="flex items-center gap-1.5">
                    <IconCalendarEvent className="size-5 text-neutral-500 dark:text-neutral-400" strokeWidth={1.5} />
                    <h1 className="text-sm font-semibold tracking-tight text-neutral-700 dark:text-neutral-200">Meetings</h1>
                </div>
                <div className="flex items-center gap-2">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="size-8 text-neutral-500 lg:hidden transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 outline-none focus-visible:ring-0">
                                <IconFilter className="size-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-2 w-[280px]">
                            <SheetHeader className="px-2 py-4 border-b">
                                <SheetTitle className="text-sm font-semibold">Filters</SheetTitle>
                            </SheetHeader>
                            <div className="mt-2 mx-auto overflow-y-auto no-scrollbar">
                                <SidebarFilters />
                            </div>
                        </SheetContent>
                    </Sheet>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size="icon" className="h-8 w-8 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm hover:shadow-indigo-500/20 outline-none focus-visible:ring-0">
                                <IconPlus className="w-5 h-5 text-white" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Schedule Meeting</DialogTitle>
                                <DialogDescription>Create a new meeting and invite participants.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <Input placeholder="Meeting Title" />
                                <Input placeholder="Date & Time" type="datetime-local" />
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Platform" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="meet">Google Meet</SelectItem>
                                        <SelectItem value="zoom">Zoom</SelectItem>
                                        <SelectItem value="slack">Slack</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <DialogFooter>
                                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600 border-none">Schedule</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex gap-2 flex-1 overflow-hidden pt-4 lg:pt-5">
                {/* Sidebar - Desktop Only */}
                {showFilters && (
                    <div className="hidden lg:flex">
                        <SidebarFilters />
                    </div>
                )}

                {/* Board Area */}
                <div className="flex-1 flex flex-col min-w-0">
                    {/* Toolbar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setShowFilters(!showFilters)}
                                className={`h-9 gap-1.5 text-neutral-600 dark:text-neutral-300 bg-white dark:bg-neutral-900 border-[1.3px] border-neutral-200 dark:border-neutral-800 px-2.5! tracking-tight transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800 shadow-none outline-none focus-visible:ring-0 ${!showFilters ? "bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700" : ""}`}
                            >
                                <IconFilter className={`w-4 h-4 ${!showFilters ? "text-neutral-900 dark:text-neutral-100" : "text-neutral-400 dark:text-neutral-500"}`} />
                                {showFilters ? "Hide Filters" : "Show Filters"}
                            </Button>
                            <Select defaultValue="all">
                                <SelectTrigger className="w-fit h-9 font-medium bg-white dark:bg-neutral-900 border-[1.3px] text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 px-2.5! tracking-tight transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800 shadow-none outline-none focus-visible:ring-0">
                                    <IconColumns className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                                    <SelectValue placeholder="All Meetings" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Meetings</SelectItem>
                                    <SelectItem value="mine">My Meetings</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center gap-2">
                            <Tabs defaultValue="kanban" className="w-auto">
                                <TabsList className="h-8 p-0 bg-neutral-100 dark:bg-neutral-800 border-none shadow-none focus-visible:outline-none">
                                    <TabsTrigger value="kanban" className="h-full! w-9 p-0 data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-700 data-[state=active]:text-neutral-600 dark:data-[state=active]:text-neutral-200 data-[state=active]:shadow-none text-neutral-400 dark:text-neutral-500 dark:data-[state=active]:border-none transition-colors hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 outline-none focus-visible:ring-0">
                                        <IconColumns className="size-4" strokeWidth={2} />
                                    </TabsTrigger>
                                    <TabsTrigger value="grid" className="h-full! w-9 p-0 data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-700 data-[state=active]:text-neutral-600 dark:data-[state=active]:text-neutral-200 data-[state=active]:shadow-none text-neutral-400 dark:text-neutral-500 dark:data-[state=active]:border-none transition-colors hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 outline-none focus-visible:ring-0">
                                        <IconLayoutGrid className="size-4" strokeWidth={2} />
                                    </TabsTrigger>
                                    <TabsTrigger value="calendar" className="h-full! w-9 p-0 data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-700 data-[state=active]:text-neutral-600 dark:data-[state=active]:text-neutral-200 data-[state=active]:shadow-none text-neutral-400 dark:text-neutral-500 dark:data-[state=active]:border-none transition-colors hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 outline-none focus-visible:ring-0">
                                        <IconCalendar className="size-4" strokeWidth={2} />
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>
                            <div className="relative">
                                <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                                <Input placeholder="Search" className="h-9 pl-9 w-[200px] bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 placeholder:font-medium border-[1.3px] dark:text-neutral-200 focus-visible:ring-0 focus-visible:border-neutral-400 dark:focus-visible:border-neutral-600 outline-none transition-colors shadow-none" />
                                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 h-5 min-w-[36px] items-center justify-center flex gap-1 text-[10px] text-neutral-400 dark:text-neutral-500 font-medium bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/50 dark:border-neutral-700/50 px-1 rounded select-none pointer-events-none">
                                    <Command className="size-3" strokeWidth={2} />
                                    <span className="text-[11px]">K</span>
                                </span>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="h-9 gap-1.5 border-[1.3px] transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 tracking-tight shadow-none outline-none focus-visible:ring-0">
                                        <IconUpload className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                                        Import
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Import Meetings</DialogTitle>
                                        <DialogDescription>Upload a file to import your meetings.</DialogDescription>
                                    </DialogHeader>
                                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-lg p-12 gap-2">
                                        <IconUpload className="size-8 text-neutral-400" />
                                        <p className="text-sm text-neutral-500">Click to upload or drag and drop</p>
                                    </div>
                                    <DialogFooter>
                                        <Button variant="outline">Cancel</Button>
                                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600 border-none">Upload</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="h-9 gap-1.5 border-[1.3px] transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 tracking-tight shadow-none outline-none focus-visible:ring-0">
                                        <IconPlus className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                                        Schedule
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Schedule Meeting</DialogTitle>
                                        <DialogDescription>Create a new meeting and invite participants.</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <Input placeholder="Meeting Title" />
                                        <Input placeholder="Date & Time" type="datetime-local" />
                                        <Input placeholder="Participants (emails)" />
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600 border-none">Create Meeting</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>

                    {/* Kanban Grid */}
                    <div className="flex-1 overflow-hidden">
                        <div className="flex gap-2 h-full w-full overflow-x-auto pb-4 custom-scrollbar lg:pb-0">
                            {MEETING_COLUMNS.map((column) => (
                                <div key={column.id} className="flex-none w-[280px] lg:flex-1 flex flex-col gap-2.5 min-h-0 border-[1.3px] border-neutral-200 dark:border-neutral-800 rounded-lg p-1 bg-white dark:bg-neutral-900/50">
                                    <div className="flex items-center justify-between p-1 shrink-0">
                                        <div className="flex items-center gap-1.5">
                                            <Badge variant="outline" className={`h-6 rounded-full px-2.5 text-[11px] font-semibold border-[1.3px] ${column.id === 'upcoming' ? 'bg-blue-50 text-blue-500 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20' :
                                                column.id === 'scheduled' ? 'bg-indigo-50 text-indigo-500 border-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20' :
                                                    column.id === 'confirmed' ? 'bg-green-50 text-green-500 border-green-100 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20' :
                                                        'bg-red-50 text-red-500 border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20'
                                                }`}>
                                                {column.title}
                                            </Badge>
                                            <div className="flex items-center justify-center size-6 bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 rounded-full text-[11px] font-bold border-[1.1px] border-neutral-200/50 dark:border-neutral-700/50">
                                                {column.count}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="size-6 text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 border-[1.1px] border-transparent dark:border-neutral-700/50 rounded-sm transition-colors outline-none focus-visible:ring-0">
                                                        <Maximize2 className="size-3.5" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-2xl h-[80vh]">
                                                    <DialogHeader>
                                                        <DialogTitle>{column.title} Column View</DialogTitle>
                                                    </DialogHeader>
                                                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                                                        {MEETINGS.filter(m => m.columnId === column.id).map(meeting => (
                                                            <MeetingCard key={meeting.id} meeting={meeting} />
                                                        ))}
                                                    </div>
                                                </DialogContent>
                                            </Dialog>

                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="size-6 text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 border-[1.1px] border-transparent dark:border-neutral-700/50 rounded-sm transition-colors outline-none focus-visible:ring-0">
                                                        <Plus className="size-3.5" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Add to {column.title}</DialogTitle>
                                                        <DialogDescription>Quickly add a meeting to this category.</DialogDescription>
                                                    </DialogHeader>
                                                    <div className="space-y-4 py-4">
                                                        <Input placeholder="Quick Title" />
                                                        <Select>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Host" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="tanjim">Tanjim Islam (You)</SelectItem>
                                                                <SelectItem value="sarah">Sarah Chen</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600 border-none">Add Meeting</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </div>

                                    <div className="flex-1 overflow-y-auto space-y-1 scrollbar-hide no-scrollbar p-1">
                                        {MEETINGS.filter(m => m.columnId === column.id).map(meeting => (
                                            <MeetingCard key={meeting.id} meeting={meeting} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

        </div>
    )
}
