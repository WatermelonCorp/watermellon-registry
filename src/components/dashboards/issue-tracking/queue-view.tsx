"use client"
import {
    X,
    Plus,
    Paperclip,
    Hourglass,
    Box,
    RefreshCw,
    Check,
    ChevronDown,
    Upload,
    Link2,
    FileText,
    Zap,
    ArrowDown,
    ArrowUp,
    CheckCircle2,
    Circle,
    Clock,
    Ban,
} from 'lucide-react'
import { useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { IconAlertCircleFilled, IconAlertHexagon, IconCalendarTime, IconCircleDashed, IconDeviceVisionProFilled, IconPennant, IconSettingsFilled, IconStarFilled, IconTriangleFilled } from '@tabler/icons-react'

const STATUSES = [
    { label: "Active", icon: <Circle className="size-3 fill-emerald-500 text-emerald-500" />, color: "text-emerald-500" },
    { label: "In Progress", icon: <Clock className="size-3 text-blue-400" />, color: "text-blue-400" },
    { label: "Blocked", icon: <Ban className="size-3 text-red-400" />, color: "text-red-400" },
    { label: "Done", icon: <CheckCircle2 className="size-3 text-neutral-400" />, color: "text-neutral-400" },
]

const LABELS = ["UX", "Backend", "Frontend", "Performance", "Security", "Infra", "Data"]

const TEAM = [
    { name: "Henry", img: "https://i.pravatar.cc/150?u=stephen" },
    { name: "M. Sanjid", img: "https://i.pravatar.cc/150?u=sanjid" },
    { name: "Alicia", img: "https://i.pravatar.cc/150?u=alicia" },
    { name: "Omar", img: "https://i.pravatar.cc/150?u=omar" },
    { name: "Priya", img: "https://i.pravatar.cc/150?u=priya" },
]

const EFFORT_POINTS = [1, 2, 3, 5, 8, 13, 21]

const PRIORITIES = [
    { label: "Low", icon: <ArrowDown className="size-3 text-neutral-400" /> },
    { label: "Mid", icon: <ArrowDown className="size-3 text-blue-400 -rotate-45" /> },
    { label: "High", icon: <ArrowUp className="size-3 text-orange-400" /> },
    { label: "Critical", icon: <Zap className="size-3 text-red-400" /> },
]

const WORK_ITEMS = [
    { title: "Service Flow Interruption", id: "#OPS-129", icon: "🔥", origin: "Customer Mobile App", priority: "High Impact", date: "Jan 24, 2026", color: "bg-orange-500" },
    { title: "API Rate Limiting", id: "#OPS-131", icon: "🌐", origin: "Customer Portal", priority: "Moderate", date: "Jan 26, 2026", color: "bg-emerald-500" },
    { title: "Database Downtime", id: "#OPS-130", icon: "⚙️", origin: "E-commerce Platform", priority: "Critical", date: "Jan 27, 2026", color: "bg-zinc-100" },
    { title: "User Authentication Failure", id: "#OPS-133", icon: "🔒", origin: "User Management System", priority: "Moderate", date: "Jan 27, 2026", color: "bg-blue-500" }
]

export default function QueueView() {
    const [status, setStatus] = useState("Active")
    const [activeLabels, setActiveLabels] = useState<string[]>(["UX"])
    const [owners, setOwners] = useState<string[]>(["Henry", "M. Sanjid", "Alicia"])
    const [effort, setEffort] = useState<number | null>(null)
    const [priority, setPriority] = useState("Mid")
    const [addItemOpen, setAddItemOpen] = useState(false)
    const [newItemTitle, setNewItemTitle] = useState("")
    const [newItemOrigin, setNewItemOrigin] = useState("")
    const [newItemPriority, setNewItemPriority] = useState("Moderate")


    return (
        <div className="flex flex-col min-h-full lg:h-full bg-white dark:bg-neutral-950 font-mono p-2.5 gap-2.5">
            {/* Top Tab Header */}
            <div className="flex items-center overflow-x-auto no-scrollbar gap-2">
                <div className="lg:hidden flex items-center justify-center p-1 border border-neutral-200 dark:border-zinc-800/60 rounded-md">
                    <SidebarTrigger />
                </div>
                <div className="flex items-center gap-0.5 flex-nowrap whitespace-nowrap">
                    <div className="flex items-center shrink-0 gap-2 px-2 py-1.5 bg-neutral-100 dark:bg-neutral-900 rounded-l-md transition-colors duration-150 cursor-pointer group hover:bg-neutral-200/60 dark:hover:bg-zinc-900/50 flex-nowrap whitespace-nowrap">
                        <span className="text-neutral-400 dark:text-neutral-700 text-xs font-medium whitespace-nowrap">MF-214 ·</span>
                        <span className="text-orange-500 dark:text-orange-300 font-medium whitespace-nowrap text-xs">Repair Context Graph Routing</span>
                        <X className="size-4 text-neutral-400 dark:text-neutral-500 shrink-0 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors" />
                    </div>
                    <div className="flex items-center shrink-0 gap-2 px-2 py-1.5 bg-neutral-100 dark:bg-neutral-900 transition-colors duration-150 cursor-pointer group hover:bg-neutral-200/60 dark:hover:bg-zinc-900/50 flex-nowrap whitespace-nowrap">
                        <span className="text-neutral-400 dark:text-neutral-700 text-xs font-medium whitespace-nowrap">MF-215 ·</span>
                        <span className="text-green-600 dark:text-green-300 font-medium whitespace-nowrap text-xs">Rebuild Left-Rail Grouping</span>
                        <X className="size-4 text-neutral-400 dark:text-neutral-500 shrink-0 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors" />
                    </div>
                    <div className="flex items-center shrink-0 gap-2 px-2 py-1.5 bg-neutral-100 dark:bg-neutral-900 rounded-r-md transition-colors duration-150 cursor-pointer group hover:bg-neutral-200/60 dark:hover:bg-zinc-900/50 flex-nowrap whitespace-nowrap">
                        <span className="text-neutral-400 dark:text-neutral-700 text-xs font-medium whitespace-nowrap">MF-216 ·</span>
                        <span className="text-lime-600 dark:text-lime-300 font-medium whitespace-nowrap text-xs">Improve Similarity Scoring</span>
                        <X className="size-4 text-neutral-400 dark:text-neutral-500 shrink-0 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors" />
                    </div>
                </div>
            </div>

            {/* Main Content Areas */}
            <div className="flex flex-col lg:flex-row lg:flex-1 lg:overflow-hidden gap-2">
                {/* Left Column: Details */}
                <div className="w-full lg:w-[60%] flex flex-col border rounded-md border-neutral-200 dark:border-zinc-800/60 lg:h-full overflow-hidden">
                    <ScrollArea className="flex-1 lg:h-full">
                        <div className="px-4 py-8 md:px-10 md:py-14 lg:px-20 lg:pt-20 max-w-3xl mx-auto w-full">
                            {/* Task Title Section */}
                            <div className="flex items-center gap-3 mb-5">
                                <span className="text-neutral-600 dark:text-neutral-300 px-2 py-0.5 rounded-sm tracking-tight text-xs ring-1 ring-neutral-200 dark:ring-neutral-500/20">MF-214</span>
                                <Badge variant="outline" className="border-none rounded-sm text-neutral-500 dark:text-neutral-700 text-xs px-2 py-0.5 flex items-center gap-1.5 ring-1 ring-neutral-200 dark:ring-neutral-500/20">
                                    <IconAlertCircleFilled className="size-3.5 text-orange-400" />
                                    Waiting on <span className="cursor-pointer text-cyan-600 dark:text-cyan-300 font-light">MF-209</span>
                                </Badge>
                            </div>

                            <h1 className="text-2xl font-medium text-zinc-800 dark:text-zinc-100 leading-[1.2] mb-8 tracking-tight max-w-2xl">
                                Fix broken context links + make navigation smarter
                            </h1>

                            <div className="relative mb-12 group flex gap-4 items-start">
                                <div className="bg-neutral-100 dark:bg-neutral-800 p-1 rounded-sm size-5 flex items-center justify-center">
                                    <IconStarFilled className="size-3 text-neutral-600 dark:text-neutral-200" />
                                </div>
                                <p className="text-neutral-400 dark:text-neutral-700 leading-normal text-xs max-w-xl font-normal">
                                    Our retrieval layer is returning &quot;related&quot; items that feel random,
                                    and the left rail isn&apos;t reflecting what users actually open or reference.
                                    We need a clearer linking logic, better grouping signals, and a ranking pass
                                    that favors real intent over noisy similarity.
                                </p>
                            </div>

                            {/* Action Pills */}
                            <div className="border-y border-neutral-200 dark:border-neutral-800/60 py-1.5 mb-14">
                                <div className="flex flex-wrap items-center gap-0.5 text-neutral-700 dark:text-neutral-300 lg:flex-nowrap lg:overflow-x-auto lg:no-scrollbar">

                                    {/* Status */}
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <div className="flex items-center gap-2 px-2 py-1.5 bg-neutral-100 dark:bg-neutral-900 rounded-l-md transition-colors duration-150 cursor-pointer group hover:bg-neutral-200/60 dark:hover:bg-neutral-900/50 text-xs shrink-0 select-none">
                                                <div className="size-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                                {status}
                                                <ChevronDown className="size-3 text-neutral-400 dark:text-neutral-600" />
                                            </div>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-44 p-1.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl rounded-lg font-mono" align="start">
                                            <p className="text-[10px] text-neutral-400 dark:text-neutral-600 px-2 py-1 uppercase tracking-widest">Status</p>
                                            {STATUSES.map(s => (
                                                <button key={s.label} onClick={() => setStatus(s.label)}
                                                    className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:bg-neutral-100 dark:focus:bg-neutral-800 outline-none transition-colors">
                                                    {s.icon}
                                                    <span>{s.label}</span>
                                                    {status === s.label && <Check className="size-3 ml-auto text-neutral-400" />}
                                                </button>
                                            ))}
                                        </PopoverContent>
                                    </Popover>

                                    {/* Label */}
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <div className="flex items-center gap-2 px-2 py-1.5 bg-neutral-100 dark:bg-neutral-900 transition-colors duration-150 cursor-pointer group hover:bg-neutral-200/60 dark:hover:bg-neutral-900/50 text-xs shrink-0 select-none">
                                                <IconDeviceVisionProFilled className="size-3.5 opacity-30 dark:opacity-20 group-hover:opacity-60 dark:group-hover:opacity-50 transition-opacity duration-300" />
                                                {activeLabels.length === 1 ? activeLabels[0] : `${activeLabels.length} labels`}
                                                <ChevronDown className="size-3 text-neutral-400 dark:text-neutral-600" />
                                            </div>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-44 p-1.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl rounded-lg font-mono" align="start">
                                            <p className="text-[10px] text-neutral-400 dark:text-neutral-600 px-2 py-1 uppercase tracking-widest">Labels</p>
                                            {LABELS.map(l => (
                                                <button key={l} onClick={() => setActiveLabels(prev => prev.includes(l) ? prev.filter(x => x !== l) : [...prev, l])}
                                                    className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:bg-neutral-100 dark:focus:bg-neutral-800 outline-none transition-colors">
                                                    <span>{l}</span>
                                                    {activeLabels.includes(l) && <Check className="size-3 ml-auto text-neutral-400" />}
                                                </button>
                                            ))}
                                        </PopoverContent>
                                    </Popover>

                                    {/* Owners */}
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <div className="flex items-center justify-center gap-2 px-2 py-1.5 bg-neutral-100 dark:bg-neutral-900 transition-colors duration-150 cursor-pointer group hover:bg-neutral-200/60 dark:hover:bg-neutral-900/50 text-xs shrink-0 select-none">
                                                <div className="flex -space-x-2">
                                                    {[1, 2, 3].map(i => (
                                                        <div key={i} className="size-4 rounded-full border border-neutral-200 dark:border-zinc-900 bg-neutral-200 dark:bg-zinc-800 ring-1 ring-neutral-200/50 dark:ring-zinc-800/50 overflow-hidden">
                                                            <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="" className="w-full h-full object-cover" />
                                                        </div>
                                                    ))}
                                                </div>
                                                <span className="opacity-80 whitespace-nowrap">{owners.length} owners</span>
                                                <ChevronDown className="size-3 text-neutral-400 dark:text-neutral-600" />
                                            </div>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-52 p-1.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl rounded-lg font-mono" align="start">
                                            <p className="text-[10px] text-neutral-400 dark:text-neutral-600 px-2 py-1 uppercase tracking-widest">Assignees</p>
                                            {TEAM.map(member => (
                                                <button key={member.name} onClick={() => setOwners(prev => prev.includes(member.name) ? prev.filter(x => x !== member.name) : [...prev, member.name])}
                                                    className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:bg-neutral-100 dark:focus:bg-neutral-800 outline-none transition-colors">
                                                    <div className="size-5 rounded-full overflow-hidden shrink-0">
                                                        <img src={member.img} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                    <span>{member.name}</span>
                                                    {owners.includes(member.name) && <Check className="size-3 ml-auto text-neutral-400" />}
                                                </button>
                                            ))}
                                        </PopoverContent>
                                    </Popover>

                                    {/* Effort */}
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <div className="flex items-center gap-2 px-2 py-1.5 bg-neutral-100 dark:bg-neutral-900 transition-colors duration-150 cursor-pointer group hover:bg-neutral-200/60 dark:hover:bg-neutral-900/50 text-xs shrink-0 whitespace-nowrap select-none">
                                                {effort ? `${effort} pts` : "Add effort"}
                                                <ChevronDown className="size-3 text-neutral-400 dark:text-neutral-600" />
                                            </div>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-48 p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl rounded-lg font-mono" align="start">
                                            <p className="text-[10px] text-neutral-400 dark:text-neutral-600 px-1 pb-2 uppercase tracking-widest">Story Points</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {EFFORT_POINTS.map(pt => (
                                                    <button key={pt} onClick={() => setEffort(effort === pt ? null : pt)}
                                                        className={`w-9 h-9 rounded-md text-xs font-semibold outline-none transition-colors duration-150 ${effort === pt ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-none' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 focus:bg-neutral-200 dark:focus:bg-neutral-700'}`}>
                                                        {pt}
                                                    </button>
                                                ))}
                                            </div>
                                        </PopoverContent>
                                    </Popover>

                                    {/* Priority */}
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <div className="flex items-center gap-2 px-2 py-1.5 bg-neutral-100 dark:bg-neutral-900 rounded-r-md transition-colors duration-150 cursor-pointer group hover:bg-neutral-200/60 dark:hover:bg-neutral-900/50 text-xs flex-1 shrink-0 whitespace-nowrap select-none">
                                                <IconCircleDashed className="size-3.5 opacity-30 dark:opacity-20 group-hover:opacity-60 dark:group-hover:opacity-50 transition-opacity duration-300" />
                                                Priority: {priority}
                                                <ChevronDown className="size-3 text-neutral-400 dark:text-neutral-600" />
                                            </div>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-44 p-1.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl rounded-lg font-mono" align="start">
                                            <p className="text-[10px] text-neutral-400 dark:text-neutral-600 px-2 py-1 uppercase tracking-widest">Priority</p>
                                            {PRIORITIES.map(p => (
                                                <button key={p.label} onClick={() => setPriority(p.label)}
                                                    className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:bg-neutral-100 dark:focus:bg-neutral-800 outline-none transition-colors">
                                                    {p.icon}
                                                    <span>{p.label}</span>
                                                    {priority === p.label && <Check className="size-3 ml-auto text-neutral-400" />}
                                                </button>
                                            ))}
                                        </PopoverContent>
                                    </Popover>

                                </div>
                            </div>

                            {/* Work Items */}
                            <Collapsible defaultOpen className="space-y-4 group/collapsible">
                                <div className="flex items-center justify-between border-neutral-200 dark:border-neutral-800">
                                    <CollapsibleTrigger asChild>
                                        <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 dark:text-neutral-400 cursor-pointer hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors group">
                                            Work items
                                            <IconTriangleFilled className="size-1.5 transition-transform text-neutral-400 dark:text-neutral-600 duration-200 group-data-[state=open]:rotate-180" />
                                        </div>
                                    </CollapsibleTrigger>
                                    <Button variant="ghost" onClick={() => setAddItemOpen(true)}
                                        className="h-auto px-2! flex items-center gap-1.5 text-xs font-medium text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-transparent transition-colors py-1 rounded-sm">
                                        Add work item
                                        <Plus className="size-3" strokeWidth={2.5} />
                                    </Button>
                                </div>

                                <CollapsibleContent className="space-y-4">
                                    <ScrollArea className="h-auto lg:h-[420px] pr-4 -mr-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 pt-2">
                                            {WORK_ITEMS.map((item, idx) => (
                                                <Card key={idx}
                                                    className="bg-transparent border-[1.5px] border-neutral-200 dark:border-neutral-800/60 hover:bg-neutral-50 dark:hover:bg-neutral-900/10 gap-0 hover:border-neutral-300 dark:hover:border-neutral-700/60 transition-colors duration-200 cursor-pointer group shadow-none hover:shadow-sm relative overflow-hidden rounded-lg p-1.5">
                                                    <CardHeader className="p-3 flex flex-row items-start gap-2 border-b-[1.5px] border-neutral-200 dark:border-neutral-800/60">
                                                        <div className="size-7 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-[16px] shrink-0 transition-colors duration-300 shadow-inner">
                                                            {item.icon}
                                                        </div>
                                                        <div className="space-y-0.5">
                                                            <CardTitle className="text-sm text-neutral-700 dark:text-neutral-100 font-normal group-hover:text-neutral-900 dark:group-hover:text-white transition-colors leading-tight tracking-tight">{item.title}</CardTitle>
                                                            <CardDescription className="text-xs text-neutral-400 dark:text-neutral-600 font-medium">{item.id}</CardDescription>
                                                        </div>
                                                    </CardHeader>
                                                    <CardContent className="p-4 space-y-5">
                                                        <div className="space-y-4">
                                                            <div className="flex items-center gap-4 text-xs">
                                                                <div className="flex items-center gap-2 shrink-0 w-24">
                                                                    <IconPennant className="size-4.5 text-neutral-300 dark:text-neutral-700" />
                                                                    <span className="text-neutral-400 dark:text-neutral-700">Origin</span>
                                                                </div>
                                                                <span className="text-neutral-700 dark:text-neutral-300 font-bold leading-relaxed truncate">{item.origin}</span>
                                                            </div>
                                                            <div className="flex items-center gap-4 text-xs">
                                                                <div className="flex items-center gap-2 shrink-0 w-24">
                                                                    <IconAlertHexagon className="size-4 text-neutral-300 dark:text-neutral-700" />
                                                                    <span className="text-neutral-400 dark:text-neutral-700">Priority</span>
                                                                </div>
                                                                <span className="text-neutral-700 dark:text-neutral-300 font-bold leading-relaxed truncate">{item.priority}</span>
                                                            </div>
                                                            <div className="flex items-center gap-4 text-xs">
                                                                <div className="flex items-center gap-2 shrink-0 w-24">
                                                                    <IconCalendarTime className="size-4 text-neutral-300 dark:text-neutral-700" />
                                                                    <span className="text-neutral-400 dark:text-neutral-700">Date</span>
                                                                </div>
                                                                <span className="text-neutral-700 dark:text-neutral-300 font-bold leading-relaxed truncate">{item.date}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <Badge variant="outline" className="bg-neutral-100 dark:bg-neutral-900/60 text-neutral-500 dark:text-neutral-500 border-none rounded-full py-1.5 px-2.5 text-xs ring-1 ring-neutral-300 dark:ring-neutral-800/60 flex items-center gap-1.5 hover:text-neutral-700 dark:hover:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors duration-150 cursor-pointer">
                                                                <Hourglass className="size-4 text-yellow-600/80" />
                                                                Time-Sensitive
                                                            </Badge>
                                                            <Badge variant="outline" className="bg-neutral-100 dark:bg-neutral-900/60 text-neutral-500 dark:text-neutral-500 border-none rounded-full py-1.5 px-2.5 text-xs ring-1 ring-neutral-300 dark:ring-neutral-800/60 flex items-center gap-1.5 hover:text-neutral-700 dark:hover:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors duration-150 cursor-pointer">
                                                                <Box className="size-3 text-indigo-600/80" />
                                                                Platform
                                                            </Badge>
                                                            <Badge variant="outline" className="bg-neutral-100 dark:bg-neutral-900/60 text-neutral-500 dark:text-neutral-500 border-none rounded-full py-1.5 px-2.5 text-xs ring-1 ring-neutral-300 dark:ring-neutral-800/60 flex items-center gap-1.5 hover:text-neutral-700 dark:hover:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors duration-150 cursor-pointer">
                                                                <RefreshCw className="size-3 text-orange-600/80" />
                                                                Live
                                                            </Badge>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </CollapsibleContent>
                            </Collapsible>
                        </div>
                    </ScrollArea>
                </div>

                {/* Right Column: Discussion */}
                <div className="w-full lg:flex-1 flex flex-col border rounded-md border-neutral-200 dark:border-zinc-800/60 min-h-[400px] lg:min-h-0 lg:overflow-hidden">
                    <div className="flex items-center p-6 shrink-0">
                        <div className="flex items-center gap-2">
                            <div className="py-1.5 px-3 rounded-md text-neutral-800 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-800 text-xs">
                                Discussion
                            </div>
                            <div className="py-1.5 px-3 rounded-md text-neutral-400 dark:text-neutral-600 border border-neutral-200 dark:border-neutral-800 text-xs">
                                MF-214
                            </div>
                        </div>
                    </div>

                    <ScrollArea className="flex-1 min-h-0">
                        <div className="flex flex-col flex-1 p-4 lg:p-6 lg:pt-0">
                            {/* Opener Metadata */}
                            <div className="flex flex-col items-center justify-end gap-4 h-auto py-6 lg:h-[300px] lg:pb-14">
                                <Avatar className="size-11 border-2 border-neutral-200 dark:border-neutral-800 shadow-xl ring-1 ring-neutral-200/20 dark:ring-neutral-700/20">
                                    <AvatarImage src="https://i.pravatar.cc/150?u=stephen" />
                                    <AvatarFallback>AK</AvatarFallback>
                                </Avatar>
                                <div className="text-center space-y-1">
                                    <p className="text-neutral-700 dark:text-neutral-200 tracking-tight text-sm">
                                        M. Sanjid <span className="text-neutral-400 dark:text-neutral-600 font-normal">opened this</span>
                                    </p>
                                    <p className="text-neutral-400 dark:text-neutral-600 text-xs">
                                        on Feb 1, 12:57 PM
                                    </p>
                                </div>
                            </div>

                            {/* Messages Feed */}
                            <div className="space-y-8">
                                <div className="flex items-end gap-3">
                                    <Avatar className="size-7 border border-neutral-200 dark:border-zinc-800/80 shadow-lg">
                                        <AvatarImage src="https://i.pravatar.cc/150?u=stephen" />
                                    </Avatar>
                                    <div className='flex flex-col gap-2 flex-1'>
                                        <div className="text-xs w-full max-w-[85%] lg:max-w-[70%] bg-neutral-100 dark:bg-neutral-900 px-3.5 py-2.5 text-neutral-700 dark:text-neutral-200 rounded-xl rounded-bl-sm">
                                            The nav feels noisy. People can&apos;t predict what shows up.
                                        </div>
                                        <div className="text-xs w-full max-w-[95%] lg:max-w-[90%] bg-neutral-100 dark:bg-neutral-900 px-3.5 py-2.5 text-neutral-700 dark:text-neutral-200 rounded-xl ">
                                            Some &quot;related&quot; items are missing while random ones appear. We need a stronger signal pipeline.
                                        </div>
                                        <div className="text-xs w-full max-w-[95%] lg:max-w-[90%] bg-neutral-100 dark:bg-neutral-900 px-3.5 py-2.5 text-neutral-700 dark:text-neutral-200 rounded-xl rounded-tl-sm">
                                            The graph is linking nodes that share tokens, not meaning. Maybe we add confidence + recency weighting?
                                        </div>
                                    </div>
                                </div>

                                {/* System Messages */}
                                <div className="flex items-end gap-3">
                                    <div className='h-6 w-6 rounded-md bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center'>
                                        <IconStarFilled className='size-3.5 text-orange-500 dark:text-orange-600' />
                                    </div>
                                    <div className='flex flex-col gap-2 flex-1'>
                                        <div className="text-xs w-fit bg-neutral-100 dark:bg-neutral-900 px-3.5 py-2 text-neutral-600 dark:text-neutral-200 rounded-xl rounded-bl-sm">
                                            thinking...
                                        </div>
                                        <div className="text-xs w-fit bg-neutral-100 dark:bg-neutral-900 px-3.5 py-2 text-neutral-600 dark:text-neutral-200 rounded-xl ">
                                            Generated 2 work items...
                                        </div>
                                        <div className="text-xs w-fit bg-neutral-100 dark:bg-neutral-900 px-3.5 py-2 text-neutral-700 dark:text-neutral-200 rounded-xl">
                                            <span className='inline-flex items-center gap-1 text-neutral-400 dark:text-neutral-600 mr-1'>
                                                <IconSettingsFilled className='size-3.5' />MF-215 ·
                                            </span> REBUILD LEFT-RAIL GROUPING
                                        </div>
                                        <div className="text-xs w-fit bg-neutral-100 dark:bg-neutral-900 px-3.5 py-2 text-neutral-700 dark:text-neutral-200 rounded-xl rounded-tl-sm">
                                            <span className='inline-flex items-center gap-1 text-neutral-400 dark:text-neutral-600 mr-1'>
                                                <IconSettingsFilled className='size-3.5' />MF-216 ·
                                            </span> IMPROVE SIMILARITY SCORING
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>

                    {/* Footer Input */}
                    <div className="p-6 shrink-0">
                        <div className="flex items-center gap-2 max-w-2xl mx-auto w-full group">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <div className="cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900 size-11 flex items-center justify-center rounded-lg transition-colors duration-150 hover:shadow-sm">
                                        <Paperclip className="size-5 text-neutral-400 dark:text-neutral-600 hover:text-neutral-600 dark:hover:text-neutral-400" />
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-44 p-1.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl rounded-lg font-mono" align="start" side="top">
                                    <p className="text-[10px] text-neutral-400 dark:text-neutral-600 px-2 py-1 uppercase tracking-widest">Attach</p>
                                    {[
                                        { icon: <Upload className="size-3.5" />, label: "Upload file" },
                                        { icon: <Link2 className="size-3.5" />, label: "Paste link" },
                                        { icon: <FileText className="size-3.5" />, label: "From docs" },
                                    ].map(opt => (
                                        <button key={opt.label}
                                            className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:bg-neutral-100 dark:focus:bg-neutral-800 outline-none transition-colors">
                                            {opt.icon}
                                            <span>{opt.label}</span>
                                        </button>
                                    ))}
                                </PopoverContent>
                            </Popover>

                            <div className="relative flex-1">
                                <Input
                                    type="text"
                                    placeholder="type message"
                                    className="w-full bg-neutral-100/80 dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800/80 rounded-lg py-5 pl-3 pr-5 text-sm text-neutral-700 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-700 transition-colors font-mono shadow-inner border-[1.5px] focus-visible:ring-0 focus-visible:border-neutral-400 focus-visible:ring-offset-0 dark:focus-visible:border-neutral-600 outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Work Item Dialog */}
            <Dialog open={addItemOpen} onOpenChange={setAddItemOpen}>
                <DialogContent className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 font-mono sm:max-w-md rounded-xl shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-neutral-800 dark:text-neutral-100 text-sm font-semibold">Add Work Item</DialogTitle>
                        <DialogDescription className="text-neutral-400 dark:text-neutral-600 text-xs">
                            Create a new work item linked to MF-214.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                        <div className="space-y-1.5">
                            <Label className="text-xs text-neutral-500 dark:text-neutral-400">Title</Label>
                            <Input value={newItemTitle} onChange={e => setNewItemTitle(e.target.value)}
                                placeholder="What needs to be done?"
                                className="bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs placeholder:text-neutral-400 dark:placeholder:text-neutral-600 font-mono transition-colors focus-visible:ring-0 focus-visible:border-neutral-400 focus-visible:ring-offset-0 dark:focus-visible:border-neutral-600 outline-none shadow-none" />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs text-neutral-500 dark:text-neutral-400">Origin</Label>
                            <Input value={newItemOrigin} onChange={e => setNewItemOrigin(e.target.value)}
                                placeholder="e.g. Customer Portal"
                                className="bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs placeholder:text-neutral-400 dark:placeholder:text-neutral-600 font-mono transition-colors focus-visible:ring-0 focus-visible:border-neutral-400 focus-visible:ring-offset-0 dark:focus-visible:border-neutral-600 outline-none shadow-none" />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs text-neutral-500 dark:text-neutral-400">Priority</Label>
                            <Select value={newItemPriority} onValueChange={setNewItemPriority}>
                                <SelectTrigger className="bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-mono focus:ring-0 focus-visible:ring-0 h-9 transition-colors focus-visible:border-neutral-400 focus-visible:ring-offset-0 dark:focus-visible:border-neutral-600 shadow-none">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 font-mono text-xs">
                                    {["Low", "Moderate", "High Impact", "Critical"].map(p => (
                                        <SelectItem key={p} value={p} className="text-xs">{p}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Separator className="bg-neutral-100 dark:bg-neutral-800" />
                    <DialogFooter className="gap-2">
                        <Button variant="ghost" onClick={() => setAddItemOpen(false)}
                            className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-200 font-mono h-8">
                            Cancel
                        </Button>
                        <Button onClick={() => setAddItemOpen(false)}
                            className="text-xs bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 font-mono h-8 px-4 transition-colors">
                            Create Item
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
