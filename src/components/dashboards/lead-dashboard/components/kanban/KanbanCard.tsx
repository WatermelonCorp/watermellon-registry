import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { IconAlertCircle, IconCircleCheck, IconMail, IconFileText, IconCalendarPlus, IconMessageCircle } from '@tabler/icons-react'
import { Card, CardContent } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover"
import { IconUser, IconMailForward } from '@tabler/icons-react'

export const StatusMarker = ({ type }: { type: string }) => {
    switch (type) {
        case "urgent":
            return (
                <div className="bg-red-100/50 dark:bg-red-500/10 border-[1.5px] border-red-200/60 dark:border-red-500/20 p-1 rounded-full shrink-0 hover:scale-110 transition-transform duration-200 cursor-default">
                    <IconAlertCircle className="size-3.5 text-red-700 dark:text-red-400" strokeWidth={1.7} />
                </div>
            )
        case "done":
            return (
                <div className="bg-emerald-100/50 dark:bg-emerald-500/10 border-[1.5px] border-emerald-200/60 dark:border-emerald-500/20 p-1 rounded-full shrink-0 hover:scale-110 transition-transform duration-200 cursor-default">
                    <IconCircleCheck className="size-3.5 text-emerald-700 dark:text-emerald-400" strokeWidth={2.5} />
                </div>
            )
        default:
            return (
                <div className="bg-zinc-100/50 dark:bg-zinc-500/10 border-[1.5px] border-zinc-200/60 dark:border-zinc-500/20 p-1 rounded-full shrink-0 hover:scale-110 transition-transform duration-200 cursor-default">
                    {type === "mail" ? <IconMail className="size-3.5 text-zinc-500 dark:text-zinc-400" /> : <IconFileText className="size-3.5 text-zinc-500 dark:text-zinc-400" />}
                </div>
            )
    }
}

export const getStatusStyles = (type: string) => {
    switch (type) {
        case "urgent":
            return {
                footerBg: "bg-red-700/5 dark:bg-red-500/10",
                textColor: "text-red-700 dark:text-red-400",
                iconColor: "text-red-700 dark:text-red-400"
            }
        case "done":
            return {
                footerBg: "bg-emerald-700/5 dark:bg-emerald-500/10",
                textColor: "text-zinc-500 dark:text-zinc-400",
                iconColor: "text-zinc-500 dark:text-zinc-400"
            }
        default:
            return {
                footerBg: "bg-zinc-700/5 dark:bg-zinc-500/10",
                textColor: "text-zinc-500 dark:text-zinc-400",
                iconColor: "text-zinc-500 dark:text-zinc-400"
            }
    }
}

export const KanbanCard = ({ card, columnId }: { card: any, columnId: string }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: card.id,
        data: {
            type: "Card",
            card,
            columnId
        }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
    };

    const StatusStyles = getStatusStyles(card.type);

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Card className="touch-none overflow-hidden border-[1.5px] border-neutral-200 dark:border-zinc-800 shadow-xs hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] transition-all duration-200 cursor-grab active:cursor-grabbing bg-white dark:bg-zinc-900 group p-0 shrink-0">
                <CardContent className="p-0 flex flex-col pointer-events-none select-none">
                    <div className="p-4 flex flex-col gap-2.5">
                        <div className="flex items-start justify-between gap-2">
                            <h4 className="leading-tight font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors text-sm">{card.title}</h4>
                            <StatusMarker type={card.type} />
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                            {card.description}
                        </p>
                    </div>

                    <div className={`px-4 py-2.5 flex items-center justify-between gap-3 border-t border-neutral-200 dark:border-zinc-800 ${StatusStyles.footerBg}`}>
                        <Popover>
                            <PopoverTrigger asChild>
                                <div className="flex items-center gap-2 min-w-0 pointer-events-auto cursor-pointer hover:z-10 group/avatar">
                                    <Avatar className="size-4.5 shadow-xs shrink-0 group-hover/avatar:scale-110 group-hover/avatar:-translate-y-0.5 active:scale-95 transition-all duration-200">
                                        <AvatarFallback className={`${card.avatarColor} text-[6px] text-white font-bold`}>
                                            {card.user.split(' ').map((n: string) => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 group-hover/avatar:text-zinc-900 dark:group-hover/avatar:text-white truncate transition-colors">{card.user}</span>
                                </div>
                            </PopoverTrigger>
                            <PopoverContent align="start" className="w-56 p-1.5 shadow-lg border-neutral-200 dark:border-zinc-800 pointer-events-auto">
                                <div className="flex items-center gap-2.5 px-2 py-2 mb-1 border-b border-neutral-100 dark:border-zinc-800/50 pb-3">
                                    <Avatar className="size-9 rounded-full">
                                        <AvatarImage src="" />
                                        <AvatarFallback className={`${card.avatarColor} text-white font-medium text-xs rounded-full`}>
                                            {card.user.split(' ').map((n: string) => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold">{card.user}</span>
                                        <span className="text-[11px] text-muted-foreground">Sales Representative</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-0.5 mt-1.5">
                                    <button className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/80 rounded-md transition-colors text-left">
                                        <IconUser className="size-4" />
                                        View Profile
                                    </button>
                                    <button className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/80 rounded-md transition-colors text-left">
                                        <IconMailForward className="size-4" />
                                        Send Message
                                    </button>
                                </div>
                            </PopoverContent>
                        </Popover>

                        <div className="flex items-center gap-3 text-xs font-medium tracking-tight shrink-0">
                            <div className={`flex items-center gap-1 shrink-0 ${StatusStyles.textColor}`}>
                                <IconCalendarPlus strokeWidth={1.7} className={`size-4 shrink-0 ${StatusStyles.iconColor}`} />
                                <span className="whitespace-nowrap">{card.date}</span>
                            </div>
                            <div className="flex items-center gap-1 shrink-0 text-zinc-500 dark:text-zinc-400">
                                <IconMessageCircle className="size-4 shrink-0" strokeWidth={2} />
                                <span>{card.comments}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
