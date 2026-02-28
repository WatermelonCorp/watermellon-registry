"use client"

import { useState } from "react"
import {
    IconLayoutColumns,
    IconLayoutList,
    IconAdjustmentsHorizontal,
    IconCirclePlus,
    IconPlus
} from '@tabler/icons-react'
import {
    DndContext,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
    type DragOverEvent
} from "@dnd-kit/core"
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./components/ui/popover"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "./components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./components/ui/select"
import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "./components/ui/tabs"
import { boardData as initialBoardData } from "./components/data"
import { KanbanCard } from "./components/kanban/KanbanCard"
import { BoardColumn } from "./components/kanban/KanbanColumn"

export const KanbanBoardView = () => {
    const [board, setBoard] = useState(initialBoardData);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveACard = active.data.current?.type === "Card";
        const isOverACard = over.data.current?.type === "Card";
        const isOverAColumn = over.data.current?.type === "Column";

        if (!isActiveACard) return;

        setBoard((columns) => {
            const activeColumn = columns.find(col => col.cards.some(c => c.id === activeId));
            const activeCard = activeColumn?.cards.find(c => c.id === activeId);

            if (!activeColumn || !activeCard) return columns;

            if (isOverACard) {
                const overColumn = columns.find(col => col.cards.some(c => c.id === overId));
                if (!overColumn) return columns;

                if (activeColumn.id === overColumn.id) return columns;

                const overCardIndex = overColumn.cards.findIndex(c => c.id === overId);
                return columns.map(col => {
                    if (col.id === activeColumn.id) {
                        return { ...col, cards: col.cards.filter(c => c.id !== activeId) };
                    }
                    if (col.id === overColumn.id) {
                        const newCards = [...col.cards];
                        newCards.splice(overCardIndex, 0, activeCard);
                        return { ...col, cards: newCards };
                    }
                    return col;
                });
            }

            if (isOverAColumn) {
                if (activeColumn.id === overId) return columns;

                return columns.map(col => {
                    if (col.id === activeColumn.id) {
                        return { ...col, cards: col.cards.filter(c => c.id !== activeId) };
                    }
                    if (col.id === overId) {
                        return { ...col, cards: [...col.cards, activeCard] };
                    }
                    return col;
                });
            }

            return columns;
        });
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        setBoard((columns) => {
            const activeColumn = columns.find(col => col.cards.some(c => c.id === activeId));
            const overColumn = columns.find(col => col.cards.some(c => c.id === overId));

            if (!activeColumn || !overColumn) return columns;

            if (activeColumn.id === overColumn.id) {
                const activeIndex = activeColumn.cards.findIndex(c => c.id === activeId);
                const overIndex = overColumn.cards.findIndex(c => c.id === overId);

                return columns.map(col => {
                    if (col.id === activeColumn.id) {
                        return { ...col, cards: arrayMove(col.cards, activeIndex, overIndex) };
                    }
                    return col;
                });
            }

            return columns;
        });
    };

    return (
        <DndContext
            id="kanban-dnd-context"
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div className="flex flex-col h-full bg-zinc-50/50 dark:bg-zinc-950/50 overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 min-h-14 border-b dark:border-zinc-800 bg-white dark:bg-zinc-900/50 px-4 md:px-8 py-3 md:py-0 shrink-0">
                    <div className="flex items-center gap-2 text-[13px] shrink-0">
                        <span className="text-muted-foreground">Total: <span className="font-semibold text-foreground">17 Leads</span></span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">Closed: <span className="font-semibold text-foreground">8 Deals</span></span>
                    </div>

                    <div className="flex items-center gap-2 md:gap-3 overflow-x-auto overflow-y-hidden no-scrollbar w-full md:w-auto md:pb-0 shrink-0">
                        <Tabs defaultValue="kanban" className="w-auto shrink-0">
                            <TabsList className="h-8! rounded-lg bg-muted/50 border p-0">
                                <TabsTrigger value="kanban" className="h-full w-9 p-0 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-xs hover:bg-muted/80 transition-all duration-200 active:scale-95">
                                    <IconLayoutColumns className="size-4" strokeWidth={2} />
                                </TabsTrigger>
                                <TabsTrigger value="list" className="h-full w-9 p-0 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-xs hover:bg-muted/80 transition-all duration-200 active:scale-95">
                                    <IconLayoutList className="size-4" strokeWidth={2} />
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>

                        <Select defaultValue="all">
                            <SelectTrigger className="h-8! w-fit gap-1 rounded-lg border bg-background px-2.5 hover:bg-muted/50 active:scale-95 transition-all duration-200 font-medium text-[13px] shrink-0">
                                <SelectValue placeholder="All leads" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All leads</SelectItem>
                                <SelectItem value="active">Active leads</SelectItem>
                                <SelectItem value="lost">Lost leads</SelectItem>
                            </SelectContent>
                        </Select>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="h-8 px-2.5 rounded-lg gap-1.5 font-medium text-[13px] hover:bg-muted/50 active:scale-95 transition-all duration-200 shrink-0">
                                    <IconAdjustmentsHorizontal className="size-4" strokeWidth={2} />
                                    Filter
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent align="end" className="w-64 p-3 shadow-lg border-neutral-200 dark:border-zinc-800">
                                <h4 className="font-semibold text-sm mb-3">Filter Leads</h4>
                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-col gap-1.5">
                                        <Label className="text-xs">Assigned to</Label>
                                        <Select defaultValue="any">
                                            <SelectTrigger className="h-8 text-xs">
                                                <SelectValue placeholder="Select user" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="any">Any user</SelectItem>
                                                <SelectItem value="me">Assigned to me</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <Label className="text-xs">Date matched</Label>
                                        <Select defaultValue="any">
                                            <SelectTrigger className="h-8 text-xs">
                                                <SelectValue placeholder="Select date range" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="any">Any time</SelectItem>
                                                <SelectItem value="today">Today</SelectItem>
                                                <SelectItem value="week">This week</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="h-8 px-2.5 rounded-lg gap-1.5 text-[13px] font-semibold bg-zinc-950 text-white hover:bg-zinc-800 hover:shadow-md active:scale-95 transition-all duration-200 shrink-0">
                                    <IconCirclePlus className="size-4" strokeWidth={2.5} />
                                    Add lead
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Create New Lead</DialogTitle>
                                    <DialogDescription>
                                        Add a new lead to the Kanban board.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="company">Company / Title</Label>
                                        <Input id="company" placeholder="e.g. Acme Corp Web Redesign" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="contact">Primary Contact</Label>
                                        <Input id="contact" placeholder="e.g. John Doe" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="status">Initial Status</Label>
                                        <Select defaultValue="contacted">
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="contacted">Contacted</SelectItem>
                                                <SelectItem value="negotiation">Negotiation</SelectItem>
                                                <SelectItem value="won">Closed Won</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Create Lead</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <div className="flex-1 overflow-hidden px-4 md:px-8 py-4 md:py-6 min-h-0 flex flex-col">
                    <div className="flex lg:grid lg:grid-cols-4 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none gap-4 md:gap-6 w-full max-w-(--breakpoint-2xl) mx-auto flex-1 min-h-0 pb-4 no-scrollbar items-start">
                        {board.map((column) => (
                            <BoardColumn key={column.id} column={column}>
                                <SortableContext
                                    items={column.cards.map(c => c.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {column.cards.map((card, index) => (
                                        <KanbanCard key={card.id} card={card} index={index} columnId={column.id} />
                                    ))}
                                </SortableContext>

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="h-10 w-full rounded-lg border-neutral-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-800 hover:border-neutral-300 dark:hover:border-zinc-700 gap-1.5 text-muted-foreground font-semibold text-sm shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 shrink-0">
                                            <IconPlus className="size-4" />
                                            Add
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Add card to {column.title}</DialogTitle>
                                            <DialogDescription>
                                                Create a new lead card in this column.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="title">Lead Title</Label>
                                                <Input id="title" placeholder="e.g. Acme Corp Redesign" />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="desc">Description</Label>
                                                <Input id="desc" placeholder="Brief details about the lead..." />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit">Create Card</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </BoardColumn>
                        ))}
                    </div>
                </div>
            </div>
        </DndContext>
    )
}
