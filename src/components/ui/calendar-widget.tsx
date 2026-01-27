"use client";

import React, { useState, useRef, useEffect, FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

/* --- Types --- */

export interface CalendarEvent {
  title: string;
  time: string;
}

export interface EventsData {
  [key: string]: CalendarEvent[];
}

interface DateItem {
  day: number;
  fullDate: string;
  month: number;
  year: number;
  dateObj: Date;
  dayOfWeek: number;
  dayName: string;
}

export interface CalendarWidgetProps {
  events: EventsData;
  initialSelectedDate: string;
  currentMonthYear: string;
}

/* --- Constants --- */

const daysOfWeek: string[] = ["S", "M", "T", "W", "T", "F", "S"];

/* --- Main Component --- */

export const CalendarWidget: FC<CalendarWidgetProps> = ({
  events,
  initialSelectedDate,
  currentMonthYear,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    initialSelectedDate
  );
  const [isDark, setIsDark] = useState<boolean>(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const scrollLeftStart = useRef<number>(0);

  // Theme Sync
  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      startX.current = e.pageX - el.offsetLeft;
      scrollLeftStart.current = el.scrollLeft;
      el.style.cursor = "grabbing";
    };

    const onMouseLeave = () => {
      isDragging.current = false;
      el.style.cursor = "grab";
    };

    const onMouseUp = () => {
      isDragging.current = false;
      el.style.cursor = "grab";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX.current) * 1;
      el.scrollLeft = scrollLeftStart.current - walk;
    };

    el.style.cursor = "grab";
    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("mouseup", onMouseUp);
    el.addEventListener("mousemove", onMouseMove);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const dates: DateItem[] = Array.from({ length: 92 }, (_, i) => {
    const date = new Date(2024, 8, 1 + i);
    return {
      day: date.getDate(),
      fullDate: date.toISOString().split("T")[0],
      month: date.getMonth(),
      year: date.getFullYear(),
      dateObj: date,
      dayOfWeek: date.getDay(),
      dayName: daysOfWeek[date.getDay()],
    };
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-zinc-950 transition-colors duration-500 w-full gap-6">
      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsDark(!isDark)}
        className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all active:scale-90 shadow-sm"
      >
        {isDark ? (
          <Sun className="text-yellow-400" size={20} />
        ) : (
          <Moon className="text-zinc-500" size={20} />
        )}
      </button>

      <div className="w-[340px] rounded-[30px] bg-[#F6F5FA] dark:bg-zinc-900 shadow-lg flex flex-col gap-2 select-none border border-black/10 dark:border-white/5 transition-colors duration-500">
        <div className="p-4">
          {/* Month/Year Header */}
          <motion.div
            key={currentMonthYear}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl pb-4 font-semibold dark:text-white"
          >
            {currentMonthYear}
          </motion.div>

          {/* Dates */}
          <div className="relative">
            <div
              ref={scrollRef}
              className="flex overflow-x-auto scrollbar-hide pb-2 gap-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {dates.map((date) => {
                const isSelected = selectedDate === date.fullDate;
                const hasEvent = events[date.fullDate]?.length > 0;

                return (
                  <div
                    key={date.fullDate}
                    className="relative flex flex-col items-center min-w-9 pt-4"
                  >
                    <div
                      className={`text-base font-medium mb-1 ${
                        isSelected
                          ? "text-black dark:text-white"
                          : "text-gray-500 dark:text-zinc-500"
                      }`}
                    >
                      {date.dayName}
                    </div>

                    <motion.div
                      className="flex flex-col items-center cursor-pointer relative"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedDate(date.fullDate)}
                    >
                      <div className="relative w-10 h-10 flex items-center justify-center">
                        {isSelected && (
                          <motion.div
                            layoutId="selected-date-bg"
                            transition={{
                              type: "spring",
                              stiffness: 180,
                              damping: 22,
                            }}
                            className="absolute inset-0 rounded-full bg-white dark:bg-zinc-800 shadow-sm"
                          />
                        )}
                        <span
                          className={`relative z-10 text-base font-medium ${
                            isSelected
                              ? "text-black dark:text-white"
                              : "text-black/80 dark:text-zinc-400"
                          }`}
                        >
                          {date.day}
                        </span>
                      </div>

                      {hasEvent && !isSelected && (
                        <motion.span
                          layout
                          className="h-1.5 w-1.5 rounded-full bg-[#cecdd1] dark:bg-zinc-700 mt-1"
                        />
                      )}
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Events */}
        <div className="relative rounded-[28px] px-4 pt-2 bg-white dark:bg-zinc-950 flex flex-col h-52 border-black/10 dark:border-white/5 border overflow-hidden transition-colors duration-500">
          <motion.div className="relative h-full overflow-y-scroll no-scrollbar">
            <AnimatePresence mode="wait">
              {events[selectedDate]?.length ? (
                <motion.div key="list" className="pb-8">
                  {events[selectedDate].map((event) => (
                    <motion.div
                      key={event.title}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col border-b border-gray-200 dark:border-zinc-800 py-2 last:border-b-0"
                    >
                      <span className="font-medium text-black/70 dark:text-zinc-300 text-base">
                        {event.title}
                      </span>
                      <span className="text-base text-gray-500 dark:text-zinc-500">
                        {event.time}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="no-events"
                  className="flex flex-col items-center justify-center h-40 gap-3"
                >
                  <p className="text-sm text-neutral-500 dark:text-zinc-500">
                    No Events
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-zinc-950 via-white/70 dark:via-zinc-950/70 to-transparent pointer-events-none rounded-b-[30px]" />
        </div>
      </div>
    </div>
  );
};
