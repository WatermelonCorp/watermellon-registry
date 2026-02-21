"use client"

import { salesData, emailData, salesConfig, emailConfig, employees, stats } from "../data"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { ArrowUp, ArrowDown, Search, Download, ChevronsUpDown, EyeIcon, EllipsisVertical } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select"
import {
    Bar,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Area,
    AreaChart,
} from "recharts"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "./ui/chart"
import { Input } from "./ui/input"
import { Separator } from "./ui/separator"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table"
import { Button } from './ui/button'
import { Checkbox } from "./ui/checkbox"

const OverviewTabContent = () => {
    const cardBorderStyles = "relative before:absolute before:inset-0 before:rounded-[inherit] dark:before:border dark:before:border-neutral-800/70 dark:before:[mask-image:linear-gradient(to_bottom,black_20%,transparent_60%)] before:pointer-events-none"

    return (
        <div className='flex flex-col gap-6 px-7 max-md:px-5 py-5'>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <Card
                        key={index}
                        className={`bg-white dark:bg-neutral-800/40 border border-neutral-200 dark:border-none hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors shadow-none rounded-lg pt-4 pb-3 px-4 min-w-0 ${cardBorderStyles}`}
                    >
                        <CardContent className="p-5 flex flex-col gap-3.5 py-0 px-0 min-w-0">
                            <div className="text-neutral-500 text-[13px] font-medium leading-none tracking-tight wrap-break-word whitespace-normal">
                                {stat.title}
                            </div>
                            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                                <div className="text-neutral-900 dark:text-neutral-100 text-2xl font-semibold tracking-tight break-all whitespace-normal">
                                    {stat.value}
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                    <Badge
                                        className={`
                                            rounded border-none px-1 py-0.5 text-[11px] font-medium flex items-center gap-0.5
                                            ${stat.trendType === 'up'
                                                ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/15'
                                                : 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/15'}
                                        `}
                                    >
                                        {stat.trendType === 'up' ? (
                                            <ArrowUp className="size-3" strokeWidth={2.5} />
                                        ) : (
                                            <ArrowDown className="size-3" strokeWidth={2.5} />
                                        )}
                                        {stat.trend}
                                    </Badge>
                                    <span className="text-neutral-500 text-[12px] tracking-tight font-medium leading-none whitespace-nowrap">
                                        {stat.description}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0">
                {/* Sales Performance */}
                <Card className={`bg-neutral-50/50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-none py-4 px-6 shadow-none rounded-xl min-w-0 ${cardBorderStyles}`}>
                    <CardHeader className="p-0 flex flex-row flex-wrap items-center justify-between gap-4 space-y-0">
                        <CardTitle className="text-neutral-900 dark:text-neutral-100 text-base font-semibold whitespace-nowrap">Sales Performance</CardTitle>
                        <Select defaultValue="2w">
                            <SelectTrigger className="h-7! w-fit shrink-0 bg-neutral-100 dark:bg-neutral-800/20! border-[1.5px] border-neutral-200 dark:border-neutral-800 text-neutral-500 font-medium text-xs pl-3 pr-2 gap-1.5 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors focus:ring-0">
                                <SelectValue placeholder="Period" />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100">
                                <SelectItem value="1w">1 Week</SelectItem>
                                <SelectItem value="2w">2 Weeks</SelectItem>
                                <SelectItem value="1m">1 Month</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardHeader>
                    <CardContent className="p-0 min-w-0 pt-4 sm:pt-6">
                        <div className="flex overflow-x-auto items-center justify-between gap-6 mb-7 pb-2 -mx-1 px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex flex-col gap-1 shrink-0">
                                    <div className="flex items-center gap-1 shrink-0">
                                        <span className="text-neutral-900 dark:text-neutral-100 text-lg font-medium tracking-tight">$1.843</span>
                                        <Badge className="bg-transparent text-emerald-500 border-none px-1 py-0 h-4 text-[12px] font-medium flex items-center gap-0.5 shrink-0">
                                            <ArrowUp className="size-2.5" strokeWidth={3} />
                                            29%
                                        </Badge>
                                    </div>
                                    <span className="text-neutral-500 text-[12px] font-medium tracking-tight whitespace-nowrap">Weekly Revenue</span>
                                </div>
                            ))}
                        </div>
                        <ChartContainer config={salesConfig} className="h-[190px] w-full">
                            <BarChart data={salesData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }} barGap={-12}>
                                <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#4f46e5" stopOpacity={1} />
                                        <stop offset="50%" stopColor="#3b82f6" stopOpacity={1} />
                                        <stop offset="100%" stopColor="#60a5fa" stopOpacity={1} />
                                    </linearGradient>
                                    <pattern id="diagonalStripes" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
                                        <line x1="0" y1="0" x2="0" y2="4" stroke="rgba(255,255,255,0.25)" strokeWidth="1.3" />
                                    </pattern>
                                </defs>
                                <CartesianGrid vertical={false} horizontal={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#737373', fontSize: 13, fontWeight: 500 }}
                                    dy={10}
                                />
                                <YAxis hide />
                                <ChartTooltip
                                    content={<ChartTooltipContent hideLabel />}
                                    cursor={{ fill: 'var(--muted)', opacity: 0.2 }}
                                />
                                <Bar
                                    dataKey="value"
                                    fill="url(#barGradient)"
                                    radius={[3, 3, 3, 3]}
                                    barSize={12}
                                    background={{ fill: 'var(--sidebar-accent)', radius: 3 }}
                                />
                                <Bar
                                    dataKey="stripeValue"
                                    fill="url(#diagonalStripes)"
                                    radius={[3, 3, 3, 3]}
                                    barSize={12}
                                    isAnimationActive={false}
                                    tooltipType="none"
                                />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* Email Data Chart */}
                <Card className={`bg-neutral-50/50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-none py-4 px-6 shadow-none rounded-xl ${cardBorderStyles}`}>
                    <CardHeader className="p-0 flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                        <CardTitle className="text-neutral-900 dark:text-neutral-100 text-base font-semibold">Email Data Chart</CardTitle>
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800 px-2.5 py-1 rounded-full shrink-0">
                                <div className="size-2 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,1)]" />
                                <span className="text-neutral-500 dark:text-neutral-400 text-[11px] font-medium whitespace-nowrap">Click Through Rate</span>
                            </div>
                            <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800 px-2.5 py-1 rounded-full shrink-0">
                                <div className="size-2 rounded-full bg-neutral-600 shadow-[0_0_8px_rgba(113,113,122,0.5)]" />
                                <span className="text-neutral-500 dark:text-neutral-400 text-[11px] font-medium whitespace-nowrap">Open Rate</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <ChartContainer config={emailConfig} className="h-[270px] w-full">
                            <AreaChart data={emailData} margin={{ top: 20, right: 20, left: -15, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorCtr" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--color-ctr)" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="var(--color-ctr)" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorOpen" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--color-open)" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="var(--color-open)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis
                                    dataKey="year"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#737373', fontSize: 12, fontWeight: 500 }}
                                    dy={5}
                                />
                                <YAxis
                                    width={80}
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#737373', fontSize: 12, fontWeight: 500, dx: -20 }}
                                    domain={[0, 600]}
                                    tickCount={7}
                                    tickFormatter={(val) => `${val === 0 ? '0' : val}K`}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Area
                                    type="monotone"
                                    dataKey="ctr"
                                    stroke="var(--color-ctr)"
                                    fillOpacity={1}
                                    fill="url(#colorCtr)"
                                    strokeWidth={2}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="open"
                                    stroke="var(--color-open)"
                                    fillOpacity={1}
                                    fill="url(#colorOpen)"
                                    strokeWidth={2}
                                />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Employees Table Card */}
            <Card className={`bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-none py-4 px-4 shadow-none rounded-xl ${cardBorderStyles}`}>
                <CardHeader className="p-0 flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-2 lg:space-y-0">
                    <CardTitle className="text-neutral-900 dark:text-neutral-100 text-base font-semibold">All Employees</CardTitle>
                    <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                        <div className="relative group/search flex-1 min-w-[160px] lg:flex-none lg:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500 group-focus-within/search:text-neutral-900 dark:group-focus-within/search:text-neutral-400 transition-colors" />
                            <Input
                                placeholder="Search"
                                className="h-9! w-full bg-neutral-100 dark:bg-neutral-800! border-neutral-200 dark:border-neutral-800/50 pl-9 text-xs text-neutral-900 dark:text-neutral-300 placeholder:text-neutral-500 rounded-sm focus-visible:ring-0 focus-visible:border-neutral-300 dark:focus-visible:border-neutral-700 transition-all shadow-none"
                            />
                        </div>
                        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                            <Select defaultValue="all">
                                <SelectTrigger className="h-9 w-fit bg-neutral-100 dark:bg-neutral-800/50 border-t border-x-0 border-b-0 border-t-neutral-200 dark:border-t-neutral-700/80 hover:bg-neutral-200 dark:hover:bg-neutral-800 px-2 gap-2 text-neutral-900 dark:text-neutral-100 data-[state=open]:bg-neutral-200 dark:data-[state=open]:bg-neutral-800 focus:ring-1 focus:ring-neutral-200 dark:focus:ring-neutral-700 shadow-none">
                                    <SelectValue placeholder="All Status" />
                                </SelectTrigger>
                                <SelectContent position="popper" align="end" sideOffset={5} className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 min-w-[160px]">
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="fulltime">Full Time</SelectItem>
                                    <SelectItem value="freelance">Freelance</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select defaultValue="all">
                                <SelectTrigger className="h-9 w-fit bg-neutral-100 dark:bg-neutral-800/50 border-t border-x-0 border-b-0 border-t-neutral-200 dark:border-t-neutral-700/80 hover:bg-neutral-200 dark:hover:bg-neutral-800 px-2 gap-2 text-neutral-900 dark:text-neutral-100 data-[state=open]:bg-neutral-200 dark:data-[state=open]:bg-neutral-800 focus:ring-1 focus:ring-neutral-200 dark:focus:ring-neutral-700 shadow-none">
                                    <SelectValue placeholder="All Role" />
                                </SelectTrigger>
                                <SelectContent position="popper" align="end" sideOffset={5} className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 min-w-[160px]">
                                    <SelectItem value="all">All Role</SelectItem>
                                    <SelectItem value="designer">Designer</SelectItem>
                                    <SelectItem value="developer">Developer</SelectItem>
                                </SelectContent>
                            </Select>
                            <Separator orientation="vertical" className="hidden sm:block h-5 bg-neutral-200 dark:bg-neutral-800 mx-1 data-[orientation=vertical]:h-6" />
                            <Button className="text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800/50 border-t border-x-0 border-b-0 border-t-neutral-200 dark:border-t-neutral-700/80 hover:bg-neutral-200 dark:hover:bg-neutral-800 ml-auto sm:ml-0">
                                <Download className="size-3.5" />
                                Export
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <div className="relative overflow-hidden">
                    {/* Header Background */}
                    <div className="absolute top-0 left-0 right-0 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-lg pointer-events-none" />
                    <Table>
                        <TableHeader className="relative border-none">
                            <TableRow className="border-none hover:bg-transparent">
                                <TableHead className="w-12 text-center p-0 max-md:pl-2">
                                    <div className="flex justify-center items-center">
                                        <div className="relative flex items-center justify-center">
                                            <Checkbox
                                                checked="indeterminate"
                                                className="size-4 rounded border-none bg-neutral-700! data-[state=indeterminate]:bg-neutral-800/80 data-[state=indeterminate]:text-neutral-300 data-[state=indeterminate]:border-neutral-700 [&_svg]:size-3"
                                            />
                                            {/* Overwrite the default indicator if needed, but Radix supports indeterminate */}
                                        </div>
                                    </div>
                                </TableHead>
                                <TableHead className="text-neutral-400 text-xs font-semibold h-10">
                                    <div className="flex items-center justify-between gap-1.5 cursor-pointer hover:text-neutral-300 transition-colors px-1">
                                        Employee ID <ChevronsUpDown className="size-3 text-neutral-500" strokeWidth={2.5} />
                                    </div>
                                </TableHead>
                                <TableHead className="text-neutral-400 text-xs font-semibold h-10">
                                    <div className="flex items-center justify-between gap-1.5 cursor-pointer hover:text-neutral-300 transition-colors px-1">
                                        Employee name <ChevronsUpDown className="size-3 text-neutral-500" strokeWidth={2.5} />
                                    </div>
                                </TableHead>
                                <TableHead className="text-neutral-400 text-xs font-semibold h-10">
                                    <div className="flex items-center justify-between gap-1.5 cursor-pointer hover:text-neutral-300 transition-colors px-1">
                                        Email <ChevronsUpDown className="size-3 text-neutral-500" strokeWidth={2.5} />
                                    </div>
                                </TableHead>
                                <TableHead className="text-neutral-400 text-xs font-semibold h-10">
                                    <div className="flex items-center justify-between gap-1.5 cursor-pointer hover:text-neutral-300 transition-colors px-1">
                                        Role <ChevronsUpDown className="size-3 text-neutral-500" strokeWidth={2.5} />
                                    </div>
                                </TableHead>
                                <TableHead className="text-neutral-400 text-xs font-semibold h-10">
                                    <div className="flex items-center justify-between gap-1.5 cursor-pointer hover:text-neutral-300 transition-colors px-1">
                                        Departments <ChevronsUpDown className="size-3 text-neutral-500" strokeWidth={2.5} />
                                    </div>
                                </TableHead>
                                <TableHead className="text-neutral-400 text-xs font-semibold h-10">
                                    <div className="flex items-center justify-between gap-1.5 cursor-pointer hover:text-neutral-300 transition-colors px-1">
                                        Status <ChevronsUpDown className="size-3 text-neutral-500" strokeWidth={2.5} />
                                    </div>
                                </TableHead>
                                <TableHead className="text-neutral-400 text-xs font-semibold h-10 text-right pr-4">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {employees.map((emp, i) => (
                                <TableRow key={i} className="border-neutral-200/50 dark:border-neutral-800/30 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/20 transition-colors group">
                                    <TableCell className="w-12 text-center p-0">
                                        <div className="flex justify-center items-center">
                                            <Checkbox
                                                className="size-4 rounded border-none bg-neutral-100 dark:bg-neutral-800/50 border-t! border-x-0 border-b-0 border-t-neutral-200 dark:border-t-neutral-700/80 hover:bg-neutral-200 dark:hover:bg-neutral-800 data-[state=checked]:bg-blue-600! data-[state=checked]:border-blue-600! transition-all"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-neutral-500 dark:text-neutral-400 text-[13px] font-medium py-4">{emp.id}</TableCell>
                                    <TableCell className="py-4">
                                        <div className="flex items-center gap-2.5">
                                            <img src={emp.image} alt={emp.name} className="size-6 rounded-full object-cover border border-neutral-200 dark:border-neutral-800" />
                                            <span className="text-neutral-900 dark:text-neutral-400 text-xs font-semibold tracking-tight">{emp.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-neutral-500 dark:text-neutral-400 text-xs py-4 font-medium">{emp.email}</TableCell>
                                    <TableCell className="text-neutral-500 dark:text-neutral-400 text-xs py-4 font-medium">{emp.role}</TableCell>
                                    <TableCell className="py-4">
                                        <Badge className="text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800/50 border-t border-x-0 border-b-0 border-t-neutral-200 dark:border-t-neutral-700/80 hover:bg-neutral-200 dark:hover:bg-neutral-800 h-6">
                                            {emp.department}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <Badge
                                            className={`
                                                rounded-full border px-2 py-0.5 text-[11px] font-medium flex items-center gap-1.5 w-fit h-7
                                                ${emp.status === 'Full Time'
                                                    ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/40'
                                                    : 'bg-amber-500/10 text-amber-500 border-amber-500/40'}
                                            `}
                                        >
                                            <div className={`size-1 rounded-full ${emp.status === 'Full Time' ? 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]' : 'bg-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.5)]'}`} />
                                            {emp.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right py-4 pr-1">
                                        <div className="flex items-center justify-end gap-1.5">
                                            <Button variant="ghost" size="icon" className="size-8 text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800/50 border-t border-x-0 border-b-0 border-t-neutral-200 dark:border-t-neutral-700/80 hover:bg-neutral-200 dark:hover:bg-neutral-800">
                                                <EyeIcon className="size-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="size-8 text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800/50 border-t border-x-0 border-b-0 border-t-neutral-200 dark:border-t-neutral-700/80 hover:bg-neutral-200 dark:hover:bg-neutral-800">
                                                <EllipsisVertical className="size-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    )
}

export default OverviewTabContent
