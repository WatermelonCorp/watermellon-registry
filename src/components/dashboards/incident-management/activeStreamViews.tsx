"use client"

import {
    IconTournament,
    IconLayoutNavbar,
    IconHistory,
    IconFolder,
    IconPlus,
    IconSettings,
    IconClock,
    IconHourglass,
} from "@tabler/icons-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "./components/ui/select"
import { Badge } from "./components/ui/badge"
import { Button } from "./components/ui/button"
import { SidebarTrigger } from "./components/ui/sidebar"
import { KanbanColumn } from "./components/active-streams/kanban-column"
import { detectedCards, acknowledgedCards, investigatingCards, resolvedCards } from "./components/active-streams/constants"

export function ActiveStreamViews() {
    return (
        <div className="flex-1 flex flex-col w-full bg-white dark:bg-neutral-950 overflow-hidden min-h-0">
            {/* Header */}
            <div className="py-4 px-7 flex items-start justify-between">
                <div className="flex flex-col gap-0">
                    <h1 className="text-2xl font-medium tracking-tighter text-neutral-900 dark:text-neutral-100">Activity stream</h1>
                    <p className="text-neutral-500 dark:text-neutral-400 text-base tracking-tight">Real-time system activity across teams</p>
                </div>
                <div className="md:hidden pt-1">
                    <SidebarTrigger className="text-neutral-500" />
                </div>
            </div>

            <Tabs defaultValue="flowView" className="flex-1 flex flex-col min-h-0">
                {/* Tab List */}
                <div className="px-6 border-b dark:border-neutral-800 overflow-x-auto scrollbar-hide">
                    <TabsList className="bg-transparent h-16 p-0 gap-6 max-md:w-max justify-start">
                        {[
                            { value: "flowView", label: "Flow view", icon: IconTournament },
                            { value: "capacityView", label: "Capacity view", icon: IconLayoutNavbar },
                            { value: "history", label: "History", icon: IconHistory },
                            { value: "actionLog", label: "Action log", icon: IconFolder },
                        ].map((tab) => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className="group bg-transparent dark:bg-transparent data-[state=active]:bg-transparent dark:data-[state=active]:bg-transparent shadow-none! data-[state=active]:shadow-none! border-t-0! border-x-0! border-b-0! data-[state=active]:border-b-[1.5px]! data-[state=active]:border-orange-500! dark:data-[state=active]:border-orange-500! rounded-none flex items-center gap-2 font-medium data-[state=active]:font-medium tracking-tight data-[state=active]:text-neutral-800 dark:data-[state=active]:text-neutral-200 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 text-[15px] px-1 h-9 text-neutral-500 dark:text-neutral-400 max-md:whitespace-nowrap focus:ring-0! focus:outline-none! focus-visible:ring-0! focus-visible:outline-none! focus-visible:border-t-0! focus-visible:border-x-0! cursor-pointer"
                            >
                                <tab.icon className="size-5 text-neutral-400 dark:text-neutral-500 group-data-[state=active]:text-orange-500 dark:group-data-[state=active]:text-orange-500 transition-colors duration-300" strokeWidth={1.5} />
                                <span className="">{tab.label}</span>
                            </TabsTrigger>))}
                    </TabsList>
                </div>

                <TabsContent value="flowView" className="flex-1 flex flex-col p-6 pt-3 bg-white dark:bg-neutral-950 overflow-hidden gap-7 min-h-0">
                    {/* Filters */}
                    <div className="flex flex-wrap items-center gap-4">
                        <Button variant="outline" className="bg-neutral-200/50 dark:bg-neutral-900/50 hover:bg-[#f2f2f2] dark:hover:bg-neutral-800 border-neutral-100/50 dark:border-neutral-800/50 rounded-lg px-3 flex items-center gap-3 font-medium text-neutral-800 dark:text-neutral-200 shadow-none transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer">
                            Filter
                            <Badge variant="secondary" className="bg-white dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 rounded px-2 py-0.5 size-4 flex justify-center shadow border dark:border-neutral-700">0</Badge>
                        </Button>
                        {[
                            {
                                label: "Assigned unit",
                                value: "unit",
                                options: ["All Units", "Frontend Team", "Backend Team", "DevOps", "Security"]
                            },
                            {
                                label: "Service type",
                                value: "service",
                                options: ["All Services", "Authentication", "Database", "Payment Gateway", "API Gateway"]
                            },
                            {
                                label: "Resolution window",
                                value: "resolution",
                                options: ["Any Time", "< 1 Hour", "1-4 Hours", "4-24 Hours", "> 24 Hours"]
                            },
                            {
                                label: "Impact",
                                value: "impact",
                                options: ["All Levels", "Critical", "High", "Medium", "Low"]
                            },
                        ].map((filter) => (
                            <Select key={filter.value}>
                                <SelectTrigger className="w-fit bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 rounded-lg pl-3 pr-2 font-medium text-neutral-400 dark:text-neutral-500 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/60 shadow-none transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer text-sm">
                                    <SelectValue placeholder={filter.label} />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-neutral-100 dark:border-neutral-800 shadow-xl">
                                    {filter.options.map(option => (
                                        <SelectItem key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>{option}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        ))}
                    </div>

                    {/* Kanban Grid */}
                    <div className="flex-1 flex gap-6 overflow-auto over min-h-0 scrollbar-hide">
                        <KanbanColumn title="Detected" count={12} cards={detectedCards} icon={IconClock} />
                        <KanbanColumn title="Acknowledged" count={4} cards={acknowledgedCards} icon={IconHourglass} />
                        <KanbanColumn title="Investigating" count={1} cards={investigatingCards} icon={IconSettings} />
                        <KanbanColumn title="Resolved" count={1} cards={resolvedCards} icon={IconPlus} />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}