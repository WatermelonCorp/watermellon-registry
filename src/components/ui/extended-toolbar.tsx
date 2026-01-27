"use client";

import { useState, useEffect, type FC } from "react";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { ChevronRight, ChevronLeft, Sun, Moon } from "lucide-react";
import {
  BsChatLeftFill,
  BsFillArchiveFill,
  BsFillInboxFill,
  BsFillPinAngleFill,
  BsTrash3Fill,
} from "react-icons/bs";
import { IoImage } from "react-icons/io5";
import { PiShareFatFill } from "react-icons/pi";
import { AiFillTag } from "react-icons/ai";
import { type IconType } from "react-icons";

/* --- Types --- */
interface ToolbarItem {
  icon: IconType;
  label: string;
  size: number;
  onClick?: () => void;
}

interface ToolbarIconProps extends ToolbarItem {}

interface ExtendedToolbarProps {
  primaryItems?: ToolbarItem[];
  secondaryItems?: ToolbarItem[];
  defaultExpanded?: boolean;
  showThemeToggle?: boolean;
}

const springTransition: Transition = {
  stiffness: 300,
  damping: 30,
};

/* --- Default Items  --- */
const DEFAULT_PRIMARY: ToolbarItem[] = [
  { icon: BsFillInboxFill, size: 28, label: "Inbox" },
  { icon: BsChatLeftFill, size: 22, label: "Chat" },
  { icon: BsFillPinAngleFill, size: 28, label: "Pin" },
  { icon: AiFillTag, size: 28, label: "Tag" },
];

const DEFAULT_SECONDARY: ToolbarItem[] = [
  { icon: IoImage, size: 28, label: "Image" },
  { icon: BsFillArchiveFill, size: 26, label: "Archive" },
  { icon: PiShareFatFill, size: 28, label: "Share" },
  { icon: BsTrash3Fill, size: 28, label: "Delete" },
];

/* --- Main Component --- */
export const ExtendedToolbar: FC<ExtendedToolbarProps> = ({
  primaryItems = DEFAULT_PRIMARY,
  secondaryItems = DEFAULT_SECONDARY,
  defaultExpanded = false,
  showThemeToggle = true,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  return (
    <div className="relative flex flex-col justify-center items-center h-screen w-full bg-white dark:bg-zinc-950 transition-colors duration-500">
      
      {showThemeToggle && (
        <button
          onClick={() => setIsDark(!isDark)}
          className="mb-12 p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all active:scale-90"
        >
          {isDark ? (
            <Sun className="text-yellow-400" size={20} />
          ) : (
            <Moon className="text-zinc-500" size={20} />
          )}
        </button>
      )}

      <motion.div
        layout
        transition={springTransition}
        className="flex items-center gap-2 px-2 py-2 bg-[#F4F4F9] dark:bg-zinc-900/90 border border-[#f4f4f9e2] dark:border-zinc-800 backdrop-blur-md rounded-full shadow-xs shadow-slate-200/50 dark:shadow-none w-fit"
        style={{ borderRadius: 32, minWidth: "220px", height: "64px" }}
      >
        {/* Toggle */}
        <motion.button
          layout
          onClick={() => setIsExpanded(!isExpanded)}
          transition={springTransition}
          className="relative flex items-center justify-center w-12 h-12 bg-[#FEFEFE] dark:bg-zinc-800 rounded-full shadow-xs z-10 focus:outline-none border border-transparent dark:border-zinc-700"
          style={{ order: isExpanded ? 0 : 2 }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {isExpanded ? (
              <motion.div
                key="back"
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronLeft color="#858489" size={38} strokeWidth={2} className="dark:text-zinc-400" />
              </motion.div>
            ) : (
              <motion.div
                key="forward"
                initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight color="#858489" size={38} strokeWidth={2} className="dark:text-zinc-400" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Icons */}
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            {!isExpanded ? (
              <motion.div
                key="primary"
                className="flex items-center gap-2.5"
                initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                transition={{ ...springTransition, opacity: { duration: 0.2 } }}
              >
                {primaryItems.map((item) => (
                  <ToolbarIcon key={item.label} {...item} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="secondary"
                className="flex items-center gap-2.5"
                initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                transition={{ ...springTransition, opacity: { duration: 0.2 } }}
              >
                {secondaryItems.map((item) => (
                  <ToolbarIcon key={item.label} {...item} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

/* --- Toolbar Icon --- */
const ToolbarIcon: FC<ToolbarIconProps> = ({ icon: Icon, label, size, onClick }) => {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="p-2 text-[#66666F] dark:text-zinc-500 hover:dark:text-zinc-300 transition-colors focus:outline-none"
    >
      <Icon size={size} />
    </button>
  );
};
