import { useState } from "react";
import type { ComponentType, CSSProperties, ReactNode } from "react";
import {
  CheckCircle2Icon,
  CircleIcon,
  CircleDashedIcon,
  CircleCheckBigIcon,
  FileDownIcon,
  MessageCircleIcon,
  PencilIcon,
  PlusIcon,
  SlidersHorizontalIcon,
  TimerIcon,
  UserRoundIcon,
  XIcon,
} from "lucide-react";
import type { TooltipProps } from "recharts";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowUpRightIcon,
  CalendarDotsIcon,
  CaretDownIcon,
  ClockIcon,
  FileArrowUpIcon,
} from "./icons";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  dashboardAppointmentStatusFilters,
  dashboardTimelineData,
  dashboardTimelineRanges,
  filterDashboardAppointments,
  staffDetails,
} from "../../data";
import type {
  DashboardAppointmentStatus,
  DashboardAppointmentStatusFilter,
  DashboardTimelineRange,
} from "../../data";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";

const dashboardColors = {
  scheduled: "var(--dashboard-scheduled)",
  completed: "var(--dashboard-completed)",
  noShow: "var(--dashboard-no-show)",
  secondary: "var(--dashboard-secondary)",
  destructive: "var(--destructive)",
} as const;

const chartSeries = [
  { key: "scheduled", label: "Scheduled", color: dashboardColors.scheduled },
  { key: "completed", label: "Completed", color: dashboardColors.completed },
  { key: "noShow", label: "No-show", color: dashboardColors.noShow },
] as const;

const statusClassName: Record<DashboardAppointmentStatus, string> = {
  "In progress":
    "bg-[color-mix(in_oklch,var(--dashboard-scheduled)_14%,transparent)] text-[var(--dashboard-scheduled)]",
  Waiting:
    "bg-[color-mix(in_oklch,var(--dashboard-no-show)_14%,transparent)] text-[var(--dashboard-no-show)]",
  Confirmed:
    "bg-[color-mix(in_oklch,var(--dashboard-completed)_14%,transparent)] text-[var(--dashboard-completed)]",
  Done: "bg-[color-mix(in_oklch,var(--dashboard-completed)_14%,transparent)] text-[var(--dashboard-completed)]",
};

const filterStatusIcons: Record<
  DashboardAppointmentStatusFilter,
  ComponentType<{ className?: string }>
> = {
  all: SlidersHorizontalIcon,
  "In progress": TimerIcon,
  Waiting: CircleDashedIcon,
  Confirmed: CheckCircle2Icon,
  Done: CircleCheckBigIcon,
};

function DashboardCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "min-w-0 rounded-xl bg-card p-4 text-card-foreground",
        className,
      )}
    >
      {children}
    </section>
  );
}

function CardHeader({
  title,
  action,
  className,
}: {
  title: ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <h2 className="text-lg leading-6 font-medium text-foreground">{title}</h2>
      {action ? (
        <div className="flex shrink-0 items-center gap-2 text-sm font-medium text-foreground/80">
          {action}
        </div>
      ) : null}
    </div>
  );
}

function MetricBars({
  lastSixDays,
  className,
}: {
  lastSixDays: readonly number[];
  className: string;
}) {
  const maximum = Math.max(...lastSixDays, 1);

  return (
    <div className="flex h-7.5 w-10 shrink-0 items-end justify-between">
      {lastSixDays.map((value, index) => (
        <span
          key={`${value}-${index}`}
          className={cn("w-1.25 rounded-t-sm", className)}
          style={{ height: `${(value / maximum) * 100}%` }}
        />
      ))}
    </div>
  );
}

