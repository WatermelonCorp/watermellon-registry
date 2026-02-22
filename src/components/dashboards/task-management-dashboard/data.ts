import {
    IconAdjustmentsHorizontal,
    IconCheckbox,
    IconCirclePlus,
    IconCoin,
    IconCreditCard,
    IconDeviceDesktop,
    IconFileInvoice,
    IconInbox,
    IconLayoutDashboard,
    IconLayoutGrid,
    IconReceipt,
    IconReport,
    IconSun,
    IconUserPlus,
    IconUsers,
} from "@tabler/icons-react"

export const data = {
    user: {
        name: "Alex Smith",
        email: "alex.smith@ams.co",
        avatar: "/avatars/alex.jpg",
    },
    teams: [
        {
            name: "AMS LLC",
            logo: "/logos/ams.png",
            plan: "PRO",
        },
    ],
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: IconLayoutDashboard,
            isActive: true,
            isDisabled: true,
        },
        {
            title: "Inbox",
            url: "#",
            icon: IconInbox,
            badge: 1,
            isDisabled: true,
        },
        {
            title: "Tasks",
            url: "/dashboard/tasks",
            icon: IconCheckbox,
            badge: 12,
            isDisabled: true,
        },
        {
            title: "Customers",
            url: "#",
            icon: IconUsers,
            isDisabled: true,
        },
        {
            title: "More",
            url: "#",
            icon: IconCirclePlus,
            isDisabled: true,
        },
    ],
    applications: [
        {
            title: "Receipts",
            url: "#",
            icon: IconReceipt,
            isDisabled: true,
        },
        {
            title: "Invoices",
            url: "#",
            icon: IconFileInvoice,
            badge: 12,
            isDisabled: true,
        },
        {
            title: "Reports",
            url: "#",
            icon: IconReport,
            isDisabled: true,
        },
        {
            title: "Payments",
            url: "#",
            icon: IconCreditCard,
            isDisabled: true,
        },
        {
            title: "Transactions",
            url: "#",
            icon: IconCoin,
            badge: 41,
            isDisabled: true,
        },
        {
            title: "App & Plugins",
            url: "#",
            icon: IconLayoutGrid,
            isDisabled: true,
        },
    ],
    navSecondary: [
        {
            title: "Settings",
            url: "#",
            icon: IconAdjustmentsHorizontal,
            isDisabled: true,
        },
        {
            title: "Appearance",
            url: "#",
            icon: IconDeviceDesktop,
            rightIcon: IconSun,
        },
        {
            title: "Invite users",
            url: "#",
            icon: IconUserPlus,
            badge: 4,
            isDisabled: true,
        },
    ],
}

export interface Task {
    id: string
    title: string
    subtasks?: number
    category: string
    date: string
    status: 'todo' | 'doing' | 'done'
    priority: 'low' | 'normal' | 'high' | 'urgent'
    avatarGradient: string
}

export interface Group {
    id: string
    name: string
    count: number
    color: string
    tasks: Task[]
}

export const amsGroups: Group[] = [
    {
        id: 'design',
        name: 'DESIGN',
        count: 14,
        color: 'text-neutral-400',
        tasks: [
            { id: '1', title: 'Evaluate User Interface Layout', subtasks: 7, category: 'DESIGN', date: 'Mar 15', status: 'todo', priority: 'low', avatarGradient: 'from-blue-400 to-cyan-400' },
            { id: '2', title: 'Assess Visual Design Elements', subtasks: 3, category: 'DESIGN', date: 'Apr 22', status: 'doing', priority: 'low', avatarGradient: 'from-orange-400 to-amber-400' },
            { id: '3', title: 'Inspect Navigation Flow', subtasks: 1, category: 'DESIGN', date: 'Sep 30', status: 'done', priority: 'urgent', avatarGradient: 'from-purple-400 to-pink-400' },
        ]
    },
    {
        id: 'review',
        name: 'REVIEW',
        count: 49,
        color: 'text-indigo-500',
        tasks: [
            { id: '4', title: 'Examine Typography Usage', subtasks: 5, category: 'REVIEW', date: 'Feb 5', status: 'todo', priority: 'normal', avatarGradient: 'from-teal-400 to-emerald-400' },
            { id: '5', title: 'Critique Button Design', subtasks: 9, category: 'REVIEW', date: 'Jan 19', status: 'doing', priority: 'normal', avatarGradient: 'from-indigo-400 to-blue-400' },
            { id: '6', title: 'Evaluate Iconography Consistency', subtasks: 4, category: 'REVIEW', date: 'Oct 27', status: 'doing', priority: 'high', avatarGradient: 'from-rose-400 to-pink-400' },
            { id: '7', title: 'Assess User Feedback Mechanisms', subtasks: 11, category: 'REVIEW', date: 'Dec 14', status: 'done', priority: 'high', avatarGradient: 'from-emerald-400 to-cyan-400' },
            { id: '8', title: 'Review Accessibility Features', subtasks: 2, category: 'REVIEW', date: 'May 3', status: 'done', priority: 'urgent', avatarGradient: 'from-fuchsia-400 to-pink-400' },
        ]
    },
    {
        id: 'analyze',
        name: 'ANALYZE',
        count: 80,
        color: 'text-emerald-500',
        tasks: [
            { id: '9', title: 'Analyze User Journey Mapping', subtasks: 8, category: 'ANALYZE', date: 'Aug 21', status: 'todo', priority: 'normal', avatarGradient: 'from-blue-400 to-indigo-400' },
            { id: '10', title: 'Inspect Responsive Design Adaptability', subtasks: 6, category: 'ANALYZE', date: 'Jun 11', status: 'doing', priority: 'normal', avatarGradient: 'from-orange-400 to-red-400' },
            { id: '11', title: 'Evaluate Onboarding Experience', subtasks: 12, category: 'ANALYZE', date: 'Feb 29', status: 'doing', priority: 'high', avatarGradient: 'from-purple-400 to-pink-400' },
            { id: '12', title: 'Performance Optimization Strategies', subtasks: 5, category: 'ANALYZE', date: 'Sep 10', status: 'doing', priority: 'normal', avatarGradient: 'from-emerald-400 to-teal-400' },
            { id: '13', title: 'Analyze Interaction Patterns', subtasks: 10, category: 'ANALYZE', date: 'Jul 8', status: 'doing', priority: 'normal', avatarGradient: 'from-cyan-400 to-blue-400' },
            { id: '14', title: 'Critique Error Messaging Design', subtasks: 3, category: 'ANALYZE', date: 'Mar 4', status: 'done', priority: 'urgent', avatarGradient: 'from-teal-400 to-emerald-400' },
            { id: '15', title: 'Review Data Visualization Techniques', subtasks: 10, category: 'ANALYZE', date: 'Apr 18', status: 'done', priority: 'urgent', avatarGradient: 'from-orange-400 to-red-400' },
            { id: '16', title: 'Review Color Scheme Choices', subtasks: 12, category: 'ANALYZE', date: 'Nov 12', status: 'done', priority: 'urgent', avatarGradient: 'from-cyan-400 to-blue-400' },
        ]
    }
]

