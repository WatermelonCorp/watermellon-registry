"use client";

import { useState, useEffect, type ReactNode, type FC } from "react";
import { motion, AnimatePresence, LayoutGroup, type Transition } from "motion/react";
import { ChevronRight, X, Coffee, Sun, Moon } from "lucide-react";
import { FaCarrot, FaGraduationCap, FaPills, FaPlug } from "react-icons/fa";
import { TbHomeFilled, TbPlayerPlayFilled } from "react-icons/tb";
import { FaBottleWater } from "react-icons/fa6";
import { MdWifi } from "react-icons/md";
import { BsFillMouse2Fill } from "react-icons/bs";
import { IoGameController } from "react-icons/io5";

// --- Types ---
export interface CollectionItem {
  id: string;
  name: string;
  price: number;
  icon: ReactNode;
}

export interface Collection {
  id: string;
  name: string;
  items: CollectionItem[];
}

interface DisclosureCardProps {
  collections?: Collection[];
}

// --- Default Collections ---

const DEFAULT_COLLECTIONS: Collection[] = [
  {
    id: "daily-needs", name: "Daily Needs", items: [{ id: "dn-1", name: "Groceries", price: 500.56, icon: <FaCarrot size={32} /> },
    { id: "dn-2", name: "Snacks & Beverages", price: 45.2, icon: <Coffee size={32} /> },
    { id: "dn-3", name: "Essentials", price: 120.34, icon: <TbHomeFilled size={32} /> },
    { id: "dn-4", name: "Health & Wellness", price: 75.8, icon: <FaPills size={32} /> },],
  },
  {
    id: "utilities", name: "Utilities", items: [{ id: "u-1", name: "Electricity", price: 150, icon: <FaPlug className="rotate-90" size={28} /> },
    { id: "u-2", name: "Water", price: 50, icon: <FaBottleWater size={28} /> },
    { id: "u-3", name: "Internet", price: 100, icon: <MdWifi size={32} /> },],
  },
  {
    id: "subscriptions", name: "Subscriptions", items: [{ id: "s-1", name: "Streaming", price: 80, icon: <TbPlayerPlayFilled size={32} /> },
    { id: "s-2", name: "Courses", price: 100, icon: <FaGraduationCap size={32} /> },
    { id: "s-3", name: "Software & Apps", price: 120, icon: <BsFillMouse2Fill size={32} /> },
    { id: "s-4", name: "Games", price: 50, icon: <IoGameController size={32} /> },],
  },];

// --- Transition Config ---
const transition: Transition = {
  type: "spring",
  stiffness: 350,
  damping: 40,
  mass: 1,
};

// --- Component ---
export const DisclosureCard: FC<DisclosureCardProps> = ({ collections }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isDark, setIsDark] = useState<boolean>(false);

  // Theme toggle effect
  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const data = collections || DEFAULT_COLLECTIONS;

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-zinc-950 transition-colors duration-500 p-4">
      {/* THEME TOGGLE */}
      <button
        onClick={() => setIsDark(!isDark)}
        aria-label="Toggle dark mode"
        title="Toggle dark mode"
        className="mb-8 p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all active:scale-95"
      >
        {isDark ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-zinc-600" size={20} />}
      </button>

      <div className="w-full max-w-[400px] space-y-3">
        <LayoutGroup>
          {data.map((collection) => {
            const isExpanded = expandedId === collection.id;

            return (
              <motion.div
                key={collection.id}
                layout
                transition={transition}
                onClick={!isExpanded ? () => toggleExpand(collection.id) : undefined}
                className={`relative overflow-hidden bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800
                  ${isExpanded ? "rounded-3xl p-6" : "rounded-2xl p-4 py-1 cursor-pointer"} shadow-sm transition-colors duration-300`}
                role="region"
                aria-expanded={isExpanded}
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <AnimatePresence mode="popLayout" initial={false}>
                      {!isExpanded && (
                        <motion.div layoutId={`grid-${collection.id}`} transition={transition} className="grid grid-cols-2 gap-1 p-2 rounded-2xl">
                          {collection.items.slice(0, 4).map((item) => (
                            <motion.div key={item.id} layoutId={`icon-${item.id}`} className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-zinc-500">
                              <div className="scale-75">{item.icon}</div>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div>
                      <motion.h3 layout="position" className={`font-bold text-gray-900 dark:text-zinc-100 transition-colors ${isExpanded ? "text-xl" : "text-lg"}`}>
                        {collection.name}
                      </motion.h3>

                      {!isExpanded && (
                        <motion.p layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-base text-gray-500 dark:text-zinc-500 font-medium">
                          {collection.items.length} items
                        </motion.p>
                      )}
                    </div>
                  </div>

                  <AnimatePresence mode="popLayout" initial={false}>
                    {isExpanded ? (
                      <motion.button
                        key="close"
                        initial={{ scale: 0.5, rotate: -45, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        exit={{ scale: 0.5, rotate: 45, opacity: 0 }}
                        transition={transition}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(collection.id);
                        }}
                        aria-label={`Collapse ${collection.name}`}
                        className="w-8 h-8 rounded-full bg-gray-300 dark:bg-zinc-700 hover:bg-gray-400 dark:hover:bg-zinc-600 transition-colors flex items-center justify-center shadow-sm"
                      >
                        <X size={22} strokeWidth={2.5} className="text-white" />
                      </motion.button>
                    ) : (
                      <motion.div key="chevron" layout>
                        <ChevronRight size={28} className="text-gray-300 dark:text-zinc-700" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Expanded Content */}
                <AnimatePresence mode="popLayout">
                  {isExpanded && (
                    <motion.div
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0, transition: { duration: 0.2, ease: "circIn" } }}
                      transition={transition}
                      className="mt-6 space-y-4"
                    >
                      {collection.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between group cursor-default">
                          <div className="flex items-center gap-4">
                            <motion.div layoutId={`icon-${item.id}`} className="w-11 h-11 p-2.5 bg-gray-900 dark:bg-zinc-100 rounded-full flex items-center justify-center text-white dark:text-zinc-900 transition-colors">
                              {item.icon}
                            </motion.div>
                            <div>
                              <div className="font-bold text-lg text-gray-900 dark:text-zinc-100">{item.name}</div>
                              <div className="text-base font-semibold text-gray-500 dark:text-zinc-500">${item.price.toFixed(2)}</div>
                            </div>
                          </div>
                          <ChevronRight size={24} className="text-gray-300 dark:text-zinc-700 group-hover:text-gray-400 dark:group-hover:text-zinc-500 transition-colors" />
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </LayoutGroup>
      </div>
    </div>
  );
};