import {
    Calendar,
    ChartNoAxesCombined,
    FileText,
    Frame,
    Home,
    ListTodo,
    Map,
    PieChart,
    Settings,
    Rocket,
    Trello,
    Figma,
    Users,
    Zap,
    Slack,
    NotebookIcon,
    MessageSquare,
    Video,
    Github,
    type LucideIcon
} from "lucide-react";

export const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Home",
            url: "#",
            icon: Home,
            isDisabled: true,
        },
        {
            title: "Tasks",
            url: "#",
            icon: ListTodo,
            isDisabled: true,
        },
        {
            title: "Calendar",
            url: "#",
            icon: Calendar,
            isDisabled: true,
        },
        {
            title: "Team",
            url: "#",
            icon: Users,
            isDisabled: true,
        },
        {
            title: "Docs",
            url: "#",
            icon: FileText,
            isDisabled: true,
        },
        {
            title: "Automations",
            url: "#",
            icon: Zap,
            isDisabled: true,
        },
        {
            title: "Reporting",
            url: "#",
            icon: ChartNoAxesCombined,
            isDisabled: true,
        },
    ],
    projects: [
        {
            name: "Atlas CRM Revamp",
            url: "#",
            icon: Frame,
            color: "bg-red-500",
            isDisabled: true,
        },
        {
            name: "Nimbus Dashboard",
            url: "#",
            icon: PieChart,
            color: "bg-green-500",
            isDisabled: true,
        },
        {
            name: "Orion API Gateway",
            url: "#",
            icon: Map,
            color: "bg-blue-500",
            isDisabled: true,
        },
        {
            name: "Helio Task System",
            url: "#",
            icon: ListTodo,
            color: "bg-yellow-500",
            isDisabled: true,
        },
    ],
    management: [],
    support: [
        {
            name: "Settings",
            url: "/settings",
            icon: Settings,
            isDisabled: true,
        },
        {
            name: "Releases",
            url: "#",
            icon: Rocket,
            isDisabled: true,
        },
    ],
    apps: [
        {
            name: "Trello",
            url: "#",
            icon: Trello,
            isDisabled: true,
        },
        {
            name: "Figma",
            url: "#",
            icon: Figma,
            isDisabled: true,
        },
    ],
};

export type Integration = {
    id: string;
    name: string;
    description: string;
    icon: LucideIcon;
    connected: boolean;
    lastSynced?: string;
    linkedItems?: string;
    defaultBoard?: string;
    syncDirection?: string;
    actions?: { id: string; label: string; enabled: boolean }[];
};

export const integrationsData: Integration[] = [
    {
        id: "slack",
        name: "Slack",
        description:
            "Get instant task notifications directly from Slack for seamless communication.",
        icon: Slack,
        connected: false,
    },
    {
        id: "notion",
        name: "Notion",
        description:
            "Link Notion pages to centralize documentation synchronized across platforms.",
        icon: NotebookIcon,
        connected: false,
    },
    {
        id: "microsoft-teams",
        name: "Microsoft Teams",
        description:
            "Post task updates from conversations directly to your platform.",
        icon: MessageSquare,
        connected: false,
    },
    {
        id: "trello",
        name: "Trello",
        description:
            "Sync Trello boards and cards with TaskFlow for unified project management.",
        icon: Trello,
        connected: true,
        lastSynced: "3 minutes ago",
        linkedItems: "8 boards linked",
        defaultBoard: "Web development project",
        syncDirection: "Two-way Sync",
        actions: [
            {
                id: "create-task",
                label: "Create TaskFlow Task When New Trello Card Is Added",
                enabled: true,
            },
            {
                id: "create-card",
                label: "Create Trello Card When New TaskFlow Task Is Created",
                enabled: true,
            },
            {
                id: "sync-status",
                label: "Sync Status Changes Between Lists And TaskFlow Stages",
                enabled: false,
            },
            {
                id: "sync-comments",
                label: "Sync Comments Between Trello Cards And TaskFlow Tasks",
                enabled: true,
            },
            {
                id: "sync-attachments",
                label: "Sync Attachments And File Links",
                enabled: false,
            },
        ],
    },
    {
        id: "figma",
        name: "Figma",
        description:
            "Embed Figma designs directly into tasks and get automatic updates when prototypes change for better design collaboration.",
        icon: Figma,
        connected: true,
        lastSynced: "1 hour ago",
        linkedItems: "12 files linked",
        defaultBoard: "Design System",
        syncDirection: "One-way Sync",
        actions: [
            {
                id: "embed-designs",
                label: "Embed Figma Designs In TaskFlow Tasks",
                enabled: true,
            },
            {
                id: "notify-updates",
                label: "Notify When Design Files Are Updated",
                enabled: true,
            },
            {
                id: "sync-comments",
                label: "Sync Comments Between Figma And TaskFlow",
                enabled: false,
            },
        ],
    },
    {
        id: "zoom",
        name: "Zoom",
        description:
            "Generate Zoom meeting links automatically for scheduled tasks and launch meetings directly from TaskFlow to streamline team communication.",
        icon: Video,
        connected: false,
    },
    {
        id: "zapier",
        name: "Zapier",
        description:
            "Connect TaskFlow to over 7,000 other apps and build powerful custom automations without writing a single line of code.",
        icon: Zap,
        connected: false,
    },
    {
        id: "github",
        name: "GitHub",
        description:
            "Link pull requests and commits to tasks for seamless development workflow tracking.",
        icon: Github,
        connected: false,
    },
];
