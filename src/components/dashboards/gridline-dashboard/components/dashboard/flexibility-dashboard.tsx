import { useMemo, useState, type ComponentType } from "react"
import {
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircuitBoard,
  Database,
  FileText,
  GitCompare,
  Grid3X3,
  Map,
  MapPin,
  MessageSquare,
  Minus,
  Network,
  PanelLeft,
  PanelRight,
  Plus,
  Search,
  SlidersHorizontal,
  Table2,
  X,
  Zap,
} from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  flexibilityDashboard,
  gridAssets,
  networkBasemapUrl,
  networkRegions,
  voltageLevelFilters,
  type GridAsset,
} from "../../data"
import { cn } from "@/lib/utils"

type ToolTab = {
  label: string
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>
}

const toolTabs: ToolTab[] = [
  { label: "Browse", icon: Database },
  { label: "Map", icon: Map },
  { label: "Graph", icon: Network },
  { label: "Circuit", icon: CircuitBoard },
  { label: "Table", icon: Table2 },
  { label: "Table++", icon: Grid3X3 },
  { label: "LTDS Table Generator", icon: FileText },
  { label: "Compare", icon: GitCompare },
]

const voltageDotStyles: Record<
  (typeof voltageLevelFilters)[number]["color"],
  string
> = {
  neutral: "bg-foreground",
  green: "bg-green-600",
  yellow: "bg-yellow-400",
  red: "bg-red-500",
  blue: "bg-blue-600",
  brown: "bg-amber-800",
}

const regionDotStyles: Record<string, string> = {
  blue: "bg-blue-500",
  purple: "bg-violet-500",
  red: "bg-red-500",
  green: "bg-emerald-500",
}

function ToolNavigation({
  activeTool,
  onToolChange,
}: {
  activeTool: string
  onToolChange: (tool: string) => void
}) {
  return (
    <nav
      aria-label="Asset workspace tools"
      className="flex min-w-0 flex-1 items-center justify-between overflow-x-auto px-2 sm:justify-start sm:gap-1"
    >
      {toolTabs.map(({ label, icon: Icon }) => (
        <Button
          key={label}
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={label}
          aria-pressed={activeTool === label}
          onClick={() => onToolChange(label)}
          className={cn(
            "shrink-0 gap-2 font-mono text-xs text-muted-foreground sm:w-auto sm:px-2.5",
            activeTool === label &&
              "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
          )}
        >
          <Icon aria-hidden={true} className="size-4" />
          <span className="hidden sm:inline">{label}</span>
        </Button>
      ))}
    </nav>
  )
}

