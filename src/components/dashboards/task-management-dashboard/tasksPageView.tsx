"use client"

import * as React from "react"
import {
    IconPlus,
    IconSearch,
    IconLayoutGrid,
    IconLayoutSidebar,
    IconCalendarEvent,
    IconDots,
    IconClipboardCheck,
    IconLock,
    IconBell,
    IconQuestionMark,
    IconUpload,
    IconList,
    IconTable,
    IconFolder,
    IconTimeline,
    IconAdjustmentsHorizontal,
    IconSortAscending,
    IconCirclePlus,
    IconUserCircle,
    IconCircleCheck,
    IconWorld,
    IconUsers,
    IconCheck,
    IconHash,
    IconFlag,
    IconGitBranch,
    IconBrandVscode,
    IconCircle,
    IconCircleCheckFilled,
    IconCircleDashed,
    IconSun,
    IconEye,
    IconArrowsSort,
    IconFlagFilled,
    IconAlertTriangleFilled,
} from "@tabler/icons-react"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "./components/ui/tabs"
import { SidebarTrigger, useSidebar } from "./components/ui/sidebar"
import { Badge } from "./components/ui/badge"
import { Card, CardContent, CardHeader } from "./components/ui/card"
import { cn } from "@/lib/utils"
import { Separator } from "./components/ui/separator"
import { amsGroups, visualizeGroups, type Task, type Group } from "./data"

