import { activities, renewals } from "../../data"
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
export function ActivityFeed() {
  return (
    <section className="flex h-full flex-col">
      <h2 className="mb-3 text-lg font-medium">Activity Feed</h2>
      <Card className="flex-1 gap-0 rounded-2xl p-3 shadow-border">
        {activities.map(([time, title, sub]) => (
          <div
            key={title}
            className="grid grid-cols-[5rem_1fr] gap-3 border-b px-1 py-4 last:border-0"
          >
            <span className="text-xs text-muted-foreground">{time}</span>
            <div>
              <p className="text-sm">{title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
            </div>
          </div>
        ))}
      </Card>
    </section>
  );
}
export function UpcomingRenewals() {
  return (
    <section className="flex h-full flex-col">
      <h2 className="mb-3 text-lg font-medium">Upcoming Renewals</h2>
      <Card className="flex-1 gap-0 rounded-2xl p-3 shadow-border">
        {renewals.map(([initials, name, type, days, tone]) => (
          <div
            key={name + days}
            className="flex items-center gap-3 border-b py-4 last:border-0"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-blue-100 text-xs text-primary dark:bg-blue-950">
              {initials}
            </span>
            <div>
              <p className="text-sm">{name}</p>
              <p className="text-xs text-muted-foreground">{type}</p>
            </div>
            <Badge
              variant="secondary"
              className={`ml-auto bg-${tone}-100 text-${tone}-600 dark:bg-${tone}-950 dark:text-${tone}-50`}
            >
              {days}
            </Badge>
          </div>
        ))}
      </Card>
    </section>
  );
}
export function RiskPanel() {
  const rows = [
    ["Property", 12, "rose"],
    ["Vehicle", 8, "blue"],
    ["Liability", 9, "amber"],
    ["Life & health", 3, "green"],
  ] as const;
  return (
    <section className="flex h-full flex-col">
      <h2 className="mb-3 text-lg font-medium">Portfolio Risk</h2>
      <Card className="flex-1 gap-0 rounded-2xl p-4 shadow-border">
        {rows.map(([label, bars, tone]) => (
          <div
            key={label}
            className="flex items-center border-b py-5 last:border-0"
          >
            <span className="w-28 text-sm">{label}</span>
            <div className="flex flex-1 gap-1">
              {Array.from({ length: bars }).map((_, i) => (
                <span
                  key={i}
                  className={`h-4 w-1 rounded-full bg-${tone}-500`}
                />
              ))}
            </div>
            <span className="tabular-nums">72</span>
          </div>
        ))}
      </Card>
    </section>
  );
}
