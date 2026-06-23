import {
  AlarmClock,
  ArrowRight,
  Download,
  Plus,
  SlidersHorizontal,
  TriangleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatsGrid } from "./stats";
import { PolicyCard } from "./policy-card";
import { policies } from "../../data"; 
import { ActivityFeed, RiskPanel, UpcomingRenewals } from "./lower-panels";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export function DashboardContent() {
  return (
    <main className="mx-auto w-full max-w-screen-2xl flex-1 p-4 md:p-8">
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h1 className="text-balance text-2xl font-semibold tracking-tight">
            Good Morning, Vansh
          </h1>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <span className="flex items-center gap-2 rounded-full px-3 py-1.5 shadow-border">
              <AlarmClock className="size-4" />3 renewals due this week
            </span>
            <span className="flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1.5 text-amber-500 font-medium dark:bg-amber-950 border border-amber-500/20">
              <TriangleAlert className="size-4" />2 claims require your review
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button className="gap-2 min-h-10 shadow-primary border border-primary">
            New Policy <Plus />
          </Button>
          <Button variant="outline" className="gap-2 min-h-10 shadow-border border-0">
            Export <Download />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 min-h-10 shadow-border border-0">
                Filter <SlidersHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Filter Policies</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>Active Policies</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Pending Renewal</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>High Risk</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Open Claims</DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950/50 dark:focus:text-red-500">
                Clear Filters
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <StatsGrid />
      <section className="mt-8 grid gap-4 xl:grid-cols-[3fr_1fr]">
        <div className="flex flex-col">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-medium">Policy Portfolio</h2>
            <Button variant="outline" className="border-0 shadow-border bg-white">
              View all 1235 <ArrowRight />
            </Button>
          </div>
          <div className="grid flex-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {policies.map((policy) => (
              <PolicyCard
                key={policy.initials + policy.status}
                policy={policy}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-medium">AI Insights</h2>
            <Button variant="outline" size="icon" className=" shadow-border border-0 bg-white">
              <ArrowRight />
            </Button>
          </div>
          <Card className="flex flex-1 flex-col gap-3 rounded-2xl p-3 shadow-border">
            <p className="rounded-xl bg-muted p-3 text-sm text-muted-foreground">
              “Henderson Corp renewal due in 4 days. Del Sol property risk score
              elevated, 3 open claims correlate with weather events. 2 policies
              lapsing this month if no action taken.”
            </p>
            <p className="rounded-xl bg-muted p-3 text-sm text-muted-foreground">
              “Pinnacle Group upcoming audit in 10 days. Coastal region risk
              factors increasing, 4 claims associated with flooding incidents. 3
              policies need renewal confirmation this quarter.”
            </p>
            <div className="mt-auto grid grid-cols-2 gap-3 border-t border-border/50 pt-3">
              <Button variant="outline" className="bg-white border-0 shadow-border">Dismiss ×</Button>
              <Button className="min-h-8 border border-primary shadow-primary">
                Open report <ArrowRight />
              </Button>
            </div>
          </Card>
        </div>
      </section>
      <div className="mt-8 grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr]">
        <ActivityFeed />
        <UpcomingRenewals />
        <RiskPanel />
      </div>
    </main>
  );
}
