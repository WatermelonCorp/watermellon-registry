"use client";

import { type FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
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
import type { IconType } from "react-icons";

/* ---------- Types ---------- */
export interface ToolbarItem {
  icon: IconType;
  label: string;
  size: number;
  onClick?: () => void;
}

export interface ExtendedToolbarProps {
  primaryItems?: ToolbarItem[];
  secondaryItems?: ToolbarItem[];
  defaultExpanded?: boolean;
  showThemeToggle?: boolean;
}

/* ---------- Motion ---------- */
const springTransition = {
  stiffness: 300,
  damping: 30,
} as const;

/* ---------- Defaults ---------- */
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

/* ---------- Component ---------- */
export const ExtendedToolbar: FC<ExtendedToolbarProps> = ({
  primaryItems = DEFAULT_PRIMARY,
  secondaryItems = DEFAULT_SECONDARY,
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);

  return (
   <div className="relative flex w-full items-center justify-center bg-transparent transition-colors duration-500 px-4">
      {/* Toolbar */}
      <motion.div
        layout
        transition={springTransition}
        className="
          flex items-center gap-2 px-2 py-2
          bg-[#F4F4F9] dark:bg-zinc-900/90
          border border-[#f4f4f9e2] dark:border-zinc-800
          backdrop-blur-md rounded-full
          shadow-sm shadow-slate-200/50 dark:shadow-none
          w-fit min-w-55 h-16
        "
      >
        {/* Toggle */}
        <motion.button
          layout
          onClick={() => setIsExpanded((v) => !v)}
          transition={springTransition}
          style={{ order: isExpanded ? 0 : 2 }}
          className="
            relative z-10 flex h-12 w-12
            items-center justify-center
            rounded-full bg-[#FEFEFE] dark:bg-zinc-800
            border border-transparent dark:border-zinc-700
            shadow-sm focus:outline-none
          "
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {isExpanded ? (
              <motion.div
                key="left"
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronLeft size={36} strokeWidth={2} className="text-[#858489] dark:text-zinc-400" />
              </motion.div>
            ) : (
              <motion.div
                key="right"
                initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight size={36} strokeWidth={2} className="text-[#858489] dark:text-zinc-400" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Icons */}
        <div className="flex flex-1 items-center justify-center overflow-hidden">
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

/* ---------- Icon ---------- */
const ToolbarIcon: FC<ToolbarItem> = ({ icon: Icon, label, size, onClick }) => (
  <button
    aria-label={label}
    onClick={onClick}
    className="
      p-2 text-[#66666F] dark:text-zinc-500
      hover:text-[#2d2d34] hover:dark:text-zinc-300
      transition-colors focus:outline-none
    "
  >
    <Icon size={size} />
  </button>
);
