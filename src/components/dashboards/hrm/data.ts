import {
  Users,
  CheckCircle,
  Briefcase,
  LogIn,
  Clock,
} from "lucide-react";
import { type ChartConfig } from "./components/ui/chart";

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  joinDate: string;
  status: "Active" | "On Leave" | "Absent";
  avatar: string;
}

export const employees: Employee[] = [
  {
    id: "#001",
    name: "John Doe",
    email: "john@example.com",
    department: "Engineering",
    position: "Senior Developer",
    joinDate: "02 Jan, 2026",
    status: "Active",
    avatar: "JD",
  },
  {
    id: "#002",
    name: "Mike Johnson",
    email: "mike@example.com",
    department: "Marketing",
    position: "Marketing Manager",
    joinDate: "04 Jan, 2026",
    status: "Active",
    avatar: "MJ",
  },
  {
    id: "#003",
    name: "David Kim",
    email: "david@example.com",
    department: "Finance",
    position: "Accountant",
    joinDate: "02 Feb, 2026",
    status: "On Leave",
    avatar: "DK",
  },
  {
    id: "#004",
    name: "Alex Turner",
    email: "alexr@example.com",
    department: "HR",
    position: "HR Specialist",
    joinDate: "08 Feb, 2026",
    status: "Active",
    avatar: "AT",
  },
  {
    id: "#005",
    name: "Ryan Pate",
    email: "ryan@example.com",
    department: "Engineering",
    position: "Frontend Developer",
    joinDate: "10 Feb, 2026",
    status: "Absent",
    avatar: "RP",
  },
  {
    id: "#006",
    name: "Mason Reed",
    email: "mason@example.com",
    department: "Sales",
    position: "Sales Representative",
    joinDate: "31 Dec, 2025",
    status: "Active",
    avatar: "MR",
  },
  {
    id: "#007",
    name: "James Smith",
    email: "james@example.com",
    department: "Sales",
    position: "Sales Representative",
    joinDate: "31 Dec, 2025",
    status: "On Leave",
    avatar: "JS",
  },
  {
    id: "#008",
    name: "Emily Johnson",
    email: "emily@example.com",
    department: "Operations",
    position: "Sales Representative",
    joinDate: "25 Nov, 2025",
    status: "Active",
    avatar: "EJ",
  },
  {
    id: "#009",
    name: "Michael Williams",
    email: "michael@example.com",
    department: "Engineering",
    position: "Data Analyst",
    joinDate: "24 Nov, 2025",
    status: "On Leave",
    avatar: "MW",
  },
  {
    id: "#010",
    name: "Sarah Brown",
    email: "sarah@example.com",
    department: "Operations",
    position: "SaaS Product Designer",
    joinDate: "20 Nov, 2025",
    status: "Active",
    avatar: "SB",
  },
  {
    id: "#011",
    name: "David Jones",
    email: "jones@example.com",
    department: "Product",
    position: "Software Developer",
    joinDate: "02 Nov, 2025",
    status: "On Leave",
    avatar: "DJ",
  },
  {
    id: "#012",
    name: "Jessica Garcia",
    email: "garcia@example.com",
    department: "Product",
    position: "UI/UX Designer",
    joinDate: "12 Oct, 2025",
    status: "Active",
    avatar: "JG",
  },
];

export const dashboardCards = [
  {
    id: 1,
    title: "TOTAL EMPLOYEES",
    value: "230",
    subtitle: "This month",
    icon: Users,
    bgColor: "bg-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    id: 2,
    title: "ATTENDANCE TODAY",
    value: "78%",
    subtitle: "228 / 248",
    icon: CheckCircle,
    bgColor: "bg-green-500/20",
    iconColor: "text-green-400",
  },
  {
    id: 3,
    title: "TOTAL PROJECT",
    value: "120",
    subtitle: "This month",
    icon: Briefcase,
    bgColor: "bg-purple-500/20",
    iconColor: "text-purple-400",
  },
  {
    id: 4,
    title: "OPEN POSITIONS",
    value: "18",
    subtitle: "5+ Urgent",
    icon: LogIn,
    bgColor: "bg-yellow-500/20",
    iconColor: "text-yellow-400",
  },
  {
    id: 5,
    title: "PENDING APPROVALS",
    value: "14",
    subtitle: "6 Leaves",
    icon: Clock,
    bgColor: "bg-red-500/20",
    iconColor: "text-red-400",
  },
];

export const attendanceData = [
  { day: "Monday", attendance: 65, lateArrival: 45 },
  { day: "Tuesday", attendance: 72, lateArrival: 38 },
  { day: "Wednesday", attendance: 68, lateArrival: 42 },
  { day: "Thursday", attendance: 78, lateArrival: 55 },
  { day: "Friday", attendance: 55, lateArrival: 48 },
  { day: "Saturday", attendance: 48, lateArrival: 35 },
  { day: "Sunday", attendance: 52, lateArrival: 40 },
];

export const attendanceChartConfig = {
  attendance: {
    label: "Attendance",
    color: "hsl(0, 0%, 100%)",
  },
  lateArrival: {
    label: "Late arrival",
    color: "hsl(0, 0%, 40%)",
  },
} satisfies ChartConfig;

export const workingFormatData = {
  total: 230,
  onSite: { percentage: 46.8, color: "#3b82f6" },
  hybrid: { percentage: 26.8, color: "#a855f7" },
  remote: { percentage: 26.4, color: "#06b6d4" },
};

export const jobOverviewData = [
  { name: "Active Jobs", value: 40, fill: "#f59e0b" },
  { name: "Interview", value: 20, fill: "#3b82f6" },
  { name: "Remaining", value: 10, fill: "#374151" },
];

export const jobChartConfig = {
  activeJobs: {
    label: "Active Jobs",
    color: "#f59e0b",
  },
  interview: {
    label: "Interview",
    color: "#3b82f6",
  },
} satisfies ChartConfig;

export const totalJobs = 70;
