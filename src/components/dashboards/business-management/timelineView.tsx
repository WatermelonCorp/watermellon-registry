"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/component@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/component@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/component@/components/ui/select";
import { Switch } from "@/component@/components/ui/switch";
import { Button } from "@/component@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/component@/components/ui/avatar";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/component@/components/ui/chart";
import {
    ComposedChart,
    Bar,
    Line,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
} from "recharts";
import {
    Search,
    Calendar,
    Download,
    MessageSquare,
    MoreVertical,
    TrendingUp,
    TrendingDown,
    Clock,
    UserPlus,
    MapPin,
    Link2,
    CreditCard,
    ArrowRight,
    Plus,
    Inbox,
    Bell,
    Flag,
    MoveRight,
    Locate,
    Layers2,
    MessageSquareText,
    UserX,
    CalendarX,
    Star,
    Timer,
    type LucideIcon,
    Users,
    Zap,
    ChartColumnBig,
} from "lucide-react";
import { Input } from "@/component@/components/ui/input";
import { Separator } from "@/component@/components/ui/separator";

// Sample data for the metrics cards
const metricsData: {
    title: string;
    value: string;
    trend: string;
    trendUp: boolean;
    color: string;
    icon: LucideIcon;
}[] = [
        {
            title: "Avg. lates",
            value: "9%",
            trend: "+3.6%",
            trendUp: true,
            color: "bg-orange-500",
            icon: Clock,
        },
        {
            title: "Avg. no shows",
            value: "4%",
            trend: "-2.6%",
            trendUp: false,
            color: "bg-blue-500",
            icon: UserX,
        },
        {
            title: "Avg. dropped shifts",
            value: "6%",
            trend: "-7.9%",
            trendUp: false,
            color: "bg-yellow-500",
            icon: CalendarX,
        },
        {
            title: "Avg. shift score",
            value: "4.5",
            trend: "+12%",
            trendUp: true,
            color: "bg-green-500",
            icon: Star,
        },
        {
            title: "Avg. Tenure",
            value: "121 days",
            trend: "-1.1%",
            trendUp: false,
            color: "bg-pink-500",
            icon: Timer,
        },
    ];

// Sample data for team performance table
const teamData = [
    {
        id: 1,
        name: "Sophie Tan",
        avatar: "/avatars/sophie.jpg",
        lates: "1 last week",
        latesUp: true,
        shifts: "3 last week",
        shiftsUp: true,
        latePercent: "12% last week",
        latePercentUp: true,
    },
    {
        id: 2,
        name: "Ryan Lee",
        avatar: "/avatars/ryan.jpg",
        lates: "1 last week",
        latesUp: true,
        shifts: "1 last week",
        shiftsUp: true,
        latePercent: "21% last week",
        latePercentUp: false,
    },
    {
        id: 3,
        name: "Mina Choi",
        avatar: "/avatars/mina.jpg",
        lates: "1 last week",
        latesUp: true,
        shifts: "4 last week",
        shiftsUp: true,
        latePercent: "11% last week",
        latePercentUp: false,
    },
    {
        id: 4,
        name: "David Lim",
        avatar: "/avatars/david.jpg",
        lates: "1 last week",
        latesUp: true,
        shifts: "1 last week",
        shiftsUp: true,
        latePercent: "8% last week",
        latePercentUp: false,
    },
    {
        id: 5,
        name: "James Park",
        avatar: "/avatars/james.jpg",
        lates: "2 last week",
        latesUp: false,
        shifts: "1 last week",
        shiftsUp: true,
        latePercent: "9% last week",
        latePercentUp: false,
    },
];