export const visualizeGroups: Group[] = [
    {
        id: 'review',
        name: 'REVIEW',
        count: 30,
        color: 'text-neutral-400',
        tasks: [
            { id: 'v1', title: 'Analyze User Engagement Metrics', subtasks: 1, category: 'REVIEW', date: 'Jul 25', status: 'todo', priority: 'high', avatarGradient: 'from-blue-400 to-indigo-400' },
            { id: 'v2', title: 'Performance Optimization Strategies', subtasks: 5, category: 'REVIEW', date: 'Sep 10', status: 'doing', priority: 'normal', avatarGradient: 'from-orange-400 to-red-400' },
            { id: 'v3', title: 'Evaluate Cross-Platform Consistency', subtasks: 9, category: 'REVIEW', date: 'Nov 1', status: 'doing', priority: 'high', avatarGradient: 'from-purple-400 to-pink-400' },
            { id: 'v4', title: 'Review User Testing Protocols', subtasks: 4, category: 'REVIEW', date: 'Jan 30', status: 'done', priority: 'high', avatarGradient: 'from-teal-400 to-emerald-400' },
            { id: 'v5', title: 'Assess Feature Prioritization', subtasks: 11, category: 'REVIEW', date: 'Mar 22', status: 'done', priority: 'high', avatarGradient: 'from-rose-400 to-pink-400' },
            { id: 'v6', title: 'Inspect User Satisfaction Surveys', subtasks: 3, category: 'REVIEW', date: 'Jun 28', status: 'done', priority: 'urgent', avatarGradient: 'from-emerald-400 to-cyan-400' },
        ]
    },
    {
        id: 'strategy',
        name: 'STRATEGY',
        count: 16,
        color: 'text-rose-500',
        tasks: [
            { id: 's1', title: 'Inspect User Retention Strategies', subtasks: 2, category: 'STRATEGY', date: 'Apr 15', status: 'todo', priority: 'low', avatarGradient: 'from-pink-400 to-rose-400' },
            { id: 's2', title: 'Evaluate Content Strategy', subtasks: 8, category: 'STRATEGY', date: 'Oct 5', status: 'doing', priority: 'normal', avatarGradient: 'from-cyan-400 to-blue-400' },
            { id: 's3', title: 'Review Marketing Integration', subtasks: 6, category: 'STRATEGY', date: 'Dec 19', status: 'doing', priority: 'high', avatarGradient: 'from-purple-400 to-orange-400' },
        ]
    },
    {
        id: 'benchmark',
        name: 'BENCHMARK',
        count: 49,
        color: 'text-blue-500',
        tasks: [
            { id: 'b1', title: 'Evaluate A/B Testing Results', subtasks: 10, category: 'BENCHMARK', date: 'Aug 13', status: 'todo', priority: 'low', avatarGradient: 'from-blue-400 to-indigo-400' },
            { id: 'b2', title: 'Review User Persona Development', subtasks: 1, category: 'BENCHMARK', date: 'Sep 24', status: 'doing', priority: 'normal', avatarGradient: 'from-orange-400 to-red-400' },
            { id: 'b3', title: 'Critique Button Design', subtasks: 9, category: 'BENCHMARK', date: 'Jan 19', status: 'doing', priority: 'urgent', avatarGradient: 'from-purple-400 to-pink-400' },
            { id: 'b4', title: 'Assess Feature Roadmap', subtasks: 5, category: 'BENCHMARK', date: 'Feb 11', status: 'doing', priority: 'urgent', avatarGradient: 'from-emerald-400 to-teal-400' },
            { id: 'b5', title: 'Analyze User Behavior Analytics', subtasks: 9, category: 'BENCHMARK', date: 'Mar 9', status: 'done', priority: 'urgent', avatarGradient: 'from-rose-400 to-orange-400' },
            { id: 'b6', title: 'Evaluate Design System Guidelines', subtasks: 4, category: 'BENCHMARK', date: 'Apr 27', status: 'done', priority: 'urgent', avatarGradient: 'from-cyan-400 to-blue-400' },
            { id: 'b7', title: 'Analyze Competitive Benchmarking', subtasks: 12, category: 'BENCHMARK', date: 'May 7', status: 'done', priority: 'urgent', avatarGradient: 'from-fuchsia-400 to-pink-400' },
        ]
    }
]
