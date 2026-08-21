import { useMemo, useState, type ComponentType, type SVGProps } from "react";
import {
  ArrowRight,
  Calendar,
  ClipboardList,
  FileText,
  FolderDown,
  ListFilter,
  Shield,
  Wallet,
} from "lucide-react";
import { ChevronDownIcon } from "./icons";
import { ReportStatusBadge } from "./shared";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  dateRangeOptions,
  generatedReports,
  reportTypes,
  type DateRange,
  type GeneratedReport,
  type ReportStatus,
  type ReportType,
} from "../../data";
import { cn } from "@/lib/utils";

type ReportTypeFilter = "all" | ReportType;
type ReportStatusFilter = "all" | ReportStatus;

type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;

const reportTypeIcons: Record<ReportType, SvgIcon> = {
  "cf-28": FileText,
  "cf-29": Wallet,
  "classification-audit": ClipboardList,
  "compliance-summary": Shield,
};

const reportTypeFilterOptions: { value: ReportTypeFilter; label: string }[] = [
  { value: "all", label: "All Report Type" },
  ...reportTypes.map((type) => ({
    value: type.id as ReportTypeFilter,
    label: type.typeLabel,
  })),
];

const reportStatusFilterOptions: {
  value: ReportStatusFilter;
  label: string;
}[] = [
  { value: "all", label: "All Status" },
  { value: "completed", label: "Completed" },
  { value: "processing", label: "Processing" },
];

