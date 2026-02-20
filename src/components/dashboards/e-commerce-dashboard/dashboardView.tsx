"use client";

import {
  IconArrowNarrowDownDashed,
  IconArrowNarrowRight,
  IconArrowNarrowUp,
  IconArrowNarrowUpDashed,
  IconTrendingUp,
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

const dashboardMetrics = [
  {
    id: "total-orders",
    label: "Total orders",
    value: "12,832",
    trend: "up",
    trendValue: "+28.1%",
    helperText: "+2,123 today",
  },
  {
    id: "total-sales",
    label: "Total Sales",
    value: "$12,832.80",
    trend: "up",
    trendValue: "+18.8%",
    helperText: "+$1,895 today",
  },
  {
    id: "visits",
    label: "Visits",
    value: "1,062",
    trend: "down",
    trendValue: "-10%",
    helperText: "-426 today",
  },
  {
    id: "conversion-rate",
    label: "Conversion rate",
    value: "90%",
    trend: "up",
    trendValue: "+12%",
    helperText: "+42 today",
  },
];

const revenueData = [
  { month: "JAN", profit: 9500, loss: 4200 },
  { month: "FEB", profit: 13200, loss: 5100 },
  { month: "MAR", profit: 11800, loss: 4800 },
  { month: "APR", profit: 15600, loss: 5800 },
  { month: "MAY", profit: 8900, loss: 4100 },
  { month: "JUNE", profit: 11200, loss: 4900 },
];

const transactions = [
  {
    id: "#2020912",
    date: "Apr 29, 2022, 11:37",
    amount: -299.89,
    status: "Pending",
    statusColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-500/15 dark:text-yellow-400 border-transparent dark:border-yellow-500/20",
    icon: IconArrowNarrowUp,
    iconBg: "bg-yellow-100 dark:bg-yellow-500/10",
  },
  {
    id: "#2020911",
    date: "Apr 29, 2022, 11:37",
    amount: -130.15,
    status: "Completed",
    statusColor: "bg-green-100 text-green-800 dark:bg-green-500/15 dark:text-green-400 border-transparent dark:border-green-500/20",
    icon: IconArrowNarrowUp,
    iconBg: "bg-green-100 dark:bg-green-500/10",
  },
  {
    id: "#2020910",
    date: "Apr 29, 2022, 11:36",
    amount: -458.13,
    status: "Scheduled",
    statusColor: "bg-cyan-100 text-cyan-800 dark:bg-cyan-500/15 dark:text-cyan-400 border-transparent dark:border-cyan-500/20",
    icon: IconArrowNarrowUp,
    iconBg: "bg-cyan-100 dark:bg-cyan-500/10",
  },
  {
    id: "#2020909",
    date: "Apr 29, 2022, 11:36",
    amount: -210.99,
    status: "Completed",
    statusColor: "bg-green-100 text-green-800 dark:bg-green-500/15 dark:text-green-400 border-transparent dark:border-green-500/20",
    icon: IconArrowNarrowUp,
    iconBg: "bg-green-100 dark:bg-green-500/10",
  },
  {
    id: "#2070910",
    date: "Apr 29, 2022, 11:36",
    amount: -458.13,
    status: "Scheduled",
    statusColor: "bg-cyan-100 text-cyan-800 dark:bg-cyan-500/15 dark:text-cyan-400 border-transparent dark:border-cyan-500/20",
    icon: IconArrowNarrowUp,
    iconBg: "bg-cyan-100 dark:bg-cyan-500/10",
  }
];

const trafficChannelData = [
  { name: "Direct", value: 55, color: "#3b82f6" },
  { name: "Organic", value: 20, color: "#93c5fd" },
  { name: "Referral", value: 25, color: "#dbeafe" },
];

export const DashboardView = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4 p-4 lg:p-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
          {dashboardMetrics.map((metric) => {
            const TrendIcon =
              metric.trend === "up"
                ? IconArrowNarrowUpDashed
                : IconArrowNarrowDownDashed;
            return (
              <Card
                key={metric.id}
                className="shadow-none bg-neutral-200/60 dark:bg-neutral-900 p-1 gap-0 border border-neutral-300 dark:border-neutral-800"
              >
                <div className="bg-white dark:bg-neutral-950 w-full h-full flex flex-col rounded-lg p-4 gap-4 border border-neutral-300 dark:border-neutral-800">
                  <CardHeader className="p-0 gap-1.5">
                    <CardDescription>{metric.label}</CardDescription>
                    <CardTitle className="text-3xl font-bold tabular-nums">
                      {metric.value}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex gap-3 items-center p-0">
                    <div className="flex items-center gap-1">
                      <TrendIcon
                        className={`size-5 ${metric.trend === "up"
                          ? "text-green-600"
                          : "text-red-600"
                          }`}
                        strokeWidth={2.5}
                      />
                      {metric.trendValue}
                    </div>
                    <div className="text-muted-foreground">
                      {metric.helperText}
                    </div>
                  </CardContent>
                </div>
                <CardFooter className="py-1.5 px-2">
                  <a
                    href="#"
                    className="font-medium hover:underline flex items-center justify-between w-full text-neutral-700 dark:text-neutral-300 text-sm"
                  >
                    <span>View Report</span>
                    <IconArrowNarrowRight className="size-4" />
                  </a>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Revenue Chart */}
        <Card className="w-full lg:w-2xl shadow-none bg-neutral-200/60 dark:bg-neutral-900 p-1 gap-0 border border-neutral-300 dark:border-neutral-800">
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
              <Select defaultValue="month">
                <SelectTrigger className="w-24 shadow-none border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-950">
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

      <div className="flex flex-col lg:flex-row gap-4">
        <Card className="flex-1 shadow-none bg-neutral-200/60 dark:bg-neutral-900 p-1 gap-0 border border-neutral-300 dark:border-neutral-800">
          <div className="bg-white dark:bg-neutral-950 w-full h-full flex flex-col rounded-lg p-4 gap-4 border border-neutral-300 dark:border-neutral-800">
            <CardHeader className="flex flex-row items-center justify-between p-0">
              <CardTitle className="text-xl font-semibold tracking-tight">
                Recent Transaction
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b dark:border-neutral-800">
                      <th className="text-left font-medium text-muted-foreground py-3">
                        Transaction ID
                      </th>
                      <th className="text-left font-medium text-muted-foreground py-3">
                        Date
                      </th>
                      <th className="text-center font-medium text-muted-foreground py-3">
                        Status
                      </th>
                      <th className="text-right font-medium text-muted-foreground py-3">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold dark:bg-neutral-800 ${transaction.iconBg}`}
                            >
                              <transaction.icon className="size-4 text-neutral-500" />
                            </div>
                            <span className="font-medium">
                              {transaction.id}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 text-muted-foreground">
                          {transaction.date}
                        </td>
                        <td className="py-4 text-center">
                          <Badge className={transaction.statusColor}>
                            {transaction.status}
                          </Badge>
                        </td>
                        <td className="py-4 font-medium text-right">
                          {transaction.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </div>
        </Card>

        <Card className="w-full lg:w-xl shadow-none bg-neutral-200/60 dark:bg-neutral-900 p-1 gap-0 border border-neutral-300 dark:border-neutral-800">
          <div className="bg-white dark:bg-neutral-950 w-full h-full flex flex-col rounded-lg p-4 gap-4 border border-border">
            <CardHeader className="flex flex-row items-center justify-between p-0">
              <CardTitle>Traffic Channel</CardTitle>
              <Select defaultValue="all">
                <SelectTrigger className="w-24 shadow-none border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-950">
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
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: channel.color }}
                      ></div>
                      <span className="text-sm text-muted-foreground">
                        {channel.name}
                      </span>
                    </div>
                    <span className="text-sm font-semibold">
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
