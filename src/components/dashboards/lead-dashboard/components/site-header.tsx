import {
    SidebarTrigger,
    useSidebar,
} from "./ui/sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "./ui/breadcrumb"
import { Separator } from "./ui/separator"
import { Input } from "./ui/input"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "./ui/avatar"
import {
    IconSearch,
    IconBell,
    IconSettings,
    IconUser,
    IconLogout
} from "@tabler/icons-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./ui/popover"

export function SiteHeader() {
    const { isMobile, state } = useSidebar()
    const isCollapsed = state === "collapsed"
    const showTrigger = isMobile || isCollapsed

    return (
        <header className="flex h-14 shrink-0 items-center justify-between border-b px-4 md:px-8">
            <div className="flex items-center gap-2">
                {showTrigger && (
                    <>
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                    </>
                )}
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="#" className="flex items-center gap-1 text-muted-foreground">
                                Lead
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="font-medium">Kanban Board</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="flex items-center gap-4">
                {/* Search Bar */}
                <div className="relative hidden lg:block">
                    <IconSearch className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" strokeWidth={2.5} />
                    <Input
                        placeholder="Search or ⌘K..."
                        className="h-8 w-52 rounded-md bg-muted/40 pl-9 pr-12 text-sm focus-visible:ring-1 focus-visible:ring-primary/20"
                    />
                </div>

                {/* Notifications */}
                <Popover>
                    <PopoverTrigger asChild>
                        <button className="flex h-8 items-center gap-1.5 rounded-full border bg-background px-2 hover:bg-muted/50 transition-colors shadow cursor-pointer group">
                            <IconBell className="ml-1 size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                            <div className="flex h-5 min-w-[26px] items-center justify-center rounded-full bg-zinc-800 dark:bg-zinc-200 px-1.5 text-[10px] font-medium text-white dark:text-zinc-900 leading-none">
                                12
                            </div>
                        </button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-80 p-0 overflow-hidden shadow-lg border-neutral-200 dark:border-zinc-800">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                            <h4 className="font-semibold text-sm">Notifications</h4>
                            <span className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">Mark all read</span>
                        </div>
                        <div className="flex flex-col max-h-[300px] overflow-y-auto">
                            <div className="p-4 flex gap-3 hover:bg-muted/50 transition-colors cursor-pointer border-b border-neutral-100 dark:border-zinc-800">
                                <div className="size-8 rounded-full bg-blue-100/50 dark:bg-blue-500/10 flex items-center justify-center shrink-0">
                                    <IconUser className="size-4 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-medium leading-none">New Lead Assigned</p>
                                    <p className="text-xs text-muted-foreground">Sarah assigned the 'TechCorp' lead to you.</p>
                                    <p className="text-[10px] text-muted-foreground mt-0.5">2 hours ago</p>
                                </div>
                            </div>
                            <div className="p-4 flex gap-3 hover:bg-muted/50 transition-colors cursor-pointer border-b border-neutral-100 dark:border-zinc-800">
                                <div className="size-8 rounded-full bg-emerald-100/50 dark:bg-emerald-500/10 flex items-center justify-center shrink-0">
                                    <IconBell className="size-4 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-medium leading-none">Deal Closed!</p>
                                    <p className="text-xs text-muted-foreground">The 'OceanLabs' deal was marked as closed won.</p>
                                    <p className="text-[10px] text-muted-foreground mt-0.5">5 hours ago</p>
                                </div>
                            </div>
                            <div className="p-4 text-center">
                                <span className="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer font-medium">View all notifications</span>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>

                {/* User Profile */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Avatar className="size-8 rounded-full shadow-sm cursor-pointer hover:opacity-90 transition-opacity">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-linear-to-br from-blue-400 via-purple-500 to-pink-500 text-white rounded-full">AJ</AvatarFallback>
                        </Avatar>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-56 p-1.5 shadow-lg border-neutral-200 dark:border-zinc-800">
                        <div className="flex items-center gap-2.5 px-2 py-2 mb-1 border-b border-neutral-100 dark:border-zinc-800/50 pb-3">
                            <Avatar className="size-9 rounded-full">
                                <AvatarImage src="" />
                                <AvatarFallback className="bg-linear-to-br from-blue-400 via-purple-500 to-pink-500 text-white font-medium text-xs rounded-full">AJ</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">Alex Johnson</span>
                                <span className="text-[11px] text-muted-foreground">alex@oceanlabs.co</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-0.5 mt-1.5">
                            <button className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/80 rounded-md transition-colors text-left">
                                <IconUser className="size-4" />
                                Profile Profile
                            </button>
                            <button className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/80 rounded-md transition-colors text-left">
                                <IconSettings className="size-4" />
                                Account Settings
                            </button>
                            <div className="h-px bg-border my-1" />
                            <button className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md transition-colors text-left font-medium">
                                <IconLogout className="size-4" />
                                Sign out
                            </button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </header>
    )
}