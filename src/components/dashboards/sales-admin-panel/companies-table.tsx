"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Calendar, Plus } from "lucide-react";

const companiesData = [
  {
    id: 1,
    name: "LVMH",
    segments: ["Enterprise", "Upsell"],
    openDeals: 7,
    accountOwner: {
      name: "Sarah Nguyen",
      avatar:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    pipelineValue: 420000,
    winProbability: 70,
    lastInteraction: { date: "Feb 21", type: "QBR Call" },
  },
  {
    id: 2,
    name: "Disney",
    segments: ["Enterprise", "New Logo"],
    openDeals: 4,
    accountOwner: {
      name: "James Taylor",
      avatar:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    pipelineValue: 311242,
    winProbability: 51,
    lastInteraction: { date: "Feb 22", type: "Demo" },
  },
  {
    id: 3,
    name: "Paypal",
    segments: ["Enterprise"],
    openDeals: 5,
    accountOwner: {
      name: "Maria Keller",
      avatar:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    pipelineValue: 124232,
    winProbability: 22,
    lastInteraction: { date: "Mar 12", type: "Security" },
  },
  {
    id: 4,
    name: "United Airlines",
    segments: ["Renewal"],
    openDeals: 2,
    accountOwner: {
      name: "Nia Jameson",
      avatar:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    pipelineValue: 221231,
    winProbability: 77,
    lastInteraction: { date: "Mar 17", type: "Legal" },
  },
  {
    id: 5,
    name: "Apple",
    segments: ["Pilot"],
    openDeals: 6,
    accountOwner: {
      name: "Alex Santos",
      avatar:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    pipelineValue: 530111,
    winProbability: 82,
    lastInteraction: { date: "Mar 12", type: "Exec" },
  },
  {
    id: 6,
    name: "Microsoft",
    segments: ["Strategic", "Expansion"],
    openDeals: 8,
    accountOwner: {
      name: "Mark Darnalds",
      avatar:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    pipelineValue: 320222,
    winProbability: 86,
    lastInteraction: { date: "Mar 15", type: "Pilot" },
  },
  {
    id: 7,
    name: "Airbnb",
    segments: ["Upsell", "Expansion"],
    openDeals: 3,
    accountOwner: {
      name: "Drew Nash",
      avatar:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    pipelineValue: 122230,
    winProbability: 51,
    lastInteraction: { date: "Mar 18", type: "Pricing" },
  },
  {
    id: 8,
    name: "Google",
    segments: ["SMB", "Enterprise"],
    openDeals: 8,
    accountOwner: {
      name: "Kate Chen",
      avatar:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    pipelineValue: 112277,
    winProbability: 24,
    lastInteraction: { date: "Jun 7", type: "Renewal" },
  },
  {
    id: 9,
    name: "Netflix",
    segments: ["Mid-Market"],
    openDeals: 3,
    accountOwner: {
      name: "Ricky Brown",
      avatar:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    pipelineValue: 221221,
    winProbability: 72,
    lastInteraction: { date: "Jun 18", type: "Pilot" },
  },
  {
    id: 10,
    name: "Spotify",
    segments: ["Land & Expand"],
    openDeals: 5,
    accountOwner: {
      name: "Hannah Mills",
      avatar:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    pipelineValue: 170991,
    winProbability: 55,
    lastInteraction: { date: "Jul 1", type: "Expansion" },
  },
  {
    id: 11,
    name: "Shopify",
    segments: ["Co-Sell", "Expansion"],
    openDeals: 9,
    accountOwner: {
      name: "Emma Green",
      avatar:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    pipelineValue: 139007,
    winProbability: 45,
    lastInteraction: { date: "Jul 18", type: "Renewal" },
  },
  {
    id: 12,
    name: "Zoom",
    segments: ["Expansion"],
    openDeals: 8,
    accountOwner: {
      name: "Oliver Chan",
      avatar:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    pipelineValue: 289921,
    winProbability: 38,
    lastInteraction: { date: "Aug 8", type: "Partner" },
  },
  {
    id: 13,
    name: "Slack",
    segments: ["Mid-Market", "Co-Sell"],
    openDeals: 4,
    accountOwner: {
      name: "Ava Brooks",
      avatar:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    pipelineValue: 333221,
    winProbability: 23,
    lastInteraction: { date: "Aug 12", type: "Discovery" },
  },
  {
    id: 14,
    name: "Stripe",
    segments: ["Expansion", "SMB"],
    openDeals: 3,
    accountOwner: {
      name: "Noah Lee",
      avatar:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    pipelineValue: 442231,
    winProbability: 44,
    lastInteraction: { date: "Sept 09", type: "Demo" },
  },
  {
    id: 15,
    name: "Snowflake",
    segments: ["Enterprise", "Mid-Market"],
    openDeals: 6,
    accountOwner: {
      name: "Grace Miller",
      avatar:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    pipelineValue: 520000,
    winProbability: 24,
    lastInteraction: { date: "Sept 11", type: "Pricing" },
  },
  {
    id: 16,
    name: "Hubspot",
    segments: ["Expansion", "Co-Sell"],
    openDeals: 2,
    accountOwner: {
      name: "Chloe Park",
      avatar:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    pipelineValue: 210123,
    winProbability: 52,
    lastInteraction: { date: "Sept 18", type: "QBR Call" },
  },
];

const segmentColors: Record<string, string> = {
  Enterprise: "border-blue-400/40 bg-blue-400/20 text-blue-200",
  Upsell: "border-purple-400/40 bg-purple-400/20 text-purple-200",
  "New Logo": "border-emerald-400/40 bg-emerald-400/20 text-emerald-200",
  Renewal: "border-emerald-400/40 bg-emerald-400/20 text-emerald-200",
  Expansion: "border-emerald-400/40 bg-emerald-400/20 text-emerald-200",
  Pilot: "border-orange-400/40 bg-orange-400/20 text-orange-200",
  Strategic: "border-red-400/40 bg-red-400/20 text-red-200",
  SMB: "border-yellow-400/40 bg-yellow-400/20 text-yellow-200",
  "Mid-Market": "border-emerald-400/40 bg-emerald-400/20 text-emerald-200",
  "Land & Expand": "border-emerald-400/40 bg-emerald-400/20 text-emerald-200",
  "Co-Sell": "border-emerald-400/40 bg-emerald-400/20 text-emerald-200",
};

function WinProbabilityBar({ value }: { value: number }) {
  const filledBars = Math.round((value / 100) * 20);
  const redBars = Math.round(filledBars * 0.33);
  const yellowBars = Math.round(filledBars * 0.33);
  const greenBars = filledBars - redBars - yellowBars;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5 w-fit h-3">
        {Array.from({ length: 20 }).map((_, i) => {
          let barColor = "bg-neutral-700";
          if (i < redBars) {
            barColor = "bg-red-500";
          } else if (i < redBars + yellowBars) {
            barColor = "bg-yellow-500";
          } else if (i < redBars + yellowBars + greenBars) {
            barColor = "bg-green-500";
          }
          return <div key={i} className={`w-0.5 h-full ${barColor}`} />;
        })}
      </div>
      <span className="text-sm text-neutral-300">{value}%</span>
    </div>
  );
}

function ActivityTrend() {
  return (
    <div className="flex items-end gap-0.5 h-3">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className=" bg-green-500 w-1"
          style={{ height: `${Math.random() * 100}%`, minHeight: "2px" }}
        />
      ))}
    </div>
  );
}

export function CompaniesTable() {
  const totalCompanies = companiesData.length;
//   const sumPipeline = companiesData.reduce(
//     (sum, company) => sum + company.pipelineValue,
//     0
//   );
//   const avgWinProbability = Math.round(
//     companiesData.reduce((sum, company) => sum + company.winProbability, 0) /
//       companiesData.length
//   );

  return (
    <div className="border border-neutral-800 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-neutral-800 hover:bg-transparent">
            <TableHead className="w-12">
              <Checkbox />
            </TableHead>
            <TableHead className="text-neutral-500 text-xs">Companies</TableHead>
            <TableHead className="text-neutral-500 text-xs">Segment & Stage</TableHead>
            <TableHead className="text-neutral-500 text-xs">Account Owner</TableHead>
            <TableHead className="text-neutral-500 text-xs">Open Deals</TableHead>
            <TableHead className="text-neutral-500 text-xs">Pipeline Value</TableHead>
            <TableHead className="text-neutral-500 text-xs">Win Probability</TableHead>
            <TableHead className="text-neutral-500 text-xs">Activity Trend</TableHead>
            <TableHead className="text-neutral-500 text-xs">Last Interaction</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companiesData.map((company) => (
            <TableRow
              key={company.id}
              className="border-b border-neutral-800 hover:bg-neutral-900/50"
            >
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell className="font-medium text-white">
                {company.name}
              </TableCell>
              <TableCell className="flex items-center gap-2">
                {company.segments.map((segment) => (
                  <Badge
                    key={segment}
                    className={`${segmentColors[segment]} text-xs font-medium`}
                    variant="secondary"
                  >
                    {segment}
                  </Badge>
                ))}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="size-5">
                    <AvatarImage src={company.accountOwner.avatar} />
                    <AvatarFallback>
                      {company.accountOwner.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-neutral-300">
                    {company.accountOwner.name}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-neutral-300">
                {company.openDeals}
              </TableCell>
              <TableCell className="text-neutral-300">
                ${company.pipelineValue.toLocaleString()}
              </TableCell>
              <TableCell>
                <WinProbabilityBar value={company.winProbability} />
              </TableCell>
              <TableCell>
                <ActivityTrend />
              </TableCell>
              <TableCell className="text-neutral-400">
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 text-neutral-500" />
                  <span className="text-sm">
                    {company.lastInteraction.date}
                  </span>
                  <Separator
                    orientation="vertical"
                    className="data-[orientation=vertical]:h-4"
                  />
                  <span className="text-xs text-neutral-500">
                    {company.lastInteraction.type}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="border-t border-neutral-800 bg-neutral-900/50 w-full flex text-sm text-neutral-600 px-4">
        <div className="flex-1 flex items-center gap-2 border-r py-2.5">
          <span className="font-medium">{totalCompanies}</span>
          <span> Companies in view</span>
        </div>
        <div className="flex-1 flex items-center gap-2 border-r pl-3 py-2.5">
          <Plus className="size-3.5" />
          <span>Sum of pipeline</span>
          {/* <span className="text-neutral-300">
            ${(sumPipeline / 1000000).toFixed(2)}M
          </span> */}
        </div>
        <div className="flex-1 flex items-center gap-2 border-r pl-3 py-2.5">
          <Plus className="size-3.5" />
          <span>Avg win probability</span>
          {/* <span className="text-neutral-300">{avgWinProbability}%</span> */}
        </div>
        <div className="flex-1 flex items-center justify-start gap-2 pl-3 hover:text-neutral-200">
          <Plus className="size-3.5" /> 
          <span>Add Calculation</span>
        </div>
      </div>
    </div>
  );
}
