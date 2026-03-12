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
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  type Transition,
  type Variants,
} from "motion/react";

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

const spring: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.4,
};

const menuVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: spring },
};

const deleteVariants: Variants = {
  initial: (confirm: boolean) => ({
    y: confirm ? 60 : -60,
  }),
  animate: {
    y: 0,
    transition: spring,
  },
  exit: (confirm: boolean) => ({
    y: confirm ? -60 : 60,
    transition: spring,
  }),
};

const confirmVariants: Variants = {
  initial: (confirm: boolean) => ({
    y: confirm ? 60 : -60,
  }),
  animate: {
    y: 0,
    transition: spring,
  },
  exit: (confirm: boolean) => ({
    y: confirm ? -60 : 60,
    transition: spring,
  }),
};

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  label,
  onClick,
  className = "",
}) => (
  <button
    onClick={onClick}
    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-[#363538] transition-colors hover:bg-[#F6F5FA] sm:gap-4 dark:text-zinc-200 dark:hover:bg-zinc-800 ${className}`}
  >
    <span className="text-gray-500 dark:text-zinc-400">{icon}</span>
    <span className="text-base font-medium tracking-tight sm:text-[18px]">
      {label}
    </span>
  </button>
);

export function InlineDisclosureMenu({
  menuItems = [
    {
      icon: <HugeiconsIcon icon={PencilEdit02Icon} size={24} />,
      label: "Edit",
    },
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
    <div className="relative flex w-full justify-center">
      <div ref={ref} className="relative">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen((v) => !v)}
          className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-[#EEEEF2] bg-white text-gray-500 sm:h-14 sm:w-14 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
        >
          <MoreVertical className="h-5 w-5 sm:h-6 sm:w-6" />
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="absolute top-1/2 left-1/2 z-50 w-[260px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border-2 border-[#EEEEF2] bg-white shadow-xl sm:w-[304px] dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="border-b-2 border-[#EEEEF2] bg-[#FAFAFC] px-4 py-2 sm:px-6 dark:border-zinc-800 dark:bg-zinc-800/50">
                <span className="text-sm font-medium text-[#828287] sm:text-[16px] dark:text-zinc-500">
                  More Options
                </span>
              </div>

              <LayoutGroup>
                <div className="flex flex-col gap-2 px-2 py-2">
                  {menuItems.map((item, i) => (
                    <MenuItem key={i} {...item} />
                  ))}
                </div>

                {showDelete && (
                  <div className="relative h-[56px] overflow-hidden border-t-2 border-[#EEEEF2] dark:border-zinc-800">
                    <AnimatePresence
                      custom={confirm}
                      mode="popLayout"
                      initial={false}
                    >
                      {!confirm ? (
                        <motion.div
                          key="delete"
                          custom={confirm}
                          variants={deleteVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          className="absolute inset-0 flex items-center px-2"
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
                            className="cursor-pointer text-[#e94447]"
                            onClick={() => setConfirm(true)}
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="confirm"
                          custom={confirm}
                          variants={confirmVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          className="absolute inset-0 flex items-center gap-2 px-2"
                        >
                          <button
                            onClick={onDelete}
                            className="h-10 flex-1 cursor-pointer rounded-xl bg-[#F24140] font-semibold text-white"
                          >
                            Yes, Delete
                          </button>

                          <button
                            onClick={() => setConfirm(false)}
                            className="h-10 flex-1 cursor-pointer rounded-xl border border-gray-200 text-gray-600 dark:border-zinc-700 dark:text-zinc-300"
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