export function ReportsContent() {
  const [typeFilter, setTypeFilter] = useState<ReportTypeFilter>("all");
  const [statusFilter, setStatusFilter] = useState<ReportStatusFilter>("all");
  const [dateRange, setDateRange] = useState<DateRange>("last-7-days");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredReports = useMemo(() => {
    return generatedReports.filter((report) => {
      const matchesType =
        typeFilter === "all" ? true : report.type === typeFilter;
      const matchesStatus =
        statusFilter === "all" ? true : report.status === statusFilter;
      return matchesType && matchesStatus;
    });
  }, [typeFilter, statusFilter]);

  const typeFilterLabel =
    reportTypeFilterOptions.find((option) => option.value === typeFilter)
      ?.label ?? "All Report Type";
  const statusFilterLabel =
    reportStatusFilterOptions.find((option) => option.value === statusFilter)
      ?.label ?? "All Status";
  const dateRangeLabel =
    dateRangeOptions.find((option) => option.value === dateRange)?.label ??
    "Last 7 Days";

  const typeFilterControl = (
    <DropdownMenu>
      <DropdownMenuTrigger
        type="button"
        className={buttonVariants({
          variant: "secondary",
          className: "h-10 w-full justify-between gap-1 px-3 md:h-8 md:w-auto",
        })}
      >
        <span className="truncate">{typeFilterLabel}</span>
        <ChevronDownIcon className="size-5 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        collisionPadding={16}
        className="astrix-dashboard min-w-44"
      >
        <DropdownMenuRadioGroup
          value={typeFilter}
          onValueChange={(value) => setTypeFilter(value as ReportTypeFilter)}
        >
          {reportTypeFilterOptions.map((option) => (
            <DropdownMenuRadioItem
              key={option.value}
              value={option.value}
              className="font-normal text-muted-foreground data-[state=checked]:font-medium data-[state=checked]:text-foreground"
            >
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const statusFilterControl = (
    <DropdownMenu>
      <DropdownMenuTrigger
        type="button"
        className={buttonVariants({
          variant: "secondary",
          className: "h-10 w-full justify-between gap-1 px-3 md:h-8 md:w-auto",
        })}
      >
        <span className="truncate">{statusFilterLabel}</span>
        <ChevronDownIcon className="size-5 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        collisionPadding={16}
        className="astrix-dashboard min-w-40"
      >
        <DropdownMenuRadioGroup
          value={statusFilter}
          onValueChange={(value) =>
            setStatusFilter(value as ReportStatusFilter)
          }
        >
          {reportStatusFilterOptions.map((option) => (
            <DropdownMenuRadioItem
              key={option.value}
              value={option.value}
              className="font-normal text-muted-foreground data-[state=checked]:font-medium data-[state=checked]:text-foreground"
            >
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const dateFilterControl = (
    <DropdownMenu>
      <DropdownMenuTrigger
        type="button"
        className={buttonVariants({
          variant: "secondary",
          className: "h-10 min-w-0 justify-between gap-2 px-3 md:h-8 md:w-auto",
        })}
      >
        <span className="flex min-w-0 items-center gap-2">
          <Calendar className="size-5 shrink-0" />
          <span className="truncate">{dateRangeLabel}</span>
        </span>
        <ChevronDownIcon className="size-5 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        collisionPadding={16}
        className="astrix-dashboard min-w-40"
      >
        <DropdownMenuRadioGroup
          value={dateRange}
          onValueChange={(value) => setDateRange(value as DateRange)}
        >
          {dateRangeOptions.map((option) => (
            <DropdownMenuRadioItem
              key={option.value}
              value={option.value}
              className="font-normal text-muted-foreground data-[state=checked]:font-medium data-[state=checked]:text-foreground"
            >
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 pt-8 pb-10 md:px-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Compliance Reports</h1>
        <p className="text-lg text-muted-foreground">
          Generate and manage regulatory compliance documentation
        </p>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">
          Select a report type to generate compliance documentation
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {reportTypes.map((type) => {
            const Icon = reportTypeIcons[type.id];

            return (
              <div
                key={type.id}
                className="flex flex-col gap-8 rounded-xl border p-4 pb-3.5"
              >
                <div className="flex size-11 items-center justify-center rounded-lg bg-secondary">
                  <Icon className="size-5" />
                </div>

                <div className="flex flex-1 flex-col gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">{type.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {type.description}
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="secondary"
                    className="h-10 w-full gap-2"
                  >
                    Generate Report
                    <ArrowRight className="size-4.5" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 md:hidden">
          <div className="space-y-2">
            <h2 className="text-lg font-medium">Generated Reports</h2>
            <p className="text-sm text-muted-foreground">
              Download and manage compliance documentation
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="min-w-0 flex-1">{dateFilterControl}</div>

            <Button
              type="button"
              variant="outline"
              className="h-10 shrink-0 gap-2 px-3"
              aria-expanded={filtersOpen}
              onClick={() => setFiltersOpen((open) => !open)}
            >
              <span className="flex items-center gap-2">
                <ListFilter className="size-5 shrink-0" />
                Filters
              </span>
              <ChevronDownIcon
                className={cn(
                  "size-5 shrink-0 transition-transform",
                  filtersOpen && "rotate-180",
                )}
              />
            </Button>
          </div>

          {filtersOpen ? (
            <div className="flex flex-col gap-2 min-[380px]:flex-row">
              <div className="min-w-0 flex-1">{typeFilterControl}</div>
              <div className="min-w-0 flex-1">{statusFilterControl}</div>
            </div>
          ) : null}
        </div>

        <div className="@container/reports-header hidden w-full min-w-0 md:block">
          <div className="flex w-full min-w-0 flex-col gap-4 @min-[52rem]/reports-header:flex-row @min-[52rem]/reports-header:items-end @min-[52rem]/reports-header:justify-between">
            <div className="min-w-0 space-y-2 @min-[52rem]/reports-header:min-w-56">
              <h2 className="text-lg font-medium">Generated Reports</h2>
              <p className="text-sm text-muted-foreground">
                Download and manage compliance documentation
              </p>
            </div>

            <div className="flex w-full min-w-0 items-center justify-between gap-2 @min-[52rem]/reports-header:w-auto">
              {dateFilterControl}
              <div className="flex items-center gap-2">
                {typeFilterControl}
                {statusFilterControl}
              </div>
            </div>
          </div>
        </div>

        <Table className="min-w-215">
          <colgroup>
            <col className="w-[36%]" />
            <col className="w-[16%]" />
            <col className="w-[16%]" />
            <col className="w-[16%]" />
            <col className="w-[16%]" />
          </colgroup>
          <TableHeader>
            <TableRow>
              <TableHead>Report Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Generated</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.map((report) => (
              <ReportRowItem key={report.id} report={report} />
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}

function ReportRowItem({ report }: { report: GeneratedReport }) {
  const canDownload = report.status === "completed";

  return (
    <TableRow>
      <TableCell className="whitespace-normal">
        <div className="space-y-1">
          <p className="font-medium">{report.name}</p>
          <p className="text-sm text-muted-foreground">{report.id}</p>
        </div>
      </TableCell>
      <TableCell>{report.typeLabel}</TableCell>
      <TableCell>
        <ReportStatusBadge status={report.status} />
      </TableCell>
      <TableCell className="text-muted-foreground">
        {report.generated}
      </TableCell>
      <TableCell>
        <Button
          type="button"
          variant="ghost"
          size="lg"
          disabled={!canDownload}
          className="gap-2"
        >
          Download
          <FolderDown className="size-5" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
