import {
    IconChartBar,
    IconCalendar,
    IconFileText,
    IconFolder,
    IconHome,
    IconLogout,
    IconPhone,
    IconSearch,
    IconSettings,
    IconUser,
    IconUserPlus,
} from "@tabler/icons-react"
import type * as React from "react"

export interface NavItem {
    title: string
    url: string
    icon?: React.ComponentType<any>
    isActive?: boolean
    items?: NavItem[]
}

export interface SidebarData {
    workspace: NavItem[]
    favorites: NavItem[]
    footer: NavItem[]
}

export const data: SidebarData = {
    workspace: [
        {
            title: "Home",
            url: "#",
            icon: IconHome,
        },
        {
            title: "Analytics",
            url: "#",
            icon: IconChartBar,
            items: [
                {
                    title: "Overview",
                    url: "#",
                },
            ],
        },
        {
            title: "Projects",
            url: "#",
            icon: IconFolder,
            items: [
                {
                    title: "All Projects",
                    url: "#",
                },
            ],
        },
        {
            title: "Leads",
            url: "#",
            icon: IconSearch,
            isActive: true,
            items: [
                {
                    title: "Table",
                    url: "#",
                },
                {
                    title: "Kanban",
                    url: "/dashboard/kanban-board",
                    isActive: true,
                },
            ],
        },
        {
            title: "Schedule",
            url: "#",
            icon: IconCalendar,
        },
        {
            title: "Admin",
            url: "#",
            icon: IconUser,
        },
    ],
    favorites: [
        {
            title: "File #1",
            url: "#",
            icon: IconFileText,
        },
        {
            title: "File #2",
            url: "#",
            icon: IconFileText,
        },
        {
            title: "Project #1",
            url: "#",
            icon: IconFolder,
        },
        {
            title: "Project #2",
            url: "#",
            icon: IconFolder,
        },
        {
            title: "Lead #44",
            url: "#",
            icon: IconSearch,
        },
        {
            title: "Call #1",
            url: "#",
            icon: IconPhone,
        },
        {
            title: "D Call #2",
            url: "#",
            icon: IconPhone,
        },
    ],
    footer: [
        {
            title: "Settings",
            url: "#",
            icon: IconSettings,
        },
        {
            title: "Invite users",
            url: "#",
            icon: IconUserPlus,
        },
        {
            title: "Log out",
            url: "#",
            icon: IconLogout,
        },
    ],
}

export interface KanbanCard {
    id: number
    title: string
    description: string
    user: string
    date: string
    comments: number
    type: string
    avatarColor: string
}

export interface KanbanColumn {
    id: string
    title: string
    leads?: number
    deals?: number
    total: string
    cards: KanbanCard[]
}

export const boardData: KanbanColumn[] = [
    {
        id: "contacted",
        title: "Contacted",
        leads: 3,
        total: "$993,000",
        cards: [
            { id: 1, title: "E-commerce Platform", description: "Development of a responsive online shopping...", user: "Sara Thompson", date: "June 15", comments: 8, type: "urgent", avatarColor: "bg-gradient-to-br from-orange-400 to-rose-500" },
            { id: 2, title: "Social Media Dashboard", description: "Creating an analytics dashboard for social eng...", user: "Mark Chen", date: "July 10", comments: 10, type: "mail", avatarColor: "bg-gradient-to-br from-purple-500 to-indigo-600" },
            { id: 3, title: "Customer Support Chatbot", description: "Developing an AI-powered chatbot for custom...", user: "Noah Hall", date: "October 3", comments: 19, type: "mail", avatarColor: "bg-gradient-to-br from-blue-400 to-cyan-500" },
        ]
    },
    {
        id: "drafting",
        title: "Drafting",
        leads: 4,
        total: "$121,000",
        cards: [
            { id: 4, title: "Landing Page", description: "Designing a high-conversion landing page for...", user: "Elena Garcia", date: "August 1", comments: 5, type: "mail", avatarColor: "bg-gradient-to-br from-pink-500 to-rose-600" },
            { id: 5, title: "Content Management System", description: "Revamping an existing CMS for better user ex...", user: "James Patel", date: "September 12", comments: 20, type: "file", avatarColor: "bg-gradient-to-br from-yellow-400 to-orange-500" },
            { id: 6, title: "Fitness App", description: "Designing a user-friendly app for tracking wor...", user: "Nina Kim", date: "October 22", comments: 15, type: "mail", avatarColor: "bg-gradient-to-br from-red-400 to-pink-500" },
            { id: 7, title: "Fitness Tracker", description: "Designing an app that monitors health and fitn...", user: "Mia Turner", date: "September 18", comments: 13, type: "mail", avatarColor: "bg-gradient-to-br from-cyan-400 to-blue-500" },
        ]
    },
    {
        id: "proposal",
        title: "Proposal",
        leads: 6,
        total: "$938,000",
        cards: [
            { id: 8, title: "Travel Booking Site", description: "Developing a streamlined booking interface fo...", user: "Oliver Smith", date: "November 8", comments: 18, type: "urgent", avatarColor: "bg-gradient-to-br from-blue-500 to-indigo-600" },
            { id: 9, title: "Online Learning Portal", description: "Creating an interactive platform for online cou...", user: "Zoe Martinez", date: "June 30", comments: 25, type: "phone", avatarColor: "bg-gradient-to-br from-red-500 to-rose-600" },
            { id: 10, title: "Corporate Intranet", description: "Designing a user-friendly interface for compa...", user: "Brian Johnson", date: "January 15", comments: 9, type: "file", avatarColor: "bg-gradient-to-br from-indigo-500 to-blue-600" },
            { id: 11, title: "Recipe Sharing App", description: "Building a platform for users to share and disc...", user: "Emma Wilson", date: "February 28", comments: 11, type: "chat", avatarColor: "bg-gradient-to-br from-green-400 to-emerald-600" },
            { id: 12, title: "News Aggregator", description: "Creating an app that curates news from vario...", user: "Ethan Clark", date: "August 30", comments: 17, type: "chat", avatarColor: "bg-gradient-to-br from-amber-400 to-orange-500" },
            { id: 13, title: "Event Management System", description: "Creating a streamlined system for organizing...", user: "David Brown", date: "March 14", comments: 14, type: "file", avatarColor: "bg-gradient-to-br from-sky-400 to-blue-500" },
        ]
    },
    {
        id: "closed",
        title: "Closed",
        deals: 8,
        total: "$382,000",
        cards: [
            { id: 14, title: "Virtual Reality Experience", description: "Designing an immersive virtual reality applicati...", user: "Liam Davis", date: "April 5", comments: 30, type: "done", avatarColor: "bg-gradient-to-br from-purple-500 to-pink-600" },
            { id: 15, title: "Blog Platform", description: "Developing a robust platform for blogging and...", user: "Sophia Lee", date: "May 19", comments: 7, type: "done", avatarColor: "bg-gradient-to-br from-emerald-400 to-teal-500" },
            { id: 16, title: "Real Estate App", description: "Creating a mobile app for real estate listings a...", user: "Lucas White", date: "June 16", comments: 12, type: "done", avatarColor: "bg-gradient-to-br from-teal-400 to-cyan-500" },
            { id: 17, title: "Job Portal", description: "Developing a platform for job seekers and em...", user: "Chloe Martinez", date: "July 25", comments: 22, type: "done", avatarColor: "bg-gradient-to-br from-fuchsia-500 to-purple-600" },
        ]
    }
]
