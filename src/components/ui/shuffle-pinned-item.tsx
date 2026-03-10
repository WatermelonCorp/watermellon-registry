"use client";

import {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
  type FC,
} from "react";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  type Transition,
} from "motion/react";
import { Pin, ChevronsUpDown } from "lucide-react";
import { BsChatFill } from "react-icons/bs";

export interface ListItem {
  id: string;
  text: string;
  isPinned: boolean;
}

interface ShufflePinnedListProps {
  items?: ListItem[];
  onPinChange?: (updatedItems: ListItem[]) => void;
  onShuffle?: (currentHeroItem?: ListItem) => void;
}

const DEFAULT_ITEMS: ListItem[] = [
  { id: "1", text: "Daily Fitness Tracker", isPinned: false },
  { id: "2", text: "Voice Command Tips", isPinned: false },
  { id: "3", text: "iOS Shortcuts Guide", isPinned: false },
  { id: "4", text: "Focus Mode Ideas", isPinned: false },
  { id: "5", text: "50 Productivity Hacks", isPinned: false },
  { id: "6", text: "Lunch Recipe Ideas", isPinned: false },
  { id: "7", text: "Snack Ideas For Kids", isPinned: false },
];

const springConfig: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 40,
};

export const ShufflePinnedList: FC<ShufflePinnedListProps> = ({
  items: propItems,
  onPinChange,
  onShuffle,
}) => {
  const [items, setItems] = useState<ListItem[]>(propItems ?? DEFAULT_ITEMS);
  const [activePinnedIndex, setActivePinnedIndex] = useState<number>(0);
  const [showFade, setShowFade] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const pinnedItems = useMemo(
    () => items.filter((item) => item.isPinned),
    [items]
  );

  const togglePin = useCallback(
    (id: string) => {
      setItems((prev) => {
        const updated = prev.map((item) =>
          item.id === id ? { ...item, isPinned: !item.isPinned } : item
        );

        const toggledItem = prev.find((i) => i.id === id);

        if (!toggledItem?.isPinned) {
          const newPinnedItems = updated.filter((i) => i.isPinned);
          const newIndex = newPinnedItems.findIndex((i) => i.id === id);
          setActivePinnedIndex(newIndex);
        }

        if (toggledItem?.isPinned) {
          const remainingPinned = updated.filter((i) => i.isPinned);
          setActivePinnedIndex((current) =>
            Math.min(current, Math.max(remainingPinned.length - 1, 0))
          );
        }

        onPinChange?.(updated);
        return updated;
      });
    },
    [onPinChange]
  );

  const shufflePinned = useCallback(() => {
    if (pinnedItems.length <= 1) return;
    setActivePinnedIndex((i) => (i + 1) % pinnedItems.length);
    onShuffle?.(pinnedItems[(activePinnedIndex + 1) % pinnedItems.length]);
  }, [pinnedItems, activePinnedIndex, onShuffle]);

  const currentHeroItem = pinnedItems[activePinnedIndex];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const checkScroll = () => {
      const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      setShowFade(!isAtBottom);
    };

    checkScroll();
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [items]);

  return (
    <div className="relative h-[500px] w-xs overflow-hidden rounded-4xl border border-[#E5E5E9] bg-[#fefefe] px-4 py-4 sm:w-sm dark:border-neutral-800 dark:bg-neutral-900">
      <MotionConfig transition={springConfig}>
        <motion.div
          ref={scrollRef}
          layout
          className="no-scrollbar relative h-full overflow-y-scroll scroll-smooth"
        >
          <div className="space-y-2">
            <motion.div
              layout
              className="overflow-hidden"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <AnimatePresence mode="popLayout">
                {pinnedItems.length > 0 && (
                  <motion.div
                    key="open"
                    layout
                    initial={{ opacity: 0, scale: 0.8, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    className="flex cursor-pointer items-center justify-between rounded-full bg-[#F6F5FA] p-3 py-2 dark:bg-neutral-800"
                    onClick={shufflePinned}
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white dark:bg-neutral-700">
                        <Pin
                          className="h-5 w-5 text-[#D9D9DF] dark:text-neutral-400"
                          fill="currentColor"
                        />
                      </div>
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={currentHeroItem?.id}
                          initial={{
                            opacity: 0,
                            scale: 0.7,
                            filter: "blur(8px)",
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            filter: "blur(0px)",
                          }}
                          exit={{ opacity: 0, scale: 0.7, filter: "blur(8px)" }}
                          transition={{
                            duration: 0.6,
                            type: "spring",
                            bounce: 0,
                          }}
                          className="truncate text-lg font-bold text-[#29292D] dark:text-neutral-100"
                        >
                          {currentHeroItem?.text}
                        </motion.span>
                      </AnimatePresence>
                    </div>

                    {pinnedItems.length > 1 && (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fefefe] text-gray-400 dark:bg-neutral-700 dark:text-neutral-400"
                      >
                        <ChevronsUpDown className="h-6 w-6" />
                      </motion.button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.h1
              layout
              className="px-2 text-base font-semibold text-[#ADACB4] dark:text-neutral-500"
            >
              Today
            </motion.h1>

            <div className="w-full space-y-1">
              <AnimatePresence mode="popLayout" initial={false}>
                {items.map((item) => {
                  const isHighlighted = currentHeroItem?.id === item.id;
                  return (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{
                        opacity: 1,
                        scale: isHighlighted ? [1, 1.03, 1] : 1,
                      }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                        scale: { duration: 0.3 },
                      }}
                      className="group relative flex cursor-default items-center justify-between overflow-hidden rounded-full p-2 px-2 transition-colors hover:bg-[#F6F5FA] dark:hover:bg-neutral-800"
                    >
                      {isHighlighted && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 1, times: [0, 0.2, 1] }}
                          className="pointer-events-none absolute inset-0 bg-[#F6F5FA] dark:bg-neutral-800"
                        />
                      )}

                      <div className="relative z-10 flex min-w-0 flex-1 items-center gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E5E5E9] bg-[#FEFEFE] pl-0.5 dark:border-neutral-700 dark:bg-neutral-800">
                          <BsChatFill
                            className="h-5 w-5 text-[#D5D4E0] dark:text-neutral-500"
                            fill="currentColor"
                          />
                        </div>
                        <span className="truncate font-bold text-[#262626] dark:text-neutral-100">
                          {item.text}
                        </span>
                      </div>

                      <button
                        title="pin"
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePin(item.id);
                        }}
                        className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all ${
                          item.isPinned
                            ? "text-[#6B6A72] opacity-100 dark:text-neutral-400"
                            : "text-[#ADACB8] opacity-0 group-hover:opacity-80 hover:text-[#6A6970] dark:text-neutral-500 dark:hover:text-neutral-300"
                        }`}
                      >
                        <Pin className="h-5 w-5" fill="currentColor" />
                      </button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </MotionConfig>

      <AnimatePresence>
        {showFade && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute right-0 bottom-0 left-0 z-20 h-20 rounded-b-[40px] bg-gradient-to-t from-[#fefefe] via-[#fefefe]/90 to-transparent backdrop-blur-[2px] dark:from-neutral-900 dark:via-neutral-900/90"
          />
        )}
      </AnimatePresence>
    </div>
  );
};
