"use client";

import { useState, useId, type FC } from "react";
import { motion, AnimatePresence, type Transition } from "motion/react";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  AlarmClockFreeIcons,
  Calendar03Icon,
  Cancel01Icon,
  Edit03Icon,
  Link01Icon,
  Menu02Icon,
  Tick02Icon,
  Ticket02Icon,
} from "@hugeicons/core-free-icons/index";


interface EditableRowProps {
  icon: IconSvgElement;
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
      className={`relative flex w-full ${multiline ? "flex-col items-start gap-4" : "flex-col gap-2 sm:flex-row sm:items-center sm:gap-4"}`}
    >
      <div
        className={`flex shrink-0 items-center gap-3 ${multiline ? "w-full" : "w-full sm:w-[130px]"}`}
      >
        <HugeiconsIcon
          icon={icon}
          size={24}
          className="text-muted-foreground"
          strokeWidth={1.5}
        />
        <label
          htmlFor={inputId}
          className="text-muted-foreground cursor-pointer text-[16px] font-medium"
        >
          {label}
        </label>
      </div>

      <div className={`bg-background relative w-full transition-colors`}>
        <motion.div
          layout
          className="group/content hover:bg-muted w-full rounded-lg px-2 sm:px-3"
        >
          <motion.div
            layout
            transition={spring}
            className={`relative flex min-h-[40px] w-full gap-2 overflow-hidden ${multiline ? "flex-col py-2.5" : "items-center"}`}
          >
            {isTime ? (
              <div className="flex w-full gap-2">
                <input
                  id={inputId}
                  autoFocus
                  type="text"
                  readOnly={!editing}
                  value={v1}
                  onChange={(e) => setV1(e.target.value)}
                  className="text-foreground focus:border-border h-10 w-full rounded-lg border border-transparent bg-transparent text-[16px] leading-relaxed font-medium outline-none"
                />
                <input
                  id={secondaryInputId}
                  type="text"
                  readOnly={!editing}
                  value={v2}
                  onChange={(e) => setV2(e.target.value)}
                  className="text-foreground focus:border-border h-10 w-full rounded-lg border border-transparent bg-transparent text-[16px] leading-relaxed font-medium outline-none"
                />
              </div>
            ) : multiline ? (
              <textarea
                id={inputId}
                autoFocus
                readOnly={!editing}
                rows={3}
                value={v1}
                onChange={(e) => setV1(e.target.value)}
                className="text-foreground w-full resize-none rounded-lg bg-transparent px-0 py-0 text-[16px] leading-relaxed font-medium outline-none"
              />
            ) : (
              <input
                id={inputId}
                autoFocus
                type="text"
                readOnly={!editing}
                value={v1}
                onChange={(e) => setV1(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                className="text-foreground h-10 w-full rounded-lg bg-transparent text-[15px] font-medium outline-none sm:text-base"
              />
            )}

            <div className="mr-0.5 flex shrink-0 items-center justify-end">
              <AnimatePresence mode="popLayout" initial={false}>
                {editing ? (
                  <motion.div
                    key="edit"
                    className="flex gap-1"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.19, 1, 0.22, 1],
                    }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSave}
                      className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-lg"
                    >
                      <HugeiconsIcon icon={Tick02Icon} size={18} />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setEditing(false)}
                      className="bg-muted text-foreground flex size-7 items-center justify-center rounded-lg"
                    >
                      <HugeiconsIcon icon={Cancel01Icon} size={18} />
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    exit={{ opacity: 1 }}
                    key="view"
                    className={`border-border bg-background flex size-7 items-center justify-center rounded-lg border opacity-0 shadow-sm group-hover/content:opacity-100 ${multiline ? "mt-1 self-end" : ""}`}
                    onClick={() => setEditing(true)}
                  >
                    <HugeiconsIcon
                      icon={Edit03Icon}
                      size={18}
                      className="text-muted-foreground"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const InlineEditCard: FC<InlineEditCardProps> = ({
  data,
  onDataChange,
  title = "Update Details",
}) => {
  return (
    <div className="theme-injected border-border bg-muted mx-auto h-fit w-[92vw] max-w-xs rounded-lg border p-1.5 shadow-sm transition-colors sm:mx-0 sm:w-[440px] sm:max-w-none">
      <div className="border-border bg-card w-full overflow-hidden rounded-lg border transition-colors">
        <div className="border-border bg-muted rounded-t-lg border-b px-8 py-3.5">
          <h4 className="text-muted-foreground text-[15px] font-semibold tracking-wide uppercase">
            {title}
          </h4>
        </div>

        <div className="space-y-4 px-4 py-3 sm:space-y-1">
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
          <div className="border-border mt-2 border-t pt-4">
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
