import { useMemo, useState } from "react";
import {
  ArrowUpRightIcon,
  ArrowsCounterClockwiseIcon,
  CheckCircleIcon,
  ClockIcon,
  FadersHorizontalIcon,
  FileArrowUpIcon,
  PauseIcon,
  PlayIcon,
  SealCheckIcon,
  SpinnerGapIcon,
  StatusWarningIcon,
  WarningIcon,
} from "./icons";
import { TransactionDetailsSheet } from "./transaction-details-sheet";
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
  auditControls,
  batchStatusFilters,
  batchTransactions,
  buildBatchExportCsv,
  filterBatchTransactions,
  metrics,
  sourceLabels,
  type BatchStatus,
  type BatchStatusFilter,
  type BatchTransaction,
  type SourceKind,
} from "../../data";
import { cn } from "@/lib/utils";

const metricIcons = {
  clock: ClockIcon,
  seal: SealCheckIcon,
  warning: WarningIcon,
  arrows: ArrowsCounterClockwiseIcon,
} as const;

const sourceClassName: Record<SourceKind, string> = {
  oracle: "bg-(--source-oracle)/15 text-(--source-oracle)",
  sharepoint: "bg-(--source-sharepoint)/15 text-(--source-sharepoint)",
  concur: "bg-(--source-concur)/15 text-(--source-concur)",
  email: "bg-(--source-email)/15 text-(--source-email)",
};

const statusConfig: Record<
  BatchStatus,
  { label: string; className: string; Icon: typeof SpinnerGapIcon }
> = {
  processing: {
    label: "Processing",
    className: "text-(--status-processing)",
    Icon: SpinnerGapIcon,
  },
  completed: {
    label: "Completed",
    className: "text-(--status-completed)",
    Icon: CheckCircleIcon,
  },
  exception: {
    label: "Exception",
    className: "text-(--status-exception)",
    Icon: StatusWarningIcon,
  },
};

const tableHeadClassName =
  "h-12.5 bg-zinc-50 text-base tracking-tight dark:bg-card";

const outlineActionClassName = "h-8.5 gap-1 px-3.5 shadow-xs";

function LiveBadge({
  live,
  size = "md",
}: {
  live: boolean;
  size?: "md" | "sm";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium",
        live
          ? "bg-(--live)/10 text-(--live)"
          : "bg-muted text-muted-foreground",
        size === "md" && "gap-1.25 px-4 py-2.5 text-xs leading-4.5",
        size === "sm" &&
          "gap-[2.9px] rounded-[5.8px] px-[9.25px] py-[5.8px] text-[7px] leading-[10.4px]",
      )}
    >
      <span
        className={cn(
          "rounded-full",
          live ? "bg-(--live)" : "bg-muted-foreground",
          size === "md" ? "size-2.25" : "size-[5.2px]",
          live && size === "md" && "live-dot-pulse",
        )}
      />
      {live ? "Live" : "Paused"}
    </span>
  );
}

