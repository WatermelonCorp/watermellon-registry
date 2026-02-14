"use client";

import * as React from "react";
import { MoreVertical } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Copy01Icon,
  Delete02Icon,
  FavouriteIcon,
  PencilEdit02Icon,
  Share01Icon,
} from "@hugeicons/core-free-icons";
import { AnimatePresence, LayoutGroup, motion, type Transition, type Variants } from "motion/react";

/* ---------- Types ---------- */
export interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}

export interface InlineDisclosureMenuProps {
  menuItems?: MenuItemProps[];
  showDelete?: boolean;
  onDelete?: () => void;
}

/* ---------- Motion ---------- */
const spring: Transition = { type: "spring", stiffness: 320, damping: 26 };

const menuVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: spring },
};

/* ---------- Item ---------- */
const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  label,
  onClick,
  className = "",
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 sm:gap-4
      px-3 py-2 rounded-xl
      text-[#363538] dark:text-zinc-200
      hover:bg-[#F6F5FA] dark:hover:bg-zinc-800
      transition-colors text-left ${className}`}
  >
    <span className="text-gray-500 dark:text-zinc-400">{icon}</span>
    <span className="text-base sm:text-[18px] font-medium tracking-tight">
      {label}
    </span>
  </button>
);

/* ---------- Main ---------- */
export function InlineDisclosureMenu({
  menuItems = [
    { icon: <HugeiconsIcon icon={PencilEdit02Icon} size={24} />, label: "Edit" },
    { icon: <HugeiconsIcon icon={Copy01Icon} size={24} />, label: "Duplicate" },
    {
      icon: <HugeiconsIcon icon={FavouriteIcon} size={24} />,
      label: "Favourite",
    },
    { icon: <HugeiconsIcon icon={Share01Icon} size={24} />, label: "Share" },
  ],
  showDelete = true,
  onDelete,
}: InlineDisclosureMenuProps) {
  const [open, setOpen] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  /* click outside */
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setConfirm(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative flex justify-center w-full">
      <div ref={ref} className="relative">
        {/* Trigger */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen((v) => !v)}
          className="w-12 h-12 sm:w-14 sm:h-14
            flex items-center justify-center
            rounded-2xl bg-white dark:bg-zinc-900
            border-2 border-[#EEEEF2] dark:border-zinc-800
            text-gray-500 dark:text-zinc-400"
        >
          <MoreVertical className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>

        {/* Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="absolute z-50
                left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                w-[260px] sm:w-[304px]
                bg-white dark:bg-zinc-900
                border-2 border-[#EEEEF2] dark:border-zinc-800
                rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Header */}
              <div
                className="px-4 py-2 sm:px-6
                bg-[#FAFAFC] dark:bg-zinc-800/50
                border-b-2 border-[#EEEEF2] dark:border-zinc-800"
              >
                <span className="text-sm sm:text-[16px] text-[#828287] dark:text-zinc-500 font-medium">
                  More Options
                </span>
              </div>

              <LayoutGroup>
                <div className="px-2 py-2 flex flex-col gap-2">
                  {menuItems.map((item, i) => (
                    <MenuItem key={i} {...item} />
                  ))}
                </div>

                {showDelete && (
                  <div className="relative border-t-2 border-[#EEEEF2] dark:border-zinc-800 h-[56px]">
                    <AnimatePresence mode="wait">
                      {!confirm ? (
                        <motion.div
                          key="delete"
                          className="absolute inset-0 px-2 flex items-center"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={spring}
                        >
                          <MenuItem
                            icon={
                              <HugeiconsIcon
                                icon={Delete02Icon}
                                size={24}
                                color="#e94447"
                              />
                            }
                            label="Delete"
                            className="text-[#e94447]"
                            onClick={() => setConfirm(true)}
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="confirm"
                          className="absolute inset-0 px-2 flex gap-2 items-center"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={spring}
                        >
                          <button
                            onClick={onDelete}
                            className="flex-1 h-10 rounded-xl
                              bg-[#F24140] text-white font-semibold"
                          >
                            Yes, Delete
                          </button>
                          <button
                            onClick={() => setConfirm(false)}
                            className="flex-1 h-10 rounded-xl
                              border border-gray-200 dark:border-zinc-700
                              text-gray-600 dark:text-zinc-300"
                          >
                            Cancel
                          </button>
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
}
