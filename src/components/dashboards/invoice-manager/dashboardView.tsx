"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination"
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
import Image from "next/image"

const StatusBadge = ({ status }: { status: string }) => {
    const statusStyles: Record<string, string> = {
        Rejected: "bg-red-500/20 text-red-400 border-red-500/30",
        Accepted: "bg-green-500/20 text-green-400 border-green-500/30",
        "Under Review": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        Processing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    }

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyles[status] || "bg-neutral-500/20 text-neutral-400 border-neutral-500/30"
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
        <div className="w-full h-full flex flex-col">
            <div className="flex items-center justify-between px-2 py-2.5 bg-neutral-900 border-b border-white/10">
                <div className="flex items-center gap-2">
                    <button className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                        <ChevronLeft className="size-4" />
                    </button>
                    <h1 className="text-sm font-medium text-foreground">Invoice Manager</h1>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        className="text-xs bg-neutral-800/60 text-neutral-400 rounded hover:bg-neutral-800/70"
                    >
                        Import & Export
                    </Button>
                    <Button
                        size="sm"
                        className="text-xs bg-neutral-800/60 text-neutral-400 rounded hover:bg-neutral-800/70"
                    >
                        <Plus className="size-3.5" />
                        Add New
                    </Button>
                    <Button
                        size="sm"
                        className="text-xs bg-neutral-800/60 text-neutral-400 rounded hover:bg-neutral-800/70"
                    >
                        Share
                    </Button>
                </div>
            </div>

            <div className="flex items-center justify-between px-2 py-2.5 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <Button
                        size="sm"
                        className="text-xs bg-neutral-800/60 text-neutral-400 rounded hover:bg-neutral-700 gap-1.5"
                    >
                        <RefreshCw className="size-3.5" />
                        Update
                    </Button>
                    {selectedCount > 0 && (
                        <span className="text-xs bg-neutral-800/60 text-neutral-400 px-2.5 py-2 rounded font-medium">
                            {selectedCount} Selected
                        </span>
                    )}
                    <Button
                        size="sm"
                        variant="ghost"
                        className="text-xs text-neutral-400 bg-neutral-800/60 rounded hover:text-neutral-200 gap-1.5"
                    >
                        <Filter className="size-3.5" />
                        Filter
                    </Button>
                    <Button
                        size="sm"
                        variant="ghost"
                        className="text-xs text-neutral-400 bg-neutral-800/60 rounded hover:text-neutral-200 gap-1.5"
                    >
                        <ArrowUpDown className="size-3.5" />
                        Sort
                    </Button>
                    <span className="text-xs text-neutral-400 font-medium">80 Results</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-neutral-500" />
                        <input
                            type="text"
                            placeholder="Search for the client"
                            className="h-8 pl-9 pr-3 text-xs bg-neutral-800/60 border border-white/10 text-neutral-300 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-700 w-56 rounded"
                        />
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="border-white/10 bg-neutral-950">
                            <TableHead className="text-xs text-neutral-400 font-medium border-r border-white/10">
                                <div className="flex items-center gap-3">
                                    <GripVertical className="size-4 text-neutral-600" />
                                    <Checkbox
                                        checked={isAllSelected}
                                        onCheckedChange={toggleSelectAll}
                                        className="border-neutral-600"
                                    />
                                    <span>Company</span>
                                </div>
                            </TableHead>
                            <TableHead className="text-xs text-neutral-400 font-medium border-r border-white/10">Client Name</TableHead>
                            <TableHead className="text-xs text-neutral-400 font-medium border-r border-white/10">Deal Value</TableHead>
                            <TableHead className="text-xs text-neutral-400 font-medium border-r border-white/10">Business Report</TableHead>
                            <TableHead className="text-xs text-neutral-400 font-medium border-r border-white/10">Invoice Date</TableHead>
                            <TableHead className="text-xs text-neutral-400 font-medium border-r border-white/10">Status</TableHead>
                            <TableHead className="text-xs text-neutral-400 font-medium">Category</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="[&_tr:last-child]:border-b">
                        {invoiceData.map((row) => (
                            <TableRow
                                key={row.id}
                                className={`border-white/10 hover:bg-neutral-800/60 border-b ${selectedRows.includes(row.id) ? "bg-neutral-900/30" : ""
                                    }`}
                                data-state={selectedRows.includes(row.id) ? "selected" : undefined}
                            >
                                <TableCell className="border-r border-white/10">
                                    <div className="flex items-center gap-3">
                                        <GripVertical className="size-4 text-neutral-600 cursor-grab" />
                                        <Checkbox
                                            checked={selectedRows.includes(row.id)}
                                            onCheckedChange={() => toggleSelectRow(row.id)}
                                            className="border-neutral-600"
                                        />
                                        <span className="text-xs text-neutral-300 font-medium">{row.company}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="border-r border-white/10">
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src={`https://avatar.vercel.sh/${row.clientName}`}
                                            alt={row.clientName}
                                            width={22.5}
                                            height={22.5}
                                            className=" rounded-full"
                                        />
                                        <span className="text-xs text-neutral-300">{row.clientName}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-xs text-neutral-300 border-r border-white/10">
                                    {row.dealValue}
                                </TableCell>
                                <TableCell className="text-xs text-neutral-400 max-w-xs truncate border-r border-white/10">
                                    {row.businessReport}
                                </TableCell>
                                <TableCell className="text-xs text-neutral-400 border-r border-white/10">
                                    {row.invoiceDate}
                                </TableCell>
                                <TableCell className="border-r border-white/10">
                                    <StatusBadge status={row.status} />
                                </TableCell>
                                <TableCell className="text-xs text-neutral-400">
                                    {row.category}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between px-2 py-2 border-white/10">
                <span className="text-xs text-neutral-400 min-w-fit font-medium">1-20 of 300</span>

                <Pagination>
                    <PaginationContent className="gap-1">
                        <PaginationItem>
                            <button
                                className="size-7 flex items-center justify-center rounded text-neutral-400 hover:bg-neutral-800 disabled:opacity-50"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            >
                                <ChevronLeft className="size-4" />
                            </button>
                        </PaginationItem>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((page) => (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setCurrentPage(page)
                                    }}
                                    isActive={currentPage === page}
                                    className={`size-7 text-xs rounded ${currentPage === page
                                        ? "bg-neutral-800 text-neutral-200"
                                        : "text-neutral-500 hover:bg-neutral-800/50 hover:text-neutral-300"
                                        }`}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <button
                                className="size-7 flex items-center justify-center rounded text-neutral-400 hover:bg-neutral-800"
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            >
                                <ChevronRight className="size-4" />
                            </button>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>

                <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-400 font-medium">Row/Page:</span>
                    <Select value={String(rowsPerPage)} onValueChange={(v) => setRowsPerPage(Number(v))}>
                        <SelectTrigger size="sm" className="h-5 w-fit text-xs px-2.5 bg-neutral-800/60 border-none text-neutral-300">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-neutral-900 border-white/10">
                            <SelectItem value="7" className="text-xs text-neutral-300">7 of 12</SelectItem>
                            <SelectItem value="10" className="text-xs text-neutral-300">10 of 12</SelectItem>
                            <SelectItem value="20" className="text-xs text-neutral-300">20 of 12</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}
