"use client";

import React, { useState, type FC  } from "react";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { Plus, X} from "lucide-react";
import { BsFileTextFill } from "react-icons/bs";
import { FaBell } from "react-icons/fa6";
import { TbFileFilled } from "react-icons/tb";
import { IoIosFolder } from "react-icons/io";

/* --- Types --- */
interface MenuItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface FloatingDisclosureProps {
  items?: MenuItem[];
}

/* --- Animation --- */
const SPRING : Transition = {
  type: "spring",
  stiffness: 420,
  damping: 34,
  mass: 0.9,
};

/* --- Item --- */
const DisclosureItem: FC<MenuItem> = ({ icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ scale: 0.985 }}
      whileTap={{ scale: 0.97 }}
      transition={SPRING}
      className="flex items-center gap-4 p-3 rounded-2xl cursor-pointer
                 hover:bg-black/5 dark:hover:bg-zinc-800/60"
    >
      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#F4F2EE] dark:bg-zinc-800
                      flex items-center justify-center shrink-0">
        {icon}
      </div>

      <div className="flex flex-col">
        <p className="text-[16px] sm:text-[18px] font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </p>
        <p className="text-[14px] sm:text-[16px] text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

/* --- Main --- */
export const FloatingDisclosure: FC<FloatingDisclosureProps> = ({
  items = [
    {
      title: "Task",
      description: "Create a new task",
      icon: <BsFileTextFill size={20} className="text-zinc-500" />,
    },
    {
      title: "Reminder",
      description: "Create reminders",
      icon: <FaBell size={20} className="text-zinc-500" />,
    },
    {
      title: "Note",
      description: "Capture ideas",
      icon: <TbFileFilled size={20} className="text-zinc-500" />,
    },
    {
      title: "Project",
      description: "Organise projects",
      icon: <IoIosFolder size={20} className="text-zinc-500" />,
    },
  ],
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative min-h-full w-full flex items-center justify-center
                    bg-white dark:bg-zinc-950 transition-colors">

      <AnimatePresence mode="popLayout">
        {!isOpen ? (
          /* PLUS BUTTON */
          <motion.button
            key="plus"
            layoutId="menu"
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            whileTap={{ scale: 0.95 }}
            transition={SPRING}
            className="w-32 h-14 sm:w-38 sm:h-16]
                       rounded-full bg-[#F0ECE6] dark:bg-zinc-900
                       border border-black/5 dark:border-zinc-800
                       flex items-center justify-center shadow-sm"
          >
            <Plus size={24} className="text-zinc-500" />
          </motion.button>
        ) : (
          /* EXPANDED */
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, y: -12 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={SPRING}
            className="flex flex-col items-center gap-3 px-3"
          >
            {/* Close */}
            <motion.button
              onClick={() => setIsOpen(false)}
              whileTap={{ scale: 0.9 }}
              className="w-18 h-12 rounded-full
                         bg-[#F0ECE6] dark:bg-zinc-900
                         border border-black/5 dark:border-zinc-800
                         flex items-center justify-center"
            >
              <X size={22} className="text-zinc-500" />
            </motion.button>

            {/* Panel */}
            <motion.div
              layoutId="menu"
              className="w-[92vw] max-w-95
                         bg-white dark:bg-zinc-900
                         rounded-3xl border border-zinc-200 dark:border-zinc-800
                         p-3 shadow-lg"
            >
              <div className="flex flex-col gap-2">
                {items.map((item) => (
                  <DisclosureItem key={item.title} {...item} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
