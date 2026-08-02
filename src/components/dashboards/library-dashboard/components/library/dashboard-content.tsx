import { useState } from 'react';
import { CirculationChart } from './circulation-chart';
import { CollectionDonutChart } from './collection-donut-chart';
import {
  ArrowDown01Icon,
  BookPlusIcon,
  CancelIcon,
  CheckoutIcon,
  Download01Icon,
  ReturnIcon,
  SparklesIcon,
  UserAdd02Icon,
} from './icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  collectionOverview,
  intelligenceCards,
  metrics,
  recentActivity,
} from '../../data';
import { cn } from '@/lib/utils';

const quickActions = [
  { label: 'Checkout Items', icon: CheckoutIcon },
  { label: 'Process Return', icon: ReturnIcon },
  { label: 'Add New Item', icon: BookPlusIcon },
  { label: 'Add New Member', icon: UserAdd02Icon },
];

export function DashboardContent() {
  return (
    <>
      <DashboardHeader />
      <div className="@container/dashboard space-y-10">
        <section>
          <SectionTitle>Top Metrics</SectionTitle>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
                className="bg-secondary text-secondary-foreground cursor-pointer rounded-lg py-0 shadow-none ring-0 transition-colors hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]"
              >
                <CardContent className="flex h-full items-center justify-between p-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-background flex size-11 items-center justify-center rounded-lg">
                      <action.icon className="size-5" />
                    </div>
                    <span className="text-secondary-foreground/80 text-base font-medium">
                      {action.label}
                    </span>
                  </div>
                  <ArrowDown01Icon className="text-muted-foreground size-6 -rotate-90 transition-transform duration-200 ease-out group-hover/card:translate-x-0.5 motion-reduce:transform-none" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 items-stretch gap-8 @4xl/dashboard:grid-cols-3">
          <div className="@4xl/dashboard:col-span-2">
            <CirculationChart />
          </div>
          <div className="min-h-84">
            <CollectionOverview />
          </div>
        </section>

        <section className="grid grid-cols-1 gap-8 @4xl/dashboard:grid-cols-2">
          <RecentActivity />
          <LibraryIntelligence />
        </section>
      </div>
    </>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-medium">{children}</h2>;
}

function DashboardHeader() {
  return (
    <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:mb-10 sm:flex-row sm:items-end">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl leading-[1.4] font-medium italic">
          Good Morning Librarian
        </h1>
        <div className="flex flex-col gap-2 text-base leading-[1.4] sm:flex-row sm:items-center">
          <p className="text-muted-foreground italic">
            Springfield Public Library
          </p>
          <div className="bg-foreground hidden size-1.5 rounded-full sm:inline-block" />
          <p className="text-secondary-foreground/80">Saturday, Feb 19, 2026</p>
        </div>
      </div>
      <Button
        variant="secondary"
        className="h-11 gap-3 pr-3 pl-4.5 text-[15px] font-medium tracking-[-0.02em]"
      >
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
    <Card className="bg-secondary text-secondary-foreground gap-6 rounded-lg p-4 shadow-none ring-0">
      <div className="flex items-center gap-2">
        <Icon className={cn('size-5 shrink-0', iconClassName)} />
        <span className="text-secondary-foreground/80 text-sm leading-[1.4] font-medium">
          {label}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-foreground text-[32px] leading-none font-medium">
          {value}
        </h3>
        <p className="flex items-center gap-1 text-xs">
          {NoteIcon && <NoteIcon className="size-3.5 shrink-0" />}
          {noteParts ? (
            <>
              <span className="text-secondary-foreground font-medium">
                {noteParts[1]}
              </span>{' '}
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
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
    fill: segment.color,
  }));

  return (
    <div className="flex h-full flex-col">
      <SectionTitle>Collection Overview</SectionTitle>
      <Card className="border-border mt-5 flex flex-1 flex-col rounded-lg border py-0 shadow-none ring-0">
        <CardContent className="flex h-full flex-col items-center justify-between gap-5 p-4 sm:flex-row sm:items-center sm:gap-8 sm:px-8 @4xl/dashboard:flex-col @4xl/dashboard:gap-5 @4xl/dashboard:px-4">
          <CollectionDonutChart
            data={chartData}
            total={total}
            label={collectionOverview.label}
            size={180}
            activeIndex={activeIndex}
            onActiveIndexChange={setActiveIndex}
          />
          <div className="flex w-full flex-col gap-2 sm:max-w-64 @4xl/dashboard:max-w-none">
            {segments.map((segment, index) => (
              <div
                key={segment.label}
                className={cn(
                  'text-secondary-foreground grid grid-cols-3 items-center text-base leading-[1.4] transition-opacity duration-200',
                  activeIndex !== null && activeIndex !== index && 'opacity-40',
                )}
              >
                <div className="text-secondary-foreground/80 flex min-w-0 items-center gap-2">
                  <span
                    className="size-3.5 shrink-0 rounded"
                    style={{ backgroundColor: segment.color }}
                  />
                  <span className="truncate">{segment.label}</span>
                </div>
                <span className="text-center font-medium tabular-nums">
                  {segment.count.toLocaleString()}
                </span>
                <span className="text-right font-medium tabular-nums">
                  {segment.percentage % 1 === 0
                    ? `${segment.percentage.toFixed(0)}%`
                    : `${segment.percentage.toFixed(1)}%`}
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
      <div className="mt-5 flex flex-col gap-6">
        {recentActivity.map((activity) => {
          const ActivityIcon = activity.icon;
          return (
            <div key={activity.id} className="flex items-center gap-3">
              <div className="bg-secondary text-secondary-foreground flex size-11 shrink-0 items-center justify-center rounded-lg">
                <ActivityIcon className="size-5" />
              </div>
              <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
                <p className="text-base leading-[1.4]">
                  {activity.parts.map((part, index) => (
                    <span
                      key={`${activity.id}-${index}`}
                      className={cn(
                        'text-secondary-foreground font-medium',
                        'muted' in part &&
                          part.muted &&
                          'text-muted-foreground font-normal',
                      )}
                    >
                      {part.text}
                    </span>
                  ))}
                </p>
                <time
                  dateTime={activity.dateTime}
                  className="text-secondary-foreground/80 shrink-0 text-sm leading-4 font-medium"
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

function LibraryIntelligence() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-2">
        <SectionTitle>Library Intelligence</SectionTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-accent-foreground h-auto gap-1 bg-transparent px-0 py-0 hover:bg-transparent dark:hover:bg-transparent"
        >
          <span className="text-sm font-normal">See all</span>
          <ArrowDown01Icon className="size-4 -rotate-90 transition-transform duration-200 ease-out group-hover/button:translate-x-0.5 motion-reduce:transform-none" />
        </Button>
      </div>
      <div className="mt-5 flex flex-1 flex-col justify-between gap-3">
        {intelligenceCards.map((card) => (
          <Card
            key={card.title}
            className="bg-secondary text-secondary-foreground rounded-lg py-0 shadow-none ring-0"
          >
            <CardContent className="flex flex-col gap-3 p-3">
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    'flex items-center gap-1 text-sm font-semibold',
                    card.tone === 'insight' && 'text-[#c803c8]',
                    card.tone === 'warning' && 'text-[#d47c01]',
                    card.tone === 'success' && 'text-[#15823e]',
                  )}
                >
                  <SparklesIcon className="size-5" />
                  <span>{card.title}</span>
                </div>
                <Button
                  aria-label={`Dismiss ${card.title}`}
                  variant="ghost"
                  size="icon-xs"
                  className="size-5"
                >
                  <CancelIcon className="size-5" />
                </Button>
              </div>
              <div className="flex items-end gap-3">
                <p className="flex-1 text-base leading-[1.4] text-[#4a5565]">
                  {card.bodyParts.map((part, index) => (
                    <span
                      key={`${card.title}-${index}`}
                      className={cn(
                        'emphasis' in part &&
                          part.emphasis &&
                          'text-secondary-foreground font-medium',
                      )}
                    >
                      {part.text}
                    </span>
                  ))}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-background text-secondary-foreground/80 h-8 gap-2 rounded-lg px-0 pr-2 pl-3 text-[15px] font-medium tracking-[-0.02em] hover:bg-[color-mix(in_oklch,var(--background),var(--foreground)_5%)]"
                >
                  <span>View</span>
                  <ArrowDown01Icon className="size-4 -rotate-90 transition-transform duration-200 ease-out group-hover/button:translate-x-0.5 motion-reduce:transform-none" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
