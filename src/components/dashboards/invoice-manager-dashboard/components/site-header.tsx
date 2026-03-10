"use client"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "./ui/breadcrumb"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
    ArrowLeft,
    Grid3X3,
    Bell,
    MessageSquare,
    ChevronRight,
    User,
    Settings,
    LogOut,
} from "lucide-react"
import React from "react"
import { SidebarTrigger } from "./ui/sidebar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverHeader,
    PopoverTitle,
    PopoverDescription,
} from "./ui/popover"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "./ui/dropdown-menu"


// Convert kebab-case to Title Case (e.g., "financial-center" -> "Financial Center")
function formatBreadcrumb(segment: string): string {
    return segment
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
}

export const SiteHeader = () => {
    const pathname = "/financial-center/invoice-manager"
    const router = { back: () => { } }

    // Split path and filter empty segments
    const segments = pathname.split("/").filter(Boolean)

    // Build breadcrumb items with cumulative paths
    const breadcrumbItems = segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/")
        const label = formatBreadcrumb(segment)
        const isLast = index === segments.length - 1

        return { href, label, isLast }
    })

    return (
        <header className="flex h-12 shrink-0 items-center justify-between gap-2 border-b px-2">
            {/* Left side: Sidebar Trigger + Back button + Breadcrumbs */}
            <div className="flex items-center gap-3">
                <SidebarTrigger className="-ml-1 md:hidden transition-all duration-200 hover:scale-110 active:scale-95" />
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-6 bg-muted-foreground/5 rounded transition-all duration-200 hover:scale-110 active:scale-95 hover:bg-muted-foreground/10"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="size-2.5" />
                </Button>

                <Breadcrumb className="hidden sm:block">
                    <BreadcrumbList>
                        {breadcrumbItems.map((item, index) => (
                            <React.Fragment key={item.href}>
                                {index > 0 && (
                                    <BreadcrumbSeparator>
                                        <ChevronRight className="size-3.5" />
                                    </BreadcrumbSeparator>
                                )}
                                <BreadcrumbItem>
                                    {item.isLast ? (
                                        <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink href={item.href}>
                                            {item.label}
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                            </React.Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>

            </div>

            {/* Right side: Icons + Avatar */}
            <div className="flex items-center gap-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-6 bg-muted-foreground/5 rounded hidden sm:flex transition-all duration-200 hover:scale-110 active:scale-95 hover:bg-muted-foreground/10">
                            <Grid3X3 className="size-2.5" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-64 p-4">
                        <PopoverHeader className="mb-2">
                            <PopoverTitle>Shortcuts</PopoverTitle>
                            <PopoverDescription>Quick access to your apps.</PopoverDescription>
                        </PopoverHeader>
                        <div className="grid grid-cols-3 gap-4 py-2">
                            {['Email', 'Calendar', 'Files', 'Tasks', 'Notes', 'Chat'].map((app) => (
                                <div key={app} className="flex flex-col items-center gap-1 cursor-pointer hover:bg-accent p-2 rounded-md transition-colors">
                                    <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <Grid3X3 className="size-4 text-primary" />
                                    </div>
                                    <span className="text-[10px]">{app}</span>
                                </div>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-6 bg-muted-foreground/5 rounded hidden sm:flex transition-all duration-200 hover:scale-110 active:scale-95 hover:bg-muted-foreground/10">
                            <Bell className="size-2.5" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-80 p-0">
                        <PopoverHeader className="p-4 border-b">
                            <PopoverTitle>Notifications</PopoverTitle>
                        </PopoverHeader>
                        <div className="max-h-64 overflow-y-auto">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="p-4 border-b last:border-0 hover:bg-accent cursor-pointer transition-colors">
                                    <p className="text-xs font-medium">New invoice created</p>
                                    <p className="text-[10px] text-muted-foreground mt-1">Invoice #INV-2024-{i} has been successfully generated.</p>
                                    <p className="text-[9px] text-muted-foreground mt-2 italic">2 mins ago</p>
                                </div>
                            ))}
                        </div>
                        <div className="p-2 bg-muted/50 text-center">
                            <Button variant="link" className="text-[10px] h-auto p-0">View all notifications</Button>
                        </div>
                    </PopoverContent>
                </Popover>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-6 bg-muted-foreground/5 rounded hidden sm:flex transition-all duration-200 hover:scale-110 active:scale-95 hover:bg-muted-foreground/10">
                            <MessageSquare className="size-2.5" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-80 p-0">
                        <PopoverHeader className="p-4 border-b">
                            <PopoverTitle>Messages</PopoverTitle>
                        </PopoverHeader>
                        <div className="max-h-64 overflow-y-auto">
                            {[
                                { name: 'John Doe', msg: "Hey, can you check the new invoice?" },
                                { name: 'Sarah Wilson', msg: "The payment for INV-882 is pending." }
                            ].map((m, i) => (
                                <div key={i} className="p-4 border-b last:border-0 hover:bg-accent cursor-pointer transition-colors flex gap-3">
                                    <Avatar className="size-8">
                                        <AvatarFallback className="text-[10px]">{m.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium">{m.name}</p>
                                        <p className="text-[10px] text-muted-foreground truncate">{m.msg}</p>
                                    </div>
                                    <div className="size-2 bg-primary rounded-full mt-1 shrink-0" />
                                </div>
                            ))}
                        </div>
                        <div className="p-2 bg-muted/50 text-center">
                            <Button variant="link" className="text-[10px] h-auto p-0">Open Message Center</Button>
                        </div>
                    </PopoverContent>
                </Popover>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="size-5 transition-transform duration-200 hover:scale-110 cursor-pointer">
                            <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                            <AvatarFallback className="text-xs">JD</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <div className="flex items-center gap-2 p-2">
                            <Avatar className="size-8">
                                <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">John Doe</span>
                                <span className="text-xs text-muted-foreground">john@watermelon.ai</span>
                            </div>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <User className="size-4 mr-2" />
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings className="size-4 mr-2" />
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                            <LogOut className="size-4 mr-2" />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
