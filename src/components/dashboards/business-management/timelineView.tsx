"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "./components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./components/ui/select";
import { Switch } from "./components/ui/switch";
import { Button } from "./components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "./components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./components/ui/dropdown-menu";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "./components/ui/chart";
import {
    SidebarTrigger,
    useSidebar,
} from "./components/ui/sidebar";
import {
    ComposedChart,
    Bar,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";
import {
    Search,
    Calendar,
    Download,
    TrendingUp,
    TrendingDown,
    MapPin,
    ArrowRight,
    Plus,
    Inbox,
    Bell,
    Flag,
    MoveRight,
    Layers2,
    MessageSquareText,
    Users,
    Zap,
    ChartColumnBig,
    MoreVertical,
} from "lucide-react";
import { Input } from "./components/ui/input";
import { Separator } from "./components/ui/separator";
import { metricsData, teamData, salesLaborData, chartConfig, actionItems } from "./data";

export const TimelineView = () => {
    const { open } = useSidebar();
    const [periodType, setPeriodType] = useState<"week" | "month">("week");
    const [demoDataEnabled, setDemoDataEnabled] = useState(true);

    return (
        <div className="w-full h-full overflow-y-auto p-4 md:p-5 space-y-5">
            {/* Mobile Header: Sidebar Trigger and Search */}
            <div className="flex md:hidden items-center gap-2 mb-2">
                <SidebarTrigger className="-ml-1 text-neutral-500 hover:text-orange-500" />
                <Separator orientation="vertical" className="h-4" />
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search"
                        className="pl-10 h-9 bg-muted/50 border-muted focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-neutral-400 dark:focus-visible:border-neutral-600 text-foreground"
                    />
                </div>
            </div>

            {/* Header Section */}
            <div className="flex flex-col gap-4">
                {/* Desktop Top Row: Search and Actions */}
                <div className="hidden md:flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        {!open && <SidebarTrigger className="text-neutral-500 hover:text-orange-500" />}
                        <div className="relative w-64 text-black">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search"
                                className="pl-10 bg-muted/50 shadow-none border-[1.5px] border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 hover:dark:border-neutral-600 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-neutral-400 dark:focus-visible:border-neutral-600 transition-all duration-300 text-foreground"
                            />
                            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground bg-neutral-500/10 dark:bg-neutral-800 px-1.5 py-0.5 rounded">
                                /
                            </kbd>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Dialog>
                            <DialogTrigger render={<Button variant="outline" size="sm" className="gap-1 transition-colors duration-300 cursor-pointer border-[1.5px] border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 hover:dark:border-neutral-600" />}>
                                <Plus className="size-3.5 text-neutral-500" />
                                Add
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Item</DialogTitle>
                                    <DialogDescription>
                                        Create a new item here.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Input id="name" placeholder="Item name..." className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-neutral-400 dark:focus-visible:border-neutral-600 text-foreground" />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
                                    <Button type="submit">Save changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <Separator
                            orientation="vertical"
                            className="mx-2 data-[orientation=vertical]:h-4"
                        />
                        <div className="flex items-center gap-1.5">
                            <Flag className="size-4 text-orange-500 fill-orange-500" />
                            <span className="text-sm font-medium text-neutral-500 hover:text-neutral-600 hover:dark:text-neutral-400 cursor-pointer transition-colors duration-100">
                                1/4
                            </span>
                        </div>
                        <Separator
                            orientation="vertical"
                            className="mx-2 data-[orientation=vertical]:h-4"
                        />
                        <div className="flex items-center gap-2 text-sm text-neutral-500">
                            <Inbox className="size-4 hover:text-orange-500 transition-colors duration-100 cursor-pointer" />
                            <Bell className="size-4 hover:text-orange-500 transition-colors duration-100 cursor-pointer" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col">
                    {/* Title Row */}
                    <div className="flex items-center justify-between mb-3 mt-1">
                        <h1 className="text-lg font-semibold">Here&apos;s whats happening</h1>
                        {/* Mobile Actions */}
                        <div className="flex md:hidden items-center gap-2">
                            <div className="flex items-center gap-1">
                                <Flag className="size-3 text-orange-500 fill-orange-500" />
                                <span className="text-sm font-medium text-neutral-500 hover:text-neutral-600 hover:dark:text-neutral-400 cursor-pointer transition-colors duration-100">1/4</span>
                            </div>
                            <Separator
                                orientation="vertical"
                                className="data-[orientation=vertical]:h-3"
                            />
                            <Inbox className="size-4 hover:text-orange-500 transition-colors duration-100 cursor-pointer" />
                            <Bell className="size-4 hover:text-orange-500 transition-colors duration-100 cursor-pointer" />
                        </div>
                    </div>

                    {/* Filter Row */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                        <div className="flex items-center w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
                            {/* Week/Month Toggle */}
                            <Tabs
                                value={periodType}
                                onValueChange={(val) => setPeriodType(val as "week" | "month")}
                                className="shrink-0"
                            >
                                <TabsList className="p-1 bg-neutral-200 dark:bg-neutral-800 gap-1 rounded-md h-8!">
                                    <TabsTrigger
                                        value="week"
                                        className="px-2 py-1 h-6! text-sm transition-all duration-300 rounded-sm text-neutral-500 hover:bg-white/80 dark:hover:bg-background/50 dark:data-[state=active]:bg-black! data-[state=active]:text-foreground data-[state=active]:shadow-sm border-none"
                                    >
                                        Week
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="month"
                                        className="px-2 py-1 h-6! text-sm transition-all duration-300 rounded-sm text-neutral-500 hover:bg-white/70 dark:hover:bg-background/50 dark:data-[state=active]:bg-black! data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                                    >
                                        Month
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>
                            <Separator
                                orientation="vertical"
                                className="mx-2 data-[orientation=vertical]:h-4 shrink-0"
                            />

                            {/* Date Range */}
                            <Button variant="outline" size="sm" className="gap-2 group bg-transparent! tracking-tight font-normal shrink-0 hover:border-neutral-300 shadow-none">
                                <Calendar className="h-4 w-4 text-neutral-500 group-hover:text-orange-500 transition-colors duration-100 cursor-pointer" />
                                <span className="hidden sm:inline">Sep 28, 2025</span> <MoveRight className="h-4 w-4 text-neutral-500 group-hover:dark:text-neutral-300 group-hover:text-neutral-600  transition-all duration-100" /> <span className="hidden sm:inline">Oct 4, 2025</span>
                                <span className="sm:hidden">Sep 28 - Oct 4</span>
                            </Button>
                        </div>

                        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                            {/* Demo Data Toggle */}
                            <div className="flex items-center gap-1.5 shrink-0">
                                <Switch
                                    className=""
                                    checked={demoDataEnabled}
                                    onCheckedChange={setDemoDataEnabled}
                                />
                                <span className="text-sm tracking-tight">
                                    Demo data
                                </span>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                                <Separator
                                    orientation="vertical"
                                    className="h-4"
                                />

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button size="sm" className="gap-2 transition-colors duration-300 cursor-pointer">
                                            <Download className="size-4" />
                                            <span className="hidden md:inline">Export</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Export Options</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                                        <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                                        <DropdownMenuItem>Export to Google Sheets</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                {/* Mobile Add Button */}
                                <Dialog>
                                    <DialogTrigger render={<Button variant="outline" size="icon" className="md:hidden size-8 transition-colors duration-300 cursor-pointer" />}>
                                        <Plus className="size-4 text-neutral-500" />
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Add New Item</DialogTitle>
                                            <DialogDescription>
                                                Create a new item here.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid gap-2">
                                                <Input id="name" placeholder="Item name..." className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-neutral-400 dark:focus-visible:border-neutral-600 text-foreground" />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
                                            <Button type="submit">Save</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </div>

                    <Separator
                        orientation="horizontal"
                        className="my-2.5 border-t-[1.5px] border-dashed border-neutral-200 dark:border-neutral-800 bg-transparent"
                    />

                    {/* Company/Department Filter Row */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <Select defaultValue="acme">
                                <SelectTrigger size="sm" className="px-2 w-full sm:w-fit bg-background! group shadow-none hover:dark:bg-neutral-700/30! transition-colors duration-300 cursor-pointer hover:bg-neutral-200/20!">
                                    <div className="flex items-center gap-1.5">
                                        <MapPin className="size-3.5 text-neutral-500 group-hover:text-orange-500 transition-all duration-100 cursor-pointer" />
                                        <SelectValue placeholder="Company" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent >
                                    <SelectItem value="acme">Acme inc</SelectItem>
                                    <SelectItem value="other">Other Corp</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select defaultValue="all">
                                <SelectTrigger size="sm" className="px-2 w-full sm:w-fit bg-background! group shadow-none hover:bg-neutral-200/20! hover:dark:bg-neutral-700/30! transition-colors duration-300 cursor-pointer">
                                    <div className="flex items-center gap-1.5">
                                        <Layers2 className="size-3.5 text-neutral-500 group-hover:text-orange-500 transition-all duration-100 cursor-pointer" />
                                        <SelectValue placeholder="Department" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Departments</SelectItem>
                                    <SelectItem value="engineering">Engineering</SelectItem>
                                    <SelectItem value="sales">Sales</SelectItem>
                                    <SelectItem value="hr">Human Resources</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Dialog>
                            <DialogTrigger render={<Button variant="outline" size="sm" className="font-normal w-full sm:w-auto transition-colors duration-300 cursor-pointer group shadow-none hover:bg-neutral-200/20! hover:dark:bg-neutral-700/30!" />}>
                                <MessageSquareText className="size-3.5 text-neutral-500 group-hover:text-orange-500 transition-all duration-100 cursor-pointer" />
                                Feedback
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Send Feedback</DialogTitle>
                                    <DialogDescription>
                                        Share your thoughts or suggestions with us.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <textarea
                                            className="flex min-h-[100px] w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-neutral-400 dark:focus-visible:border-neutral-600 focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                                            placeholder="Write your feedback here..."
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose render={<Button variant="outline" />}>
                                        Cancel
                                    </DialogClose>
                                    <Button type="submit">Send Feedback</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>

            {/* Metrics Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {metricsData.map((metric, index) => (
                    <Card key={index} className="border-border p-4 bg-background gap-0 shadow-none transition-colors duration-300 cursor-pointer hover:bg-neutral-200/10! hover:dark:bg-neutral-700/20!">
                        <CardHeader className="flex items-center justify-between p-0 mb-1">
                            <div className="flex items-center gap-2">
                                <span className={`size-4.5 rounded ${metric.color} flex items-center justify-center`}>
                                    <metric.icon className="size-2.5 text-white" strokeWidth={2.5} />
                                </span>
                                <CardTitle className="text-base font-medium text-neutral-600 dark:text-neutral-500 tracking-tight">
                                    {metric.title}
                                </CardTitle>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-5 w-5 px-0! text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-100 rounded-sm transition-colors duration-300 cursor-pointer group hover:bg-neutral-200/40! hover:dark:bg-neutral-700/30!">
                                        <MoreVertical className="size-3.5 transition-colors duration-300" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Options</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                    <DropdownMenuItem>Settings</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="text-2xl font-bold mb-3 mt-1">{metric.value}</div>
                            <div className="flex items-center justify-between gap-1 mt-1">
                                <span className="text-xs text-neutral-500 font-medium">vs last week</span>
                                <span className={`text-xs flex items-center gap-0.5 ${metric.trendUp ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"
                                    }`}>
                                    {metric.trendUp ? (
                                        <TrendingUp className="h-3 w-3" />
                                    ) : (
                                        <TrendingDown className="h-3 w-3" />
                                    )}
                                    {metric.trend}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Content Row: Table and Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Team Performances Breakdown Table */}
                <Card className="lg:col-span-2 bg-background border-neutral-200 dark:border-border p-4 gap-3 overflow-hidden shadow-none ">
                    <CardHeader className="flex flex-row items-center gap-2 p-0">
                        <span className="size-4.5 rounded bg-green-500 flex items-center justify-center">
                            <Users className="size-2.5 text-white" />
                        </span>
                        <CardTitle className="text-sm font-medium">
                            Team Performances Breakdown
                        </CardTitle>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto transition-all duration-300 text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-100 cursor-pointer hover:bg-neutral-200/40! hover:dark:bg-neutral-700/30! group">
                                    <MoreVertical className="h-3 w-3 transition-colors duration-300" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Options</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Manage Team</DropdownMenuItem>
                                <DropdownMenuItem>Export Data</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="border border-neutral-200 dark:border-border rounded-lg overflow-x-auto">
                            <div className="min-w-[500px]">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-border hover:bg-neutral-200/50 dark:hover:bg-muted/50 bg-neutral-100/80 dark:bg-muted/50 transition-colors">
                                            <TableHead className="text-xs text-neutral-600 dark:text-muted-foreground font-semibold pl-4">
                                                Employee
                                            </TableHead>
                                            <TableHead className="text-xs text-neutral-600 dark:text-muted-foreground font-semibold">
                                                Lates
                                            </TableHead>
                                            <TableHead className="text-xs text-neutral-600 dark:text-muted-foreground font-semibold">
                                                Shifts
                                            </TableHead>
                                            <TableHead className="text-xs text-neutral-600 dark:text-muted-foreground font-semibold">
                                                Late (%)
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {teamData.map((member) => (
                                            <TableRow key={member.id} className="border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-muted/30 transition-colors">
                                                <TableCell className="pl-4 border-r border-neutral-200 dark:border-border">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarImage src={member.avatar} alt={member.name} />
                                                            <AvatarFallback className="text-xs bg-muted">
                                                                {member.name
                                                                    .split(" ")
                                                                    .map((n) => n[0])
                                                                    .join("")}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <span className="text-sm font-medium">{member.name}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="border-r border-neutral-200 dark:border-border">
                                                    <div className="flex items-center gap-1">
                                                        <span className={`flex items-center gap-0.5 ${member.latesUp ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}>
                                                            {member.latesUp ? (
                                                                <TrendingUp className="size-3" />
                                                            ) : (
                                                                <TrendingDown className="size-3" />
                                                            )}
                                                            {member.lates.split(" ")[0]}
                                                        </span>
                                                        <span className="text-sm text-muted-foreground">
                                                            last week
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="border-r border-neutral-200 dark:border-border">
                                                    <div className="flex items-center gap-1">
                                                        <span className={`flex items-center gap-0.5 ${member.shiftsUp ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}>
                                                            {member.shiftsUp ? (
                                                                <TrendingUp className="size-3" />
                                                            ) : (
                                                                <TrendingDown className="size-3" />
                                                            )}
                                                            {member.shifts.split(" ")[0]}
                                                        </span>
                                                        <span className="text-sm text-muted-foreground">
                                                            last week
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-1">
                                                        <span className={`flex items-center gap-0.5 ${member.latePercentUp ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}>
                                                            {member.latePercentUp ? (
                                                                <TrendingUp className="size-3" />
                                                            ) : (
                                                                <TrendingDown className="size-3" />
                                                            )}
                                                            {member.latePercent.split(" ")[0]}
                                                        </span>
                                                        <span className="text-sm text-muted-foreground">
                                                            last week
                                                        </span>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Action and Updates Card */}
                <Card className="bg-background border-border p-4 shadow-none">
                    <CardHeader className="flex flex-row items-center gap-2 p-0">
                        <span className="size-4.5 flex items-center justify-center rounded bg-purple-400">
                            <Zap className="size-2.5 text-white" strokeWidth={2.5} />
                        </span>
                        <CardTitle className="text-sm font-medium">Action and updates</CardTitle>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto transition-all duration-300 cursor-pointer hover:bg-neutral-200/40! hover:dark:bg-neutral-700/30! group text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-100">
                                    <MoreVertical className="h-3 w-3 transition-colors duration-300" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Options</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Refresh</DropdownMenuItem>
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="flex flex-col">
                            {actionItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between border-t-[1.5px] border-dashed py-[12.5px] cursor-pointer group"
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon className="h-4 w-4 text-neutral-500 group-hover:text-orange-500 transition-colors duration-300" />
                                        <span className="text-sm">{item.title}</span>
                                    </div>
                                    {item.actionText ? (
                                        <Button variant="outline" size="sm" className="h-7 text-xs transition-colors duration-300 hover:bg-neutral-200/20 dark:hover:bg-neutral-800/40">
                                            {item.actionText}
                                        </Button>
                                    ) : (
                                        <Button variant="outline" size="icon" className="h-7 w-7 hover:bg-neutral-200/20 dark:hover:bg-neutral-800/40 transition-colors duration-300">
                                            <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Sales vs Labor Chart */}
            <Card className="bg-background border-border p-4 shadow-none">
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-0 gap-4 sm:gap-0">
                    <div className="flex items-center gap-2">
                        <span className="size-4.5 rounded bg-orange-500 flex items-center justify-center">
                            <ChartColumnBig className="size-3 text-white" strokeWidth={2.5} />
                        </span>
                        <CardTitle className="text-sm font-medium">Sales vs Labor</CardTitle>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-hide">
                        <div className="flex items-center gap-2 shrink-0">
                            <span className="h-2.5 w-2.5 rounded-full bg-purple-500"></span>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">Actual sales</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">Actual labor</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <span className="h-0.5 w-4 bg-orange-500"></span>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">Projected sales</span>
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 transition-all duration-300 cursor-pointer hover:bg-neutral-200/40! hover:dark:bg-neutral-700/30! hover:text-neutral-700 dark:hover:text-neutral-100 group text-neutral-400 dark:text-neutral-500">
                                <MoreVertical className="h-3 w-3 transition-colors duration-300" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Options</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View Chart</DropdownMenuItem>
                            <DropdownMenuItem>Download PNG</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardHeader>
                <CardContent className="p-0 overflow-x-auto scrollbar-hide">
                    <div className="min-w-[600px] w-full">
                        <ChartContainer config={chartConfig} className="h-[150px] w-full">
                            <ComposedChart
                                data={salesLaborData}
                                margin={{
                                    top: 5,
                                    left: 2,
                                    right: 0,
                                    bottom: 0,
                                }}
                                barGap={4}
                            >
                                <defs>
                                    <linearGradient id="projectedGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#f97316" stopOpacity={0.3} />
                                        <stop offset="100%" stopColor="#f97316" stopOpacity={0.05} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#262626" />
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))", fontWeight: 500 }}
                                    padding={{ left: -20, right: -20 }}
                                />
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={(value) => `$${value}`}
                                    domain={[50, 200]}
                                    ticks={[50, 100, 150, 200]}
                                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))", fontWeight: 500 }}
                                    width={45}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent indicator="dashed" />}
                                />
                                <Bar
                                    dataKey="actualSales"
                                    fill="var(--color-actualSales)"
                                    radius={[4, 4, 0, 0]}
                                    barSize={10}
                                    opacity={0.6}
                                />
                                <Bar
                                    dataKey="actualLabor"
                                    fill="var(--color-actualLabor)"
                                    radius={[4, 4, 0, 0]}
                                    barSize={10}
                                    opacity={0.6}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="projectedSales"
                                    stroke="var(--color-projectedSales)"
                                    strokeWidth={2}
                                    fill="url(#projectedGradient)"
                                />
                            </ComposedChart>
                        </ChartContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