// Sample data for Sales vs Labor chart
// The projected sales line follows its own independent trend
// Sample data for Sales vs Labor chart
// The projected sales line follows its own independent trend
const salesLaborData = [
    { date: "", projectedSales: 110 },
    { date: "Sep 20", actualSales: 130, actualLabor: 110, projectedSales: 115 },
    { date: "", projectedSales: 112 },
    { date: "Sep 21", actualSales: 145, actualLabor: 120, projectedSales: 108 },
    { date: "", projectedSales: 115 },
    { date: "Sep 22", actualSales: 165, actualLabor: 190, projectedSales: 118 },
    { date: "", projectedSales: 110 },
    { date: "Sep 23", actualSales: 125, actualLabor: 115, projectedSales: 108 },
    { date: "", projectedSales: 115 },
    { date: "Sep 24", actualSales: 180, actualLabor: 155, projectedSales: 112 },
    { date: "", projectedSales: 108 },
    { date: "Sep 25", actualSales: 125, actualLabor: 102, projectedSales: 105 },
    { date: "", projectedSales: 102 },
    { date: "Sep 26", actualSales: 135, actualLabor: 170, projectedSales: 100 },
    { date: "", projectedSales: 105 },
    { date: "Sep 27", actualSales: 122, actualLabor: 112, projectedSales: 108 },
    { date: "", projectedSales: 125 },
    { date: "Sep 28", actualSales: 185, actualLabor: 125, projectedSales: 140 },
    { date: "", projectedSales: 150 },
    { date: "Sep 29", actualSales: 112, actualLabor: 118, projectedSales: 155 },
    { date: "", projectedSales: 152 },
    { date: "Sep 30", actualSales: 82, actualLabor: 82, projectedSales: 148 },
    { date: "", projectedSales: 152 },
    { date: "Oct 1", actualSales: 138, actualLabor: 188, projectedSales: 155 },
    { date: "", projectedSales: 140 },
    { date: "Oct 2", actualSales: 108, actualLabor: 115, projectedSales: 130 },
    { date: "", projectedSales: 135 },
    { date: "Oct 3", actualSales: 115, actualLabor: 115, projectedSales: 140 },
    { date: "", projectedSales: 148 },
    { date: "Oct 4", actualSales: 122, actualLabor: 155, projectedSales: 155 },
    { date: "", projectedSales: 162 },
    { date: "Oct 5", actualSales: 108, actualLabor: 118, projectedSales: 168 },
    { date: "", projectedSales: 162 },
    { date: "Oct 6", actualSales: 188, actualLabor: 128, projectedSales: 160 },
    { date: "", projectedSales: 170 },
    { date: "Oct 7", actualSales: 82, actualLabor: 82, projectedSales: 178 },
    { date: "", projectedSales: 175 },
    { date: "Oct 8", actualSales: 122, actualLabor: 122, projectedSales: 172 },
    { date: "", projectedSales: 178 },
    { date: "Oct 9", actualSales: 138, actualLabor: 188, projectedSales: 180 },
    { date: " ", projectedSales: 182 },
];

const chartConfig = {
    actualSales: {
        label: "Actual sales",
        color: "#a855f7",
    },
    actualLabor: {
        label: "Actual labor",
        color: "#22c55e",
    },
    projectedSales: {
        label: "Projected sales",
        color: "#f97316",
    },
};

// Action items data
const actionItems = [
    {
        icon: Clock,
        title: "2 time off request",
        action: null,
        actionText: null,
        hasArrow: true,
    },
    {
        icon: UserPlus,
        title: "1 employee to invite",
        action: "invite",
        actionText: "Invite employee",
        hasArrow: false,
    },
    {
        icon: MapPin,
        title: "Add more location",
        action: "add",
        actionText: "Add location",
        hasArrow: false,
    },
    {
        icon: Link2,
        title: "Connect your PoS",
        action: null,
        actionText: null,
        hasArrow: true,
    },
    {
        icon: CreditCard,
        title: "Connect your payroll",
        action: null,
        actionText: null,
        hasArrow: true,
    },
];

