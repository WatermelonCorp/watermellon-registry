import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
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

  const addReminder = () => {
    const newReminder: Reminder = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'Notification',
      value: 5,
      unit: 'minutes',
    };
    setReminders([...reminders, newReminder]);
  };

  const removeReminder = (id: string) => {
    setReminders(reminders.filter((r) => r.id !== id));
  };

  const updateReminder = (id: string, updates: Partial<Reminder>) => {
    setReminders(reminders.map((r) => (r.id === id ? { ...r, ...updates } : r)));
  };

  const toggleUnit = (id: string, current: TimeUnit) => {
    const units: TimeUnit[] = ['minutes', 'hours', 'days'];
    const nextUnit = units[(units.indexOf(current) + 1) % units.length];
    updateReminder(id, { unit: nextUnit });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-2 sm:p-4 antialiased transition-colors duration-500 bg-transparent">
      
      <motion.div
        layout
        className="w-full max-w-100 rounded-[24px] sm:rounded-[32px] p-4 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-2 transition-colors duration-300 bg-[#fefefe] border-[#E9E8ED] dark:bg-[#1C1C1E] dark:border-white/10"
      >
        {/* Header Section */}
        <div className="flex justify-between items-start mb-4 gap-2">
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-[17px] sm:text-[19px] leading-tight transition-colors text-[#1C1C1E] dark:text-white truncate">
              {title}
            </h2>
            
            <AnimatePresence mode="wait">
              {isEditingDate ? (
                <motion.input
                  key="editing-date"
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 5 }}
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && setIsEditingDate(false)}
                  autoFocus
                  className="font-bold text-[16px] sm:text-[18px] mt-1 outline-none rounded px-1 w-full border-b-2 transition-colors text-[#6A6970] bg-[#f4f3f3] border-[#6A6970]/30 dark:bg-white/5 dark:text-gray-300 dark:border-white/20"
                />
              ) : (
                <motion.p 
                  key="static-date"
                  initial={{ opacity: 0, x: 5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -5 }}
                  className="font-bold text-[16px] sm:text-[18px] mt-1 transition-colors text-[#6A6970] dark:text-gray-400"
                >
                  {date}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          
          <button 
            title={isEditingDate ? 'save' : 'edit'} 
            onClick={() => setIsEditingDate(!isEditingDate)}
            className="p-1.5 sm:p-2 rounded-lg transition-colors duration-300 border-2 shrink-0 bg-[#fefefe] text-[#66666B] hover:bg-[#f4f3f3] border-[#E9E8ED] dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10 dark:border-white/10"
          >
            {isEditingDate ? <FaCheck size={20} className="sm:w-6 sm:h-6" /> : <BiSolidPencil size={20} className="sm:w-6 sm:h-6" />}
          </button>
        </div>

        {/* Reminders List */}
        <div className="border-t-2 border-dashed transition-colors border-[#E9E8ED] dark:border-white/10">
          <LayoutGroup>
            <AnimatePresence mode="popLayout">
              {reminders.map((reminder) => (
                <motion.div
                  key={reminder.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ type: "spring", stiffness: 500, damping: 35, mass: 1 }}
                  className="space-y-2 border-b-2 border-dashed py-3 transition-colors border-[#E9E8ED] dark:border-white/10"
                >
                  {/* Type Selector */}
                  <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    onClick={() =>
                      updateReminder(reminder.id, {
                        type: reminder.type === "Notification" ? "Email" : "Notification",
                      })
                    }
                    className="flex items-center justify-between p-1 sm:p-1.5 px-3 border-[1.6px] rounded-full cursor-pointer transition-colors bg-white border-[#E9E8ED] hover:border-gray-300 dark:bg-white/5 dark:border-white/10 dark:hover:border-white/20"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <div className="p-1 sm:p-1.5 rounded-lg text-[#AFAEB7]">
                        <AnimatePresence mode="popLayout">
                          <motion.div
                            key={reminder.type}
                            initial={{ y: 14, opacity: 0, filter: "blur(6px)" }}
                            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                            exit={{ y: -14, opacity: 0, filter: "blur(6px)" }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                          >
                            {reminder.type === "Notification" ? <FaBell size={20} className="sm:w-5.75 sm:h-5.75" /> : <MdEmail size={20} className="sm:w-5.75 sm:h-5.75" />}
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      <div className="relative h-5 sm:h-5.5 overflow-hidden">
                        <AnimatePresence mode="popLayout">
                          <motion.span
                            key={reminder.type}
                            initial={{ y: 14, opacity: 0, filter: "blur(6px)" }}
                            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                            exit={{ y: -14, opacity: 0, filter: "blur(6px)" }}
                            transition={{ type: "spring", stiffness: 260, damping: 22 }}
                            className="block font-bold text-sm sm:text-base transition-colors text-[#343434] dark:text-gray-200"
                          >
                            {reminder.type}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="flex flex-col text-[#D0CFD6] -space-y-1">
                      <ChevronUp size={14} className="sm:w-4 sm:h-4" strokeWidth={3} />
                      <ChevronDown size={14} className="sm:w-4 sm:h-4" strokeWidth={3} />
                    </div>
                  </motion.div>

                  {/* Value & Unit Controls */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
                    <div className="flex-1 min-w-30 flex items-center justify-between p-1 border-[1.6px] rounded-full transition-colors bg-[#fefefe] border-[#E9E8ED] dark:bg-white/5 dark:border-white/10">
                      <button
                        title="minus"
                        onClick={() => updateReminder(reminder.id, { value: Math.max(1, reminder.value - 1) })}
                        className="p-1.5 sm:p-2 rounded-full transition-colors duration-300 bg-[#F6F5FA] text-gray-400 hover:text-black dark:bg-white/5 dark:text-gray-500 dark:hover:text-white"
                      >
                        <Minus size={16} className="sm:w-4.5 sm:h-4.5" />
                      </button>

                      <div className="relative h-6 sm:h-6.5 overflow-hidden">
                        <AnimatePresence mode="popLayout">
                          <motion.span
                            key={reminder.value}
                            initial={{ y: 14, opacity: 0, filter: "blur(6px)" }}
                            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                            exit={{ y: -14, opacity: 0, filter: "blur(6px)" }}
                            transition={{ type: "spring", stiffness: 260, damping: 22 }}
                            className="block font-bold text-base sm:text-lg tabular-nums transition-colors text-[#1C1C1E] dark:text-white"
                          >
                            {reminder.value.toString().padStart(2, "0")}
                          </motion.span>
                        </AnimatePresence>
                      </div>

                      <button
                        title="plus"
                        onClick={() => updateReminder(reminder.id, { value: reminder.value + 1 })}
                        className="p-1.5 sm:p-2 rounded-full transition-colors duration-300 bg-[#F6F5FA] text-gray-400 hover:text-black dark:bg-white/5 dark:text-gray-500 dark:hover:text-white"
                      >
                        <Plus size={16} className="sm:w-4.5 sm:h-4.5" />
                      </button>
                    </div>

                    <motion.div
                      layout
                      transition={{ type: "spring", stiffness: 300, damping: 28 }}
                      onClick={() => toggleUnit(reminder.id, reminder.unit)}
                      className="flex-[1.2] min-w-25 flex items-center justify-between px-3 sm:px-4 py-1.5 sm:py-2 border-[1.6px] rounded-full cursor-pointer transition-colors bg-[#fefefe] border-[#E9E8ED] dark:bg-white/5 dark:border-white/10"
                    >
                      <div className="relative h-5 sm:h-5.5 overflow-hidden">
                        <AnimatePresence mode="popLayout">
                          <motion.span
                            key={reminder.unit}
                            initial={{ y: 14, opacity: 0, filter: "blur(6px)" }}
                            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                            exit={{ y: -14, opacity: 0, filter: "blur(6px)" }}
                            transition={{ type: "spring", stiffness: 260, damping: 22 }}
                            className="block font-bold text-sm sm:text-base capitalize transition-colors text-[#343434] dark:text-gray-200"
                          >
                            {reminder.unit}
                          </motion.span>
                        </AnimatePresence>
                      </div>

                      <div className="flex flex-col text-[#D0CFD6] -space-y-1">
                        <ChevronUp size={14} className="sm:w-4 sm:h-4" strokeWidth={3} />
                        <ChevronDown size={14} className="sm:w-4 sm:h-4" strokeWidth={3} />
                      </div>
                    </motion.div>

                    <button
                      title="remove"
                      onClick={() => removeReminder(reminder.id)}
                      className="p-2 sm:p-2.5 rounded-full border-[1.6px] transition-colors text-[#69696B] hover:bg-[#F6F5FA] border-[#E9E8ED] hover:text-[#343434] dark:text-gray-500 dark:hover:bg-white/10 dark:border-white/10 dark:hover:text-red-400 shrink-0"
                    >
                      <X size={18} className='sm:w-5 sm:h-5 hover:scale-105' strokeWidth={2.5} />
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
          className="w-full mt-4 py-2.5 sm:py-3 flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl font-bold transition-all duration-300 bg-[#F4F4F9] text-[#36363A] hover:bg-[#ececf0]/70 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10"
        >
          <Plus size={18} className="sm:w-5 sm:h-5" strokeWidth={2.5} />
          <span className="text-sm sm:text-base">Add Reminder</span>
        </motion.button>
      </motion.div>
    </div>
  );
};