import React from "react"
import {
    IconChevronDown,
    IconFilter,
    IconClock,
    IconBuilding
} from "@tabler/icons-react"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from "./ui/collapsible"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Calendar, CalendarClock, CalendarDays, CircleCheckBig, CircleUserRound, MapPinned, Video } from "lucide-react"
import { FilterSection } from "./FilterSection"

export const SidebarFilters = () => {
    const [isStatusOpen, setIsStatusOpen] = React.useState(true)
    const [isLocationOpen, setIsLocationOpen] = React.useState(true)

    return (
        <div className="w-[240px] border-[1.5px] rounded-lg flex flex-col h-full p-1 overflow-hidden shrink-0 bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 gap-1.5">
            <div className="px-2 py-1.5">
                <h2 className="text-sm text-neutral-500 dark:text-neutral-200 font-medium">Filters</h2>
            </div>
            <div className="flex-1 overflow-y-auto flex flex-col gap-2 scrollbar-hide">
                <FilterSection title="Meeting Properties" defaultOpen>
                    <div className="space-y-2">
                        <Collapsible open={isStatusOpen} onOpenChange={setIsStatusOpen} className="space-y-2 p-2 rounded-md bg-neutral-200/30 dark:bg-neutral-800/50">
                            <CollapsibleTrigger asChild className="h-fit mb-0 ">
                                <div className="flex items-center justify-between cursor-pointer group/trigger">
                                    <div className="flex items-center gap-1.5 text-[13px] font-medium tracking-tight text-neutral-600 dark:text-neutral-300 transition-colors group-hover/trigger:text-indigo-600 dark:group-hover/trigger:text-indigo-400">
                                        <CircleCheckBig className="w-4 h-4 text-neutral-400 dark:text-neutral-500 group-hover/trigger:text-indigo-500" />
                                        <span className="text-neutral-600 dark:text-neutral-300 group-hover/trigger:text-indigo-600 dark:group-hover/trigger:text-indigo-400">Meeting Status</span>
                                    </div>
                                    <IconChevronDown className={`w-4 h-4 transition-transform text-neutral-400 dark:text-neutral-500 duration-200 ${isStatusOpen ? "" : "-rotate-90"}`} />
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="pt-2 pl-0.5">
                                <RadioGroup defaultValue="completed" className="gap-2">
                                    {["Scheduled", "Upcoming", "Completed", "Cancelled", "Rescheduled"].map((status) => (
                                        <div key={status} className="flex items-center space-x-2">
                                            <RadioGroupItem value={status.toLowerCase()} id={status} className="border-neutral-300 dark:border-neutral-700 size-3 dark:data-[state=checked]:border-indigo-500 dark:data-[state=checked]:text-indigo-500" />
                                            <Label htmlFor={status} className='font-medium tracking-tight text-neutral-500/80 dark:text-neutral-300/80 uppercase text-[10px]'>
                                                {status}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </CollapsibleContent>
                        </Collapsible>

                        <div className="px-2 pb-2 flex flex-col gap-2 text-neutral-600 tracking-tight">
                            <div className="flex items-center gap-1 text-sm font-medium">
                                <IconFilter className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                                <span className="text-[13px] font-medium tracking-tight text-neutral-600 dark:text-neutral-300">Meeting Type</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm font-medium">
                                <IconClock className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                                <span className="text-[13px] font-medium tracking-tight text-neutral-600 dark:text-neutral-300">Meeting Duration</span>
                            </div>
                        </div>
                    </div>
                </FilterSection>

                <FilterSection title="Time & Dates">
                    <div className="space-y-2">
                        <Collapsible open={isStatusOpen} onOpenChange={setIsStatusOpen} className="space-y-2 p-2 rounded-md bg-neutral-200/30 dark:bg-neutral-800/50">
                            <CollapsibleTrigger asChild className="h-fit mb-0 ">
                                <div className="flex items-center justify-between cursor-pointer">
                                    <div className="flex items-center gap-1.5 text-[13px] font-medium tracking-tight">
                                        <Calendar className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                                        <span className="text-neutral-500 dark:text-neutral-300">Meeting Date</span>
                                    </div>
                                    <IconChevronDown className={`w-4 h-4 transition-transform text-neutral-400 dark:text-neutral-500 duration-200 ${isStatusOpen ? "" : "-rotate-90"}`} />
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="pt-2 pl-0.5">
                                <div className="flex gap-2">
                                    <Input placeholder="From" className="h-8 text-xs border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-none dark:text-neutral-200 focus-visible:ring-0 focus-visible:border-neutral-400 dark:focus-visible:border-neutral-600 outline-none transition-colors" />
                                    <Input placeholder="To" className="h-8 text-xs border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-none dark:text-neutral-200 focus-visible:ring-0 focus-visible:border-neutral-400 dark:focus-visible:border-neutral-600 outline-none transition-colors" />
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                        <div className="px-2 pb-2 flex flex-col gap-2 text-neutral-600 dark:text-neutral-300 tracking-tight">
                            <div className="flex items-center gap-1.5 text-sm font-medium">
                                <CalendarDays className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                                <span className="text-[13px] font-medium tracking-tight text-neutral-600 dark:text-neutral-300">Created date</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm font-medium">
                                <CalendarClock className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                                <span className="text-[13px] font-medium tracking-tight text-neutral-600 dark:text-neutral-300">Time slot</span>
                            </div>
                        </div>
                    </div>
                </FilterSection>

                <FilterSection title="Meeting Location" defaultOpen>
                    <div className=" space-y-2">
                        <Collapsible open={isLocationOpen} onOpenChange={setIsLocationOpen} className="space-y-2 p-2 rounded-md bg-neutral-200/30 dark:bg-neutral-800/50">
                            <CollapsibleTrigger asChild className="h-fit mb-0 ">
                                <div className="flex items-center justify-between cursor-pointer">
                                    <div className="flex items-center gap-1.5 text-[13px] font-medium tracking-tight text-neutral-600 dark:text-neutral-300">
                                        <MapPinned className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                                        <span className="text-neutral-500 dark:text-neutral-300">Location Type</span>
                                    </div>
                                    <IconChevronDown className={`w-4 h-4 transition-transform duration-200 text-neutral-400 dark:text-neutral-500 ${isLocationOpen ? "" : "-rotate-90"}`} />
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent className=" pt-2">
                                <RadioGroup defaultValue="virtual" className="gap-2">
                                    {[
                                        { id: "virtual", label: "Virtual" },
                                        { id: "in-person", label: "In-Person" },
                                        { id: "phone-call", label: "Phone Call" },
                                    ].map((type) => (
                                        <div key={type.id} className="flex items-center space-x-2">
                                            <RadioGroupItem value={type.id} id={type.id} className="border-neutral-300 dark:border-neutral-700 size-3 dark:data-[state=checked]:border-indigo-500 dark:data-[state=checked]:text-indigo-500" />
                                            <Label htmlFor={type.id} className='font-medium tracking-tight text-neutral-500/80 dark:text-neutral-300/80 uppercase text-[10px]'>
                                                {type.label}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </CollapsibleContent>
                        </Collapsible>
                        <div className="px-2 pb-2 flex flex-col gap-2 text-neutral-600 dark:text-neutral-300 tracking-tight">
                            <div className="flex items-center gap-1 text-sm font-medium">
                                <Video className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                                <span className="text-[13px] font-medium tracking-tight text-neutral-600 dark:text-neutral-300">Meeting Platform</span>
                            </div>
                        </div>
                    </div>
                </FilterSection>

                <FilterSection title="Others">
                    <div className="space-y-2">
                        <Collapsible open={isLocationOpen} onOpenChange={setIsLocationOpen} className="space-y-2 p-2 rounded-md bg-neutral-200/30 dark:bg-neutral-800/50">
                            <CollapsibleTrigger asChild className="h-fit mb-0 ">
                                <div className="flex items-center justify-between cursor-pointer">
                                    <div className="flex items-center gap-1.5 text-[13px] font-medium tracking-tight text-neutral-600 dark:text-neutral-300">
                                        <IconBuilding className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                                        <span className="text-neutral-500 dark:text-neutral-300">Company</span>
                                    </div>
                                    <IconChevronDown className={`w-4 h-4 transition-transform duration-200 text-neutral-400 dark:text-neutral-500 ${isLocationOpen ? "" : "-rotate-90"}`} />
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent className=" pt-2">
                                <Select>
                                    <SelectTrigger className="h-8 text-xs bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 shadow-none w-full dark:text-neutral-200 focus-visible:ring-0 outline-none transition-colors">
                                        <SelectValue placeholder="Enter Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="apple">Apple</SelectItem>
                                        <SelectItem value="google">Google</SelectItem>
                                    </SelectContent>
                                </Select>
                            </CollapsibleContent>
                        </Collapsible>
                        <div className="px-2 pb-2 flex flex-col gap-2 text-neutral-600 dark:text-neutral-300 tracking-tight">
                            <div className="flex items-center gap-1 text-sm font-medium">
                                <CircleUserRound className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                                <span className="text-[13px] font-medium tracking-tight text-neutral-600 dark:text-neutral-300">Meeting Host</span>
                            </div>
                        </div>
                    </div>
                </FilterSection>
            </div>
        </div>
    )
}
