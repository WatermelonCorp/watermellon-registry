import {
    type ChartConfig,
} from "./components/ui/chart"
import { Activity, Layers, Calendar, CalendarDays, Settings, Bell, CircleHelp, BarChart3, CircleDollarSign, FileText, Users2, UserPlus2 } from "lucide-react"

export const salesData = [
    { name: "01", value: 40, stripeValue: 40 },
    { name: "02", value: 65, stripeValue: 65 },
    { name: "03", value: 35, stripeValue: 35 },
    { name: "04", value: 55, stripeValue: 55 },
    { name: "05", value: 65, stripeValue: 65 },
    { name: "06", value: 50, stripeValue: 50 },
    { name: "07", value: 30, stripeValue: 30 },
    { name: "08", value: 75, stripeValue: 75 },
    { name: "09", value: 55, stripeValue: 55 },
    { name: "10", value: 45, stripeValue: 45 },
    { name: "11", value: 35, stripeValue: 35 },
    { name: "12", value: 55, stripeValue: 55 },
    { name: "13", value: 70, stripeValue: 70 },
]

export const emailData = [
    { year: "2016", ctr: 150, open: 120 },
    { year: "2017", ctr: 220, open: 180 },
    { year: "2018", ctr: 450, open: 350 },
    { year: "2019", ctr: 520, open: 421.876 },
    { year: "2020", ctr: 480, open: 450 },
    { year: "2021", ctr: 450, open: 530 },
    { year: "2022", ctr: 420, open: 420 },
    { year: "2023", ctr: 320, open: 250 },
    { year: "2024", ctr: 280, open: 180 },
    { year: "2025", ctr: 100, open: 80 },
]

export const salesConfig = {
    value: {
        label: "Value",
        color: "hsl(221, 83%, 53%)",
    },
} satisfies ChartConfig

export const emailConfig = {
    ctr: {
        label: "Click Through Rate",
        color: "hsl(221, 83%, 53%)",
    },
    open: {
        label: "Open Rate",
        color: "hsl(240, 5%, 34%)",
    },
} satisfies ChartConfig

export const employees = [
    { id: "MRU68129", name: "John Smith", email: "johnsmith@mail.com", role: "Sr UI UX Designer", department: "Team Projects", status: "Full Time", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop" },
    { id: "MRU68129", name: "John Smith", email: "johnsmith@mail.com", role: "Sr UI UX Designer", department: "Team Projects", status: "Freelance", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop" },
    { id: "MRU68129", name: "John Smith", email: "johnsmith@mail.com", role: "Sr UI UX Designer", department: "Team Projects", status: "Full Time", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop" },
    { id: "MRU68129", name: "John Smith", email: "johnsmith@mail.com", role: "Sr UI UX Designer", department: "Team Projects", status: "Full Time", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop" },
]

export const stats = [
    {
        title: "Payrolls Cost",
        value: "$16.500",
        trend: "29%",
        description: "Last Month",
        trendType: "up",
    },
    {
        title: "Total Expense",
        value: "$3.512",
        trend: "0.1%",
        description: "Last Month",
        trendType: "up",
    },
    {
        title: "Pending Payments",
        value: "$3.762",
        trend: "29%",
        description: "Employees",
        trendType: "down",
    },
    {
        title: "Total Payrolls",
        value: "120",
        trend: "10",
        description: "New Employees",
        trendType: "up",
    },
]

export const sidebarData = {
    mainMenu: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: Activity,
            isActive: true,
        },
        {
            title: "Projects",
            url: "#",
            icon: Layers,
            isDisabled: true,
        },
        {
            title: "Calendar",
            url: "#",
            icon: Calendar,
            isDisabled: true,
        },
        {
            title: "Leave Management",
            url: "#",
            icon: CalendarDays,
            isDisabled: true,
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings,
            isDisabled: true,
        },
        {
            title: "Notifications",
            url: "#",
            icon: Bell,
            isDisabled: true,
        },
        {
            title: "Help Center",
            url: "#",
            icon: CircleHelp,
            isDisabled: true,
        },
    ],
    teamManagement: [
        {
            title: "Performance",
            url: "#",
            icon: BarChart3,
            isDisabled: true,
        },
        {
            title: "Payrolls",
            url: "#",
            icon: CircleDollarSign,
            isDisabled: true,
        },
        {
            title: "Invoices",
            url: "#",
            icon: FileText,
            isDisabled: true,
        },
        {
            title: "Employees",
            url: "#",
            icon: Users2,
            isDisabled: true,
        },
        {
            title: "Recruitment & Hiring",
            url: "#",
            icon: UserPlus2,
            isDisabled: true,
        },
    ],
}
