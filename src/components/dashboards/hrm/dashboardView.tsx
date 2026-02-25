"use client";

import {
  Users,
  Calendar,
  BriefcaseBusiness,
  Info,
  ScanFace,
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./components/ui/chart";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Label as RechartsLabel,
} from "recharts";
import { Filter, List, LayoutGrid } from "lucide-react";
import { Button } from "./components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { EmployeeTable } from "./components/employee-table";
import {
  employees,
  dashboardCards,
  attendanceData,
  attendanceChartConfig,
  workingFormatData,
  jobOverviewData,
  jobChartConfig,
  totalJobs
} from "./data";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";

export const DashboardView = () => {
  return (
    <div className="min-h-full w-full p-6">
      <div className="mb-6">
        <h1 className="text-2xl tracking-tight text-foreground mb-1">
          Welcome To, GR8R HRM!
        </h1>
        <p className="text-sm text-muted-foreground/40">
          Manage candidate and track application
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {dashboardCards.map((card) => {
          const IconComponent = card.icon;
          return (
            <div
              key={card.id}
              className="bg-card border rounded-lg border-border p-3 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-1">
                <p className="text-xs text-muted-foreground font-medium tracking">
                  {card.title}
                </p>
                <div className={`bg-muted p-1 rounded`}>
                  <IconComponent className={`size-3 ${card.iconColor}`} />
                </div>
              </div>
              <p className="text-2xl font-medium text-foreground mb-3">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {/* Attendance Overview Chart */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-card border rounded-lg border-border p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md group">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 border-b-[1.5px] border-border border-dashed pb-4">
            <div className="flex items-center gap-2">
              <div className="bg-muted p-1 rounded">
                <Calendar className="size-4 text-orange-400" />
              </div>
              <h3 className="text-sm font-medium text-foreground">
                Attendance Overview
              </h3>
            </div>
            <Tabs defaultValue="7days" className="w-fit">
              <TabsList className="bg-neutral-300/10 border border-neutral-300/20 rounded-md p-1 h-9 items-center gap-1">
                <TabsTrigger
                  value="7days"
                  className="px-3 text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-900 h-7 transition-all duration-300 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 dark:hover:text-foreground cursor-pointer"
                >
                  Last 7 days
                </TabsTrigger>
                <TabsTrigger
                  value="30days"
                  className="px-3 text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-900 h-7 transition-all duration-300 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 dark:hover:text-foreground cursor-pointer"
                >
                  Last 30 days
                </TabsTrigger>
                <TabsTrigger
                  value="year"
                  className="px-3 text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-900 h-7 transition-all duration-300 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 dark:hover:text-foreground cursor-pointer"
                >
                  Last Year
                </TabsTrigger>
              </TabsList>
            </Tabs>
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
                  <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--border)"
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
                    formatter={(_, name) => {
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
                stroke="var(--muted-foreground)"
                strokeOpacity={0.3}
                strokeDasharray="5 5"
                fill="transparent"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="attendance"
                stroke="var(--chart-2)"
                fill="url(#attendanceGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>

          {/* Legend and Footer */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6 border-t-[1.5px] border-border border-dashed pt-4">
            <div className="flex max-md:justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-chart-2 rounded-sm" />
                <span className="text-xs text-muted-foreground">Attendance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-muted-foreground/30 rounded-sm" />
                <span className="text-xs text-muted-foreground">Late arrival</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Info className="size-4" />
              <span>78% </span>
              <span className="text-muted-foreground/60"> Attendance Today</span>
            </div>
          </div>
        </div>

        {/* Right Side Charts */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col md:flex-row lg:flex-col gap-4">
          {/* Working Format */}
          <div className="flex-1 bg-card border rounded-lg border-border p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md group">
            <div className="flex items-center gap-2 mb-4 border-b-[1.5px] border-border border-dashed pb-4">
              <div className="bg-muted p-1 rounded">
                <Users className="size-4 text-blue-400" />
              </div>
              <h3 className="text-sm font-medium text-foreground">Working Format</h3>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-muted-foreground">TOTAL EMPLOYEES</span>
              <span className="text-lg font-semibold text-foreground">
                {workingFormatData.total}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden flex">
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
            <div className="flex items-center gap-4 mt-5 border-t-[1.5px] border-border border-dashed pt-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-xs text-muted-foreground">
                  {workingFormatData.onSite.percentage}% On Site
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span className="text-xs text-muted-foreground">
                  {workingFormatData.hybrid.percentage}% Hybrid
                </span>
              </div>
            </div>
          </div>

          {/* Job Overview */}
          <div className="flex-1 bg-card border rounded-lg border-border p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md group">
            <div className="flex items-center gap-2 mb-4 border-b-[1.5px] border-border border-dashed pb-3">
              <div className="bg-muted p-1 rounded">
                <BriefcaseBusiness className="size-4 text-green-400" />
              </div>
              <h3 className="text-sm font-medium text-foreground">Job Overview</h3>
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
                  <RechartsLabel
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
                              className="fill-foreground text-2xl font-bold"
                            >
                              {totalJobs}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) - 18}
                              className="fill-muted-foreground text-[10px]"
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
            <div className="flex items-center justify-center gap-6 border-t-[1.5px] border-border border-dashed pt-3 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full" />
                <span className="text-xs text-muted-foreground">40 Active Jobs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-xs text-muted-foreground">20 Interview</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-muted/40 p-4 rounded-lg border border-border mt-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md group">
        <div className=" flex items-center justify-between">
          {/* Left - View Tabs */}
          <Tabs defaultValue="list" className="w-full gap-4">
            <div className="flex w-full flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="bg-muted p-1.5 rounded">
                  <ScanFace className="size-4 text-orange-400" />
                </div>
                <h3 className=" font-medium text-foreground">
                  Employee Activities
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2 max-md:justify-end">
                <TabsList className="bg-neutral-300/10 border max-md:w-full max-md:h-10 border-neutral-300/20 rounded-md h-9 p-1 gap-1">
                  <TabsTrigger
                    value="list"
                    className="gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-900 h-7 max-md:h-8 transition-all duration-300 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 dark:hover:text-foreground cursor-pointer"
                  >
                    <List className="size-4" />
                    List View
                  </TabsTrigger>
                  <TabsTrigger
                    value="board"
                    className="gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-900 h-7 max-md:h-8 transition-all duration-300 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 dark:hover:text-foreground cursor-pointer"
                  >
                    <LayoutGrid className="size-4" />
                    Board View
                  </TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <Select defaultValue="pipeline-value">
                    <SelectTrigger
                      size="sm"
                      className="w-fit py-[17px] text-xs bg-muted/50 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer hover:shadow-sm"
                    >
                      <span className="text-muted-foreground text-xs">Status</span>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="pipeline-value" className="cursor-pointer focus:bg-neutral-100 dark:focus:bg-neutral-800">All</SelectItem>
                      <SelectItem value="name" className="cursor-pointer focus:bg-neutral-100 dark:focus:bg-neutral-800">Active</SelectItem>
                      <SelectItem value="activity" className="cursor-pointer focus:bg-neutral-100 dark:focus:bg-neutral-800">On Leave</SelectItem>
                    </SelectContent>
                  </Select>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="icon" className="!size-9 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer hover:shadow-sm">
                        <Filter className="size-4 transition-transform duration-300 group-hover:scale-110" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-4" align="end">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Filter Employees</h4>
                          <p className="text-sm text-muted-foreground">
                            Set the properties to refine the list.
                          </p>
                        </div>
                        <div className="grid gap-3">
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="department">Department</Label>
                            <Select defaultValue="all">
                              <SelectTrigger id="department" className="col-span-2 h-8">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Departments</SelectItem>
                                <SelectItem value="engineering">Engineering</SelectItem>
                                <SelectItem value="design">Design</SelectItem>
                                <SelectItem value="marketing">Marketing</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="search">Search</Label>
                            <Input
                              id="search"
                              placeholder="Name or Email..."
                              className="col-span-2 h-8"
                            />
                          </div>
                          <Button className="w-full mt-2" size="sm">Apply Filters</Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
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
