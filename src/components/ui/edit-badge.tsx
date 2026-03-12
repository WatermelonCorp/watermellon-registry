import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  type Transition,
} from "motion/react";
import { X, Loader2 } from "lucide-react";
import { BiSolidPencil } from "react-icons/bi";
import { FaCircleCheck } from "react-icons/fa6";
import { BsDashCircleFill } from "react-icons/bs";
import { MdTimelapse } from "react-icons/md";
import { LuTimer } from "react-icons/lu";
import { HiPencil } from "react-icons/hi2";

/*  TYPES  */

export type BadgeIconType = "loader" | "clock" | "timer" | "check" | "minus";

export interface BadgeConfig {
  text: string;
  icon: BadgeIconType;
  color: string;
}

const DEFAULT_BADGE: BadgeConfig = {
  text: "Completed",
  icon: "check",
  color: "green",
};

const COLORS = [
  {
    id: "blue",
    bg: "bg-[#016FFE]",
    badgeBg: "bg-[#E7F1FD] dark:bg-[#016FFE]/10",
    text: "text-[#016FFE] dark:text-[#3890FF]",
  },
  {
    id: "yellow",
    bg: "bg-[#2EBE52]",
    badgeBg: "bg-[#E0FAE7] dark:bg-[#2EBE52]/10",
    text: "text-[#2EBE52] dark:text-[#4ADE80]",
  },
  {
    id: "orange",
    bg: "bg-[#FFC405]",
    badgeBg: "bg-[#FBF1DE] dark:bg-[#FFC405]/10",
    text: "text-[#FFC405] dark:text-[#FFD700]",
  },
  {
    id: "green",
    bg: "bg-emerald-500",
    badgeBg: "bg-emerald-50 dark:bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  {
    id: "red",
    bg: "bg-[#FE322B]",
    badgeBg: "bg-[#FCECEC] dark:bg-[#FE322B]/10",
    text: "text-[#FE322B] dark:text-[#FF5C57]",
  },
];

const ICONS: Record<BadgeIconType, React.ElementType> = {
  loader: Loader2,
  clock: MdTimelapse,
  timer: LuTimer,
  check: FaCircleCheck,
  minus: BsDashCircleFill,
};

const springTransition: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 40,
  mass: 1,
};

type EditBadgeProps = {
  initialBadge?: BadgeConfig;
  onChange?: (badge: BadgeConfig) => void;
};

