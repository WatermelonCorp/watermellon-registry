'use client';

import { useState, useRef, useEffect, type FC } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CalendarDays } from 'lucide-react';

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

const daysOfWeek: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export const CalendarWidget: FC<CalendarWidgetProps> = ({
  events,
  initialSelectedDate,
  currentMonthYear,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(initialSelectedDate);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const scrollLeftStart = useRef<number>(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      startX.current = e.pageX - el.offsetLeft;
      scrollLeftStart.current = el.scrollLeft;
      el.style.cursor = 'grabbing';
    };

    const onMouseLeave = () => {
      isDragging.current = false;
      el.style.cursor = 'grab';
    };

    const onMouseUp = () => {
      isDragging.current = false;
      el.style.cursor = 'grab';
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX.current) * 1;
      el.scrollLeft = scrollLeftStart.current - walk;
    };

    el.style.cursor = 'grab';
    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('mouseleave', onMouseLeave);
    el.addEventListener('mouseup', onMouseUp);
    el.addEventListener('mousemove', onMouseMove);

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const dates: DateItem[] = Array.from({ length: 92 }, (_, i) => {
    const date = new Date(2024, 8, 1 + i);
    return {
      day: date.getDate(),
      fullDate: date.toISOString().split('T')[0],
      month: date.getMonth(),
      year: date.getFullYear(),
      dateObj: date,
      dayOfWeek: date.getDay(),
      dayName: daysOfWeek[date.getDay()],
    };
  });

  return (
      <div className="flex w-[340px] flex-col rounded-[30px] border border-black/10 bg-[#F6F5FA] shadow-lg transition-colors duration-500 select-none dark:border-white/5 dark:bg-zinc-900">
        <div className="p-4">
          <motion.div
            key={currentMonthYear}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="ml-2 text-xl font-semibold dark:text-white"
          >
            {currentMonthYear}
          </motion.div>

          <div className="relative">
            <div
              ref={scrollRef}
              className="scrollbar-hide flex gap-2 overflow-x-auto px-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {dates.map((date) => {
                const isSelected = selectedDate === date.fullDate;
                const hasEvent = events[date.fullDate]?.length > 0;

                return (
                  <div
                    key={date.fullDate}
                    className="relative flex min-w-10 flex-col items-center pt-4"
                  >
                    <div
                      className={`mb-1 text-base font-medium transition-colors duration-300 ${isSelected
                          ? 'text-black dark:text-white'
                          : 'text-gray-500 dark:text-zinc-500'
                        }`}
                    >
                      {date.dayName}
                    </div>

                    <motion.div
                      className="relative flex cursor-pointer flex-col items-center"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedDate(date.fullDate)}
                    >
                      <div className="relative flex h-10 w-10 items-center justify-center">
                        {isSelected && (
                          <motion.div
                            layoutId="selected-date-bg"
                            transition={{
                              type: 'spring',
                              stiffness: 180,
                              damping: 22,
                            }}
                            className="absolute inset-0 rounded-full bg-white shadow-sm dark:bg-zinc-800"
                          />
                        )}
                        <span
                          className={`relative z-10 text-base font-medium ${isSelected
                              ? 'text-black dark:text-white'
                              : 'text-black/80 dark:text-zinc-400'
                            }`}
                        >
                          {date.day}
                        </span>
                      </div>
                      <AnimatePresence mode="popLayout" initial={false}>
                        {hasEvent && !isSelected && (
                          <motion.span
                            initial={{
                              opacity: 0,
                              scale: 0,
                              filter: 'blur(4px)',
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                              filter: 'blur(0px)',
                            }}
                            exit={{ opacity: 0, scale: 0, filter: 'blur(4px)' }}
                            transition={{
                              duration: 0.3,
                            }}
                            className="h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#cecdd1] will-change-transform dark:bg-zinc-700"
                          />
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="relative flex h-52 flex-col overflow-hidden rounded-[28px] border border-black/10 bg-white px-4 pt-2 transition-colors duration-500 dark:border-white/10 dark:bg-zinc-950">
          <motion.div className="no-scrollbar relative h-full overflow-y-scroll">
            <AnimatePresence mode="popLayout" initial={false}>
              {events[selectedDate]?.length ? (
                <motion.div key="list" className="pb-8">
                  {events[selectedDate].map((event) => (
                    <motion.div
                      key={event.title}
                      initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                      transition={{
                        duration: 0.3,
                        ease: 'easeOut',
                      }}
                      className="flex flex-col border-b border-gray-200 py-2 last:border-b-0 dark:border-zinc-800"
                    >
                      <span className="text-base font-medium text-black/70 dark:text-zinc-300">
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
                  initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeOut',
                  }}
                  className="flex h-40 flex-col items-center justify-center gap-3"
                >
                  <div className="rounded- bg-zinc-100 p-5 dark:bg-zinc-800">
                    <CalendarDays className="size-8 text-zinc-500 dark:text-zinc-300" />
                  </div>
                  <p className="text-sm text-neutral-500 dark:text-zinc-500">
                    No Events
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-16 rounded-b-[30px] bg-linear-to-t from-white via-white/70 to-transparent dark:from-zinc-950 dark:via-zinc-950/20" />
        </div>
      </div>
  );
};
