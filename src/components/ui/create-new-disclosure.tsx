"use client";

import { useState, useEffect, type FC, type ReactNode } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  Cancel01Icon,
  Folder01Icon,
  TaskEdit01Icon,
  NoteIcon,
  Award01Icon,
  Flag02Icon,
  Calendar04Icon,
} from "@hugeicons/core-free-icons";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

/* --- Types --- */

export interface DisclosureItem {
  icon: ReactNode;
  label: string;
}

export interface CreateNewDisclosureProps {
  items?: DisclosureItem[];
  initialOpen?: boolean;
  showThemeToggle?: boolean;
}

/* --- Sub-Component --- */

interface GridItemProps {
  icon: ReactNode;
  label: string;
  isDark: boolean;
}

const GridItem: FC<GridItemProps> = ({ icon, label }) => {
  return (
    <motion.button
      className="group flex flex-col items-center gap-2
                 rounded-[18px] px-5 py-4
                 transition-colors
                 hover:bg-[#F6F5EE] dark:hover:bg-zinc-900"
    >
      <div className="text-[#B8B6B5] dark:text-zinc-500 transition-colors group-hover:text-[#8F8D8C] dark:group-hover:text-zinc-300">
        {icon}
      </div>
      <span className="text-[15px] text-[#565656] dark:text-zinc-400 transition-colors group-hover:text-[#3F3F3F] dark:group-hover:text-zinc-200 font-medium">
        {label}
      </span>
    </motion.button>
  );
};

/* --- Main Component --- */

export const CreateNewDisclosure: FC<CreateNewDisclosureProps> = ({
  items,
  initialOpen = false,
  showThemeToggle = true,
}) => {
  const [open, setOpen] = useState<boolean>(initialOpen);
  const [isDark, setIsDark] = useState<boolean>(false);

  const defaultItems: DisclosureItem[] = [
    { icon: <HugeiconsIcon icon={Folder01Icon} size={30} strokeWidth={1.5} />, label: "Project" },
    { icon: <HugeiconsIcon icon={TaskEdit01Icon} size={30} strokeWidth={1.5} />, label: "Task" },
    { icon: <HugeiconsIcon icon={NoteIcon} size={30} strokeWidth={1.5} />, label: "Note" },
    { icon: <HugeiconsIcon icon={Award01Icon} size={30} strokeWidth={1.5} />, label: "Goal" },
    { icon: <HugeiconsIcon icon={Flag02Icon} size={30} strokeWidth={1.5} />, label: "Milestone" },
    { icon: <HugeiconsIcon icon={Calendar04Icon} size={30} strokeWidth={1.5} />, label: "Reminder" },
  ];

  const disclosureItems = items || defaultItems;

  // Theme Sync
  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-zinc-950 transition-colors duration-500 p-6">
      {/* Theme Toggle */}
      {showThemeToggle && (
        <button
          onClick={() => setIsDark(!isDark)}
          className="mb-12 p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all active:scale-90 shadow-sm"
        >
          {isDark ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-zinc-500" size={20} />}
        </button>
      )}

      <motion.div
        layout
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
        className={`relative overflow-hidden border-2 border-[#e7e6e6] dark:border-zinc-800
           ${open ? "bg-[#F7F5EE] dark:bg-zinc-900 shadow-xl rounded-3xl" : "bg-transparent rounded-full"}`}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {!open ? (
            /* COLLAPSED STATE */
            <motion.button
              key="collapsed"
              layoutId="shared-container"
              onClick={() => setOpen(true)}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-[#FAFBF8] dark:bg-zinc-900 text-[#626360] dark:text-zinc-400 text-lg font-medium shadow-md whitespace-nowrap"
            >
              <motion.div layout="position" className="flex items-center gap-2">
                <HugeiconsIcon icon={Add01Icon} size={26} color={isDark ? "#a1a1aa" : "#626360"} strokeWidth={1.5} />
                Create New
              </motion.div>
            </motion.button>
          ) : (
            /* EXPANDED STATE */
            <motion.div
              key="expanded"
              layoutId="shared-container"
              initial={{ opacity: 0, filter: "blur(6px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(6px)", transition: { duration: 0.1 } }}
              className="w-92 h-full"
            >
              {/* HEADER */}
              <div className="flex items-center justify-between px-6 py-4">
                <p className="text-lg font-medium text-[#6F6D69] dark:text-zinc-400">Create New</p>
                <motion.button
                  onClick={() => setOpen(false)}
                  whileTap={{ scale: 0.9 }}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[#BAB6B0] dark:bg-zinc-700 cursor-pointer"
                >
                  <HugeiconsIcon icon={Cancel01Icon} size={20} color="#ffffff" strokeWidth={1.5} />
                </motion.button>
              </div>

              {/* GRID */}
              <div className="grid grid-cols-3 gap-6 px-6 py-6 mt-2 bg-[#FEFEFE] dark:bg-zinc-950 rounded-3xl border-2 border-[#e7e6e6] dark:border-zinc-800/50 shadow-inner">
                {disclosureItems.map((item, index) => (
                  <GridItem key={index} icon={item.icon} label={item.label} isDark={isDark} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};