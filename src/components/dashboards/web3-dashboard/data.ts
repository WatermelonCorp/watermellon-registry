import {
  ArrowDown,
  ArrowUpRight,
  Bell,
  ChartNoAxesColumn,
  CircleGauge,
  Coins,
  FileClock,
  Grid2X2,
  LockKeyhole,
  Repeat2,
  Settings,
  User,
  WalletCards,
} from "lucide-react";

export const navSections = [
  {
    title: "Main",
    items: [
      { label: "Overview", icon: Grid2X2, active: true },
      { label: "Swap / LP", icon: Repeat2 },
      { label: "Global Markets", icon: CircleGauge },
      { label: "Staking", icon: ArrowDown },
      { label: "Vaults", icon: LockKeyhole },
      { label: "Leaderboard", icon: ChartNoAxesColumn },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Changelog", icon: User },
      { label: "Report", icon: FileClock },
    ],
  },
];

export const utilityItems = [
  { label: "Notifications", icon: Bell },
  { label: "Settings", icon: Settings },
];

export const stats = [
  {
    label: "Net Worth",
    value: "$86,265",
    detail: "+12.4%",
    icon: WalletCards,
    tone: "bg-lime-400",
  },
  {
    label: "Total Supplied",
    value: "$49,654",
    detail: "Across 5 assets",
    icon: Coins,
    tone: "bg-emerald-400",
  },
  {
    label: "Total Borrowed",
    value: "$18,920",
    detail: "3 open positions",
    icon: ArrowDown,
    tone: "bg-orange-400",
  },
  {
    label: "Net APY",
    value: "+8.75%",
    detail: "",
    icon: ArrowUpRight,
    tone: "bg-sky-400",
    compactChart: true,
  },
];

export const portfolioDataRanges = {
  "1D": [
    { time: "10:00", value: 250000 },
    { time: "11:00", value: 252000 },
    { time: "12:00", value: 248000 },
    { time: "13:00", value: 255000 },
    { time: "14:00", value: 258000 },
    { time: "15:00", value: 260000 },
  ],
  "7D": [
    { time: "Mon", value: 240000 },
    { time: "Tue", value: 245000 },
    { time: "Wed", value: 235000 },
    { time: "Thu", value: 250000 },
    { time: "Fri", value: 255000 },
    { time: "Sat", value: 258000 },
    { time: "Sun", value: 260000 },
  ],
  "1M": [
    { time: "Week 1", value: 210000 },
    { time: "Week 2", value: 230000 },
    { time: "Week 3", value: 245000 },
    { time: "Week 4", value: 260000 },
  ],
  All: [
    { time: "Jan", value: 22000 },
    { time: "Feb", value: 52000 },
    { time: "Mar", value: 76000 },
    { time: "Apr", value: 76000 },
    { time: "May", value: 76000 },
    { time: "Jun", value: 66000 },
    { time: "Jul", value: 59000 },
    { time: "Aug", value: 91000 },
    { time: "Sep", value: 127000 },
    { time: "Oct", value: 196000 },
    { time: "Nov", value: 217000 },
    { time: "Now", value: 260000 },
  ],
};

export const apyData = [
  { month: "Oct", value: 5.8 },
  { month: "Nov", value: 6.6 },
  { month: "Dec", value: 6.2 },
  { month: "Jan", value: 6.4 },
  { month: "Feb", value: 6.9 },
  { month: "Mar", value: 7.6 },
  { month: "Apr", value: 7.8 },
];

export const markets = [
  { name: "Bitcoin", symbol: "BTC", change: "4.50%", color: "bg-orange-400" },
  { name: "Ethereum", symbol: "ETH", change: "3.20%", color: "bg-sky-300" },
  { name: "Ripple", symbol: "XRP", change: "2.85%", color: "bg-blue-500" },
  { name: "Litecoin", symbol: "LTC", change: "1.75%", color: "bg-blue-800" },
  { name: "Cardano", symbol: "ADA", change: "2.10%", color: "bg-red-500" },
  { name: "Dogecoin", symbol: "DOGE", change: "2.10%", color: "bg-red-800" },
];

export const netWorthAssets = [
  { asset: "BTC", balance: "2.4K", value: "$8,000", color: "bg-orange-400" },
  { asset: "ETH", balance: "2.4K", value: "$2,500", color: "bg-slate-100" },
  { asset: "USDC", balance: "13.5K", value: "$13,500", color: "bg-blue-500" },
  { asset: "LTC", balance: "8.9K", value: "$8,000", color: "bg-orange-400" },
];

export const borrowedAssets = [
  { asset: "USDC", balance: "$2,400", value: "4.50%", color: "bg-blue-500" },
  { asset: "ETH", balance: "$8,000", value: "4.50%", color: "bg-slate-100" },
  { asset: "BTC", balance: "$6,500", value: "18.6%", color: "bg-orange-400" },
  { asset: "LTC", balance: "$300", value: "12.7%", color: "bg-orange-400" },
];