export function EditBadge({
  initialBadge = DEFAULT_BADGE,
  onChange,
}: EditBadgeProps) {
  const [badge, setBadge] = useState<BadgeConfig>(initialBadge);
  const [tempBadge, setTempBadge] = useState<BadgeConfig>(initialBadge);
  const [isEditing, setIsEditing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentColor = COLORS.find((c) => c.id === badge.color) || COLORS[0];
  const IconComponent = ICONS[badge.icon];

  const handleOpen = () => {
    setTempBadge(badge);
    setIsEditing(true);
  };

  const handleUpdate = () => {
    setBadge(tempBadge);
    onChange?.(tempBadge);
    setIsEditing(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsEditing(false);
      }
    };
    if (isEditing) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isEditing]);

  return (
    <div
      className="relative flex h-[400px] items-center justify-center"
      ref={containerRef}
    >
      <MotionConfig transition={springTransition}>
        <AnimatePresence>
          {!isEditing ? (
            <div key="close" className="flex items-center gap-3">
              <motion.div
                layoutId="eb-container"
                style={{
                  borderRadius: 32,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  layoutId="badge-container"
                  className={`flex items-center gap-2.5 rounded-full px-3 py-2.5 sm:px-4 sm:py-3.5 ${currentColor.badgeBg} ${currentColor.text} cursor-default font-bold select-none`}
                >
                  <motion.div layoutId={badge.icon}>
                    <IconComponent
                      className={`h-5 w-5 sm:h-[22px] sm:w-[22px] ${
                        badge.icon === "loader" ? "animate-spin" : ""
                      }`}
                    />
                  </motion.div>
                  <motion.span
                    layoutId="badge-text"
                    className="text-base tracking-tight capitalize sm:text-[18px]"
                  >
                    {badge.text}
                  </motion.span>
                </motion.div>
              </motion.div>
              <motion.button
                onClick={handleOpen}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#edecf0] bg-[#F6F5FA] text-[#28272A] sm:h-[50px] sm:w-[50px] dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-100"
              >
                <BiSolidPencil className="h-6 w-6 fill-current" />
              </motion.button>
            </div>
          ) : (
            <motion.div
              key="open"
              layoutId="eb-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0 } }}
              // transition={bounceTransition}
              style={{
                borderRadius: 24,
              }}
              className="absolute top-1/2 left-1/2 z-10 w-xs origin-left -translate-x-1/2 -translate-y-1/2 rounded-3xl border-2 border-[#EBEBF0] bg-[#fefefe] p-5 sm:w-[350px] sm:p-6 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#87868F] dark:text-neutral-400">
                  Edit Badge
                </h2>
                <button
                  title="close"
                  onClick={() => setIsEditing(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[#B0B0B7] text-[#fefefe] dark:bg-neutral-700 dark:text-neutral-300"
                >
                  <X className="h-4 w-4" strokeWidth={4} />
                </button>
              </div>

              <div className="mb-6">
                <motion.input
                  layoutId="badge-text"
                  type="text"
                  autoFocus
                  value={tempBadge.text}
                  onChange={(e) =>
                    setTempBadge((prev) => ({ ...prev, text: e.target.value }))
                  }
                  className="w-full rounded-xl border-2 border-[#EBEBF0] bg-white px-3 py-2.5 text-base font-bold text-neutral-900 capitalize transition-colors focus:border-neutral-900 focus:outline-none sm:px-4 sm:py-3 sm:text-lg dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:focus:border-neutral-100"
                  placeholder="Enter status..."
                />
              </div>

              <div className="mb-6 grid grid-cols-5 gap-2">
                {(Object.keys(ICONS) as BadgeIconType[]).map((iconKey) => {
                  const Icon = ICONS[iconKey];
                  const isSelected = tempBadge.icon === iconKey;
                  return (
                    <motion.button
                      key={iconKey}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setTempBadge((prev) => ({ ...prev, icon: iconKey }))
                      }
                      className={`relative flex aspect-square items-center justify-center rounded-xl border-2 border-[#EBEBF0] text-[#AFAEB7] transition-all dark:border-neutral-800 dark:text-neutral-300`}
                    >
                      {isSelected && (
                        <motion.div
                          layout
                          layoutId="selected-pill"
                          className="absolute inset-0 rounded-xl border-2 border-[#28272A] bg-transparent dark:border-neutral-100"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}

                      <motion.div
                        layoutId={isSelected ? `${badge.icon}` : undefined}
                      >
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </motion.div>
                    </motion.button>
                  );
                })}
              </div>

              <div className="mb-8 flex items-center justify-between gap-3 rounded-xl border-2 border-[#EBEBF0] p-2.5 dark:border-neutral-800">
                {COLORS.map((color) => {
                  const isSelected = tempBadge.color === color.id;
                  return (
                    <motion.button
                      key={color.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setTempBadge((prev) => ({ ...prev, color: color.id }))
                      }
                      className={`h-8 w-8 rounded-full ${color.bg} relative flex items-center justify-center shadow-sm`}
                    >
                      {isSelected && (
                        <HiPencil className="h-4 w-4 text-[#fefefe]" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleUpdate}
                className="w-full rounded-full bg-[#28272A] py-3.5 text-base font-bold text-[#FBFBFD] shadow-lg sm:py-4 sm:text-lg dark:bg-neutral-100 dark:text-neutral-900"
              >
                Update Badge
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </MotionConfig>
    </div>
  );
}