function AssetList({
  selectedAsset,
  onSelectAsset,
  showHeader = true,
}: {
  selectedAsset: GridAsset
  onSelectAsset: (asset: GridAsset) => void
  showHeader?: boolean
}) {
  const [query, setQuery] = useState("")
  const [expandedAssets, setExpandedAssets] = useState<Set<string>>(
    () => new Set([selectedAsset.id])
  )
  const visibleAssets = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return gridAssets.filter((asset) =>
      `${asset.name} ${asset.voltage}`.toLowerCase().includes(normalizedQuery)
    )
  }, [query])

  function toggleAsset(asset: GridAsset) {
    onSelectAsset(asset)
    setExpandedAssets((current) => {
      const next = new Set(current)
      if (next.has(asset.id)) next.delete(asset.id)
      else next.add(asset.id)
      return next
    })
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background">
      <div className="border-b p-3">
        {showHeader && (
          <div className="pr-10">
            <h2 className="text-sm font-medium">
              {flexibilityDashboard.regionName} Assets
            </h2>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              {flexibilityDashboard.substationCount} Substations
            </p>
          </div>
        )}
        <div className={cn("relative", showHeader && "mt-4")}>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search"
            className="border-0 bg-muted pl-9 font-mono text-xs shadow-none"
          />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        {visibleAssets.map((asset) => {
          const isExpanded = expandedAssets.has(asset.id)

          return (
            <div key={asset.id}>
              <button
                type="button"
                aria-expanded={isExpanded}
                onClick={() => toggleAsset(asset)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-2 py-2 text-left outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring",
                  selectedAsset.id === asset.id && "bg-primary/10"
                )}
              >
                {isExpanded ? (
                  <ChevronDown
                    aria-hidden="true"
                    className="size-3.5 shrink-0 text-muted-foreground"
                  />
                ) : (
                  <ChevronRight
                    aria-hidden="true"
                    className="size-3.5 shrink-0 text-muted-foreground"
                  />
                )}
                <Zap
                  aria-hidden="true"
                  className={cn(
                    "size-3.5 shrink-0 text-muted-foreground",
                    selectedAsset.id === asset.id && "text-primary"
                  )}
                />
                <span className="min-w-0 flex-1 truncate font-mono text-xs text-muted-foreground">
                  {asset.name} {asset.voltage}
                </span>
                <span className="shrink-0 font-mono text-xs text-muted-foreground">
                  {asset.equipmentCount}
                </span>
              </button>
              {isExpanded && (
                <div className="mx-2 mb-1 grid grid-cols-2 gap-2 px-8 py-2 font-mono text-xs text-muted-foreground">
                  <span>Voltage</span>
                  <span className="text-right">{asset.voltage}</span>
                  <span>Equipment</span>
                  <span className="text-right">
                    {asset.equipmentCount} items
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function FilterPanel({
  className,
  onCollapse,
}: {
  className?: string
  onCollapse?: () => void
}) {
  const [enabledVoltages, setEnabledVoltages] = useState<Set<string>>(
    () => new Set(voltageLevelFilters.map(({ id }) => id))
  )
  const [showSubstations, setShowSubstations] = useState(true)

  function setVoltageEnabled(id: string, enabled: boolean) {
    setEnabledVoltages((current) => {
      const next = new Set(current)
      if (enabled) next.add(id)
      else next.delete(id)
      return next
    })
  }

  return (
    <div
      className={cn(
        "flex h-full max-h-full min-h-0 flex-col rounded-xl bg-background/95 p-3 font-mono text-xs shadow-xl backdrop-blur-xl",
        className
      )}
    >
      <div className="flex shrink-0 items-center justify-between gap-3 pb-3">
        <h2 className="font-medium">Voltage Levels</h2>
        {onCollapse && (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Collapse map filters"
            onClick={onCollapse}
          >
            <ChevronLeft aria-hidden="true" />
          </Button>
        )}
      </div>
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto">
        <div className="space-y-1 border-b pb-3">
          {voltageLevelFilters.map((level) => (
            <div
              key={level.id}
              className="flex items-center justify-between gap-3 rounded-md bg-secondary/70 px-2 py-1.5"
            >
              <span className="flex items-center gap-2">
                <span
                  className={cn(
                    "size-2 rounded-full",
                    voltageDotStyles[level.color]
                  )}
                />
                {level.label}
              </span>
              <Switch
                size="sm"
                checked={enabledVoltages.has(level.id)}
                onCheckedChange={(checked) =>
                  setVoltageEnabled(level.id, checked)
                }
                aria-label={`Show ${level.label}`}
              />
            </div>
          ))}
        </div>

        <div className="space-y-2 border-b pb-3">
          <p className="font-medium">Option</p>
          <div className="flex items-center justify-between rounded-md bg-secondary/70 px-2 py-1.5">
            <span>Show Substations</span>
            <Switch
              size="sm"
              checked={showSubstations}
              onCheckedChange={setShowSubstations}
              aria-label="Show substations"
            />
          </div>
        </div>

        <div className="space-y-1 border-b pb-3">
          <p className="pb-1 font-medium">Grid Regions</p>
          {networkRegions.map((region) => (
            <button
              key={`${region.legendName}-${region.color}`}
              type="button"
              className={cn(
                "flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-muted-foreground transition-colors hover:bg-muted",
                region.legendName === flexibilityDashboard.regionName &&
                  "bg-emerald-500/10 text-emerald-500"
              )}
            >
              <span
                className={cn(
                  "size-2 rounded-sm",
                  regionDotStyles[region.color]
                )}
              />
              <span className="flex-1">{region.legendName}</span>
              {region.legendName === flexibilityDashboard.regionName && (
                <span className="text-xs">Loaded</span>
              )}
            </button>
          ))}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-full justify-start text-xs text-muted-foreground"
          >
            <MapPin aria-hidden="true" className="size-4" />
            Reset View
          </Button>
        </div>

        <div className="space-y-1">
          <p className="font-medium">Loaded</p>
          <p className="text-muted-foreground">
            {flexibilityDashboard.substationCount} Substations
          </p>
          <p className="text-emerald-500">
            {flexibilityDashboard.mappedSubstationCount} mapped on map
          </p>
          <p className="pt-2 text-muted-foreground">
            Location DB: {flexibilityDashboard.locationCount} entries
          </p>
        </div>
      </div>
    </div>
  )
}

function DetailsPanel({
  asset,
  showHeader = true,
}: {
  asset: GridAsset
  showHeader?: boolean
}) {
  const [overviewOpen, setOverviewOpen] = useState(true)
  const [identifierOpen, setIdentifierOpen] = useState(false)

  return (
    <div className="flex h-full flex-col bg-background">
      {showHeader && (
        <div className="border-b p-4">
          <div>
            <h2 className="text-sm font-medium">Details</h2>
            <p className="font-mono text-xs text-muted-foreground">
              {flexibilityDashboard.assetType}
            </p>
          </div>
        </div>
      )}

      <div className="space-y-6 overflow-y-auto p-4">
        <span className="grid size-10 place-items-center rounded-lg bg-secondary">
          <Building2 aria-hidden="true" className="size-5" />
        </span>
        <div>
          <h3 className="text-base font-medium">
            {asset.name} {asset.voltage}
          </h3>
          <span className="mt-2 inline-flex rounded-md bg-secondary px-2 py-1 font-mono text-xs text-muted-foreground">
            {flexibilityDashboard.assetType}
          </span>
        </div>

        <section className="border-t pt-4">
          <button
            type="button"
            aria-expanded={overviewOpen}
            onClick={() => setOverviewOpen((open) => !open)}
            className="flex w-full items-center gap-2 font-mono text-xs"
          >
            {overviewOpen ? (
              <ChevronDown aria-hidden="true" className="size-4" />
            ) : (
              <ChevronRight aria-hidden="true" className="size-4" />
            )}
            Overview
          </button>
          {overviewOpen && (
            <dl className="mt-4 space-y-4 font-mono text-xs">
              <div className="flex items-start justify-between gap-4">
                <dt className="text-muted-foreground">Name</dt>
                <dd className="text-right">
                  {asset.name} {asset.voltage}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-muted-foreground">Equipment</dt>
                <dd>{asset.equipmentCount} Items</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-muted-foreground">Voltage Levels</dt>
                <dd>{flexibilityDashboard.voltageLevels.length}</dd>
              </div>
            </dl>
          )}
        </section>

        <section className="border-y py-4">
          <button
            type="button"
            aria-expanded={identifierOpen}
            onClick={() => setIdentifierOpen((open) => !open)}
            className="flex w-full items-center gap-2 font-mono text-xs"
          >
            {identifierOpen ? (
              <ChevronDown aria-hidden="true" className="size-4" />
            ) : (
              <ChevronRight aria-hidden="true" className="size-4" />
            )}
            Identifier
          </button>
          {identifierOpen && (
            <dl className="mt-4 space-y-3 font-mono text-xs">
              <div className="flex items-start justify-between gap-4">
                <dt className="text-muted-foreground">Asset ID</dt>
                <dd>{asset.id}</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-muted-foreground">Region</dt>
                <dd>{flexibilityDashboard.regionName}</dd>
              </div>
            </dl>
          )}
        </section>
      </div>
    </div>
  )
}

function SubstationCard({
  asset,
  onClose,
  onViewCircuit,
}: {
  asset: GridAsset
  onClose: () => void
  onViewCircuit: () => void
}) {
  return (
    <section
      role="dialog"
      aria-label="Selected substation details"
      className="pointer-events-auto relative z-10 max-h-80 w-full overflow-y-auto rounded-xl bg-background p-4 shadow-2xl sm:w-96"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium">
          {flexibilityDashboard.assetType}
        </p>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Close substation details"
          onClick={onClose}
        >
          <X aria-hidden="true" />
        </Button>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-lg bg-secondary">
          <Building2 aria-hidden="true" className="size-4" />
        </span>
        <p className="text-sm font-medium">
          {asset.name} {asset.voltage}
        </p>
      </div>

      <dl className="mt-4 space-y-2 font-mono text-xs">
        {flexibilityDashboard.voltageLevels.map((level, index) => (
          <div
            key={level}
            className="grid grid-cols-[auto_1fr] gap-4"
          >
            <dt className="text-muted-foreground">
              {index === 0 ? "Voltage:" : "Levels:"}
            </dt>
            <dd className="truncate text-right">
              {level} {asset.name}_Land_GeoRegion,
            </dd>
          </div>
        ))}
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Equipment:</dt>
          <dd>{asset.equipmentCount} items</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Coordinates:</dt>
          <dd>{flexibilityDashboard.coordinates}</dd>
        </div>
      </dl>

      <Button
        type="button"
        variant="ghost"
        onClick={onViewCircuit}
        className="mx-auto mt-4"
      >
        <CircuitBoard aria-hidden="true" />
        View in Circuit
        <ChevronRight aria-hidden="true" />
      </Button>
    </section>
  )
}

function MobileUtilities({
  selectedAsset,
  onSelectAsset,
}: {
  selectedAsset: GridAsset
  onSelectAsset: (asset: GridAsset) => void
}) {
  return (
    <div className="pointer-events-none absolute inset-x-3 top-3 z-20 flex items-start justify-between lg:hidden">
      <div className="pointer-events-auto flex gap-2">
        <Drawer>
          <DrawerTrigger
            className={buttonVariants({ variant: "secondary", size: "sm" })}
          >
            <PanelLeft aria-hidden="true" />
            Assets
          </DrawerTrigger>
          <DrawerContent className="h-4/5">
            <DrawerHeader className="sr-only">
              <DrawerTitle>
                {flexibilityDashboard.regionName} Assets
              </DrawerTitle>
              <DrawerDescription>Browse available substations</DrawerDescription>
            </DrawerHeader>
            <DrawerClose
              aria-label="Close assets"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon-sm" }),
                "absolute right-4 top-4 z-10",
              )}
            >
              <X aria-hidden="true" />
            </DrawerClose>
            <AssetList
              selectedAsset={selectedAsset}
              onSelectAsset={onSelectAsset}
            />
          </DrawerContent>
        </Drawer>

        <Drawer>
          <DrawerTrigger
            className={buttonVariants({
              variant: "secondary",
              size: "icon-sm",
            })}
          >
            <SlidersHorizontal aria-hidden="true" />
            <span className="sr-only">Filters</span>
          </DrawerTrigger>
          <DrawerContent className="h-4/5">
            <DrawerHeader className="sr-only">
              <DrawerTitle>Map filters</DrawerTitle>
              <DrawerDescription>
                Filter voltage levels and grid regions
              </DrawerDescription>
            </DrawerHeader>
            <DrawerClose
              aria-label="Close filters"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon-sm" }),
                "absolute right-4 top-4 z-10",
              )}
            >
              <X aria-hidden="true" />
            </DrawerClose>
            <FilterPanel className="rounded-none bg-background p-4 shadow-none backdrop-blur-none" />
          </DrawerContent>
        </Drawer>
      </div>

      <Drawer>
        <DrawerTrigger
          className={cn(
            buttonVariants({ variant: "secondary", size: "sm" }),
            "pointer-events-auto",
          )}
        >
          <Building2 aria-hidden="true" />
          Details
        </DrawerTrigger>
        <DrawerContent className="h-4/5">
          <DrawerHeader className="sr-only">
            <DrawerTitle>Substation details</DrawerTitle>
            <DrawerDescription>
              Details for the selected substation
            </DrawerDescription>
          </DrawerHeader>
          <DrawerClose
            aria-label="Close details"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon-sm" }),
              "absolute right-4 top-4 z-10",
            )}
          >
            <X aria-hidden="true" />
          </DrawerClose>
          <DetailsPanel asset={selectedAsset} />
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export function FlexibilityDashboard() {
  const [activeTool, setActiveTool] = useState("Browse")
  const [selectedAsset, setSelectedAsset] = useState(gridAssets[0])
  const [showSubstationCard, setShowSubstationCard] = useState(true)
  const [showAssetsPanel, setShowAssetsPanel] = useState(true)
  const [showFilterPanel, setShowFilterPanel] = useState(true)
  const [showDetailsPanel, setShowDetailsPanel] = useState(true)
  const [zoom, setZoom] = useState(1)

  function selectAsset(asset: GridAsset) {
    setSelectedAsset(asset)
    setShowSubstationCard(true)
  }

  return (
    <div className="absolute inset-x-0 bottom-0 top-18 overflow-hidden bg-background md:left-17">
      <header className="absolute inset-x-0 top-0 z-20 flex h-14 items-center border-b bg-background/95 backdrop-blur">
        {showAssetsPanel ? (
          <div className="hidden w-64 shrink-0 items-center justify-between border-r px-4 lg:flex">
            <div>
              <p className="text-sm font-medium">
                {flexibilityDashboard.regionName} Assets
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                {flexibilityDashboard.substationCount} Substations
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Collapse assets panel"
              onClick={() => setShowAssetsPanel(false)}
            >
              <ChevronLeft aria-hidden="true" />
            </Button>
          </div>
        ) : (
          <div className="hidden shrink-0 border-r px-2 lg:flex">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowAssetsPanel(true)}
            >
              <PanelLeft aria-hidden="true" />
              Assets
            </Button>
          </div>
        )}
        <ToolNavigation
          activeTool={activeTool}
          onToolChange={setActiveTool}
        />
        {showDetailsPanel ? (
          <div className="hidden w-64 shrink-0 items-center justify-between border-l px-4 lg:flex">
            <div>
              <p className="text-sm font-medium">Details</p>
              <p className="font-mono text-xs text-muted-foreground">
                {flexibilityDashboard.assetType}
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Collapse details panel"
              onClick={() => setShowDetailsPanel(false)}
            >
              <ChevronRight aria-hidden="true" />
            </Button>
          </div>
        ) : (
          <div className="hidden shrink-0 border-l px-2 lg:flex">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowDetailsPanel(true)}
            >
              <PanelRight aria-hidden="true" />
              Details
            </Button>
          </div>
        )}
      </header>

      <div className="absolute inset-x-0 bottom-0 top-14 flex">
        {showAssetsPanel && (
          <aside className="hidden w-64 shrink-0 border-r lg:flex">
            <AssetList
              selectedAsset={selectedAsset}
              onSelectAsset={selectAsset}
              showHeader={false}
            />
          </aside>
        )}

        <section
          aria-label="Substation asset map"
          className="relative min-w-0 flex-1 overflow-hidden bg-black"
        >
          <img
            src={networkBasemapUrl}
            alt="Substation asset map"
            className="absolute inset-0 size-full object-cover object-center invert transition-transform duration-300 dark:invert-0"
            style={{ transform: `scale(${zoom})` }}
          />
          <div className="absolute inset-0 bg-black/10" />

          <MobileUtilities
            selectedAsset={selectedAsset}
            onSelectAsset={selectAsset}
          />

          {showFilterPanel ? (
            <aside className="absolute inset-y-3 left-3 z-10 hidden w-48 overflow-hidden rounded-xl xl:block">
              <FilterPanel onCollapse={() => setShowFilterPanel(false)} />
            </aside>
          ) : (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setShowFilterPanel(true)}
              className="absolute left-3 top-3 z-10 hidden shadow-lg xl:inline-flex"
            >
              <SlidersHorizontal aria-hidden="true" />
              Filters
            </Button>
          )}

          <div className="absolute bottom-3 right-3 z-10 flex flex-col rounded-lg bg-background p-1 shadow-lg">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Zoom in"
              onClick={() => setZoom((value) => Math.min(1.4, value + 0.1))}
            >
              <Plus aria-hidden="true" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Zoom out"
              onClick={() => setZoom((value) => Math.max(1, value - 0.1))}
            >
              <Minus aria-hidden="true" />
            </Button>
          </div>

          {showSubstationCard && (
            <div className="pointer-events-none absolute inset-x-3 top-2/3 z-10 flex -translate-y-full justify-center pb-3">
              <SubstationCard
                asset={selectedAsset}
                onClose={() => setShowSubstationCard(false)}
                onViewCircuit={() => setActiveTool("Circuit")}
              />
              <span
                aria-hidden="true"
                className="absolute bottom-1.5 left-1/2 size-3 -translate-x-1/2 rotate-45 bg-background"
              />
            </div>
          )}
          <span className="absolute left-1/2 top-2/3 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-primary shadow-lg" />

          <div className="absolute bottom-3 left-1/2 hidden -translate-x-1/2 items-center gap-2 sm:flex">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="font-mono text-xs text-muted-foreground"
            >
              <MessageSquare aria-hidden="true" />
              Feedback
            </Button>
            <div className="rounded-md bg-background/95 px-3 py-2 font-mono text-xs shadow-lg backdrop-blur">
              <span className="text-muted-foreground">Attribution: </span>
              <span>{flexibilityDashboard.attributionCompany} </span>
              <Network aria-hidden="true" className="inline size-4 text-primary" />
              <span className="text-primary">
                {" "}
                {flexibilityDashboard.attributionProduct}
              </span>
            </div>
          </div>
        </section>

        {showDetailsPanel && (
          <aside className="hidden w-64 shrink-0 border-l lg:block">
            <DetailsPanel asset={selectedAsset} showHeader={false} />
          </aside>
        )}
      </div>
    </div>
  )
}
