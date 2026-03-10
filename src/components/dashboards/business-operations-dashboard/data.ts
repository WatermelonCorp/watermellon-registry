import {
    IconLayoutDashboard,
    IconCheckbox,
    IconUsers,
    IconFileInvoice,
    IconChartBar,
    IconSettings,
    IconUserPlus,
    IconCircleFilled,
} from "@tabler/icons-react"
import { type Invoice } from "./components/invoice-card"

export const data = {
    user: {
        name: "Lily Senate",
        email: "lily@kansas.inc",
        avatar: "/avatars/lily.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "#",
            icon: IconLayoutDashboard,
            isDisabled: true,
        },
        {
            title: "Tasks",
            url: "#",
            icon: IconCheckbox,
            isDisabled: true,
        },
        {
            title: "Customers",
            url: "#",
            icon: IconUsers,
            isDisabled: true,
        },
        {
            title: "Invoices",
            url: "/dashboard/invoices",
            icon: IconFileInvoice,
            isActive: true,
            isDisabled: true,
        },
        {
            title: "Reports",
            url: "#",
            icon: IconChartBar,
            isDisabled: true,
        },
    ],
    settings: [
        {
            title: "Settings",
            url: "#",
            icon: IconSettings,
            isDisabled: true,
        },
        {
            title: "Invite users",
            url: "#",
            icon: IconUserPlus,
            isDisabled: true,
        },
    ],
    favorites: [
        {
            name: "Neo Gen",
            url: "#",
            icon: IconCircleFilled,
            color: "text-blue-500",
            isDisabled: true,
        },
        {
            name: "Stacks.com",
            url: "https://www.google.com/search?q=Stacks.com",
            icon: IconCircleFilled,
            color: "text-orange-500",
            isDisabled: true,
        },
        {
            name: "Aether AI",
            url: "#",
            icon: IconCircleFilled,
            color: "text-teal-500",
            isDisabled: true,
        },
        {
            name: "CloudChat",
            url: "#",
            icon: IconCircleFilled,
            color: "text-purple-500",
            isDisabled: true,
        },
    ],
}

export const invoices: Invoice[] = [
    // Unpaid
    { id: "INV-S0030", amount: "€12,450.00", status: "unpaid", date: "March 5, 2027", title: "Product Design Service", gradient: "from-blue-400 to-purple-500" },
    { id: "INV-S0078", amount: "€15,300.00", status: "unpaid", date: "August 14, 2027", title: "Brand Identity", gradient: "from-orange-400 to-rose-500" },
    { id: "INV-S0045", amount: "€8,750.00", status: "unpaid", date: "October 22, 2027", title: "UI/UX Audit", gradient: "from-cyan-400 to-blue-600" },
    { id: "INV-S0067", amount: "€2,300.00", status: "unpaid", date: "May 19, 2027", title: "Icon Set", gradient: "from-teal-400 to-yellow-500" },
    { id: "INV-S0035", amount: "€9,900.00", status: "unpaid", date: "October 1, 2027", title: "Design Systems", gradient: "from-pink-400 to-indigo-500" },

    // Paid
    { id: "INV-S0132", amount: "€17,650.00", status: "paid", date: "September 3, 2027", title: "SAAS Platform", gradient: "from-violet-500 to-fuchsia-500" },
    { id: "INV-S0101", amount: "€3,600.00", status: "paid", date: "December 30, 2027", title: "Consulting", gradient: "from-blue-300 to-emerald-400" },
    { id: "INV-S0123", amount: "€19,200.00", status: "paid", date: "February 18, 2027", title: "Full Scale Design", gradient: "from-indigo-400 to-cyan-400" },
    { id: "INV-S0094", amount: "€11,100.00", status: "paid", date: "June 27, 2027", title: "Design Support", gradient: "from-rose-300 to-pink-500" },
    { id: "INV-S0115", amount: "€16,750.00", status: "paid", date: "November 30, 2027", title: "User Research", gradient: "from-blue-500 to-indigo-600" },

    // Draft
    { id: "INV-S0056", amount: "€1,500.00", status: "draft", date: "January 25, 2027", title: "Maintenance", gradient: "from-orange-500 to-yellow-400" },
    { id: "INV-S0089", amount: "€5,800.00", status: "draft", date: "April 9, 2027", title: "App Redesign", gradient: "from-purple-400 to-pink-400" },
    { id: "INV-S0110", amount: "€14,900.00", status: "draft", date: "November 11, 2027", title: "Marketing Web", gradient: "from-blue-400 to-emerald-400" },
    { id: "INV-S0120", amount: "€4,400.00", status: "draft", date: "July 15, 2027", title: "Landing Page", gradient: "from-indigo-400 to-purple-500" },
    { id: "INV-S0108", amount: "€7,250.00", status: "draft", date: "December 12, 2027", title: "Illustration", gradient: "from-blue-900 to-indigo-950" },
]
