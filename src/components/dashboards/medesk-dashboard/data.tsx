import type { ComponentType, SVGProps } from "react";
import {
  BedIcon,
  Building2Icon,
  FlaskConicalIcon,
  PillIcon,
} from "lucide-react";
const staffHarrison =
  "https://assets.watermelon.sh/components/doc-harrison-profile-picture.png";
const staffJefferson =
  "https://assets.watermelon.sh/components/doc-jeff-profile-picture.png";
const staffPatel =
  "https://assets.watermelon.sh/components/doc-anjali-profile-picture.png";
import * as Icons from "./components/medesk/icons";

export type NavIcon = ComponentType<SVGProps<SVGSVGElement>>;

export type NavigationItem = {
  name: string;
  href: string;
  icon: NavIcon;
  badge?: string;
};

export type NavigationGroup = {
  label: string;
  collapsible?: boolean;
  items: NavigationItem[];
};

export const navigationGroups: NavigationGroup[] = [
  {
    label: "Overview",
    collapsible: false,
    items: [{ name: "Dashboard", href: "/", icon: Icons.HomeIcon }],
  },
  {
    label: "Operations",
    collapsible: true,
    items: [
      {
        name: "Appointment",
        href: "/appointment",
        icon: Icons.CalendarCheckIcon,
      },
      { name: "Staff", href: "/staff", icon: Icons.IdentificationBadgeIcon },
      { name: "Departments", href: "/departments", icon: Icons.HospitalIcon },
      { name: "Resources", href: "/resources", icon: Icons.StackIcon },
    ],
  },
  {
    label: "Insights",
    collapsible: true,
    items: [
      { name: "Analytics", href: "/analytics", icon: Icons.ChartBarIcon },
      { name: "Reports", href: "/reports", icon: Icons.FileIcon },
      { name: "Trends", href: "/trends", icon: Icons.TrendUpIcon },
    ],
  },
  {
    label: "Assistant",
    collapsible: true,
    items: [
      { name: "AI Assistant", href: "/ai-assistant", icon: Icons.SparkleIcon },
      {
        name: "Smart Queries",
        href: "/smart-queries",
        icon: Icons.SpinnerIcon,
      },
    ],
  },
  {
    label: "Admin",
    collapsible: true,
    items: [
      { name: "Settings", href: "/settings", icon: Icons.GearIcon },
      {
        name: "Integrations",
        href: "/integrations",
        icon: Icons.PlugsConnectedIcon,
      },
      {
        name: "Permissions",
        href: "/permissions",
        icon: Icons.ShieldCheckIcon,
      },
    ],
  },
];

