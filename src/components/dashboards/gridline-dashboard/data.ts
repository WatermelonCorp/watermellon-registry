export type WorkspaceCard = {
  title: string
  href: string
  icon: "database" | "flexibility" | "planning" | "operations" | "stakeholders" | "connections"
  details: string[]
}

export const dashboardOverview = {
  company: "Electrical Grid Company",
  date: "16 March 2026",
}

export const networkBasemapUrl =
  "https://assets.watermelon.sh/components/map-sample.png"

export const workspaceCards: WorkspaceCard[] = [
  {
    title: "System Modelling and Data",
    href: "/modelling",
    icon: "database",
    details: [
      "Validate model quality and coverage",
      "Prepare publish packs and audit",
    ],
  },
  {
    title: "Flexibility",
    href: "/flexibility",
    icon: "flexibility",
    details: [
      "Build stakeholder story packs",
      "Generate briefings with traceable evidence",
    ],
  },
  {
    title: "Planning & Investment",
    href: "/planning",
    icon: "planning",
    details: [
      "Stress-test scenarios and constraints",
      "Track reinforcement options and assumptions",
    ],
  },
  {
    title: "Operations Interface",
    href: "/operations",
    icon: "operations",
    details: [
      "Operational context for switching and outage",
      "Link events back to model",
    ],
  },
  {
    title: "Stakeholder & Public",
    href: "/stakeholders",
    icon: "stakeholders",
    details: [
      "Publish model-anchored views",
      "Generate briefings with traceable evidence",
    ],
  },
  {
    title: "Connections & Queue",
    href: "/connections",
    icon: "connections",
    details: [
      "Queue context and constraints",
      "Application tracking linked to the model",
    ],
  },
]

export type ModellingAction = {
  title: string
  description: string
  icon: "database" | "comparison" | "clearview"
}

export type NetworkRegion = {
  name: string
  legendName: string
  color: "blue" | "purple" | "red" | "green"
  position: "north-east" | "central" | "west" | "south-east"
}

export const modellingDashboard = {
  title: "System Modelling and Data",
  description:
    "Validate and publish the latest network model used across DSO workflows",
  version: "Model v2.4.2",
  latestVersion: "v2.4.2",
  currentModel: "Electrical Grid Company",
  currentVersion: "v2.4.1",
  latestUpdate: "Coverage gap analysis completed",
  coverage: "94%",
  lastPublished: "3 days ago",
  openIssues: 2,
}

export const modelWorkflowStatuses = {
  publication: "Published",
  validation: "Validated",
  review: "In Review",
}

export const modellingActions: ModellingAction[] = [
  {
    title: "LTDS Table Generator",
    description: "Generate and export LTDS tables from CIM data",
    icon: "database",
  },
  {
    title: "CIM Comparison",
    description: "Compare CIM model versions and track changes",
    icon: "comparison",
  },
  {
    title: "ClearView",
    description: "Asset enrichment and reinforcement data",
    icon: "clearview",
  },
]

export const networkRegions: NetworkRegion[] = [
  {
    name: "East Midlands",
    legendName: "East Midlands",
    color: "blue",
    position: "north-east",
  },
  {
    name: "East Midlands",
    legendName: "West Midlands",
    color: "purple",
    position: "central",
  },
  {
    name: "South Wales",
    legendName: "South Wales",
    color: "red",
    position: "west",
  },
  {
    name: "South West",
    legendName: "South West",
    color: "green",
    position: "south-east",
  },
]

export type GridAsset = {
  id: string
  name: string
  voltage: string
  equipmentCount: number
}

export const flexibilityDashboard = {
  regionName: "South West",
  assetType: "Substation",
  substationCount: 621,
  mappedSubstationCount: 379,
  locationCount: 2072,
  attributionCompany: "Large Grid Company",
  attributionProduct: "Squid",
  voltageLevels: ["33kV", "11kV"],
  coordinates: "50.5544, -4.1608",
}

export const gridAssets: GridAsset[] = [
  { id: "tavistock", name: "Tavistock", voltage: "33/11kV", equipmentCount: 30 },
  { id: "st-tudy", name: "St Tudy", voltage: "33/11kV", equipmentCount: 24 },
  { id: "st-tudy-bsp", name: "St Tudy BSP", voltage: "132/33kV", equipmentCount: 24 },
  { id: "stancombe", name: "Stancombe Quarry", voltage: "33kV", equipmentCount: 24 },
  { id: "staplegrove", name: "Staplegrove", voltage: "33/11kV", equipmentCount: 24 },
  { id: "stentaway", name: "Stentaway", voltage: "33/11kV", equipmentCount: 24 },
  { id: "stoke-bishop", name: "Stoke Bishop", voltage: "33/11kV", equipmentCount: 24 },
  { id: "stokenham", name: "Stokenham", voltage: "33/11kV", equipmentCount: 24 },
  { id: "street-bsp", name: "Street BSP", voltage: "132/33kV", equipmentCount: 24 },
  { id: "stratton", name: "Stratton", voltage: "33/11kV", equipmentCount: 24 },
  { id: "tale-lane", name: "Tale Lane PV", voltage: "132/33kV", equipmentCount: 24 },
  { id: "st-tudy-333", name: "St Tudy", voltage: "333/11kV", equipmentCount: 24 },
  { id: "st-catherines", name: "St Catherines", voltage: "33/11kV", equipmentCount: 12 },
  { id: "south-molton", name: "South Molton", voltage: "33/11kV", equipmentCount: 18 },
  { id: "plymouth", name: "Plymouth North", voltage: "132/33kV", equipmentCount: 30 },
  { id: "exeter", name: "Exeter East", voltage: "33/11kV", equipmentCount: 24 },
]

export const voltageLevelFilters = [
  { id: "132-66", label: "132kV / 66kV", color: "neutral" },
  { id: "33", label: "33kV", color: "green" },
  { id: "22-25", label: "22kV - 25kV", color: "yellow" },
  { id: "11", label: "11kV", color: "red" },
  { id: "6", label: "6kV - 6.6kV", color: "blue" },
  { id: "unknown", label: "Unknown", color: "brown" },
] as const
