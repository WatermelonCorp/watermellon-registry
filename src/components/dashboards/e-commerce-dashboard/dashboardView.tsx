"use client";

import {
  IconArrowNarrowDownDashed,
  IconArrowNarrowRight,
  IconArrowNarrowUpDashed,
  IconTrendingUp,
  IconDotsVertical,
  IconEye,
  IconReceiptRefund,
  IconMessageCircle,
} from "@tabler/icons-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { Badge } from "./components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { dashboardMetrics, revenueData, transactions, trafficChannelData } from "./data";

export const DashboardView = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4 p-4 lg:p-6 min-w-0">
      <div className="flex flex-col xl:flex-row gap-4 min-w-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 min-w-0">
          {dashboardMetrics.map((metric) => {
            const TrendIcon =
              metric.trend === "up"
                ? IconArrowNarrowUpDashed
                : IconArrowNarrowDownDashed;
            return (
              <Card
                key={metric.id}
                className="shadow-none bg-neutral-200/60 dark:bg-neutral-900 p-1 gap-0 border border-neutral-300 dark:border-neutral-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98] cursor-pointer group"
              >
                <div className="bg-white dark:bg-neutral-950 w-full h-full flex flex-col rounded-lg p-4 gap-4 border border-neutral-300 dark:border-neutral-800">
                  <CardHeader className="p-0 gap-1.5 w-full text-left">
                    <CardDescription className="wrap-break-word whitespace-normal">
                      {metric.label}
                    </CardDescription>
                    <CardTitle className="text-xl sm:text-2xl font-bold tabular-nums break-all whitespace-normal">
                      {metric.value}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-x-3 gap-y-1.5 items-center p-0 w-full">
                    <div className="flex items-center gap-1 shrink-0 font-medium whitespace-nowrap">
                      <TrendIcon
                        className={`size-5 shrink-0 ${metric.trend === "up"
                          ? "text-green-600"
                          : "text-red-600"
                          }`}
                        strokeWidth={2.5}
                      />
                      {metric.trendValue}
                    </div>
                    <div className="text-muted-foreground text-sm leading-tight whitespace-nowrap">
                      {metric.helperText}
                    </div>
                  </CardContent>
                </div>
                <CardFooter className="py-1.5 px-2">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toast.success(`Generated ${metric.label} Report`, {
                        description: `Your report for ${metric.label} is ready to view.`,
                      });
                    }}
                    className="font-medium hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center justify-between w-full text-neutral-700 dark:text-neutral-300 text-sm transition-colors duration-300"
                  >
                    <span>View Report</span>
                    <IconArrowNarrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Revenue Chart */}
        <Card className="w-full xl:w-2xl min-w-0 shadow-none bg-neutral-200/60 dark:bg-neutral-900 p-1 gap-0 border border-neutral-300 dark:border-neutral-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <div className="bg-white dark:bg-neutral-950 w-full h-full flex flex-col rounded-lg p-5 gap-8 border border-neutral-300 dark:border-neutral-800">
            <CardHeader className="flex flex-row items-center justify-between p-0">
              <div>
                <CardTitle>Revenue</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-2xl font-bold">$85,400.12</span>
                  <Badge className="flex items-center gap-1">
                    <IconTrendingUp className="size-3" />
                    +10%
                  </Badge>
                </div>
              </div>
              <Select defaultValue="month" onValueChange={(val) => toast.info(`Revenue graph updated to show: ${val}`)}>
                <SelectTrigger className="w-24 shadow-none border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-950 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="quarter">Quarter</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 p-0">
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>Profit</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-200"></div>
                  <span>Loss</span>
                </div>
              </div>
              <div className="w-full h-48 -ml-5">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={revenueData}
                    margin={{ left: 15, right: 0, top: 10, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorProfit"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3b82f6"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3b82f6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorLoss"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#bfdbfe"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#bfdbfe"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="opacity-100 dark:opacity-10" />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#6b7280", fontSize: 12 }}
                      tickMargin={12}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#6b7280", fontSize: 12 }}
                      tickMargin={12}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--background)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                      }}
                      formatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Area
                      type="monotone"
                      dataKey="profit"
                      stroke="#3b82f6"
                      fillOpacity={1}
                      fill="url(#colorProfit)"
                    />
                    <Area
                      type="monotone"
                      dataKey="loss"
                      stroke="#bfdbfe"
                      fillOpacity={1}
                      fill="url(#colorLoss)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 min-w-0">
        <Card className="flex-1 min-w-0 shadow-none bg-neutral-200/60 dark:bg-neutral-900 p-1 gap-0 border border-neutral-300 dark:border-neutral-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <div className="bg-white dark:bg-neutral-950 w-full h-full flex flex-col rounded-lg p-4 gap-4 border border-neutral-300 dark:border-neutral-800">
            <CardHeader className="flex flex-row items-center justify-between p-0">
              <CardTitle className="text-xl font-semibold tracking-tight">
                Recent Transaction
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-b dark:border-neutral-800 hover:bg-transparent">
                    <TableHead className="font-medium text-muted-foreground w-[220px]">
                      Transaction ID
                    </TableHead>
                    <TableHead className="font-medium text-muted-foreground">
                      Date
                    </TableHead>
                    <TableHead className="text-center font-medium text-muted-foreground">
                      Status
                    </TableHead>
                    <TableHead className="text-right font-medium text-muted-foreground w-[100px]">
                      Amount
                    </TableHead>
                    <TableHead className="text-right font-medium text-muted-foreground w-[80px]">
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all duration-300 hover:scale-[1.01] hover:shadow-sm cursor-pointer border-transparent hover:border-neutral-200 dark:hover:border-neutral-700">
                      <TableCell className="py-2 lg:py-4">
                        <div className="flex flex-col xl:flex-row xl:items-center gap-2 xl:gap-3">
                          <div
                            className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center text-sm font-semibold dark:bg-neutral-800 ${transaction.iconBg}`}
                          >
                            <transaction.icon className="size-4 text-neutral-500" />
                          </div>
                          <span className="font-medium whitespace-nowrap">
                            {transaction.id}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-2 lg:py-4 text-muted-foreground whitespace-nowrap">
                        {transaction.date}
                      </TableCell>
                      <TableCell className="py-2 lg:py-4 text-center">
                        <Badge className={`${transaction.statusColor} shrink-0`}>
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-2 lg:py-4 font-medium text-right whitespace-nowrap">
                        {transaction.amount}
                      </TableCell>
                      <TableCell className="py-2 lg:py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-1.5 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors focus:outline-none">
                              <IconDotsVertical className="size-4 text-neutral-500" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40 rounded-lg shadow-lg">
                            <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => toast.info(`Viewing details for transaction ${transaction.id}`)}>
                              <IconEye className="size-4 text-neutral-500" />
                              <span>View Details</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => toast("Opening chat...", { description: `Connecting to the buyer for ${transaction.id}.` })}>
                              <IconMessageCircle className="size-4 text-neutral-500" />
                              <span>Contact Buyer</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400" onClick={() => toast.error(`Refund initiated`, { description: `Refunding ${transaction.amount} back to the customer.` })}>
                              <IconReceiptRefund className="size-4" />
                              <span>Refund</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </div>
        </Card>

        <Card className="w-full lg:w-xl min-w-0 shadow-none bg-neutral-200/60 dark:bg-neutral-900 p-1 gap-0 border border-neutral-300 dark:border-neutral-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <div className="bg-white dark:bg-neutral-950 w-full h-full flex flex-col rounded-lg p-4 gap-4 border border-border">
            <CardHeader className="flex flex-row items-center justify-between p-0">
              <CardTitle>Traffic Channel</CardTitle>
              <Select defaultValue="all" onValueChange={(val) => toast.info(`Traffic channel filtered by: ${val}`)}>
                <SelectTrigger className="w-fit shrink-0 shadow-none border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-950 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All time</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6 p-0">
              <div className="w-full h-58">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={trafficChannelData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {trafficChannelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full space-y-3">
                {trafficChannelData.map((channel) => (
                  <div
                    key={channel.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: channel.color }}
                      ></div>
                      <span className="text-sm text-muted-foreground truncate">
                        {channel.name}
                      </span>
                    </div>
                    <span className="text-sm font-semibold shrink-0">
                      {channel.value}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
};
