import { ReceiptText, Inbox, Star, Send, FileText, Calendar, Archive, AlertCircle, Trash, Tag } from "lucide-react";

export const initialInvoice = {
    invoiceNumber: "INV-0231",
    billedByName: "John Jacobs",
    billedByEmail: "hijacob@gmail.com",
    billedByAddress: "123 Maple Street, Springfield",
    billedToCompany: "Acme Corp.",
    billedToEmail: "hi@acmecorp.com",
    billedToAddress: "321 Apple Street, Autumfield",
    dateIssued: "Jul 28, 2025",
    dueDate: "Jul 31, 2025",
    items: [{ description: "Website Design", qty: 1, cost: 49.0, total: 49.0 }],
    currency: "USD",
};

export const sidebarData = {
    navMain: [
        {
            title: "General",
            items: [
                {
                    title: "Invoice",
                    icon: ReceiptText,
                    url: "/invoice",
                    isActive: true,
                },
                {
                    title: "Inbox",
                    icon: Inbox,
                    url: "#",
                    isDisabled: true,
                },
                {
                    title: "Starred",
                    icon: Star,
                    url: "#",
                    isDisabled: true,
                },
                {
                    title: "Sent",
                    icon: Send,
                    url: "#",
                    isDisabled: true,
                },
                {
                    title: "Drafts",
                    icon: FileText,
                    url: "#",
                    isDisabled: true,
                },
                {
                    title: "Scheduled",
                    icon: Calendar,
                    url: "#",
                    isDisabled: true,
                },
                {
                    title: "Archive",
                    icon: Archive,
                    url: "#",
                    isDisabled: true,
                },
                {
                    title: "Spam",
                    icon: AlertCircle,
                    url: "#",
                    isDisabled: true,
                },
                {
                    title: "Trash",
                    icon: Trash,
                    url: "#",
                    isDisabled: true,
                },
            ],
        },
        {
            title: "Labels",
            items: [
                {
                    title: "Marketing",
                    icon: Tag,
                    url: "#",
                    isDisabled: true,
                },
                {
                    title: "Sales",
                    icon: Tag,
                    url: "#",
                    isDisabled: true,
                },
            ],
        },
    ],
};
