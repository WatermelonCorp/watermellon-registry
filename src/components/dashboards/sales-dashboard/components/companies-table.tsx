"use client";
import { useEffect, useState } from "react";

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
import { companiesData, segmentColors } from "../data";



function WinProbabilityBar({ value }: { value: number }) {
  const filledBars = Math.round((value / 100) * 20);
  const redBars = Math.round(filledBars * 0.33);
  const yellowBars = Math.round(filledBars * 0.33);
  const greenBars = filledBars - redBars - yellowBars;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5 w-fit h-3">
        {Array.from({ length: 20 }).map((_, i) => {
          let barColor = "bg-neutral-200 dark:bg-neutral-700";
          if (i < redBars) {
            barColor = "bg-red-500";
          } else if (i < redBars + yellowBars) {
            barColor = "bg-yellow-500";
          } else if (i < redBars + yellowBars + greenBars) {
            barColor = "bg-green-500";
          }
          return <div key={i} className={`w-0.5 h-full ${barColor} transition-colors`} />;
        })}
      </div>
      <span className="text-sm text-neutral-600 dark:text-neutral-300 font-bold whitespace-nowrap">{value}%</span>
    </div>
  );
}

function ActivityTrend() {
  const [heights, setHeights] = useState<string[]>([]);

  useEffect(() => {
    setHeights(Array.from({ length: 12 }).map(() => `${Math.random() * 100}%`));
  }, []);

  return (
    <div className="flex items-end gap-0.5 h-3">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className=" bg-green-500 w-1"
          style={{ height: heights[i] || "2px", minHeight: "2px" }}
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
    <div className="border-y border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-neutral-200 dark:border-neutral-800 hover:bg-transparent">
              <TableHead className="w-12 px-4">
                <Checkbox />
              </TableHead>
              <TableHead className="text-neutral-500 dark:text-neutral-500 text-xs px-4 min-w-[150px]">Companies</TableHead>
              <TableHead className="text-neutral-500 dark:text-neutral-500 text-xs px-4 min-w-[200px]">Segment & Stage</TableHead>
              <TableHead className="text-neutral-500 dark:text-neutral-500 text-xs px-4 min-w-[180px]">Account Owner</TableHead>
              <TableHead className="text-neutral-500 dark:text-neutral-500 text-xs px-4 min-w-[100px]">Open Deals</TableHead>
              <TableHead className="text-neutral-500 dark:text-neutral-500 text-xs px-4 min-w-[140px]">Pipeline Value</TableHead>
              <TableHead className="text-neutral-500 dark:text-neutral-500 text-xs px-4 min-w-[150px]">Win Probability</TableHead>
              <TableHead className="text-neutral-500 dark:text-neutral-500 text-xs px-4 min-w-[120px]">Activity Trend</TableHead>
              <TableHead className="text-neutral-500 dark:text-neutral-500 text-xs px-4 min-w-[180px]">Last Interaction</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companiesData.map((company) => (
              <TableRow
                key={company.id}
                className="border-b border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors"
              >
                <TableCell className="px-4">
                  <Checkbox />
                </TableCell>
                <TableCell className="font-medium text-neutral-900 dark:text-white px-4">
                  {company.name}
                </TableCell>
                <TableCell className="flex items-center gap-2 px-4">
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
                <TableCell className="px-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-5">
                      <AvatarImage src={company.accountOwner.avatar} />
                      <AvatarFallback>
                        {company.accountOwner.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                      {company.accountOwner.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-neutral-700 dark:text-neutral-300 px-4">
                  {company.openDeals}
                </TableCell>
                <TableCell className="text-neutral-700 dark:text-neutral-300 px-4">
                  ${company.pipelineValue.toLocaleString("en-US")}
                </TableCell>
                <TableCell className="px-4">
                  <WinProbabilityBar value={company.winProbability} />
                </TableCell>
                <TableCell className="px-4">
                  <ActivityTrend />
                </TableCell>
                <TableCell className="text-neutral-600 dark:text-neutral-400 px-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-neutral-400 dark:text-neutral-500" />
                    <span className="text-sm">
                      {company.lastInteraction.date}
                    </span>
                    <Separator
                      orientation="vertical"
                      className="data-[orientation=vertical]:h-4 bg-neutral-200 dark:bg-neutral-800"
                    />
                    <span className="text-xs text-neutral-400 dark:text-neutral-500">
                      {company.lastInteraction.type}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 w-full flex flex-col md:flex-row text-sm text-neutral-600 dark:text-neutral-500 px-4">
        <div className="flex-1 flex items-center gap-2 border-b md:border-b-0 md:border-r border-neutral-200 dark:border-neutral-800 py-2.5">
          <span className="font-semibold text-neutral-900 dark:text-neutral-300">{totalCompanies}</span>
          <span> Companies in view</span>
        </div>
        <div className="flex-1 flex items-center gap-2 border-b md:border-b-0 md:border-r border-neutral-200 dark:border-neutral-800 md:pl-3 py-2.5">
          <Plus className="size-3.5" />
          <span>Sum of pipeline</span>
          {/* <span className="text-neutral-700 dark:text-neutral-300">
            ${(sumPipeline / 1000000).toFixed(2)}M
          </span> */}
        </div>
        <div className="flex-1 flex items-center gap-2 border-b md:border-b-0 md:border-r border-neutral-200 dark:border-neutral-800 md:pl-3 py-2.5">
          <Plus className="size-3.5" />
          <span>Avg win probability</span>
          {/* <span className="text-neutral-700 dark:text-neutral-300">{avgWinProbability}%</span> */}
        </div>
        <div className="flex-1 flex items-center justify-start gap-2 md:pl-3 py-2.5 hover:text-neutral-900 dark:hover:text-neutral-200 cursor-pointer transition-colors">
          <Plus className="size-3.5" />
          <span>Add Calculation</span>
        </div>
      </div>
    </div>
  );
}
