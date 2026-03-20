"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface ScheduleDateProps {
  onApply?: (range: DateRange) => void;
  onCancel?: () => void;
}

const PRESETS = [
  { label: "Today", id: "today" },
  { label: "Yesterday", id: "yesterday" },
  { label: "Last 7 Days", id: "7d" },
  { label: "Last 30 Days", id: "30d" },
  { label: "Last 365 Days", id: "365d" },
  { label: "Week to Date", id: "wtd" },
  { label: "Month to Date", id: "mtd" },
  { label: "Year to Date", id: "ytd" },
  { label: "Custom", id: "custom" },
];

const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export const ScheduleDate: React.FC<ScheduleDateProps> = ({
  onApply,
  onCancel,
}) => {
  const [selectedPreset, setSelectedPreset] = useState("custom");
  const [viewDate, setViewDate] = useState(new Date(2025, 9, 1));
  const [range, setRange] = useState<DateRange>({
    start: new Date(2025, 9, 15),
    end: new Date(2025, 9, 25),
  });

  const handleDateClick = (date: Date) => {
    if (!range.start || (range.start && range.end)) {
      setRange({ start: date, end: null });
      setSelectedPreset("custom");
    } else {
      if (date < range.start) {
        setRange({ start: date, end: range.start });
      } else {
        setRange({ ...range, end: date });
      }
    }
  };

  const renderMonthGrid = (
    monthDate: Date,
    showLeftNav = false,
    showRightNav = false
  ) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthName = monthDate.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    return (
      <div className="min-w-56 flex-1">
        <div className="mb-4 flex items-center justify-between px-2">
          {showLeftNav ? (
            <button
              title="left"
              onClick={() => setViewDate(new Date(year, month - 1, 1))}
              className="p-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
            </button>
          ) : (
            <div className="w-7" />
          )}
          <span className="text-[13px] font-semibold tracking-tight text-foreground">
            {monthName}
          </span>
          {showRightNav ? (
            <button
              title="right"
              onClick={() => setViewDate(new Date(year, month + 1, 1))}
              className="p-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronRight size={18} strokeWidth={2.5} />
            </button>
          ) : (
            <div className="w-7" />
          )}
        </div>

        <div className="relative grid grid-cols-7 gap-y-1 text-center">
          {DAYS.map((d) => (
            <span
              key={d}
              className="mb-2 text-[11px] font-medium text-muted-foreground"
            >
              {d}
            </span>
          ))}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="h-8" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const currentDayDate = new Date(year, month, day);
            const isStart =
              range.start?.toDateString() === currentDayDate.toDateString();
            const isEnd =
              range.end?.toDateString() === currentDayDate.toDateString();
            const isInRange =
              range.start &&
              range.end &&
              currentDayDate > range.start &&
              currentDayDate < range.end;

            return (
              <div
                key={day}
                onClick={() => handleDateClick(currentDayDate)}
                className="group relative flex h-8 cursor-pointer items-center justify-center"
              >
                {(isInRange || isStart || isEnd) && (
                  <div
                    className={cn(
                      "absolute z-0 h-8",
                      "border-y border-border bg-muted",
                      isStart ? "left-1/2 rounded-lg border-l" : "left-0",
                      isEnd ? "right-1/2 rounded-lg border-r" : "right-0",
                      isInRange && !isStart && !isEnd ? "w-full" : ""
                    )}
                  />
                )}
                {isStart || isEnd ? (
                  <div className="absolute z-10 flex h-8 w-8 flex-col items-center justify-center rounded-lg border border-border bg-foreground shadow-xl">
                    <span className="text-xs font-bold text-background">
                      {day}
                    </span>
                    <motion.div
                      layoutId="activeThumb"
                      className="absolute bottom-1 h-[1.5px] w-2 rounded-lg bg-background shadow"
                    />
                  </div>
                ) : (
                  <span
                    className={cn(
                      "relative z-10 text-[13px] font-normal transition-colors",
                      isInRange
                        ? "text-foreground"
                        : "text-muted-foreground group-hover:text-foreground"
                    )}
                  >
                    {day}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="theme-injected mx-auto flex w-full max-w-195 flex-col overflow-hidden rounded-lg border border-border bg-background font-sans text-muted-foreground shadow-2xl">
      <div className="flex min-h-0 w-full flex-col md:min-h-105 md:flex-row">
        <aside className="no-scrollbar flex w-full shrink-0 flex-row gap-1 overflow-x-auto border-b border-border bg-muted py-3 md:w-52 md:flex-col md:border-r md:border-b-0">
          {PRESETS.map((preset, idx) => (
            <React.Fragment key={preset.id}>
              {[2, 5, 8].includes(idx) && (
                <div className="mx-3 my-1 hidden h-px bg-border md:block" />
              )}
              <button
                onClick={() => setSelectedPreset(preset.id)}
                className={cn(
                  "group mx-2 flex items-center justify-between rounded-lg px-3 py-1.5 text-xs whitespace-nowrap transition-all duration-200 md:mx-3 md:text-[13px]",
                  selectedPreset === preset.id
                    ? preset.id === "custom"
                      ? "border border-border bg-muted font-medium text-foreground"
                      : "bg-muted text-foreground"
                    : "hover:bg-muted hover:text-foreground"
                )}
              >
                <span>{preset.label}</span>
                {selectedPreset === preset.id && preset.id === "custom" && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-2"
                  >
                    <Check size={12} />
                  </motion.div>
                )}
              </button>
            </React.Fragment>
          ))}
        </aside>

        <main className="flex min-w-0 flex-1 flex-col gap-6 overflow-hidden bg-background p-4 md:p-5">
          <div className="grid shrink-0 grid-cols-1 gap-3 sm:grid-cols-2">
            <DateInput label="Start date" date={range.start} />
            <DateInput label="End date" date={range.end} />
          </div>

          <div className="no-scrollbar flex snap-x snap-mandatory flex-row items-start gap-8 overflow-x-auto overflow-y-hidden pb-2 lg:gap-10">
            <div className="shrink-0 snap-start">
              {renderMonthGrid(viewDate, true, false)}
            </div>

            <div className="hidden h-40 w-px shrink-0 self-center bg-border opacity-50 lg:block" />

            <div className="shrink-0 snap-start">
              {renderMonthGrid(
                new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1),
                false,
                true
              )}
            </div>
          </div>
        </main>
      </div>

      <footer className="flex h-16 shrink-0 items-center justify-end gap-3 border-t border-border bg-muted px-6">
        <button
          onClick={onCancel}
          className="rounded-lg border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          Cancel
        </button>
        <button
          onClick={() => onApply?.(range)}
          className="rounded-lg bg-foreground px-5 py-1.5 text-xs font-semibold text-background shadow-lg transition-all hover:opacity-90 active:scale-95"
        >
          Apply
        </button>
      </footer>
    </div>
  );
};

const DateInput = ({ label, date }: { label: string; date: Date | null }) => (
  <div className="flex flex-1 flex-col gap-1.5">
    <label className="ml-1 text-[12px] font-normal text-muted-foreground">
      {label}
    </label>
    <div className="flex cursor-pointer items-center justify-between rounded-lg border border-border bg-muted px-3 py-2 text-xs text-muted-foreground transition-colors hover:border-border md:text-[13px]">
      <span>
        {date
          ? date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "Select Date"}
      </span>
      <ChevronDown size={14} className="text-muted-foreground" />
    </div>
  </div>
);
