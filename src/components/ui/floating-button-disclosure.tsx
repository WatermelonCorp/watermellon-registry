"use client";

import { useState, useEffect, type FC } from "react";
import { motion, AnimatePresence, type Transition } from "motion/react";
import { Plus, X, Sun, Moon } from "lucide-react";
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

interface DisclosureItemProps extends MenuItem {}

interface FloatingDisclosureProps {
  items?: MenuItem[];
}

/* --- Constants --- */
const SPRING: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 34,
  mass: 0.9,
};

/* --- Sub-Components --- */
const DisclosureItem: FC<DisclosureItemProps> = ({ icon, title, description }) => {
  return (
    <motion.div
      initial={{ backgroundColor: "transparent", scale: 1 }}
      whileHover={{ backgroundColor: "rgba(0,0,0,0.03)", scale: 0.995 }}
      whileTap={{ scale: 0.97 }}
      transition={SPRING}
      className="flex items-center gap-4 p-3.5 py-3 rounded-[20px] cursor-pointer dark:hover:bg-zinc-800/50"
    >
      <div className="w-11 h-11 rounded-xl bg-[#F4F2EE] dark:bg-zinc-800 flex items-center justify-center shrink-0 shadow-sm">
        {icon}
      </div>

      <div className="flex flex-col">
        <p className="text-[18px] font-bold text-[#282828]/90 dark:text-zinc-100 leading-tight">
          {title}
        </p>
        <p className="text-[16px] text-[#8E8D88] dark:text-zinc-400 mt-1 opacity-80">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

/* --- Main Component --- */
export const FloatingDisclosure: FC<FloatingDisclosureProps> = ({
  items = [
    {
      title: "Task",
      description: "Create a new task",
      icon: <BsFileTextFill size={22} className="text-[#8F8B85] dark:text-zinc-500" />,
    },
    {
      title: "Reminder",
      description: "Create reminders with alerts",
      icon: <FaBell size={22} className="text-[#8F8B85] dark:text-zinc-500" />,
    },
    {
      title: "Note",
      description: "Capture ideas on the fly",
      icon: <TbFileFilled size={22} className="text-[#8F8B85] dark:text-zinc-500" />,
    },
    {
      title: "Project",
      description: "Organise better with projects",
      icon: <IoIosFolder size={22} className="text-[#8F8B85] dark:text-zinc-500" />,
    },
  ],
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-500 overflow-hidden">
      
      {/* Theme Toggle */}
      <button 
        onClick={() => setIsDark(!isDark)}
        className="absolute top-40 p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all active:scale-90"
      >
        {isDark ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-zinc-500" size={20} />}
      </button>

      <AnimatePresence mode="popLayout">
        {!isOpen ? (
          /* PLUS BUTTON */
          <motion.button
            key="plus"
            layoutId="menu-container"
            onClick={toggleMenu}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileTap={{ scale: 0.96 }}
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 26,
              mass: 0.9,
            }}
            className="flex items-center justify-center bg-[#F0ECE6] dark:bg-zinc-900
            w-[152px] h-[64px] rounded-[32px] shadow-[0_1px_3px_rgba(0,0,0,0.1)]
            border border-black/5 dark:border-zinc-800 overflow-hidden relative"
          >
            <Plus
              size={26}
              strokeWidth={2.5}
              className="text-[#8e8a84] dark:text-zinc-400"
            />
          </motion.button>

        ) : (
          /* EXPANDED MENU */
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1, y: -20 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={SPRING}
            className="flex flex-col items-center gap-[16px] z-50"
          >
            {/* CLOSE BUTTON */}
            <motion.button
              onClick={toggleMenu}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ ...SPRING, delay: 0.1 }}
              className="w-[80px] h-[56px] bg-[#F0ECE6] dark:bg-zinc-900 rounded-full
              flex items-center justify-center
              shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-[#F0ECE6]/95 dark:border-zinc-800
              active:scale-90"
            >
              <X size={26} strokeWidth={2.5} className="text-[#8e8a84] dark:text-zinc-400" />
            </motion.button>

            {/* PANEL */}
            <motion.div
              layoutId="menu-container"
              className="w-[380px] bg-[#FEFEFE] dark:bg-zinc-900 rounded-[32px]
              border border-[#E8EAE9] dark:border-zinc-800 p-[12px] shadow-sm dark:shadow-2xl"
            >
              <div className="flex flex-col gap-[10px]">
                {items.map((item, i) => (
                  <motion.div className="text-[#8F8B85] dark:text-zinc-500"
                    key={item.title}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ...SPRING, delay: 0.1 + i * 0.04 }}
                  >
                    <DisclosureItem {...item} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
