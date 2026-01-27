"use client";

import { useState, useRef, useEffect, type FC } from "react";
import { motion, AnimatePresence, LayoutGroup, type Variants, type Transition } from "framer-motion";
import { MoreVertical, Sun, Moon } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Copy01Icon,
  Delete02Icon,
  FavouriteIcon,
  PencilEdit02Icon,
  Share01Icon
} from "@hugeicons/core-free-icons";

/* --- Types --- */
interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}

interface InlineDisclosureMenuProps {
  menuItems?: MenuItemProps[];
  showDelete?: boolean;
  onDelete?: () => void;
}

/* --- Constants --- */
const springTransition:Transition = {
  type: "spring",
  stiffness: 320,
  damping: 26,
};

const menuVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: springTransition },
};

/* --- Sub-Components --- */
const MenuItem: FC<MenuItemProps> = ({ icon, label, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-3 rounded-xl py-2 text-[#363538] dark:text-zinc-200
      hover:bg-[#F6F5FA] dark:hover:bg-zinc-800 transition-colors duration-200 text-left
      active:bg-gray-100 dark:active:bg-zinc-700 ${className}`}
  >
    <span className="text-gray-500 dark:text-zinc-400">{icon}</span>
    <span className="text-[18px] font-medium tracking-tight">{label}</span>
  </button>
);

/* --- Main Component --- */
export const InlineDisclosureMenu: FC<InlineDisclosureMenuProps> = ({
  menuItems = [
    { icon: <HugeiconsIcon icon={PencilEdit02Icon} size={26} strokeWidth={1.5} />, label: "Edit" },
    { icon: <HugeiconsIcon icon={Copy01Icon} size={26} strokeWidth={1.5} />, label: "Duplicate" },
    { icon: <HugeiconsIcon icon={FavouriteIcon} size={26} strokeWidth={1.5} />, label: "Favourite" },
    { icon: <HugeiconsIcon icon={Share01Icon} size={26} strokeWidth={1.5} />, label: "Share" },
  ] as MenuItemProps[],
  showDelete = true,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Theme Sync
  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  // Handle Click Outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setShowConfirm(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative h-screen w-full select-none flex flex-col items-center justify-center bg-[#FEFEFE] dark:bg-zinc-950 transition-colors duration-500">

      {/* Theme Toggle */}
      <button
        onClick={() => setIsDark(!isDark)}
        className="mb-12 p-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm active:scale-90 transition-all"
      >
        {isDark ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-zinc-500" size={20} />}
      </button>

      {/* Wrapper */}
      <div ref={wrapperRef} className="relative">
        {/* Trigger */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen((v) => !v)}
          className={`w-[56px] h-[56px] flex items-center justify-center
            bg-[#FEFEFE] dark:bg-zinc-900 rounded-2xl
            border-2 border-[#EEEEF2] dark:border-zinc-800
            shadow-[inset_0_-4px_4px_rgba(0,0,0,0.06)] dark:shadow-none
            text-gray-500 dark:text-zinc-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-200
            ${isOpen ? "bg-gray-50 dark:bg-zinc-800" : ""}`}
        >
          <MoreVertical size={24} />
        </motion.button>

        {/* Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              layout
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="absolute -left-1/2 -top-1/2 -translate-x-1/2 -translate-y-1/2
                w-[304px] border-2 border-[#EEEEF2] dark:border-zinc-800
                bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden z-50 shadow-xl"
            >
              {/* Header */}
              <div className="pt-[8px] pb-[8px] px-[24px] bg-[#FAFAFC] dark:bg-zinc-800/50 border-b-2 border-[#EEEEF2] dark:border-zinc-800">
                <span className="text-[16px] text-[#828287] dark:text-zinc-500 font-medium">More Options</span>
              </div>

              <LayoutGroup>
                <div className="px-[8px] flex flex-col gap-[16px] py-[8px]">
                  {menuItems.map((item, idx) => (
                    <MenuItem
                      key={idx}
                      icon={
                        <HugeiconsIcon
                          icon={(item.icon as any)?.props?.icon ?? PencilEdit02Icon}
                          size={26}
                          color={isDark ? "#a1a1aa" : "#5e5d62"}
                          strokeWidth={1.5}
                        />
                      }
                      label={item.label}
                      onClick={item.onClick}
                    />
                  ))}
                </div>

                {/* Delete Section */}
                {showDelete && (
                  <div className="relative border-t-2 border-[#EEEEF2] dark:border-zinc-800 h-[60px] overflow-hidden">
                    <AnimatePresence mode="wait">
                      {!showConfirm ? (
                        <motion.div
                          key="delete"
                          className="absolute inset-0 flex items-center px-[8px]"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={springTransition}
                        >
                          <MenuItem
                            icon={<HugeiconsIcon icon={Delete02Icon} size={26} color="#e94447" strokeWidth={1.5} />}
                            label="Delete"
                            className="text-[#e94447] hover:bg-[#faf2f4] dark:hover:bg-red-500/10"
                            onClick={() => setShowConfirm(true)}
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="confirm"
                          className="absolute inset-0 flex items-center justify-center px-[8px] gap-[8px]"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={springTransition}
                        >
                          <motion.button
                            whileTap={{ scale: 0.98 }}
                            className="w-full h-[46px] bg-[#F24140] text-[#FFE4E6] rounded-[14px] font-semibold text-base shadow-sm"
                            onClick={onDelete}
                          >
                            Yes, Delete
                          </motion.button>

                          <motion.button
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowConfirm(false)}
                            className="w-full h-[46px] bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-zinc-300 rounded-[14px] font-semibold text-base hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors shadow-sm"
                          >
                            Cancel
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </LayoutGroup>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