function ChartTooltip({
  active,
  payload,
  label,
}: TooltipProps<number | string | Array<number | string>, string | number>) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-sm">
      <p className="mb-2 font-medium">{label}</p>
      <div className="flex flex-col gap-1.5">
        {payload.map((item, index) => (
          <div
            key={`${String(item.dataKey)}-${index}`}
            className="flex items-center justify-between gap-6"
          >
            <span className="flex items-center gap-2 text-muted-foreground">
              <span
                className="size-2 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
              {item.name}
            </span>
            <span className="font-medium text-foreground">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

type DashboardTimelineData =
  (typeof dashboardTimelineData)[DashboardTimelineRange];
type AppointmentVolumeDatum = {
  week: string;
  scheduled: number;
  completed: number;
  noShow: number;
};

function AppointmentVolumeCard({ data }: { data: DashboardTimelineData }) {
  const appointmentVolume = [
    ...data.appointmentVolume,
  ] as AppointmentVolumeDatum[];

  return (
    <DashboardCard className="flex flex-col gap-4 pb-0">
      <CardHeader
        title="Appointment Volume"
        action={
          <a
            href="/analytics"
            className="flex items-center gap-2 rounded-md px-1 py-0.5 transition-colors hover:text-foreground hover:underline"
          >
            <span>View all</span>
            <ArrowUpRightIcon className="size-4.5" />
          </a>
        }
      />

      <div className="grid flex-1 gap-6 md:grid-cols-[6.5rem_minmax(0,1fr)]">
        <div className="grid grid-cols-3 gap-4 md:flex md:flex-col md:justify-center md:gap-8">
          {data.appointmentStats.map(([value, label]) => (
            <div key={label} className="flex min-w-0 flex-col gap-3">
              <p className="text-[1.75rem] leading-none font-medium text-foreground">
                {value}
              </p>
              <p className="text-sm leading-[1.4] text-muted-foreground">
                {label}
              </p>
            </div>
          ))}
        </div>

        <div className="min-h-0 min-w-0">
          <div className="mb-3 flex flex-wrap items-center justify-end gap-3">
            {chartSeries.map((series) => (
              <div
                key={series.key}
                className="flex items-center gap-2 text-sm font-medium text-foreground/80"
              >
                <span
                  className="size-3 rounded-sm"
                  style={{ backgroundColor: series.color }}
                />
                {series.label}
              </div>
            ))}
          </div>
          <div className="h-68 min-w-md md:min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={appointmentVolume}
                barGap={6}
                barCategoryGap="24%"
              >
                <CartesianGrid
                  vertical={false}
                  stroke="var(--border)"
                  strokeDasharray="3 3"
                  strokeOpacity={0.65}
                />
                <XAxis
                  dataKey="week"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                  dy={8}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 250]}
                  ticks={[0, 50, 100, 150, 200, 250]}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                  width={42}
                />
                <Tooltip
                  cursor={{ fill: "var(--muted)", opacity: 0.35 }}
                  content={(props) => <ChartTooltip {...props} />}
                />
                <Bar
                  dataKey="scheduled"
                  name="Scheduled"
                  fill={dashboardColors.scheduled}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="completed"
                  name="Completed"
                  fill={dashboardColors.completed}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="noShow"
                  name="No-show"
                  fill={dashboardColors.noShow}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}

function DepartmentLoadCard({ data }: { data: DashboardTimelineData }) {
  const departmentTotal = data.departmentLoad.reduce(
    (total, department) => total + department.value,
    0,
  );

  return (
    <DashboardCard className="flex flex-col gap-4">
      <CardHeader
        title="Department Load"
        action={
          <a
            href="/departments"
            className="flex items-center gap-2 rounded-md px-1 py-0.5 transition-colors hover:text-foreground hover:underline"
          >
            <span>Details</span>
            <ArrowUpRightIcon className="size-4.5" />
          </a>
        }
      />

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-muted-foreground">Total Cases</span>
            <span className="font-semibold text-foreground">
              {departmentTotal}
            </span>
          </div>
          <div className="flex h-5.75 items-start gap-1 overflow-hidden rounded-md">
            {data.departmentLoad.map((department, index) => (
              <span
                key={department.label}
                className={cn(
                  "dashboard-load-segment h-full min-w-4 shrink-0 rounded-md",
                  department.color,
                )}
                style={
                  {
                    "--department-width": `${(department.value / departmentTotal) * 100}%`,
                    animationDelay: `${index * 90}ms`,
                  } as CSSProperties
                }
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {data.departmentLoad.map((department) => (
            <div
              key={department.label}
              className="flex min-w-0 items-center gap-3 text-sm"
            >
              <div className="flex min-w-0 shrink-0 items-center gap-2">
                <span className={cn("size-4 rounded-sm", department.color)} />
                <span className="truncate font-medium text-foreground/80">
                  {department.label}
                </span>
              </div>
              <span className="min-w-0 flex-1 border-t border-dashed border-border" />
              <div className="flex shrink-0 items-center gap-2">
                <span className="w-6 text-right font-medium text-foreground/80">
                  {department.value}
                </span>
                <span className="w-12 text-right text-muted-foreground">
                  {department.percent}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardCard>
  );
}

function AppointmentsTableCard({
  appointments,
  statusFilter,
  onStatusFilterChange,
}: {
  appointments: ReturnType<typeof filterDashboardAppointments>;
  statusFilter: DashboardAppointmentStatusFilter;
  onStatusFilterChange: (
    statusFilter: DashboardAppointmentStatusFilter,
  ) => void;
}) {
  return (
    <DashboardCard className="flex flex-col gap-4 px-0 pb-0">
      <CardHeader
        className="px-4"
        title={
          <>
            <span className="sm:hidden">Today</span>
            <span className="hidden sm:inline">Today's appointments</span>
          </>
        }
        action={
          <>
            <Button type="button" variant="ghost" className="h-8 gap-2 px-2">
              <FileDownIcon className="size-4.5" />
              Import
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger
                type="button"
                className={buttonVariants({
                  variant: "ghost",
                  className: "h-8 gap-2 px-2",
                })}
              >
                <SlidersHorizontalIcon className="size-4.5" />
                Filter
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={statusFilter}
                  onValueChange={(value) =>
                    onStatusFilterChange(
                      value as DashboardAppointmentStatusFilter,
                    )
                  }
                >
                  {dashboardAppointmentStatusFilters.map((filter) => (
                    <DropdownMenuRadioItem
                      key={filter.value}
                      value={filter.value}
                      className={cn(
                        "text-muted-foreground [&_svg]:text-muted-foreground",
                        statusFilter === filter.value &&
                          "font-medium text-foreground [&_svg]:text-foreground",
                      )}
                    >
                      {(() => {
                        const FilterIcon = filterStatusIcons[filter.value];
                        return <FilterIcon className="size-4" />;
                      })()}
                      {filter.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        }
      />

      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full min-w-160 table-fixed text-left">
          <thead>
            <tr className="h-12 text-sm font-medium text-muted-foreground">
              <th className="w-[12%] px-4">Time</th>
              <th className="w-[24%] px-4">Patient</th>
              <th className="w-[22%] px-4">Type</th>
              <th className="w-[22%] px-4">Doctor</th>
              <th className="w-[20%] px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr
                key={`${appointment.time}-${appointment.patient}`}
                className="h-17.5 border-t border-border/60 transition-colors hover:bg-foreground/5"
              >
                <td className="px-4 text-sm font-medium text-foreground">
                  {appointment.time}
                </td>
                <td className="px-4 text-sm font-medium text-foreground">
                  {appointment.patient}
                </td>
                <td className="truncate px-4 text-sm text-foreground/90">
                  {appointment.type}
                </td>
                <td className="px-4 text-sm text-foreground/90">
                  {appointment.doctor}
                </td>
                <td className="px-4">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-3 py-1 text-sm leading-5",
                      statusClassName[appointment.status],
                    )}
                  >
                    {appointment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
}

type DashboardStaff = DashboardTimelineData["staffPerformance"][number];

function StaffDetailsSheet({
  staff,
  open,
  onOpenChange,
}: {
  staff: DashboardStaff | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const details = staff
    ? staffDetails[staff.name as keyof typeof staffDetails]
    : null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full! max-w-full! overflow-hidden bg-transparent sm:p-3 shadow-none sm:w-130! sm:max-w-130! border-none"
      >
        <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-background sm:rounded-2xl">
          <header className="flex h-19 shrink-0 items-center justify-between px-6">
            <SheetTitle className="text-xl">Staff Details</SheetTitle>

            <SheetClose asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon-lg"
                aria-label="Close staff details"
                className="[&_svg]:size-5!"
              >
                <XIcon />
              </Button>
            </SheetClose>
          </header>

          {staff && details ? (
            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4 no-scrollbar">
              <SheetDescription className="sr-only">
                Details for {staff.name}
              </SheetDescription>

              <div className="flex flex-col gap-8">
                <section className="flex items-center gap-3">
                  <Avatar className="size-30 rounded-xl">
                    <AvatarImage
                      src={staff.avatar}
                      alt={staff.name}
                      className="rounded-xl"
                    />
                    <AvatarFallback>{staff.name.slice(0, 1)}</AvatarFallback>
                  </Avatar>

                  <div className="flex min-w-0 flex-col gap-1">
                    <h3 className="truncate text-2xl font-medium">
                      {staff.name}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {details.specialty}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <span>{details.department}</span>
                      <CircleIcon className="size-1 fill-current" />
                      <span>{details.location}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
                      <CheckCircle2Icon className="size-3.5 text-[var(--dashboard-completed)]" />
                      <span className="text-[var(--dashboard-completed)]">
                        {details.status}
                      </span>
                      <span className="text-muted-foreground">-</span>
                      <span>{details.ward}</span>
                    </div>
                  </div>
                </section>

                <section className="border-b border-border">
                  <div className="flex items-center gap-6 text-lg">
                    <button
                      type="button"
                      className="border-b-2 border-foreground px-4 py-3 font-medium"
                    >
                      Overview
                    </button>

                    <button
                      type="button"
                      className="px-4 py-3 text-muted-foreground hover:text-foreground"
                    >
                      Skills
                    </button>

                    <button
                      type="button"
                      className="px-4 py-3 text-muted-foreground hover:text-foreground"
                    >
                      Activity
                    </button>
                  </div>
                </section>

                <section className="flex flex-col gap-3">
                  <h3 className="text-lg font-medium">Today&apos;s Metric</h3>

                  <div className="grid gap-3 md:grid-cols-3">
                    {details.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="flex h-32 flex-col justify-between rounded-xl bg-card p-4"
                      >
                        <p className="text-sm text-muted-foreground">
                          {metric.label}
                        </p>

                        <div className="flex flex-col gap-2">
                          <p className="text-2xl font-medium">{metric.value}</p>

                          <p className="text-xs font-mono text-muted-foreground">
                            <span className="mr-1 text-[var(--dashboard-completed)]">
                              +
                            </span>
                            {metric.trend}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="flex flex-col gap-3">
                  <h3 className="text-lg font-medium">Monthly Performance</h3>

                  <div className="relative h-72">
                    <div className="absolute top-0 right-2 z-10 flex items-center gap-4 bg-card px-2 py-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <span className="size-3 rounded-[3px] bg-[var(--dashboard-scheduled)]" />
                        {details.monthlyPerformance.patientSeenLabel}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <span className="size-3 rounded-[3px] bg-[var(--dashboard-completed)]" />
                        {details.monthlyPerformance.targetLabel}
                      </span>
                    </div>

                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        key={staff.name}
                        data={[...details.monthlyPerformance.points]}
                        margin={{ top: 36, right: 8, bottom: 0, left: 0 }}
                      >
                        <defs>
                          <linearGradient
                            id="staff-patients-seen-gradient"
                            x1="0"
                            x2="0"
                            y1="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor={dashboardColors.scheduled}
                              stopOpacity={0.35}
                            />
                            <stop
                              offset="100%"
                              stopColor={dashboardColors.scheduled}
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>

                        <CartesianGrid
                          vertical={false}
                          stroke="var(--border)"
                          strokeDasharray="3 3"
                        />

                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                          tick={{
                            fill: "var(--muted-foreground)",
                            fontSize: 12,
                          }}
                        />

                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{
                            fill: "var(--muted-foreground)",
                            fontSize: 12,
                          }}
                          domain={[0, "dataMax + 100"]}
                          width={36}
                        />

                        <Tooltip
                          content={(props) => <ChartTooltip {...props} />}
                        />

                        <ReferenceLine
                          y={details.monthlyPerformance.target}
                          stroke={dashboardColors.completed}
                          strokeDasharray="3 3"
                          strokeWidth={2}
                        />

                        <Area
                          type="linear"
                          dataKey="patientsSeen"
                          name={details.monthlyPerformance.patientSeenLabel}
                          stroke={dashboardColors.scheduled}
                          fill="url(#staff-patients-seen-gradient)"
                          strokeWidth={2}
                          activeDot={{ r: 4, fill: "var(--card)" }}
                          dot={{ r: 4, fill: "var(--card)", strokeWidth: 3 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </section>

                <section className="flex flex-col gap-3">
                  <h3 className="text-lg font-medium">Staff Information</h3>

                  <div className="grid gap-3 md:grid-cols-6">
                    {details.information.map(([label, value], index) => (
                      <div
                        key={label}
                        className={cn(
                          "flex min-w-0 flex-col gap-2 rounded-xl bg-card p-4 md:col-span-2",
                          details.information.length % 3 === 2 &&
                            index >= details.information.length - 2 &&
                            "md:col-span-3",
                        )}
                      >
                        <span className="text-sm text-muted-foreground">
                          {label}
                        </span>

                        <span className="truncate font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          ) : null}

          <footer className="p-4 flex flex-col gap-3">
            <div className="flex items-center justify-center gap-3">
              <Button variant="secondary" className="h-12 flex-1">
                Edit Profile
                <PencilIcon />
              </Button>

              <Button variant="secondary" className="h-12 flex-1">
                Message
                <MessageCircleIcon />
              </Button>
            </div>

            <Button className="h-12 w-full">
              Assign Patient
              <UserRoundIcon />
            </Button>
          </footer>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function StaffPerformanceCard({
  data,
  onStaffSelect,
}: {
  data: DashboardTimelineData;
  onStaffSelect: (staff: DashboardStaff) => void;
}) {
  return (
    <DashboardCard className="flex flex-col gap-4 px-0 pb-0">
      <CardHeader
        className="px-4"
        title="Staff performance"
        action={
          <a
            href="/staff"
            className="flex items-center gap-2 rounded-md px-1 py-0.5 transition-colors hover:text-foreground hover:underline"
          >
            <span>View all</span>
            <ArrowUpRightIcon className="size-4.5" />
          </a>
        }
      />

      <div className="flex flex-col">
        {data.staffPerformance.map((staff, index) => (
          <button
            type="button"
            key={staff.name}
            onClick={() => onStaffSelect(staff)}
            className={cn(
              "flex items-end justify-between gap-4 px-4 py-3 text-left transition-colors hover:bg-foreground/5",
              index > 0 && "border-t border-border/60",
            )}
          >
            <div className="flex min-w-0 items-center gap-3">
              <img
                src={staff.avatar}
                alt=""
                className="size-11.75 shrink-0 rounded-xl object-cover"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground/80">
                  {staff.name}
                </p>
                <p className="mt-1 truncate text-sm text-muted-foreground">
                  {staff.role}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-3 text-sm">
              <StatValue value={staff.points} label="pts today" />
              <StatValue value={staff.rating} label="rating" />
            </div>
          </button>
        ))}
      </div>
    </DashboardCard>
  );
}

function StatValue({
  value,
  label,
}: {
  value: string | number;
  label: string;
}) {
  return (
    <div className="flex flex-col items-end gap-0.5">
      <span className="font-medium text-foreground/80">{value}</span>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}

function ResourceUsageCard({ data }: { data: DashboardTimelineData }) {
  return (
    <DashboardCard className="flex flex-col gap-6">
      <CardHeader
        title="Resource Usage"
        action={
          <a
            href="/resources"
            className="flex items-center gap-2 rounded-md px-1 py-0.5 transition-colors hover:text-foreground hover:underline"
          >
            <span>View all</span>
            <ArrowUpRightIcon className="size-4.5" />
          </a>
        }
      />

      <div className="flex flex-col gap-6">
        {data.resources.map((resource, index) => (
          <ResourceRow
            key={resource.label}
            {...resource}
            withDivider={index > 0}
          />
        ))}
      </div>
    </DashboardCard>
  );
}

function ResourceRow({
  label,
  value,
  unit,
  Icon,
  color,
  withDivider,
}: {
  label: string;
  value: number;
  unit: string;
  Icon: ComponentType<{ className?: string }>;
  color: string;
  withDivider: boolean;
}) {
  return (
    <div
      className={cn(
        "flex gap-4",
        withDivider && "border-t border-border/60 pt-6",
      )}
    >
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Icon className="size-4.5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="truncate font-medium text-foreground">{label}</span>
          <span className="shrink-0 text-muted-foreground">
            <span className="font-medium text-foreground/80">{value}% </span>
            {unit}
          </span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
          <span
            className={cn(
              "dashboard-resource-progress block h-full rounded-full",
              color,
            )}
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export function DashboardPage() {
  const [selectedRange, setSelectedRange] =
    useState<DashboardTimelineRange>("aug-2026");
  const [appointmentStatusFilter, setAppointmentStatusFilter] =
    useState<DashboardAppointmentStatusFilter>("all");
  const [selectedStaff, setSelectedStaff] = useState<DashboardStaff | null>(
    null,
  );
  const selectedData = dashboardTimelineData[selectedRange];
  const selectedRangeMeta = dashboardTimelineRanges.find(
    (range) => range.value === selectedRange,
  );
  const visibleAppointments = filterDashboardAppointments(
    selectedData.appointments,
    appointmentStatusFilter,
  );

  return (
    <div className="flex flex-col gap-8 p-4 md:p-6">
      <section className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl leading-[1.4] font-normal">
            Good Morning Dr. Reyes
          </h1>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <CalendarDotsIcon />
            <span>Monday, Aug 04, 2025</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant="secondary"
            className="h-10 rounded-md px-3.5"
          >
            <FileArrowUpIcon className="size-4.5" />
            Export
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger
              type="button"
              className={buttonVariants({
                variant: "secondary",
                className: "h-10 rounded-md px-3.5",
              })}
            >
              <CalendarDotsIcon className="size-4.5" />
              {selectedRangeMeta?.label}
              <CaretDownIcon className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuRadioGroup
                value={selectedRange}
                onValueChange={(value) =>
                  setSelectedRange(value as DashboardTimelineRange)
                }
              >
                {dashboardTimelineRanges.map((range) => (
                  <DropdownMenuRadioItem
                    key={range.value}
                    value={range.value}
                    className={cn(
                      "text-muted-foreground",
                      selectedRange === range.value &&
                        "font-medium text-foreground",
                    )}
                  >
                    {range.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button type="button" className="h-10 rounded-md px-4 shadow-sm">
            <PlusIcon className="size-4.5" />
            Add New
          </Button>
        </div>
      </section>

      <section className="@container">
        <div className="grid grid-cols-1 gap-3 @min-[36rem]:grid-cols-2 @min-[72rem]:grid-cols-4">
          {selectedData.metrics.map((metric) => (
            <article
              key={metric.label}
              className="flex h-34.5 min-w-0 flex-col justify-between rounded-xl bg-card p-4 text-card-foreground"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-sm leading-[1.4] font-medium text-muted-foreground">
                  {metric.label}
                </h2>
                <ClockIcon className="size-5 shrink-0 text-foreground" />
              </div>

              <div className="flex items-end gap-1.5">
                <div className="min-w-0 flex-1">
                  <p className="text-[1.75rem] leading-none font-medium text-foreground">
                    {metric.value}
                    {metric.suffix ? (
                      <span className="ml-1 text-lg text-foreground/70">
                        {metric.suffix}
                      </span>
                    ) : null}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-xs font-mono text-muted-foreground">
                    <ArrowUpRightIcon
                      className={cn("size-4", metric.trendColor)}
                    />
                    <span className="text-foreground">
                      {metric.trend.split(" ")[0]}
                    </span>
                    <span>
                      {metric.trend.substring(metric.trend.indexOf(" ") + 1)}
                    </span>
                  </div>
                </div>
                <MetricBars
                  lastSixDays={metric.lastSixDays}
                  className={metric.color}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,25rem)]">
        <div className="min-w-0 overflow-x-auto no-scrollbar">
          <AppointmentVolumeCard key={selectedRange} data={selectedData} />
        </div>
        <DepartmentLoadCard key={selectedRange} data={selectedData} />
      </section>

      <section className="grid items-start gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,25rem)]">
        <AppointmentsTableCard
          appointments={visibleAppointments}
          statusFilter={appointmentStatusFilter}
          onStatusFilterChange={setAppointmentStatusFilter}
        />
        <div className="grid min-w-0 gap-6 self-start">
          <StaffPerformanceCard
            data={selectedData}
            onStaffSelect={setSelectedStaff}
          />
          <ResourceUsageCard key={selectedRange} data={selectedData} />
        </div>
      </section>
      <StaffDetailsSheet
        staff={selectedStaff}
        open={selectedStaff !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedStaff(null);
          }
        }}
      />
    </div>
  );
}