function ProjectCard({ title, logo, count, groups, isPrivate }: { title: string, logo: React.ReactNode, count: number, groups: Group[], isPrivate?: boolean }) {
    return (
        <Card className="flex flex-col gap-0 dark:border-neutral-800/60 bg-white dark:bg-neutral-900 shadow-none overflow-hidden rounded-lg  p-0">
            <CardHeader className="flex flex-row items-center justify-between px-4 py-3! border-b dark:border-neutral-800/50">
                <div className="flex items-center gap-2.5">
                    {logo}
                    <h3 className="font-semibold text-[15px] tracking-tight text-neutral-900 dark:text-neutral-100">{title}</h3>
                    <div className="flex items-center gap-1.5 ml-1">
                        <IconWorld className="size-3.5 text-neutral-500" />
                        {isPrivate && <IconLock className="size-3.5 text-neutral-500" />}
                        <Badge variant="secondary" className="bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 px-1 text-[10px] h-4 leading-none font-medium ml-1 rounded">
                            {count}
                        </Badge>
                    </div>
                </div>
                <div className="flex items-center gap-3 text-neutral-500">
                    <IconArrowsSort className="size-4 " />
                    <IconUserCircle className="size-4.5 " />
                    <IconDots className="size-4 " />
                </div>
            </CardHeader>
            <CardContent className="p-0 gap-0">
                {/* Filter Bar */}
                <div className="flex items-center gap-2 px-4 py-2 border-b border-neutral-200 dark:border-neutral-800/50 overflow-x-auto scrollbar-hide">
                    <div className="size-6 rounded-full bg-neutral-500/10 dark:bg-neutral-800 flex items-center justify-center text-neutral-500 shrink-0">
                        <IconCheck className="size-3.5" />
                    </div>
                    <Badge variant="secondary" className="bg-neutral-500/10 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 px-2.5 text-xs rounded-full flex items-center gap-1 h-6 shrink-0 border border-neutral-200 dark:border-neutral-700">
                        <IconHash className="size-4" strokeWidth={2.5} />
                        Label
                    </Badge>
                    <FilterPill icon={<IconUsers className="size-3" />} label="Assignee" />
                    <FilterPill icon={<IconCircle className="size-3.5" />} label="Status" />
                    <FilterPill icon={<IconGitBranch className="size-3.5" />} label="Parent" />
                    <FilterPill icon={<IconFlag className="size-3.5" />} label="Priority" />
                    <div className="flex items-center px-1 size-6 justify-center border border-neutral-200 dark:border-neutral-800 rounded-full">
                        <IconDots className="size-3 text-neutral-500" />
                    </div>
                </div>

                {/* Groups */}
                <div className="flex flex-col dark:bg-neutral-900">
                    {groups.map((group) => (
                        <div key={group.id} className="px-4 pt-2 pb-4 border-b last:border-b-0">
                            <div className="flex flex-col mt-7 first:mt-2">
                                <div className="flex items-center justify-between px-1 mb-2">
                                    <div className="flex items-center gap-2 pt-1 pb-2">
                                        <IconHash className={cn("size-4 font-bold opacity-70", group.color)} />
                                        <span className={cn("text-xs font-medium uppercase text-neutral-600 dark:text-neutral-400")}>{group.name}</span>
                                        <Badge variant="secondary" className="bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 px-1 text-[10px] h-4 leading-none font-medium ml-1 rounded">
                                            {group.count}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <IconEye className="size-4 text-neutral-500" />
                                        <IconArrowsSort className="size-4 text-neutral-500" />
                                        <IconDots className="size-4 text-neutral-500" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2.5">
                                    {group.tasks.map((task) => (
                                        <TaskItem key={task.id} task={task} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

function FilterPill({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <div className="flex items-center gap-1 h-6 px-2 rounded-full border border-neutral-200 dark:border-neutral-800 text-[11px] text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer shrink-0 font-medium">
            {icon}
            {label}
        </div>
    )
}

function TaskItem({ task }: { task: Task }) {
    const statusIcons = {
        todo: <IconCircleDashed className="size-5 text-neutral-400" />,
        doing: <IconSun className="size-5 text-orange-600 fill-orange-600" />,
        done: <IconCircleCheckFilled className="size-5 text-emerald-600" />,
    }

    const priorityIcons = {
        low: <IconFlagFilled className="size-[18px] text-neutral-300" />,
        normal: <IconFlagFilled className="size-[18px] text-blue-500 fill-blue-500" />,
        high: <IconFlagFilled className="size-[18px] text-orange-500 fill-orange-500" />,
        urgent: <IconAlertTriangleFilled className="size-[18px] text-rose-500 fill-rose-500 " />,
    }

    return (
        <div className="flex items-center gap-3 p-1.5 rounded-full bg-white dark:bg-neutral-800/20 border dark:border-neutral-700/40 dar shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-neutral-200 dark:hover:border-neutral-700 transition-all duration-200 cursor-pointer group">
            <div className="flex items-center gap-2.5 shrink-0 px-0.5">
                {statusIcons[task.status]}
                {priorityIcons[task.priority]}
            </div>

            <div className="flex-1 min-w-0 flex  gap-3">
                <span className="text-[13px] tracking-tight font-semibold text-neutral-800 dark:text-neutral-200 truncate block transition-colors group-hover:text-black dark:group-hover:text-white">
                    {task.title}
                </span>
                {task.subtasks && (
                    <div className="flex items-center gap-1 text-[11px] text-neutral-400 dark:text-neutral-500 font-medium tabular-nums">
                        <IconGitBranch className="size-3 -rotate-45 " />
                        {task.subtasks}
                    </div>
                )}
            </div>

            <div className="flex items-center gap-4 shrink-0">
                <Badge variant="outline" className="text-[9px] h-4.5 uppercase rounded-full border dark:border-neutral-800 text-neutral-500 bg-neutral-50/50 dark:bg-neutral-900 shadow-none max-md:hidden">
                    # {task.category}
                </Badge>

                <span className="text-[12px] text-neutral-500 font-medium w-10 text-right tabular-nums tracking-tight hidden sm:block">{task.date}</span>

                <div className={cn("size-5 rounded-full bg-linear-to-br shadow-[0_2px_4px_rgba(0,0,0,0.1)] ring-1 ring-white/10", task.avatarGradient)} />
            </div>
        </div>
    )
}

export default function TasksPageView() {
    const { state, isMobile } = useSidebar()
    return (
        <div className="flex flex-col h-full bg-neutral-50/50 dark:bg-neutral-950/50 rounded-xl overflow-hidden min-h-0">
            {/* Header */}
            <header className="flex h-12 shrink-0 items-center justify-between px-4 border-b bg-background rounded-t-xl">
                <div className="flex items-center gap-2">
                    {(state === "collapsed" || isMobile) &&
                        <>
                            <SidebarTrigger />
                            <Separator orientation="vertical" className="data-[orientation=vertical]:h-5 mx-1" />
                        </>
                    }
                    <div className="flex items-center gap-2.5">
                        <IconClipboardCheck className="size-4.5 text-neutral-500" />
                        <div className="flex items-center gap-1.5 text-[14px]">
                            <span className="font-medium text-neutral-900 dark:text-neutral-100">Tasks</span>
                            <span className="text-neutral-400 font-light">/</span>
                            <span className="text-neutral-500">Overview</span>
                        </div>
                        <IconDots className="size-3.5 text-neutral-400 ml-1 hover:text-neutral-600 cursor-pointer transition-colors" />
                        <IconLock className="size-3.5 text-neutral-400 hover:text-neutral-600 cursor-pointer transition-colors" />
                    </div>
                </div>


                {/* Search Bar */}
                <div className="flex items-center gap-1.5">
                    {/* Avatar Stack */}
                    <div className="hidden sm:flex items-center -space-x-2 mr-2">
                        {[
                            "from-indigo-500 to-purple-500",
                            "from-rose-400 to-orange-400",
                            "from-emerald-400 to-cyan-400",
                            "from-blue-500 to-teal-400",
                            "from-amber-400 to-red-500",
                            "from-fuchsia-500 to-pink-500",
                        ].map((gradient, i) => (
                            <div key={i} className={cn("rounded-full ring-2 ring-background overflow-hidden size-5 bg-linear-to-tr shadow-sm", gradient)} />
                        ))}
                    </div>
                    <div className="relative group hidden md:block">
                        <IconSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-neutral-400 group-focus-within:text-neutral-500 transition-colors" />
                        <Input
                            placeholder="Search..."
                            className="h-8 w-8 sm:w-56 pl-8 pr-2 sm:pr-12 bg-neutral-100/50 dark:bg-neutral-900/50 focus-visible:bg-background focus-visible:ring-1 focus-visible:border-neutral-200 transition-all rounded-md text-xs border-neutral-200 dark:border-neutral-800 shadow-none placeholder:text-neutral-400 font-medium"
                        />
                        <kbd className="absolute right-1.5 top-1/2 -translate-y-1/2 hidden md:flex h-5 items-center justify-center gap-1 rounded-[4px] border border-neutral-200 bg-white px-1.5 text-[10px] font-medium text-neutral-500 opacity-100 pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 select-none">
                            <span className="text-[12px] h-3.5 flex items-center">⌘</span>
                            <span className="h-3.5 flex items-center">K</span>
                        </kbd>
                    </div>
                    <Button variant="outline" size="icon" className="size-8 hidden xs:flex items-center justify-center hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md shadow-none border-neutral-200 dark:border-neutral-800 transition-colors">
                        <IconBell className="size-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="size-8 hidden sm:flex items-center justify-center hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md shadow-none border-neutral-200 dark:border-neutral-800 transition-colors">
                        <IconQuestionMark className="size-4" />
                    </Button>
                    <Button variant="outline" className="h-8 px-3 gap-1.5 hidden md:flex items-center justify-center hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md shadow-none font-medium text-xs tracking-tight border-neutral-200 dark:border-neutral-800 transition-colors">
                        <IconUpload className="size-3.5" />
                        <span>Share</span>
                    </Button>
                </div>
            </header>

            {/* Toolbar */}
            <Tabs defaultValue="overview" className="flex-1 flex flex-col min-h-0 gap-0">
                <div className="flex h-12 shrink-0 items-stretch justify-between px-4 border-b bg-background overflow-x-auto overflow-y-hidden scrollbar-hide">
                    <div className="flex gap-4 shrink-0">
                        <TabsList className="bg-transparent gap-3 h-12! p-0">
                            {[
                                { value: "overview", label: "Overview", icon: IconLayoutGrid },
                                { value: "kanban", label: "Kanban", icon: IconLayoutSidebar },
                                { value: "list", label: "List", icon: IconList },
                                { value: "calendar", label: "Calendar", icon: IconCalendarEvent },
                                { value: "table", label: "Table", icon: IconTable },
                                { value: "folders", label: "Folders", icon: IconFolder },
                                { value: "timeline", label: "Timeline", icon: IconTimeline },
                            ].map((tab) => (
                                <TabsTrigger
                                    key={tab.value}
                                    value={tab.value}
                                    className="relative gap-1.5 px-1 py-0 bg-transparent shadow-none! data-[state=active]:bg-transparent dark:data-[state=active]:bg-transparent! data-[state=active]:shadow-none! rounded-none text-neutral-500 data-[state=active]:text-neutral-900 dark:data-[state=active]:text-neutral-100 border-x-0 border-t-0 border-b-0 data-[state=active]:border-b-[1.5px]! data-[state=active]:border-neutral-900 dark:data-[state=active]:border-neutral-100 data-[state=active]:-mb-px data-[state=active]:z-10 font-medium text-[13px] transition-none group items-center flex tracking-tight shrink-0 whitespace-nowrap"
                                >
                                    <tab.icon className="size-4" />
                                    {tab.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        <div className="flex items-center">
                            <Button variant="outline" className="h-8 gap-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 rounded-md text-[12px] shadow-none font-medium shrink-0 dark:border-neutral-800 transition-colors">
                                <IconPlus className="size-3" />
                                <span className="max-md:hidden">Add View</span>
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 ml-4 shrink-0">
                        <div className="hidden sm:flex items-center gap-1">
                            <Button variant="outline" size="icon" className="size-8 rounded-md shadow-none border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                                <IconLayoutGrid className="size-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="size-8 rounded-md shadow-none border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                                <IconUserCircle className="size-4.5" />
                            </Button>
                            <Button variant="outline" size="icon" className="size-8 rounded-md shadow-none border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                                <IconCircleCheck className="size-4" />
                            </Button>
                        </div>

                        <div className="flex items-center gap-1.5 font-medium">
                            <Button variant="outline" className="h-8 gap-2 px-3 rounded-md shadow-none border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-medium transition-colors">
                                <IconAdjustmentsHorizontal className="size-4" />
                                <span className="hidden xs:inline">Filter (3)</span>
                            </Button>
                            <Button variant="outline" className="h-8 gap-2 px-3 rounded-md shadow-none border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-medium transition-colors">
                                <IconSortAscending className="size-4" />
                                <span className="hidden xs:inline">Sort</span>
                            </Button>
                            <Button className="h-8 gap-2 px-3 rounded-md shadow-xs bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-xs font-medium border-none shrink-0 ml-1 transition-colors">
                                <IconCirclePlus className="size-4" />
                                <span className="hidden xs:inline">Add Task</span>
                            </Button>
                        </div>
                    </div>
                </div>

                <TabsContent value="overview" className="flex-1 overflow-auto scrollbar-hide p-4 m-0 bg-neutral-50/50 dark:bg-neutral-950/50">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 max-w-[1600px] mx-auto">
                        {/* AMS Project Card */}
                        <ProjectCard
                            title="AMS Project"
                            logo={<div className="size-6 rounded bg-linear-to-br from-rose-500 via-orange-400 to-indigo-500 flex items-center justify-center text-white shadow-sm" />}
                            count={122}
                            groups={amsGroups}
                        />

                        {/* Visualize.co Card */}
                        <ProjectCard
                            title="Visualize.co™"
                            logo={<div className="size-6 rounded bg-linear-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white"><IconBrandVscode className="size-4" /></div>}
                            count={97}
                            isPrivate={true}
                            groups={visualizeGroups}
                        />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
