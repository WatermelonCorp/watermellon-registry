import { IconDots, IconEdit, IconTrash, IconSettings } from '@tabler/icons-react'
import { Button } from '../ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover"

export const BoardColumn = ({ column, children }: { column: any, children: React.ReactNode }) => {
    return (
        <div className="flex flex-col gap-4.5 w-[85vw] sm:w-[320px] lg:w-auto shrink-0 snap-center lg:snap-align-none h-full min-h-0">
            <div className="flex justify-between items-center px-2.5 pointer-events-none select-none">
                <div className="flex flex-col gap-0.5 min-w-0">
                    <h3 className="font-semibold tracking-tight text-[15px] text-zinc-900 dark:text-zinc-50 truncate">{column.title}</h3>
                    <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[12px] text-muted-foreground font-medium">
                        <span className="whitespace-nowrap">{column.cards.length} {column.id === 'closed' ? 'Deals' : 'Leads'}</span>
                        <span className="hidden sm:inline-block">•</span>
                        <span className="whitespace-nowrap">{column.total} <span className="text-neutral-300 dark:text-neutral-600 font-normal">Total</span></span>
                    </div>
                </div>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-foreground dark:hover:text-zinc-100 dark:hover:bg-zinc-800 hover:scale-110 active:scale-95 transition-all duration-200 pointer-events-auto">
                            <IconDots className="size-4" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-48 p-1.5 shadow-lg border-neutral-200 dark:border-zinc-800 pointer-events-auto">
                        <div className="flex flex-col gap-0.5">
                            <button className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/80 rounded-md transition-colors text-left">
                                <IconEdit className="size-4" />
                                Rename column
                            </button>
                            <button className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/80 rounded-md transition-colors text-left">
                                <IconSettings className="size-4" />
                                Column settings
                            </button>
                            <div className="h-px bg-border my-1" />
                            <button className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md transition-colors text-left font-medium">
                                <IconTrash className="size-4" />
                                Delete column
                            </button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            <div className="flex flex-col gap-3 flex-1 overflow-y-auto no-scrollbar pb-4 px-2 -mx-2 pt-2 -mt-2 min-h-0">
                {children}
            </div>

        </div>
    );
};