export function DashboardPage() {
  const [isLive, setIsLive] = useState<boolean>(auditControls.defaultLive);
  const [statusFilter, setStatusFilter] = useState<BatchStatusFilter>("all");
  const [selectedTransaction, setSelectedTransaction] =
    useState<BatchTransaction | null>(null);

  const filteredTransactions = useMemo(
    () => filterBatchTransactions(batchTransactions, statusFilter),
    [statusFilter],
  );

  const activeFilterLabel =
    batchStatusFilters.find((filter) => filter.value === statusFilter)?.label ??
    "All statuses";

  function handleRunAudit() {
    setIsLive(true);
  }

  function handlePause() {
    setIsLive(false);
  }

  function handleExport() {
    const csv = buildBatchExportCsv(filteredTransactions);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `tallie-batch-${statusFilter}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col gap-10 px-4 py-6 md:px-8 md:py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-serif text-3xl leading-snug tracking-tight">
            Three-Way Match Audit
          </h1>
          <p className="text-lg text-muted-foreground">
            Real time validation of transaction
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <LiveBadge live={isLive} />
          <Button
            className="h-10 gap-1 px-3.5"
            disabled={isLive}
            onClick={handleRunAudit}
          >
            Run Audit
            <PlayIcon />
          </Button>
          <Button
            variant="outline"
            className="h-10 gap-1 px-3.5 shadow-sm"
            disabled={!isLive}
            onClick={handlePause}
          >
            Pause
            <PauseIcon />
          </Button>
        </div>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-medium">Metrics</h2>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metricIcons[metric.icon];
            const showLiveTrend =
              "tone" in metric.trend && metric.trend.tone === "live";
            return (
              <div
                key={metric.id}
                className="flex h-37.5 flex-col justify-between rounded-xl border bg-zinc-50 p-4 dark:bg-card"
              >
                <div className="flex items-start gap-2">
                  <Icon className="size-5" />
                  <span className="text-sm font-medium tracking-tight">
                    {metric.label}
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-3xl leading-none font-medium">
                    {metric.value}
                  </p>
                  <div className="flex items-center gap-1 text-xs">
                    {"tone" in metric.trend && metric.trend.tone === "up" ? (
                      <ArrowUpRightIcon className="size-4 text-(--trend)" />
                    ) : null}
                    {showLiveTrend ? (
                      <SpinnerGapIcon
                        className={cn(
                          "size-4 text-(--status-processing)",
                          isLive && "animate-spin",
                        )}
                      />
                    ) : null}
                    <span>
                      <span className="font-medium">
                        {showLiveTrend
                          ? isLive
                            ? metric.trend.value
                            : "Paused"
                          : metric.trend.value}
                      </span>{" "}
                      <span className="text-muted-foreground">
                        {metric.trend.label}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-medium">Current processing Batch</h2>
              <LiveBadge live={isLive} size="sm" />
            </div>
            <p className="text-sm text-muted-foreground">
              {isLive
                ? "Live transaction with auto scrolling"
                : "Audit paused — resume to continue processing"}
            </p>
          </div>
          <div className="flex w-full items-center justify-between md:w-auto md:justify-start md:gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger
                type="button"
                className={buttonVariants({
                  variant: "outline",
                  className: outlineActionClassName,
                })}
              >
                {statusFilter === "all" ? "Filter" : activeFilterLabel}
                <FadersHorizontalIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="tallie-dashboard w-48"
              >
                <DropdownMenuRadioGroup
                  value={statusFilter}
                  onValueChange={(value) =>
                    setStatusFilter(value as BatchStatusFilter)
                  }
                >
                  {batchStatusFilters.map((filter) => {
                    const FilterIcon = filter.icon;
                    return (
                      <DropdownMenuRadioItem
                        key={filter.value}
                        value={filter.value}
                        className="gap-2 text-muted-foreground data-[state=checked]:font-medium data-[state=checked]:text-foreground"
                      >
                        <FilterIcon
                          className={cn(
                            filter.value === "processing" &&
                              "text-(--status-processing)!",
                            filter.value === "completed" &&
                              "text-(--status-completed)!",
                            filter.value === "exception" &&
                              "text-(--status-exception)!",
                          )}
                        />
                        {filter.label}
                      </DropdownMenuRadioItem>
                    );
                  })}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="outline"
              className={outlineActionClassName}
              onClick={handleExport}
            >
              Export
              <FileArrowUpIcon />
            </Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl bg-zinc-50/40 dark:bg-card/40">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className={cn(tableHeadClassName, "min-w-40 px-4")}>
                  Status
                </TableHead>
                <TableHead className={cn(tableHeadClassName, "min-w-45 px-0")}>
                  Transaction ID
                </TableHead>
                <TableHead
                  className={cn(tableHeadClassName, "min-w-42.5 px-0")}
                >
                  Vendor
                </TableHead>
                <TableHead
                  className={cn(tableHeadClassName, "min-w-42.5 px-0")}
                >
                  Amount
                </TableHead>
                <TableHead className={cn(tableHeadClassName, "min-w-60 px-0")}>
                  Sources
                </TableHead>
                <TableHead className={cn(tableHeadClassName, "min-w-35 px-0")}>
                  Confidence
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell
                    colSpan={6}
                    className="h-24 px-4 text-center text-muted-foreground"
                  >
                    No transactions match this filter.
                  </TableCell>
                </TableRow>
              ) : (
                filteredTransactions.map((row) => {
                  const status = statusConfig[row.status];
                  const StatusIcon = status.Icon;
                  return (
                    <TableRow
                      key={row.id}
                      className="h-18 cursor-pointer hover:bg-muted/50"
                      tabIndex={0}
                      onClick={() => setSelectedTransaction(row)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setSelectedTransaction(row);
                        }
                      }}
                    >
                      <TableCell className="px-4 py-4">
                        <div
                          className={cn(
                            "inline-flex h-7.5 items-center gap-2 rounded-xl py-1 pr-4 pl-3 text-sm font-medium",
                            status.className,
                          )}
                        >
                          <StatusIcon
                            className={cn(
                              "size-4",
                              row.status === "processing" &&
                                isLive &&
                                "animate-spin",
                            )}
                          />
                          {status.label}
                        </div>
                      </TableCell>
                      <TableCell className="px-0 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-base font-medium tracking-tight">
                            {row.transactionId}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            PO:: {row.po}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-0 py-4 text-base font-medium tracking-tight">
                        {row.vendor}
                      </TableCell>
                      <TableCell className="px-0 py-4 font-mono text-base font-medium">
                        {row.amount}
                      </TableCell>
                      <TableCell className="px-0 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {row.sources.map((source) => (
                            <span
                              key={source}
                              className={cn(
                                "rounded px-2 py-0.5 text-xs tracking-tight",
                                source === "oracle" && "font-medium",
                                sourceClassName[source],
                              )}
                            >
                              {sourceLabels[source]}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="px-0 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-base font-medium tracking-tight">
                            {row.confidence}%
                          </span>
                          {"confidenceNote" in row && row.confidenceNote ? (
                            <span className="text-xs font-medium tracking-tight text-(--status-exception)">
                              {row.confidenceNote}
                            </span>
                          ) : null}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </section>

      <TransactionDetailsSheet
        transaction={selectedTransaction}
        open={selectedTransaction !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedTransaction(null);
        }}
      />
    </div>
  );
}
