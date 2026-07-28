import { useEffect, useRef, useState } from "react"
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Command,
  Database,
  GitBranch,
  Radio,
  Search,
  TrendingUp,
  UsersRound,
  Zap,
  type LucideIcon,
} from "lucide-react"

import { WorkspacesIcon } from "../../assets/icons"
import { DashboardLink } from "../navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  dashboardOverview,
  workspaceCards,
  type WorkspaceCard,
} from "../../data"

const workspaceIcons: Record<WorkspaceCard["icon"], LucideIcon> = {
  database: Database,
  flexibility: Zap,
  planning: TrendingUp,
  operations: Radio,
  stakeholders: UsersRound,
  connections: GitBranch,
}

function SectionTitle({
  children,
  icon: Icon,
}: {
  children: string
  icon?: LucideIcon
}) {
  return (
    <h2 className="flex items-center gap-2 text-sm font-medium">
      {Icon ? (
        <Icon aria-hidden="true" className="size-5" strokeWidth={1.6} />
      ) : (
        <WorkspacesIcon aria-hidden="true" className="size-5" />
      )}
      {children}
    </h2>
  )
}

function WorkspaceCardItem({ workspace }: { workspace: WorkspaceCard }) {
  const Icon = workspaceIcons[workspace.icon]

  return (
    <DashboardLink
      href={workspace.href}
      className="rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Card
        className="h-full gap-11 bg-secondary py-3 text-sm shadow-none ring-0 transition-colors hover:bg-secondary/80 dark:bg-card/60 dark:hover:bg-card"
      >
        <CardHeader className="flex flex-row items-start justify-between px-3">
          <span className="grid size-10 place-items-center rounded-lg bg-background">
            <Icon aria-hidden="true" className="size-5" strokeWidth={1.6} />
          </span>
          <ArrowUpRight
            aria-hidden="true"
            className="size-6 text-muted-foreground"
            strokeWidth={1.5}
          />
        </CardHeader>
        <CardContent className="space-y-3 px-3">
          <CardTitle className="text-sm leading-snug font-medium">
            {workspace.title}
          </CardTitle>
          <CardDescription className="font-mono text-xs">
            <ul className="space-y-2">
              {workspace.details.map((detail) => (
                <li key={detail} className="flex gap-2">
                  <span aria-hidden="true">·</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </CardDescription>
        </CardContent>
      </Card>
    </DashboardLink>
  )
}

export function DashboardContent() {
  const [query, setQuery] = useState("")
  const searchInputRef = useRef<HTMLInputElement>(null)
  const normalizedQuery = query.trim().toLowerCase()
  const visibleWorkspaces = workspaceCards.filter((workspace) =>
    [workspace.title, ...workspace.details]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery)
  )

  useEffect(() => {
    function focusSearch(event: KeyboardEvent) {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault()
        searchInputRef.current?.focus()
      }
    }

    window.addEventListener("keydown", focusSearch)
    return () => window.removeEventListener("keydown", focusSearch)
  }, [])

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8 lg:pt-12">
      <div className="flex flex-col gap-6 border-b pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-4">
          <h1 className="text-2xl font-medium tracking-tight sm:text-3xl">
            {dashboardOverview.company}
          </h1>
          <p className="flex items-center gap-1.5 font-mono text-sm text-muted-foreground sm:text-base">
            <CalendarDays aria-hidden="true" className="size-5" strokeWidth={1.5} />
            {dashboardOverview.date}
          </p>
        </div>

        <div className="relative w-full sm:max-w-md">
          <label htmlFor="network-search" className="sr-only">
            Search the network model
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
            strokeWidth={1.5}
          />
          <Input
            id="network-search"
            ref={searchInputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the network model..."
            className="h-11 rounded-lg border-0 bg-muted pl-11 pr-4 font-mono shadow-none sm:pr-14 [&::-webkit-search-cancel-button]:appearance-none"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <kbd className="pointer-events-none hidden items-center gap-1 rounded-md bg-background px-2 py-1 font-mono text-xs text-muted-foreground sm:flex">
              <Command aria-hidden="true" className="size-3" />
              K
            </kbd>
          </div>
        </div>
      </div>

      <section className="mt-7">
        <SectionTitle icon={Clock3}>Recents</SectionTitle>
        <div className="flex flex-col items-center gap-5 py-10 sm:py-12">
          <span className="grid size-14 place-items-center rounded-xl bg-muted">
            <Clock3 aria-hidden="true" className="size-7" strokeWidth={1.5} />
          </span>
          <p className="font-mono text-sm text-muted-foreground">
            Your recent works will appear here
          </p>
        </div>
      </section>

      <section className="space-y-6 pb-8">
        <SectionTitle>Workspaces</SectionTitle>

        {visibleWorkspaces.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
            {visibleWorkspaces.map((workspace) => (
              <WorkspaceCardItem key={workspace.title} workspace={workspace} />
            ))}
          </div>
        ) : (
          <p className="flex min-h-48 items-center justify-center rounded-xl bg-muted text-center text-sm text-muted-foreground">
            No workspaces match your search.
          </p>
        )}
      </section>
    </div>
  )
}
