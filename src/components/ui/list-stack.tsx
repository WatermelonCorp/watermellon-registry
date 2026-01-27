"use client";

import { useState, useEffect,type FC } from "react";
import { motion, LayoutGroup,type  Transition } from "framer-motion";
import { ChevronDown, Sun, Moon } from "lucide-react";
import { FaFireFlameCurved, FaSailboat } from "react-icons/fa6";
import { LuTent } from "react-icons/lu";
import { type IconType } from "react-icons";

// --- Types ---
 interface ListItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  icon: IconType;
}

interface ListStackProps {
  items?: ListItem[]; 
}

// --- Default Items ---
const ITEMS: ListItem[] = [
    {
        id: '1',
        title: 'Camping',
        subtitle: 'Yosemite Park',
        date: '5 August',
        icon: LuTent, 
    },
    {
        id: '2',
        title: 'Boating',
        subtitle: 'Lake Tahoe Park',
        date: '2 August',
        icon: FaSailboat,
    },
    {
        id: '3',
        title: 'Barbecue',
        subtitle: 'Greenfield Shores',
        date: '28 July',
        icon: FaFireFlameCurved,
    },
];

// --- ListStack Component ---
export const ListStack: FC<ListStackProps> = ({ items = ITEMS }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(false);

  // Theme Toggle Effect
  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  const springConfig: Transition = {
    type: "spring",
    stiffness: 350,
    damping: 32,
    mass: 1,
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-zinc-950 transition-colors duration-500 overflow-hidden">
      
      {/* THEME TOGGLE */}
      <button
        onClick={() => setIsDark(!isDark)}
        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        aria-label="Toggle Theme"
        className="mb-12 p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all hover:scale-110 active:scale-90"
      >
        {isDark ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-zinc-600" size={20} />}
      </button>

      <div className="flex flex-col items-center select-none w-full px-4">
        <div className="relative w-full max-w-[400px]">
          <LayoutGroup>
            <motion.div
              layout
              className={`flex flex-col w-full ${isExpanded ? 'gap-3' : 'h-32 items-center'}`}
              transition={springConfig}
              role="list"
              aria-label="Recent Activities"
            >
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  style={{
                    zIndex: isExpanded ? 1 : items.length - index,
                    position: isExpanded ? "relative" : "absolute",
                    width: "100%",
                  }}
                  initial={false}
                  animate={{
                    y: isExpanded ? 0 : index * 12,
                    scale: isExpanded ? 1 : 1 - index * 0.05,
                    opacity: isExpanded ? 1 : 1 - index * 0.1,
                  }}
                  transition={springConfig}
                  className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-[22px] p-5 flex items-center justify-between shadow-md dark:shadow-2xl transition-colors duration-300"
                  role="listitem"
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      layout
                      className="w-14 h-14 rounded-xl flex items-center justify-center shadow-inner transition-colors duration-300 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                    >
                      <item.icon size={24} />
                    </motion.div>

                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-gray-900 dark:text-zinc-100 leading-tight">
                        {item.title}
                      </span>
                      <span className="text-base text-gray-500 dark:text-zinc-500 font-medium mt-1">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 dark:text-zinc-500 font-bold pt-6">
                    {item.date}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </LayoutGroup>
        </div>

        {/* EXPAND BUTTON */}
        <motion.button
          layout
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          className="z-50 mt-10 flex items-center gap-2 px-6 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full text-sm font-bold text-zinc-700 dark:text-zinc-300 shadow-sm transition-transform active:scale-95"
        >
          {isExpanded ? "Hide" : "Show All"}
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
            <ChevronDown size={18} />
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
};