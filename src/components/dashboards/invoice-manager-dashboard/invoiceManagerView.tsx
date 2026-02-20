"use client"

import { useState } from "react"
import { Button } from "./components/ui/button"
import { Checkbox } from "./components/ui/checkbox"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./components/ui/select"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "./components/ui/pagination"
import {
    ChevronLeft,
    ChevronRight,
    Plus,
    Filter,
    ArrowUpDown,
    Search,
    RefreshCw,
    GripVertical,
} from "lucide-react"

const StatusBadge = ({ status }: { status: string }) => {
    const statusStyles: Record<string, string> = {
        Rejected: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
        Accepted: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
        "Under Review": "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
        Processing: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    }

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium border ${statusStyles[status] || "bg-muted text-muted-foreground border-border"
                }`}
        >
            {status}
        </span>
    )
}


const invoiceData = [
    { id: 1, company: "BrightPath", clientName: "Olivia Carter", dealValue: "$1300", businessReport: "Financial dashboard for investment tracking.", invoiceDate: "24/10/2025", status: "Rejected", category: "Finance" },
    { id: 2, company: "CoreVision", clientName: "Ethan Miller", dealValue: "$2500", businessReport: "Designed an AI workflow tool for customer support.", invoiceDate: "26/10/2025", status: "Accepted", category: "AI" },
    { id: 3, company: "VentureEdge", clientName: "Amelia Thompson", dealValue: "$3600", businessReport: "Created a sleek B2B portfolio website.", invoiceDate: "31/10/2025", status: "Under Review", category: "B2B" },
    { id: 4, company: "Skyline Group", clientName: "Liam Johnson", dealValue: "$800", businessReport: "Developed a SaaS analytics platform for performance.", invoiceDate: "03/11/2025", status: "Processing", category: "SaaS" },
    { id: 5, company: "NextLink", clientName: "Charlotte Davis", dealValue: "$4200", businessReport: "Automated internal operations with a central dashboard.", invoiceDate: "07/11/2025", status: "Accepted", category: "Automation" },
    { id: 6, company: "HelloOne", clientName: "Noah Anderson", dealValue: "$2300", businessReport: "Smart AI platform for marketing personalization.", invoiceDate: "10/11/2025", status: "Rejected", category: "Tech" },
    { id: 7, company: "NovaTech", clientName: "Isabella White", dealValue: "$10,800", businessReport: "SaaS client dashboard for enterprise reporting.", invoiceDate: "8/11/2025", status: "Under Review", category: "SaaS" },
    { id: 8, company: "AxisLogic", clientName: "James Wilson", dealValue: "$2300", businessReport: "B2B CRM to streamline client communication.", invoiceDate: "12/11/2025", status: "Accepted", category: "B2B" },
    { id: 9, company: "FusionWorks", clientName: "Mia Martinez", dealValue: "$7500", businessReport: "Automation tool for logistics management.", invoiceDate: "14/11/2025", status: "Under Review", category: "Automation" },
    { id: 10, company: "DataVerse", clientName: "Benjamin Moore", dealValue: "$15,000", businessReport: "Built a big data analytics dashboard.", invoiceDate: "15/11/2025", status: "Processing", category: "Tech" },
    { id: 11, company: "Optima Corp", clientName: "Harper Lewis", dealValue: "$4200", businessReport: "Lead management dashboard for sales teams.", invoiceDate: "18/11/2025", status: "Rejected", category: "B2B" },
    { id: 12, company: "StratusFlow", clientName: "Lucas Robinson", dealValue: "$2500", businessReport: "Engineered a finance forecasting platform.", invoiceDate: "19/11/2025", status: "Accepted", category: "Finance" },
    { id: 13, company: "BluePeak", clientName: "Ella Walker", dealValue: "$4200", businessReport: "Designed a SaaS UI focused on client retention.", invoiceDate: "20/11/2025", status: "Accepted", category: "SaaS" },
    { id: 14, company: "NeuraSys", clientName: "Henry Hall", dealValue: "$1300", businessReport: "Built an AI interface for business predictions.", invoiceDate: "22/11/2025", status: "Under Review", category: "AI" },
    { id: 15, company: "VortexPro", clientName: "Grace Allen", dealValue: "$15,000", businessReport: "Automation dashboard for team operations.", invoiceDate: "23/11/2025", status: "Rejected", category: "Automation" },
    { id: 16, company: "OmniReach", clientName: "Jack Turner", dealValue: "$4200", businessReport: "Developed a B2B outreach portal for marketing.", invoiceDate: "24/11/2025", status: "Processing", category: "B2B" },
    { id: 17, company: "DataFusion", clientName: "Scarlett King", dealValue: "$4,890", businessReport: "Built a corporate finance reporting tool.", invoiceDate: "26/11/2025", status: "Accepted", category: "Finance" },
    { id: 18, company: "Lumeon", clientName: "William Scott", dealValue: "$1300", businessReport: "Designed an AI-driven business insights app.", invoiceDate: "29/11/2025", status: "Rejected", category: "Tech" },
]

export const InvoiceManagerView = () => {
    const [selectedRows, setSelectedRows] = useState<number[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(7)

    const totalResults = 300
    const totalPages = Math.ceil(totalResults / 20)

    const toggleSelectAll = () => {
        if (selectedRows.length === invoiceData.length) {
            setSelectedRows([])
        } else {
            setSelectedRows(invoiceData.map((row) => row.id))
        }
    }

    const toggleSelectRow = (id: number) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        )
    }

    const isAllSelected = selectedRows.length === invoiceData.length
    const selectedCount = selectedRows.length

    return (
        <div className="w-full h-full flex flex-col bg-background text-foreground">
            <div className="flex sm:flex-row sm:items-center justify-between px-4 py-3 bg-neutral-950/5 dark:bg-neutral-900 border-b border-border gap-4 sm:gap-2">

                <div className="flex items-center gap-2">
                    <button className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                        <ChevronLeft className="size-4" />
                    </button>
                    <h1 className="text-sm font-medium text-foreground">Invoice Manager</h1>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Button
                        size="sm"
                        className="text-[10px] sm:text-xs bg-muted text-muted-foreground rounded hover:bg-muted/80 h-8 sm:h-9 hidden sm:flex border border-border"
                    >
                        Import & Export
                    </Button>

                    <Button
                        size="sm"
                        className="text-[10px] sm:text-xs bg-muted text-muted-foreground rounded hover:bg-muted/80 h-8 sm:h-9 border border-border"
                    >
                        <Plus className="size-3.5" />
                        <span className="hidden xs:inline">Add New</span>
                        <span className="xs:hidden">Add</span>
                    </Button>

                    <Button
                        size="sm"
                        className="text-[10px] sm:text-xs bg-muted text-muted-foreground rounded hover:bg-muted/80 h-8 sm:h-9 hidden sm:flex border border-border"
                    >
                        Share
                    </Button>

                </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between px-4 py-3 border-b border-border gap-4 lg:gap-2">

                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <Button
                        size="sm"
                        className="text-[10px] sm:text-xs bg-muted text-muted-foreground rounded hover:bg-muted/80 gap-1.5 h-8 sm:h-9"
                    >
                        <RefreshCw className="size-3.5" />
                        Update
                    </Button>
                    {selectedCount > 0 && (
                        <span className="text-[10px] sm:text-xs bg-muted flex items-center justify-center text-muted-foreground px-2.5 py-1.5 h-8 sm:h-9 sm:py-2 rounded font-medium">
                            {selectedCount} Selected
                        </span>
                    )}
                    <Button
                        size="sm"
                        variant="ghost"
                        className="text-[10px] sm:text-xs text-muted-foreground bg-muted rounded hover:bg-muted/80 gap-1.5 h-8 sm:h-9"
                    >
                        <Filter className="size-3.5" />
                        Filter
                    </Button>
                    <Button
                        size="sm"
                        variant="ghost"
                        className="text-[10px] sm:text-xs text-muted-foreground bg-muted rounded hover:bg-muted/80 gap-1.5 h-8 sm:h-9"
                    >
                        <ArrowUpDown className="size-3.5" />
                        Sort
                    </Button>
                    <span className="text-[10px] sm:text-xs text-muted-foreground font-medium ml-2">80 Results</span>
                </div>

                <div className="flex items-center gap-2 w-full lg:w-auto">
                    <div className="relative w-full lg:w-64">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search for the client"
                            className="w-full bg-muted/40 border border-border rounded px-8 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-all"
                        />
                    </div>

                </div>
            </div>
            <div className="flex-1 overflow-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="border-border bg-neutral-950/5 dark:bg-neutral-950">
                            <TableHead className="text-xs text-muted-foreground font-medium border-r border-border">
                                <div className="flex items-center gap-3">
                                    <GripVertical className="size-4 text-muted-foreground/40" />
                                    <Checkbox
                                        checked={isAllSelected}
                                        onCheckedChange={toggleSelectAll}
                                        className="border-border"
                                    />
                                    <span>Company</span>
                                </div>
                            </TableHead>
                            <TableHead className="text-[10px] sm:text-xs text-muted-foreground font-medium border-r border-border min-w-[150px]">Client Name</TableHead>
                            <TableHead className="text-[10px] sm:text-xs text-muted-foreground font-medium border-r border-border">Deal Value</TableHead>
                            <TableHead className="text-[10px] sm:text-xs text-muted-foreground font-medium border-r border-border">Business Report</TableHead>
                            <TableHead className="text-[10px] sm:text-xs text-muted-foreground font-medium border-r border-border">Invoice Date</TableHead>
                            <TableHead className="text-[10px] sm:text-xs text-muted-foreground font-medium border-r border-border">Status</TableHead>
                            <TableHead className="text-[10px] sm:text-xs text-muted-foreground font-medium">Category</TableHead>
                        </TableRow>
                    </TableHeader>


                    <TableBody className="[&_tr:last-child]:border-b">
                        {invoiceData.map((row) => (
                            <TableRow
                                key={row.id}
                                className={`border-border hover:bg-muted/20 border-b ${selectedRows.includes(row.id) ? "bg-muted/30" : ""
                                    }`}
                                data-state={selectedRows.includes(row.id) ? "selected" : undefined}
                            >
                                <TableCell className="border-r border-border">
                                    <div className="flex items-center gap-3">
                                        <GripVertical className="size-4 text-muted-foreground/40 cursor-grab" />
                                        <Checkbox
                                            checked={selectedRows.includes(row.id)}
                                            onCheckedChange={() => toggleSelectRow(row.id)}
                                            className="border-border"
                                        />
                                        <span className="text-xs text-foreground font-medium">{row.company}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="border-r border-border min-w-[150px]">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={`https://avatar.vercel.sh/${row.clientName}`}
                                            alt={row.clientName}
                                            width={22.5}
                                            height={22.5}
                                            className="rounded-full"
                                        />
                                        <span className="text-[10px] sm:text-xs text-foreground font-medium">{row.clientName}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-[10px] sm:text-xs text-foreground font-medium border-r border-border">
                                    {row.dealValue}
                                </TableCell>

                                <TableCell className="text-[10px] sm:text-xs text-muted-foreground max-w-xs truncate border-r border-border">
                                    {row.businessReport}
                                </TableCell>
                                <TableCell className="text-[10px] sm:text-xs text-muted-foreground border-r border-border">
                                    {row.invoiceDate}
                                </TableCell>
                                <TableCell className="border-r border-border">
                                    <StatusBadge status={row.status} />
                                </TableCell>
                                <TableCell className="text-[10px] sm:text-xs text-muted-foreground">
                                    {row.category}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between px-4 py-3 border-t border-border gap-4 md:gap-2 bg-background">
                <div className="text-xs text-muted-foreground font-medium order-2 md:order-1 max-w-xs truncate">
                    1-20 of 300
                </div>
                <Pagination className="order-1 md:order-2">
                    <PaginationContent className="gap-1">
                        <PaginationItem>
                            <button
                                className="size-8 sm:size-7 flex items-center justify-center rounded text-muted-foreground hover:bg-muted disabled:opacity-50"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            >
                                <ChevronLeft className="size-4" />
                            </button>

                        </PaginationItem>
                        {[1, 2, 3, 4, 5].map((page) => (
                            <PaginationItem key={page} className={page > 3 ? "hidden sm:block" : ""}>
                                <PaginationLink
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setCurrentPage(page)
                                    }}
                                    isActive={currentPage === page}
                                    className={`size-8 sm:size-7 text-[10px] sm:text-xs rounded ${currentPage === page
                                        ? "bg-primary text-primary-foreground dark:text-white font-medium"
                                        : "text-muted-foreground hover:bg-muted"
                                        }`}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem className="hidden sm:block">
                            <span className="text-muted-foreground/30 px-1">...</span>
                        </PaginationItem>
                        <PaginationItem>
                            <button
                                className="size-8 sm:size-7 flex items-center justify-center rounded text-muted-foreground hover:bg-muted"
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            >
                                <ChevronRight className="size-4" />
                            </button>

                        </PaginationItem>
                    </PaginationContent>
                </Pagination>

                <div className="flex items-center gap-2 order-3">
                    <span className="text-[10px] sm:text-xs text-muted-foreground font-medium">Row/Page:</span>
                    <Select value={String(rowsPerPage)} onValueChange={(v) => setRowsPerPage(Number(v))}>
                        <SelectTrigger size="sm" className="h-6 sm:h-5 w-fit text-[10px] sm:text-xs px-2 sm:px-2.5 bg-muted border-none text-muted-foreground">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border">
                            <SelectItem value="7" className="text-xs">7</SelectItem>
                            <SelectItem value="10" className="text-xs">10</SelectItem>
                            <SelectItem value="20" className="text-xs">20</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

            </div>

        </div>
    )
}
