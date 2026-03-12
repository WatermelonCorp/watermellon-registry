'use client';
import { useMemo } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { Calendar, Plus } from 'lucide-react';
import { companiesData, segmentColors } from '../data';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';

function WinProbabilityBar({ value }: { value: number }) {
  const filledBars = Math.round((value / 100) * 20);
  const redBars = Math.round(filledBars * 0.33);
  const yellowBars = Math.round(filledBars * 0.33);
  const greenBars = filledBars - redBars - yellowBars;

  return (
    <div className="flex items-center gap-2">
      <div className="flex h-3 w-fit items-center gap-0.5">
        {Array.from({ length: 20 }).map((_, i) => {
          let barColor = 'bg-neutral-200 dark:bg-neutral-700';
          if (i < redBars) {
            barColor = 'bg-red-500';
          } else if (i < redBars + yellowBars) {
            barColor = 'bg-yellow-500';
          } else if (i < redBars + yellowBars + greenBars) {
            barColor = 'bg-green-500';
          }
          return <div key={i} className={`h-full w-0.5 ${barColor}`} />;
        })}
      </div>
      <span className="text-sm font-bold whitespace-nowrap text-neutral-600 dark:text-neutral-300">
        {value}%
      </span>
    </div>
  );
}

function ActivityTrend() {
  const heights = useMemo(
    () => Array.from({ length: 12 }).map(() => `${Math.random() * 100}%`),
    [],
  );

  return (
    <div className="flex h-3 items-end gap-0.5">
      {heights.map((height, i) => (
        <div
          key={i}
          className="w-1 bg-green-500"
          style={{ height, minHeight: '2px' }}
        />
      ))}
    </div>
  );
}

export function CompaniesTable() {
  const totalCompanies = companiesData.length;

  return (
    <div className="flex flex-col overflow-hidden border-y border-neutral-200 dark:border-neutral-800">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-neutral-200 hover:bg-transparent dark:border-neutral-800">
              <TableHead className="w-12 px-4">
                <Checkbox />
              </TableHead>
              <TableHead className="min-w-[150px] px-4 text-xs text-neutral-500 dark:text-neutral-500">
                Companies
              </TableHead>
              <TableHead className="min-w-[200px] px-4 text-xs text-neutral-500 dark:text-neutral-500">
                Segment & Stage
              </TableHead>
              <TableHead className="min-w-[180px] px-4 text-xs text-neutral-500 dark:text-neutral-500">
                Account Owner
              </TableHead>
              <TableHead className="min-w-[100px] px-4 text-xs text-neutral-500 dark:text-neutral-500">
                Open Deals
              </TableHead>
              <TableHead className="min-w-[140px] px-4 text-xs text-neutral-500 dark:text-neutral-500">
                Pipeline Value
              </TableHead>
              <TableHead className="min-w-[150px] px-4 text-xs text-neutral-500 dark:text-neutral-500">
                Win Probability
              </TableHead>
              <TableHead className="min-w-[120px] px-4 text-xs text-neutral-500 dark:text-neutral-500">
                Activity Trend
              </TableHead>
              <TableHead className="min-w-[180px] px-4 text-xs text-neutral-500 dark:text-neutral-500">
                Last Interaction
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companiesData.map((company) => (
              <TableRow
                key={company.id}
                className="cursor-pointer border-b border-neutral-200 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900/50"
              >
                <TableCell className="px-4">
                  <Checkbox />
                </TableCell>
                <TableCell className="px-4 font-medium text-neutral-900 dark:text-white">
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
                <TableCell className="px-4 text-neutral-700 dark:text-neutral-300">
                  {company.openDeals}
                </TableCell>
                <TableCell className="px-4 text-neutral-700 dark:text-neutral-300">
                  ${company.pipelineValue.toLocaleString('en-US')}
                </TableCell>
                <TableCell className="px-4">
                  <WinProbabilityBar value={company.winProbability} />
                </TableCell>
                <TableCell className="px-4">
                  <ActivityTrend />
                </TableCell>
                <TableCell className="px-4 text-neutral-600 dark:text-neutral-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-neutral-400 dark:text-neutral-500" />
                    <span className="text-sm">
                      {company.lastInteraction.date}
                    </span>
                    <Separator
                      orientation="vertical"
                      className="bg-neutral-200 data-[orientation=vertical]:h-4 dark:bg-neutral-800"
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
      <div className="flex w-full flex-col border-t border-neutral-200 bg-neutral-50 px-4 text-sm text-neutral-600 md:flex-row dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-500">
        <div className="flex flex-1 items-center gap-2 border-b border-neutral-200 py-2.5 md:border-r md:border-b-0 dark:border-neutral-800">
          <span className="font-semibold text-neutral-900 dark:text-neutral-300">
            {totalCompanies}
          </span>
          <span> Companies in view</span>
        </div>
        <div className="flex flex-1 items-center gap-2 border-b border-neutral-200 py-2.5 md:border-r md:border-b-0 md:pl-3 dark:border-neutral-800">
          <Plus className="size-3.5" />
          <span>Sum of pipeline</span>
        </div>
        <div className="flex flex-1 items-center gap-2 border-b border-neutral-200 py-2.5 md:border-r md:border-b-0 md:pl-3 dark:border-neutral-800">
          <Plus className="size-3.5" />
          <span>Avg win probability</span>
        </div>
        <Dialog>
          <DialogTrigger
            render={
              <div className="group flex flex-1 cursor-pointer items-center justify-start gap-2 py-2.5 transition-colors hover:text-neutral-900 md:pl-3 dark:hover:text-neutral-200" />
            }
          >
            <Plus className="size-3.5" />
            <span>Add Calculation</span>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Custom Calculation</DialogTitle>
              <DialogDescription>
                Define a new metric or calculation to display in the footer.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Input
                  id="calc-name"
                  placeholder="Calculation Name (e.g., Total Revenue)"
                />
              </div>
              <div className="grid gap-2">
                <Input
                  id="calc-formula"
                  placeholder="Formula (e.g., SUM(Pipeline Value))"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose
                render={<Button variant="outline" className="rounded-full" />}
              >
                Cancel
              </DialogClose>
              <Button className="rounded-full bg-indigo-600 text-white hover:bg-indigo-700">
                Add Calculation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
