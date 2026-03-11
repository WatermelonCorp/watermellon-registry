"use client";

import { useState, useId, type FC } from "react";
import { motion, AnimatePresence, type Transition } from "motion/react";
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  data: EventData;
  onDataChange: (data: EventData) => void;
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
    <motion.div
      layout
      transition={spring}
      className={`relative flex w-full ${multiline ? "flex-col items-start gap-4" : "flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"}`}
    >
      <div
        className={`flex items-center gap-3 shrink-0 ${multiline ? "w-full" : "w-full sm:w-[130px]"}`}
      >
        <HugeiconsIcon
          icon={icon}
          size={24}
          color="#b3b2b7"
          strokeWidth={1.5}
        />
        <label
          htmlFor={inputId}
          className="text-[16px] font-medium text-[#8E8E91] dark:text-[#636366] cursor-pointer"
        >
          {label}
        </label>
      </div>

      <div
        className={`relative bg-[#FEFEFE] dark:bg-zinc-950 transition-colors w-full`}
      >
        <motion.div
          layout
          className="group/content w-full rounded-xl px-2 sm:px-3 hover:bg-[#F9F9FB] dark:hover:bg-zinc-900/50"
        >
          <AnimatePresence mode="wait" initial={false}>
            {!editing ? (
              <motion.div
                key="view"
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={spring}
                onClick={() => setEditing(true)}
                className={`cursor-pointer flex min-h-[40px] ${multiline ? "flex-col py-2.5 gap-2" : "items-center justify-between"}`}
              >
                <div
                  className={`text-[16px] text-gray-800 dark:text-zinc-200 font-medium ${multiline ? "leading-relaxed w-full" : "flex items-center gap-2"}`}
                >
                  {isTime ? (
                    <div className="flex items-center gap-1.5 text-[15px] sm:text-[16px]">
                      <span>{value}</span>
                      <span className="mx-1 text-gray-300 dark:text-zinc-700">
                        to
                      </span>
                      <span>{secondaryValue}</span>
                    </div>
                  ) : (
                    <div
                      className={
                        multiline
                          ? "whitespace-pre-wrap wrap-break-word text-[15px] sm:text-[16px]"
                          : "truncate max-w-[180px] sm:max-w-[220px] text-[15px] sm:text-[16px]"
                      }
                    >
                      {value}
                    </div>
                  )}
                  {type === "url" && (
                    <HugeiconsIcon
                      icon={Task02Icon}
                      size={20}
                      color="#b3b2b7"
                      className="inline ml-1"
                    />
                  )}
                </div>
                <div
                  className={`flex items-center justify-center size-7 opacity-0 group-hover/content:opacity-100 border border-gray-200 dark:border-zinc-800 bg-[#fefefe] dark:bg-zinc-900 rounded-lg shadow-sm ${multiline ? "mt-1 self-end" : ""}`}
                >
                  <HugeiconsIcon icon={Edit03Icon} size={18} color="#B7B7B9" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="edit"
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={spring}
                className={`flex gap-2 w-full min-h-[40px] ${multiline ? "flex-col py-2.5" : "items-center"}`}
              >
                {isTime ? (
                  <div className="flex w-full gap-2">
                    <input
                      id={inputId}
                      autoFocus
                      type="text"
                      value={v1}
                      onChange={(e) => setV1(e.target.value)}
                      className="w-full h-10 px-2 sm:px-3 rounded-xl bg-transparent text-[#2B2A35] dark:text-zinc-100 text-[14px] font-medium outline-none border border-transparent focus:border-gray-100 dark:focus:border-zinc-800"
                    />
                    <input
                      id={secondaryInputId}
                      type="text"
                      value={v2}
                      onChange={(e) => setV2(e.target.value)}
                      className="w-full h-10 px-2 sm:px-3 rounded-xl bg-transparent text-[#2B2A35] dark:text-zinc-100 text-[14px] font-medium outline-none border border-transparent focus:border-gray-100 dark:focus:border-zinc-800"
                    />
                  </div>
                ) : multiline ? (
                  <textarea
                    id={inputId}
                    autoFocus
                    rows={3}
                    value={v1}
                    onChange={(e) => setV1(e.target.value)}
                    className="w-full rounded-xl bg-transparent text-[15px] sm:text-[16px] text-[#2B2A35] dark:text-zinc-100 font-medium leading-relaxed outline-none resize-none px-0 py-0"
                  />
                ) : (
                  <input
                    id={inputId}
                    autoFocus
                    type="text"
                    value={v1}
                    onChange={(e) => setV1(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                    className="w-full h-10 rounded-xl bg-transparent text-[15px] sm:text-base text-[#2B2A35] dark:text-zinc-100 font-medium outline-none"
                  />
                )}
                <div
                  className={`flex gap-1 items-center shrink-0 ${multiline ? "self-end mt-1" : ""}`}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    className="flex items-center justify-center size-7 text-white bg-black rounded-lg dark:bg-zinc-100 dark:text-black"
                  >
                    <HugeiconsIcon icon={Tick02Icon} size={18} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setEditing(false)}
                    className="flex items-center justify-center size-7 text-white bg-black rounded-lg dark:bg-zinc-800"
                  >
                    <HugeiconsIcon
                      icon={Cancel01Icon}
                      size={18}
                      color="#ffffff"
                    />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

/* --- MAIN REUSABLE COMPONENT --- */
export const InlineEditCard: FC<InlineEditCardProps> = ({
  data,
  onDataChange,
  title = "Update Details",
}) => {
  return (
    <div className="w-[92vw] max-w-xs sm:max-w-none sm:w-[440px] h-fit p-1.5 border-[1.6px] bg-[#F9F9FB] dark:bg-zinc-900 border-[#F2F2F4] dark:border-zinc-800 rounded-[34px] transition-colors shadow-sm mx-auto sm:mx-0">
      <div className="w-full rounded-[28px] bg-[#fefefe] dark:bg-zinc-950 border-[1.6px] border-[#E7E7E9] dark:border-zinc-800 transition-colors overflow-hidden">
        <div className="px-8 py-3.5 border-b-[1.6px] border-[#E7E7E9] dark:border-zinc-800 bg-[#FAFAFC] dark:bg-zinc-900/50 rounded-t-[32px]">
          <h4 className="text-[15px] font-semibold text-[#8C8B92] dark:text-zinc-500 tracking-wide uppercase">
            {title}
          </h4>
        </div>

        <div className="px-4 py-3 space-y-4 sm:space-y-1">
          <EditableRow
            icon={Ticket02Icon}
            label="Event"
            value={data.event}
            onSave={(v) => onDataChange({ ...data, event: v })}
          />
          <EditableRow
            icon={Calendar03Icon}
            label="Date"
            value={data.date}
            onSave={(v) => onDataChange({ ...data, date: v })}
          />
          <EditableRow
            icon={AlarmClockFreeIcons}
            label="Time"
            type="time"
            value={data.start}
            secondaryValue={data.end}
            onSaveRange={(a, b) => onDataChange({ ...data, start: a, end: b })}
          />
          <EditableRow
            icon={Link01Icon}
            label="URL"
            type="url"
            value={data.url}
            onSave={(v) => onDataChange({ ...data, url: v })}
          />
          <div className="pt-4 mt-2 border-t border-gray-50 dark:border-zinc-900">
            <EditableRow
              icon={Menu02Icon}
              label="Description"
              multiline
              value={data.desc}
              onSave={(v) => onDataChange({ ...data, desc: v })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
