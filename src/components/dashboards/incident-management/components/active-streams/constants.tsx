import {
    IconTrolley,
    IconDatabase,
    IconApi,
    IconCreditCard,
    IconSettings,
    IconBolt,
    IconHourglass,
    IconBox
} from "@tabler/icons-react"
import type { StreamCardProps } from "./types"

export const detectedCards: StreamCardProps[] = [
    {
        id: "1",
        title: "Service Flow Interruption",
        code: "#OPS-129",
        avatar: "https://github.com/shadcn.png",
        logo: <IconTrolley className="size-4" />,
        logoBg: "bg-orange-500",
        details: {
            origin: "Customer Mobile App",
            priority: "High Impact",
            handler: "Platform operations",
            process: "Incident resolution",
            date: "Jan 24, 2026",
        },
        tags: [
            { label: "Time-Sensitive", icon: <IconHourglass className="size-4" />, color: "text-amber-600", bg: "bg-amber-50" },
            { label: "Platform", icon: <IconBox className="size-4" />, color: "text-indigo-600", bg: "bg-indigo-50" },
            { label: "Live", icon: <IconBolt className="size-4" />, color: "text-orange-600", bg: "bg-orange-50" },
        ],
        messages: 3,
        time: "22hr ago",
    },
    {
        id: "2",
        title: "Database Downtime",
        code: "#OPS-130",
        avatar: "https://i.pravatar.cc/150?u=2",
        logo: <IconDatabase className="size-4" />,
        logoBg: "bg-blue-600",
        details: {
            origin: "User Management System",
            priority: "Moderate",
            handler: "IT Support",
            process: "Database recovery",
            date: "Jan 27, 2026",
        },
        tags: [
            { label: "Time-Sensitive", icon: <IconHourglass className="size-4" />, color: "text-amber-600", bg: "bg-amber-50" },
            { label: "Platform", icon: <IconBox className="size-4" />, color: "text-indigo-600", bg: "bg-indigo-50" },
        ],
        messages: 5,
        time: "5hr ago",
    },
]

export const acknowledgedCards: StreamCardProps[] = [
    {
        id: "3",
        title: "API Rate Limiting",
        code: "#OPS-131",
        avatar: "https://i.pravatar.cc/150?u=3",
        logo: <IconApi className="size-4" />,
        logoBg: "bg-emerald-600",
        details: {
            origin: "Third-party Integration",
            priority: "Minor",
            handler: "Integration Team",
            process: "Throttling Policy",
            date: "Jan 26, 2026",
        },
        tags: [
            { label: "Time-Sensitive", icon: <IconHourglass className="size-4" />, color: "text-amber-600", bg: "bg-amber-50" },
            { label: "Platform", icon: <IconBox className="size-4" />, color: "text-indigo-600", bg: "bg-indigo-50" },
        ],
        messages: 1,
        time: "10hr ago",
    },
    {
        id: "4",
        title: "Payment Processing Delay",
        code: "#OPS-132",
        avatar: "https://i.pravatar.cc/150?u=4",
        logo: <IconCreditCard className="size-4" />,
        logoBg: "bg-purple-600",
        details: {
            origin: "E-commerce Portal",
            priority: "Critical",
            handler: "Finance Ops",
            process: "Payment Gateway",
            date: "Jan 28, 2026",
        },
        tags: [
            { label: "Platform", icon: <IconBox className="size-4" />, color: "text-indigo-600", bg: "bg-indigo-50" },
            { label: "Live", icon: <IconBolt className="size-4" />, color: "text-orange-600", bg: "bg-orange-50" },
        ],
        messages: 2,
        time: "1hr ago",
    },
]

export const investigatingCards: StreamCardProps[] = [
    {
        id: "5",
        title: "Worker Node Failure",
        code: "#OPS-133",
        avatar: "https://i.pravatar.cc/150?u=5",
        logo: <IconSettings className="size-4" />,
        logoBg: "bg-rose-600",
        details: {
            origin: "Cluster Manager",
            priority: "High Impact",
            handler: "SRE Team",
            process: "Node Replacement",
            date: "Jan 28, 2026",
        },
        tags: [
            { label: "Time-Sensitive", icon: <IconHourglass className="size-4" />, color: "text-amber-600", bg: "bg-amber-50" },
            { label: "Platform", icon: <IconBox className="size-4" />, color: "text-indigo-600", bg: "bg-indigo-50" },
        ],
        messages: 4,
        time: "30m ago",
    }
]

export const resolvedCards: StreamCardProps[] = [
    {
        id: "6",
        title: "DNS Resolution Error",
        code: "#OPS-128",
        avatar: "https://i.pravatar.cc/150?u=6",
        logo: <IconBolt className="size-4" />,
        logoBg: "bg-neutral-600",
        details: {
            origin: "Internal Network",
            priority: "Major",
            handler: "Networking Team",
            process: "DNS Cache Flush",
            date: "Jan 23, 2026",
        },
        tags: [
            { label: "Platform", icon: <IconBox className="size-4" />, color: "text-indigo-600", bg: "bg-indigo-50" },
        ],
        messages: 12,
        time: "2d ago",
    }
]
