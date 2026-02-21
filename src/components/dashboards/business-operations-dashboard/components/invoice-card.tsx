"use client"

import { Card, CardContent } from "./ui/card"

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
        <Card className="shadow-xs border-border rounded-lg p-4">
            <CardContent className="p-0 flex flex-col gap-2">
                {/* Top Row */}
                <div className="flex items-center justify-between mb-1">
                    <div className={`size-11 rounded-full bg-linear-to-br ${invoice.gradient}`} />
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
