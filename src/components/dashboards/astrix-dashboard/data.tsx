import type { ComponentType, SVGProps } from "react";
import {
  ClassificationIcon,
  ComplianceIcon,
  HomeIcon,
  IntegrationIcon,
  ReportsIcon,
  SettingsIcon,
} from "./components/astrix/icons";

export type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;

export type NavigationItem = {
  name: string;
  href: string;
  icon: SvgIcon;
  badge?: string;
};

export const currentUser = {
  name: "Vansh Patel",
  email: "vanshpatel@gmail.com",
  avatar: "https://api.dicebear.com/10.x/notionists/svg",
  initials: "VP",
} as const;

export const notifications = [
  {
    id: "classification-ready",
    title: "Classification complete",
    description: "23 products were classified and are ready for review.",
    time: "2 min ago",
  },
  {
    id: "hs-code-updated",
    title: "HS code updated",
    description: "HS 8471.30 was updated for your imported products.",
    time: "1 hour ago",
  },
  {
    id: "compliance-alert",
    title: "Compliance alert",
    description: "2 products need attention before export clearance.",
    time: "Yesterday",
  },
] as const;

export type MetricCard = {
  label: string;
  value: string;
  trend?: {
    value: string;
    label: string;
    tone: "positive" | "warning";
  };
  footnote?: string;
};

export type DateRange =
  | "today"
  | "last-7-days"
  | "last-30-days"
  | "last-90-days";

export const dateRangeOptions: { value: DateRange; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "last-7-days", label: "Last 7 Days" },
  { value: "last-30-days", label: "Last 30 Days" },
  { value: "last-90-days", label: "Last 90 Days" },
];

export const dashboardMetricsByRange: Record<DateRange, MetricCard[]> = {
  today: [
    {
      label: "Accuracy Rate",
      value: "99.4%",
      trend: { value: "+0.1%", label: "vs yesterday", tone: "positive" },
    },
    {
      label: "Total Processed",
      value: "18,204",
      trend: { value: "4.2%", label: "vs yesterday", tone: "positive" },
    },
    {
      label: "Pending Review",
      value: "23",
      trend: { value: "+3", label: "since 09:00", tone: "warning" },
    },
    {
      label: "Risk Score",
      value: "Low",
      footnote: "All frameworks healthy",
    },
  ],
  "last-7-days": [
    {
      label: "Accuracy Rate",
      value: "99.2%",
      trend: { value: "+0.3%", label: "this week", tone: "positive" },
    },
    {
      label: "Total Processed",
      value: "124,891",
      trend: { value: "12.5%", label: "vs yesterday", tone: "positive" },
    },
    {
      label: "Pending Review",
      value: "23",
      trend: { value: "+3", label: "since 09:00", tone: "warning" },
    },
    {
      label: "Risk Score",
      value: "Low",
      footnote: "All frameworks healthy",
    },
  ],
  "last-30-days": [
    {
      label: "Accuracy Rate",
      value: "98.8%",
      trend: { value: "+1.1%", label: "this month", tone: "positive" },
    },
    {
      label: "Total Processed",
      value: "512,346",
      trend: { value: "9.8%", label: "vs last month", tone: "positive" },
    },
    {
      label: "Pending Review",
      value: "61",
      trend: { value: "+12", label: "this month", tone: "warning" },
    },
    {
      label: "Risk Score",
      value: "Low",
      footnote: "All frameworks healthy",
    },
  ],
  "last-90-days": [
    {
      label: "Accuracy Rate",
      value: "98.1%",
      trend: { value: "+2.4%", label: "this quarter", tone: "positive" },
    },
    {
      label: "Total Processed",
      value: "1,486,022",
      trend: { value: "18.3%", label: "vs last quarter", tone: "positive" },
    },
    {
      label: "Pending Review",
      value: "148",
      trend: { value: "+37", label: "this quarter", tone: "warning" },
    },
    {
      label: "Risk Score",
      value: "Medium",
      footnote: "1 framework needs review",
    },
  ],
};

export type ClassificationStatus = "approved" | "needs-review" | "processing";

