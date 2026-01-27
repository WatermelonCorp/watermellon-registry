"use client";

import {
  Users,
  CheckCircle,
  Briefcase,
  LogIn,
  Clock,
  Calendar,
  BriefcaseBusiness,
  Info,
  ScanFace,
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Label,
} from "recharts";
import { Filter, List, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmployeeTable } from "./employee-table";
import { employees } from "./employees";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const DashboardView = () => {
  const dashboardCards = [
    {
      id: 1,
      title: "TOTAL EMPLOYEES",
      value: "230",
      subtitle: "This month",
      icon: Users,
      bgColor: "bg-blue-500/20",
      iconColor: "text-blue-400",
    },
    {
      id: 2,
      title: "ATTENDANCE TODAY",
      value: "78%",
      subtitle: "228 / 248",
      icon: CheckCircle,
      bgColor: "bg-green-500/20",
      iconColor: "text-green-400",
    },
    {
      id: 3,
      title: "TOTAL PROJECT",
      value: "120",
      subtitle: "This month",
      icon: Briefcase,
      bgColor: "bg-purple-500/20",
      iconColor: "text-purple-400",
    },
    {
      id: 4,
      title: "OPEN POSITIONS",
      value: "18",
      subtitle: "5+ Urgent",
      icon: LogIn,
      bgColor: "bg-yellow-500/20",
      iconColor: "text-yellow-400",
    },
    {
      id: 5,
      title: "PENDING APPROVALS",
      value: "14",
      subtitle: "6 Leaves",
      icon: Clock,
      bgColor: "bg-red-500/20",
      iconColor: "text-red-400",
    },
  ];

  // Attendance Overview Data
  const attendanceData = [
    { day: "Monday", attendance: 65, lateArrival: 45 },
    { day: "Tuesday", attendance: 72, lateArrival: 38 },
    { day: "Wednesday", attendance: 68, lateArrival: 42 },
    { day: "Thursday", attendance: 78, lateArrival: 55 },
    { day: "Friday", attendance: 55, lateArrival: 48 },
    { day: "Saturday", attendance: 48, lateArrival: 35 },
    { day: "Sunday", attendance: 52, lateArrival: 40 },
  ];

  const attendanceChartConfig = {
    attendance: {
      label: "Attendance",
      color: "hsl(0, 0%, 100%)",
    },
    lateArrival: {
      label: "Late arrival",
      color: "hsl(0, 0%, 40%)",
    },
  } satisfies ChartConfig;

  // Working Format Data
  const workingFormatData = {
    total: 230,
    onSite: { percentage: 46.8, color: "#3b82f6" },
    hybrid: { percentage: 26.8, color: "#a855f7" },
    remote: { percentage: 26.4, color: "#06b6d4" },
  };

  // Job Overview Data
  const jobOverviewData = [
    { name: "Active Jobs", value: 40, fill: "#f59e0b" },
    { name: "Interview", value: 20, fill: "#3b82f6" },
    { name: "Remaining", value: 10, fill: "#374151" },
  ];

  const jobChartConfig = {
    activeJobs: {
      label: "Active Jobs",
      color: "#f59e0b",
    },
    interview: {
      label: "Interview",
      color: "#3b82f6",
    },
  } satisfies ChartConfig;

  const totalJobs = 70;

  return (
    <div className="w-full h-full p-5 overflow-y-auto">
      <div className="mb-6">
        <h1 className="text-2xl tracking-tight text-foreground mb-1">
          Welcome To, GR8R HRM!
        </h1>
        <p className="text-sm text-muted-foreground/40">
          Manage candidate and track application
        </p>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {dashboardCards.map((card) => {
          const IconComponent = card.icon;
          return (
            <div
              key={card.id}
              className="bg-neutral-600/10 border rounded-lg border-neutral-400/10 p-3 flex flex-col"
            >
              <div className="flex items-start justify-between mb-1">
                <p className="text-xs text-neutral-700 font-medium tracking">
                  {card.title}
                </p>
                <div className={`bg-neutral-500/15 p-1 rounded`}>
                  <IconComponent className={`size-3 ${card.iconColor}`} />
                </div>
              </div>
              <p className="text-2xl font-medium text-white mb-3">
                {card.value}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-neutral-500 font-medium">
                  {card.subtitle}
                </p>
                <div className="size-5 border-[1.5px] border-dashed rounded-full border-neutral-500" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {/* Attendance Overview Chart */}
        <div className="col-span-2 bg-neutral-600/10 border rounded-lg border-neutral-400/10 p-4">
          <div className="flex items-center justify-between mb-4 border-b-[1.5px] border-neutral-500/20 border-dashed pb-4">
            <div className="flex items-center gap-2">
              <div className="bg-neutral-500/10 p-1 rounded">
                <Calendar className="size-4 text-orange-400" />
              </div>
              <h3 className="text-sm font-medium text-white">
                Attendance Overview
              </h3>
            </div>
            <div className="flex items-center gap-1 bg-neutral-600/50 rounded-md p-1">
              <button className="px-3 py-1 text-xs text-white bg-neutral-900 rounded">
                Last 7 days
              </button>
              <button className="px-3 py-1 text-xs text-neutral-400 hover:text-white">
                Last 30 days
              </button>
              <button className="px-3 py-1 text-xs text-neutral-400 hover:text-white">
                Last Year
              </button>
            </div>
          </div>

          <ChartContainer
            config={attendanceChartConfig}
            className="h-[270px] w-full"
          >
            <AreaChart
              data={attendanceData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="attendanceGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
                vertical={true}
                horizontal={false}
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                dy={5}
                tickMargin={8}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                tickFormatter={(value) => `${value}%`}
                domain={[0, 100]}
                dx={-10}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(_value, name) => {
                      if (name === "attendance") {
                        return (
                          <div className="flex flex-col gap-1">
                            <div className="flex justify-between gap-4">
                              <span>Present:</span>
                              <span className="font-medium">180</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span>Absent:</span>
                              <span className="font-medium">40</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span>On Leave:</span>
                              <span className="font-medium">08</span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="lateArrival"
                stroke="rgba(255,255,255,0.3)"
                strokeDasharray="5 5"
                fill="transparent"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="attendance"
                stroke="rgba(255,255,255,0.9)"
                fill="url(#attendanceGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>

          {/* Legend and Footer */}
          <div className="flex items-center justify-between mt-6 border-t-[1.5px] border-neutral-500/20 border-dashed pt-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-white/80 rounded-sm" />
                <span className="text-xs text-neutral-400">Attendance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-neutral-500 rounded-sm" />
                <span className="text-xs text-neutral-400">Late arrival</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-neutral-400">
              <Info className="size-4" />
              <span>78% </span>
              <span className="text-neutral-500"> Attendance Today</span>
            </div>
          </div>
        </div>

        {/* Right Side Charts */}
        <div className="flex flex-col gap-4">
          {/* Working Format */}
          <div className="bg-neutral-600/10 border rounded-lg border-neutral-400/10 p-4">
            <div className="flex items-center gap-2 mb-4 border-b-[1.5px] border-neutral-500/20 border-dashed pb-4">
              <div className="bg-neutral-500/10 p-1 rounded">
                <Users className="size-4 text-blue-400" />
              </div>
              <h3 className="text-sm font-medium text-white">Working Format</h3>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-neutral-400">TOTAL EMPLOYEES</span>
              <span className="text-lg font-semibold text-white">
                {workingFormatData.total}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-neutral-700 rounded-full overflow-hidden flex">
              <div
                className="h-full bg-blue-500"
                style={{ width: `${workingFormatData.onSite.percentage}%` }}
              />
              <div
                className="h-full bg-purple-500"
                style={{ width: `${workingFormatData.hybrid.percentage}%` }}
              />
              <div
                className="h-full bg-cyan-500"
                style={{ width: `${workingFormatData.remote.percentage}%` }}
              />
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-5 border-t-[1.5px] border-neutral-500/20 border-dashed pt-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-xs text-neutral-400">
                  {workingFormatData.onSite.percentage}% On Site
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span className="text-xs text-neutral-400">
                  {workingFormatData.hybrid.percentage}% Hybrid
                </span>
              </div>
            </div>
          </div>

          {/* Job Overview */}
          <div className="bg-neutral-600/10 border rounded-lg border-neutral-400/10 p-4">
            <div className="flex items-center gap-2 mb-4 border-b-[1.5px] border-neutral-500/20 border-dashed pb-3">
              <div className="bg-neutral-500/10 p-1 rounded">
                <BriefcaseBusiness className="size-4 text-green-400" />
              </div>
              <h3 className="text-sm font-medium text-white">Job Overview</h3>
            </div>

            <ChartContainer
              config={jobChartConfig}
              className="!aspect-auto h-[90px] w-full"
            >
              <PieChart>
                <Pie
                  data={jobOverviewData}
                  cx="50%"
                  cy="100%"
                  innerRadius={60}
                  outerRadius={80}
                  startAngle={180}
                  endAngle={0}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {jobOverviewData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 20}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) - 35}
                              className="fill-white text-2xl font-bold"
                            >
                              {totalJobs}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) - 18}
                              className="fill-neutral-400 text-[10px]"
                            >
                              TOTAL JOBS
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 border-t-[1.5px] border-neutral-500/20 border-dashed pt-3 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full" />
                <span className="text-xs text-neutral-400">40 Active Jobs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-xs text-neutral-400">20 Interview</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-neutral-500/10 p-4 rounded-lg border border-neutral-400/15 mt-5">
        <div className=" flex items-center justify-between">
          {/* Left - View Tabs */}
          <Tabs defaultValue="list" className="w-full gap-4">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-neutral-500/10 p-1.5 rounded">
                  <ScanFace className="size-4 text-orange-400" />
                </div>
                <h3 className=" font-medium text-white">
                  Employee Activities
                </h3>
              </div>

              <div className="flex gap-2">
                <TabsList className="bg-neutral-300/10 border border-neutral-300/20 rounded-md h-9 p-1">
                  <TabsTrigger
                    value="list"
                    className="gap-2 dark:data-[state=active]:bg-neutral-900 h-7"
                  >
                    <List className="size-4" />
                    List View
                  </TabsTrigger>
                  <TabsTrigger
                    value="board"
                    className="gap-2 dark:data-[state=active]:bg-neutral-900 h-7"
                  >
                    <LayoutGrid className="size-4" />
                    Board View
                  </TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <Select defaultValue="pipeline-value">
                    <SelectTrigger
                      size="sm"
                      className="w-fit py-[17px] text-xs bg-neutral-800"
                    >
                      <span className="text-neutral-400 text-xs">Status</span>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-900 border-neutral-700">
                      <SelectItem value="pipeline-value">All</SelectItem>
                      <SelectItem value="name">Active</SelectItem>
                      <SelectItem value="activity">On Leave</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon" className="!size-9">
                    <Filter className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
            <TabsContent value="list">
              <EmployeeTable employees={employees} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
