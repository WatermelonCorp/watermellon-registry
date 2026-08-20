import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ExportIcon,
  FullscreenIcon,
  MetricCubeIcon,
  TrendingUpIcon,
} from "./icons";
import { DashboardLink } from "./navigation";
import { ClassificationStatusBadge } from "./shared";
import { PipelineSample } from "./pipeline-sample";
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
  classificationStream,
  dashboardMetricsByRange,
  dateRangeOptions,
  type ClassificationRow,
  type DateRange,
  type MetricCard,
} from "../../data";

export function DashboardContent() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 pt-8 pb-10 md:px-6">
      <OverviewSection />
      <PipelineSection />
      <StreamSection />
    </div>
  );
}

function OverviewSection() {
  const [dateRange, setDateRange] = useState<DateRange>("last-7-days");
  const rangeLabel = dateRangeOptions.find(
    (option) => option.value === dateRange,
  )?.label;

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Trade Compliance Overview</h1>
          <p className="text-lg text-muted-foreground">
            Monitor AI-powered trade compliance operations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              type="button"
              className={buttonVariants({
                variant: "secondary",
                className: "h-10 gap-2 px-3.5",
              })}
            >
              <CalendarIcon className="size-5" />
              {rangeLabel}
              <ChevronDownIcon className="size-5" />
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
          <Button type="button" className="h-10 gap-1 px-3.5">
            Export
            <ExportIcon className="size-5" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardMetricsByRange[dateRange].map((metric) => (
          <MetricCardItem key={metric.label} metric={metric} />
        ))}
      </div>
    </section>
  );
}

function MetricCardItem({ metric }: { metric: MetricCard }) {
  return (
    <article className="rounded-xl border bg-card p-3 md:p-4">
      <div className="flex flex-col gap-5 md:gap-8">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex size-7 items-center justify-center rounded-lg border md:size-8">
            <MetricCubeIcon className="size-3.5 md:size-4" />
          </div>
          <p className="text-xs font-medium text-muted-foreground md:text-sm">
            {metric.label}
          </p>
        </div>

        <div className="flex flex-col gap-2 md:gap-3">
          <p className="text-[1.625rem] leading-none font-semibold md:text-[2rem]">
            {metric.value}
          </p>

          {metric.trend ? (
            <div className="flex items-center gap-1">
              {metric.trend.tone === "positive" ? (
                <span className="inline-flex items-center gap-1 rounded-xl bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
                  <TrendingUpIcon className="size-3" />
                  {metric.trend.value}
                </span>
              ) : (
                <span className="text-xs font-medium text-primary">
                  {metric.trend.value}
                </span>
              )}
              <span className="text-xs font-medium text-muted-foreground">
                {metric.trend.label}
              </span>
            </div>
          ) : null}

          {metric.footnote ? (
            <p className="text-xs font-medium text-muted-foreground">
              {metric.footnote}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function PipelineSection() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-medium">Live Classification Pipeline</h2>

      <div className="relative h-100 overflow-hidden rounded-3xl border bg-secondary dark:bg-card/40">
        <div className="pipeline-dots absolute inset-0" />

        <div className="absolute top-4 right-4 left-4 z-10 flex items-center gap-0.5 md:right-auto">
          <div className="flex size-12 shrink-0 items-center justify-center gap-2 rounded-xl border bg-card md:w-auto md:justify-start md:px-3">
            <span className="relative flex size-3 md:size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-success opacity-60" />
              <span className="relative size-full rounded-full bg-success" />
            </span>
            <span className="hidden text-sm text-success md:inline">
              Live Pipeline
            </span>
          </div>
          <div className="flex h-12 items-center rounded-xl border bg-card px-3 md:min-w-fit">
            <span className="truncate text-sm font-medium text-primary">
              Pipeline: Global Import standard v2.1
            </span>
          </div>
        </div>

        <div className="no-scrollbar absolute inset-0 flex items-center overflow-x-auto px-6 pt-10 pb-16">
          <PipelineSample
            role="img"
            aria-label="Classification pipeline nodes"
            className="mx-auto min-w-220"
          />
        </div>

        <div className="absolute bottom-4 left-4 z-10 rounded-xs border border-card bg-card/50 p-0.5 backdrop-blur-[7.625rem]">
          <div className="flex flex-col overflow-hidden rounded-xs border bg-card">
            <Button
              variant="outline"
              size="icon"
              className="size-9.75 rounded-none border-0 border-b border-border shadow-none"
              aria-label="Zoom in"
            >
              <Plus className="size-4.5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-9.75 rounded-none border-0 shadow-none"
              aria-label="Zoom out"
            >
              <Minus className="size-4.5" />
            </Button>
          </div>
        </div>

        <div className="absolute right-4 bottom-4 z-10 rounded-[calc(var(--radius)+0.125rem)] border bg-card/50 p-0.5 backdrop-blur-[7.625rem]">
          <Button
            variant="outline"
            className="h-10.5 gap-2.5 rounded-lg border-0 bg-card py-2.5 pr-3.5 pl-2.5 text-sm font-medium shadow-none"
          >
            Full preview
            <FullscreenIcon className="size-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function StreamSection() {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-lg font-medium">Live Classification Stream</h2>
          <p className="text-sm text-muted-foreground">
            Review and manage AI-powered HS code classifications
          </p>
        </div>
        <Button variant="secondary" className="gap-1 pl-3 pr-2" asChild>
          <DashboardLink href="/classification">
            See all
            <ChevronRightIcon className="size-5" />
          </DashboardLink>
        </Button>
      </div>

      <Table className="min-w-215">
        <colgroup>
          <col className="w-[32%]" />
          <col className="w-[16%]" />
          <col className="w-[14%]" />
          <col className="w-[20%]" />
          <col className="w-[18%]" />
        </colgroup>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>HS Code</TableHead>
            <TableHead>Confidence</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Submitted</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classificationStream.map((row) => (
            <StreamRow key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </section>
  );
}

function StreamRow({ row }: { row: ClassificationRow }) {
  return (
    <TableRow>
      <TableCell className="whitespace-normal">
        <div className="space-y-1">
          <p className="truncate font-medium">{row.product}</p>
          <p className="truncate text-xs text-muted-foreground">{row.id}</p>
        </div>
      </TableCell>
      <TableCell className="font-mono">{row.hsCode}</TableCell>
      <TableCell className="tabular-nums">{row.confidence}</TableCell>
      <TableCell>
        <ClassificationStatusBadge status={row.status} />
      </TableCell>
      <TableCell className="text-muted-foreground">{row.submitted}</TableCell>
    </TableRow>
  );
}
