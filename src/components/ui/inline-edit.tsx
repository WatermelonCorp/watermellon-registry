"use client";

import { useState, useEffect, useId, type FC } from "react";
import { motion, AnimatePresence, type Transition } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AlarmClockFreeIcons,
  Calendar03Icon,
  Cancel01Icon,
  Edit03Icon,
  Link01Icon,
  Menu02Icon,
  Task02Icon,
  Tick02Icon,
  Ticket02Icon,
} from "@hugeicons/core-free-icons/index";

/* --- Types --- */
interface EditableRowProps {
  icon: any;
  label: string;
  value: string;
  secondaryValue?: string;
  onSave?: (value: string) => void;
  onSaveRange?: (v1: string, v2: string) => void;
  type?: "text" | "time" | "url";
  multiline?: boolean;
}

export interface EventData {
  event: string;
  date: string;
  start: string;
  end: string;
  location: string;
  url: string;
  desc: string;
}

interface InlineEditCardProps {
  initialData?: EventData;
  title?: string;
}

const spring: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 28,
  mass: 0.6,
};

/* --- Sub-Component: EditableRow (Styling Intact) --- */
const EditableRow: FC<EditableRowProps> = ({
  icon,
  label,
  value,
  secondaryValue,
  onSave,
  onSaveRange,
  type = "text",
  multiline = false,
}) => {
  const [editing, setEditing] = useState(false);
  const [v1, setV1] = useState(value);
  const [v2, setV2] = useState(secondaryValue || "");
  const inputId = useId();
  const secondaryInputId = useId();
  const isTime = type === "time";

  const handleSave = () => {
    if (isTime && onSaveRange) onSaveRange(v1, v2);
    else if (onSave) onSave(v1);
    setEditing(false);
  };

  return (
    <motion.div layout transition={spring} className={`relative gap-4 flex ${multiline ? "flex-col items-start" : "flex-row items-center"}`}>
      <div className="flex items-center gap-3 w-[130px] shrink-0">
        <HugeiconsIcon icon={icon} size={24} color="#b3b2b7" strokeWidth={1.5} />
        <label htmlFor={inputId} className="text-[16px] font-medium text-[#8E8E91] dark:text-[#636366] cursor-pointer">
          {label}
        </label>
      </div>

      <div className="flex-1 relative bg-[#FEFEFE] dark:bg-zinc-950 transition-colors">
        <div className="group/content w-full rounded-xl px-3 py-1 hover:bg-[#F9F9FB] dark:hover:bg-zinc-900/50">
          <AnimatePresence mode="wait" initial={false}>
            {!editing ? (
              <motion.div key="view" layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={spring} onClick={() => setEditing(true)} className={`cursor-pointer flex ${multiline ? "flex-col gap-2" : "items-center justify-between"}`}>
                <div className={`text-[16px] text-gray-800 dark:text-zinc-200 font-medium ${multiline ? "leading-relaxed" : "flex items-center gap-2"}`}>
                  {isTime ? (
                    <div className="flex items-center gap-1.5">
                      <span>{value}</span>
                      <span className="text-gray-300 dark:text-zinc-700 mx-1">to</span>
                      <span>{secondaryValue}</span>
                    </div>
                  ) : (
                    <span className={multiline ? "" : "truncate max-w-[220px]"}>{value}</span>
                  )}
                  {type === "url" && <HugeiconsIcon icon={Task02Icon} size={20} color="#b3b2b7" className="inline ml-1" />}
                </div>
                <div className="self-end flex items-center gap-1.5 opacity-0 group-hover/content:opacity-100 border border-gray-200 dark:border-zinc-800 bg-[#fefefe] dark:bg-zinc-900 px-1.5 py-1.5 rounded-lg shadow-md">
                  <HugeiconsIcon icon={Edit03Icon} size={20} color="#B7B7B9" />
                </div>
              </motion.div>
            ) : (
              <motion.div key="edit" layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={spring} className={`flex gap-2 w-full ${multiline ? "flex-col" : "items-center"}`}>
                {isTime ? (
                  <div className="flex gap-2 w-full">
                    <input id={inputId} autoFocus type="text" value={v1} onChange={(e) => setV1(e.target.value)} className="w-full h-10 px-3 rounded-xl bg-transparent text-[#2B2A35] dark:text-zinc-100 text-[14px] font-medium outline-none" />
                    <input id={secondaryInputId} type="text" value={v2} onChange={(e) => setV2(e.target.value)} className="w-full h-10 px-3 rounded-xl bg-transparent text-[#2B2A35] dark:text-zinc-100 text-[14px] font-medium outline-none" />
                  </div>
                ) : multiline ? (
                  <textarea id={inputId} autoFocus rows={4} value={v1} onChange={(e) => setV1(e.target.value)} className="w-full rounded-xl bg-transparent text-[16px] text-[#2B2A35] dark:text-zinc-100 font-medium outline-none resize-none" />
                ) : (
                  <input id={inputId} autoFocus type="text" value={v1} onChange={(e) => setV1(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSave()} className="w-full h-10 rounded-xl bg-transparent text-base text-[#2B2A35] dark:text-zinc-100 font-medium outline-none" />
                )}
                <div className="flex gap-1 self-end">
                  <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} onClick={handleSave} className="h-10 w-10 flex items-center justify-center rounded-xl bg-black dark:bg-zinc-100 text-white dark:text-black">
                    <HugeiconsIcon icon={Tick02Icon} size={24} />
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} onClick={() => setEditing(false)} className="h-10 w-10 flex items-center justify-center rounded-xl bg-black dark:bg-zinc-800 text-white">
                    <HugeiconsIcon icon={Cancel01Icon} size={24} color="#ffffff" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

/* --- MAIN REUSABLE COMPONENT --- */
export const InlineEditCard: FC<InlineEditCardProps> = ({ 
  initialData = {
    event: "The BBQ Night",
    date: "Saturday, 18 May",
    start: "8:00 pm",
    end: "11:00 pm",
    location: "Brooklyn Rooftop, NY",
    url: "event.sh/783",
    desc: 'Join us for "The BBQ Night" — an evening of delicious grilled food, live music, and great company under the stars!',
  },
  title = "Update Details"
}) => {
  const [data, setData] = useState<EventData>(initialData);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  return (
    <div className="flex flex-col items-center gap-8 w-full justify-center item-center">
      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        title="Toggle Theme"
        className="p-3 rounded-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-sm hover:scale-110 transition-all"
      >
        {theme === "light" ? <Moon size={20} className="text-gray-600" /> : <Sun size={20} className="text-yellow-400" />}
      </button>

      <div className="w-fit h-full p-1.5 border-[1.6px] bg-[#F9F9FB] dark:bg-zinc-900 border-[#F2F2F4] dark:border-zinc-800 rounded-[34px] transition-colors shadow-sm">
        <div className="w-full max-w-[440px] rounded-[28px] bg-[#fefefe] dark:bg-zinc-950 border-[1.6px] border-[#E7E7E9] dark:border-zinc-800 transition-colors overflow-hidden">
          
          <div className="px-8 py-3.5 border-b-[1.6px] border-[#E7E7E9] dark:border-zinc-800 bg-[#FAFAFC] dark:bg-zinc-900/50 rounded-t-[32px]">
            <h4 className="text-[15px] font-semibold text-[#8C8B92] dark:text-zinc-500 tracking-wide uppercase">
              {title}
            </h4>
          </div>

          <div className="py-3 px-4 space-y-1">
            <EditableRow icon={Ticket02Icon} label="Event" value={data.event} onSave={(v) => setData({ ...data, event: v })} />
            <EditableRow icon={Calendar03Icon} label="Date" value={data.date} onSave={(v) => setData({ ...data, date: v })} />
            <EditableRow icon={AlarmClockFreeIcons} label="Time" type="time" value={data.start} secondaryValue={data.end} onSaveRange={(a, b) => setData({ ...data, start: a, end: b })} />
            <EditableRow icon={Link01Icon} label="URL" type="url" value={data.url} onSave={(v) => setData({ ...data, url: v })} />
            <div className="pt-4 mt-2 border-t border-gray-50 dark:border-zinc-900">
              <EditableRow icon={Menu02Icon} label="Description" multiline value={data.desc} onSave={(v) => setData({ ...data, desc: v })} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};