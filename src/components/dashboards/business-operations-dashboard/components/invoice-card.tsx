import { IconDots } from "@tabler/icons-react"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export interface Invoice {
    id: string
    amount: string
    status: "unpaid" | "paid" | "draft"
    date: string
    title: string
    gradient: string
}

export function InvoiceCard({ invoice }: { invoice: Invoice }) {
    return (
        <Card className="group shadow-xs border-border rounded-lg p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-neutral-200 dark:hover:shadow-neutral-900 active:scale-[0.98] cursor-pointer bg-background">
            <CardContent className="p-0 flex flex-col gap-2">
                {/* Top Row */}
                <div className="flex items-center justify-between mb-1">
                    <div className={`size-11 rounded-full bg-linear-to-br transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md ${invoice.gradient}`} />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="size-8 text-neutral-500 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity active:scale-90" onClick={(e) => e.stopPropagation()}>
                                <IconDots className="size-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40" onClick={(e) => e.stopPropagation()}>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Edit Invoice</DropdownMenuItem>
                            <DropdownMenuItem>Copy Link</DropdownMenuItem>
                            <DropdownMenuItem>Download PDF</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive">Archive</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Second Row */}
                <div className="flex items-center justify-between font-mono">
                    <span className="text-lg font-bold">{invoice.amount}</span>
                    <span className="text-sm text-muted-foreground font-medium">#{invoice.id}</span>
                </div>

                {/* Third Row */}
                <div>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        Ein flexibles Abonnementmodell für {invoice.title.toLowerCase()}...
                    </p>
                </div>

                {/* Bottom Row */}
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground tracking-tight">Due date: {invoice.date}</span>
                </div>
            </CardContent>
        </Card>
    )
}