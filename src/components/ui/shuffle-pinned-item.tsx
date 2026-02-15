"use client";

import { useState, useCallback, useMemo, type FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pin, ChevronsUpDown } from "lucide-react";
import { BsChatFill } from "react-icons/bs";

// --- Types ---
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

export const ShufflePinnedList: FC<ShufflePinnedListProps> = ({
  items: propItems,
  onPinChange,
  onShuffle,
}) => {
  const [items, setItems] = useState<ListItem[]>(propItems ?? DEFAULT_ITEMS);
  const [activePinnedIndex, setActivePinnedIndex] = useState<number>(0);

  const pinnedItems = useMemo(() => items.filter((item) => item.isPinned), [items]);

  const togglePin = useCallback(
    (id: string) => {
      setItems((prev) => {
        const updated = prev.map((item) =>
          item.id === id ? { ...item, isPinned: !item.isPinned } : item
        );

        // Adjust activePinnedIndex
        const currentlyPinned = prev.filter((i) => i.isPinned);
        const toggledItem = prev.find((i) => i.id === id);
        if (toggledItem?.isPinned) {
          const removedIndex = currentlyPinned.findIndex((i) => i.id === id);
          if (removedIndex <= activePinnedIndex && activePinnedIndex > 0) {
            setActivePinnedIndex((i) => Math.max(0, i - 1));
          }
        }

        onPinChange?.(updated);
        return updated;
      });
    },
    [activePinnedIndex, onPinChange]
  );

  const shufflePinned = useCallback(() => {
    if (pinnedItems.length <= 1) return;
    setActivePinnedIndex((i) => (i + 1) % pinnedItems.length);
    onShuffle?.(pinnedItems[(activePinnedIndex + 1) % pinnedItems.length]);
  }, [pinnedItems, activePinnedIndex, onShuffle]);

  const currentHeroItem = pinnedItems[activePinnedIndex];

  return (
    <div className="w-xs sm:w-sm h-[500px] bg-[#fefefe] dark:bg-zinc-900 rounded-[40px] py-4 px-4 border border-[#E5E5E9] dark:border-zinc-800 relative overflow-hidden shadow-xs">
      <motion.div
        layout
        className="relative h-full overflow-y-scroll no-scrollbar scroll-smooth"
      >
        <div className="space-y-4">
          {/* PINNED HERO */}
          <motion.div layout className="overflow-hidden" transition={{ type: "spring", stiffness: 300, damping: 30 }}>
            <AnimatePresence mode="popLayout">
              {pinnedItems.length > 0 && (
                <motion.div
                  key={currentHeroItem?.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
                  className="flex items-center justify-between bg-[#F6F5FA] dark:bg-zinc-800 rounded-full p-3 py-2 cursor-pointer mb-4"
                  onClick={shufflePinned}
                >
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div className="flex items-center justify-center bg-white rounded-full shadow-xs w-11 h-11 dark:bg-zinc-700 shrink-0">
                      <Pin className="w-5 h-5 text-[#D9D9DF] dark:text-zinc-400" fill="currentColor" />
                    </div>
                    <span className="font-bold text-lg text-[#29292D] dark:text-zinc-100 truncate">
                      {currentHeroItem.text}
                    </span>
                  </div>

                  {pinnedItems.length > 1 && (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="w-11 h-11 flex items-center justify-center rounded-full text-gray-400 dark:text-zinc-400 bg-[#fefefe] dark:bg-zinc-700 shadow-xs shrink-0"
                    >
                      <ChevronsUpDown className="w-6 h-6" />
                    </motion.button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* TODAY HEADER */}
          <motion.h1 layout className="text-base font-semibold text-[#ADACB4] dark:text-zinc-500 px-2">
            Today
          </motion.h1>

          {/* LIST */}
          <div className="w-full space-y-1">
            <AnimatePresence mode="popLayout">
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
                    transition={{ type: "spring", stiffness: 400, damping: 30, scale: { duration: 0.3 } }}
                    className="group relative flex items-center justify-between p-2 px-2 rounded-full hover:bg-[#F6F5FA] dark:hover:bg-zinc-800 transition-colors cursor-default overflow-hidden"
                  >
                    {isHighlighted && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1, times: [0, 0.2, 1] }}
                        className="absolute inset-0 bg-[#F6F5FA] dark:bg-zinc-800 pointer-events-none"
                      />
                    )}

                    <div className="relative z-10 flex items-center gap-4 min-w-0 flex-1">
                      <div className="w-10 h-10 pl-0.5 rounded-full bg-[#FEFEFE] dark:bg-zinc-800 flex items-center justify-center border border-[#E5E5E9] dark:border-zinc-700 shadow-2xs shrink-0">
                        <BsChatFill className="w-5 h-5 text-[#D5D4E0] dark:text-zinc-500" fill="currentColor" />
                      </div>
                      <span className="font-bold text-[#262626] dark:text-zinc-100 truncate">
                        {item.text}
                      </span>
                    </div>

                    <button
                      title="pin"
                      type="button"
                      onClick={(e) => { e.stopPropagation(); togglePin(item.id); }}
                      className={`relative z-10 w-10 h-10 shrink-0 flex items-center justify-center rounded-full transition-all
                          ${item.isPinned ? "text-[#6B6A72] dark:text-zinc-400 opacity-100" : "opacity-0 group-hover:opacity-80 text-[#ADACB8] dark:text-zinc-500 hover:text-[#6A6970] dark:hover:text-zinc-300"}`}
                    >
                      <Pin className="w-5 h-5" fill="currentColor" />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#fefefe] dark:from-zinc-900 to-transparent pointer-events-none rounded-b-[40px]" />
    </div>
  );
};