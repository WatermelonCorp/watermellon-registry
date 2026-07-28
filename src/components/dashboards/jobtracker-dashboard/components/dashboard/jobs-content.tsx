import type { ComponentType, SVGProps } from "react";
import { Archive, Check } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { DashboardLink } from "../navigation";

import {
  AddIcon,
  JobActiveIcon,
  JobCustomerIcon,
  JobDraftIcon,
  JobLocationIcon,
  JobTimeIcon,
  SearchIcon,
} from "../../assets/icons";
import { jobs, type Job, type JobStatus } from "../../data";

type JobColumn = {
  status: JobStatus;
  label: string;
  emptyMessage: string;
  accentClassName: string;
  countClassName: string;
};

const jobColumns: JobColumn[] = [
  {
    status: "pre-construction",
    label: "Pre- Constructions",
    emptyMessage: "No pre-construction jobs",
    accentClassName: "text-[#3283ff] dark:text-[#66a3ff]",
    countClassName:
      "bg-[#3283ff]/10 text-[#3283ff] dark:bg-[#66a3ff]/15 dark:text-[#66a3ff]",
  },
  {
    status: "active",
    label: "Active",
    emptyMessage: "No active jobs",
    accentClassName: "text-[#ff5600] dark:text-[#ff7a38]",
    countClassName:
      "bg-[#ff5600]/10 text-[#ff5600] dark:bg-[#ff7a38]/15 dark:text-[#ff7a38]",
  },
  {
    status: "complete",
    label: "Complete",
    emptyMessage: "No completed jobs",
    accentClassName: "text-[#00c238] dark:text-[#35d968]",
    countClassName:
      "bg-[#00c238]/10 text-[#00c238] dark:bg-[#35d968]/15 dark:text-[#35d968]",
  },
  {
    status: "closed",
    label: "Closed",
    emptyMessage: "No closed jobs",
    accentClassName: "text-[#c57d00] dark:text-[#e4a83e]",
    countClassName:
      "bg-[#fef6e7] text-[#c57d00] dark:bg-[#e4a83e]/[0.12] dark:text-[#e4a83e]",
  },
];

type JobBadgeDetails = {
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  className: string;
};

const jobBadgeDetails: Record<JobStatus, JobBadgeDetails> = {
  "pre-construction": {
    label: "Draft",
    icon: JobDraftIcon,
    className:
      "bg-[#f2fff7] text-[#0e7b33] dark:bg-[#45c570]/[0.12] dark:text-[#45c570]",
  },
  active: {
    label: "Active",
    icon: JobActiveIcon,
    className:
      "bg-[#ff5600]/10 text-[#ff5600] dark:bg-[#ff7a38]/15 dark:text-[#ff7a38]",
  },
  complete: {
    label: "Complete",
    icon: Check,
    className:
      "bg-[#00c238]/10 text-[#00c238] dark:bg-[#35d968]/15 dark:text-[#35d968]",
  },
  closed: {
    label: "Closed",
    icon: Archive,
    className:
      "bg-[#fef6e7] text-[#c57d00] dark:bg-[#e4a83e]/[0.12] dark:text-[#e4a83e]",
  },
};

export function JobsContent() {
  return (
    <section className="@container min-w-0 px-4 pt-4 pb-4 sm:px-6 sm:pt-7 sm:pb-6 lg:px-10 lg:pb-10">
      <div className="flex flex-col gap-4 sm:gap-6 @4xl:flex-row @4xl:items-center @4xl:justify-between">
        <div className="flex items-center justify-between gap-3 @4xl:shrink-0">
          <h1 className="text-xl font-semibold tracking-tight sm:text-3xl">
            Jobs
          </h1>
          <Button className="h-10 rounded-lg px-3 sm:hidden">
            Add
            <AddIcon className="size-4" />
          </Button>
        </div>
        <div className="flex w-full flex-col gap-2 sm:flex-row @4xl:w-auto">
          <div className="relative min-w-0 flex-1 sm:mr-auto sm:max-w-80 lg:max-w-96 @4xl:mr-0 @4xl:w-96 @4xl:flex-none">
            <SearchIcon className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="h-11 rounded-xl border-0 bg-muted pl-10 shadow-none md:text-base"
              placeholder="Search job list"
              aria-label="Search jobs"
            />
          </div>
          <Button
            size="lg"
            className="hidden h-11 rounded-xl px-4 text-base sm:inline-flex"
          >
            Add Job
            <AddIcon className="size-5" />
          </Button>
        </div>
      </div>

      <JobBoard />
    </section>
  );
}

