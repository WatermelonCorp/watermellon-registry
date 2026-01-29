"use client";

import { useState, useRef, useEffect, type  FC } from "react";
import { motion, AnimatePresence, type Transition } from "motion/react";
import { Check, Sun, Moon } from "lucide-react";
import { BiSolidPencil } from "react-icons/bi";

// --- Types ---
interface SplitToEditProps {
  initialHours?: number;
  initialMinutes?: number;
  onSave?: (hours: number, minutes: number) => void;
}

export const SplitToEdit: FC<SplitToEditProps> = ({
  initialHours = 2,
  initialMinutes = 30,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [hours, setHours] = useState<number>(initialHours);
  const [minutes, setMinutes] = useState<number>(initialMinutes);
  const [tempHours, setTempHours] = useState<string>(String(initialHours));
  const [tempMinutes, setTempMinutes] = useState<string>(String(initialMinutes));
  const [isDark, setIsDark] = useState<boolean>(false);

  const hoursInputRef = useRef<HTMLInputElement>(null);

  // Theme Sync
  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  // Sync with prop changes
  useEffect(() => {
    setHours(initialHours);
    setMinutes(initialMinutes);
    setTempHours(String(initialHours));
    setTempMinutes(String(initialMinutes));
  }, [initialHours, initialMinutes]);

  // Auto-focus logic
  useEffect(() => {
    if (isEditing) {
      const timer = setTimeout(() => {
        hoursInputRef.current?.focus();
        hoursInputRef.current?.select();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isEditing]);

  const handleEdit = () => {
    setTempHours(String(hours));
    setTempMinutes(String(minutes));
    setIsEditing(true);
  };

  const handleSave = (e?: React.MouseEvent | React.KeyboardEvent) => {
    e?.stopPropagation();
    const h = Math.max(0, parseInt(tempHours, 10) || 0);
    const m = Math.min(59, Math.max(0, parseInt(tempMinutes, 10) || 0));

    setHours(h);
    setMinutes(m);
    setTempHours(String(h));
    setTempMinutes(String(m));
    setIsEditing(false);

    onSave?.(h, m);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave(e);
    if (e.key === "Escape") setIsEditing(false);
  };

  const springTransition: Transition = {
    type: "spring",
    stiffness: 450,
    damping: 35,
    mass: 1,
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-white dark:bg-zinc-950 transition-colors duration-500 overflow-hidden">
      
      {/* THEME TOGGLE */}
      <button 
        onClick={() => setIsDark(!isDark)}
        aria-label="Toggle dark mode"
        className="mb-20 p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 transition-all border border-transparent dark:border-zinc-800 shadow-sm active:scale-90 hover:bg-zinc-200 dark:hover:bg-zinc-800"
      >
        {isDark ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-zinc-600" size={20} />}
      </button>

      <div className="relative flex items-center justify-center min-h-[80px] w-full px-4">
        <AnimatePresence mode="popLayout">
          {!isEditing ? (
            <motion.div
              key="display-mode"
              layoutId="shared-pill-bg"
              onClick={handleEdit}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.1 } }}
              transition={springTransition}
              className="group flex items-center gap-8 bg-zinc-100 dark:bg-zinc-900 rounded-[24px] px-8 py-6 cursor-pointer select-none shadow-sm hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-colors"
            >
              <motion.div layout className="flex items-center gap-2">
                <motion.span
                  layoutId="hours-text"
                  className="text-3xl font-bold text-zinc-950 dark:text-zinc-50 tabular-nums tracking-tight"
                >
                  {hours}
                </motion.span>
                <motion.span layoutId="hours-unit" className="text-3xl font-bold text-zinc-400 dark:text-zinc-500">
                  Hr.
                </motion.span>
              </motion.div>

              <motion.div layout className="flex items-center gap-2">
                <motion.span
                  layoutId="mins-text"
                  className="text-3xl font-bold text-zinc-950 dark:text-zinc-50 tabular-nums tracking-tight"
                >
                  {minutes}
                </motion.span>
                <motion.span layoutId="mins-unit" className="text-3xl font-bold text-zinc-400 dark:text-zinc-500">
                  Min.
                </motion.span>
              </motion.div>

              <motion.div 
                layout 
                layoutId="shared-action-btn" 
                className="ml-2 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors"
              >
                <BiSolidPencil size={28} />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              key="editing-mode" 
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* HOURS INPUT */}
              <motion.div
                layoutId="shared-pill-bg"
                transition={springTransition}
                className="flex items-center gap-6 bg-zinc-100 dark:bg-zinc-900 rounded-[24px] px-6 py-6 shadow-md border border-transparent dark:border-zinc-800"
              >
                <input
                  ref={hoursInputRef}
                  type="text" 
                  inputMode="numeric"
                  value={tempHours}
                  onChange={(e) => setTempHours(e.target.value.replace(/\D/g, "").slice(0, 2))}
                  onKeyDown={handleKeyPress}
                  className="w-14 text-center text-3xl font-bold text-zinc-950 dark:text-zinc-50 bg-transparent outline-none tabular-nums"
                />
                <motion.span layoutId="hours-unit" className="text-3xl font-bold text-zinc-400 dark:text-zinc-500">
                  Hr.
                </motion.span>
              </motion.div>

              {/* MINUTES INPUT */}
              <motion.div
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.9 }}
                transition={{ ...springTransition, delay: 0.02 }}
                className="flex items-center gap-6 bg-zinc-100 dark:bg-zinc-900 rounded-[24px] px-6 py-6 shadow-md border border-transparent dark:border-zinc-800"
              >
                <input
                  type="text"
                  inputMode="numeric"
                  value={tempMinutes}
                  onChange={(e) => setTempMinutes(e.target.value.replace(/\D/g, "").slice(0, 2))}
                  onKeyDown={handleKeyPress}
                  className="w-14 text-center text-3xl font-bold text-zinc-950 dark:text-zinc-50 bg-transparent outline-none tabular-nums"
                />
                <motion.span layoutId="mins-unit" className="text-3xl font-bold text-zinc-400 dark:text-zinc-500">
                  Min.
                </motion.span>
              </motion.div>

              {/* SAVE BUTTON */}
              <motion.button
                layoutId="shared-action-btn"
                initial={{ opacity: 0, x: -40, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -40, scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ ...springTransition, delay: 0.05 }}
                onClick={() => handleSave()}
                className="flex items-center justify-center bg-zinc-900 dark:bg-zinc-50 hover:bg-black dark:hover:bg-white rounded-[20px] px-5 py-6 shadow-lg transition-colors"
              >
                <Check size={32} className="text-zinc-50 dark:text-zinc-950 stroke-[3.5px]" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
