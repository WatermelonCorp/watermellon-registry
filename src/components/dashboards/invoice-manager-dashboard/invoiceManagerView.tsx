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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./components/ui/dialog"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./components/ui/popover"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "./components/ui/dropdown-menu"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import {
    ChevronLeft,
    ChevronRight,
    Plus,
    Filter,
    ArrowUpDown,
    Search,
    RefreshCw,
    GripVertical,
    Download,
    Upload,
    FileJson,
    FileSpreadsheet,
    FileText,
    Share2,
    Copy,
} from "lucide-react"
import { invoiceData } from "./data"

const StatusBadge = ({ status }: { status: string }) => {
    const statusStyles: Record<string, string> = {
        Rejected: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
        Accepted: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
        "Under Review": "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
        Processing: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    }

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium border transition-transform duration-200 hover:scale-110 cursor-default ${statusStyles[status] || "bg-muted text-muted-foreground border-border"
                }`}
        >
            {status}
        </span>
    )
}

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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                size="sm"
                                className="text-[10px] sm:text-xs bg-white text-muted-foreground rounded hover:bg-white/80 dark:bg-muted dark:hover:bg-muted/80 h-8 sm:h-9 hidden sm:flex border border-border transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:-translate-y-0.5"
                            >
                                <Download className="size-3 mr-1.5" />
                                Import & Export
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem>
                                <Upload className="size-4 mr-2" />
                                Import CSV
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <FileSpreadsheet className="size-4 mr-2" />
                                Export Excel
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <FileText className="size-4 mr-2" />
                                Export PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <FileJson className="size-4 mr-2" />
                                Export JSON
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                size="sm"
                                className="text-[10px] sm:text-xs bg-white text-muted-foreground rounded hover:bg-white/80 dark:bg-muted dark:hover:bg-muted/80 h-8 sm:h-9 border border-border transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:-translate-y-0.5"
                            >
                                <Plus className="size-3.5" />
                                <span className="hidden xs:inline">Add New</span>
                                <span className="xs:hidden">Add</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create New Invoice</DialogTitle>
                                <DialogDescription>
                                    Enter the details for the new invoice here.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="company" className="text-right">Company</Label>
                                    <Input id="company" placeholder="Acme Inc." className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="client" className="text-right">Client Name</Label>
                                    <Input id="client" placeholder="John Smith" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="value" className="text-right">Deal Value</Label>
                                    <Input id="value" placeholder="$0.00" className="col-span-3" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Save Invoice</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                size="sm"
                                className="text-[10px] sm:text-xs bg-white text-muted-foreground rounded hover:bg-white/80 dark:bg-muted dark:hover:bg-muted/80 h-8 sm:h-9 hidden sm:flex border border-border transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:-translate-y-0.5"
                            >
                                <Share2 className="size-3 mr-1.5" />
                                Share
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                            <DialogHeader>
                                <DialogTitle>Share Invoice</DialogTitle>
                                <DialogDescription>
                                    Anyone with the link can view this invoice.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex items-center space-x-2 py-4">
                                <div className="grid flex-1 gap-2">
                                    <Label htmlFor="link" className="sr-only">
                                        Link
                                    </Label>
                                    <Input
                                        id="link"
                                        defaultValue="https://watermelon.xyz/invoice/inv-7821"
                                        readOnly
                                    />
                                </div>
                                <Button type="submit" size="sm" className="px-3">
                                    <span className="sr-only">Copy</span>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                            <DialogFooter className="sm:justify-start">
                                <Button type="button" variant="secondary" className="w-full">
                                    Email Link
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between px-4 py-3 border-b border-border gap-4 lg:gap-2">

                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="text-[10px] sm:text-xs bg-muted text-muted-foreground rounded hover:bg-muted/80 gap-1.5 h-8 sm:h-9 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:-translate-y-0.5 hover:shadow"
                            >
                                <RefreshCw className="size-3.5" />
                                Update
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Data Synchronization</DialogTitle>
                                <DialogDescription>
                                    Refreshing your dashboard with the latest data from the server.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col items-center justify-center py-8 gap-4">
                                <RefreshCw className="size-8 text-primary animate-spin" />
                                <p className="text-sm font-medium">Syncing invoices...</p>
                                <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                                    <div className="bg-primary h-full w-[65%] rounded-full animate-pulse" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="secondary" className="w-full">Cancel Sync</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    {selectedCount > 0 && (
                        <span className="text-[10px] sm:text-xs bg-muted flex items-center justify-center text-muted-foreground px-2.5 py-1.5 h-8 sm:h-9 sm:py-2 rounded font-medium transition-all animate-in fade-in zoom-in-95 duration-200">
                            {selectedCount} Selected
                        </span>
                    )}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="text-[10px] sm:text-xs text-muted-foreground bg-muted rounded hover:bg-muted/80 gap-1.5 h-8 sm:h-9 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:-translate-y-0.5 hover:shadow"
                            >
                                <Filter className="size-3.5" />
                                Filter
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-56 p-3">
                            <div className="space-y-3">
                                <h4 className="font-medium text-xs leading-none">Filters</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="status-accepted" />
                                        <Label htmlFor="status-accepted" className="text-xs">Accepted</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="status-review" />
                                        <Label htmlFor="status-review" className="text-xs">Under Review</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="status-rejected" />
                                        <Label htmlFor="status-rejected" className="text-xs">Rejected</Label>
                                    </div>
                                </div>
                                <Button size="sm" className="w-full text-xs h-7">Apply Filters</Button>
                            </div>
                        </PopoverContent>
                    </Popover>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="text-[10px] sm:text-xs text-muted-foreground bg-muted rounded hover:bg-muted/80 gap-1.5 h-8 sm:h-9 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:-translate-y-0.5 hover:shadow"
                            >
                                <ArrowUpDown className="size-3.5" />
                                Sort
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-40">
                            <DropdownMenuItem>Date: NewestFirst</DropdownMenuItem>
                            <DropdownMenuItem>Date: Oldest First</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Value: High to Low</DropdownMenuItem>
                            <DropdownMenuItem>Value: Low to High</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
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
                                className={`border-border hover:bg-muted/20 border-b transition-all duration-200 hover:translate-x-1 ${selectedRows.includes(row.id) ? "bg-muted/30" : ""
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
                                className="size-8 sm:size-7 flex items-center justify-center rounded text-muted-foreground hover:bg-muted transition-all duration-200 hover:scale-110 active:scale-90 disabled:opacity-50"
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
                                    className={`size-8 sm:size-7 text-[10px] sm:text-xs rounded transition-all duration-200 hover:scale-110 active:scale-90 ${currentPage === page
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
                                className="size-8 sm:size-7 flex items-center justify-center rounded text-muted-foreground hover:bg-muted transition-all duration-200 hover:scale-110 active:scale-90"
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