function JobBoard() {
  return (
    <div className="mt-6 grid items-start gap-3 sm:mt-8 @2xl:grid-cols-2 @4xl:grid-cols-3 @5xl:grid-cols-4">
      {jobColumns.map((column) => {
        const columnJobs = jobs.filter((job) => job.status === column.status);

        return (
          <JobBoardColumn
            key={column.status}
            column={column}
            jobs={columnJobs}
          />
        );
      })}
    </div>
  );
}

function JobBoardColumn({ column, jobs }: { column: JobColumn; jobs: Job[] }) {
  return (
    <section
      className="rounded-2xl bg-sidebar p-1 pt-4"
      aria-labelledby={`${column.status}-heading`}
    >
      <div className="mb-2 flex h-7 items-center justify-between pr-2">
        <h2
          id={`${column.status}-heading`}
          className="flex items-center gap-2 font-medium"
        >
          <JobColumnMarker className={column.accentClassName} />
          <span>{column.label}</span>
        </h2>
        <Badge
          variant="secondary"
          className={cn("h-6 rounded-lg font-normal", column.countClassName)}
        >
          {jobs.length}
        </Badge>
      </div>

      <div className="space-y-2">
        {jobs.length ? (
          jobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <div className="flex h-48 items-center justify-center rounded-xl border border-dashed bg-card px-3">
            <p>{column.emptyMessage}</p>
          </div>
        )}
      </div>
    </section>
  );
}

function JobColumnMarker({ className }: { className: string }) {
  return (
    <span
      className={cn("flex h-7 w-1 shrink-0 flex-col gap-0.5", className)}
      aria-hidden="true"
    >
      {[0, 1, 2].map((segment) => (
        <span
          key={segment}
          className="h-2 w-full bg-current [clip-path:polygon(0_25%,100%_0,100%_75%,0_100%)]"
        />
      ))}
    </span>
  );
}

function JobCard({ job }: { job: Job }) {
  return (
    <DashboardLink
      href={`/jobs/${job.id}/estimates`}
      className="block rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      aria-label={`Open ${job.title}`}
    >
      <Card className="gap-0 py-0 shadow-none ring-0 transition-colors hover:bg-accent">
        <CardHeader className="px-4 py-3">
          <CardTitle>{job.title}</CardTitle>
          <CardAction>
            <JobStatusBadge status={job.status} />
          </CardAction>
        </CardHeader>
        <Separator />

        <CardContent className="space-y-3 px-4 py-4">
          <div className="flex h-6 items-center justify-between gap-3">
            <JobDetailLabel
              icon={JobCustomerIcon}
              iconClassName="text-[#15803d] dark:text-[#4ade80]"
            >
              Customer
            </JobDetailLabel>
            <div className="flex min-w-0 items-center gap-1 font-medium text-muted-foreground">
              <Avatar className="size-5">
                <AvatarImage src={job.customer.avatar} alt="" />
                <AvatarFallback>{job.customer.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <span className="truncate">{job.customer.name}</span>
            </div>
          </div>

          <div className="flex items-start justify-between gap-3">
            <JobDetailLabel
              icon={JobLocationIcon}
              iconClassName="text-[#1d4ed8] dark:text-[#60a5fa]"
            >
              Location
            </JobDetailLabel>
            <span className="max-w-48 text-right font-medium text-muted-foreground">
              {job.location}
            </span>
          </div>

          <div className="flex h-6 items-center justify-between gap-3">
            <JobDetailLabel
              icon={JobTimeIcon}
              iconClassName="text-[#7c3aed] dark:text-[#a78bfa]"
            >
              Time
            </JobDetailLabel>
            <span className="font-medium text-muted-foreground">
              {job.time}
            </span>
          </div>
        </CardContent>
      </Card>
    </DashboardLink>
  );
}

function JobStatusBadge({ status }: { status: JobStatus }) {
  const details = jobBadgeDetails[status];
  const Icon = details.icon;

  return (
    <Badge
      variant="secondary"
      className={cn("h-6 rounded-full px-2.5 font-normal", details.className)}
    >
      <Icon />
      {details.label}
    </Badge>
  );
}

function JobDetailLabel({
  icon: Icon,
  iconClassName,
  children,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  iconClassName: string;
  children: string;
}) {
  return (
    <span className="flex shrink-0 items-center gap-2 text-muted-foreground">
      <Icon className={cn("size-4", iconClassName)} />
      {children}
    </span>
  );
}
