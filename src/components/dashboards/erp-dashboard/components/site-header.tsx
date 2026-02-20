"use client"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
} from "./ui/breadcrumb"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import { Mail, Bell, UserPlus } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectSeparator,
    SelectValue,
} from "./ui/select"
import { SidebarTrigger } from "./ui/sidebar"
import { ModeToggle } from "./mode-toggle"

export default function SiteHeader() {
    return (
        <header className="flex h-[4.5rem] shrink-0 items-center justify-between border-b px-7 max-md:px-5">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="md:hidden" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block text-base font-medium text-neutral-900 dark:text-white">
                            Dashboard
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="flex items-center gap-1">
                <div className="flex items-center gap-2">
                    <ModeToggle />
                    <Button variant="ghost" size="icon-sm" className="h-9 w-9 rounded-md bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border-t border-neutral-200 dark:border-neutral-700/80">
                        <Mail className="h-[1.1rem] w-[1.1rem]" />
                    </Button>
                    <Button variant="ghost" size="icon-sm" className="h-9 w-9 rounded-md bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border-t border-neutral-200 dark:border-neutral-700/80 relative">
                        <Bell className="h-[1.1rem] w-[1.1rem]" />
                        <span className="absolute top-2 right-2.5 h-1.5 w-1.5 rounded-full bg-rose-500 border border-neutral-100 dark:border-neutral-950" />
                    </Button>
                </div>

                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-6"
                />

                <div className="flex items-center gap-2">
                    <Select defaultValue="profile">
                        <SelectTrigger className="h-9 w-fit bg-neutral-100 dark:bg-neutral-900/50 border-t border-x-0 border-b-0 border-t-neutral-200 dark:border-t-neutral-700/80 hover:bg-neutral-200 dark:hover:bg-neutral-800 px-2 gap-2 text-neutral-800 dark:text-neutral-100 data-[state=open]:bg-neutral-200 dark:data-[state=open]:bg-neutral-800 focus:ring-1 focus:ring-neutral-200 dark:focus:ring-neutral-700 shadow-none">
                            <img
                                src="https://github.com/shadcn.png"
                                alt="Avatar"
                                className="h-6 w-6 rounded-md object-cover"
                            />
                            <span className="sr-only">
                                <SelectValue placeholder="Profile" />
                            </span>
                        </SelectTrigger>
                        <SelectContent position="popper" align="end" sideOffset={8} className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 min-w-[160px]">
                            <SelectItem value="profile" className="focus:bg-neutral-100 dark:focus:bg-neutral-800 focus:text-neutral-900 dark:focus:text-neutral-100 cursor-pointer">
                                My Profile
                            </SelectItem>
                            <SelectItem value="settings" className="focus:bg-neutral-100 dark:focus:bg-neutral-800 focus:text-neutral-900 dark:focus:text-neutral-100 cursor-pointer">
                                Settings
                            </SelectItem>
                            <SelectSeparator className="bg-neutral-100 dark:bg-neutral-800" />
                            <SelectItem value="logout" className="focus:bg-neutral-100 dark:focus:bg-neutral-800 focus:text-rose-600 dark:focus:text-rose-400 text-rose-500 cursor-pointer">
                                Logout
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    <Button className="h-9 px-4 bg-neutral-800 dark:bg-neutral-800 hover:bg-black dark:hover:bg-neutral-700 text-white dark:text-neutral-100 text-sm font-medium rounded-md border-t border-x-0 border-b-0 border-t-neutral-700 dark:border-t-neutral-700/80 flex items-center gap-1">
                        <UserPlus className="h-4 w-4" />
                        Invite
                    </Button>
                </div>
            </div>
        </header>
    )
}
