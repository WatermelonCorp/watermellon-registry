import { useEffect, useState } from "react"
import {
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  Database,
  GitBranch,
  MapPin,
  Shield,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import {
  modellingActions,
  modellingDashboard,
  modelWorkflowStatuses,
  networkBasemapUrl,
  networkRegions,
  type ModellingAction,
  type NetworkRegion,
} from "../../data"
import { cn } from "@/lib/utils"

const actionIcons: Record<ModellingAction["icon"], LucideIcon> = {
  database: Database,
  comparison: GitBranch,
  clearview: Shield,
}

const markerStyles: Record<NetworkRegion["color"], string> = {
  blue: "border-blue-700 bg-blue-500",
  purple: "border-violet-700 bg-violet-500",
  red: "border-red-700 bg-red-500",
  green: "border-emerald-700 bg-emerald-500",
}

const markerPositions: Record<NetworkRegion["position"], string> = {
  "north-east": "right-3 top-[9%] lg:left-[72%] lg:right-auto",
  central: "right-12 top-[28%] lg:left-[57%] lg:right-auto",
  west: "left-3 top-[50%] lg:left-[40%]",
  "south-east": "right-6 top-[71%] lg:left-[68%] lg:right-auto",
}

function StatusDotLabel({ children }: { children: string }) {
  return (
    <p className="flex items-center gap-2 text-xs text-muted-foreground">
      <span className="size-1.5 rounded-full bg-current" />
      {children}
    </p>
  )
}

function ModelSummary() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-7 rounded-xl bg-secondary/70 p-4">
        <StatusDotLabel>Current Model</StatusDotLabel>
        <div className="space-y-2">
          <p className="text-sm font-medium">{modellingDashboard.currentModel}</p>
          <p className="font-mono text-xs text-primary">
            {modellingDashboard.currentVersion}
          </p>
        </div>
      </div>

      <div className="space-y-7 rounded-xl bg-secondary/70 p-4">
        <StatusDotLabel>Latest Update</StatusDotLabel>
        <p className="text-sm font-medium leading-snug">
          {modellingDashboard.latestUpdate}
        </p>
      </div>

      <div className="col-span-2 space-y-7 rounded-xl bg-secondary/70 p-4">
        <StatusDotLabel>Status</StatusDotLabel>
        <div className="space-y-3">
          <p className="flex items-end gap-2">
            <span className="text-base font-medium">
              {modellingDashboard.coverage}
            </span>
            <span className="text-xs text-muted-foreground">Coverage</span>
          </p>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <p className="text-muted-foreground">
              Last Published:{" "}
              <span className="text-foreground/80">
                {modellingDashboard.lastPublished}
              </span>
            </p>
            <p className="text-amber-500">
              {modellingDashboard.openIssues} open issues
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function PrimaryAction({ action }: { action: ModellingAction }) {
  const Icon = actionIcons[action.icon]

  return (
    <button
      type="button"
      className="group flex min-h-40 flex-col justify-between gap-8 rounded-xl bg-secondary/70 p-4 text-left outline-none transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="flex w-full items-start justify-between">
        <span className="grid size-10 place-items-center rounded-lg bg-background">
          <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className="size-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={1.5}
        />
      </span>
      <span className="space-y-2">
        <span className="block text-sm font-medium">{action.title}</span>
        <span className="block font-mono text-xs leading-relaxed text-muted-foreground">
          {action.description}
        </span>
      </span>
    </button>
  )
}

function RegionMarker({
  region,
  selected,
  onSelect,
}: {
  region: NetworkRegion
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={cn(
        "absolute w-36 rounded-xl border-2 p-2 text-left text-primary-foreground shadow-lg outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-foreground lg:w-48 lg:p-4",
        markerStyles[region.color],
        markerPositions[region.position],
        selected && "border-foreground"
      )}
    >
      <span className="block text-sm font-medium">{region.name}</span>
      <span className="mt-2 flex items-center gap-2 font-mono text-xs text-primary-foreground/80">
        Click to load
        <ArrowUpRight aria-hidden="true" className="size-4" />
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute left-1/2 top-full size-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b-2 border-r-2",
          markerStyles[region.color],
        )}
      />
    </button>
  )
}

function MapLegend() {
  return (
    <div className="absolute bottom-5 right-5 hidden space-y-1.5 rounded-lg bg-black/30 p-3 backdrop-blur-sm lg:block">
      {networkRegions.map((region) => (
        <div
          key={`${region.legendName}-${region.color}`}
          className="flex items-center gap-2 font-mono text-xs text-primary-foreground/80"
        >
          <span
            className={cn(
              "size-2 rounded-sm",
              markerStyles[region.color].split(" ")[1]
            )}
          />
          {region.legendName}
        </div>
      ))}
    </div>
  )
}

function Map({
  selectedRegion,
  onSelectRegion,
}: {
  selectedRegion: NetworkRegion | null
  onSelectRegion: (region: NetworkRegion) => void
}) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <img
        src={networkBasemapUrl}
        alt="Network regions across Maryland and Delaware"
        className="size-full object-cover object-center invert dark:invert-0"
      />
      <div className="absolute inset-0 bg-black/10" />
      {networkRegions.map((region) => {
        const key = `${region.name}-${region.color}`
        return (
          <RegionMarker
            key={key}
            region={region}
            selected={selectedRegion?.position === region.position}
            onSelect={() => onSelectRegion(region)}
          />
        )
      })}
      <MapLegend />
    </div>
  )
}

