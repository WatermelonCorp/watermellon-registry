import { CirculationChart } from "./circulation-chart";
import { CollectionDonutChart } from "./collection-donut-chart";
import { ArrowDown01Icon } from "../../assets/svgs/arrow-down-01-icon";
import { CancelIcon } from "../../assets/svgs/cancel-icon";
import { Download01Icon } from "../../assets/svgs/download-01-icon";
import { SparklesIcon } from "../../assets/svgs/sparkles-icon";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  collectionOverview,
  intelligenceCards,
  metrics,
  quickActions,
  recentActivity,
} from "../../data";
import { cn } from "../../lib/utils";

export function DashboardContent() {
  return (
    <>
      <DashboardHeader />
      <div className="@container/dashboard space-y-10">
        <section>
          <SectionTitle>Top Metrics</SectionTitle>
          <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {metrics.map((metric) => (
              <MetricCard key={metric.label} {...metric} />
            ))}
          </div>
        </section>

        <section>
          <SectionTitle>Quick Actions</SectionTitle>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <Card
                key={action.label}
                variant="dashboard"
                className="transition-transform duration-200 ease-out hover:-translate-y-0.5 motion-reduce:transform-none"
              >
                <CardContent className="flex h-full items-center justify-between p-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-background flex size-11 items-center justify-center rounded-lg border">
                      <action.icon className="size-5" />
                    </div>
                    <span className="text-base font-semibold">
                      {action.label}
                    </span>
                  </div>
                  <ArrowDown01Icon className="text-muted-foreground size-6 -rotate-90 transition-transform duration-200 ease-out group-hover/card:translate-x-1 motion-reduce:transform-none" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-8 @4xl/dashboard:grid-cols-3">
          <div className="@4xl/dashboard:col-span-2">
            <CirculationChart />
          </div>
          <div>
            <CollectionOverview />
          </div>
        </section>

        <section className="grid grid-cols-1 gap-8 @4xl/dashboard:grid-cols-2">
          <RecentActivity />
          <LibrarIntelligence />
        </section>
      </div>
    </>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}

function DashboardHeader() {
  return (
    <div className="mb-8 flex items-start justify-between gap-3 sm:mb-10">
      <div className="min-w-0">
        <h1 className="text-lg leading-tight font-bold tracking-tight sm:text-xl">
          Good Morning <span className="italic">Librarian</span>
        </h1>
        <div className="mt-2 flex flex-col gap-1 text-sm sm:flex-row sm:items-center">
          <p className="text-muted-foreground font-medium italic">
            Springfield Branch
          </p>
          <span className="text-foreground hidden sm:inline">•</span>
          <p className="text-muted-foreground font-medium">
            Saturday, Feb 19, 2026
          </p>
        </div>
      </div>
      <Button variant="secondary" className="shrink-0 self-start sm:h-11">
        <span>Export</span>
        <Download01Icon className="size-5 -scale-y-100" />
      </Button>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  iconClassName,
  label,
  note,
  noteIcon: NoteIcon,
  value,
}: {
  label: string;
  value: string;
  note: string;
  icon: React.ComponentType<{ className?: string }>;
  iconClassName: string;
  noteIcon?: React.ComponentType<{ className?: string }>;
}) {
  const noteParts = note.match(/^([+-]?\d+(?:\.\d+)?%?|↓\s*\d+)\s+(.*)$/);

  return (
    <Card variant="dashboard" className="gap-6 p-5">
      <div className="flex items-center gap-2">
        <Icon className={cn("size-5 shrink-0", iconClassName)} />
        <span className="text-secondary-foreground text-sm font-medium">
          {label}
        </span>
      </div>
      <div className="space-y-3">
        <h3 className="text-3xl leading-none font-bold tracking-tight">
          {value}
        </h3>
        <p className="flex items-center gap-1 text-xs">
          {NoteIcon && <NoteIcon className="size-3.5 shrink-0" />}
          {noteParts ? (
            <>
              <span className="text-foreground font-semibold">
                {noteParts[1]}
              </span>{" "}
              <span className="text-muted-foreground">{noteParts[2]}</span>
            </>
          ) : (
            <span className="text-muted-foreground">{note}</span>
          )}
        </p>
      </div>
    </Card>
  );
}

function CollectionOverview() {
  const total = collectionOverview.segments.reduce(
    (sum, segment) => sum + segment.count,
    0,
  );
  const segments = collectionOverview.segments.map((segment) => ({
    ...segment,
    percentage: total > 0 ? (segment.count / total) * 100 : 0,
  }));
  const chartData = segments.map((segment) => ({
    name: segment.label,
    value: segment.count,
    fill: `var(--chart-${segment.color})`,
  }));

  return (
    <div>
      <SectionTitle>Collection Overview</SectionTitle>
      <Card
        variant="dashboard-outline"
        className="mt-5 min-h-84 @xl/dashboard:h-64 @xl/dashboard:min-h-0 @4xl/dashboard:h-84"
      >
        <CardContent className="flex h-full flex-col items-center justify-between gap-5 p-4 @xl/dashboard:flex-row @xl/dashboard:px-8 @4xl/dashboard:flex-col @4xl/dashboard:gap-4 @4xl/dashboard:px-4">
          <div className="order-1 @xl/dashboard:order-2 @4xl/dashboard:order-1">
            <CollectionDonutChart
              data={chartData}
              total={total}
              label={collectionOverview.label}
            />
          </div>
          <div className="order-2 flex w-full flex-col gap-2 @xl/dashboard:order-1 @xl/dashboard:max-w-64 @4xl/dashboard:order-2 @4xl/dashboard:max-w-none">
            {segments.map((segment) => (
              <div
                key={segment.label}
                className="text-secondary-foreground grid grid-cols-12 items-center text-base leading-snug"
              >
                <div className="text-secondary-foreground/80 col-span-6 flex min-w-0 items-center gap-2">
                  <span
                    className="size-3.5 shrink-0 rounded-sm"
                    style={{
                      backgroundColor: `var(--chart-${segment.color})`,
                    }}
                  />
                  <span>{segment.label}</span>
                </div>
                <span className="col-span-3 text-right font-medium tabular-nums">
                  {segment.count.toLocaleString()}
                </span>
                <span className="col-span-3 text-right font-medium tabular-nums">
                  {segment.percentage.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function RecentActivity() {
  return (
    <div>
      <SectionTitle>Recent Activity</SectionTitle>
      <div className="mt-5 space-y-6">
        {recentActivity.map((activity) => {
          const ActivityIcon = activity.icon;
          return (
            <div
              key={activity.id}
              className={cn(
                "flex gap-3",
                activity.id === "return" ? "items-center" : "items-start",
              )}
            >
              <div className="bg-secondary text-secondary-foreground flex size-11 shrink-0 items-center justify-center rounded-lg">
                <ActivityIcon className="size-5" />
              </div>
              <div className="text-secondary-foreground flex min-w-0 flex-1 items-start justify-between gap-4">
                <p className="w-full text-base leading-snug">
                  {activity.parts.map((part, index) => (
                    <span
                      key={`${activity.id}-${index}`}
                      className={cn(
                        "font-medium",
                        "muted" in part &&
                          part.muted &&
                          "text-muted-foreground font-normal",
                      )}
                    >
                      {part.text}
                    </span>
                  ))}
                </p>
                <time
                  dateTime={activity.dateTime}
                  className="text-secondary-foreground/80 shrink-0 text-xs leading-4 font-medium"
                >
                  {activity.time}
                </time>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LibrarIntelligence() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <SectionTitle>Librar Intelligence</SectionTitle>
        <Button
          variant="ghost"
          size="sm"
          className="bg-transparent hover:bg-transparent dark:hover:bg-transparent"
        >
          <span>See all</span>
          <ArrowDown01Icon className="size-4 -rotate-90 transition-transform duration-200 ease-out group-hover/button:translate-x-1 motion-reduce:transform-none" />
        </Button>
      </div>
      <div className="mt-5 flex flex-1 flex-col justify-between gap-2">
        {intelligenceCards.map((card) => (
          <Card key={card.title} variant="dashboard">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    "flex items-center gap-1 text-sm font-semibold",
                    card.tone === "insight" && "text-insight",
                    card.tone === "warning" && "text-warning",
                    card.tone === "success" && "text-success",
                  )}
                >
                  <SparklesIcon className="size-5" />
                  <span>{card.title}</span>
                </div>
                <Button
                  aria-label={`Dismiss ${card.title}`}
                  variant="ghost"
                  size="icon-xs"
                >
                  <CancelIcon className="size-5" />
                </Button>
              </div>
              <div className="mt-3 flex items-end gap-3">
                <p className="text-secondary-foreground min-w-0 flex-1 text-base leading-snug">
                  {card.bodyParts.map((part, index) => (
                    <span
                      key={`${card.title}-${index}`}
                      className={cn(
                        "emphasis" in part &&
                          part.emphasis &&
                          "text-secondary-foreground font-medium",
                      )}
                    >
                      {part.text}
                    </span>
                  ))}
                </p>
                <Button variant="ghost" size="sm">
                  <span>View</span>
                  <ArrowDown01Icon className="size-4 -rotate-90 transition-transform duration-200 ease-out group-hover/button:translate-x-1 motion-reduce:transform-none" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
