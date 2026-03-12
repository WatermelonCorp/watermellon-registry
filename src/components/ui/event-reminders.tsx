import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { Minus, Plus, X, ChevronUp, ChevronDown } from 'lucide-react';
import { FaBell, FaCheck } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { BiSolidPencil } from 'react-icons/bi';

export type ReminderType = 'Notification' | 'Email';
export type TimeUnit = 'minutes' | 'hours' | 'days';

export interface Reminder {
  id: string;
  type: ReminderType;
  value: number;
  unit: TimeUnit;
}

interface EventRemindersProps {
  title: string;
  date: string;
  initialReminders?: Reminder[];
  onUpdate?: (reminders: Reminder[]) => void;
}

export const EventReminders: React.FC<EventRemindersProps> = ({
  title,
  date: initialDate,
  initialReminders = []
}) => {
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [date, setDate] = useState(initialDate);
  const [isEditingDate, setIsEditingDate] = useState(false);

  const basePill =
    "border-[1.6px] rounded-full transition-colors bg-white border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800";

  const softBtn =
    "p-2 rounded-full transition-colors bg-neutral-100 text-neutral-500 hover:text-neutral-900 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-white";

  const addReminder = () => {
    setReminders([
      ...reminders,
      {
        id: crypto.randomUUID(),
        type: 'Notification',
        value: 5,
        unit: 'minutes',
      }
    ]);
  };

  const removeReminder = (id: string) =>
    setReminders(reminders.filter(r => r.id !== id));

  const updateReminder = (id: string, updates: Partial<Reminder>) =>
    setReminders(reminders.map(r => r.id === id ? { ...r, ...updates } : r));

  const toggleUnit = (id: string, current: TimeUnit) => {
    const units: TimeUnit[] = ['minutes', 'hours', 'days'];
    const next = units[(units.indexOf(current) + 1) % units.length];
    updateReminder(id, { unit: next });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-4 antialiased bg-transparent">

      <motion.div
        layout
        className="w-full max-w-100 rounded-[32px] p-6 shadow-lg border-2 transition-colors bg-white border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6 gap-3">
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-lg sm:text-xl text-neutral-900 dark:text-white truncate">
              {title}
            </h2>

            <AnimatePresence mode="wait">
              {isEditingDate ? (
                <motion.input
                  key="edit-date"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && setIsEditingDate(false)}
                  autoFocus
                  className="mt-2 w-full font-semibold text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded border-b-2 border-neutral-300 dark:border-neutral-700 outline-none"
                />
              ) : (
                <motion.p
                  key="view-date"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-2 font-semibold text-neutral-600 dark:text-neutral-400"
                >
                  {date}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setIsEditingDate(!isEditingDate)}
            className="p-2 rounded-lg border-2 transition-colors bg-white text-neutral-600 hover:bg-neutral-100 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:border-neutral-700"
          >
            {isEditingDate ? <FaCheck size={20} /> : <BiSolidPencil size={20} />}
          </button>
        </div>

        {/* List */}
        <div className="border-t border-dashed border-neutral-200 dark:border-neutral-800 pt-2">
          <LayoutGroup>
            <AnimatePresence>
              {reminders.map((reminder) => (
                <motion.div
                  key={reminder.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="py-4 border-b border-dashed border-neutral-200 dark:border-neutral-800 space-y-3"
                >
                  {/* Type */}
                  <motion.div
                    layout
                    onClick={() =>
                      updateReminder(reminder.id, {
                        type: reminder.type === "Notification" ? "Email" : "Notification"
                      })
                    }
                    className={`${basePill} px-4 py-2 flex items-center justify-between cursor-pointer`}
                  >
                    <div className="flex items-center gap-3">
                      {reminder.type === "Notification"
                        ? <FaBell size={18} className="text-neutral-400" />
                        : <MdEmail size={18} className="text-neutral-400" />}
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                        {reminder.type}
                      </span>
                    </div>
                    <div className="flex flex-col text-neutral-400 -space-y-1">
                      <ChevronUp size={14} strokeWidth={3} />
                      <ChevronDown size={14} strokeWidth={3} />
                    </div>
                  </motion.div>

                  {/* Value + Unit */}
                  <div className="flex gap-2">
                    <div className={`${basePill} flex-1 flex items-center justify-between px-2 py-1`}>
                      <button
                        onClick={() =>
                          updateReminder(reminder.id, { value: Math.max(1, reminder.value - 1) })
                        }
                        className={softBtn}
                      >
                        <Minus size={16} />
                      </button>

                      <span className="font-bold text-lg text-neutral-900 dark:text-white tabular-nums">
                        {reminder.value.toString().padStart(2, "0")}
                      </span>

                      <button
                        onClick={() =>
                          updateReminder(reminder.id, { value: reminder.value + 1 })
                        }
                        className={softBtn}
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <motion.div
                      layout
                      onClick={() => toggleUnit(reminder.id, reminder.unit)}
                      className={`${basePill} flex-[1.2] px-4 py-2 flex items-center justify-between cursor-pointer`}
                    >
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200 capitalize">
                        {reminder.unit}
                      </span>
                      <div className="flex flex-col text-neutral-400 -space-y-1">
                        <ChevronUp size={14} strokeWidth={3} />
                        <ChevronDown size={14} strokeWidth={3} />
                      </div>
                    </motion.div>

                    <button
                      onClick={() => removeReminder(reminder.id)}
                      className="p-2 rounded-full border border-neutral-200 text-neutral-500 hover:text-red-500 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 transition-colors"
                    >
                      <X size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </LayoutGroup>
        </div>

        {/* Add Button */}
        <motion.button
          layout
          onClick={addReminder}
          className="w-full mt-6 py-3 flex items-center justify-center gap-2 rounded-2xl font-semibold transition-colors bg-neutral-100 text-neutral-800 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
        >
          <Plus size={18} strokeWidth={2.5} />
          Add Reminder
        </motion.button>
      </motion.div>
    </div>
  );
};