function InformationPanelHeader({
  region,
  mobile = false,
  onCollapse,
}: {
  region: NetworkRegion
  mobile?: boolean
  onCollapse: () => void
}) {
  const CollapseIcon = mobile ? ChevronDown : ChevronLeft

  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-secondary">
          <Database aria-hidden="true" className="size-5" strokeWidth={1.5} />
        </span>
        <div className="min-w-0">
          <h1 className="truncate text-base font-medium">
            {modellingDashboard.title}
          </h1>
          <p className="truncate font-mono text-xs text-muted-foreground">
            {region.name}
          </p>
        </div>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon-lg"
        aria-label="Collapse model information"
        onClick={onCollapse}
        className="shrink-0 text-muted-foreground"
      >
        <CollapseIcon aria-hidden="true" className="size-5" />
      </Button>
    </header>
  )
}

function InformationPanelBody({ region }: { region: NetworkRegion }) {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="max-w-sm font-mono text-xs leading-relaxed text-muted-foreground">
          {modellingDashboard.description}
        </p>
        <div className="flex flex-wrap items-center gap-1 font-mono text-xs">
          <span className="flex items-center gap-1.5 rounded-md bg-secondary px-2 py-1">
            <MapPin aria-hidden="true" className="size-3.5 text-primary" />
            {region.name}
          </span>
          <span className="rounded-md bg-secondary px-2 py-1 text-muted-foreground">
            {modellingDashboard.version}
          </span>
          <span className="flex items-center gap-2 rounded-md bg-secondary px-2 py-1 text-primary">
            <span className="size-1.5 rounded-full bg-primary" />
            {modelWorkflowStatuses.publication}
          </span>
          <span className="rounded-md bg-secondary px-2 py-1 text-emerald-500">
            {modelWorkflowStatuses.validation}
          </span>
        </div>
      </section>

      <ModelSummary />

      <section className="space-y-4">
        <h2 className="flex items-center gap-2 font-mono text-base text-foreground/80">
          <ArrowUpRight aria-hidden="true" className="size-5" />
          Primary Actions
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {modellingActions.map((action) => (
            <PrimaryAction key={action.title} action={action} />
          ))}
        </div>
      </section>
    </div>
  )
}

function DesktopInformationPanel({
  region,
  onCollapse,
}: {
  region: NetworkRegion
  onCollapse: () => void
}) {
  return (
    <article className="absolute inset-y-4 left-4 z-10 hidden w-96 flex-col overflow-hidden rounded-xl bg-background/95 p-6 shadow-2xl backdrop-blur-xl md:flex">
      <div className="shrink-0">
        <InformationPanelHeader region={region} onCollapse={onCollapse} />
      </div>
      <div className="mt-6 min-h-0 flex-1 overflow-y-auto">
        <InformationPanelBody region={region} />
      </div>
    </article>
  )
}

function MobileInformationDrawer({
  region,
  open,
  onCollapse,
}: {
  region: NetworkRegion
  open: boolean
  onCollapse: () => void
}) {
  return (
    <Drawer
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onCollapse()
      }}
    >
      <DrawerContent className="md:hidden">
        <DrawerHeader className="sr-only">
          <DrawerTitle>{modellingDashboard.title}</DrawerTitle>
          <DrawerDescription>
            Network model information and primary actions
          </DrawerDescription>
        </DrawerHeader>
        <article className="flex min-h-0 flex-1 flex-col px-5 pb-8 pt-3">
          <div className="shrink-0">
            <InformationPanelHeader
              region={region}
              mobile
              onCollapse={onCollapse}
            />
          </div>
          <div className="mt-6 min-h-0 flex-1 overflow-y-auto">
            <InformationPanelBody region={region} />
          </div>
        </article>
      </DrawerContent>
    </Drawer>
  )
}

export function ModellingDashboard() {
  const [selectedRegion, setSelectedRegion] = useState<NetworkRegion | null>(
    null,
  )
  const [isMobile, setIsMobile] = useState(() =>
    typeof window === "undefined"
      ? false
      : !window.matchMedia("(min-width: 48rem)").matches,
  )

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 48rem)")
    const syncViewport = () => setIsMobile(!desktopQuery.matches)

    syncViewport()
    desktopQuery.addEventListener("change", syncViewport)
    return () => desktopQuery.removeEventListener("change", syncViewport)
  }, [])

  const clearSelection = () => setSelectedRegion(null)

  return (
    <div className="absolute inset-x-0 bottom-0 top-18 overflow-hidden bg-background md:left-17">
      <Map
        selectedRegion={selectedRegion}
        onSelectRegion={setSelectedRegion}
      />
      {selectedRegion && (
        <>
          <DesktopInformationPanel
            region={selectedRegion}
            onCollapse={clearSelection}
          />
          <MobileInformationDrawer
            region={selectedRegion}
            open={isMobile}
            onCollapse={clearSelection}
          />
        </>
      )}
    </div>
  )
}