export type ClassificationRow = {
  id: string;
  product: string;
  hsCode: string;
  confidence: string;
  status: ClassificationStatus;
  submitted: string;
};

export const classificationStream: ClassificationRow[] = [
  {
    id: "CLS-2026-0847",
    product: "Wireless Bluetooth Headphones",
    hsCode: "8518.30.20",
    confidence: "97.2%",
    status: "approved",
    submitted: "Mar 19, 10:15 AM",
  },
  {
    id: "CLS-2026-0846",
    product: "Organic Cotton T-Shirts (Pack of 5)",
    hsCode: "6109.10.00",
    confidence: "97.2%",
    status: "needs-review",
    submitted: "Mar 19, 10:15 AM",
  },
  {
    id: "CLS-2026-0845",
    product: "Wireless Bluetooth Headphones",
    hsCode: "8518.30.20",
    confidence: "97.2%",
    status: "approved",
    submitted: "Mar 19, 10:15 AM",
  },
  {
    id: "CLS-2026-0844",
    product: "Wireless Bluetooth Headphones",
    hsCode: "8518.30.20",
    confidence: "97.2%",
    status: "needs-review",
    submitted: "Mar 19, 10:15 AM",
  },
];

const classificationProducts = [
  { product: "Wireless Bluetooth Headphones", hsCode: "8518.30.20" },
  { product: "Organic Cotton T-Shirts (Pack of 5)", hsCode: "6109.10.00" },
  { product: "Wireless Noise-Cancelling Headphones", hsCode: "8518.30.00" },
  { product: "Ergonomic Office Chair with Lumbar", hsCode: "9401.30.90" },
  { product: "Stainless Steel Water Bottle 750ml", hsCode: "7323.93.00" },
  { product: "LED Desk Lamp with USB Port", hsCode: "9405.21.00" },
  { product: "Ceramic Coffee Mug Set (4 pcs)", hsCode: "6912.00.00" },
  { product: "Portable Power Bank 20000mAh", hsCode: "8507.60.00" },
  { product: "Yoga Mat Non-Slip Extra Thick", hsCode: "4016.91.00" },
  { product: "Mechanical Keyboard RGB", hsCode: "8471.60.70" },
  { product: "Bamboo Cutting Board Set", hsCode: "4419.11.00" },
  { product: "Insulated Lunch Box Stainless", hsCode: "7323.93.00" },
  { product: "Running Shoes Lightweight", hsCode: "6404.11.00" },
  { product: "Smartwatch Fitness Tracker", hsCode: "9102.12.80" },
  { product: "Cast Iron Skillet 12 Inch", hsCode: "7323.91.00" },
  { product: "Wireless Charging Pad", hsCode: "8504.40.95" },
  { product: "Denim Jacket Unisex", hsCode: "6201.92.00" },
  { product: "Glass Food Storage Containers", hsCode: "7013.49.20" },
  { product: "Electric Toothbrush Sonic", hsCode: "8509.80.00" },
  { product: "Wool Blend Throw Blanket", hsCode: "6301.20.00" },
  { product: "Laptop Stand Aluminum", hsCode: "7616.99.90" },
  { product: "Resistance Bands Set", hsCode: "4016.99.00" },
  { product: "Essential Oil Diffuser", hsCode: "8516.79.00" },
  { product: "Canvas Tote Bag Large", hsCode: "4202.92.00" },
  { product: "USB-C Hub Multiport", hsCode: "8471.80.10" },
  { product: "Memory Foam Pillow", hsCode: "9404.90.10" },
  { product: "Stainless Steel Cookware Set", hsCode: "7323.93.00" },
  { product: "Bluetooth Speaker Portable", hsCode: "8518.21.00" },
  { product: "Hiking Backpack 40L", hsCode: "4202.92.91" },
  { product: "LED Strip Lights 5m", hsCode: "9405.42.00" },
] as const;

const classificationStatuses: ClassificationStatus[] = [
  "approved",
  "needs-review",
  "processing",
  "approved",
  "approved",
  "needs-review",
];

