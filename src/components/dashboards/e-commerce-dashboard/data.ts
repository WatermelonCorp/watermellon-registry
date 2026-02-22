import { IconArrowNarrowUp } from "@tabler/icons-react";

export const dashboardMetrics = [
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

export const revenueData = [
    { month: "JAN", profit: 9500, loss: 4200 },
    { month: "FEB", profit: 13200, loss: 5100 },
    { month: "MAR", profit: 11800, loss: 4800 },
    { month: "APR", profit: 15600, loss: 5800 },
    { month: "MAY", profit: 8900, loss: 4100 },
    { month: "JUNE", profit: 11200, loss: 4900 },
];

export const transactions = [
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

export const trafficChannelData = [
    { name: "Direct", value: 55, color: "#3b82f6" },
    { name: "Organic", value: 20, color: "#93c5fd" },
    { name: "Referral", value: 25, color: "#dbeafe" },
];