export const TimelineView = () => {
    const [periodType, setPeriodType] = useState<"week" | "month">("week");
    const [demoDataEnabled, setDemoDataEnabled] = useState(true);

    return (
        <div className="w-full h-full overflow-y-auto p-5 space-y-5">
            {/* Header Section */}
            <div className="flex flex-col gap-4">
                {/* Top Row: Search and Actions */}
                <div className="flex items-center justify-between">
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search"
                            className="pl-10 bg-muted/50 border-muted"
                        />
                        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground bg-neutral-800 px-1.5 py-0.5 rounded">
                            /
                        </kbd>
                    </div>
                    <div className="flex items-center">
                        <Button variant="outline" size="sm" className="gap-1">
                            <Plus className="size-3.5 text-neutral-500" />
                            Add
                        </Button>
                        <Separator
                            orientation="vertical"
                            className="mx-2 data-[orientation=vertical]:h-4"
                        />
                        <div className="flex items-center gap-1">
                            <Flag className="size-3 text-orange-500 fill-orange-500" />
                            <span className="text-xs font-medium">
                                1/4
                            </span>
                        </div>
                        <Separator
                            orientation="vertical"
                            className="mx-2 data-[orientation=vertical]:h-4"
                        />
                        <div className="flex items-center gap-2 text-sm text-neutral-500">
                            <Inbox className="size-4" />
                            <Bell className="size-4" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col">
                    {/* Title Row */}
                    <h1 className="text-lg font-semibold mb-4">Here&apos;s whats happening</h1>

                    {/* Filter Row */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            {/* Week/Month Toggle */}
                            <div className="flex rounded-md overflow-hidden p-0.5 bg-muted gap-0.5">
                                <button
                                    onClick={() => setPeriodType("week")}
                                    className={`px-2 py-1 text-sm transition-colors rounded-sm ${periodType === "week"
                                        ? "bg-background text-foreground"
                                        : "text-neutral-500 hover:bg-background/50"
                                        }`}
                                >
                                    Week
                                </button>
                                <button
                                    onClick={() => setPeriodType("month")}
                                    className={`px-2 py-1 text-sm transition-colors rounded-sm ${periodType === "month"
                                        ? "bg-background text-foreground"
                                        : "text-neutral-500 hover:bg-background/50"
                                        }`}
                                >
                                    Month
                                </button>
                            </div>
                            <Separator
                                orientation="vertical"
                                className="mx-2 data-[orientation=vertical]:h-4"
                            />

                            {/* Date Range */}
                            <Button variant="outline" size="sm" className="gap-2 !bg-transparent tracking-tight font-normal">
                                <Calendar className="h-4 w-4 text-neutral-500" />
                                Sep 28, 2025 <MoveRight className="h-4 w-4 text-neutral-500" /> Oct 4, 2025
                            </Button>
                        </div>

                        <div className="flex items-center">
                            {/* Demo Data Toggle */}
                            <div className="flex items-center gap-1.5">
                                <Switch
                                    className=""
                                    checked={demoDataEnabled}
                                    onCheckedChange={setDemoDataEnabled}
                                />
                                <span className="text-sm tracking-tight">
                                    Try to engage with demo data
                                </span>
                            </div>

                            <Separator
                                orientation="vertical"
                                className="mx-2 data-[orientation=vertical]:h-4"
                            />

                            {/* Export Button */}
                            <Button size="sm" className="gap-2">
                                <Download className="si" />
                                Export
                            </Button>
                        </div>
                    </div>

                    <Separator
                        orientation="horizontal"
                        className="my-2.5 border-t-[1.5px] border-dashed border-neutral-800 bg-transparent"
                    />

                    {/* Company/Department Filter Row */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Select defaultValue="acme">
                                <SelectTrigger size="sm" className="px-2 w-fit !bg-background">
                                    <div className="flex items-center gap-1.5">
                                        <MapPin />
                                        <SelectValue placeholder="Company" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="acme">Acme inc</SelectItem>
                                    <SelectItem value="other">Other Corp</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select defaultValue="all">
                                <SelectTrigger size="sm" className="px-2 w-fit !bg-background">
                                    <div className="flex items-center gap-1.5">
                                        <Layers2 />
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

                        <Button variant="outline" size="sm" className="font-normal">
                            <MessageSquareText className="size-3.5 text-neutral-500" />
                            Feedback
                        </Button>
                    </div>
                </div>
            </div>

            {/* Metrics Cards Row */}
            <div className="grid grid-cols-5 gap-4">
                {metricsData.map((metric, index) => (
                    <Card key={index} className=" border-border p-4 bg-background gap-0">
                        <CardHeader className="flex items-center justify-between p-0 mb-1">
                            <div className="flex items-center gap-2">
                                <span className={`size-4 rounded ${metric.color} flex items-center justify-center`}>
                                    <metric.icon className="size-2.5 text-white" strokeWidth={2.5} />
                                </span>
                                <CardTitle className="text-base font-medium">
                                    {metric.title}
                                </CardTitle>
                            </div>
                            <Button variant="ghost" size="icon" className="size-4">
                                <MoreVertical className="size-4 text-neutral-500" />
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="text-xl font-semibold mb-3">{metric.value}</div>
                            <div className="flex items-center justify-between gap-1 mt-1">
                                <span className="text-xs text-neutral-500 font-medium">vs last week</span>
                                <span
                                    className={`text-xs flex items-center gap-0.5 ${metric.trendUp ? "text-red-400" : "text-green-400"
                                        }`}
                                >
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
            <div className="grid grid-cols-3 gap-5">
                {/* Team Performances Breakdown Table */}
                <Card className="col-span-2 bg-background border-border p-4 gap-3">
                    <CardHeader className="flex flex-row items-center gap-2 p-0">
                        <span className="size-4  rounded bg-green-500 flex items-center justify-center">
                            <Users className="size-2.5 text-white" />
                        </span>
                        <CardTitle className="text-sm font-medium">
                            Team Performances Breakdown
                        </CardTitle>
                        <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto">
                            <MoreVertical className="h-3 w-3" />
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="border border-border rounded-lg overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-border hover:bg-muted bg-muted">
                                        <TableHead className="text-xs text-muted-foreground font-normal pl-4">
                                            Employee
                                        </TableHead>
                                        <TableHead className="text-xs text-muted-foreground font-normal">
                                            Lates
                                        </TableHead>
                                        <TableHead className="text-xs text-muted-foreground font-normal">
                                            Shifts
                                        </TableHead>
                                        <TableHead className="text-xs text-muted-foreground font-normal">
                                            Late (%)
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {teamData.map((member) => (
                                        <TableRow key={member.id} className="border-border">
                                            <TableCell className="pl-4 border-r border-border">
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
                                            <TableCell className="border-r border-border">
                                                <div className="flex items-center gap-1">
                                                    <span className={`flex items-center gap-0.5 ${member.latesUp ? "text-red-400" : "text-green-400"}`}>
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
                                            <TableCell className="border-r border-border">
                                                <div className="flex items-center gap-1">
                                                    <span className={`flex items-center gap-0.5 ${member.shiftsUp ? "text-red-400" : "text-green-400"}`}>
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
                                                    <span className={`flex items-center gap-0.5 ${member.latePercentUp ? "text-red-400" : "text-green-400"}`}>
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
                    </CardContent>
                </Card>

                {/* Action and Updates Card */}
                <Card className="bg-background border-border p-4">
                    <CardHeader className="flex flex-row items-center gap-2 p-0">
                        <span className="size-4 flex items-center justify-center rounded bg-purple-400">
                            <Zap className="size-2.5 text-white" strokeWidth={2.5} />
                        </span>
                        <CardTitle className="text-sm font-medium">Action and updates</CardTitle>
                        <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto">
                            <MoreVertical className="h-3 w-3 text-neutral-500" />
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="flex flex-col">
                            {actionItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between border-t-[1.5px] border-dashed py-[12.5px]"
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon className="h-4 w-4 text-neutral-500" />
                                        <span className="text-sm">{item.title}</span>
                                    </div>
                                    {item.actionText ? (
                                        <Button variant="outline" size="sm" className="h-7 text-xs">
                                            {item.actionText}
                                        </Button>
                                    ) : (
                                        <Button variant="outline" size="icon" className="h-7 w-7">
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
            <Card className="bg-background border-border p-4">
                <CardHeader className="flex items-center justify-between p-0">
                    <div className="flex items-center gap-2">
                        <span className="size-4 rounded bg-orange-500 flex items-center justify-center">
                            <ChartColumnBig className="size-3" strokeWidth={2.5} />
                        </span>
                        <CardTitle className="text-sm font-medium">Sales vs Labor</CardTitle>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-purple-500"></span>
                            <span className="text-xs text-muted-foreground">Actual sales</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
                            <span className="text-xs text-muted-foreground">Actual labor</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="h-0.5 w-4 bg-orange-500"></span>
                            <span className="text-xs text-muted-foreground">Projected sales</span>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreVertical className="h-3 w-3 text-neutral-500" />
                    </Button>
                </CardHeader>
                <CardContent className="p-0">
                    <ChartContainer config={chartConfig} className="h-[150px] w-full">
                        <ComposedChart
                            data={salesLaborData}
                            margin={{
                                top: 5,
                                left: 0,
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
                                padding={{ left: -15, right: -15 }}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => `$${value}`}
                                domain={[50, 200]}
                                ticks={[50, 100, 150, 200]}
                                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))", fontWeight: 500 }}
                                width={40}
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
                </CardContent>
            </Card>
        </div>
    );
};
