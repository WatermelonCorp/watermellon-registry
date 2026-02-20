"use client"

import {
    IconUser,
    IconFlag,
    IconAlertTriangle,
    IconTool,
    IconSettings,
    IconCalendar,
    IconMessage,
    IconClock
} from "@tabler/icons-react"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Badge } from "../ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { cn } from "@/lib/utils"
import type { StreamCardProps } from "./types"

const getDarkBadgeStyles = (bg: string) => {
    const colorMap: Record<string, string> = {
        amber: "dark:bg-amber-900/10 dark:text-amber-500",
        indigo: "dark:bg-indigo-900/10 dark:text-indigo-500",
        orange: "dark:bg-orange-900/10 dark:text-orange-500",
        emerald: "dark:bg-emerald-900/10 dark:text-emerald-500",
        rose: "dark:bg-rose-900/10 dark:text-rose-500",
        blue: "dark:bg-blue-900/10 dark:text-blue-500",
        purple: "dark:bg-purple-900/10 dark:text-purple-500",
    };

    const colorName = Object.keys(colorMap).find((c) => bg.includes(c));
    return colorName ? colorMap[colorName] : "dark:bg-neutral-800 dark:text-neutral-300";
};

export const StreamCard = ({ card }: { card: StreamCardProps }) => (
    <Card className="shadow-none bg-neutral-200/35 dark:bg-neutral-900 rounded-lg border-none px-3 py-2.5 gap-3">
        <CardHeader className="p-0 flex flex-row items-start justify-between space-y-0">
            <div className="flex gap-2">
                <div className={cn("size-7 rounded-sm flex items-center justify-center text-white shadow-sm", card.logoBg)}>
                    {card.logo}
                </div>
                <div className="grid gap-0.5">
                    <h4 className="text-base font-medium leading-tight tracking-tight text-neutral-900 dark:text-neutral-100">{card.title}</h4>
                    <span className="text-[13px] text-neutral-500 dark:text-neutral-400 font-medium">{card.code}</span>
                </div>
            </div>
            <Avatar className="size-8 border-2 border-white dark:border-neutral-800 shadow-sm">
                <AvatarImage src={card.avatar} className="grayscale hover:grayscale-0 transition-all cursor-pointer" />
                <AvatarFallback>
                    <IconUser className="size-4" />
                </AvatarFallback>
            </Avatar>
        </CardHeader>
        <CardContent className="p-5 pt-2 grid gap-3 bg-white dark:bg-neutral-950 rounded-lg">
            <div className="grid gap-2.5 py-1 dark:border-neutral-800/50">
                {[
                    { label: "Origin", value: card.details.origin, icon: <IconFlag className="size-4" /> },
                    { label: "Priority", value: card.details.priority, icon: <IconAlertTriangle className="size-4" /> },
                    { label: "Handler", value: card.details.handler, icon: <IconTool className="size-4" /> },
                    { label: "Process", value: card.details.process, icon: <IconSettings className="size-4" /> },
                    { label: "Date", value: card.details.date, icon: <IconCalendar className="size-4" /> },
                ].map((detail) => (
                    <div key={detail.label} className="flex items-center gap-12 text-[14px]">
                        <div className="flex items-center gap-2.5 text-neutral-400 dark:text-neutral-500 w-[100px]">
                            <span className="text-neutral-500 dark:text-neutral-400">{detail.icon}</span>
                            <span className="text-neutral-500 dark:text-neutral-400 text-xs font-semibold">{detail.label}</span>
                        </div>
                        <span className="text-neutral-900 dark:text-neutral-100 text-xs font-semibold tracking-tight max-md:truncate max-md:max-w-[100px]">{detail.value}</span>
                    </div>
                ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-1">
                {card.tags.map((tag, i) => (
                    <Badge
                        key={i}
                        variant="secondary"
                        className={cn(
                            "flex items-center gap-1.5 px-2 py-1 rounded-full border- shadow-none font- text-[12px] tracking-tight",
                            tag.bg,
                            tag.color,
                            getDarkBadgeStyles(tag.bg),
                            "dark:border-neutral-700/50"
                        )}
                    >
                        <span className="flex items-center justify-center">{tag.icon}</span>
                        {tag.label}
                    </Badge>
                ))}
            </div>
        </CardContent>
        <CardFooter className="flex items-center gap-5 text-neutral-500 dark:text-neutral-400 text-[11px] font-medium border-neutral-50 dark:border-neutral-800 px-0">
            <div className="flex items-center gap-1 cursor-pointer hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">
                <IconMessage className="size-3.5" />
                <span>{card.messages}</span>
            </div>
            <div className="flex items-center gap-1">
                <IconClock className="size-3.5" />
                <span>{card.time}</span>
            </div>
        </CardFooter>
    </Card>
)