function seededUnit(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function formatSubmitted(daysAgo: number, hour: number, minute: number) {
  const date = new Date(2026, 3, 5);
  date.setDate(date.getDate() - daysAgo);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const hour12 = hour % 12 || 12;
  const suffix = hour < 12 ? "AM" : "PM";
  const paddedMinute = String(minute).padStart(2, "0");
  return `${months[date.getMonth()]} ${date.getDate()}, ${hour12}:${paddedMinute} ${suffix}`;
}

function buildClassificationQueue(count: number): ClassificationRow[] {
  return Array.from({ length: count }, (_, index) => {
    const product =
      classificationProducts[index % classificationProducts.length];
    const status =
      classificationStatuses[
        Math.floor(seededUnit(index + 1) * classificationStatuses.length)
      ];
    const confidence = (82 + seededUnit(index + 17) * 17).toFixed(1);
    const daysAgo = Math.floor(seededUnit(index + 41) * 45);
    const hour = 8 + Math.floor(seededUnit(index + 73) * 10);
    const minute = Math.floor(seededUnit(index + 99) * 60);
    const idNumber = 9000 - index;

    return {
      id: `CLS-2026-${String(idNumber).padStart(4, "0")}`,
      product: product.product,
      hsCode: product.hsCode,
      confidence: `${confidence}%`,
      status,
      submitted: formatSubmitted(daysAgo, hour, minute),
    };
  });
}

export const classificationQueue: ClassificationRow[] =
  buildClassificationQueue(56);

export type ReportStatus = "completed" | "processing";

export type ReportType =
  | "cf-28"
  | "cf-29"
  | "classification-audit"
  | "compliance-summary";

export type ReportTypeOption = {
  id: ReportType;
  title: string;
  description: string;
  typeLabel: string;
};

export type GeneratedReport = {
  id: string;
  name: string;
  type: ReportType;
  typeLabel: string;
  status: ReportStatus;
  generated: string;
};

export const reportTypes: ReportTypeOption[] = [
  {
    id: "cf-28",
    title: "CF-28 Customs Declaration",
    description: "Monthly customs declaration report for imported goods",
    typeLabel: "CF-28",
  },
  {
    id: "cf-29",
    title: "CF-29 Duty Drawback",
    description: "Duty drawback claims and refund documentation",
    typeLabel: "CF-29",
  },
  {
    id: "classification-audit",
    title: "Classification Audit Log",
    description: "Comprehensive audit trail of all classification activities",
    typeLabel: "Classification Report",
  },
  {
    id: "compliance-summary",
    title: "Compliance Summary",
    description: "Quarterly compliance status and regulatory adherence report",
    typeLabel: "Compliance Summary",
  },
];

export const generatedReports: GeneratedReport[] = [
  {
    id: "RPT-2026-0312",
    name: "March 2026 Customs Declaration Report (CF-28)",
    type: "cf-28",
    typeLabel: "CF-28",
    status: "completed",
    generated: "Apr 02, 02:30 PM",
  },
  {
    id: "RPT-2026-0311",
    name: "March 2026 Customs Declaration Report (CF-28)",
    type: "compliance-summary",
    typeLabel: "Compliance Summary",
    status: "completed",
    generated: "Apr 01, 09:00 AM",
  },
  {
    id: "RPT-2026-0308",
    name: "February 2026 Duty Drawback Report (CF-29)",
    type: "cf-29",
    typeLabel: "CF-29",
    status: "processing",
    generated: "Mar 28, 04:45 PM",
  },
  {
    id: "RPT-2026-0302",
    name: "January 2026 HS Code Classification Report",
    type: "classification-audit",
    typeLabel: "Classification Report",
    status: "completed",
    generated: "Mar 22, 11:20 AM",
  },
];

export const workspaceNavigation: NavigationItem[] = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  {
    name: "Classification",
    href: "/classification",
    icon: ClassificationIcon,
    badge: String(classificationQueue.length),
  },
  { name: "Reports", href: "/reports", icon: ReportsIcon },
  { name: "Integration", href: "/integration", icon: IntegrationIcon },
  { name: "Compliance", href: "/compliance", icon: ComplianceIcon },
  { name: "Settings", href: "/settings", icon: SettingsIcon },
];
