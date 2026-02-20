"use client"

import { IconPlus, IconDots } from "@tabler/icons-react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import type { StreamCardProps } from "./types"
import { StreamCard } from "./stream-card"

export const KanbanColumn = ({
    title,
    count,
    cards,
    icon: Icon
}: {
    title: string
    count: number
    cards: StreamCardProps[]
    icon: any
}) => (
    <div className="flex-1 min-w-[340px] border-x-[1.5px] p-1.5 flex flex-col gap-4 border-neutral-100 dark:border-neutral-900 min-h-0">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 bg-neutral-200/50 dark:bg-neutral-800/50 px-2 py-1.5 rounded-lg">
                <Icon className="size-4 text-neutral-600 dark:text-neutral-400" />
                <h3 className="font text-neutral-800 dark:text-neutral-200 text-sm tracking-tight">{title}</h3>
                <Badge variant="secondary" className="bg-neutral-50 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200/80 dark:hover:bg-neutral-700/80 rounded size-4 border-none text-[12px]">
                    {count}
                </Badge>
            </div>
            <div className="flex items-center gap-1 text-neutral-400 dark:text-neutral-500">
                <Button variant="ghost" size="icon-sm" className=" hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 rounded-lg">
                    <IconPlus className="size-4" />
                </Button>
                <Button variant="ghost" size="icon-sm" className="hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 rounded-lg">
                    <IconDots className="size-4" />
                </Button>
            </div>
        </div>
        <div className="flex-1 overflow-y-auto flex flex-col gap-2 pb-2 scrollbar-hide">
            {cards.map((card) => (
                <StreamCard key={card.id} card={card} />
            ))}
        </div>
    </div>
)