export const currentUser = {
  name: "Reyes Patel",
  email: "reyes@medesk.example",
  initials: "RP",
  avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=Reyes%20Patel`,
};

export const notifications = [
  {
    id: "exception-spike",
    title: "Exception volume spike",
    description: "3,154 open exceptions need review this week.",
    time: "2 min ago",
  },
  {
    id: "audit-complete",
    title: "Audit run completed",
    description: "Controls audit finished with 12 flagged items.",
    time: "1 hour ago",
  },
  {
    id: "integration-sync",
    title: "Integration synced",
    description: "ERP connector finished its latest sync.",
    time: "Yesterday",
  },
] as const;

export type SourceKind = "oracle" | "sharepoint" | "concur" | "email";

export type BatchStatus = "processing" | "completed" | "exception";

export const metrics = [
  {
    id: "total-processed",
    label: "Total processed",
    value: "147,392",
    icon: "clock" as const,
    trend: { value: "+2.4%", label: "vs last run", tone: "up" as const },
  },
  {
    id: "matched",
    label: "Matched",
    value: "12,847",
    icon: "seal" as const,
    trend: { value: "+97.86%", label: "match rate" },
  },
  {
    id: "exceptions",
    label: "Exceptions",
    value: "12,847",
    icon: "warning" as const,
    trend: { value: "2.14%", label: "exception rate" },
  },
  {
    id: "processing",
    label: "Processing",
    value: "12,847",
    icon: "arrows" as const,
    trend: { value: "Live", label: "in queue", tone: "live" as const },
  },
] as const;

export const batchTransactions = [
  {
    id: "1",
    status: "processing" as BatchStatus,
    transactionId: "TXN-84921",
    po: "PO-6952",
    vendor: "Accenture LTD",
    amount: "$42,200.00",
    sources: ["oracle", "sharepoint"] as SourceKind[],
    confidence: 72,
  },
  {
    id: "2",
    status: "processing" as BatchStatus,
    transactionId: "TXN-84921",
    po: "PO-6952",
    vendor: "Accenture LTD",
    amount: "$42,200.00",
    sources: ["oracle", "concur"] as SourceKind[],
    confidence: 58,
  },
  {
    id: "3",
    status: "completed" as BatchStatus,
    transactionId: "TXN-84921",
    po: "PO-6952",
    vendor: "Accenture LTD",
    amount: "$42,200.00",
    sources: ["oracle", "concur", "email"] as SourceKind[],
    confidence: 99,
  },
  {
    id: "4",
    status: "processing" as BatchStatus,
    transactionId: "TXN-84921",
    po: "PO-6952",
    vendor: "Accenture LTD",
    amount: "$42,200.00",
    sources: ["oracle", "concur"] as SourceKind[],
    confidence: 58,
  },
  {
    id: "5",
    status: "processing" as BatchStatus,
    transactionId: "TXN-84921",
    po: "PO-6952",
    vendor: "Accenture LTD",
    amount: "$42,200.00",
    sources: ["oracle", "concur"] as SourceKind[],
    confidence: 58,
  },
  {
    id: "6",
    status: "exception" as BatchStatus,
    transactionId: "TXN-84921",
    po: "PO-6952",
    vendor: "Accenture LTD",
    amount: "$42,200.00",
    sources: ["oracle", "email", "concur"] as SourceKind[],
    confidence: 34,
    confidenceNote: "Amount Variance",
  },
  {
    id: "7",
    status: "completed" as BatchStatus,
    transactionId: "TXN-84921",
    po: "PO-6952",
    vendor: "Accenture LTD",
    amount: "$42,200.00",
    sources: ["oracle", "concur"] as SourceKind[],
    confidence: 97,
  },
] as const;

export const sourceLabels: Record<SourceKind, string> = {
  oracle: "Oracle ERP",
  sharepoint: "Sharepoint",
  concur: "Concur",
  email: "Email",
};

export const batchStatusFilters = [
  { value: "all", label: "All statuses", icon: Icons.FadersHorizontalIcon },
  { value: "processing", label: "Processing", icon: Icons.SpinnerGapIcon },
  { value: "completed", label: "Completed", icon: Icons.CheckCircleIcon },
  { value: "exception", label: "Exception", icon: Icons.StatusWarningIcon },
] as const;

export type BatchTransaction = (typeof batchTransactions)[number];

export type MatchLineStatus = "matched" | "mismatched" | "partial";

export type TransactionDetails = {
  customer: string;
  batchId: string;
  date: string;
  flagged: boolean;
  purchaseOrder: {
    status: MatchLineStatus;
    amount: string;
    reference: string;
    source: string;
  };
  invoice: {
    status: MatchLineStatus;
    amount: string;
    reference: string;
    deltaVsPo: string;
  };
  goodsReceipt: {
    status: MatchLineStatus;
    amount: string;
    reference: string;
    fulfillment: string;
  };
  timeline: { title: string; parts: string[] }[];
};

export function getTransactionDetails(
  row: BatchTransaction,
): TransactionDetails {
  const isException = row.status === "exception";
  const isComplete = row.status === "completed";

  return {
    customer: "Consulting Corp",
    batchId: "BAT-2026-0407",
    date: "Apr 7, 2026",
    flagged: isException,
    purchaseOrder: {
      status: "matched",
      amount: isException ? "$417,301.00" : row.amount,
      reference: row.po.startsWith("PO")
        ? `PO-2026-${row.po.replace(/\D/g, "")}`
        : row.po,
      source: sourceLabels[row.sources[0] ?? "oracle"],
    },
    invoice: {
      status: isException ? "mismatched" : isComplete ? "matched" : "partial",
      amount: row.amount,
      reference: `INV-CC-${row.id.padStart(4, "0")}`,
      deltaVsPo: isException ? "+$12,450" : isComplete ? "$0.00" : "+$420.00",
    },
    goodsReceipt: {
      status: isException ? "partial" : isComplete ? "matched" : "partial",
      amount: isException ? "$394,100.00" : row.amount,
      reference: `GR-0407-${row.id.padStart(3, "0")}`,
      fulfillment: isException ? "91.7%" : isComplete ? "100%" : "86.4%",
    },
    timeline: [
      ...(isException
        ? [
            {
              title: "Flagged as exception",
              parts: [
                "Audit AI",
                "Audit AI",
                `Confidence dropped to ${row.confidence}%`,
              ],
            },
          ]
        : []),
      {
        title: "Viewed by J. Hartwell",
        parts: ["Manual review", "Today 11:38 AM"],
      },
      {
        title: "Three-way match processed",
        parts: ["Manual review", "Today 11:38 AM"],
      },
      {
        title: isException ? "Flagged as exception" : "Match checks completed",
        parts: ["Automated", "Today 11:34 AM", "PO, Invoice, GR ingested"],
      },
      {
        title: "Transaction Submitted",
        parts: ["Oracle ERP sync", "Today 11:30 AM", "BAT-2026-0407"],
      },
    ],
  };
}

export type BatchStatusFilter = (typeof batchStatusFilters)[number]["value"];

export const auditControls = {
  defaultLive: true,
} as const;

export const dashboardMetrics = [
  {
    label: "Today's appointments",
    value: "48",
    suffix: undefined,
    trend: "6 more than yesterday",
    color: "bg-[var(--dashboard-scheduled)]",
    trendColor: "text-[var(--dashboard-completed)]",
    lastSixDays: [18, 31, 48, 39, 44, 32],
  },
  {
    label: "Avg. wait time",
    value: "14",
    suffix: "min",
    trend: "3min above target",
    color: "bg-[var(--dashboard-no-show)]",
    trendColor: "text-[var(--dashboard-no-show)]",
    lastSixDays: [5, 11, 18, 14, 16, 12],
  },
  {
    label: "Bed occupancy",
    value: "82",
    suffix: "%",
    trend: "+2.4% vs last run",
    color: "bg-[var(--dashboard-completed)]",
    trendColor: "text-[var(--dashboard-completed)]",
    lastSixDays: [36, 54, 79, 67, 73, 58],
  },
  {
    label: "Patient satisfaction",
    value: "47",
    suffix: "/5",
    trend: "0.3pts this month",
    color: "bg-[var(--dashboard-secondary)]",
    trendColor: "text-[var(--dashboard-completed)]",
    lastSixDays: [14, 29, 45, 38, 41, 32],
  },
] as const;

export const dashboardAppointmentVolume = [
  { week: "Week 1", scheduled: 230, completed: 187, noShow: 13 },
  { week: "Week 2", scheduled: 196, completed: 162, noShow: 35 },
  { week: "Week 3", scheduled: 201, completed: 176, noShow: 10 },
  { week: "Week 4", scheduled: 224, completed: 154, noShow: 37 },
] as const;

export const dashboardAppointmentStats = [
  ["1024", "Total this month"],
  ["91%", "Completion rate"],
  ["47", "No - shows"],
] as const;

export const dashboardDepartmentLoad = [
  {
    label: "General",
    value: 38,
    percent: "39.2%",
    progress: 39.2,
    color: "bg-[var(--dashboard-scheduled)]",
  },
  {
    label: "Cardiology",
    value: 22,
    percent: "22.7%",
    progress: 22.7,
    color: "bg-[var(--dashboard-secondary)]",
  },
  {
    label: "Paediatrics",
    value: 17,
    percent: "17.5%",
    progress: 17.5,
    color: "bg-[var(--dashboard-completed)]",
  },
  {
    label: "Orthopaedics",
    value: 11,
    percent: "11.3%",
    progress: 11.3,
    color: "bg-[var(--dashboard-no-show)]",
  },
  {
    label: "Obs/Gynae",
    value: 9,
    percent: "9.3%",
    progress: 9.3,
    color: "bg-destructive",
  },
] as const;

export type DashboardAppointmentStatus =
  | "In progress"
  | "Waiting"
  | "Confirmed"
  | "Done";

export type DashboardAppointment = {
  time: string;
  patient: string;
  type: string;
  doctor: string;
  status: DashboardAppointmentStatus;
};

export const dashboardAppointments: readonly DashboardAppointment[] = [
  {
    time: "10:30",
    patient: "Fatima Ali",
    type: "Oncology",
    doctor: "Dr. Johnson",
    status: "In progress" as DashboardAppointmentStatus,
  },
  {
    time: "11:00",
    patient: "Oliver Wright",
    type: "General",
    doctor: "Dr. Thompson",
    status: "Waiting" as DashboardAppointmentStatus,
  },
  {
    time: "11:30",
    patient: "Sophia Patel",
    type: "Neurology",
    doctor: "Dr. Garcia",
    status: "Confirmed" as DashboardAppointmentStatus,
  },
  {
    time: "12:00",
    patient: "Ethan Lee",
    type: "Orthopedics",
    doctor: "Dr. Davis",
    status: "Confirmed" as DashboardAppointmentStatus,
  },
  {
    time: "12:30",
    patient: "Isabella Kim",
    type: "General",
    doctor: "Dr. Martinez",
    status: "Confirmed" as DashboardAppointmentStatus,
  },
  {
    time: "13:00",
    patient: "Liam Nguyen",
    type: "Endocrinology",
    doctor: "Dr. Brown",
    status: "Done" as DashboardAppointmentStatus,
  },
  {
    time: "13:30",
    patient: "Ava Johnson",
    type: "Pediatric",
    doctor: "Dr. Wilson",
    status: "Confirmed" as DashboardAppointmentStatus,
  },
  {
    time: "14:00",
    patient: "Noah Smith",
    type: "Urology",
    doctor: "Dr. Taylor",
    status: "Done" as DashboardAppointmentStatus,
  },
  {
    time: "08:30",
    patient: "Kiana Bergson",
    type: "General",
    doctor: "Dr. Mensah",
    status: "Done" as DashboardAppointmentStatus,
  },
] as const;

export const dashboardAppointmentStatusFilters = [
  { value: "all", label: "All statuses" },
  { value: "In progress", label: "In progress" },
  { value: "Waiting", label: "Waiting" },
  { value: "Confirmed", label: "Confirmed" },
  { value: "Done", label: "Done" },
] as const;

export type DashboardAppointmentStatusFilter =
  (typeof dashboardAppointmentStatusFilters)[number]["value"];

export function filterDashboardAppointments(
  appointments: readonly DashboardAppointment[],
  statusFilter: DashboardAppointmentStatusFilter,
) {
  if (statusFilter === "all") return [...appointments];
  return appointments.filter(
    (appointment) => appointment.status === statusFilter,
  );
}

export const dashboardStaffPerformance = [
  {
    name: "Dr. Harrison",
    role: "Cardiologist",
    points: 18,
    rating: "94%",
    avatar: staffHarrison,
  },
  {
    name: "Dr. Patel",
    role: "Cardiologist",
    points: 22,
    rating: "88%",
    avatar: staffPatel,
  },
  {
    name: "Dr. Jefferson",
    role: "Cardiologist",
    points: 14,
    rating: "91%",
    avatar: staffJefferson,
  },
] as const;

export const staffDetails = {
  "Dr. Harrison": {
    specialty: "Senior Cardiologist",
    department: "Cardiology",
    location: "MedCore Clinic",
    status: "On Duty",
    ward: "Ward 3B",
    metrics: [
      { label: "Patients seen", value: "18", trend: "3 vs avg." },
      { label: "Satisfaction", value: "94%", trend: "2% this week" },
      { label: "Avg. consult", value: "11 min", trend: "1 min target" },
    ],
    monthlyPerformance: {
      patientSeenLabel: "Patient Seen",
      targetLabel: "Target",
      target: 110,
      points: [
        { month: "Mar", patientsSeen: 48 },
        { month: "Apr", patientsSeen: 96 },
        { month: "May", patientsSeen: 72 },
        { month: "Jun", patientsSeen: 100 },
        { month: "Jul", patientsSeen: 146 },
        { month: "Aug", patientsSeen: 98 },
      ],
    },
    information: [
      ["Staff ID", "MC-2041"],
      ["Employment", "Full-time"],
      ["Joined", "Mar 12, 2019"],
      ["Contract End", "Dec 31, 2026"],
      ["Shift", "07:00 - 15:00"],
      ["Leave Balance", "14 Days"],
      ["Email", "a.harrison@medcore.ng"],
      ["Phone", "+1 903-4578-908"],
    ],
  },
  "Dr. Patel": {
    specialty: "Cardiologist",
    department: "Cardiology",
    location: "MedCore Clinic",
    status: "On Duty",
    ward: "Ward 2A",
    metrics: [
      { label: "Patients seen", value: "22", trend: "5 vs avg." },
      { label: "Satisfaction", value: "88%", trend: "1% this week" },
      { label: "Avg. consult", value: "13 min", trend: "2 min target" },
    ],
    monthlyPerformance: {
      patientSeenLabel: "Patient Seen",
      targetLabel: "Target",
      target: 120,
      points: [
        { month: "Mar", patientsSeen: 88 },
        { month: "Apr", patientsSeen: 116 },
        { month: "May", patientsSeen: 104 },
        { month: "Jun", patientsSeen: 136 },
        { month: "Jul", patientsSeen: 112 },
        { month: "Aug", patientsSeen: 156 },
      ],
    },
    information: [
      ["Staff ID", "MC-1928"],
      ["Employment", "Full-time"],
      ["Joined", "Jul 08, 2021"],
      ["Contract End", "Dec 31, 2026"],
      ["Shift", "09:00 - 17:00"],
      ["Leave Balance", "11 Days"],
      ["Email", "d.patel@medcore.ng"],
      ["Phone", "+1 903-4578-765"],
    ],
  },
  "Dr. Jefferson": {
    specialty: "Cardiologist",
    department: "Cardiology",
    location: "MedCore Clinic",
    status: "On Duty",
    ward: "Ward 3A",
    metrics: [
      { label: "Patients seen", value: "14", trend: "2 vs avg." },
      { label: "Satisfaction", value: "91%", trend: "3% this week" },
      { label: "Avg. consult", value: "12 min", trend: "1 min target" },
    ],
    monthlyPerformance: {
      patientSeenLabel: "Patient Seen",
      targetLabel: "Target",
      target: 80,
      points: [
        { month: "Mar", patientsSeen: 34 },
        { month: "Apr", patientsSeen: 58 },
        { month: "May", patientsSeen: 44 },
        { month: "Jun", patientsSeen: 76 },
        { month: "Jul", patientsSeen: 92 },
        { month: "Aug", patientsSeen: 68 },
      ],
    },
    information: [
      ["Staff ID", "MC-2156"],
      ["Employment", "Full-time"],
      ["Joined", "Nov 20, 2020"],
      ["Contract End", "Dec 31, 2026"],
      ["Shift", "08:00 - 16:00"],
      ["Leave Balance", "16 Days"],
      ["Email", "j.jefferson@medcore.ng"],
      ["Phone", "+1 903-4578-432"],
    ],
  },
} as const;

export const dashboardResources = [
  {
    label: "Beds",
    value: 82,
    unit: "Used",
    Icon: BedIcon,
    color: "bg-[var(--dashboard-scheduled)]",
  },
  {
    label: "Lab Equipment",
    value: 67,
    unit: "Active",
    Icon: FlaskConicalIcon,
    color: "bg-[var(--dashboard-completed)]",
  },
  {
    label: "Medication Stock",
    value: 91,
    unit: "Used",
    Icon: PillIcon,
    color: "bg-[var(--dashboard-secondary)]",
  },
  {
    label: "Consult Rooms",
    value: 75,
    unit: "Occupied",
    Icon: Building2Icon,
    color: "bg-[var(--dashboard-no-show)]",
  },
] as const;

export const dashboardTimelineRanges = [
  { value: "aug-2026", label: "Aug 1 - 14, 2026" },
  { value: "jul-2026", label: "Jul 1 - 31, 2026" },
  { value: "jun-2026", label: "Jun 1 - 30, 2026" },
  { value: "may-2026", label: "May 1 - 31, 2026" },
  { value: "apr-2026", label: "Apr 1 - 30, 2026" },
  { value: "mar-2026", label: "Mar 1 - 31, 2026" },
  { value: "feb-2026", label: "Feb 1 - 28, 2026" },
  { value: "jan-2026", label: "Jan 1 - 31, 2026" },
] as const;

export type DashboardTimelineRange =
  (typeof dashboardTimelineRanges)[number]["value"];

export const dashboardTimelineData = {
  "jan-2026": {
    metrics: dashboardMetrics,
    appointmentVolume: dashboardAppointmentVolume,
    appointmentStats: dashboardAppointmentStats,
    departmentLoad: dashboardDepartmentLoad,
    appointments: dashboardAppointments,
    staffPerformance: dashboardStaffPerformance,
    resources: dashboardResources,
  },
  "feb-2026": {
    metrics: dashboardMetrics,
    appointmentVolume: [
      { week: "Week 1", scheduled: 205, completed: 169, noShow: 22 },
      { week: "Week 2", scheduled: 224, completed: 186, noShow: 28 },
      { week: "Week 3", scheduled: 211, completed: 177, noShow: 19 },
      { week: "Week 4", scheduled: 238, completed: 192, noShow: 32 },
    ],
    appointmentStats: [
      ["984", "Total this month"],
      ["89%", "Completion rate"],
      ["51", "No - shows"],
    ],
    departmentLoad: dashboardDepartmentLoad,
    appointments: dashboardAppointments,
    staffPerformance: dashboardStaffPerformance,
    resources: dashboardResources,
  },
  "mar-2026": {
    metrics: dashboardMetrics,
    appointmentVolume: [
      { week: "Week 1", scheduled: 215, completed: 181, noShow: 19 },
      { week: "Week 2", scheduled: 233, completed: 194, noShow: 24 },
      { week: "Week 3", scheduled: 221, completed: 189, noShow: 17 },
      { week: "Week 4", scheduled: 241, completed: 203, noShow: 27 },
    ],
    appointmentStats: [
      ["1048", "Total this month"],
      ["91%", "Completion rate"],
      ["43", "No - shows"],
    ],
    departmentLoad: dashboardDepartmentLoad,
    appointments: dashboardAppointments,
    staffPerformance: dashboardStaffPerformance,
    resources: dashboardResources,
  },
  "apr-2026": {
    metrics: dashboardMetrics,
    appointmentVolume: dashboardAppointmentVolume,
    appointmentStats: dashboardAppointmentStats,
    departmentLoad: dashboardDepartmentLoad,
    appointments: dashboardAppointments,
    staffPerformance: dashboardStaffPerformance,
    resources: dashboardResources,
  },
  "may-2026": {
    metrics: [
      {
        label: "Today's appointments",
        value: "57",
        suffix: undefined,
        trend: "9 more than yesterday",
        color: "bg-[var(--dashboard-scheduled)]",
        trendColor: "text-[var(--dashboard-completed)]",
        lastSixDays: [22, 38, 57, 44, 51, 40],
      },
      {
        label: "Avg. wait time",
        value: "11",
        suffix: "min",
        trend: "2min below target",
        color: "bg-[var(--dashboard-no-show)]",
        trendColor: "text-[var(--dashboard-completed)]",
        lastSixDays: [6, 13, 19, 12, 16, 10],
      },
      {
        label: "Bed occupancy",
        value: "76",
        suffix: "%",
        trend: "-1.8% vs last run",
        color: "bg-[var(--dashboard-completed)]",
        trendColor: "text-[var(--dashboard-no-show)]",
        lastSixDays: [31, 48, 68, 76, 59, 66],
      },
      {
        label: "Patient satisfaction",
        value: "49",
        suffix: "/5",
        trend: "0.6pts this month",
        color: "bg-[var(--dashboard-secondary)]",
        trendColor: "text-[var(--dashboard-completed)]",
        lastSixDays: [17, 31, 49, 36, 44, 33],
      },
    ],
    appointmentVolume: [
      { week: "Week 1", scheduled: 218, completed: 201, noShow: 18 },
      { week: "Week 2", scheduled: 242, completed: 209, noShow: 21 },
      { week: "Week 3", scheduled: 226, completed: 193, noShow: 29 },
      { week: "Week 4", scheduled: 248, completed: 214, noShow: 16 },
    ],
    appointmentStats: [
      ["1098", "Total this month"],
      ["93%", "Completion rate"],
      ["38", "No - shows"],
    ],
    departmentLoad: [
      {
        label: "General",
        value: 44,
        percent: "37.9%",
        progress: 37.9,
        color: "bg-[var(--dashboard-scheduled)]",
      },
      {
        label: "Cardiology",
        value: 26,
        percent: "22.4%",
        progress: 22.4,
        color: "bg-[var(--dashboard-secondary)]",
      },
      {
        label: "Paediatrics",
        value: 21,
        percent: "18.1%",
        progress: 18.1,
        color: "bg-[var(--dashboard-completed)]",
      },
      {
        label: "Orthopaedics",
        value: 15,
        percent: "12.9%",
        progress: 12.9,
        color: "bg-[var(--dashboard-no-show)]",
      },
      {
        label: "Obs/Gynae",
        value: 10,
        percent: "8.6%",
        progress: 8.6,
        color: "bg-destructive",
      },
    ],
    appointments: [
      {
        time: "09:00",
        patient: "Maya Rodriguez",
        type: "Cardiology",
        doctor: "Dr. Patel",
        status: "Confirmed" as DashboardAppointmentStatus,
      },
      {
        time: "09:30",
        patient: "James Tan",
        type: "General",
        doctor: "Dr. Thompson",
        status: "Done" as DashboardAppointmentStatus,
      },
      {
        time: "10:00",
        patient: "Emma Davis",
        type: "Pediatric",
        doctor: "Dr. Wilson",
        status: "In progress" as DashboardAppointmentStatus,
      },
      {
        time: "10:30",
        patient: "Mason Brown",
        type: "Oncology",
        doctor: "Dr. Johnson",
        status: "Waiting" as DashboardAppointmentStatus,
      },
    ],
    staffPerformance: [
      {
        name: "Dr. Patel",
        role: "Cardiologist",
        points: 26,
        rating: "92%",
        avatar: staffPatel,
      },
      {
        name: "Dr. Harrison",
        role: "Cardiologist",
        points: 21,
        rating: "95%",
        avatar: staffHarrison,
      },
      {
        name: "Dr. Jefferson",
        role: "Cardiologist",
        points: 17,
        rating: "89%",
        avatar: staffJefferson,
      },
    ],
    resources: [
      {
        label: "Beds",
        value: 76,
        unit: "Used",
        Icon: BedIcon,
        color: "bg-[var(--dashboard-scheduled)]",
      },
      {
        label: "Lab Equipment",
        value: 72,
        unit: "Active",
        Icon: FlaskConicalIcon,
        color: "bg-[var(--dashboard-completed)]",
      },
      {
        label: "Medication Stock",
        value: 84,
        unit: "Used",
        Icon: PillIcon,
        color: "bg-[var(--dashboard-secondary)]",
      },
      {
        label: "Consult Rooms",
        value: 69,
        unit: "Occupied",
        Icon: Building2Icon,
        color: "bg-[var(--dashboard-no-show)]",
      },
    ],
  },
  "jun-2026": {
    metrics: [
      {
        label: "Today's appointments",
        value: "41",
        suffix: undefined,
        trend: "4 fewer than yesterday",
        color: "bg-[var(--dashboard-scheduled)]",
        trendColor: "text-[var(--dashboard-no-show)]",
        lastSixDays: [25, 41, 33, 47, 38, 29],
      },
      {
        label: "Avg. wait time",
        value: "17",
        suffix: "min",
        trend: "5min above target",
        color: "bg-[var(--dashboard-no-show)]",
        trendColor: "text-[var(--dashboard-no-show)]",
        lastSixDays: [8, 15, 21, 16, 18, 13],
      },
      {
        label: "Bed occupancy",
        value: "88",
        suffix: "%",
        trend: "+3.1% vs last run",
        color: "bg-[var(--dashboard-completed)]",
        trendColor: "text-[var(--dashboard-completed)]",
        lastSixDays: [41, 62, 88, 71, 79, 64],
      },
      {
        label: "Patient satisfaction",
        value: "46",
        suffix: "/5",
        trend: "-0.2pts this month",
        color: "bg-[var(--dashboard-secondary)]",
        trendColor: "text-[var(--dashboard-no-show)]",
        lastSixDays: [20, 34, 46, 39, 44, 30],
      },
    ],
    appointmentVolume: [
      { week: "Week 1", scheduled: 188, completed: 154, noShow: 31 },
      { week: "Week 2", scheduled: 207, completed: 168, noShow: 44 },
      { week: "Week 3", scheduled: 191, completed: 162, noShow: 26 },
      { week: "Week 4", scheduled: 214, completed: 171, noShow: 40 },
    ],
    appointmentStats: [
      ["932", "Total this month"],
      ["86%", "Completion rate"],
      ["61", "No - shows"],
    ],
    departmentLoad: [
      {
        label: "General",
        value: 31,
        percent: "33.3%",
        progress: 33.3,
        color: "bg-[var(--dashboard-scheduled)]",
      },
      {
        label: "Cardiology",
        value: 19,
        percent: "20.4%",
        progress: 20.4,
        color: "bg-[var(--dashboard-secondary)]",
      },
      {
        label: "Paediatrics",
        value: 16,
        percent: "17.2%",
        progress: 17.2,
        color: "bg-[var(--dashboard-completed)]",
      },
      {
        label: "Orthopaedics",
        value: 14,
        percent: "15.1%",
        progress: 15.1,
        color: "bg-[var(--dashboard-no-show)]",
      },
      {
        label: "Obs/Gynae",
        value: 13,
        percent: "14%",
        progress: 14,
        color: "bg-destructive",
      },
    ],
    appointments: [
      {
        time: "08:45",
        patient: "Lucas Papadopoulos",
        type: "General",
        doctor: "Dr. Kline",
        status: "Waiting" as DashboardAppointmentStatus,
      },
      {
        time: "09:15",
        patient: "Charlotte Wilson",
        type: "Neurology",
        doctor: "Dr. Harris",
        status: "Confirmed" as DashboardAppointmentStatus,
      },
      {
        time: "10:00",
        patient: "Amelia Martinez",
        type: "Surgical",
        doctor: "Dr. Rivera",
        status: "In progress" as DashboardAppointmentStatus,
      },
      {
        time: "10:30",
        patient: "Liam O'Sullivan",
        type: "General",
        doctor: "Dr. Patel",
        status: "Done" as DashboardAppointmentStatus,
      },
    ],
    staffPerformance: [
      {
        name: "Dr. Jefferson",
        role: "Cardiologist",
        points: 19,
        rating: "93%",
        avatar: staffJefferson,
      },
      {
        name: "Dr. Harrison",
        role: "Cardiologist",
        points: 16,
        rating: "90%",
        avatar: staffHarrison,
      },
      {
        name: "Dr. Patel",
        role: "Cardiologist",
        points: 15,
        rating: "87%",
        avatar: staffPatel,
      },
    ],
    resources: [
      {
        label: "Beds",
        value: 88,
        unit: "Used",
        Icon: BedIcon,
        color: "bg-[var(--dashboard-scheduled)]",
      },
      {
        label: "Lab Equipment",
        value: 61,
        unit: "Active",
        Icon: FlaskConicalIcon,
        color: "bg-[var(--dashboard-completed)]",
      },
      {
        label: "Medication Stock",
        value: 79,
        unit: "Used",
        Icon: PillIcon,
        color: "bg-[var(--dashboard-secondary)]",
      },
      {
        label: "Consult Rooms",
        value: 82,
        unit: "Occupied",
        Icon: Building2Icon,
        color: "bg-[var(--dashboard-no-show)]",
      },
    ],
  },
  "jul-2026": {
    metrics: dashboardMetrics,
    appointmentVolume: [
      { week: "Week 1", scheduled: 224, completed: 184, noShow: 23 },
      { week: "Week 2", scheduled: 229, completed: 191, noShow: 30 },
      { week: "Week 3", scheduled: 217, completed: 185, noShow: 18 },
      { week: "Week 4", scheduled: 235, completed: 197, noShow: 25 },
    ],
    appointmentStats: [
      ["1012", "Total this month"],
      ["90%", "Completion rate"],
      ["46", "No - shows"],
    ],
    departmentLoad: dashboardDepartmentLoad,
    appointments: dashboardAppointments,
    staffPerformance: dashboardStaffPerformance,
    resources: dashboardResources,
  },
  "aug-2026": {
    metrics: [
      {
        label: "Today's appointments",
        value: "52",
        suffix: undefined,
        trend: "7 more than yesterday",
        color: "bg-[var(--dashboard-scheduled)]",
        trendColor: "text-[var(--dashboard-completed)]",
        lastSixDays: [20, 34, 52, 40, 47, 35],
      },
      {
        label: "Avg. wait time",
        value: "13",
        suffix: "min",
        trend: "1min above target",
        color: "bg-[var(--dashboard-no-show)]",
        trendColor: "text-[var(--dashboard-no-show)]",
        lastSixDays: [7, 14, 20, 15, 18, 13],
      },
      {
        label: "Bed occupancy",
        value: "84",
        suffix: "%",
        trend: "+1.4% vs last run",
        color: "bg-[var(--dashboard-completed)]",
        trendColor: "text-[var(--dashboard-completed)]",
        lastSixDays: [38, 59, 84, 66, 75, 61],
      },
      {
        label: "Patient satisfaction",
        value: "48",
        suffix: "/5",
        trend: "0.4pts this month",
        color: "bg-[var(--dashboard-secondary)]",
        trendColor: "text-[var(--dashboard-completed)]",
        lastSixDays: [15, 27, 48, 35, 42, 30],
      },
    ],
    appointmentVolume: [
      { week: "Week 1", scheduled: 236, completed: 198, noShow: 17 },
      { week: "Week 2", scheduled: 228, completed: 188, noShow: 24 },
      { week: "Week 3", scheduled: 242, completed: 206, noShow: 13 },
      { week: "Week 4", scheduled: 218, completed: 179, noShow: 26 },
    ],
    appointmentStats: [
      ["1064", "Total this month"],
      ["92%", "Completion rate"],
      ["40", "No - shows"],
    ],
    departmentLoad: [
      {
        label: "General",
        value: 41,
        percent: "36.6%",
        progress: 36.6,
        color: "bg-[var(--dashboard-scheduled)]",
      },
      {
        label: "Cardiology",
        value: 24,
        percent: "21.4%",
        progress: 21.4,
        color: "bg-[var(--dashboard-secondary)]",
      },
      {
        label: "Paediatrics",
        value: 20,
        percent: "17.9%",
        progress: 17.9,
        color: "bg-[var(--dashboard-completed)]",
      },
      {
        label: "Orthopaedics",
        value: 15,
        percent: "13.4%",
        progress: 13.4,
        color: "bg-[var(--dashboard-no-show)]",
      },
      {
        label: "Obs/Gynae",
        value: 12,
        percent: "10.7%",
        progress: 10.7,
        color: "bg-destructive",
      },
    ],
    appointments: dashboardAppointments,
    staffPerformance: dashboardStaffPerformance,
    resources: [
      {
        label: "Beds",
        value: 84,
        unit: "Used",
        Icon: BedIcon,
        color: "bg-[var(--dashboard-scheduled)]",
      },
      {
        label: "Lab Equipment",
        value: 70,
        unit: "Active",
        Icon: FlaskConicalIcon,
        color: "bg-[var(--dashboard-completed)]",
      },
      {
        label: "Medication Stock",
        value: 88,
        unit: "Used",
        Icon: PillIcon,
        color: "bg-[var(--dashboard-secondary)]",
      },
      {
        label: "Consult Rooms",
        value: 77,
        unit: "Occupied",
        Icon: Building2Icon,
        color: "bg-[var(--dashboard-no-show)]",
      },
    ],
  },
} as const;

export function filterBatchTransactions(
  transactions: typeof batchTransactions,
  statusFilter: BatchStatusFilter,
) {
  if (statusFilter === "all") return [...transactions];
  return transactions.filter((row) => row.status === statusFilter);
}

export function buildBatchExportCsv(
  transactions: ReturnType<typeof filterBatchTransactions>,
) {
  const header = [
    "Status",
    "Transaction ID",
    "PO",
    "Vendor",
    "Amount",
    "Sources",
    "Confidence",
    "Note",
  ];

  const rows = transactions.map((row) => [
    row.status,
    row.transactionId,
    row.po,
    row.vendor,
    row.amount,
    row.sources.map((source) => sourceLabels[source]).join(" | "),
    `${row.confidence}%`,
    "confidenceNote" in row && row.confidenceNote ? row.confidenceNote : "",
  ]);

  return [header, ...rows]
    .map((cells) =>
      cells.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","),
    )
    .join("\n");
}
