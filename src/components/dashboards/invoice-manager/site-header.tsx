"use client"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Grid3X3, Bell, MessageSquare, ChevronRight } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import React from "react"

// Convert kebab-case to Title Case (e.g., "financial-center" -> "Financial Center")
function formatBreadcrumb(segment: string): string {
    return segment
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
}

export const SiteHeader = () => {
    const pathname = usePathname()
    const router = useRouter()

    // Split path and filter empty segments
    const segments = pathname.split("/").filter(Boolean)

    // Build breadcrumb items with cumulative paths
    const breadcrumbItems = segments.map((segment:any, index:any) => {
        const href = "/" + segments.slice(0, index + 1).join("/")
        const label = formatBreadcrumb(segment)
        const isLast = index === segments.length - 1

        return { href, label, isLast }
    })

    return (
        <header className="flex h-12 shrink-0 items-center justify-between gap-2 border-b px-2">
            {/* Left side: Back button + Breadcrumbs */}
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-6 bg-neutral-500/10 rounded"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="size-2.5" />
                </Button>

                <Breadcrumb>
                    <BreadcrumbList>
                        {breadcrumbItems.map((item:any, index:any) => (
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
                <Button variant="ghost" size="icon" className="size-6 bg-neutral-500/10 rounded">
                    <Grid3X3 className="size-2.5" />
                </Button>
                <Button variant="ghost" size="icon" className="size-6 bg-neutral-500/10 rounded">
                    <Bell className="size-2.5" />
                </Button>
                <Button variant="ghost" size="icon" className="size-6 bg-neutral-500/10 rounded">
                    <MessageSquare className="size-2.5" />
                </Button>
                <Avatar className="size-6">
                    <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                    <AvatarFallback className="text-xs">JD</AvatarFallback>
                </Avatar>
            </div>
        </header>
    )
}
