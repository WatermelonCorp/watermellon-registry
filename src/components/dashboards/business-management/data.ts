import {
    Clock,
    UserX,
    CalendarX,
    Star,
    Timer,
    type LucideIcon,
    UserPlus,
    MapPin,
    Link2,
    CreditCard,
} from "lucide-react";

export const metricsData: {
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

export const teamData = [
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

export const salesLaborData = [
    { date: "", projectedSales: 110 },
    { date: "Sep 20", actualSales: 130, actualLabor: 110, projectedSales: 115 },
    { date: "", projectedSales: 112 },
    { date: "Sep 21", actualSales: 145, actualLabor: 120, projectedSales: 108 },
    { date: "", projectedSales: 115 },
    { date: "Sep 22", actualSales: 165, actualLabor: 190, projectedSales: 118 },
    { date: "", projectedSales: 110 },
    { date: "Sep 23", actualSales: 125, actualLabor: 115, projectedSales: 108 },
    { date: "", projectedSales: 115 },
    { date: "Sep 24", actualSales: 160, actualLabor: 155, projectedSales: 125 },
    { date: "", projectedSales: 118 },
    { date: "Sep 25", actualSales: 110, actualLabor: 90, projectedSales: 112 },
    { date: "", projectedSales: 115 },
    { date: "Sep 26", actualSales: 125, actualLabor: 110, projectedSales: 120 },
    { date: "", projectedSales: 110 },
];

export const chartConfig = {
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
export const actionItems = [
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
